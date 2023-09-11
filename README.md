# **BlogAPI-backend Documentation**

This is the documentation for the Blog API, a Node.js application built with TypeScript, Prisma, and PostgreSQL. This API allows users to interact with blog posts, including retrieving, adding, editing, and deleting posts. It also provides pagination and search functionality.

```bash
## Getting Started

Prerequisites
Before you begin, ensure you have met the following requirements:

- Node.js installed (v14 or higher)
- PostgreSQL installed and running
- Prisma CLI installed globally (**`yarn install -g prisma`**)
- 
```

### **Installing**

Clone the repository to your local machine.

In the root directory, create a .env file and add the
following environment variables:

1. Clone the repository to your local machine.
2. Install the required dependencies with npm install
3. In the root directory, create a **`.env`** file based on the **`.env.example`** file, and update the values as needed with the following variables

- DATABASE_URL= **`cloud postgres`**
- NODE_ENV= **`either development or production`**
4. Run **`yarn install`** to install the required packages.
5. The API server will start running on http://localhost:5000. You can now send HTTP requests to the API endpoints.
6. Run **`yarn db:migrate`** to create a new database.
7. Run **`yarn db:push`** to push the prisma schema to the database.

```bash
## Running

To start the API, **`yarn run dev`**.
```


