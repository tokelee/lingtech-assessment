# LingTech Assessment

This is an express server written with TypeScript

## Requirements

- [Node.js](https://nodejs.org/) (v22 or later recommended)
- [npm](https://www.npmjs.com/)

## Getting Started

(Optional but Recommended) Switch to the node version used for this project by running

```
nvm install
nvm use
```

### 1. Clone the Repository

```bash
git clone https://github.com/tokelee/lingtech-assessment.git
cd lingtech
```

### 2. Install Dependencies
```
npm install
```

### 3. Development Mode
```
npm run dev
```

### 4. Build for Production
Transpile the TypeScript source code to JavaScript:
```
npm run build
```

### 5. Start Production Server
```
npm start
```

### 6. Run Test
```
npm test
```

## Testing with Postman
You can test the API endpoints using [Postman](https://www.postman.com/downloads/)

### Steb-by-Step
1. **Start the development server**
```bash
npm run dev
```

By default, the server runs on: http://127.0.0.1:5000
(Change the port in src/server.ts if needed.)

2. **Open Postman and create a new request.**
3. **Example Requests**

### GET /tasks

### POST /tasks
Body: (raw, JSON)
```json
{
    "title":"Read Lean Start-up",
    "description":"Read a book on lean startup",
    "status":"pending"
}
```

### PUT /tasks/:id
Body: (raw, JSON)
```json
{
    "title":"Read Lean Start-up",
    "description":"Read a book on lean startup",
    "status":"completed"
}
```

### DELETE /tasks/:id

## Project Structure
<pre>
.
├── dist/                         # Compiled JS output (auto-generated after build)
├── src/
│   ├── controllers/              # Folder for controller logic
│   ├── middlewares/              # Folder for middlewares
│   ├── routes/                   # Folder for route definitions
│   ├── utils/                    # Folder for helper functions
│   └── server.ts                 # Entry point to your app
├── tasks.json                    # In-memory JSON data store
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Project metadata and dependencies
└── README.md                     # Project documentation
</pre>