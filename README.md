# ALEEM MART - Premium Multi-Vendor Ecommerce Marketplace

A modern, scalable, Amazon-level multi-vendor marketplace built with Next.js, Express.js, TypeScript, MongoDB, and Tailwind CSS.

## 🏗️ Architecture

```
aleem-mart/
├── backend/                    # Express.js API Server
│   ├── src/
│   │   ├── config/            # Database, Cloudinary, Stripe config
│   │   ├── controllers/       # Route handlers (auth, products, orders, etc.)
│   │   ├── middleware/        # Auth, validation, error handling
│   │   ├── models/            # Mongoose schemas (User, Product, Order, etc.)
│   │   ├── routes/            # API route definitions
│   │   ├── socket/            # Socket.io real-time handlers
│   │   ├── utils/             # JWT, email, helpers
│   │   ├── app.ts            # Express app setup
│   │   └── server.ts         # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/                   # Next.js Frontend
│   ├── src/
│   │   ├── app/              # Next.js App Router pages
│   │   │   ├── (buyer)/      # Buyer pages (home, shop, cart, etc.)
│   │   │   ├── seller/       # Seller dashboard
│   │   │   ├── admin/        # Admin panel
│   │   │   ├── login/        # Auth pages
│   │   │   └── register/
│   │   ├── components/       # React components
│   │   │   ├── ui/           # Base UI (Button, Input, Badge, etc.)
│   │   │   ├── layout/       # Header, Footer, Sidebar
│   │   │   ├── home/         # Homepage sections
│   │   │   └── shared/       # ProductCard, OrderCard, etc.
│   │   ├── lib/              # API client, utilities
│   │   ├── store/            # Zustand state management
│   │   └── types/            # TypeScript interfaces
│   ├── package.json
│   └── tailwind.config.ts
├── docker-compose.yml
└── package.json               # Monorepo root
```

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS, ShadCN UI |
| Backend | Node.js, Express.js, TypeScript |
| Database | MongoDB with Mongoose ODM |
| Auth | JWT (access + refresh tokens), bcrypt |
| State | Zustand |
| Real-time | Socket.io |
| Payments | Stripe, COD, JazzCash, Easypaisa |
| Storage | Cloudinary |
| Validation | Zod |
| Animation | Framer Motion |

## 🎯 Features

### Buyer Portal
- Product browsing with search, filters, and sorting
- Product detail pages with image galleries, specs, reviews
- Shopping cart with quantity management
- Multi-step checkout (address → payment → review)
- Order tracking and history
- Wishlist management
- Real-time notifications and messaging

### Seller Portal
- Seller onboarding and store setup
- Product management (CRUD, variants, images, inventory)
- Order management and fulfillment
- Discount and coupon creation
- Analytics dashboard with revenue tracking
- Review management and replies
- Store customization (logo, banner, policies)

### Admin Portal
- Platform-wide dashboard with KPIs
- User and seller management (approve/reject/suspend)
- Product and category management
- Order monitoring and dispute resolution
- Banner/CMS management for homepage
- Commission management
- Coupon and promotion control
- System settings

## 📊 Database Models

| Model | Description |
|-------|-------------|
| User | Buyers, sellers, admins with role-based access |
| Store | Seller store profiles with status management |
| Product | Full product catalog with variants, SEO, specs |
| Category | Hierarchical categories with nesting |
| Cart | User shopping carts |
| Order | Complete order lifecycle management |
| Review | Product reviews with seller replies |
| Wishlist | User product wishlists |
| Coupon | Platform and seller coupons |
| Discount | Flash sales, bulk discounts, offers |
| Notification | In-app notification system |
| Message/Conversation | Real-time buyer-seller messaging |
| Banner | CMS-managed homepage banners |

## 🔌 API Endpoints

