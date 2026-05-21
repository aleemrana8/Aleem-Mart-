import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, CreditCard, Shield, Truck, ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-brand-navy text-neutral-300 relative overflow-hidden">
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Pre-footer CTA */}
      <div className="border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Start Selling on Aleem Mart</h3>
              <p className="text-sm text-neutral-400">Join 500+ sellers and reach millions of customers</p>
            </div>
            <Link href="/seller" className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium text-sm transition-colors">
              Get Started <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-brand-orange flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-lg text-white">Aleem<span className="text-primary">Mart</span></span>
            </div>
            <p className="text-sm text-neutral-400 mb-4 max-w-sm leading-relaxed">
              Pakistan&apos;s premium AI-powered multi-vendor marketplace. Shop from verified sellers with confidence, 
              get personalized recommendations, and enjoy a next-generation commerce experience.
            </p>
            <div className="flex gap-2 mb-6">
              <a href="#" className="p-2.5 bg-white/5 rounded-xl hover:bg-primary/20 hover:text-primary transition-colors border border-white/5">
                <Facebook size={16} />
              </a>
              <a href="#" className="p-2.5 bg-white/5 rounded-xl hover:bg-primary/20 hover:text-primary transition-colors border border-white/5">
                <Instagram size={16} />
              </a>
              <a href="#" className="p-2.5 bg-white/5 rounded-xl hover:bg-primary/20 hover:text-primary transition-colors border border-white/5">
                <Twitter size={16} />
              </a>
              <a href="#" className="p-2.5 bg-white/5 rounded-xl hover:bg-primary/20 hover:text-primary transition-colors border border-white/5">
                <Youtube size={16} />
              </a>
            </div>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 text-xs text-neutral-400">
              <div className="flex items-center gap-1.5"><Shield size={14} className="text-primary" /> Buyer Protection</div>
              <div className="flex items-center gap-1.5"><Truck size={14} className="text-primary" /> Fast Delivery</div>
              <div className="flex items-center gap-1.5"><CreditCard size={14} className="text-primary" /> Secure Payments</div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Shop</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/shop" className="hover:text-primary transition-colors">All Products</Link></li>
              <li><Link href="/shop?sort=-discount" className="hover:text-primary transition-colors">Deals & Offers</Link></li>
              <li><Link href="/shop?sort=-createdAt" className="hover:text-primary transition-colors">New Arrivals</Link></li>
              <li><Link href="/shop?sort=-totalSold" className="hover:text-primary transition-colors">Best Sellers</Link></li>
              <li><Link href="/shop?category=electronics" className="hover:text-primary transition-colors">Electronics</Link></li>
              <li><Link href="/shop?category=fashion" className="hover:text-primary transition-colors">Fashion</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Support</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/shop" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="/shop" className="hover:text-primary transition-colors">Returns & Refunds</Link></li>
              <li><Link href="/shop" className="hover:text-primary transition-colors">Shipping Info</Link></li>
              <li><Link href="/shop" className="hover:text-primary transition-colors">Track Order</Link></li>
              <li><Link href="/shop" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/shop" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-primary flex-shrink-0" />
                <span>raleem811811@gmail.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-primary flex-shrink-0" />
                <span>+92 315 1664843</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-primary flex-shrink-0 mt-0.5" />
                <span>Hostel City, Park Road,<br />Islamabad, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-neutral-500">
          <p>© 2026 Aleem Mart. All rights reserved.</p>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span className="text-xs">We accept:</span>
            {['Visa', 'Mastercard', 'JazzCash', 'Easypaisa', 'COD'].map(method => (
              <span key={method} className="px-2.5 py-1 rounded-md bg-white/5 text-[11px] font-medium text-neutral-400 border border-white/5">
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
