'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Edit2, Trash2, ChevronRight, FolderOpen } from 'lucide-react';

const categories = [
  {
    id: '1', name: 'Electronics', slug: 'electronics', products: 1234, icon: '📱',
    children: [
      { id: '1a', name: 'Mobile Phones', slug: 'mobile-phones', products: 456 },
      { id: '1b', name: 'Laptops', slug: 'laptops', products: 234 },
      { id: '1c', name: 'Audio', slug: 'audio', products: 189 },
      { id: '1d', name: 'Accessories', slug: 'accessories', products: 355 },
    ],
  },
  {
    id: '2', name: 'Fashion', slug: 'fashion', products: 2456, icon: '👕',
    children: [
      { id: '2a', name: "Men's Clothing", slug: 'mens-clothing', products: 890 },
      { id: '2b', name: "Women's Clothing", slug: 'womens-clothing', products: 1100 },
      { id: '2c', name: 'Shoes', slug: 'shoes', products: 466 },
    ],
  },
  {
    id: '3', name: 'Home & Kitchen', slug: 'home-kitchen', products: 890, icon: '🏠',
    children: [
      { id: '3a', name: 'Furniture', slug: 'furniture', products: 234 },
      { id: '3b', name: 'Kitchen Appliances', slug: 'kitchen-appliances', products: 345 },
      { id: '3c', name: 'Decor', slug: 'decor', products: 311 },
    ],
  },
  {
    id: '4', name: 'Health & Beauty', slug: 'health-beauty', products: 678, icon: '💄',
    children: [
      { id: '4a', name: 'Skincare', slug: 'skincare', products: 234 },
      { id: '4b', name: 'Makeup', slug: 'makeup', products: 189 },
      { id: '4c', name: 'Fragrances', slug: 'fragrances', products: 255 },
    ],
  },
  {
    id: '5', name: 'Sports & Fitness', slug: 'sports-fitness', products: 345, icon: '⚽',
    children: [
      { id: '5a', name: 'Exercise Equipment', slug: 'exercise-equipment', products: 120 },
      { id: '5b', name: 'Sports Gear', slug: 'sports-gear', products: 225 },
    ],
  },
];

export default function AdminCategoriesPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('1');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500">Manage product categories and subcategories</p>
        </div>
        <Button>
          <Plus size={16} className="mr-2" /> Add Category
        </Button>
      </div>

      {/* Category Tree */}
      <div className="bg-white rounded-xl border">
        <div className="p-5 border-b">
          <div className="relative max-w-sm">
            <Input placeholder="Search categories..." />
          </div>
        </div>

        <div className="divide-y">
          {categories.map((category) => (
            <div key={category.id}>
              <div
                className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
              >
                <div className="flex items-center gap-3">
                  <ChevronRight
                    size={16}
                    className={`text-gray-400 transition-transform ${expandedCategory === category.id ? 'rotate-90' : ''}`}
                  />
                  <span className="text-xl">{category.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900">{category.name}</p>
                    <p className="text-xs text-gray-500">{category.products} products · {category.children.length} subcategories</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="Edit" onClick={(e) => e.stopPropagation()}>
                    <Edit2 size={14} className="text-gray-500" />
                  </button>
                  <button className="p-1.5 hover:bg-red-50 rounded-lg" title="Delete" onClick={(e) => e.stopPropagation()}>
                    <Trash2 size={14} className="text-red-500" />
                  </button>
                </div>
              </div>

              {/* Subcategories */}
              {expandedCategory === category.id && (
                <div className="bg-gray-50 border-t">
                  {category.children.map((sub) => (
                    <div key={sub.id} className="flex items-center justify-between px-5 py-3 pl-14 hover:bg-gray-100">
                      <div className="flex items-center gap-3">
                        <FolderOpen size={14} className="text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-800">{sub.name}</p>
                          <p className="text-xs text-gray-400">{sub.products} products</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-white rounded-lg" title="Edit">
                          <Edit2 size={14} className="text-gray-500" />
                        </button>
                        <button className="p-1.5 hover:bg-red-50 rounded-lg" title="Delete">
                          <Trash2 size={14} className="text-red-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button className="w-full text-center py-2.5 text-xs text-primary hover:bg-gray-100 font-medium">
                    + Add Subcategory
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
