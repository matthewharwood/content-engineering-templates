import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";

Deno.serve(async (req: Request) => {
  const url = new URL(req.url);

  // Serve Storybook static files from /storybook path
  if (url.pathname.startsWith("/storybook")) {
    // Remove /storybook prefix and serve from storybook-static directory
    const path = url.pathname.replace("/storybook", "");
    return serveDir(req, {
      fsRoot: "./ui/storybook-static",
      urlRoot: "storybook",
      quiet: true,
    });
  }

  // Redirect root to Storybook
  if (url.pathname === "/") {
    return Response.redirect(new URL("/storybook/", url), 302);
  }

  return new Response("Not Found", { status: 404 });
});