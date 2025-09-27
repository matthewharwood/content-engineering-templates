Deno.serve(async (req) => {
  const url = new URL(req.url);

  if (url.pathname === "/api/hello") {
    return new Response("Hello, world!");
  }

  if (url.pathname === "/") {
    try {
      const html = await Deno.readTextFile("../index.html");
      return new Response(html, {
        headers: { "Content-Type": "text/html" }
      });
    } catch (error) {
      return new Response("Error loading index.html", { status: 500 });
    }
  }

  return new Response("Not found", { status: 404 });
});