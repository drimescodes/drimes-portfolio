import { glorionThumbnail, glorion1, glorion2, glorion3, glorion4, glorion5, glorion6 } from "../../assets";

const glorion = {
    title: "GlorionMatrix",
    thumbnail: glorionThumbnail,
    description:
        "A professional portfolio and service platform for a mechanical design engineer, comes with admin dashboard and payment links.",
    overview:
        "GlorionMatrix is a freelance portfolio site built for a mechanical engineer. It showcases the engineer's specialized service areas, handles quote requests via a contact form, and includes an admin dashboard where the owner can generate payment links for clients. I built the entire frontend while Jude handled the backend.",
    features: [
        "Quote request form connected to MongoDB",
        "Admin dashboard for managing inquiries and generating payment links",
        "Responsive design and modern UI",
        "Email notifications for new consultation requests",
        "Payment Integration"
    ],
    tech: ["Next.js", "Tailwind CSS", "MongoDB"],
    challenges: [
        "Designing a visually professional site that matches the engineering/industrial aesthetic the client wanted",
        "Coordinating frontend and backend work with a collaborator on a tight timeline",
    ],
    collaborator: {
        name: "Jude",
        role: "Backend",
        url: "https://jude-portfolio-2-0.vercel.app/",
    },
    media: [glorion1, glorion2, glorion3, glorion4, glorion5, glorion6],
    technology: "Next.js / Tailwind / MongoDB",
    github: "#",
    deployed: "https://www.glorionmatrix.com/",
};

export default glorion;
