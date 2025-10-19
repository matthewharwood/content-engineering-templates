// MIME type mappings
const MIME_TYPES: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".ogg": "video/ogg",
};

function getMimeType(pathname: string): string {
  const ext = pathname.substring(pathname.lastIndexOf("."));
  return MIME_TYPES[ext] || "application/octet-stream";
}

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // API routes
  if (pathname === "/api/hello") {
    return new Response("Hello, world!");
  }

  // Serve index.html for root
  if (pathname === "/") {
    try {
      const html = await Deno.readTextFile("./index.html");
      return new Response(html, {
        headers: { "Content-Type": "text/html" }
      });
    } catch (error) {
      return new Response("Error loading index.html", { status: 500 });
    }
  }

  // Serve static files
  try {
    // Remove leading slash and construct file path
    const filePath = `.${pathname}`;
    const file = await Deno.readFile(filePath);
    const mimeType = getMimeType(pathname);

    return new Response(file, {
      headers: { "Content-Type": mimeType }
    });
  } catch (error) {
    // File not found
    return new Response("Not found", { status: 404 });
  }
});