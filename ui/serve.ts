import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";

// Separate Deno server just for Storybook
Deno.serve({ port: 6006 }, async (req) => {
  const url = new URL(req.url);

  // Serve Storybook static files
  return serveDir(req, {
    fsRoot: "./ui/storybook-static",
    quiet: true,
  });
});