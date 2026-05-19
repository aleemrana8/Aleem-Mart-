import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Image
              src="/images/logo.png"
              alt="Aleem Mart"
              width={160}
              height={50}
              className="h-12 w-auto mb-4"
            />
            <p className="text-sm text-gray-400 mb-2">Smart Choices. Better Living.</p>
            <p className="text-sm text-gray-400 mb-4">
              Pakistan&apos;s premium multi-vendor marketplace. Shop from verified sellers with confidence.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary transition">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary transition">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary transition">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary transition">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="hover:text-primary transition">Shop</Link></li>
              <li><Link href="/deals" className="hover:text-primary transition">Deals</Link></li>
              <li><Link href="/new-arrivals" className="hover:text-primary transition">New Arrivals</Link></li>
              <li><Link href="/best-sellers" className="hover:text-primary transition">Best Sellers</Link></li>
              <li><Link href="/seller/register" className="hover:text-primary transition">Become a Seller</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help" className="hover:text-primary transition">Help Center</Link></li>
              <li><Link href="/returns" className="hover:text-primary transition">Returns & Refunds</Link></li>
              <li><Link href="/shipping" className="hover:text-primary transition">Shipping Info</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                support@aleemmart.com
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                +92 300 1234567
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-primary mt-0.5" />
                Lahore, Pakistan
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-gray-500">
          <p>© 2024 Aleem Mart. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>We accept:</span>
            <div className="flex gap-2">
              <span className="bg-gray-800 px-2 py-1 rounded text-xs">Visa</span>
              <span className="bg-gray-800 px-2 py-1 rounded text-xs">Mastercard</span>
              <span className="bg-gray-800 px-2 py-1 rounded text-xs">JazzCash</span>
              <span className="bg-gray-800 px-2 py-1 rounded text-xs">Easypaisa</span>
              <span className="bg-gray-800 px-2 py-1 rounded text-xs">COD</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
