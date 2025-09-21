import { serve } from "https://deno.land/std@0.220.1/http/server.ts";

const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);

  // Comprehensive logging
  console.log(`[${new Date().toISOString()}] ${req.method} ${url.pathname}${url.search}`);
  console.log(`Headers:`, Object.fromEntries(req.headers.entries()));

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  // API endpoint with exact match
  if (url.pathname === "/api/hello") {
    console.log("Matched /api/hello route");
    if (req.method === "GET") {
      return new Response(JSON.stringify({ message: "Hello from Deno!", timestamp: new Date().toISOString() }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  }

  // Root path
  if (url.pathname === "/" && req.method === "GET") {
    console.log("Matched / route");
    try {
      const html = await Deno.readTextFile("./index.html");
      return new Response(html, {
        status: 200,
        headers: { "Content-Type": "text/html" },
      });
    } catch (error) {
      console.error("Error reading index.html:", error);
      return new Response("index.html not found", { status: 404 });
    }
  }

  // Log unmatched routes
  console.log(`No route matched for: ${url.pathname}`);
  return new Response(`Not Found: ${url.pathname}`, { status: 404 });
};

const port = Deno.env.get("PORT") ? Number(Deno.env.get("PORT")) : 8000;

console.log(`Server running on http://localhost:${port}`);
serve(handler, { port });