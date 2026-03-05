import { hangmanThumbnail } from "../../assets";

const hangman = {
    title: "Hangman Game",
    thumbnail: hangmanThumbnail,
    description:
        "A word web game, you are to guess a word letter by letter which you are given 7 tries for each word",
    overview:
        "One of my earliest projects. I wanted to build something fun to practice vanilla JavaScript and DOM manipulation. The game picks a random word and you guess it letter by letter with only 7 tries. Simple concept, but it taught me a lot about state management before I even knew what that was.",
    features: [
        "Random word generation from a curated word list",
        "Visual hangman drawing that updates with each wrong guess",
        "Keyboard input with letter tracking",
    ],
    tech: ["JavaScript", "Tailwind CSS"],
    technology: "VanillaJs / Tailwind",
    media: [],
    github: "#",
    deployed: "https://hangman-game-sooty.vercel.app/",
};

export default hangman;
