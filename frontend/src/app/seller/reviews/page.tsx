'use client';

import { Star, MessageSquare, ThumbsUp } from 'lucide-react';

const reviews = [
  {
    id: '1', product: 'Wireless Earbuds Pro X100', customer: 'Ali Hassan', rating: 5,
    comment: 'Excellent sound quality! Battery life is amazing. Best purchase this year.',
    date: '2024-01-14', replied: true, reply: 'Thank you! Glad you love them!',
  },
  {
    id: '2', product: 'Bluetooth Speaker Mini', customer: 'Sara Khan', rating: 4,
    comment: 'Good sound for the price. Wish it was a bit louder but overall satisfied.',
    date: '2024-01-13', replied: false, reply: '',
  },
  {
    id: '3', product: 'USB-C Hub 7-in-1', customer: 'Usman Ahmed', rating: 3,
    comment: 'Works fine but gets warm during use. Ports are tight initially.',
    date: '2024-01-12', replied: true, reply: 'Thanks for the feedback. The warmth is normal for USB-C hubs. Ports will loosen with use.',
  },
  {
    id: '4', product: 'Laptop Stand Adjustable', customer: 'Fatima Noor', rating: 5,
    comment: 'Perfect for work from home setup. Very sturdy and looks premium.',
    date: '2024-01-11', replied: false, reply: '',
  },
  {
    id: '5', product: 'Wireless Earbuds Pro X100', customer: 'Hassan Ali', rating: 2,
    comment: 'Left earbud stopped working after 2 weeks. Disappointed.',
    date: '2024-01-10', replied: true, reply: 'Sorry to hear that! Please contact our support for a free replacement under warranty.',
  },
];

export default function SellerReviewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
        <p className="text-gray-500">Manage customer reviews and respond to feedback</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Average Rating', value: '4.7', icon: Star },
          { label: 'Total Reviews', value: '234', icon: MessageSquare },
          { label: 'Positive (4-5★)', value: '89%', icon: ThumbsUp },
          { label: 'Needs Reply', value: '12', icon: MessageSquare },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl border p-4 text-center">
              <Icon size={18} className="mx-auto text-gray-400 mb-2" />
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl border p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-gray-900">{review.product}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={14}
                        className={star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">by {review.customer}</span>
                  <span className="text-xs text-gray-400">{review.date}</span>
                </div>
              </div>
              {review.replied ? (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Replied</span>
              ) : (
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Needs Reply</span>
              )}
            </div>

            <p className="text-sm text-gray-700 mt-3">{review.comment}</p>

            {review.replied && review.reply && (
              <div className="mt-3 pl-4 border-l-2 border-primary/30 bg-gray-50 p-3 rounded-r-lg">
                <p className="text-xs font-medium text-primary mb-1">Your Reply:</p>
                <p className="text-sm text-gray-600">{review.reply}</p>
              </div>
            )}

            {!review.replied && (
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Write a reply..."
                  className="flex-1 border rounded-lg px-3 py-2 text-sm"
                />
                <button className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 transition">
                  Reply
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
