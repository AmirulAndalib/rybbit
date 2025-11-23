import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedTools } from "@/components/RelatedTools";
import { CTRCalculatorForm } from "./CTRCalculatorForm";
import { ToolCTA } from "../components/ToolCTA";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free CTR Calculator | Click-Through Rate Calculator for Marketing",
  description:
    "Calculate your click-through rate (CTR) and compare it to industry benchmarks. Free CTR calculator for email, PPC, organic search, and social media campaigns. Learn CTR formulas, industry standards, and how to improve your CTR.",
  keywords: [
    "CTR calculator",
    "click-through rate calculator",
    "ctr formula",
    "click through rate",
    "marketing metrics",
    "industry benchmarks",
    "CTR improvement",
    "ad performance",
    "conversion metrics",
    "marketing analytics",
  ],
  openGraph: {
    title: "Free CTR Calculator | Click-Through Rate Calculator for Marketing",
    description:
      "Calculate your CTR and see how your campaigns compare to industry benchmarks across email, PPC, organic search, and social media.",
    type: "website",
    url: "https://rybbit.com/tools/ctr-calculator",
    siteName: "Rybbit Documentation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free CTR Calculator | Click-Through Rate Calculator for Marketing",
    description:
      "Calculate your CTR and compare to industry benchmarks. Understand what's a good click-through rate for your channel.",
  },
  alternates: {
    canonical: "https://rybbit.com/tools/ctr-calculator",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://rybbit.com/tools/ctr-calculator#webapp",
      name: "CTR Calculator",
      description: "Free tool to calculate click-through rate and compare with industry benchmarks",
      url: "https://rybbit.com/tools/ctr-calculator",
      applicationCategory: "Utility",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: {
        "@type": "Organization",
        name: "Rybbit",
        url: "https://rybbit.io",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://rybbit.com/tools/ctr-calculator#faqpage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is CTR (Click-Through Rate)?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "CTR is the percentage of people who click on your ad or link after seeing it. It's calculated by dividing the number of clicks by the number of impressions and multiplying by 100. For example, if your ad was shown 10,000 times and received 300 clicks, your CTR is 3%.",
          },
        },
        {
          "@type": "Question",
          name: "What is a good CTR by channel?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Average CTRs vary significantly by channel. Search ads average 3.17%, email marketing 2.6%, e-commerce 2.69%, B2B 2.41%, social media 0.90%, and display ads 0.46%. Your target CTR should be benchmarked against your specific channel and industry.",
          },
        },
        {
          "@type": "Question",
          name: "How do I calculate CTR?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "To calculate CTR, use this formula: CTR = (Clicks / Impressions) × 100. For example, if your ad received 500 clicks from 50,000 impressions, your CTR would be (500 / 50,000) × 100 = 1%. Use our CTR calculator above to compute this automatically.",
          },
        },
        {
          "@type": "Question",
          name: "How can I improve my CTR?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "To improve CTR: write compelling ad copy with clear value propositions, use strong calls-to-action, improve audience targeting, test different headlines and creatives, ensure ad relevance to search intent, add ad extensions, and improve landing page relevance. Monitor results to identify what works best.",
          },
        },
        {
          "@type": "Question",
          name: "Why is my CTR different from competitor benchmarks?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "CTR varies based on industry, product type, audience quality, ad positioning, seasonal factors, and competition. Your CTR may legitimately differ from benchmarks due to your unique market position, business model, or targeting strategy. Focus on improving your own CTR over time rather than exactly matching benchmarks.",
          },
        },
      ],
    },
  ],
};

