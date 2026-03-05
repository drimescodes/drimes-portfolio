import { bimpeThumbnail, bimpe1, bimpe2, bimpe3, bimpe4, bimpe5, bimpe6, bimpe7 } from "../../assets";

const bimpe = {
    title: "Bímpé",
    thumbnail: bimpeThumbnail,
    description:
        "An all-in-one celebration platform — WhatsApp birthday bot, card studio, flipbooks, and surprise calls.",
    overview:
        "Bímpé started as a simple WhatsApp birthday bot for group communities. You set it up once, collect birthdays with a form link, and it handles timely wishes without manual reminders. But it then grew into a full celebration platform — card studio, interactive flipbooks, surprise voice calls, and more coming. Currently serving 4+ WhatsApp groups across different countries.",
    features: [
        "WhatsApp group bot with activation codes, member forms, and admin controls",
        "Card studio with templates, paper textures, 15+ fonts, and PNG downloads",
        "Interactive flipbooks with text, photos, videos, and realistic page-turn effects",
        "Surprise voice calls through Athena for birthdays and special moments",
        "Shareable links for cards, flipbooks, and celebrations",
        "Custom birthday card templates per group, each community can have their own unique graphics",
        "Telegram bot for real-time server logs, health alerts, and VPS status monitoring for myself",
    ],
    tech: ["TanStack Start", "Bun", "SQLite", "Drizzle", "Cloudinary", "Telegram API"],
    challenges: [
        "The WhatsApp bot maxes out a 2GB RAM VPS. Optimized memory usage with algorithmic tricks, and when Docker crashes in production, I fall back to running locally so wishes still go out. Upgrading to 4GB when budget allows",
        "Creating a realistic page-flip effect for flipbooks that feels smooth on mobile devices",
        "Handling media uploads efficiently with size constraints — currently on Cloudinary's free tier which would max out quickly with traffic, so exploring cheaper storage alternatives",
    ],
    technology: "TanStack Start / Bun / SQLite / Drizzle",
    media: [bimpe1, bimpe2, bimpe3, bimpe4, bimpe5, bimpe6, bimpe7],
    github: "#",
    deployed: "https://bimpe.xyz",
};

export default bimpe;
