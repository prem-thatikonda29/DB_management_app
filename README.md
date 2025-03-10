<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Database Management Web Application - README</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        h1, h2 {
            color: #333;
        }
        code {
            background-color: #eee;
            padding: 3px 6px;
            border-radius: 4px;
        }
        pre {
            background-color: #eee;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
        }
        .container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📦 Database Management Web Application</h1>
        <p>A powerful and efficient MERN stack-based web application for managing and organizing databases with an intuitive admin panel.</p>
        
        <h2>🚀 Features</h2>
        <ul>
            <li>View all products in grid and list format</li>
            <li>Add new products using a form</li>
            <li>Edit and delete products with confirmation modals</li>
            <li>Pagination for efficient product browsing</li>
            <li>Image upload support with Multer</li>
        </ul>
        
        <h2>🛠 Tech Stack</h2>
        <ul>
            <li><strong>Frontend:</strong> React, Tailwind CSS</li>
            <li><strong>Backend:</strong> Node.js, Express.js</li>
            <li><strong>Database:</strong> MongoDB</li>
            <li><strong>File Uploads:</strong> Multer</li>
        </ul>
        
        <h2>⚡ Installation & Setup</h2>
        <pre><code>git clone https://github.com/your-repo/db-management-app.git
cd db-management-app
npm install
npm start</code></pre>
        
        <h2>📌 API Endpoints</h2>
        <ul>
            <li><code>GET /api/products</code> - Fetch all products</li>
            <li><code>POST /api/products</code> - Add a new product</li>
            <li><code>PUT /api/products/:id</code> - Update a product</li>
            <li><code>DELETE /api/products/:id</code> - Delete a product</li>
        </ul>
        
        <h2>📷 Screenshot</h2>
        <p><img src="screenshot.png" alt="App Screenshot" width="100%"></p>
        
        <h2>👨‍💻 Contributing</h2>
        <p>Feel free to fork this repository and submit pull requests. Any contributions are welcome!</p>
    </div>
</body>
</html>
