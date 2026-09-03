import React from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import thoughts from "../constants/thoughts";

const ThoughtDetail = () => {
    const { slug } = useParams();
    const thought = thoughts.find((t) => t.slug === slug);

    if (!thought) {
        return (
            <div className="flex justify-center min-h-screen items-center">
                <div className="text-center">
                    <h2 className="text-[#cacaca] text-2xl font-medium">
                        Thought not found
                    </h2>
                    <Link
                        to="/thoughts"
                        className="text-[#54d5bb] hover:underline mt-4 inline-block"
                    >
                        Back to thoughts
                    </Link>
                </div>
            </div>
        );
    }

    const excerpt = thought.content[0].slice(0, 160) + "...";

    return (
        <>
            <Helmet>
                <title>{thought.title} — Drimes</title>
                <meta name="description" content={excerpt} />
                <meta property="og:title" content={thought.title} />
                <meta property="og:description" content={excerpt} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://drimes-portfolio.vercel.app/thoughts/${thought.slug}`} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={thought.title} />
                <meta name="twitter:description" content={excerpt} />
            </Helmet>
            <div className="flex justify-center min-h-screen md:px-4 mt-16 sm:mt-24">
                <div className="container mx-auto max-w-screen-md">
                    <Link
                        to="/thoughts"
                        className="text-[#54d5bb] hover:underline text-sm"
                    >
                        ← Back to thoughts
                    </Link>
                    <h1 className="text-[#cacaca] text-3xl font-bold mt-6">
                        {thought.title}
                    </h1>
                    <p className="text-[#8892b0] text-sm mt-2 mb-8">{thought.date}</p>

                    <div className="space-y-5">
                        {thought.content.map((paragraph, i) => (
                            <p
                                key={i}
                                className="text-[#cacaca] text-[16px] leading-7"
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ThoughtDetail;
