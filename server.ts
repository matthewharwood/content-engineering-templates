// Using Deno.serve() - the recommended API for Deno Deploy
const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Deno Server</title>
    <style>
        body {
            font-family: system-ui, -apple-system, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .container {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            margin-bottom: 1rem;
        }
        button {
            background: #667eea;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            transition: background 0.2s;
        }
        button:hover {
            background: #5a67d8;
        }
        #response {
            margin-top: 1.5rem;
            padding: 1rem;
            background: #f7fafc;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
            min-height: 50px;
        }
        pre {
            margin: 0;
            font-family: 'Courier New', monospace;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Deno Server</h1>
        <p>Click the button below to test the API endpoint:</p>
        <button onclick="fetchHello()">Call /api/hello</button>
        <div id="response"></div>
    </div>

    <script>
        async function fetchHello() {
            const responseDiv = document.getElementById('response');
            responseDiv.innerHTML = 'Loading...';

            try {
                const response = await fetch('/api/hello');
                const data = await response.json();
                responseDiv.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
            } catch (error) {
                responseDiv.innerHTML = '<pre>Error: ' + error.message + '</pre>';
            }
        }
    </script>
</body>
</html>`;

Deno.serve((req: Request) => {
  const url = new URL(req.url);

  console.log(`[${new Date().toISOString()}] ${req.method} ${url.pathname}`);

  // Handle /api/hello
  if (url.pathname === "/api/hello") {
    return new Response(
      JSON.stringify({
        message: "Hello from Deno Deploy!",
        timestamp: new Date().toISOString(),
        deployment: "production"
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
      }
    );
  }

  // Handle root path
  if (url.pathname === "/") {
    return new Response(html, {
      status: 200,
      headers: { "Content-Type": "text/html" },
    });
  }

  // 404 for everything else
  return new Response(`Not Found: ${url.pathname}`, {
    status: 404,
    headers: { "Content-Type": "text/plain" }
  });
});