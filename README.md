# 📝 Task Management API  

## 📌 Introduction  
A simple **RESTful API** for managing daily tasks. The project is designed using **Three Layers Architecture** to ensure clean structure, maintainability, and scalability.  

---

## ⚙️ Requirements  
- Node.js (v18 or higher)  
- npm  
- MongoDB  

---

## 🚀 Installation & Usage  

1. Clone the repository:  
   ```bash
   git clone https://github.com/AbdelrahmanMahmoud92/Task-Management
   cd <project-folder>
   ```

2. Install dependencies:  
   ```bash
   npm install
   ```

3. Run the project:  
   ```bash
   nodemon index.js
   ```

4. The API will be running at:
   http://localhost:3000/

   You can test the endpoints using:
   - Postman (import the provided collection in `/Postman/Task Management.postman_collection.json`)
   - Or directly with curl commands
     
5. API documentation is available at:
   http://localhost:3000/api-docs
---

## 📂 Project Structure  

- **Repository Layer (Data Layer):** Handles database models and MongoDB queries.  
- **Service Layer (Server Layer):** Contains business logic and functions interacting with the repository.  
- **Business Layer (Routes Layer):** Defines API routes and manages request/response handling.  

---

## 📮 API Documentation  

All API endpoints are documented with **Swagger**.  
After running the server, you can access the docs at:  

```
http://localhost:5000/api-docs
```

---

## 👨‍💻 Author  
Developed by [Abdelrahman Mahmoud].  
