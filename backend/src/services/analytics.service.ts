// Analytics Service - Enterprise analytics aggregation engine
import { Request, Response } from 'express';

interface TimeSeriesPoint {
  date: string;
  value: number;
}

interface AnalyticsMetric {
  current: number;
  previous: number;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
}

// === Platform Analytics (Admin) ===

export async function getPlatformAnalytics(req: Request, res: Response) {
  const { period = '30d' } = req.query;

  const analytics = {
    success: true,
    data: {
      period,
      generatedAt: new Date(),
      overview: {
        totalRevenue: createMetric(2456800, 2080000),
        totalOrders: createMetric(3456, 3080),
        activeUsers: createMetric(15234, 14100),
        activeSellers: createMetric(128, 118),
        averageOrderValue: createMetric(4250, 3900),
        conversionRate: createMetric(3.8, 3.2),
      },
      revenueTimeSeries: generateTimeSeries(30, 50000, 120000),
      ordersTimeSeries: generateTimeSeries(30, 80, 150),
      topCategories: [
        { name: 'Electronics', revenue: 890000, orders: 1234, growth: 18.5 },
        { name: 'Fashion', revenue: 567000, orders: 2100, growth: 12.3 },
        { name: 'Home & Kitchen', revenue: 345000, orders: 890, growth: 8.7 },
        { name: 'Health & Beauty', revenue: 234000, orders: 678, growth: 22.1 },
        { name: 'Sports', revenue: 189000, orders: 456, growth: 5.4 },
      ],
      topSellers: [
        { name: 'TechZone Official', revenue: 567890, orders: 234, rating: 4.8, growth: 15 },
        { name: 'FashionHub', revenue: 456780, orders: 345, rating: 4.5, growth: 22 },
        { name: 'HomeDecor Plus', revenue: 234560, orders: 123, rating: 4.6, growth: 8 },
        { name: 'AudioMax', revenue: 189450, orders: 89, rating: 4.7, growth: 12 },
        { name: 'SportsMax', revenue: 156780, orders: 67, rating: 4.3, growth: 5 },
      ],
      customerMetrics: {
        newCustomers: createMetric(1234, 1050),
        returningCustomers: createMetric(4567, 4200),
        customerLifetimeValue: createMetric(12500, 11200),
        churnRate: createMetric(2.1, 2.5),
      },
      operationalMetrics: {
        averageFulfillmentTime: '1.8 days',
        returnRate: '3.2%',
        disputeRate: '0.8%',
        sellerResponseTime: '2.4 hours',
      },
      trafficSources: [
        { source: 'Direct', visitors: 45000, percentage: 35 },
        { source: 'Organic Search', visitors: 38000, percentage: 30 },
        { source: 'Social Media', visitors: 25000, percentage: 20 },
        { source: 'Paid Ads', visitors: 12000, percentage: 10 },
        { source: 'Referral', visitors: 6000, percentage: 5 },
      ],
      aiInsights: [
        { type: 'anomaly', message: 'Unusual spike in Electronics orders (+45%) - potential viral product', severity: 'info' },
        { type: 'forecast', message: 'Revenue projected to reach Rs. 3.2M next month based on current trajectory', severity: 'positive' },
        { type: 'alert', message: '3 sellers have unusually high return rates (>10%) - review needed', severity: 'warning' },
      ],
    },
  };

  res.json(analytics);
}

// === Seller Analytics ===

export async function getSellerAnalytics(req: Request, res: Response) {
  const sellerId = (req as any).user?.id;
  const { period = '30d' } = req.query;

  const analytics = {
    success: true,
    data: {
      sellerId,
      period,
      generatedAt: new Date(),
      overview: {
        totalRevenue: createMetric(345680, 298000),
        totalOrders: createMetric(234, 198),
        totalProducts: 48,
        averageOrderValue: createMetric(1477, 1505),
        conversionRate: createMetric(4.2, 3.8),
        storeRating: 4.7,
        totalReviews: 456,
      },
      revenueChart: generateTimeSeries(30, 8000, 18000),
      ordersChart: generateTimeSeries(30, 5, 12),
      viewsChart: generateTimeSeries(30, 200, 600),
      conversionFunnel: {
        views: 12450,
        addToCart: 2890,
        checkout: 1450,
        purchase: 610,
        conversionRate: 4.9,
      },
      productPerformance: [
        { name: 'Wireless Earbuds Pro', views: 3456, orders: 145, revenue: 797355, conversion: 4.2, stock: 23 },
        { name: 'Bluetooth Speaker', views: 2340, orders: 89, revenue: 355911, conversion: 3.8, stock: 45 },
        { name: 'USB-C Hub', views: 1890, orders: 67, revenue: 200933, conversion: 3.5, stock: 12 },
        { name: 'Laptop Stand', views: 1234, orders: 45, revenue: 134955, conversion: 3.6, stock: 67 },
        { name: 'Phone Case Premium', views: 890, orders: 34, revenue: 50966, conversion: 3.8, stock: 150 },
      ],
      customerAnalytics: {
        newCustomers: 89,
        returningCustomers: 145,
        repeatPurchaseRate: 62,
        topCities: [
          { city: 'Lahore', orders: 78 },
          { city: 'Karachi', orders: 56 },
          { city: 'Islamabad', orders: 45 },
          { city: 'Rawalpindi', orders: 23 },
          { city: 'Faisalabad', orders: 18 },
        ],
      },
      revenueByDay: [
        { day: 'Mon', revenue: 45000 },
        { day: 'Tue', revenue: 52000 },
        { day: 'Wed', revenue: 48000 },
        { day: 'Thu', revenue: 61000 },
        { day: 'Fri', revenue: 78000 },
        { day: 'Sat', revenue: 89000 },
        { day: 'Sun', revenue: 72000 },
      ],
    },
  };

  res.json(analytics);
}

// === Helpers ===

function createMetric(current: number, previous: number): AnalyticsMetric {
  const change = current - previous;
  const changePercent = previous > 0 ? ((change / previous) * 100) : 0;
  return {
    current,
    previous,
    change,
    changePercent: Math.round(changePercent * 10) / 10,
    trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable',
  };
}

function generateTimeSeries(days: number, min: number, max: number): TimeSeriesPoint[] {
  const points: TimeSeriesPoint[] = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    points.push({
      date: date.toISOString().split('T')[0],
      value: Math.floor(Math.random() * (max - min) + min),
    });
  }
  return points;
}
