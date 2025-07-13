# 📚 Amazon Clone - Technical Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Component Documentation](#component-documentation)
4. [API Reference](#api-reference)
5. [State Management](#state-management)
6. [Styling Guidelines](#styling-guidelines)
7. [Firebase Integration](#firebase-integration)
8. [Stripe Integration](#stripe-integration)
9. [Security Implementation](#security-implementation)
10. [Performance Optimization](#performance-optimization)
11. [Testing Strategy](#testing-strategy)
12. [Deployment Guide](#deployment-guide)

## Project Overview

### Purpose

This Amazon Clone is a full-stack e-commerce application built to demonstrate modern web development practices, including React development, TypeScript implementation, Firebase integration, and payment processing with Stripe.

### Key Features

- User authentication and authorization
- Product catalog with search and filtering
- Shopping cart functionality
- Secure payment processing
- Order management
- Responsive design
- Error handling and loading states

### Technology Stack

- **Frontend**: React 19.1.0, TypeScript, Vite
- **Backend**: Firebase Functions, Express.js
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Payments**: Stripe
- **Styling**: CSS3 with custom properties
- **Icons**: Material-UI Icons

## Architecture

### Frontend Architecture

```
src/
├── components/          # Reusable UI components
├── context/            # Global state management
├── constants/          # Application constants
├── utils/             # Utility functions
├── services/          # API service layer
├── images/            # Static assets
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

### Backend Architecture

```
functions/
├── src/
│   └── index.ts       # Express.js API endpoints
├── package.json       # Backend dependencies
└── tsconfig.json      # TypeScript configuration
```

### Data Flow

1. **User Interaction** → Component
2. **Component** → Context/State Management
3. **State Change** → Re-render Components
4. **API Calls** → Firebase Functions
5. **Database Operations** → Firestore
6. **Response** → Update State → UI Update

## Component Documentation

### Core Components

#### App.tsx

**Purpose**: Main application component with routing and global providers

**Key Features**:

- Route configuration
- Authentication state management
- Stripe provider setup
- Error boundary wrapping

```typescript
interface AppProps {
  // No props - root component
}
```

#### Header.tsx

**Purpose**: Navigation header with search, user info, and cart

**Features**:

- Search functionality
- User authentication display
- Shopping cart icon with count
- Responsive navigation

```typescript
interface HeaderProps {
  // No props - uses global state
}
```

#### Home.tsx

**Purpose**: Homepage with hero section and product grid

**Features**:

- Hero banner
- Featured products
- Category sections
- Product loading states

```typescript
interface HomeProps {
  // No props - fetches data internally
}
```

#### Product.tsx

**Purpose**: Individual product card component

**Features**:

- Product image and details
- Star rating display
- Add to cart functionality
- Responsive design

```typescript
interface ProductProps {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
}
```

#### Checkout.tsx

**Purpose**: Shopping cart page with item management

**Features**:

- Cart item list
- Quantity updates
- Remove items
- Subtotal calculation

```typescript
interface CheckoutProps {
  // No props - uses global cart state
}
```

#### Payment.tsx

**Purpose**: Payment processing with Stripe integration

**Features**:

- Payment form
- Card input validation
- Order processing
- Success/error handling

```typescript
interface PaymentProps {
  // No props - uses global state and Stripe context
}
```

#### Orders.tsx

**Purpose**: User order history display

**Features**:

- Order list
- Order details
- Date formatting
- Order status

```typescript
interface OrdersProps {
  // No props - uses authentication state
}
```

### Utility Components

#### Loading.tsx

**Purpose**: Reusable loading indicator

```typescript
interface LoadingProps {
  size?: "small" | "medium" | "large";
  text?: string;
}
```

#### ErrorBoundary.tsx

**Purpose**: Error handling wrapper component

```typescript
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorInfo>;
}
```

#### Footer.tsx

**Purpose**: Site footer with links and information

```typescript
interface FooterProps {
  // No props - static content
}
```

#### SearchResults.tsx

**Purpose**: Search results page with filtering and sorting

```typescript
interface SearchResultsProps {
  // No props - uses URL params and global state
}
```

## API Reference

### Base URL

- **Development**: `http://localhost:5002/clone-6e65f/us-central1/api`
- **Production**: `https://us-central1-clone-6e65f.cloudfunctions.net/api`

### Endpoints

#### POST /payments/create

Creates a payment intent for Stripe processing.

**Request Body**:

```json
{
  "total": number,        // Amount in cents
  "currency": string      // Currency code (e.g., "usd")
}
```

**Response**:

```json
{
  "clientSecret": string  // Stripe client secret for payment
}
```

**Error Responses**:

- `400`: Bad Request - Invalid parameters
- `500`: Internal Server Error

### External APIs

#### Fake Store API

Used for product data during development.

**Base URL**: `https://fakestoreapi.com`

**Endpoints**:

- `GET /products` - Fetch all products
- `GET /products/{id}` - Fetch single product
- `GET /products/categories` - Fetch categories

## State Management

### Global State Structure

```typescript
interface AppState {
  basket: Product[];
  user: User | null;
  searchQuery: string;
  searchResults: Product[];
  loading: boolean;
  error: string | null;
}
```

### Actions

```typescript
type ActionType =
  | "ADD_TO_BASKET"
  | "REMOVE_FROM_BASKET"
  | "EMPTY_BASKET"
  | "SET_USER"
  | "SET_SEARCH_QUERY"
  | "SET_SEARCH_RESULTS"
  | "SET_LOADING"
  | "SET_ERROR";
```

### Context Providers

#### AuthContext

Manages user authentication state and Firebase Auth integration.

#### StateContext

Manages global application state including cart, search, and UI states.

## Styling Guidelines

### CSS Architecture

- **Component-scoped styles**: Each component has its own CSS file
- **Global styles**: App.css and index.css for global styles
- **CSS Custom Properties**: For consistent theming
- **Responsive Design**: Mobile-first approach

### Color Palette

```css
:root {
  --amazon-orange: #ff9900;
  --amazon-dark: #131921;
  --amazon-light-blue: #007185;
  --amazon-gray: #565959;
  --amazon-light-gray: #f3f3f3;
  --amazon-red: #b12704;
}
```

### Typography Scale

```css
:root {
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
}
```

### Responsive Breakpoints

```css
/* Mobile First */
@media (min-width: 480px) {
  /* Small devices */
}
@media (min-width: 768px) {
  /* Tablets */
}
@media (min-width: 1024px) {
  /* Desktops */
}
@media (min-width: 1200px) {
  /* Large screens */
}
```

## Firebase Integration

### Configuration

```typescript
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};
```

### Authentication

- **Sign In**: Email/password authentication
- **Sign Up**: User registration
- **Sign Out**: Session termination
- **Auth State Persistence**: Automatic login state management

### Firestore Collections

#### Users Collection

```typescript
interface UserDocument {
  uid: string;
  email: string;
  displayName?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

#### Orders Collection

```typescript
interface OrderDocument {
  id: string;
  userId: string;
  basket: Product[];
  amount: number;
  created: Timestamp;
  status: "pending" | "completed" | "cancelled";
  paymentIntentId: string;
}
```

### Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Orders are user-specific
    match /orders/{orderId} {
      allow read, write: if request.auth != null &&
        request.auth.uid == resource.data.userId;
    }
  }
}
```

## Stripe Integration

### Setup

```typescript
const stripePromise = loadStripe(process.env.VITE_STRIPE_PUBLISHABLE_KEY!);
```

### Payment Flow

1. **Create Payment Intent** → Backend API call
2. **Confirm Payment** → Stripe Elements
3. **Handle Result** → Success/Error handling
4. **Save Order** → Firestore database

### Error Handling

```typescript
interface StripeError {
  type: string;
  code: string;
  message: string;
  param?: string;
}
```

## Security Implementation

### Authentication Security

- **Firebase Auth**: Industry-standard authentication
- **Token Validation**: Automatic token refresh
- **Route Protection**: Private route components

### Payment Security

- **PCI Compliance**: Stripe handles sensitive data
- **Token-based**: No card data stored locally
- **HTTPS Only**: Secure data transmission

### Data Security

- **Firestore Rules**: User-based access control
- **Input Validation**: Client and server-side validation
- **Sanitization**: XSS prevention

## Performance Optimization

### Frontend Optimization

- **Code Splitting**: Dynamic imports for routes
- **Lazy Loading**: Component-based loading
- **Image Optimization**: Proper sizing and formats
- **Bundle Analysis**: Webpack bundle analyzer

### Backend Optimization

- **Function Optimization**: Efficient Cloud Functions
- **Database Indexing**: Firestore query optimization
- **Caching**: Response caching strategies

### Loading Strategies

- **Skeleton Loading**: Improved perceived performance
- **Progressive Loading**: Incremental content loading
- **Error Recovery**: Graceful error handling

## Testing Strategy

### Unit Testing

```typescript
// Component testing
describe("Product Component", () => {
  it("should render product information", () => {
    // Test implementation
  });
});
```

### Integration Testing

```typescript
// API testing
describe("Payment API", () => {
  it("should create payment intent", async () => {
    // Test implementation
  });
});
```

### E2E Testing

```typescript
// User flow testing
describe("Purchase Flow", () => {
  it("should complete purchase successfully", () => {
    // Test implementation
  });
});
```

### Testing Tools

- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **Cypress**: E2E testing
- **Firebase Emulator**: Local testing environment

## Deployment Guide

### Prerequisites

- Firebase project setup
- Stripe account configuration
- Domain configuration (production)

### Frontend Deployment

```bash
# Build the application
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

### Backend Deployment

```bash
# Deploy Cloud Functions
firebase deploy --only functions
```

### Environment Configuration

```bash
# Set environment variables
firebase functions:config:set stripe.secret_key="sk_..."
firebase functions:config:set app.env="production"
```

### CI/CD Pipeline

```yaml
# GitHub Actions example
name: Deploy to Firebase
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
```

### Monitoring and Analytics

- **Firebase Analytics**: User behavior tracking
- **Performance Monitoring**: App performance metrics
- **Error Reporting**: Crash and error tracking
- **Custom Metrics**: Business-specific tracking

## Troubleshooting

### Common Issues

#### Build Errors

- **TypeScript Errors**: Check type definitions
- **Import Errors**: Verify file paths
- **Dependency Conflicts**: Update package.json

#### Runtime Errors

- **Firebase Errors**: Check configuration
- **Stripe Errors**: Verify API keys
- **CORS Issues**: Update Firebase Functions

#### Performance Issues

- **Slow Loading**: Optimize images and code
- **Memory Leaks**: Check useEffect cleanup
- **Bundle Size**: Analyze and optimize imports

### Debugging Tools

- **React DevTools**: Component inspection
- **Firebase Console**: Backend monitoring
- **Stripe Dashboard**: Payment tracking
- **Network Tab**: API call analysis

---

**Last Updated**: July 14, 2025  
**Version**: 1.0.0  
**Maintainer**: XSaadiX
