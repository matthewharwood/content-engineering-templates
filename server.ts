import { serve } from "https://deno.land/std@0.220.1/http/server.ts";

const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);

  // Log incoming requests for debugging
  console.log(`${req.method} ${url.pathname}`);

  if (url.pathname === "/api/hello" && req.method === "GET") {
    return new Response(JSON.stringify({ message: "Hello from Deno!" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
    });
  }

  if (url.pathname === "/" && req.method === "GET") {
    try {
      const html = await Deno.readTextFile("./index.html");
      return new Response(html, {
        status: 200,
        headers: { "Content-Type": "text/html" },
      });
    } catch (error) {
      return new Response("index.html not found", { status: 404 });
    }
  }

  return new Response("Not Found", { status: 404 });
};

const port = Deno.env.get("PORT") ? Number(Deno.env.get("PORT")) : 8000;

console.log(`Server running on http://localhost:${port}`);
serve(handler, { port });