# TechVault - Gaming E-Commerce Store

## 🎮 Overview
A modern, high-performance e-commerce website for gaming and computer hardware with a stunning dark theme design.

## ✨ Features

### Design & UI
- **Dark Gaming Theme**: Modern dark mode with vibrant purple and cyan accents
- **Responsive Design**: Fully responsive across all devices
- **Smooth Animations**: Glass morphism effects, hover animations, and transitions
- **Custom Color Scheme**: 
  - Primary: Vibrant Purple (#8B5CF6)
  - Secondary: Cyan Accent (#06B6D4)
  - Accent: Amber Highlights (#F59E0B)
  - Background: Dark Blue-Gray (#0F172A)

### Pages & Components

#### 1. Home Page
- Eye-catching hero section with animated gradient backgrounds
- Featured categories showcase
- Featured products carousel
- Stats section (500+ Products, 50K+ Customers, 4.9★ Rating)
- Features section (Fast Shipping, Secure Payment, 24/7 Support)

#### 2. Products Page
- Advanced filtering system:
  - Filter by category
  - Filter by price range
  - Sort by: Featured, Price (Low/High), Rating
- Product grid with hover effects
- Sale badges and stock indicators
- Quick add to cart functionality

#### 3. Categories Page
- Beautiful category cards with images
- Product count per category
- Smooth hover animations
- Direct navigation to filtered products

#### 4. Product Detail Page
- Multiple product images with image selector
- Detailed specifications
- Key features list
- Quantity selector
- Add to cart with quantity
- Breadcrumb navigation
- Stock status indicators

#### 5. Shopping Cart
- Slide-out cart sidebar
- Quantity adjustment
- Item removal
- Real-time total calculation
- Empty cart state

#### 6. Navigation
- Sticky navbar with glass effect
- Search functionality
- Cart counter with animation
- Mobile-responsive menu
- Quick access to auth pages

#### 7. Authentication
- Sign In page
- Sign Up page
- Modern form designs

## 🛍️ Product Categories

The store includes 10 comprehensive categories:
1. **Graphics Cards (GPU)** - High-performance gaming GPUs
2. **Processors (CPU)** - Intel & AMD processors
3. **Memory (RAM)** - DDR5 memory modules
4. **Motherboards** - Premium motherboards
5. **Storage** - SSDs and NVMe drives
6. **Cases** - PC cases with RGB
7. **Power Supplies (PSU)** - Reliable power units
8. **Cooling** - AIOs and air coolers
9. **Peripherals** - Gaming mice and keyboards
10. **Monitors** - High-refresh gaming displays

## 📦 Product Data

The store includes **28 realistic products** with:
- Detailed specifications
- Multiple images
- Real pricing (including sale prices)
- Stock levels
- User ratings and reviews
- Brand information
- Feature lists

## 🎨 Design Highlights

### Custom CSS Classes
- `.glass` - Glass morphism effect
- `.card` - Styled cards with hover effects
- `.btn-primary`, `.btn-secondary`, `.btn-outline` - Custom buttons
- `.text-gradient` - Gradient text effects
- `.badge` - Status badges
- `.shimmer` - Loading shimmer effect
- `.sale-pulse` - Pulsing sale badge

### Color System
- Complete palette with 50-900 shades
- Primary, Secondary, Accent, and Dark colors
- Custom shadows and glow effects
- Gradient backgrounds

### Animations
- Smooth transitions
- Hover scale effects
- Pulse animations
- Float animations
- Shimmer loading effects

## 🚀 Technologies Used

- **React 19** - Latest React version
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Vite** - Fast build tool

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server
The application runs on `http://localhost:5173` (or next available port)

## 📁 Project Structure

```
src/
├── Components/
│   ├── Navbar.tsx          # Navigation bar
│   ├── Cart.tsx            # Shopping cart
│   └── Sidebar.tsx         # Sidebar component
├── Pages/
│   ├── Home.tsx            # Home page
│   ├── Products.tsx        # Products listing
│   ├── Categories.tsx      # Categories overview
│   ├── Productinfo.tsx     # Product details
│   └── Auth/
│       ├── SignIn.tsx      # Sign in page
│       └── SignUp.tsx      # Sign up page
├── data/
│   └── products.json       # Product data
├── App.tsx                 # Main app component
├── index.css              # Global styles
└── main.tsx               # Entry point
```

## 🎯 Key Features Implementation

### Cart Management
- Add to cart with quantity
- Update item quantities
- Remove items
- Calculate totals
- Persist across navigation

### Product Filtering
- Category-based filtering
- Price range filtering
- Multi-criteria sorting
- Real-time updates

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interfaces
- Optimized images

## 🌟 Visual Enhancements

- Custom scrollbar styling
- Backdrop blur effects
- Gradient overlays
- Box shadows and glows
- Smooth page transitions
- Loading states

## 📱 Mobile Features

- Collapsible mobile menu
- Touch-optimized buttons
- Mobile-friendly forms
- Optimized images
- Fast load times

## 🎨 Color Scheme Details

```css
Primary Purple: #8B5CF6
Secondary Cyan: #06B6D4
Accent Amber: #F59E0B
Dark Background: #0F172A
Dark Surface: #1E293B
Dark Border: #334155
```

## 🔮 Future Enhancements

- User authentication integration
- Payment gateway
- Order management
- Product reviews system
- Wishlist functionality
- Search autocomplete
- Product comparison
- Live chat support

## 📄 License

This project is for demonstration purposes.

---

Built with ❤️ for gaming enthusiasts