import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import Store from './models/Store';
import Category from './models/Category';
import Product from './models/Product';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/aleem-mart';

const categories = [
  { name: 'Electronics', slug: 'electronics', icon: '💻', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400', sortOrder: 1 },
  { name: 'Fashion', slug: 'fashion', icon: '👗', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400', sortOrder: 2 },
  { name: 'Home & Living', slug: 'home-living', icon: '🏠', image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400', sortOrder: 3 },
  { name: 'Beauty & Health', slug: 'beauty-health', icon: '💄', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400', sortOrder: 4 },
  { name: 'Sports & Fitness', slug: 'sports-fitness', icon: '⚽', image: 'https://images.unsplash.com/photo-1461896836934-bd45ea8e2c7b?w=400', sortOrder: 5 },
  { name: 'Books & Stationery', slug: 'books-stationery', icon: '📚', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400', sortOrder: 6 },
  { name: 'Gaming', slug: 'gaming', icon: '🎮', image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400', sortOrder: 7 },
  { name: 'Groceries', slug: 'groceries', icon: '🛒', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', sortOrder: 8 },
];

const products = [
  // Electronics
  {
    title: 'Apple AirPods Pro 2nd Generation',
    slug: 'apple-airpods-pro-2nd-gen',
    description: 'Experience immersive sound with Active Noise Cancellation, Adaptive Transparency, and Personalized Spatial Audio. The H2 chip delivers smarter noise cancellation and richer sound. Up to 6 hours of listening time with ANC enabled.',
    shortDescription: 'Premium wireless earbuds with Active Noise Cancellation',
    images: [
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600',
      'https://images.unsplash.com/photo-1588423771073-b8903fde1c68?w=600',
      'https://images.unsplash.com/photo-1590658268037-6bf12f900806?w=600',
    ],
    categorySlug: 'electronics',
    brand: 'Apple',
    price: 39999,
    comparePrice: 49999,
    stock: 50,
    rating: 4.8,
    totalReviews: 1250,
    totalSold: 3200,
    isFeatured: true,
    tags: ['airpods', 'wireless', 'apple', 'earbuds', 'noise-cancellation'],
    specifications: [
      { key: 'Chip', value: 'Apple H2' },
      { key: 'Battery Life', value: '6 hours (ANC)' },
      { key: 'Connectivity', value: 'Bluetooth 5.3' },
      { key: 'Water Resistance', value: 'IPX4' },
    ],
    estimatedDelivery: '2-3 business days',
  },
  {
    title: 'Samsung Galaxy S24 Ultra 256GB',
    slug: 'samsung-galaxy-s24-ultra-256gb',
    description: 'The ultimate smartphone with Galaxy AI built in. Featuring a 200MP camera, titanium frame, 6.8" Dynamic AMOLED 2X display, and S Pen. Powered by Snapdragon 8 Gen 3 for Galaxy.',
    shortDescription: 'Flagship smartphone with Galaxy AI and 200MP camera',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600',
      'https://images.unsplash.com/photo-1592950630581-03cb41342cc5?w=600',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600',
    ],
    categorySlug: 'electronics',
    brand: 'Samsung',
    price: 249999,
    comparePrice: 279999,
    stock: 25,
    rating: 4.7,
    totalReviews: 890,
    totalSold: 1500,
    isFeatured: true,
    tags: ['samsung', 'galaxy', 'smartphone', '5g', 'ai'],
    specifications: [
      { key: 'Display', value: '6.8" Dynamic AMOLED 2X' },
      { key: 'Processor', value: 'Snapdragon 8 Gen 3' },
      { key: 'RAM', value: '12GB' },
      { key: 'Camera', value: '200MP + 50MP + 12MP + 10MP' },
      { key: 'Battery', value: '5000 mAh' },
    ],
    estimatedDelivery: '1-2 business days',
  },
  {
    title: 'Sony WH-1000XM5 Wireless Headphones',
    slug: 'sony-wh-1000xm5-wireless-headphones',
    description: 'Industry-leading noise canceling with Auto NC Optimizer. Crystal clear hands-free calling with 4 beamforming microphones. Exceptional sound quality with 30mm drivers and DSEE Extreme upscaling.',
    shortDescription: 'Premium noise-cancelling over-ear headphones',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600',
    ],
    categorySlug: 'electronics',
    brand: 'Sony',
    price: 44999,
    comparePrice: 54999,
    stock: 35,
    rating: 4.9,
    totalReviews: 2100,
    totalSold: 5600,
    isFeatured: true,
    tags: ['sony', 'headphones', 'wireless', 'noise-cancellation', 'premium'],
    specifications: [
      { key: 'Driver', value: '30mm' },
      { key: 'Battery', value: '30 hours' },
      { key: 'Weight', value: '250g' },
      { key: 'Connectivity', value: 'Bluetooth 5.2, 3.5mm' },
    ],
    estimatedDelivery: '2-4 business days',
  },
  {
    title: 'MacBook Air M3 13-inch 8GB 256GB',
    slug: 'macbook-air-m3-13-inch',
    description: 'Supercharged by the M3 chip. Up to 18 hours of battery life. A brilliant 13.6-inch Liquid Retina display. All in a thin, light, durable design. The MacBook Air is the best laptop for everything you do.',
    shortDescription: 'Ultra-thin laptop with M3 chip and 18-hour battery',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600',
    ],
    categorySlug: 'electronics',
    brand: 'Apple',
    price: 199999,
    comparePrice: 229999,
    stock: 20,
    rating: 4.9,
    totalReviews: 650,
    totalSold: 1800,
    isFeatured: true,
    tags: ['macbook', 'apple', 'laptop', 'm3', 'ultrabook'],
    specifications: [
      { key: 'Chip', value: 'Apple M3' },
      { key: 'Display', value: '13.6" Liquid Retina' },
      { key: 'RAM', value: '8GB Unified' },
      { key: 'Storage', value: '256GB SSD' },
      { key: 'Battery', value: 'Up to 18 hours' },
    ],
    estimatedDelivery: '3-5 business days',
  },
  {
    title: 'JBL Flip 6 Portable Bluetooth Speaker',
    slug: 'jbl-flip-6-portable-speaker',
    description: 'Bold sound for every adventure. JBL Flip 6 delivers powerful JBL Original Pro Sound with an optimized racetrack-shaped driver. IP67 waterproof and dustproof. 12 hours of playtime.',
    shortDescription: 'Waterproof portable speaker with powerful bass',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600',
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600',
    ],
    categorySlug: 'electronics',
    brand: 'JBL',
    price: 9999,
    comparePrice: 12999,
    stock: 80,
    rating: 4.5,
    totalReviews: 1800,
    totalSold: 7200,
    isFeatured: false,
    tags: ['jbl', 'speaker', 'bluetooth', 'portable', 'waterproof'],
    specifications: [
      { key: 'Output', value: '30W' },
      { key: 'Battery', value: '12 hours' },
      { key: 'Water Rating', value: 'IP67' },
      { key: 'Weight', value: '550g' },
    ],
    estimatedDelivery: '2-3 business days',
  },
  // Fashion
  {
    title: 'Nike Air Jordan 1 Retro High OG',
    slug: 'nike-air-jordan-1-retro-high-og',
    description: 'The Air Jordan 1 Retro High remakes the classic sneaker with premium materials and the iconic Wings logo on the collar. Full-grain leather in the upper for a premium look and feel.',
    shortDescription: 'Iconic basketball sneakers in premium leather',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
      'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600',
    ],
    categorySlug: 'fashion',
    brand: 'Nike',
    price: 24999,
    comparePrice: 29999,
    stock: 40,
    rating: 4.8,
    totalReviews: 980,
    totalSold: 4500,
    isFeatured: true,
    tags: ['nike', 'jordan', 'sneakers', 'basketball', 'premium'],
    specifications: [
      { key: 'Material', value: 'Full-grain leather' },
      { key: 'Sole', value: 'Rubber' },
      { key: 'Closure', value: 'Lace-up' },
      { key: 'Style', value: 'High-top' },
    ],
    estimatedDelivery: '3-5 business days',
  },
  {
    title: 'Levi\'s 501 Original Fit Jeans',
    slug: 'levis-501-original-fit-jeans',
    description: 'The original blue jean since 1873. The 501 Original Fit Jeans feature the signature button fly, straight leg, and regular fit through the thigh. Made with premium selvedge denim.',
    shortDescription: 'Classic straight-fit jeans in premium denim',
    images: [
      'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=600',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600',
      'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600',
    ],
    categorySlug: 'fashion',
    brand: 'Levi\'s',
    price: 5999,
    comparePrice: 8999,
    stock: 100,
    rating: 4.4,
    totalReviews: 560,
    totalSold: 3400,
    isFeatured: false,
    tags: ['levis', 'jeans', 'denim', 'classic', 'menswear'],
    specifications: [
      { key: 'Material', value: '100% Cotton Denim' },
      { key: 'Fit', value: 'Original / Straight' },
      { key: 'Rise', value: 'Regular' },
      { key: 'Closure', value: 'Button Fly' },
    ],
    estimatedDelivery: '3-5 business days',
  },
  {
    title: 'Ray-Ban Aviator Classic Sunglasses',
    slug: 'ray-ban-aviator-classic-sunglasses',
    description: 'The iconic Ray-Ban Aviator Classic is a timeless model that combines great styling with exceptional quality. Originally designed for U.S. aviators in 1937, the gold frame and green G-15 lenses remain timeless.',
    shortDescription: 'Iconic aviator sunglasses with G-15 lenses',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600',
    ],
    categorySlug: 'fashion',
    brand: 'Ray-Ban',
    price: 15999,
    comparePrice: 19999,
    stock: 60,
    rating: 4.6,
    totalReviews: 420,
    totalSold: 2800,
    isFeatured: true,
    tags: ['rayban', 'sunglasses', 'aviator', 'classic', 'uv-protection'],
    specifications: [
      { key: 'Frame', value: 'Gold Metal' },
      { key: 'Lens', value: 'G-15 Green' },
      { key: 'UV Protection', value: '100% UV400' },
      { key: 'Size', value: '58mm' },
    ],
    estimatedDelivery: '2-4 business days',
  },
  // Home & Living
  {
    title: 'Dyson V15 Detect Cordless Vacuum',
    slug: 'dyson-v15-detect-cordless-vacuum',
    description: 'Dyson\'s most powerful, intelligent cordless vacuum. Laser reveals microscopic dust. Piezo sensor counts and sizes particles. LCD screen shows real-time scientific proof of a deep clean.',
    shortDescription: 'Smart cordless vacuum with laser dust detection',
    images: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600',
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600',
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600',
    ],
    categorySlug: 'home-living',
    brand: 'Dyson',
    price: 89999,
    comparePrice: 109999,
    stock: 15,
    rating: 4.7,
    totalReviews: 340,
    totalSold: 890,
    isFeatured: true,
    tags: ['dyson', 'vacuum', 'cordless', 'smart', 'cleaning'],
    specifications: [
      { key: 'Suction', value: '230AW' },
      { key: 'Runtime', value: '60 min' },
      { key: 'Bin Volume', value: '0.76L' },
      { key: 'Weight', value: '3.1kg' },
    ],
    estimatedDelivery: '3-5 business days',
  },
  {
    title: 'Philips Hue Smart LED Starter Kit',
    slug: 'philips-hue-smart-led-starter-kit',
    description: 'Start your smart lighting journey with the Philips Hue White and Color Ambiance starter kit. Includes 3 E27 smart bulbs and Hue Bridge. Choose from 16 million colors to set the perfect ambiance.',
    shortDescription: 'Smart RGB lighting kit with voice control',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600',
      'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600',
      'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600',
    ],
    categorySlug: 'home-living',
    brand: 'Philips',
    price: 14999,
    comparePrice: 18999,
    stock: 45,
    rating: 4.5,
    totalReviews: 780,
    totalSold: 2100,
    isFeatured: false,
    tags: ['philips', 'hue', 'smart-home', 'lighting', 'rgb'],
    specifications: [
      { key: 'Bulbs', value: '3x E27 Color Ambiance' },
      { key: 'Colors', value: '16 million' },
      { key: 'Compatible', value: 'Alexa, Google, HomeKit' },
      { key: 'Lumens', value: '800 per bulb' },
    ],
    estimatedDelivery: '2-4 business days',
  },
  // Beauty & Health
  {
    title: 'The Ordinary Niacinamide 10% + Zinc 1%',
    slug: 'the-ordinary-niacinamide-serum',
    description: 'High-strength vitamin and mineral blemish formula. Niacinamide (Vitamin B3) reduces the appearance of skin blemishes and congestion. Zinc PCA balances sebum activity.',
    shortDescription: 'Blemish-fighting serum with Vitamin B3',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600',
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600',
    ],
    categorySlug: 'beauty-health',
    brand: 'The Ordinary',
    price: 1499,
    comparePrice: 2499,
    stock: 200,
    rating: 4.6,
    totalReviews: 3200,
    totalSold: 12000,
    isFeatured: true,
    tags: ['skincare', 'serum', 'niacinamide', 'the-ordinary', 'blemish'],
    specifications: [
      { key: 'Size', value: '30ml' },
      { key: 'Key Ingredient', value: 'Niacinamide 10%' },
      { key: 'Skin Type', value: 'All' },
      { key: 'Use', value: 'AM and PM' },
    ],
    estimatedDelivery: '2-3 business days',
  },
  {
    title: 'Dyson Airwrap Multi-Styler Complete',
    slug: 'dyson-airwrap-multi-styler',
    description: 'Style, dry, and hide flyaways. Re-engineered attachments for faster, easier styling. The Coanda effect attracts and wraps hair around the barrel for voluminous curls and waves.',
    shortDescription: 'Multi-function hair styler and dryer',
    images: [
      'https://images.unsplash.com/photo-1522338242992-e1a54f5e21b2?w=600',
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600',
    ],
    categorySlug: 'beauty-health',
    brand: 'Dyson',
    price: 69999,
    comparePrice: 79999,
    stock: 18,
    rating: 4.8,
    totalReviews: 560,
    totalSold: 1400,
    isFeatured: true,
    tags: ['dyson', 'airwrap', 'hair-styler', 'premium', 'beauty'],
    specifications: [
      { key: 'Attachments', value: '6 included' },
      { key: 'Heat Settings', value: '3' },
      { key: 'Airflow', value: 'Coanda technology' },
      { key: 'Voltage', value: '220-240V' },
    ],
    estimatedDelivery: '3-5 business days',
  },
  // Sports
  {
    title: 'Fitbit Charge 6 Fitness Tracker',
    slug: 'fitbit-charge-6-fitness-tracker',
    description: 'Advanced health and fitness tracker with built-in GPS, heart rate monitoring, stress management, sleep tracking, and 40+ exercise modes. 7-day battery life. Water resistant to 50m.',
    shortDescription: 'Advanced fitness tracker with GPS and health monitoring',
    images: [
      'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600',
      'https://images.unsplash.com/photo-1510017803434-a899b57e6000?w=600',
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600',
    ],
    categorySlug: 'sports-fitness',
    brand: 'Fitbit',
    price: 22999,
    comparePrice: 27999,
    stock: 55,
    rating: 4.4,
    totalReviews: 670,
    totalSold: 3100,
    isFeatured: false,
    tags: ['fitbit', 'fitness', 'tracker', 'gps', 'health'],
    specifications: [
      { key: 'Display', value: '1.04" AMOLED' },
      { key: 'Battery', value: '7 days' },
      { key: 'GPS', value: 'Built-in' },
      { key: 'Water Resistance', value: '50m' },
    ],
    estimatedDelivery: '2-3 business days',
  },
  {
    title: 'Adidas Ultraboost Light Running Shoes',
    slug: 'adidas-ultraboost-light-running-shoes',
    description: 'Experience epic energy with every step. Ultraboost Light is our lightest Ultraboost ever, 30% lighter midsole. Light BOOST cushioning made with 70% renewable content. Continental rubber outsole.',
    shortDescription: 'Lightest Ultraboost running shoes ever made',
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600',
    ],
    categorySlug: 'sports-fitness',
    brand: 'Adidas',
    price: 18999,
    comparePrice: 24999,
    stock: 65,
    rating: 4.6,
    totalReviews: 890,
    totalSold: 4200,
    isFeatured: true,
    tags: ['adidas', 'ultraboost', 'running', 'shoes', 'lightweight'],
    specifications: [
      { key: 'Cushioning', value: 'Light BOOST' },
      { key: 'Upper', value: 'Primeknit+' },
      { key: 'Outsole', value: 'Continental Rubber' },
      { key: 'Drop', value: '10mm' },
    ],
    estimatedDelivery: '3-5 business days',
  },
  // Gaming
  {
    title: 'PlayStation 5 DualSense Wireless Controller',
    slug: 'ps5-dualsense-wireless-controller',
    description: 'Discover a deeper gaming experience with the DualSense wireless controller. Haptic feedback and adaptive triggers deliver immersive sensations. Built-in microphone and 3.5mm headset jack.',
    shortDescription: 'Next-gen controller with haptic feedback',
    images: [
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600',
      'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600',
      'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=600',
    ],
    categorySlug: 'gaming',
    brand: 'Sony',
    price: 9999,
    comparePrice: 12999,
    stock: 75,
    rating: 4.7,
    totalReviews: 1500,
    totalSold: 8900,
    isFeatured: false,
    tags: ['playstation', 'ps5', 'controller', 'gaming', 'wireless'],
    specifications: [
      { key: 'Connectivity', value: 'Bluetooth 5.1, USB-C' },
      { key: 'Battery', value: '1560mAh' },
      { key: 'Features', value: 'Haptic, Adaptive Triggers' },
      { key: 'Audio', value: 'Built-in mic, 3.5mm' },
    ],
    estimatedDelivery: '2-3 business days',
  },
  {
    title: 'Logitech G Pro X Superlight Mouse',
    slug: 'logitech-g-pro-x-superlight-mouse',
    description: 'Ultra-lightweight design at less than 63 grams with HERO 25K sensor through LIGHTSPEED wireless. Zero compromises - designed in collaboration with top esports pros.',
    shortDescription: 'Ultra-light wireless gaming mouse (63g)',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600',
      'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=600',
    ],
    categorySlug: 'gaming',
    brand: 'Logitech',
    price: 12999,
    comparePrice: 16999,
    stock: 42,
    rating: 4.8,
    totalReviews: 920,
    totalSold: 5600,
    isFeatured: true,
    tags: ['logitech', 'gaming', 'mouse', 'wireless', 'esports'],
    specifications: [
      { key: 'Weight', value: '<63g' },
      { key: 'Sensor', value: 'HERO 25K' },
      { key: 'Battery', value: '70 hours' },
      { key: 'DPI', value: '100-25,600' },
    ],
    estimatedDelivery: '2-4 business days',
  },
  // More variety
  {
    title: 'Kindle Paperwhite 11th Generation',
    slug: 'kindle-paperwhite-11th-gen',
    description: 'The thinnest, lightest Kindle Paperwhite yet. 6.8" display with adjustable warm light, 16GB storage, and up to 10 weeks of battery life. IPX8 waterproof for reading anywhere.',
    shortDescription: 'Waterproof e-reader with warm light display',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600',
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600',
    ],
    categorySlug: 'books-stationery',
    brand: 'Amazon',
    price: 19999,
    comparePrice: 24999,
    stock: 30,
    rating: 4.7,
    totalReviews: 1100,
    totalSold: 6700,
    isFeatured: false,
    tags: ['kindle', 'ereader', 'books', 'amazon', 'waterproof'],
    specifications: [
      { key: 'Display', value: '6.8" 300ppi E-Ink' },
      { key: 'Storage', value: '16GB' },
      { key: 'Battery', value: '10 weeks' },
      { key: 'Water Rating', value: 'IPX8' },
    ],
    estimatedDelivery: '2-3 business days',
  },
  {
    title: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker',
    slug: 'instant-pot-duo-7-in-1',
    description: 'The #1 selling multi-cooker. 7 appliances in 1: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and warmer. 6 quart capacity feeds up to 6 people.',
    shortDescription: '7-in-1 smart pressure cooker for easy meals',
    images: [
      'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600',
      'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600',
    ],
    categorySlug: 'home-living',
    brand: 'Instant Pot',
    price: 8999,
    comparePrice: 13999,
    stock: 90,
    rating: 4.5,
    totalReviews: 2400,
    totalSold: 9800,
    isFeatured: false,
    tags: ['instant-pot', 'pressure-cooker', 'kitchen', 'cooking', 'multi-cooker'],
    specifications: [
      { key: 'Capacity', value: '6 Quart' },
      { key: 'Functions', value: '7-in-1' },
      { key: 'Presets', value: '13 programs' },
      { key: 'Material', value: 'Stainless Steel' },
    ],
    estimatedDelivery: '3-5 business days',
  },
  {
    title: 'CeraVe Moisturizing Cream 539g',
    slug: 'cerave-moisturizing-cream-539g',
    description: 'Developed with dermatologists. Rich, non-greasy moisturizer with 3 essential ceramides and hyaluronic acid. MVE Technology for 24-hour hydration. Fragrance-free and non-comedogenic.',
    shortDescription: 'Dermatologist-recommended 24hr moisturizer',
    images: [
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600',
      'https://images.unsplash.com/photo-1570194065650-d99fb4ee4b93?w=600',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600',
    ],
    categorySlug: 'beauty-health',
    brand: 'CeraVe',
    price: 3499,
    comparePrice: 4999,
    stock: 150,
    rating: 4.7,
    totalReviews: 4500,
    totalSold: 18000,
    isFeatured: false,
    tags: ['cerave', 'moisturizer', 'skincare', 'ceramides', 'dermatologist'],
    specifications: [
      { key: 'Size', value: '539g / 19oz' },
      { key: 'Key Ingredients', value: 'Ceramides, Hyaluronic Acid' },
      { key: 'Skin Type', value: 'Dry to Normal' },
      { key: 'Fragrance', value: 'Free' },
    ],
    estimatedDelivery: '2-3 business days',
  },
  {
    title: 'Apple Watch Series 9 GPS 45mm',
    slug: 'apple-watch-series-9-gps-45mm',
    description: 'The most powerful Apple Watch yet with S9 SiP chip. Double Tap gesture, brighter Always-On Retina display, and advanced health features including blood oxygen, ECG, and temperature sensing.',
    shortDescription: 'Smart watch with Double Tap and health monitoring',
    images: [
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600',
      'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=600',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600',
    ],
    categorySlug: 'electronics',
    brand: 'Apple',
    price: 64999,
    comparePrice: 74999,
    stock: 30,
    rating: 4.8,
    totalReviews: 780,
    totalSold: 2400,
    isFeatured: true,
    tags: ['apple-watch', 'smartwatch', 'health', 'fitness', 'apple'],
    specifications: [
      { key: 'Chip', value: 'S9 SiP' },
      { key: 'Display', value: '45mm Always-On Retina' },
      { key: 'Battery', value: '18 hours' },
      { key: 'Water Resistance', value: '50m' },
    ],
    estimatedDelivery: '2-3 business days',
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Store.deleteMany({}),
      Category.deleteMany({}),
      Product.deleteMany({}),
    ]);
    console.log('Cleared existing data');

    // Create seller user
    const seller = await User.create({
      firstName: 'Aleem',
      lastName: 'Store',
      email: 'seller@aleemmart.com',
      password: 'seller123456',
      role: 'seller',
      isVerified: true,
      isActive: true,
    });

    // Create buyer user  
    const buyer = await User.create({
      firstName: 'Muhammad',
      lastName: 'Aleem',
      email: 'raleem811811@gmail.com',
      password: 'buyer123456',
      role: 'buyer',
      isVerified: true,
      isActive: true,
    });

    // Create admin
    await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@aleemmart.com',
      password: 'admin123456',
      role: 'admin',
      isVerified: true,
      isActive: true,
    });

    console.log('Created users (seller@aleemmart.com / seller123456, raleem811811@gmail.com / buyer123456)');

    // Create store
    const store = await Store.create({
      seller: seller._id,
      name: 'Aleem Mart Official',
      slug: 'aleem-mart-official',
      description: 'Your one-stop shop for premium products at the best prices. We offer genuine products with fast delivery across Pakistan.',
      logo: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=200',
      banner: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
      phone: '+92 315 1664843',
      email: 'store@aleemmart.com',
      address: {
        street: 'Park Road',
        city: 'Islamabad',
        state: 'ICT',
        country: 'Pakistan',
        postalCode: '44000',
      },
      status: 'approved',
      rating: 4.8,
      totalReviews: 1250,
      isVerified: true,
      verifiedAt: new Date(),
    });
    console.log('Created store');

    // Create categories
    const categoryDocs = await Category.insertMany(
      categories.map((cat, i) => ({
        ...cat,
        level: 0,
        isActive: true,
        productCount: 0,
      }))
    );
    const categoryMap = new Map(categoryDocs.map(c => [c.slug, c._id]));
    console.log(`Created ${categoryDocs.length} categories`);

    // Create products
    const productDocs = products.map((p, i) => ({
      seller: seller._id,
      store: store._id,
      title: p.title,
      slug: p.slug,
      description: p.description,
      shortDescription: p.shortDescription,
      images: p.images,
      category: categoryMap.get(p.categorySlug),
      brand: p.brand,
      sku: `AM-${String(i + 1).padStart(4, '0')}`,
      price: p.price,
      comparePrice: p.comparePrice,
      stock: p.stock,
      rating: p.rating,
      totalReviews: p.totalReviews,
      totalSold: p.totalSold,
      isFeatured: p.isFeatured,
      isActive: true,
      status: 'active' as const,
      tags: p.tags,
      specifications: p.specifications,
      estimatedDelivery: p.estimatedDelivery,
      lowStockThreshold: 5,
    }));

    await Product.insertMany(productDocs);
    console.log(`Created ${productDocs.length} products`);

    // Update category product counts
    for (const [slug, catId] of categoryMap) {
      const count = productDocs.filter(p => p.category?.toString() === catId.toString()).length;
      await Category.findByIdAndUpdate(catId, { productCount: count });
    }

    console.log('\n✅ Seed complete!');
    console.log('Buyer login: raleem811811@gmail.com / buyer123456');
    console.log('Seller login: seller@aleemmart.com / seller123456');
    console.log('Admin login: admin@aleemmart.com / admin123456');

    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();
