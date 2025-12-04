# Instagram Feed Integration Guide

This guide explains how to set up an auto-updating Instagram feed for @asiantiles1982.

## Quick Start - Choose Your Service

### Option 1: Curator.io (Recommended - Easiest Setup)

**Pros:**
- Free tier available
- No API tokens needed
- Auto-updates with new posts
- Easy customization
- Professional appearance

**Steps:**
1. Visit https://curator.io/ and sign up (free account available)
2. Click "Create Feed" → Select "Instagram"
3. Enter Instagram username: `asiantiles1982`
4. Customize the feed:
   - Layout: Grid (3 columns)
   - Posts per row: 3
   - Show: 6-9 posts
   - Style: Match your website design
5. Click "Get Code" → Copy the embed code
6. Open `src/components/InstagramFeed.tsx`
7. Find the section labeled `OPTION 1: Curator.io Feed Widget`
8. Replace the placeholder div with your Curator embed code
9. Change `className="hidden"` to `className=""` on the curator container
10. Save and refresh your website

**Example Curator Code Structure:**
```html
<div id="curator-feed-default-feed-layout">
  <a href="https://curator.io" target="_blank" class="crt-logo crt-tag">Powered by Curator.io</a>
</div>
<script type="text/javascript">
(function(){
  var i, e, d = document, s = "script";
  i = d.createElement("script");
  i.src = "https://cdn.curator.io/published/YOUR_FEED_ID.js";
  i.async = true;
  e = d.getElementsByTagName(s)[0];
  e.parentNode.insertBefore(i, e);
})();
</script>
```

---

### Option 2: EmbedSocial (Good Alternative)

**Pros:**
- Free plan available
- Auto-updates
- Good customization options
- Professional widgets

**Steps:**
1. Visit https://embedsocial.com/products/embedfeed/
2. Sign up for free account
3. Connect Instagram account: `asiantiles1982`
4. Customize widget:
   - Layout: Grid
   - Columns: 3 (desktop), 2 (tablet)
   - Style: Match website design
5. Copy the embed script code
6. Open `src/components/InstagramFeed.tsx`
7. Find the section labeled `OPTION 2: EmbedSocial Feed Widget`
8. Replace the placeholder with your EmbedSocial script
9. Change `className="hidden"` to `className=""` on the container
10. Save and refresh

---

### Option 3: Instafeed.js with Instagram Graph API (Advanced)

**Pros:**
- Full control over design
- No third-party branding
- Customizable

**Cons:**
- Requires Instagram Graph API access
- Requires Facebook Developer account
- More complex setup
- Tokens need renewal every 60 days

**Steps:**
1. Create Facebook Developer account at https://developers.facebook.com/
2. Create a new app
3. Add "Instagram Graph API" product
4. Generate User Access Token for @asiantiles1982
5. Install instafeed.js: `npm install instafeed.js`
6. Update `InstagramFeed.tsx` with Instafeed configuration

**Example Code:**
```javascript
import Instafeed from 'instafeed.js';

const feed = new Instafeed({
  accessToken: 'YOUR_INSTAGRAM_ACCESS_TOKEN',
  target: 'instagram-feed-container',
  limit: 6,
  template: '<a href="{{link}}" target="_blank" class="instagram-post"><img src="{{image}}" /></a>'
});
feed.run();
```

---

## Design Customization

The component is already styled to match the Tilak Stone Arts Instagram design style:

- **Profile Header**: Circular profile picture, account name, stats, follow button
- **Grid Layout**: Seamless 3-column grid (responsive)
- **Post Cards**: Square aspect ratio, hover effects, video/carousel indicators
- **Colors**: Matches your website's accent colors

### Customizing Widget Styles

After integrating your chosen service, you may need to add custom CSS to match the design exactly. Add styles to the `<style>` tag in the component.

**Example for Curator.io:**
```css
#curator-feed-container .crt-post {
  border-radius: 0 !important;
  margin: 0 !important;
}

#curator-feed-container .crt-post-image {
  aspect-ratio: 1 / 1 !important;
}
```

---

## Troubleshooting

### Widget Not Showing

1. **Check if container is hidden**: Ensure `className="hidden"` is removed from your widget container
2. **Check console**: Open browser DevTools (F12) and check for JavaScript errors
3. **Verify embed code**: Make sure you copied the complete embed code
4. **Check service status**: Verify your Curator.io/EmbedSocial account is active

### Posts Not Updating

1. **Check service settings**: Ensure auto-refresh is enabled in your widget dashboard
2. **Clear cache**: Clear browser cache and website cache
3. **Verify account connection**: Check that Instagram account is properly connected in widget settings

### Design Issues

1. **Custom CSS**: Add custom styles to override widget defaults
2. **Responsive breakpoints**: Adjust grid columns in the CSS for mobile/tablet
3. **Match colors**: Update widget color settings to match your brand

---

## Recommended Configuration

**For Best Results:**
- Use **Curator.io** (easiest, most reliable)
- Display **6-9 posts**
- **3 columns** desktop, **2 columns** tablet, **1 column** mobile
- Enable **auto-refresh** every hour
- Hide **widget branding** if possible (some services require it on free plans)

---

## Support

- **Curator.io Support**: https://help.curator.io/
- **EmbedSocial Support**: https://embedsocial.com/support/
- **Instagram API Docs**: https://developers.facebook.com/docs/instagram-api/

---

## Quick Integration Checklist

- [ ] Choose service (recommend Curator.io)
- [ ] Sign up and create feed for @asiantiles1982
- [ ] Customize widget to match design
- [ ] Copy embed code
- [ ] Paste into `InstagramFeed.tsx`
- [ ] Remove `hidden` class from widget container
- [ ] Test on desktop, tablet, and mobile
- [ ] Verify posts auto-update
- [ ] Customize colors/styling if needed

