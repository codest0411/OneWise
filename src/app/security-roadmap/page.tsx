'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Shield, Lock, Eye, Server, CheckCircle, Clock, Zap, Rocket } from 'lucide-react'

export default function SecurityRoadmapPage() {
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
              Security & Roadmap
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
              Your data security is our priority. Explore our security measures and upcoming features.
            </p>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-green-500 to-emerald-500 rounded-2xl mb-6">
              <Shield className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-bold mb-4 bg-linear-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Security First
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              We implement industry-leading security practices to protect your data
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10" data-aos="fade-up" data-aos-delay="100">
              <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4">End-to-End Encryption</h3>
              <p className="text-white/70 mb-4">
                All video sessions and messages are encrypted using industry-standard AES-256 encryption. Your conversations remain private and secure.
              </p>
              <ul className="space-y-2 text-white/60">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 shrink-0" />
                  <span>AES-256 encryption for all data</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 shrink-0" />
                  <span>Secure WebRTC connections</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 shrink-0" />
                  <span>TLS 1.3 for data in transit</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10" data-aos="fade-up" data-aos-delay="200">
              <div className="w-14 h-14 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Privacy Protection</h3>
              <p className="text-white/70 mb-4">
                We never sell your data. Your personal information is protected and only used to improve your experience.
              </p>
              <ul className="space-y-2 text-white/60">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 shrink-0" />
                  <span>GDPR & CCPA compliant</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 shrink-0" />
                  <span>No data selling to third parties</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 shrink-0" />
                  <span>Transparent data practices</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10" data-aos="fade-up" data-aos-delay="300">
              <div className="w-14 h-14 bg-linear-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6">
                <Server className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Secure Infrastructure</h3>
              <p className="text-white/70 mb-4">
                Our infrastructure is built on enterprise-grade cloud services with 99.9% uptime guarantee.
              </p>
              <ul className="space-y-2 text-white/60">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 shrink-0" />
                  <span>AWS/GCP enterprise hosting</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 shrink-0" />
                  <span>Regular security audits</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 shrink-0" />
                  <span>DDoS protection</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10" data-aos="fade-up" data-aos-delay="400">
              <div className="w-14 h-14 bg-linear-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Authentication & Access</h3>
              <p className="text-white/70 mb-4">
                Multi-factor authentication and role-based access control keep your account secure.
              </p>
              <ul className="space-y-2 text-white/60">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 shrink-0" />
                  <span>Two-factor authentication (2FA)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 shrink-0" />
                  <span>OAuth 2.0 integration</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 shrink-0" />
                  <span>Session management</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-linear-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-2xl p-8 border border-green-500/30" data-aos="fade-up">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Security Certifications</h3>
              <p className="text-white/70 mb-6">
                We maintain the highest security standards with regular audits and certifications
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <div className="bg-white/10 px-6 py-3 rounded-xl">
                  <span className="font-semibold">SOC 2 Type II</span>
                </div>
                <div className="bg-white/10 px-6 py-3 rounded-xl">
                  <span className="font-semibold">ISO 27001</span>
                </div>
                <div className="bg-white/10 px-6 py-3 rounded-xl">
                  <span className="font-semibold">GDPR Compliant</span>
                </div>
                <div className="bg-white/10 px-6 py-3 rounded-xl">
                  <span className="font-semibold">HIPAA Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="relative py-20 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-purple-500 to-blue-500 rounded-2xl mb-6">
              <Rocket className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-bold mb-4 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Product Roadmap
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Exciting features and improvements coming to OneWise
            </p>
          </div>

          <div className="space-y-12">
            {/* Q1 2026 */}
            <div data-aos="fade-up" data-aos-delay="100">
              <div className="flex items-center mb-6">
                <div className="bg-linear-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full font-semibold mr-4">
                  Q1 2026
                </div>
                <div className="flex items-center text-green-400">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="font-semibold">In Progress</span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                  <div className="flex items-start">
                    <Zap className="w-6 h-6 text-yellow-400 mr-3 mt-1 shrink-0" />
                    <div>
                      <h4 className="text-xl font-bold mb-2">AI-Powered Code Review</h4>
                      <p className="text-white/70">Real-time AI suggestions during code collaboration sessions</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                  <div className="flex items-start">
                    <Zap className="w-6 h-6 text-yellow-400 mr-3 mt-1 shrink-0" />
                    <div>
                      <h4 className="text-xl font-bold mb-2">Mobile Apps</h4>
                      <p className="text-white/70">Native iOS and Android apps for learning on the go</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                  <div className="flex items-start">
                    <Zap className="w-6 h-6 text-yellow-400 mr-3 mt-1 shrink-0" />
                    <div>
                      <h4 className="text-xl font-bold mb-2">Whiteboard Collaboration</h4>
                      <p className="text-white/70">Interactive whiteboard for visual explanations</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                  <div className="flex items-start">
                    <Zap className="w-6 h-6 text-yellow-400 mr-3 mt-1 shrink-0" />
                    <div>
                      <h4 className="text-xl font-bold mb-2">Session Templates</h4>
                      <p className="text-white/70">Pre-built templates for common mentoring scenarios</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Q2 2026 */}
            <div data-aos="fade-up" data-aos-delay="200">
              <div className="flex items-center mb-6">
                <div className="bg-linear-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full font-semibold mr-4">
                  Q2 2026
                </div>
                <div className="flex items-center text-blue-400">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Planned</span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                  <div className="flex items-start">
                    <Rocket className="w-6 h-6 text-blue-400 mr-3 mt-1 shrink-0" />
                    <div>
                      <h4 className="text-xl font-bold mb-2">Learning Paths</h4>
                      <p className="text-white/70">Structured curriculum with milestone tracking</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                  <div className="flex items-start">
                    <Rocket className="w-6 h-6 text-blue-400 mr-3 mt-1 shrink-0" />
                    <div>
                      <h4 className="text-xl font-bold mb-2">Group Sessions</h4>
                      <p className="text-white/70">Support for multiple students in one session</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                  <div className="flex items-start">
                    <Rocket className="w-6 h-6 text-blue-400 mr-3 mt-1 shrink-0" />
                    <div>
                      <h4 className="text-xl font-bold mb-2">Advanced Analytics</h4>
                      <p className="text-white/70">Detailed insights on learning progress and engagement</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                  <div className="flex items-start">
                    <Rocket className="w-6 h-6 text-blue-400 mr-3 mt-1 shrink-0" />
                    <div>
                      <h4 className="text-xl font-bold mb-2">Marketplace</h4>
                      <p className="text-white/70">Browse and book sessions with verified mentors</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Q3-Q4 2026 */}
            <div data-aos="fade-up" data-aos-delay="300">
              <div className="flex items-center mb-6">
                <div className="bg-linear-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-semibold mr-4">
                  Q3-Q4 2026
                </div>
                <div className="flex items-center text-purple-400">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Future</span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                  <div className="flex items-start">
                    <Rocket className="w-6 h-6 text-purple-400 mr-3 mt-1 shrink-0" />
                    <div>
                      <h4 className="text-xl font-bold mb-2">AI Mentor Assistant</h4>
                      <p className="text-white/70">24/7 AI-powered help for quick questions</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                  <div className="flex items-start">
                    <Rocket className="w-6 h-6 text-purple-400 mr-3 mt-1 shrink-0" />
                    <div>
                      <h4 className="text-xl font-bold mb-2">Certification Programs</h4>
                      <p className="text-white/70">Earn verified certificates for completed courses</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                  <div className="flex items-start">
                    <Rocket className="w-6 h-6 text-purple-400 mr-3 mt-1 shrink-0" />
                    <div>
                      <h4 className="text-xl font-bold mb-2">Enterprise Features</h4>
                      <p className="text-white/70">Advanced team management and SSO integration</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                  <div className="flex items-start">
                    <Rocket className="w-6 h-6 text-purple-400 mr-3 mt-1 shrink-0" />
                    <div>
                      <h4 className="text-xl font-bold mb-2">API & Integrations</h4>
                      <p className="text-white/70">Public API and integrations with popular tools</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center" data-aos="fade-up">
            <p className="text-white/60 mb-4">Have a feature request?</p>
            <Link 
              href="/contact"
              className="inline-block px-8 py-4 bg-linear-to-r from-purple-600 to-blue-600 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Share Your Ideas
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
                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
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
