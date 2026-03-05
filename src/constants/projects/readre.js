import { readreThumbnail, readre1, readre2, readre3, readre5, readre6, readre7, readre8 } from "../../assets";

const readre = {
    title: "Readre",
    thumbnail: readreThumbnail,
    description:
        "A full-stack blogging platform with Google auth, rich text publishing, comments, and likes.",
    overview:
        "I built Readre during my year 2 holiday to learn FastAPI deeply and sharpen my Next.js skills with a simulated real product. It includes a public reading experience and an authenticated writer workflow. A few days before resuming year 3, this project helped me land a software engineering role.",
    features: [
        "Google OAuth sign-in with backend token verification and cookie-based sessions",
        "Public blog feed with search, slug-based routing, and reading-time metadata",
        "Rich text editor for creating and editing posts with preview mode",
        "Author dashboard to manage personal posts (create, edit, delete)",
        "Comment system with ownership checks for edit/delete and like toggles",
        "Blog and comment likes with real-time count updates in the UI",
        "Cloudinary image uploads for blog cover images",
    ],
    tech: [
        "Next.js (App Router)",
        "TypeScript",
        "Zustand",
        "Tailwind CSS",
        "FastAPI",
        "SQLAlchemy",
        "PostgreSQL (Supabase)",
        "Alembic",
        "Cloudinary",
    ],
    challenges: [
        "Handling cross-origin authentication between separate frontend/backend deployments with secure cookies and CORS",
        "Keeping authorization strict so only content owners can modify posts/comments while public readers can still engage",
        "Managing rich-text content, media uploads, and responsive card layouts without breaking the reading experience",
    ],
    technology: "Next.js / FastAPI / PostgreSQL / SQLAlchemy",
    media: [readre1, readre2, readre3, readre5, readre6, readre7, readre8],
    github: "https://github.com/drimescodes/readre",
    deployed: "https://readre.vercel.app",
    links: [
        { label: "Live App", url: "https://readre.vercel.app" },
        { label: "Frontend Repo", url: "https://github.com/drimescodes/readre" },
        { label: "Backend Repo", url: "https://github.com/drimescodes/readre-backend" },
    ],
};

export default readre;
