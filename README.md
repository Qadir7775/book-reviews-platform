# Book Reviews Platform

A full-stack web application for managing and reviewing books, built with React/Next.js frontend and Node.js/Express backend.

## Features

- **User Authentication**: Sign up, sign in, and secure user sessions
- **Book Management**: Add, edit, delete, and view books
- **Responsive Design**: Modern UI that works on all devices
- **Real-time Updates**: Immediate feedback for all operations
- **Secure API**: JWT-based authentication with protected routes

## Tech Stack

### Frontend

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Redux Toolkit** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form handling

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication

## Project Structure

```
book-reviews-platform/
├── Back/                    # Backend Node.js/Express application
│   ├── controllers/        # Route controllers
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── middlewares/       # Custom middleware
│   └── app.js            # Main server file
├── Front/                  # Frontend Next.js application
│   └── client/
│       ├── src/
│       │   ├── api/       # API service functions
│       │   ├── app/       # Next.js app router pages
│       │   ├── components/ # React components
│       │   ├── store/     # Redux store and slices
│       │   └── types/     # TypeScript type definitions
│       └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- Git

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd Back
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with your MongoDB connection string:

   ```env
   MONGO_URI=mongodb://localhost:27017/book-reviews
   PORT=5001
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

The backend will run on `http://localhost:5001`

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd Front/client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5001
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login

### Books

- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get a specific book
- `POST /api/books` - Create new books (requires authentication)
- `PUT /api/books/:id` - Update a book (requires authentication)
- `DELETE /api/books/:id` - Delete a book (requires authentication)

## Usage

1. **Sign Up**: Create a new account to get started
2. **Sign In**: Log in with your credentials
3. **Dashboard**: View and manage your book collection
4. **Add Books**: Use the "Add New Book" button to add books
5. **Manage Books**: Edit or delete books as needed

## Features in Detail

### Book Management

- Add books with title, author, description, and optional cover image
- Edit existing book information
- Delete books from your collection
- View all books in a responsive grid layout

### User Experience

- Responsive design that works on all screen sizes
- Real-time feedback for all operations
- Clean and intuitive user interface
- Secure authentication with JWT tokens

### Security

- Protected API routes for authenticated users
- JWT token-based authentication
- User-specific book management (users can only modify their own books)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.
