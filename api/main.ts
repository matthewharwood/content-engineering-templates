import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";

Deno.serve(async (req) => {
  const url = new URL(req.url);

  // API endpoint
  if (url.pathname === "/api/hello") {
    return new Response("Hello, world!");
  }

  // Serve Storybook from /storybook path
  if (url.pathname.startsWith("/storybook")) {
    const path = url.pathname.replace("/storybook", "");
    return serveDir(req, {
      fsRoot: "./ui/storybook-static",
      urlRoot: "storybook",
      quiet: true,
    });
  }

  // Serve main index.html for root
  if (url.pathname === "/") {
    try {
      const html = await Deno.readTextFile("./index.html");
      return new Response(html, {
        headers: { "Content-Type": "text/html" }
      });
    } catch (error) {
      return new Response("Error loading index.html", { status: 500 });
    }
  }

  return new Response("Not found", { status: 404 });
});