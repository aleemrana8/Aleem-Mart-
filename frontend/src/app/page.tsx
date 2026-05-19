import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { BestSellers } from '@/components/home/BestSellers';
import { NewArrivals } from '@/components/home/NewArrivals';
import { FlashSale } from '@/components/home/FlashSale';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { Newsletter } from '@/components/home/Newsletter';
import { AIRecommendations } from '@/components/home/AIRecommendations';
import { TrendingNow } from '@/components/home/TrendingNow';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CategoryGrid />
        <AIRecommendations />
        <FlashSale />
        <TrendingNow />
        <BestSellers />
        <NewArrivals />
        <WhyChooseUs />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
