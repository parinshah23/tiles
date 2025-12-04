# Instagram Feed Setup Guide

This guide will help you set up the Instagram feed on your website using the Instagram Basic Display API.

## Prerequisites

1. A Facebook Developer account (create one at https://developers.facebook.com/)
2. Access to the Instagram account (@asiantiles1982) or be an admin of the account

## Step 1: Create a Facebook App

1. Go to https://developers.facebook.com/
2. Click "My Apps" → "Create App"
3. Select "Consumer" as the app type
4. Fill in the app details:
   - App Name: "Asian Tiles Website" (or any name)
   - Contact Email: Your email
   - Click "Create App"

## Step 2: Add Instagram Basic Display

1. In your app dashboard, click "Add Product"
2. Find "Instagram Basic Display" and click "Set Up"
3. Go to "Basic Display" in the left sidebar

## Step 3: Configure OAuth Settings

1. Click "Create New App" under "Instagram App ID"
2. Add OAuth Redirect URIs:
   - For development: `http://localhost:8080/`
   - For production: `https://yourdomain.com/`
3. Add Deauthorize Callback URL: `https://yourdomain.com/`
4. Add Data Deletion Request URL: `https://yourdomain.com/` (optional)

## Step 4: Generate Access Token

### Option A: Using Facebook Graph API Explorer (Recommended)

1. Go to https://developers.facebook.com/tools/explorer/
2. Select your app from the dropdown
3. Add permissions: `instagram_basic`, `pages_read_engagement`
4. Generate User Token
5. Exchange for Long-Lived Token (valid for 60 days)

### Option B: Using Instagram Basic Display API

1. Go to "Basic Display" in your app settings
2. Use the "User Token Generator" tool
3. Follow the authorization flow
4. Copy the generated access token

## Step 5: Get User ID (Optional)

1. Use the Graph API Explorer with your access token
2. Make a GET request to: `https://graph.instagram.com/me?fields=id&access_token=YOUR_TOKEN`
3. Copy the `id` value

## Step 6: Configure Environment Variables

1. Create a `.env` file in the root of your project (if it doesn't exist)
2. Add the following variables:

```env
# Instagram Basic Display API Configuration
VITE_INSTAGRAM_ACCESS_TOKEN=your_access_token_here
VITE_INSTAGRAM_USER_ID=your_user_id_here  # Optional
```

3. **Important**: Never commit the `.env` file to version control. It's already in `.gitignore`.

## Step 7: Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to the home page
3. The Instagram feed should appear below the "About" section
4. If the feed doesn't load, check the browser console for errors

## Troubleshooting

### Feed Not Loading

- **Check API Token**: Ensure your access token is valid and not expired
- **Check Permissions**: Make sure your token has the required permissions
- **Check CORS**: Instagram API may require proper CORS setup for production
- **Check Console**: Open browser DevTools to see any error messages

### Token Expiration

Instagram tokens expire after 60 days. To refresh:

1. Use the refresh endpoint: `GET https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=CURRENT_TOKEN`
2. Update your `.env` file with the new token
3. Restart your development server

### Rate Limits

Instagram Basic Display API has rate limits:
- 200 requests per hour per access token
- The component caches data to minimize API calls

## Alternative: Using Instagram Embed (Fallback)

If you cannot set up the Instagram Basic Display API, you can use Instagram's embed widget:

1. Go to https://www.instagram.com/asiantiles1982
2. Use Instagram's embed code for individual posts
3. This is less dynamic but doesn't require API setup

## Security Notes

- Never expose your access token in client-side code publicly
- Use environment variables (prefixed with `VITE_` in Vite projects)
- Consider using a backend proxy for production to hide tokens
- Rotate tokens regularly

## Need Help?

For more information, refer to:
- [Instagram Basic Display API Documentation](https://developers.facebook.com/docs/instagram-basic-display-api)
- [Facebook Developers Guide](https://developers.facebook.com/docs/instagram-api)

