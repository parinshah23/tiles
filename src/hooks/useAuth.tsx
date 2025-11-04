  import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/firebaseConfig"; // Use @/ alias
import { doc, getDoc, collection, onSnapshot, addDoc, deleteDoc, query, where, Unsubscribe } from "firebase/firestore";

// Define the shape of a Wishlist Item
export type WishlistItem = {
  id: string; // The Firestore document ID
  productId: string; // The ID of the product
  userId: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

// Define the shape of the user object
type AuthUser = {
  uid: string;
  email: string | null;
  role: "user" | "admin" | null;
};

// Define the shape of the Auth Context
type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  wishlist: WishlistItem[];
  addToWishlist: (product: any) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    let unsubscribeWishlist: Unsubscribe = () => {};

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
      try {
        // First, clean up any *previous* wishlist listener
        unsubscribeWishlist();
        setWishlist([]); // Clear the wishlist

        if (firebaseUser) {
          // User is logged in, fetch their role
          const userDocRef = doc(db, "users", firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const authUser: AuthUser = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              role: userData.role || "user",
            };
            setUser(authUser);
            
            // --- WISHLIST LOGIC ---
            const wishlistQuery = query(
              collection(db, "wishlistItems"),
              where("userId", "==", firebaseUser.uid)
            );
            
            unsubscribeWishlist = onSnapshot(wishlistQuery, (querySnapshot) => {
              const items: WishlistItem[] = [];
              querySnapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() } as WishlistItem);
              });
              setWishlist(items);
            });
            // --- END WISHLIST LOGIC ---

          } else {
            // No role doc found, treat as basic user
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              role: "user",
            });
          }
        } else {
          // User is logged out
          setUser(null);
        }
      } catch (error) {
        console.error("Error in authentication logic:", error);
        // FIX: If fetching role fails, still log the user in as a basic user.
        // Don't set user to null, as that would log them out.
        if (firebaseUser) {
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              role: "user", // Default to "user" on error
            });
        } else {
            setUser(null);
        }
      }
      
      setLoading(false); // This is now guaranteed to run
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribeAuth();
      unsubscribeWishlist();
    };
  }, []);

  // Function to add an item to the wishlist
  const addToWishlist = async (product: any) => {
  if (!user) throw new Error("You must be logged in to add to wishlist.");

  const isAlreadyAdded = wishlist.some(item => item.productId === product.id);
  if (isAlreadyAdded) return;

  // --- Instant UI update ---
  const tempItem: WishlistItem = {
    id: `temp-${Date.now()}`,
    productId: String(product.id),
    userId: String(user.uid),
    name: product.name || "",
    price: Number(product.price) || 0,
    image: product.image || "",
    category: product.category || "",
  };
  setWishlist(prev => [...prev, tempItem]);

  try {
    const docRef = await addDoc(collection(db, "wishlistItems"), {
      userId: String(user.uid),
      productId: String(product.id),
      name: product.name || "",
      price: Number(product.price) || 0,
      image: product.image || "",
      category: product.category || "",
    });

    // Replace temp item with actual Firestore item once confirmed
    setWishlist(prev =>
      prev.map(item =>
        item.id === tempItem.id ? { ...tempItem, id: docRef.id } : item
      )
    );
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    // Revert optimistic change if failed
    setWishlist(prev => prev.filter(item => item.id !== tempItem.id));
  }
};

const removeFromWishlist = async (productId: string) => {
  if (!user) throw new Error("You must be logged in to remove from wishlist.");

  const itemToRemove = wishlist.find(item => item.productId === productId);
  if (!itemToRemove) return;

  // --- Instant UI update ---
  setWishlist(prev => prev.filter(item => item.productId !== productId));

  try {
    await deleteDoc(doc(db, "wishlistItems", itemToRemove.id));
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    // Revert change if Firestore fails
    setWishlist(prev => [...prev, itemToRemove]);
  }
};


  const value = {
    user,
    loading,
    wishlist,
    addToWishlist,
    removeFromWishlist,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Create the useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

