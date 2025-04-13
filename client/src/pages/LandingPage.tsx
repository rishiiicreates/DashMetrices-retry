import { Link } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Header */}
      <header className="bg-white dark:bg-dark-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/">
              <a className="flex items-center">
                <div className="h-8 w-8 rounded-md bg-primary-600 flex items-center justify-center">
                  <i className="ri-bar-chart-box-line text-white text-xl"></i>
                </div>
                <h1 className="ml-2 text-xl font-bold text-gray-900 dark:text-white">DashMetrics</h1>
              </a>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Features</a>
              <Link href="/pricing">
                <a className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Pricing</a>
              </Link>
              <a href="#testimonials" className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Testimonials</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-border"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                <i className={`${theme === 'dark' ? 'ri-moon-line' : 'ri-sun-line'} text-xl`}></i>
              </button>
              
              <div className="hidden md:flex space-x-3">
                <Link href="/login">
                  <a className="px-4 py-2 rounded-lg border border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
                    Login
                  </a>
                </Link>
                <Link href="/signup">
                  <a className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium">
                    Sign up free
                  </a>
                </Link>
              </div>
              
              <button className="md:hidden p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-border">
                <i className="ri-menu-line text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 md:pt-24 pb-16 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Track your social media <span className="text-primary-600 dark:text-primary-400">performance</span> in one place
              </h1>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                DashMetrics helps you analyze and optimize your social media presence across Instagram, YouTube, Twitter, and Facebook with powerful analytics.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/signup">
                  <a className="inline-flex justify-center items-center px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-base font-medium shadow-sm transition-colors">
                    Get started for free
                    <i className="ri-arrow-right-line ml-2"></i>
                  </a>
                </Link>
                <a href="#features" className="inline-flex justify-center items-center px-6 py-3 rounded-lg bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 text-base font-medium shadow-sm transition-colors">
                  Learn more
                </a>
              </div>
              <div className="mt-8 flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`h-8 w-8 rounded-full bg-gray-${200 + (i * 100)} dark:bg-gray-${700 - (i * 100)} flex items-center justify-center text-xs text-white`}>
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p className="ml-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold text-gray-900 dark:text-white">5,000+</span> marketers trust DashMetrics
                </p>
              </div>
            </div>
            <div className="hidden md:block rounded-xl shadow-xl bg-white dark:bg-dark-card overflow-hidden transform rotate-1">
              <div className="p-1 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-xl">
                <div className="bg-white dark:bg-dark-card p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Performance Overview</h3>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium">
                        Followers
                      </span>
                    </div>
                  </div>
                  <div className="h-48 relative">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div 
                        key={i} 
                        className="chart-bar absolute" 
                        style={{
                          left: `${4 + (i * 10)}%`, 
                          height: `${Math.floor(60 + Math.random() * 35)}%`,
                          backgroundColor: theme === 'dark' ? '#60A5FA' : '#3B82F6',
                          width: '8%',
                          borderRadius: '4px 4px 0 0'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-24 right-0 left-0 h-40 bg-gradient-to-t from-gray-50 to-transparent dark:from-dark-bg dark:to-transparent"></div>
      </section>

      {/* Trusted by Section */}
      <section className="py-16 bg-gray-50 dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Trusted by brands worldwide</p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
            {["ri-facebook-fill", "ri-twitter-fill", "ri-instagram-line", "ri-youtube-fill", "ri-linkedin-fill"].map((icon, index) => (
              <div key={index} className="flex items-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                <i className={`${icon} text-4xl text-gray-400 dark:text-gray-500`}></i>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-dark-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Everything you need for social media analytics</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
              Track all your social media metrics in one place and make data-driven decisions to grow your online presence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="p-6 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-card shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mb-5">
                <i className="ri-line-chart-line text-primary-600 dark:text-primary-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Comprehensive Analytics
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track followers, engagement, reach, and content performance across all major social platforms.
              </p>
            </div>
            
            <div className="p-6 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-card shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-secondary-50 dark:bg-secondary-900/20 flex items-center justify-center mb-5">
                <i className="ri-dashboard-line text-secondary-600 dark:text-secondary-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Custom Dashboards
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create personalized dashboards to focus on the metrics that matter most to your business.
              </p>
            </div>
            
            <div className="p-6 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-card shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-accent-50 dark:bg-accent-900/20 flex items-center justify-center mb-5">
                <i className="ri-bookmark-line text-accent-600 dark:text-accent-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Saved Content
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Bookmark profiles and posts to revisit later and keep track of your competitors.
              </p>
            </div>
            
            <div className="p-6 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-card shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center mb-5">
                <i className="ri-file-chart-line text-green-600 dark:text-green-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Detailed Reports
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Generate comprehensive reports with beautiful visualizations to share with your team.
              </p>
            </div>
            
            <div className="p-6 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-card shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center mb-5">
                <i className="ri-team-line text-purple-600 dark:text-purple-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Team Collaboration
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Work together with your team members with shared dashboards and reporting.
              </p>
            </div>
            
            <div className="p-6 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-card shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-5">
                <i className="ri-notification-3-line text-red-600 dark:text-red-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Smart Alerts
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get notified about important changes in your metrics and never miss a trend.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Platforms Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">All your social platforms in one place</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
              Analyze all your social media metrics in a single dashboard with comprehensive insights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6 border border-gray-200 dark:border-dark-border">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                  <i className="ri-instagram-line text-blue-600 dark:text-blue-400 text-2xl"></i>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Instagram Analytics</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Track followers, engagement, and content performance</p>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <i className="ri-check-line text-green-500 mr-3"></i>
                  <span>Follower growth tracking</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <i className="ri-check-line text-green-500 mr-3"></i>
                  <span>Post engagement analysis</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <i className="ri-check-line text-green-500 mr-3"></i>
                  <span>Stories and Reels analytics</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <i className="ri-check-line text-green-500 mr-3"></i>
                  <span>Audience demographics</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6 border border-gray-200 dark:border-dark-border">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                  <i className="ri-youtube-line text-red-600 dark:text-red-400 text-2xl"></i>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">YouTube Analytics</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Monitor subscribers, video performance, and watch time</p>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <i className="ri-check-line text-green-500 mr-3"></i>
                  <span>Subscriber growth analysis</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <i className="ri-check-line text-green-500 mr-3"></i>
                  <span>Video performance metrics</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <i className="ri-check-line text-green-500 mr-3"></i>
                  <span>Watch time and retention data</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <i className="ri-check-line text-green-500 mr-3"></i>
                  <span>Revenue and monetization tracking</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6 border border-gray-200 dark:border-dark-border">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                  <i className="ri-twitter-x-line text-blue-600 dark:text-blue-400 text-2xl"></i>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Twitter Analytics</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Analyze followers, engagement, and tweet performance</p>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <i className="ri-check-line text-green-500 mr-3"></i>
                  <span>Follower growth trends</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <i className="ri-check-line text-green-500 mr-3"></i>
                  <span>Tweet engagement metrics</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <i className="ri-check-line text-green-500 mr-3"></i>
                  <span>Hashtag performance</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <i className="ri-check-line text-green-500 mr-3"></i>
                  <span>Audience insights</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6 border border-gray-200 dark:border-dark-border">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                  <i className="ri-facebook-circle-line text-blue-600 dark:text-blue-400 text-2xl"></i>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Facebook Analytics</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Monitor page likes, engagement, and post reach</p>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <i className="ri-check-line text-green-500 mr-3"></i>
                  <span>Page growth tracking</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <i className="ri-check-line text-green-500 mr-3"></i>
                  <span>Post engagement analysis</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <i className="ri-check-line text-green-500 mr-3"></i>
                  <span>Content reach and impressions</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <i className="ri-check-line text-green-500 mr-3"></i>
                  <span>Audience demographics</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white dark:bg-dark-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Loved by marketers worldwide</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
              See what our customers have to say about their experience with DashMetrics.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-6 border border-gray-100 dark:border-gray-800">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i key={star} className="ri-star-fill text-yellow-400 text-lg"></i>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                "DashMetrics has transformed how we monitor our social media performance. The comprehensive analytics and beautiful dashboards make it easy to track our growth."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-700 dark:text-primary-300 font-medium">
                  JD
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Jennifer Davis</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Marketing Director, TechCorp</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-6 border border-gray-100 dark:border-gray-800">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i key={star} className="ri-star-fill text-yellow-400 text-lg"></i>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                "As a content creator, I need to understand my audience across multiple platforms. DashMetrics gives me all the data I need in one place, saving me hours of work."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-700 dark:text-primary-300 font-medium">
                  MR
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Michael Rodriguez</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Content Creator</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-6 border border-gray-100 dark:border-gray-800">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i key={star} className="ri-star-fill text-yellow-400 text-lg"></i>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                "The team collaboration features are game-changing. Our entire social media department can now work together with the same data and insights, improving our strategy."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-700 dark:text-primary-300 font-medium">
                  SP
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Sarah Patel</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Social Media Manager, BrandGrowth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 dark:bg-primary-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to transform your social media analytics?</h2>
          <p className="text-xl text-primary-100 mb-10 max-w-3xl mx-auto">
            Get started today with our 14-day free trial. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/signup">
              <a className="inline-flex justify-center items-center px-8 py-4 rounded-lg bg-white hover:bg-gray-100 text-primary-600 text-lg font-medium shadow-lg transition-colors">
                Start your free trial
              </a>
            </Link>
            <Link href="/pricing">
              <a className="inline-flex justify-center items-center px-8 py-4 rounded-lg bg-transparent hover:bg-primary-700 border-2 border-white text-white text-lg font-medium transition-colors">
                View pricing
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-dark-card py-12 border-t border-gray-200 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-md bg-primary-600 flex items-center justify-center">
                  <i className="ri-bar-chart-box-line text-white text-xl"></i>
                </div>
                <h1 className="ml-2 text-xl font-bold text-gray-900 dark:text-white">DashMetrics</h1>
              </div>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Powerful social media analytics for marketers, content creators, and businesses of all sizes.
              </p>
              <div className="mt-6 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                  <i className="ri-twitter-x-line text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                  <i className="ri-facebook-circle-line text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                  <i className="ri-instagram-line text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                  <i className="ri-linkedin-fill text-xl"></i>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Product
              </h3>
              <ul className="space-y-3">
                <li><a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Features</a></li>
                <li><Link href="/pricing"><a className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Pricing</a></Link></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Integrations</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Updates</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Tutorials</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Legal
              </h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Terms</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Cookies</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 border-t border-gray-200 dark:border-dark-border pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2023 DashMetrics. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
