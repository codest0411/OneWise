'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Check, X } from 'lucide-react'

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    })
  }, [])

  return (
    <div className="relative overflow-hidden bg-slate-950 text-white min-h-screen">
      {/* Transparent Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <div className="relative">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-center mt-1">
                    <div className="w-2 h-6 bg-blue-600 rounded-sm"></div>
                  </div>
                </div>
              </div>
              <span className="text-2xl font-bold">
                <span className="text-blue-600">One</span><span className="text-orange-500">Wise</span>
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#features" className="text-white/70 hover:text-white transition">Features</Link>
              <Link href="/#how-it-works" className="text-white/70 hover:text-white transition">How It Works</Link>
              <Link href="/#testimonials" className="text-white/70 hover:text-white transition">Testimonials</Link>
              <Link href="/pricing" className="text-white transition">Pricing</Link>
              <Link href="/contact" className="text-white/70 hover:text-white transition">Contact</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/#get-started" className="text-white/70 hover:text-white transition">
                Login
              </Link>
              <Link 
                href="/#get-started" 
                className="px-6 py-2 bg-linear-to-r from-purple-600 to-blue-600 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(80,70,255,0.35),transparent_45%)]" />
      <div className="absolute inset-y-0 right-0 w-full md:w-1/2 bg-[radial-gradient(circle_at_top,rgba(13,148,136,0.25),transparent_55%)] blur-3xl opacity-60" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div data-aos="fade-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-8">
              Choose the perfect plan for your mentorship journey. No hidden fees, cancel anytime.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-16" data-aos="fade-up" data-aos-delay="100">
            <span className={`${!isYearly ? 'text-white' : 'text-white/70'} transition`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-16 h-8 bg-white/10 rounded-full border border-white/20 cursor-pointer hover:bg-white/20 transition"
            >
              <div className={`absolute top-1 w-6 h-6 bg-linear-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-300 ${isYearly ? 'left-9' : 'left-1'}`}></div>
            </button>
            <span className={`${isYearly ? 'text-white' : 'text-white/70'} transition`}>
              Yearly <span className="text-green-400 text-sm font-semibold ml-1">(Save 20%)</span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all" data-aos="fade-up" data-aos-delay="100">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <p className="text-white/60">Perfect for getting started</p>
              </div>
              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold">$0</span>
                  <span className="text-white/60 ml-2">/{isYearly ? 'year' : 'month'}</span>
                </div>
              </div>
              <Link 
                href="/auth/student/signup"
                className="block w-full px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all text-center mb-8"
              >
                Get Started
              </Link>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 shrink-0" />
                  <span className="text-white/70">Up to 3 sessions per month</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 shrink-0" />
                  <span className="text-white/70">30-minute session duration</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 shrink-0" />
                  <span className="text-white/70">Basic video quality (720p)</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 shrink-0" />
                  <span className="text-white/70">Code collaboration</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 shrink-0" />
                  <span className="text-white/70">Real-time chat</span>
                </div>
                <div className="flex items-start">
                  <X className="w-5 h-5 text-white/30 mr-3 mt-0.5 shrink-0" />
                  <span className="text-white/40">Session recording</span>
                </div>
                <div className="flex items-start">
                  <X className="w-5 h-5 text-white/30 mr-3 mt-0.5 shrink-0" />
                  <span className="text-white/40">Priority support</span>
                </div>
                <div className="flex items-start">
                  <X className="w-5 h-5 text-white/30 mr-3 mt-0.5 shrink-0" />
                  <span className="text-white/40">Advanced analytics</span>
                </div>
              </div>
            </div>

            {/* Pro Plan - Featured */}
            <div className="bg-linear-to-b from-purple-500/20 to-blue-500/20 backdrop-blur-lg rounded-2xl p-8 border-2 border-purple-500/50 relative hover:border-purple-400 transition-all transform md:scale-105" data-aos="fade-up" data-aos-delay="200">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-linear-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <p className="text-white/60">For serious learners & mentors</p>
              </div>
              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold">${isYearly ? '279' : '29'}</span>
                  <span className="text-white/60 ml-2">/{isYearly ? 'year' : 'month'}</span>
                </div>
                {isYearly && <p className="text-green-400 text-sm mt-1">Save $69 per year</p>}
              </div>
              <Link 
                href="/auth/student/signup"
                className="block w-full px-6 py-3 bg-linear-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all text-center mb-8"
              >
                Start Free Trial
              </Link>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 shrink-0" />
                  <span className="text-white/90">Unlimited sessions</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 shrink-0" />
                  <span className="text-white/90">Unlimited session duration</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 shrink-0" />
                  <span className="text-white/90">HD video quality (1080p)</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 shrink-0" />
                  <span className="text-white/90">Advanced code collaboration</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 shrink-0" />
                  <span className="text-white/90">Real-time chat with file sharing</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 shrink-0" />
                  <span className="text-white/90">Session recording & playback</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 shrink-0" />
                  <span className="text-white/90">Priority support</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 shrink-0" />
                  <span className="text-white/90">Progress analytics</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 shrink-0" />
                  <span className="text-white/90">Screen sharing</span>
                </div>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-blue-500/50 transition-all" data-aos="fade-up" data-aos-delay="300">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <p className="text-white/60">For teams & organizations</p>
              </div>
              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold">Custom</span>
                </div>
                <p className="text-white/60 text-sm mt-1">Contact us for pricing</p>
              </div>
              <Link 
                href="/contact"
                className="block w-full px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all text-center mb-8"
              >
                Contact Sales
              </Link>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 shrink-0" />
                  <span className="text-white/70">Everything in Pro</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 shrink-0" />
                  <span className="text-white/70">Unlimited team members</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 shrink-0" />
                  <span className="text-white/70">4K video quality</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 shrink-0" />
                  <span className="text-white/70">Custom branding</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 shrink-0" />
                  <span className="text-white/70">Advanced security & compliance</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 shrink-0" />
                  <span className="text-white/70">Dedicated account manager</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 shrink-0" />
                  <span className="text-white/70">24/7 premium support</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 shrink-0" />
                  <span className="text-white/70">Custom integrations</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 shrink-0" />
                  <span className="text-white/70">SLA guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 px-6 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold mb-4 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-white/70">Everything you need to know about our pricing</p>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10" data-aos="fade-up" data-aos-delay="100">
              <h3 className="text-xl font-bold mb-2">Can I switch plans anytime?</h3>
              <p className="text-white/70">Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10" data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-xl font-bold mb-2">Is there a free trial for Pro?</h3>
              <p className="text-white/70">Absolutely! We offer a 14-day free trial for the Pro plan. No credit card required to start.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10" data-aos="fade-up" data-aos-delay="300">
              <h3 className="text-xl font-bold mb-2">What payment methods do you accept?</h3>
              <p className="text-white/70">We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and bank transfers for Enterprise plans.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10" data-aos="fade-up" data-aos-delay="400">
              <h3 className="text-xl font-bold mb-2">Do you offer refunds?</h3>
              <p className="text-white/70">Yes, we offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your payment in full.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10" data-aos="fade-up" data-aos-delay="500">
              <h3 className="text-xl font-bold mb-2">Are there any setup fees?</h3>
              <p className="text-white/70">No setup fees, no hidden charges. You only pay for the plan you choose.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
          <h2 className="text-4xl font-bold mb-6 bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Still Have Questions?
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Our team is here to help you choose the right plan
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="px-8 py-4 bg-linear-to-r from-purple-600 to-indigo-600 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
            >
              Contact Sales
            </Link>
            <Link 
              href="/#get-started"
              className="px-8 py-4 border border-white/20 rounded-full font-semibold text-lg hover:bg-white/5 transition-all"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="flex items-center space-x-3 mb-4">
                <div className="flex items-center space-x-1">
                  <div className="relative">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-center mt-1">
                      <div className="w-2 h-6 bg-blue-600 rounded-sm"></div>
                    </div>
                  </div>
                </div>
                <span className="text-2xl font-bold">
                  <span className="text-blue-600">One</span><span className="text-orange-500">Wise</span>
                </span>
              </Link>
              <p className="text-white/60 text-sm">
                Empowering learners and mentors worldwide with cutting-edge technology.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><Link href="/#features" className="hover:text-white transition">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
                <li><Link href="/security-roadmap#security" className="hover:text-white transition">Security</Link></li>
                <li><Link href="/security-roadmap#roadmap" className="hover:text-white transition">Roadmap</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition">GDPR</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              © 2026 OneWise. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/60 hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-white/60 hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="text-white/60 hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
