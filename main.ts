// Minimal server to test Deno Deploy
Deno.serve((req: Request) => {
  const url = new URL(req.url);
  console.log(`Request: ${req.method} ${url.pathname}`);

  if (url.pathname === "/api/hello") {
    return new Response(JSON.stringify({ message: "Hello from main.ts!" }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  if (url.pathname === "/") {
    return new Response("Server is running! Try /api/hello", {
      headers: { "Content-Type": "text/plain" },
    });
  }

  return new Response(`Not Found: ${url.pathname}`, { status: 404 });
});