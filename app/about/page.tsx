"use client";

import { MarketingPageLayout } from '@/components/marketing/page-layout';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

export default function AboutPage() {
  // Team members
  const teamMembers = [
    {
      name: 'Alex Thompson',
      role: 'Founder & CEO',
      image: '/avatar-dv.png', // Using existing avatar as placeholder
      bio: 'Former sports analyst and ML researcher with 10+ years experience in sports betting markets.',
    },
    {
      name: 'Dr. Maya Patel',
      role: 'Chief Data Scientist',
      image: '/avatar-dv.png', // Using existing avatar as placeholder
      bio: 'PhD in Statistical Learning with expertise in predictive modeling and neural networks.',
    },
    {
      name: 'James Wilson',
      role: 'Head of Sports Research',
      image: '/avatar-dv.png', // Using existing avatar as placeholder
      bio: 'Ex-professional sports scout with deep expertise in game strategy and player performance.',
    },
  ];

  return (
    <MarketingPageLayout
      title="About The Pick"
      subtitle="Revolutionizing sports betting through AI and data science"
    >
      {/* Our Story Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-3">
            <p className="mb-4">
              The Pick was founded in 2022 by a team of data scientists, sports analysts, and tech entrepreneurs with a shared vision: to bring clarity and intelligence to the world of sports betting.
            </p>
            <p className="mb-4">
              We recognized that while sports betting was becoming more accessible, the tools and resources available to bettors hadn't evolved at the same pace. Most bettors were still making decisions based on gut feeling, basic statistics, or following &quot;expert&quot; picks without understanding the methodology behind them.
            </p>
            <p>
              We set out to change that by building a sophisticated AI platform that could analyze vast amounts of data in real-time, identify value opportunities, and deliver actionable insights directly to bettors. Our mission wasn't just to pick winners, but to empower bettors with the tools and knowledge to make more informed decisions.
            </p>
          </div>
          <div className="md:col-span-2 flex justify-center">
            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
              <Image
                src="/og-image.png"
                alt="The Pick team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Technology Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Technology</h2>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">AI-Powered Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our proprietary machine learning algorithms analyze thousands of data points in real-time, including team performance, player statistics, historical matchups, weather conditions, and even betting market movements.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Value Identification</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Beyond just predicting outcomes, our system excels at identifying value bets — opportunities where the bookmakers' odds don't accurately reflect the true probability of an event.
              </p>
            </div>
          </div>
        </div>
        <p className="mb-4">
          What sets The Pick apart is not just the sophistication of our models, but our commitment to transparency. We don't just tell you what to bet on; we explain why our AI sees value in a particular bet and provide the insights that drove that recommendation.
        </p>
        <p>
          Our AI models are continuously learning and improving. After each game, our system analyzes what went right or wrong, adjusts its parameters, and gets smarter for the next prediction. This cycle of prediction, analysis, and refinement is what allows us to maintain our industry-leading win rate.
        </p>
      </section>

      {/* Our Team Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Team</h2>
        <p className="mb-8">
          The Pick is powered by a diverse team of experts from the worlds of sports, data science, and technology. Our team brings together decades of combined experience in their respective fields, united by a passion for sports and a commitment to excellence.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="p-1">
                <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-sm text-orange-500 mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{member.bio}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Our Values Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Transparency</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We believe in complete openness about our methodology, results, and limitations. Our win/loss record is public, and we provide detailed explanations for every pick.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Innovation</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We're constantly pushing the boundaries of what's possible in sports prediction, investing heavily in R&D to improve our models and deliver better results.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Responsible Betting</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We promote a responsible approach to sports betting, emphasizing bankroll management, value-based betting, and viewing betting as entertainment, not a guaranteed source of income.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Join Our Winning Team
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
          Experience the power of AI-driven sports betting insights. Join thousands of winning bettors who trust The Pick for their sports predictions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md">
            Get Started
          </button>
          <button className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-md">
            View Pricing
          </button>
        </div>
      </div>
    </MarketingPageLayout>
  );
}
