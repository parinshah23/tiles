import { useState } from "react";
import { Layout } from "../components/Layout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Sign in the user with Firebase Auth
      await signInWithEmailAndPassword(auth, email, password);
      
      // 2. Redirect to the homepage
      navigate("/");
    } catch (err: any) {
      setError("Invalid email or password. Please try again.");
    }
    setLoading(false);
  };

  return (
    <Layout>
      <section className="py-20 md:py-32 gradient-premium">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-card rounded-2xl p-8 shadow-premium">
            <h2 className="text-3xl font-display font-bold text-foreground mb-6 text-center">
              Welcome Back
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="h-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  className="h-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              
              <Button variant="hero" size="lg" className="w-full" disabled={loading}>
                {loading ? "Logging In..." : "Log In"}
              </Button>
            </form>
            <p className="text-center text-muted-foreground mt-6">
              Need an account?{" "}
              <Link to="/register" className="text-accent hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;

