export const config = {
    matcher: ["/thoughts", "/thoughts/:path*"],
};

export default function middleware(request) {
    const userAgent = request.headers.get("user-agent") || "";

    const isCrawler =
        /twitterbot|facebookexternalhit|linkedinbot|whatsapp|slackbot|discordbot|telegrambot|googlebot/i.test(
            userAgent
        );

    if (!isCrawler) return; // let real users through normally

    // Return a bare-bones page with the right OG tags for crawlers
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Drimes — Thoughts</title>
  <meta name="description" content="Things on my mind, written down." />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Drimes — Thoughts" />
  <meta property="og:description" content="Things on my mind, written down." />
  <meta property="og:image" content="https://drimes.dev/og-image.jpg" />
  <meta property="og:url" content="${request.url}" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Drimes — Thoughts" />
  <meta name="twitter:description" content="Things on my mind, written down." />
  <meta name="twitter:image" content="https://drimes.dev/og-image.jpg" />
</head>
<body></body>
</html>`;

    return new Response(html, {
        headers: { "content-type": "text/html" },
    });
}
