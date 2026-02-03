<<<<<<< HEAD
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
=======
# Easy-Keep - Backend

This is the backend API for the Easy-Keep Inventory Management System, built with Node.js, Express.js, and MongoDB Atlas.

## Features

- **Authentication**: User registration, login, and JWT-based authentication
- **Inventory Management**: Complete CRUD operations for inventory items
- **Stock Tracking**: Real-time stock level monitoring and alerts
- **User Roles**: Admin and user role-based access control
- **Data Validation**: Comprehensive input validation and error handling
- **Security**: Password hashing, JWT tokens, and security headers

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - User logout

### Inventory Management
- `GET /api/inventory` - Get all inventory items (with pagination and filtering)
- `GET /api/inventory/:id` - Get single inventory item
- `POST /api/inventory` - Create new inventory item
- `PUT /api/inventory/:id` - Update inventory item
- `DELETE /api/inventory/:id` - Delete inventory item (admin only)
- `GET /api/inventory/alerts/low-stock` - Get low stock alerts
- `PATCH /api/inventory/:id/stock` - Update stock quantity

### Health Check
- `GET /api/health` - API health check

## Installation

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:
   ```bash
   npm install
   ```

## Environment Setup

1. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://admin:opLoCoLGJQj6Mydi@easy-keep.d2wfyyt.mongodb.net/easy-keep
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:3000
   ```

## Database Setup

1. The application uses MongoDB Atlas cloud database
2. The connection string is configured in the `.env` file
3. The application will automatically create the database `easy-keep` on first run

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Inventory Endpoints

#### Get All Inventory Items
```http
GET /api/inventory?page=1&limit=10&category=Electronics&search=laptop
Authorization: Bearer <token>
```

#### Create Inventory Item
```http
POST /api/inventory
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Laptop",
  "description": "High-performance laptop",
  "category": "Electronics",
  "sku": "LAP-001",
  "quantity": 50,
  "minStockLevel": 10,
  "price": 999.99,
  "supplier": {
    "name": "Tech Supplier",
    "email": "supplier@tech.com",
    "phone": "+1234567890"
  },
  "location": {
    "warehouse": "Main Warehouse",
    "aisle": "A1",
    "shelf": "S1"
  }
}
```

## Data Models

### User Model
```javascript
{
  username: String (required, unique, 3-30 chars),
  email: String (required, unique, valid email),
  password: String (required, min 6 chars, hashed),
  role: String (enum: ['admin', 'user'], default: 'user'),
  isActive: Boolean (default: true),
  timestamps: true
}
```

### Inventory Model
```javascript
{
  name: String (required, max 100 chars),
  description: String (max 500 chars),
  category: String (required, enum: predefined categories),
  sku: String (required, unique, uppercase alphanumeric),
  quantity: Number (required, min 0),
  minStockLevel: Number (required, min 0),
  price: Number (required, min 0),
  supplier: {
    name: String,
    email: String,
    phone: String
  },
  location: {
    warehouse: String,
    aisle: String,
    shelf: String
  },
  status: String (enum: ['active', 'inactive', 'discontinued'], default: 'active'),
  addedBy: ObjectId (ref: 'User', required),
  lastUpdatedBy: ObjectId (ref: 'User'),
  timestamps: true
}
```

## Security Features

- **Password Hashing**: Using bcryptjs for secure password storage
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Comprehensive validation using express-validator
- **Security Headers**: Helmet.js for security headers
- **CORS**: Configured Cross-Origin Resource Sharing
- **Error Handling**: Secure error handling without exposing sensitive information

## Error Handling

The API uses consistent error responses:
```javascript
{
  "status": "error",
  "message": "Error description",
  "errors": [] // Validation errors (if applicable)
}
```

## Testing

```bash
npm test
```

## Project Structure

```
backend/
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/         # Mongoose models
├── routes/         # API routes
├── utils/          # Utility functions
├── .env.example    # Environment variables template
├── .gitignore      # Git ignore file
├── package.json    # Dependencies and scripts
├── server.js       # Main server file
└── README.md       # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
>>>>>>> 50e6a3e (Backend commit)
