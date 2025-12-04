import { Instagram, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const INSTAGRAM_USERNAME = "asiantiles1982";
const INSTAGRAM_DISPLAY_NAME = "Asian Tiles";
const INSTAGRAM_URL = "https://www.instagram.com/asiantiles1982";

/**
 * Instagram Feed Component - Auto-Updating Feed
 * 
 * INTEGRATION OPTIONS:
 * 
 * OPTION 1 - Curator.io (Recommended):
 * 1. Sign up at https://curator.io/
 * 2. Create feed for @asiantiles1982
 * 3. Get embed code from Curator dashboard
 * 4. Replace the Curator.io section below with your embed code
 * 
 * OPTION 2 - EmbedSocial:
 * 1. Sign up at https://embedsocial.com/products/embedfeed/
 * 2. Connect Instagram: asiantiles1982
 * 3. Customize widget
 * 4. Replace EmbedSocial section below with embed code
 * 
 * OPTION 3 - Instafeed.js with Instagram Graph API:
 * Requires Instagram Graph API access token
 * See INSTAGRAM_INTEGRATION_GUIDE.md for setup
 */
export const InstagramFeed = () => {
  useEffect(() => {
    // Load Instagram embed script for any individual post embeds
    const scriptId = "instagram-embed-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }

    // Process Instagram embeds after script loads
    const scriptElement = document.getElementById(scriptId) as HTMLScriptElement;
    if (scriptElement) {
      scriptElement.onload = () => {
        // @ts-ignore - Instagram embed script adds this globally
        if (window.instgrm) {
          // @ts-ignore
          window.instgrm.Embeds.process();
        }
      };
    }
  }, []);

  return (
    <section className="py-12 md:py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
            <Instagram className="w-6 h-6" />
            <span>FOLLOW US</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            Latest from <span className="text-accent">Instagram</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Follow @{INSTAGRAM_USERNAME} for the latest updates and inspiration
          </p>
        </div>

        {/* Instagram Feed Container - Matches Tilak Stone Arts Design */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-elegant overflow-hidden">
            {/* Profile Header - Matching Instagram Profile Style */}
            <div className="instagram-header border-b border-border/50 px-6 md:px-12 py-8 md:py-12">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12">
                {/* Profile Picture */}
                <div className="relative flex-shrink-0">
                  <div className="w-24 h-24 md:w-[150px] md:h-[150px] rounded-full bg-gradient-accent flex items-center justify-center shadow-glow ring-2 ring-border/30">
                    <Instagram className="w-12 h-12 md:w-16 md:h-16 text-accent-foreground" />
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-light text-foreground mb-2 md:mb-4">
                    {INSTAGRAM_DISPLAY_NAME}
                    <span className="text-lg md:text-xl text-muted-foreground font-normal ml-2">
                      @{INSTAGRAM_USERNAME}
                    </span>
                  </h2>

                  {/* Stats */}
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-8 mb-4 md:mb-6 text-sm md:text-base">
                    <span className="text-foreground">
                      <strong className="font-semibold">252</strong> Posts
                    </span>
                    <span className="text-foreground">
                      <strong className="font-semibold">235K</strong> Followers
                    </span>
                    <span className="text-foreground">
                      <strong className="font-semibold">93</strong> Following
                    </span>
                  </div>

                  {/* Follow Button */}
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#d4a574] to-[#b8860b] hover:from-[#c8955f] hover:to-[#a5760a] text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 font-semibold px-6 py-2.5"
                    >
                      <Instagram className="mr-2 w-4 h-4" />
                      Follow
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            {/* OPTION 1: Curator.io Feed Widget */}
            {/* 
              INSTRUCTIONS:
              1. Sign up at https://curator.io/
              2. Create a new feed
              3. Add Instagram source: @asiantiles1982
              4. Customize the layout to match design
              5. Copy the embed code from Curator dashboard
              6. Replace the div below with your Curator embed code
              
              Example Curator code structure:
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
            */}
            <div id="curator-feed-container" className="hidden">
              {/* Curator.io embed will be injected here */}
              {/* Replace this div with your actual Curator embed code */}
            </div>

            {/* OPTION 2: EmbedSocial Feed Widget */}
            {/* 
              INSTRUCTIONS:
              1. Sign up at https://embedsocial.com/products/embedfeed/
              2. Connect Instagram account: asiantiles1982
              3. Customize widget appearance
              4. Copy the embed script from EmbedSocial dashboard
              5. Replace the script tag below with your EmbedSocial code
            */}
            <div id="embedsocial-instagram-feed-container" className="hidden">
              {/* EmbedSocial widget will be injected here */}
            </div>
            {/* <script id="embedsocial-instagram-script" src="YOUR_EMBEDSOCIAL_WIDGET_URL.js"></script> */}

            {/* OPTION 3: Fallback - Instagram Grid (Temporary until widget is set up) */}
            {/* This section shows a styled grid matching the design */}
            <div id="instagram-feed-fallback" className="p-4 md:p-6">
              <div className="instagram-grid">
                {/* Placeholder posts - These will be replaced by the widget */}
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <a
                    key={item}
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="instagram-post group"
                  >
                    <div className="instagram-post-image">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 flex items-center justify-center">
                        <Instagram className="w-12 h-12 text-muted-foreground/20 group-hover:text-accent/40 transition-colors" />
                      </div>
                      {/* Video/Carousel Icon Placeholder */}
                      <div className="media-icon opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg
                          className="w-6 h-6 text-white drop-shadow-lg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      {/* Hover Overlay */}
                      <div className="instagram-post-overlay" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* View More Section */}
            <div className="border-t border-border/50 px-6 md:px-12 py-6 text-center">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold transition-colors"
              >
                View Full Profile on Instagram
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles for Instagram Feed - Matching Tilak Stone Arts Design */}
      <style>{`
        /* Instagram Header */
        .instagram-header {
          background: #ffffff;
        }

        /* Instagram Grid - Seamless, no gaps */
        .instagram-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          margin: 0;
          width: 100%;
        }

        /* Instagram Post Card */
        .instagram-post {
          position: relative;
          display: block;
          width: 100%;
          padding-bottom: 100%; /* Square aspect ratio */
          overflow: hidden;
          cursor: pointer;
          background: #fafafa;
        }

        .instagram-post-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .instagram-post-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .instagram-post:hover .instagram-post-image img {
          transform: scale(1.05);
        }

        /* Media Type Icons (Video/Carousel) */
        .media-icon {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 10;
          pointer-events: none;
        }

        /* Hover Overlay */
        .instagram-post-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0);
          transition: background 0.3s ease;
          pointer-events: none;
        }

        .instagram-post:hover .instagram-post-overlay {
          background: rgba(0, 0, 0, 0.1);
        }

        /* Curator.io Styles */
        #curator-feed-container {
          padding: 0;
        }

        #curator-feed-container .crt-post {
          border-radius: 0 !important;
        }

        #curator-feed-container .crt-post-image {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }

        /* EmbedSocial Styles */
        #embedsocial-instagram-feed-container {
          padding: 0;
        }

        /* Responsive Design - Mobile First Approach */
        /* Mobile: 2 columns */
        @media (max-width: 767px) {
          .instagram-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem;
          }

          .instagram-header {
            padding: 16px;
          }

          .instagram-header .flex {
            gap: 16px;
          }
          
          .instagram-section {
            padding: 2rem 0;
          }
        }

        /* Tablet: 3 columns */
        @media (min-width: 768px) and (max-width: 1023px) {
          .instagram-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.75rem;
          }
        }

        /* Desktop: 3 columns */
        @media (min-width: 1024px) {
          .instagram-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 0;
          }
        }

        /* Hide placeholder when widget is active */
        #curator-feed-container:not(.hidden) ~ #instagram-feed-fallback,
        #embedsocial-instagram-feed-container:not(.hidden) ~ #instagram-feed-fallback {
          display: none;
        }
      `}</style>
    </section>
  );
};
