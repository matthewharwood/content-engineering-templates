Deno.serve((request: Request) => {
  const url = new URL(request.url);

  // API endpoint
  if (url.pathname === "/api/hello") {
    const data = {
      message: "Hello from Deno Deploy!",
      timestamp: new Date().toISOString(),
      method: request.method
    };
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // Home page
  if (url.pathname === "/") {
    const html = `<!DOCTYPE html>
<html>
<head>
  <title>Deno API</title>
</head>
<body>
  <h1>Simple Deno API</h1>
  <button onclick="callApi()">Call API</button>
  <pre id="result"></pre>
  <script>
    async function callApi() {
      const res = await fetch('/api/hello');
      const data = await res.json();
      document.getElementById('result').innerText = JSON.stringify(data, null, 2);
    }
  </script>
</body>
</html>`;
    return new Response(html, {
      headers: { "Content-Type": "text/html" },
    });
  }

  // 404 for other routes
  return new Response("Not found", { status: 404 });
});