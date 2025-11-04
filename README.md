# SunTech E-Commerce Platform

A modern, full-featured e-commerce web application built with React, TypeScript, and Tailwind CSS. This platform specializes in computer hardware and tech products, offering a seamless shopping experience with user authentication, product management, and order tracking.

![SunTech Logo](https://img.shields.io/badge/SunTech-E--Commerce-purple?style=for-the-badge)

## 📋 Table of Contents

- [Description](#-description)
- [Technologies Used](#-technologies-used)
- [Features](#-features)
- [Installation Instructions](#-installation-instructions)
- [Project Structure](#-project-structure)
- [Usage](#-usage)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)

## 🎯 Description

SunTech is a comprehensive e-commerce platform designed for purchasing computer hardware and technology products. The application provides a modern, responsive interface with advanced filtering, user authentication, shopping cart management, and order tracking capabilities. All data is persisted using localStorage for a seamless user experience.

## 🛠️ Technologies Used

### Frontend Framework
- **React 19.1.1** - Modern UI library for building user interfaces
- **TypeScript 5.9.3** - Type-safe JavaScript for better development experience
- **Vite 7.1.7** - Next-generation frontend build tool

### Routing & State Management
- **React Router DOM 7.9.5** - Client-side routing for single-page application
- **React Hooks** - Built-in state management with useState, useEffect, useMemo

### Styling
- **Tailwind CSS 4.1.16** - Utility-first CSS framework
- **PostCSS 8.5.6** - CSS transformations
- **Autoprefixer 10.4.21** - Automatic vendor prefixing

### Development Tools
- **ESLint 9.36.0** - Code linting and quality
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite Plugin React** - Hot module replacement and fast refresh

<!-- ### Additional Libraries -->
<!-- - **Axios 1.13.1** - HTTP client for API requests -->
<!-- - **React Hook Form 7.65.0** - Form validation and management -->

## ✨ Features

### 1. User Authentication System
- **Sign Up**: Create new account with name, email, address, and password
- **Sign In**: Secure login with email and password validation
- **Profile Management**: Edit personal information and update password
- **Session Persistence**: User sessions maintained across page refreshes using localStorage

### 2. Product Catalog
- **Product Listing**: Browse through 20+ tech products across 10 categories
- **Advanced Filtering**:
  - Filter by category (GPUs, CPUs, RAM, Motherboards, etc.)
  - Price range filters (preset ranges + custom min/max)
  - Minimum rating filter
- **Sorting Options**:
  - Featured products
  - Newest arrivals
  - Price: Low to High
  - Price: High to Low
  - Top Rated
- **Product Details**: Comprehensive product pages with specifications, features, and multiple images
- **Star Ratings**: Visual star ratings with quarter-star precision (2.0 - 4.0 scale)

### 3. Shopping Cart
- **Add to Cart**: Add products from product list or detail pages
- **Quantity Management**: Adjust quantities directly in cart
- **Price Calculation**: Real-time subtotal, delivery fee ($10), and total calculation
- **Cart Persistence**: Cart items saved in localStorage
- **Remove Items**: Delete unwanted products from cart

### 4. Favorites System
- **Add/Remove Favorites**: Heart icon on product cards to save favorites
- **Favorites Page**: View all favorite products in profile
- **User-Specific**: Each user has their own favorite list

### 5. Order Management
- **Checkout Process**: One-click checkout with confirmation popup
- **Order History**: Complete history of all past orders
- **Order Details**: View items, quantities, prices, and order date
- **Delivery Tracking**: Fixed $10 delivery fee included in orders

### 6. User Profile
- **Three-Tab Interface**:
  - **Personal Info**: View and edit name, email, and address
  - **Order History**: Track all past purchases with full details
  - **Favorites**: Manage saved products
- **Profile Updates**: Real-time profile information updates
- **Password Change**: Secure password update functionality

### 7. Search & Navigation
- **Search Bar**: Search products by name (desktop and mobile)
- **Category Navigation**: Quick access to product categories
- **Breadcrumb Navigation**: Easy navigation trail on product pages
- **Responsive Menu**: Mobile-optimized navigation menu

### 8. UI/UX Features
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile
- **Dark Theme**: Modern dark mode interface
- **Loading States**: Visual feedback for user actions
- **Error Handling**: User-friendly error messages
- **Smooth Animations**: Transitions and hover effects
- **Scroll to Top**: Automatic scroll to top on page navigation

### 9. Product Features
- **Multiple Images**: Minimum 3 images per product with gallery view
- **Sale Badges**: Visual indicators for products on sale
- **Stock Indicators**: Low stock warnings
- **Similar Products**: Recommendations based on category
- **Product Specifications**: Detailed technical specs for each product
<!-- - **Feature Lists**: Highlighted key features -->

## 📦 Installation Instructions

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager
- Git

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd Application-de-Commerce-lectronique-main
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Step 4: Build for Production
```bash
npm run build
```

### Step 5: Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
Application-de-Commerce-lectronique-main/
├── public/                      # Static assets
├── src/
│   ├── Components/             # Reusable components
│   │   ├── Cart.tsx           # Shopping cart sidebar
│   │   ├── Navbar.tsx         # Navigation bar with user menu
│   │   ├── ScrollToTop.tsx    # Auto-scroll component
│   │   ├── SearchBar.tsx      # Product search
│   │   └── Sidebar.tsx        # Filter sidebar
│   │
│   ├── Pages/                  # Page components
│   │   ├── Auth/
│   │   │   ├── SignIn.tsx     # Login page
│   │   │   └── SignUp.tsx     # Registration page
│   │   ├── Categories.tsx     # Category overview
│   │   ├── Home.tsx           # Landing page
│   │   ├── Productinfo.tsx    # Product detail page
│   │   ├── Products.tsx       # Product listing page
│   │   └── Profile.tsx        # User profile with tabs
│   │
│   ├── data/
│   │   └── products.json      # Product catalog data
│   │
│   ├── api/
│   │   └── productService.ts  # API service layer
│   │
│   ├── App.tsx                 # Main application component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles
│
├── eslint.config.js            # ESLint configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
├── package.json                # Dependencies and scripts
└── README.md                   # Project documentation
```

## 🚀 Usage

### For Users

1. **Browse Products**
   - Visit the home page to see featured products
   - Navigate to "Products" to browse the full catalog
   - Use filters to narrow down your search

2. **Create Account**
   - Click "Sign In" in the navbar
   - Click "Sign Up" to create a new account
   - Fill in your details and submit

3. **Shop**
   - Add products to cart using "Add to Cart" button
   - View cart by clicking the cart icon
   - Adjust quantities or remove items
   - Click "Proceed to Checkout" to complete purchase

4. **Manage Profile**
   - Click your name in the navbar
   - Select "My Profile"
   - View/edit personal info, order history, and favorites

### For Developers

#### Adding New Products
Edit `src/data/products.json`:
```json
{
  "id": "product-id",
  "name": "Product Name",
  "category": "category-id",
  "brand": "Brand Name",
  "price": 99.99,
  "originalPrice": 129.99,
  "rating": 3.8,
  "reviews": 150,
  "stock": 25,
  "image": "image-url",
  "images": ["url1", "url2", "url3"],
  "description": "Product description",
  "specs": {},
  "features": [],
  "createdAt": "2025-01-01"
}
```

#### Customizing Styles
Modify `tailwind.config.js` for theme customization or edit `src/index.css` for global styles.

#### Adding New Routes
Add routes in `src/App.tsx`:
```tsx
<Route path="/new-page" element={<NewPage />} />
```

## 📸 Screenshots

### Home Page
The landing page showcases featured products, categories, and promotional banners with a modern dark theme.
<p align="center">
  <img src="src\screenshots\homepage.png" alt="App Preview" width="400"/>
</p>


### Product Listing
Advanced filtering options with category selection, price ranges, and sorting capabilities.
<p align="center">
  <img src="src\screenshots\productlisting.png" alt="App Preview" width="400"/>
</p>

### Product Details
Comprehensive product information with image gallery, specifications, features, and similar product recommendations.
<p align="center">
  <img src="src\screenshots\productdetail.png" alt="App Preview" width="400"/>
</p>

### Shopping Cart
Slide-out cart panel showing items, quantities, subtotal, delivery fee, and total price.
<p align="center">
  <img src="src\screenshots\shoppingcart.png" alt="App Preview" width="400"/>
</p>

### User Profile
Tabbed interface for managing personal information, viewing order history, and accessing favorite products.
<p align="center">
  <img src="src\screenshots\useerprofile.png" alt="App Preview" width="400"/>
</p>

### Order History
Detailed view of past purchases with product information, quantities, prices, and order dates.
<p align="center">
  <img src="src\screenshots\orderhistory.png" alt="App Preview" width="400"/>
</p>

### Checkout Success
Confirmation popup after successful order placement.
<p align="center">
  <img src="src\screenshots\checkoutsuccess.png" alt="App Preview" width="400"/>
</p>

### Responsive Design
Fully optimized mobile interface with hamburger menu and touch-friendly controls.
<p align="center">
  <img src="src\screenshots\responsivedesign.png" alt="App Preview" width="400"/>
</p>

## 🔐 Data Storage

The application uses localStorage for data persistence:

- **users**: User account information (email, password, name, address)
- **currentUser**: Active user session
- **cart**: Shopping cart items
- **orders**: Order history for all users
- **favorites**: User-specific favorite products

## 🎨 Color Scheme

- **Primary**: Purple (#a855f7 to #8b5cf6)
- **Secondary**: Cyan (#06b6d4)
- **Background**: Dark gray (#0f172a)
- **Cards**: Slate (#1e293b)
- **Text**: White and gray shades
- **Accent**: Red for favorites, Green for success

## 🌟 Key Highlights

- ✅ Fully functional e-commerce platform
- ✅ 100% TypeScript for type safety
- ✅ Responsive design for all devices
- ✅ localStorage-based persistence (no backend required)
- ✅ Modern UI with Tailwind CSS
- ✅ User authentication and authorization
- ✅ Complete shopping cart functionality
- ✅ Order tracking and history
- ✅ Favorites system
- ✅ Advanced product filtering and sorting
- ✅ Profile management
- ✅ Clean and maintainable code structure

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is created for educational purposes.

## 🌐 Live Demo

🚀 **Explore the deployed app here:**  
👉 [https://suntechnology.netlify.app/](https://suntechnology.netlify.app/)

## 👤 Author

**Rahma Othmani**

---

**Note**: This is a demo application using localStorage for data persistence. For production use, integrate with a backend API and proper database.