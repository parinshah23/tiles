# How to Add Real Instagram Posts to Your Website

## Method 1: Using Instagram Post URLs (Automatic - Recommended)

1. Visit https://www.instagram.com/asiantiles1982
2. Click on any post to open it
3. Copy the URL from your browser (it looks like: `https://www.instagram.com/p/ABC123xyz/`)
4. Open `src/components/InstagramFeed.tsx`
5. Find the `INSTAGRAM_POST_URLS` array
6. Add your post URLs like this:

```typescript
const INSTAGRAM_POST_URLS: string[] = [
  "https://www.instagram.com/p/ABC123xyz/",
  "https://www.instagram.com/p/XYZ789abc/",
  "https://www.instagram.com/p/DEF456ghi/",
  // Add up to 9 posts
];
```

7. Save the file and refresh your website
8. The posts will automatically load using Instagram's embed system

## Method 2: Using Instagram Embed Code (Manual - More Control)

1. Visit https://www.instagram.com/asiantiles1982
2. Click on a post to open it
3. Click the three dots (...) menu
4. Select "Embed"
5. Copy the embed code (it looks like an iframe)
6. Open `src/components/InstagramFeed.tsx`
7. Replace the placeholder grid items with embed code

## Method 3: Using a Widget Service (Easiest - No Code)

### Option A: Elfsight (Free)
1. Go to https://elfsight.com/instagram-feed-instashow/
2. Sign up for a free account
3. Create a widget for @asiantiles1982
4. Copy the widget code
5. Replace the grid section in `InstagramFeed.tsx` with the widget code

### Option B: SnapWidget (Free)
1. Go to https://snapwidget.com/
2. Enter @asiantiles1982
3. Customize the widget
4. Copy the embed code
5. Add it to your component

### Option C: Curator.io (Free Tier)
1. Go to https://curator.io/
2. Create a free account
3. Connect Instagram account
4. Get the embed code
5. Add it to your website

## Quick Start - Add 3 Posts Now

1. Go to https://www.instagram.com/asiantiles1982
2. Open any 3 posts and copy their URLs
3. Open `src/components/InstagramFeed.tsx`
4. Find this line: `const INSTAGRAM_POST_URLS: string[] = [];`
5. Add your URLs:

```typescript
const INSTAGRAM_POST_URLS: string[] = [
  "https://www.instagram.com/p/YOUR_POST_ID_1/",
  "https://www.instagram.com/p/YOUR_POST_ID_2/",
  "https://www.instagram.com/p/YOUR_POST_ID_3/",
];
```

That's it! The posts will appear automatically.

