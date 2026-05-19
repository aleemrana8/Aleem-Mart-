import { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aleemmart.com';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'product' | 'article';
  price?: number;
  currency?: string;
  availability?: 'in stock' | 'out of stock';
}

export function generateSEO({
  title = 'Aleem Mart - Smart Choices. Better Living.',
  description = 'Pakistan\'s leading multi-vendor marketplace. Shop electronics, fashion, home goods from 100+ verified sellers. Free delivery, secure payments, easy returns.',
  keywords = ['ecommerce', 'marketplace', 'shopping', 'pakistan', 'online shopping', 'electronics', 'fashion', 'aleem mart'],
  image = `${BASE_URL}/og-image.png`,
  url = BASE_URL,
  type = 'website',
  price,
  currency = 'PKR',
  availability,
}: SEOProps = {}): Metadata {
  const fullTitle = title.includes('Aleem Mart') ? title : `${title} | Aleem Mart`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: 'Aleem Mart' }],
    creator: 'Aleem Mart',
    publisher: 'Aleem Mart',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: type === 'product' ? 'website' : type,
      locale: 'en_PK',
      url,
      title: fullTitle,
      description,
      siteName: 'Aleem Mart',
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
    other: {
      ...(price && { 'product:price:amount': String(price) }),
      ...(currency && price && { 'product:price:currency': currency }),
      ...(availability && { 'product:availability': availability }),
    },
  };
}

// Structured Data (JSON-LD) for rich snippets
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Aleem Mart',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.svg`,
    description: 'Pakistan\'s leading multi-vendor marketplace',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+92-315-1664843',
      contactType: 'customer service',
      email: 'raleem811811@gmail.com',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Hostel City Park Road',
      addressLocality: 'Islamabad',
      addressCountry: 'PK',
    },
    sameAs: [],
  };
}

export function generateProductSchema(product: {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  rating?: number;
  reviewCount?: number;
  availability?: boolean;
  seller?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency || 'PKR',
      availability: product.availability !== false ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: product.seller ? { '@type': 'Organization', name: product.seller } : undefined,
    },
    ...(product.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviewCount || 0,
      },
    }),
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}
