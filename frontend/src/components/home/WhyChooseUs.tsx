import { ShieldCheck, Truck, RefreshCcw, Headphones, CreditCard } from 'lucide-react';

const features = [
  { icon: ShieldCheck, title: 'Secure Checkout', description: 'Encrypted & secure transactions' },
  { icon: Truck, title: 'Fast Delivery', description: 'Free on orders above Rs. 5,000' },
  { icon: RefreshCcw, title: 'Easy Returns', description: '7-day hassle-free policy' },
  { icon: Headphones, title: '24/7 Support', description: 'Round the clock assistance' },
  { icon: CreditCard, title: 'Multiple Payments', description: 'Card, COD, JazzCash, Easypaisa' },
];

export function WhyChooseUs() {
  return (
    <section className="py-14">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Why Choose Aleem Mart?</h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
            Best shopping experience with trusted sellers and quality products
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="text-center p-5 rounded-2xl border border-border/50 hover:shadow-card-hover transition-all duration-300">
                <div className="inline-flex p-3 bg-primary/10 rounded-xl mb-3">
                  <Icon size={22} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1 text-sm">{feature.title}</h3>
                <p className="text-[11px] text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