export default function CTRCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "CTR Calculator" }]}
          />
          {/* Header */}
          <div className="mb-16">
            <div className="inline-block mb-4 px-4 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-full">
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Free Tool</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-6 tracking-tight">
              CTR Calculator
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
              Calculate your click-through rate and compare it to industry benchmarks. See how your campaigns perform
              against the competition.
            </p>
          </div>

          {/* Interactive Form Component */}
          <CTRCalculatorForm />

          {/* Educational Content */}
          <div className="mb-16 prose prose-neutral dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              What is CTR (Click-Through Rate)?
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
              Click-Through Rate (CTR) is a key digital marketing metric that measures the percentage of people who
              click on your ad, email link, or search result after viewing it. It's one of the most important indicators
              of how well your marketing content resonates with your audience.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
              CTR is calculated by dividing the total number of clicks by the total number of impressions (times your
              content was shown) and multiplying by 100 to get a percentage. For example, if your ad was shown 10,000
              times and received 300 clicks, your CTR would be 3%.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
              Unlike vanity metrics that only measure visibility, CTR shows actual engagement—it tells you not just how
              many people saw your content, but how many were interested enough to take action.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 mt-8">Why Does CTR Matter?</h2>
            <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 mb-6">
              <li>
                <strong>Measure Marketing Effectiveness:</strong> CTR is a direct indicator of how well your ad copy,
                creative, and messaging are working. A higher CTR means your audience finds your message compelling and
                relevant, which is the first step toward conversions.
              </li>
              <li>
                <strong>Improve Campaign ROI:</strong> Higher CTRs mean more qualified traffic to your website or
                landing pages. More clicks lead to more conversion opportunities, which directly impacts your return on
                investment (ROI) for paid campaigns.
              </li>
              <li>
                <strong>Quality Score Impact:</strong> In Google Ads, CTR significantly impacts your Quality Score,
                which affects your ad rank and cost-per-click (CPC). Higher CTR can lead to better ad positions at lower
                costs, creating a positive feedback loop.
              </li>
              <li>
                <strong>Channel Performance Comparison:</strong> CTR allows you to compare performance across different
                marketing channels—email, PPC, organic search, social media—on a level playing field. This helps you
                identify which channels are most effective for your audience.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 mt-8">CTR Formula</h2>
            <p className="text-neutral-700 dark:text-neutral-300 mb-2">
              <code className="text-sm font-mono">CTR = (Clicks / Impressions) × 100</code>
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
              To calculate your CTR manually, divide the number of clicks by your total number of impressions, then
              multiply by 100 to express it as a percentage.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 mb-2">
              <strong>Example:</strong>
            </p>
            <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 mb-6">
              <li>Impressions: 50,000</li>
              <li>Clicks: 1,500</li>
              <li>CTR = (1,500 / 50,000) × 100 = 3%</li>
            </ul>

            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 mt-8">
              CTR Industry Benchmarks by Channel
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
              CTR varies significantly by marketing channel, industry, and audience type. Here are typical CTR
              benchmarks to help you understand what's good for your channel:
            </p>
            <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 mb-6">
              <li>
                <strong>Search Ads (Google Ads) - 3.17%:</strong> Search ads have the highest average CTR because users
                actively searched for keywords related to your business.
              </li>
              <li>
                <strong>Email Marketing - 2.6%:</strong> Email marketing performs well because subscribers have opted in
                and are receptive to your messages.
              </li>
              <li>
                <strong>E-commerce - 2.69%:</strong> E-commerce sites typically see good CTRs, especially for
                retargeting and product-specific campaigns.
              </li>
              <li>
                <strong>B2B - 2.41%:</strong> B2B campaigns see solid CTRs due to intent-based targeting and niche
                audiences.
              </li>
              <li>
                <strong>Social Media Ads - 0.90%:</strong> Social media ads have lower CTRs due to less commercial
                intent and higher audience distraction.
              </li>
              <li>
                <strong>Display Ads - 0.46%:</strong> Display ads have the lowest CTR because users didn't specifically
                search for your product or service.
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 mt-8">How to Improve Your CTR</h2>

          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3 mt-6">Optimize Ad Copy</h3>
          <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 mb-6">
            <li>Use clear, concise headlines that include relevant keywords</li>
            <li>Emphasize unique value propositions and differentiators</li>
            <li>Include numbers, statistics, or specific benefits</li>
            <li>Create urgency with words like "limited time," "exclusive," or "today"</li>
          </ul>

          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3 mt-6">
            Strong Calls-to-Action (CTAs)
          </h3>
          <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 mb-6">
            <li>Use action-oriented verbs: "Get," "Discover," "Learn," "Start"</li>
            <li>Make CTAs stand out visually with contrasting colors and clear buttons</li>
            <li>Test different CTA variations to find what resonates</li>
            <li>Be specific about what happens when they click</li>
          </ul>

          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3 mt-6">
            Improve Audience Targeting
          </h3>
          <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 mb-6">
            <li>Use detailed audience segmentation based on demographics, interests, and behavior</li>
            <li>Create separate ads for different audience segments</li>
            <li>Use lookalike audiences to find similar users to your best customers</li>
            <li>Exclude irrelevant audiences to improve ad relevance</li>
          </ul>

          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3 mt-6">A/B Testing</h3>
          <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 mb-6">
            <li>Test one variable at a time: headlines, images, CTAs, landing pages</li>
            <li>Run tests long enough to gather statistically significant data</li>
            <li>Implement winning variations and test new elements</li>
            <li>Document learnings to continuously improve performance</li>
          </ul>

          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3 mt-6">
            Ad Extensions (Google Ads)
          </h3>
          <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 mb-6">
            <li>Add sitelink extensions to showcase multiple offers or pages</li>
            <li>Use callout extensions to highlight unique benefits</li>
            <li>Include structured snippets for product categories or features</li>
            <li>Add call extensions to encourage phone inquiries</li>
          </ul>

          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3 mt-6">
            Landing Page Optimization
          </h3>
          <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 mb-6">
            <li>Ensure landing pages match ad messaging and keywords (ad relevance)</li>
            <li>Load fast and display properly on mobile devices</li>
            <li>Include clear, persuasive headlines that match the ad</li>
            <li>Remove distractions and focus on a single conversion goal</li>
          </ul>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Frequently Asked Questions</h2>
          <div className="bg-neutral-100/50 dark:bg-neutral-800/20 backdrop-blur-sm border border-neutral-300/50 dark:border-neutral-800/50 rounded-xl overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b border-neutral-300/50 dark:border-neutral-800/50">
                <AccordionTrigger className="px-6 py-4 text-base font-medium hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
                  What is CTR (Click-Through Rate)?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-neutral-700 dark:text-neutral-300">
                  CTR is the percentage of people who click on your ad or link after seeing it. It's calculated by
                  dividing the number of clicks by the number of impressions and multiplying by 100. For example, if
                  your ad was shown 10,000 times and received 300 clicks, your CTR is 3%.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-b border-neutral-300/50 dark:border-neutral-800/50">
                <AccordionTrigger className="px-6 py-4 text-base font-medium hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
                  What is a good CTR?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-neutral-700 dark:text-neutral-300">
                  A "good" CTR varies by industry and channel. Search ads average 3.17%, email marketing 2.6%,
                  e-commerce 2.69%, B2B 2.41%, social media 0.90%, and display ads 0.46%. Use the benchmarks above to
                  compare your performance, but also track your own improvement over time.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-b border-neutral-300/50 dark:border-neutral-800/50">
                <AccordionTrigger className="px-6 py-4 text-base font-medium hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
                  How can I improve my CTR?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-neutral-700 dark:text-neutral-300">
                  To improve CTR, focus on: writing compelling ad copy with clear value propositions, using strong
                  calls-to-action, targeting the right audience, testing different creatives and headlines, ensuring ad
                  relevance to search intent, and using ad extensions. Track your results with{" "}
                  <Link href="https://app.rybbit.io" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                    Rybbit Analytics
                  </Link>{" "}
                  to see what works best.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-b border-neutral-300/50 dark:border-neutral-800/50">
                <AccordionTrigger className="px-6 py-4 text-base font-medium hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
                  Does a higher CTR always mean better campaign performance?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-neutral-700 dark:text-neutral-300">
                  Not necessarily. While CTR measures clicks, your ultimate goal is conversions and ROI. A high CTR
                  means people are interested, but if they don't convert, it may indicate issues with your landing page,
                  offer, or funnel. Always track CTR alongside conversion rate and ROI.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="px-6 py-4 text-base font-medium hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
                  How do I reduce my CTR if it's too high?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-neutral-700 dark:text-neutral-300">
                  If your CTR is high but conversions are low, it may be time to adjust your targeting to attract more
                  qualified users or improve your landing page to convert more of your traffic. A very high CTR can also
                  indicate low quality clicks or click fraud—monitor your campaign closely for suspicious patterns.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <RelatedTools currentToolHref="/tools/ctr-calculator" category="analytics" />
      </div>

      <ToolCTA
        title="Track your campaign performance with Rybbit"
        description="Monitor CTR, conversions, and other key metrics in real-time."
        eventLocation="ctr_calculator_cta"
      />
    </>
  );
}
