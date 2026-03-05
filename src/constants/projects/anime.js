import { animeThumbnail, anime1, anime2, anime3, anime4, anime5, anime6, anime7, anime8 } from "../../assets";

const anime = {
    title: "Anime Homepage",
    thumbnail: animeThumbnail,
    description:
        "A browser extension that replaces your new tab with a beautiful anime-themed homepage.",
    overview:
        "A new tab extension built with React and Tailwind, bundled as a browser extension using Vite and @crxjs/vite-plugin. What makes it special is the tech stack — most extensions are plain HTML/JS, but this one runs a full React app. Published on both the Chrome Web Store and Mozilla Add-ons.",
    features: [
        "Replaces the default new tab with a custom anime-themed homepage",
        "Built with React + Tailwind inside a browser extension using @crxjs/vite-plugin",
        "Available on both Chrome Web Store and Firefox Add-ons",
    ],
    tech: ["React", "Vite", "Tailwind CSS", "@crxjs/vite-plugin", "Chrome Extensions API"],
    challenges: [
        "Configuring vite.config with @crxjs/vite-plugin and Rollup inputs to properly bundle the extension",
        "First time publishing an extension — navigating the Chrome Web Store and Mozilla review process took longer than expected",
    ],
    media: [anime1, anime2, anime3, anime4, anime5, anime6, anime7, anime8],
    technology: "React / Vite / Tailwind/ Chrome API",
    github: "https://github.com/drimescodes/anime-homepage-chrome-extension",
    deployed: "https://chromewebstore.google.com/detail/anime-homepage/dclbfojkakokhpbapajblnpojoojaeld",
    links: [
        { label: "Chrome Web Store", url: "https://chromewebstore.google.com/detail/anime-homepage/dclbfojkakokhpbapajblnpojoojaeld" },
        { label: "Firefox Add-ons", url: "https://addons.mozilla.org/en-US/firefox/addon/anime-homepage/" },
    ],
};

export default anime;
