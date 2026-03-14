# Posts API Project

A RESTful API for a blogging platform built with **pure Node.js (HTTP module)**.  
**⚠️ This project is for training purposes only, to demonstrate deep understanding of Node.js core (HTTP module, file system, crypto, etc.) before moving to frameworks like Express.**
---

## Description

This project helps in learning and practicing:

* Core JavaScript concepts
* Node.js core modules (HTTP, FS, etc.)
* Handling CORS (Cross-Origin Resource Sharing)
* Working with HTTP methods: GET, POST, PUT, DELETE
* Implementing custom middleware

---

## Features

* Create, Read, Update, Delete posts (CRUD operations for posts)
* Custom CORS middleware
* User authentication (Basic Auth + JWT)
* Token generation & validation (with expiry)
* Protected routes (authentication required)
* Ownership validation (users can only edit/delete their own posts)
* Centralized error handling
* JSON file-based storage (`users.json`, `posts.json`)

---

## Requirements

* Node.js v24.6.0
* npm v11.5.1

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/MajidRS/posts-api.git
```

2. Navigate to the project folder:

```bash
cd posts-api
```

3. Install dependencies:

```bash
npm install
```

---

## Usage

1. Start the server:

```bash
node index.js
```

2. Test API endpoints using tools like **Postman** or browser fetch requests:

* `GET /posts` – Retrieve all posts
* `GET /posts/:id` – Retrieve a post by ID
* `POST /posts` – Create a new post
* `PUT /posts/:id` – Update a post by ID
* `DELETE /posts/:id` – Delete a post by ID

3. Make sure your requests come from allowed origins if using CORS middleware.

---

## License

MIT License
