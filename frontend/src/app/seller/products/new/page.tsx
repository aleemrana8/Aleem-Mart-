'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Upload, Plus, X } from 'lucide-react';
import Link from 'next/link';

export default function AddProductPage() {
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>(['electronics']);
  const [tagInput, setTagInput] = useState('');

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/seller/products">
          <Button variant="ghost" size="icon">
            <ArrowLeft size={20} />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-500">Fill in the details to list your product</p>
        </div>
      </div>

      <form className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl border p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Basic Information</h2>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Product Title *</label>
            <Input placeholder="e.g. Wireless Bluetooth Headphones with ANC" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Short Description</label>
            <Input placeholder="Brief product description for listings" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Full Description *</label>
            <textarea
              rows={5}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Detailed product description..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Category *</label>
              <select className="w-full border rounded-lg px-3 py-2 text-sm bg-white">
                <option>Select Category</option>
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Home & Living</option>
                <option>Beauty</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Subcategory</label>
              <select className="w-full border rounded-lg px-3 py-2 text-sm bg-white">
                <option>Select Subcategory</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Brand</label>
            <Input placeholder="Brand name" />
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl border p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Product Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label className="border-2 border-dashed rounded-xl h-32 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition">
              <Upload size={24} className="text-gray-400 mb-1" />
              <span className="text-xs text-gray-500">Upload Image</span>
              <input type="file" className="hidden" accept="image/*" />
            </label>
          </div>
          <p className="text-xs text-gray-500">Upload up to 10 images. First image will be the main product image.</p>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-xl border p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Pricing & Inventory</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Price (Rs.) *</label>
              <Input type="number" placeholder="0" min="0" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Compare Price (Rs.)</label>
              <Input type="number" placeholder="0" min="0" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Cost Price (Rs.)</label>
              <Input type="number" placeholder="0" min="0" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">SKU *</label>
              <Input placeholder="Auto-generated or custom" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Stock Quantity *</label>
              <Input type="number" placeholder="0" min="0" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Low Stock Alert</label>
              <Input type="number" placeholder="5" min="0" />
            </div>
          </div>
        </div>

        {/* Shipping */}
        <div className="bg-white rounded-xl border p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Shipping</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Weight (grams)</label>
              <Input type="number" placeholder="250" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Estimated Delivery</label>
              <Input placeholder="3-5 business days" />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white rounded-xl border p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Tags & SEO</h2>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Tags</label>
            <div className="flex gap-2 flex-wrap mb-2">
              {tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs">
                  {tag}
                  <button onClick={() => setTags(tags.filter(t => t !== tag))}>
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" variant="outline" onClick={addTag}>Add</Button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button type="submit" size="lg">Publish Product</Button>
          <Button type="button" variant="outline" size="lg">Save as Draft</Button>
        </div>
      </form>
    </div>
  );
}
