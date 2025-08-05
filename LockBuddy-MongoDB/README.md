# LockBuddy (MongoDB + Express Version)

This is the full-stack version of **LockBuddy Password Manager**. The frontend uses React and Tailwind CSS. The backend is built with Express.js and uses MongoDB for persistent storage of passwords.

---

## Features

- Add, edit, and delete passwords with persistent storage
- Password data stored in MongoDB, managed via REST API
- Copy to clipboard functionality
- Responsive UI (Tailwind CSS)
- Modern UX with visual feedback (toasts)

---

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- MongoDB instance (local or remote)

### Environment Variables

Create a `.env` file in the `/lockbuddy-mongodb` directory with:
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=your-database-name
```

### Setup

1. **Navigate to the backend/frontend folder:**
```
cd lockbuddy-mongodb
```

2. **Install dependencies:**
```
npm install
```

**Note:**  
The backend requires `express`, `body-parser`, `cors`, `mongodb`, and `dotenv`.  
If you see "missing module" errors for `body-parser` or `cors`, just run:
```
npm install body-parser cors
```

3. **Start MongoDB** (if local):
```
mongod
```

4. **Run the backend server:**
```
node server.js
```

5. **In another terminal, run the frontend:**
```
npm run dev
```

6. By default, backend runs on [http://localhost:3000](http://localhost:3000).

---

## Notes

- Ensure your MongoDB server is running and accessible at the address in your `.env`.
- Passwords are stored in the "passwords" collection of your MongoDB database.

---

## License

For educational/demonstration use.
