import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <title>My Blog</title>
      <meta property="description" content="Search engine description" />
      <meta property="og:image" content="Link preview image URL" />
      <meta property="og:site_name" content="Link preview site name" />
      <meta property="og:url" content="Canonical link preview URL" />
      <meta property="og:description" content="Link preview description" />
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
