import { ShieldCheck, Truck, RefreshCcw, Headphones, CreditCard } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Secure Checkout',
    description: 'All transactions are encrypted and secure',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Free delivery on orders above Rs. 5,000',
  },
  {
    icon: RefreshCcw,
    title: 'Easy Returns',
    description: '7-day hassle-free return policy',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round the clock customer assistance',
  },
  {
    icon: CreditCard,
    title: 'Multiple Payments',
    description: 'Card, COD, JazzCash, Easypaisa',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Why Choose Aleem Mart?</h2>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            We&apos;re committed to providing the best shopping experience with trusted sellers and quality products
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="text-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition">
                <div className="inline-flex p-3 bg-primary/10 rounded-xl mb-4">
                  <Icon size={28} className="text-primary" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">{feature.title}</h3>
                <p className="text-xs text-gray-500">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
