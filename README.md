# 🛒 Amazon Clone - Full Stack E-Commerce Application

![Amazon Clone](https://img.shields.io/badge/Amazon-Clone-orange?style=for-the-badge&logo=amazon)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-11.8.1-yellow?style=for-the-badge&logo=firebase)
![Stripe](https://img.shields.io/badge/Stripe-Payments-purple?style=for-the-badge&logo=stripe)

A full-stack, production-ready Amazon clone built with modern web technologies. This project demonstrates advanced React development, Firebase integration, payment processing, and professional-grade code architecture.

## 🌟 Live Demo

- **Frontend**: `http://localhost:5177`
- **Backend API**: `http://localhost:5002`

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🏪 Core E-Commerce Features

- **Product Catalog**: Browse products with detailed information
- **Shopping Cart**: Add/remove items with real-time updates
- **User Authentication**: Firebase Auth integration
- **Payment Processing**: Stripe integration for secure payments
- **Order Management**: View order history and details
- **Search & Filter**: Advanced product search with category filters

### 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with breakpoints
- **Amazon-Themed UI**: Authentic Amazon look and feel
- **Loading States**: Professional loading indicators
- **Error Boundaries**: Graceful error handling
- **Hover Effects**: Smooth animations and transitions
- **Professional Footer**: Complete footer with all sections

### 🔧 Technical Features

- **TypeScript**: Full type safety throughout the application
- **State Management**: React Context API with reducers
- **Code Organization**: Modular architecture with constants and utilities
- **Error Handling**: Production-grade error boundaries
- **Performance Optimization**: Lazy loading and efficient rendering
- **SEO Ready**: Proper meta tags and structure

## 🛠 Tech Stack

### Frontend

- **React 19.1.0**: Latest React with modern hooks
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and development server
- **React Router DOM**: Client-side routing
- **Material-UI**: Icons and components
- **CSS3**: Custom styling with modern features

### Backend

- **Firebase Functions**: Serverless backend
- **Express.js**: Node.js web framework
- **TypeScript**: Type-safe backend development
- **Stripe**: Payment processing
- **Firebase Firestore**: NoSQL database
- **Firebase Auth**: Authentication service

### Development Tools

- **ESLint**: Code linting
- **Firebase CLI**: Development and deployment
- **VS Code**: Recommended IDE

## 📁 Project Structure

```
amazon-clone/
├── 📁 src/
│   ├── 📁 components/          # React components
│   │   ├── Header.tsx         # Navigation header
│   │   ├── Home.tsx           # Homepage component
│   │   ├── Product.tsx        # Product card component
│   │   ├── Checkout.tsx       # Shopping cart page
│   │   ├── Payment.tsx        # Payment processing
│   │   ├── Orders.tsx         # Order history
│   │   ├── SearchResults.tsx  # Search results page
│   │   ├── Footer.tsx         # Site footer
│   │   ├── ErrorBoundary.tsx  # Error handling
│   │   ├── Loading.tsx        # Loading components
│   │   └── Login.tsx          # Authentication
│   ├── 📁 context/            # State management
│   │   ├── GlobalState.tsx    # Global state provider
│   │   └── AppReducer.tsx     # State reducer
│   ├── 📁 constants/          # App constants
│   │   └── index.ts           # Centralized constants
│   ├── 📁 utils/              # Utility functions
│   │   └── index.ts           # Helper functions
│   ├── 📁 services/           # API services
│   │   └── api.ts             # API configurations
│   ├── 📁 images/             # Static assets
│   ├── firebase.ts            # Firebase configuration
│   ├── App.tsx                # Main application
│   └── main.tsx               # Application entry point
├── 📁 functions/              # Firebase Functions
│   ├── 📁 src/
│   │   └── index.ts           # Backend API
│   └── package.json           # Backend dependencies
├── 📁 public/                 # Public assets
├── firebase.json              # Firebase configuration
├── package.json               # Frontend dependencies
└── README.md                  # Project documentation
```

## 🚀 Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Firebase CLI** (`npm install -g firebase-tools`)
- **Git**

### Step 1: Clone the Repository

```bash
git clone https://github.com/XSaadiX/amazon-clone.git
cd amazon-clone
```

### Step 2: Install Frontend Dependencies

```bash
npm install
```

### Step 3: Install Backend Dependencies

```bash
cd functions
npm install
cd ..
```

### Step 4: Firebase Setup

```bash
# Login to Firebase
firebase login

# Initialize Firebase (if not already done)
firebase init
```

## ⚙️ Configuration

### 1. Firebase Configuration

Create `src/firebase.ts` with your Firebase config:

```typescript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

### 2. Stripe Configuration

In `functions/src/index.ts`, add your Stripe secret key:

```typescript
const stripe = require("stripe")("your-stripe-secret-key");
```

### 3. Environment Variables

Create `.env.local` in the root directory:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```

## 🎮 Usage

### Development Mode

1. **Start the Frontend**:

```bash
npm run dev
```

2. **Start the Backend** (in a new terminal):

```bash
cd functions
npm run serve
```

3. **Access the Application**:
   - Frontend: `http://localhost:5177`
   - Backend: `http://localhost:5002`

### Building for Production

```bash
# Build frontend
npm run build

# Build backend
cd functions
npm run build
```

## 📚 API Documentation

### Base URL

- **Development**: `http://localhost:5002/your-project-id/us-central1/api`
- **Production**: `https://us-central1-your-project-id.cloudfunctions.net/api`

### Endpoints

#### Payment Processing

```http
POST /payments/create
Content-Type: application/json

{
  "total": 2999,
  "currency": "usd"
}
```

**Response:**

```json
{
  "clientSecret": "pi_xxxxx_secret_xxxxx"
}
```

### Firebase Collections

#### Users Collection

```typescript
interface User {
  uid: string;
  email: string;
  displayName?: string;
  createdAt: Timestamp;
}
```

#### Orders Collection

```typescript
interface Order {
  id: string;
  userId: string;
  basket: Product[];
  amount: number;
  created: Timestamp;
}
```

## 🚀 Deployment

### Frontend Deployment (Firebase Hosting)

1. **Build the project**:

```bash
npm run build
```

2. **Deploy to Firebase**:

```bash
firebase deploy --only hosting
```

### Backend Deployment (Firebase Functions)

1. **Deploy functions**:

```bash
firebase deploy --only functions
```

### Complete Deployment

```bash
firebase deploy
```

## 🔧 Key Components

### 🏠 Home Component

- Hero section with featured products
- Product grid with categories
- Responsive design

### 🛒 Product Component

- Product cards with images and details
- Star ratings
- Add to cart functionality
- Hover animations

### 🛍️ Checkout Component

- Shopping cart management
- Quantity updates
- Subtotal calculations
- Proceed to payment

### 💳 Payment Component

- Stripe integration
- Secure payment processing
- Order confirmation
- Receipt generation

### 📱 Responsive Design

- Mobile-first approach
- Breakpoints: 480px, 768px, 1024px
- Flexible grid layouts
- Touch-friendly interfaces

## 🎨 Styling Guide

### Color Palette

- **Primary Orange**: `#ff9900`
- **Dark Navy**: `#131921`
- **Light Blue**: `#007185`
- **Text Gray**: `#565959`
- **Background**: `#f3f3f3`

### Typography

- **Primary Font**: Arial, sans-serif
- **Headings**: 14px - 24px
- **Body Text**: 12px - 16px
- **Line Height**: 1.3 - 1.5

## 🧪 Testing

### Running Tests

```bash
npm test
```

### Testing Checklist

- [ ] User authentication flow
- [ ] Product search and filtering
- [ ] Shopping cart operations
- [ ] Payment processing
- [ ] Order history
- [ ] Responsive design
- [ ] Error handling

## 🔒 Security Features

- **Firebase Auth**: Secure user authentication
- **Stripe**: PCI-compliant payment processing
- **Input Validation**: Client and server-side validation
- **Error Boundaries**: Graceful error handling
- **CORS Configuration**: Proper cross-origin setup

## 📈 Performance Optimization

- **Code Splitting**: Lazy loading of components
- **Image Optimization**: Proper image formats and sizes
- **Bundle Analysis**: Optimized build output
- **Caching**: Efficient caching strategies
- **Loading States**: Improved user experience

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Maintain consistent code formatting
- Write descriptive commit messages
- Update documentation for new features
- Test changes thoroughly

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/XSaadiX/amazon-clone/issues) page
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Amazon** for design inspiration
- **Firebase** for backend services
- **Stripe** for payment processing
- **React** community for excellent documentation
- **Material-UI** for icons and components

## 📊 Project Stats

- **Lines of Code**: ~3,000+
- **Components**: 15+
- **TypeScript Coverage**: 100%
- **Responsive Breakpoints**: 3
- **API Endpoints**: 1 (extensible)

---

**Built with ❤️ by [XSaadiX](https://github.com/XSaadiX)**

_This project demonstrates modern web development practices and is perfect for learning full-stack development with React, TypeScript, and Firebase._