| Base Route | Description |
|-----------|-------------|
| `/api/auth` | Register, login, logout, password reset, email verify |
| `/api/users` | Profile management, addresses |
| `/api/products` | CRUD, search, featured, best sellers |
| `/api/categories` | Category tree, CRUD |
| `/api/cart` | Cart management |
| `/api/orders` | Order creation, tracking, seller fulfillment |
| `/api/reviews` | Create, list, seller replies |
| `/api/wishlist` | Add/remove wishlist items |
| `/api/coupons` | Coupon CRUD, validation |
| `/api/discounts` | Discount management |
| `/api/seller` | Seller profile, analytics |
| `/api/admin` | Users, sellers, dashboard, settings |
| `/api/search` | Full-text search with suggestions |
| `/api/banners` | CMS banner management |
| `/api/messages` | Real-time messaging |
| `/api/notifications` | Notification management |
| `/api/payments` | Payment intent, webhooks |
| `/api/upload` | Image/video upload |

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Cloudinary account
- Stripe account (for payments)

### Installation

```bash
# Clone and install
cd "Aleem Mart"
npm install

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### Environment Setup

```bash
# Backend: copy and fill .env
cp backend/.env.example backend/.env

# Frontend: copy and fill .env
cp frontend/.env.example frontend/.env.local
```

### Run Development Servers

```bash
# Run both frontend and backend
npm run dev

# Or run separately
npm run dev:backend    # http://localhost:5000
npm run dev:frontend   # http://localhost:3000
```

### Using Docker

```bash
docker-compose up -d
```

## 🎨 Design System

- **Primary Color**: `#e94560` (Brand Red/Pink)
- **Font**: Inter
- **Border Radius**: 0.75rem (rounded-xl)
- **Shadows**: Soft, subtle shadows
- **Layout**: Mobile-first, responsive grid
- **Components**: Consistent ShadCN-inspired design tokens

## 📱 Pages

### Buyer
| Page | Route |
|------|-------|
| Home | `/` |
| Shop | `/shop` |
| Product Detail | `/product/[slug]` |
| Category | `/category/[slug]` |
| Cart | `/cart` |
| Checkout | `/checkout` |
| Login | `/login` |
| Register | `/register` |
| Orders | `/orders` |
| Wishlist | `/wishlist` |

### Seller
| Page | Route |
|------|-------|
| Dashboard | `/seller` |
| Products | `/seller/products` |
| Add Product | `/seller/products/new` |
| Orders | `/seller/orders` |
| Discounts | `/seller/discounts` |
| Analytics | `/seller/analytics` |
| Store | `/seller/store` |
| Settings | `/seller/settings` |

### Admin
| Page | Route |
|------|-------|
| Dashboard | `/admin` |
| Users | `/admin/users` |
| Sellers | `/admin/sellers` |
| Products | `/admin/products` |
| Categories | `/admin/categories` |
| Orders | `/admin/orders` |
| Banners | `/admin/banners` |
| Settings | `/admin/settings` |

## 🔒 Security

- Password hashing with bcrypt (12 rounds)
- JWT authentication with refresh token rotation
- Role-based access control (RBAC)
- Input validation with Zod
- Rate limiting (100 req/15min per IP)
- CORS configuration
- Helmet security headers
- File upload type/size restrictions
- HTTP-only secure cookies

## 📈 Deployment

| Service | Platform |
|---------|----------|
| Frontend | Vercel |
| Backend | Render / Railway / AWS |
| Database | MongoDB Atlas |
| Media | Cloudinary |
| Payments | Stripe |

## 🗺️ Development Roadmap

### Phase 1 - Core (Current) ✅
- User authentication
- Product CRUD
- Shopping cart
- Order management
- Basic seller dashboard
- Admin panel foundation

### Phase 2 - Enhanced
- Elasticsearch integration
- Email notifications
- Payment processing (Stripe)
- Advanced analytics
- Review system
- Real-time messaging

### Phase 3 - Scale
- Push notifications
- Advanced search with Algolia
- Performance optimization
- CDN integration
- Multi-language support
- Mobile app (React Native)

## 📄 License

Private - Aleem Mart © 2024
