import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedTools } from "@/components/RelatedTools";
import { PageSpeedForm } from "./PageSpeedForm";

export const metadata: Metadata = {
  title: "Free Page Speed Calculator | Website Load Time Impact Calculator",
  description:
    "Calculate how page load time affects your conversions and revenue. See the real cost of a slow website. Use our free page speed impact calculator to understand performance metrics.",
  keywords: [
    "page speed calculator",
    "website speed test",
    "page load time",
    "conversion rate",
    "Core Web Vitals",
    "page speed optimization",
    "website performance",
    "load time impact",
  ],
  openGraph: {
    title: "Free Page Speed Calculator | Website Load Time Impact Calculator",
    description:
      "Calculate how page load time affects your conversions and revenue. See the real cost of a slow website.",
    type: "website",
    url: "https://rybbit.io/tools/page-speed-calculator",
    siteName: "Rybbit",
    images: [
      {
        url: "https://rybbit.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "Page Speed Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Page Speed Calculator | Website Load Time Impact Calculator",
    description: "Calculate how page load time affects your conversions and revenue.",
    images: ["https://rybbit.io/og-image.png"],
  },
  alternates: {
    canonical: "https://rybbit.io/tools/page-speed-calculator",
  },
};

export default function PageSpeedCalculatorPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Page Speed Impact Calculator",
        description:
          "Calculate how page load time affects your conversions and revenue. See the real cost of a slow website.",
        url: "https://rybbit.io/tools/page-speed-calculator",
        applicationCategory: "WebApplication",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        creator: {
          "@type": "Organization",
          name: "Rybbit",
          url: "https://rybbit.io",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How much does page speed really matter?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Studies show that for every 1 second delay in page load time, conversions decrease by approximately 7%, bounce rate increases by 7%, and customer satisfaction drops by 16%. A 2-second delay can result in abandonment rates up to 87% for e-commerce sites.",
            },
          },
          {
            "@type": "Question",
            name: "What are Google Core Web Vitals and why are they important?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Google Core Web Vitals are three key metrics that measure user experience: Largest Contentful Paint (LCP, visual loading speed), First Input Delay (FID, responsiveness), and Cumulative Layout Shift (CLS, visual stability). Google uses these metrics as ranking factors in search results, making them essential for SEO.",
            },
          },
          {
            "@type": "Question",
            name: "What's a good page load time?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Google recommends pages load in under 3 seconds on mobile. However, the faster the better—pages that load in under 1 second see significantly higher engagement. Amazon found that every 100ms improvement in load time increased revenue by 1%.",
            },
          },
          {
            "@type": "Question",
            name: "What are the best ways to improve page speed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Key improvements include: optimizing images, minifying CSS/JS files, enabling browser caching, using a Content Delivery Network, reducing server response time, eliminating render-blocking resources, and choosing lightweight analytics tools.",
            },
          },
          {
            "@type": "Question",
            name: "How can analytics tools affect my page speed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Many analytics tools can significantly impact page performance by loading large scripts synchronously and making blocking network requests. Tools like Rybbit are designed to minimize this impact with lightweight asynchronous loading.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="max-w-4xl mx-auto px-6 py-20">
        <Breadcrumbs items={[{label: "Home", href: "/"}, {label: "Tools", href: "/tools"}, {label: "Page Speed Calculator"}]} />
        {/* Header */}
        <div className="mb-16">
          <div className="inline-block mb-4 px-4 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-full">
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Free Tool</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-6 tracking-tight">
            Page Speed Impact Calculator
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
            Calculate how page load time affects your conversions and revenue. See the real cost of a slow website.
          </p>
        </div>

        {/* Educational Content */}
        <div className="mb-16 prose prose-neutral dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">Why Page Speed Matters</h2>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
            Page speed is one of the most critical factors affecting user experience and business metrics. Every
            millisecond counts—slow-loading pages lead to higher bounce rates, reduced engagement, and ultimately lost
            revenue.
          </p>
          <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 mb-6">
            <li>
              <strong>Impact on Conversions:</strong> Research shows a direct correlation: every 1-second delay in page
              load time results in approximately 7% loss in conversions. For e-commerce sites, this translates to
              thousands of dollars in lost revenue monthly.
            </li>
            <li>
              <strong>Google Core Web Vitals:</strong> Google uses Core Web Vitals as ranking factors. Sites with poor
              page speed are penalized in search results, reducing organic visibility. LCP, FID, and CLS are critical
              metrics to monitor and optimize.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 mt-8">
            Page Speed Optimization Techniques
          </h2>
          <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 mb-6">
            <li>
              <strong>Image Optimization:</strong> Compress images, use modern formats (WebP), and implement lazy
              loading for below-the-fold content.
            </li>
            <li>
              <strong>Asset Minification:</strong> Minify CSS and JavaScript files to reduce file sizes and improve load
              times.
            </li>
            <li>
              <strong>Caching Strategy:</strong> Enable browser caching and implement server-side caching to serve
              content faster.
            </li>
            <li>
              <strong>Content Delivery:</strong> Use a CDN to serve content from servers geographically closer to your
              users.
            </li>
            <li>
              <strong>Tool Selection:</strong> Choose lightweight tools like Rybbit (3KB) instead of heavyweight
              analytics solutions that slow down your site.
            </li>
          </ul>
        </div>

        {/* Interactive Calculator Component */}
        <PageSpeedForm />
        <RelatedTools currentToolHref="/tools/page-speed-calculator" category="analytics" />
      </div>
    </div>
  );
}
