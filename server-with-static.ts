import { serve } from "https://deno.land/std@0.220.1/http/server.ts";
import { serveDir } from "https://deno.land/std@0.220.1/http/file_server.ts";

const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);

  // API routes
  if (url.pathname === "/api/hello" && req.method === "GET") {
    return new Response(JSON.stringify({ message: "Hello from Deno!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Serve static files from ./static directory
  return serveDir(req, {
    fsRoot: "static",
    urlRoot: "/",
  });
};

const port = Deno.env.get("PORT") ? Number(Deno.env.get("PORT")) : 8000;

console.log(`Server running on http://localhost:${port}`);
serve(handler, { port });