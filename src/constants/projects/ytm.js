import { ytmThumbnail, ytm1, ytm2, ytm3, ytm4, ytm5, ytm6 } from "../../assets";

const ytm = {
    title: "YTM Now Playing",
    thumbnail: ytmThumbnail,
    description:
        "A browser extension that tracks what you're listening to on YouTube Music and shares it in real-time.",
    overview:
        "A Chrome and Firefox extension that detects the currently playing song on YouTube Music and syncs it to a Supabase database in real-time. I built it so my portfolio website can show a live 'Now Playing' widget if I'm listening to music, visitors can see the track, artist, album art, and playback status. It's open-source, so anyone can self-host it and add a Now Playing widget to their own site.",
    features: [
        "Real-time song detection from YouTube Music tabs",
        "Supabase auth with email/password sign-up and sign-in",
        "Atomic upsert to prevent duplicate database entries",
        "Auto token refresh with retry logic for reliable syncing",
        "Live 'Now Playing' widget on my portfolio site via Supabase Realtime",
        "Open-source and self-hostable which means anyone can use the extension by installing and following my tutorial, or fork and self-host their own setup",
    ],
    tech: ["JavaScript", "Chrome Extensions API", "Supabase"],
    challenges: [
        "Duplicate entries in the database caused by a race condition in the original GET-then-INSERT logic, I fixed it by switching to Supabase's native upsert with a UNIQUE constraint on user_id",
        "Getting the extension approved on both Chrome Web Store and Mozilla Add-ons cause each has different manifest requirements for Manifest V3",
        "Reverse-engineering YouTube Music's DOM to find the right IDs and classes for scraping song data cause there were no public API or documentation to reference",
    ],
    media: [ytm1, ytm2, ytm3, ytm4, ytm5, ytm6],
    technology: "JavaScript / Chrome API / Supabase",
    github: "https://github.com/drimescodes/ytm-extension",
    deployed: "https://chromewebstore.google.com/detail/ytm-now-playing/cdolfnamdlfmngfeieemflillohdbjcl",
    links: [
        { label: "Chrome Web Store", url: "https://chromewebstore.google.com/detail/ytm-now-playing/cdolfnamdlfmngfeieemflillohdbjcl" },
        { label: "Firefox Add-ons", url: "https://addons.mozilla.org/addon/ytm-now-playing/" },
        { label: "Tutorial", url: "https://medium.com/@drimesbot/how-to-show-what-youre-currently-listening-to-on-your-personal-website-or-portfolio-spotify-635f433978a0" },
    ],
};

export default ytm;
