# CRUD User Management System

A full-stack CRUD (Create, Read, Update, Delete) application for user management built with React, TypeScript, and Node.js. This project features a modern React frontend with Tailwind CSS styling and a RESTful API backend with JSON file-based storage.

## 🚀 Features

### Frontend
- **Modern React Interface**: Built with React 19 and TypeScript
- **Responsive Design**: Styled with Tailwind CSS for mobile-first responsive design
- **Interactive UI**: SweetAlert2 modals for user interactions
- **Real-time Updates**: Instant UI updates after CRUD operations
- **Type Safety**: Full TypeScript support for better development experience

### Backend
- **RESTful API**: Complete REST API with Express.js
- **TypeScript**: Type-safe backend development
- **JSON Storage**: File-based JSON database for data persistence
- **CORS Support**: Cross-origin resource sharing enabled
- **Authentication**: User registration and login system

### Core Functionality
- ✅ Create new users with role assignment
- ✅ Read/List all users with pagination-ready structure
- ✅ Update user information (name, email, role)
- ✅ Delete users with confirmation dialogs
- ✅ Role-based user management (Admin, Editor, Viewer)
- ✅ Form validation and error handling

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with concurrent features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **SweetAlert2** - Beautiful alert modals
- **ESLint** - Code linting and formatting

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe backend development
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this project, make sure you have:
- Node.js (v16 or higher)
- npm or yarn package manager
- Git

## ⚡ Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd crud-ts-react
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### 4. Start the Backend Server
```bash
cd backend
npm run dev
```
The backend server will start on `http://localhost:3001`

### 5. Start the Frontend Development Server
```bash
# In a new terminal
npm run dev
```
The frontend will be available at `http://localhost:5173`

## 🔌 API Endpoints

The backend provides the following REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create a new user |
| PUT | `/api/users/:id` | Update user by ID |
| DELETE | `/api/users/:id` | Delete user by ID |
| POST | `/api/users/register` | Register a new user |
| POST | `/api/users/login` | User login |

### User Data Structure
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string; // Only for creation/login
  role: "admin" | "editor" | "viewer";
  createdAt: string;
  lastLogin: string;
}
```

### API Usage Examples

#### Create User
```bash
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "editor"
  }'
```

#### Update User
```bash
curl -X PUT http://localhost:3001/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "email": "johnsmith@example.com",
    "role": "admin"
  }'
```

#### Delete User
```bash
curl -X DELETE http://localhost:3001/api/users/1
```

## 🎨 User Interface

The application features a clean, modern interface with:

- **User Table**: Displays all users with their information
- **Action Buttons**: Update and Delete buttons for each user
- **Modal Forms**: SweetAlert2-powered forms for user operations
- **Responsive Design**: Works on desktop and mobile devices
- **Loading States**: Proper loading indicators
- **Error Handling**: User-friendly error messages

## 🔐 Authentication

The application includes a basic authentication system:

- **Registration**: Create new user accounts
- **Login**: Authenticate existing users
- **Session Management**: Track last login times

## 🏗️ Project Structure

```
crud-ts-react/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── hooks/             # Custom React hooks
│   └── ...
├── backend/               # Backend source code
│   ├── src/
│   │   ├── controller/    # Request handlers
│   │   ├── routes/        # API routes
│   │   └── utils/         # Utility functions
│   └── ...
├── db/                    # JSON database files
└── public/               # Static assets
```

## 🚦 Development Scripts

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend Scripts
- `npm run dev` - Start development server with auto-reload
- `npm run build` - Compile TypeScript
- `npm run start` - Start production server

## 🔧 Configuration

### Frontend Configuration
- **Vite Config**: `vite.config.ts`
- **TypeScript**: `tsconfig.json`
- **Tailwind**: `tailwind.config.js`

### Backend Configuration
- **TypeScript**: `tsconfig.json`
- **Package Scripts**: `package.json`

## 📝 Notes

- The application uses a JSON file (`db/db.json`) for data storage
- All user operations are validated both on frontend and backend
- The application supports three user roles: admin, editor, and viewer
- CORS is enabled for cross-origin requests
- The frontend is served on port 5173, backend on port 3001

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
