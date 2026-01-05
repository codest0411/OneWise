'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    })
  }, [])

  return (
    <div className="relative overflow-hidden bg-slate-950 text-white">
      {/* Transparent Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
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
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-white/70 hover:text-white transition">Features</a>
              <a href="#how-it-works" className="text-white/70 hover:text-white transition">How It Works</a>
              <a href="#testimonials" className="text-white/70 hover:text-white transition">Testimonials</a>
              <Link href="/pricing" className="text-white/70 hover:text-white transition">Pricing</Link>
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
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl w-full text-center space-y-12">
          <div className="space-y-6" data-aos="fade-up">
            <h1 className="text-6xl md:text-8xl font-bold bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              OneWise
            </h1>
            <p className="text-2xl md:text-3xl text-white/80 max-w-3xl mx-auto">
              Real-time mentorship platform with video conferencing and collaborative coding
            </p>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Connect mentors and students in a seamless learning environment with live video, code collaboration, and instant feedback
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all hover:scale-105">
              <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-indigo-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">For Mentors</h2>
              <p className="text-white/70 mb-6">Create sessions, share knowledge, and guide students</p>
              <div className="space-y-3">
                <Link 
                  href="/auth/mentor/signup"
                  className="block w-full px-6 py-3 bg-linear-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all"
                >
                  Start as Mentor
                </Link>
                <Link 
                  href="/auth/mentor/login"
                  className="block w-full px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-all"
                >
                  Sign In
                </Link>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-blue-500/50 transition-all hover:scale-105">
              <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-cyan-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">For Students</h2>
              <p className="text-white/70 mb-6">Join sessions, learn, and grow your skills</p>
              <div className="space-y-3">
                <Link 
                  href="/auth/student/signup"
                  className="block w-full px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all"
                >
                  Start as Student
                </Link>
                <Link 
                  href="/auth/student/login"
                  className="block w-full px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-all"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-5xl font-bold mb-6 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Everything you need for effective online mentorship and learning
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10" data-aos="fade-up" data-aos-delay="100">
              <div className="w-14 h-14 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">HD Video Conferencing</h3>
              <p className="text-white/70">
                Crystal-clear video and audio quality for seamless communication. Screen sharing and recording capabilities included.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10" data-aos="fade-up" data-aos-delay="200">
              <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Live Code Editor</h3>
              <p className="text-white/70">
                Collaborate in real-time with Monaco editor. Syntax highlighting, auto-completion, and multiple language support.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10" data-aos="fade-up" data-aos-delay="300">
              <div className="w-14 h-14 bg-linear-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Real-time Chat</h3>
              <p className="text-white/70">
                Instant messaging with code snippets, file sharing, and emoji support. Keep conversations organized and searchable.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10" data-aos="fade-up" data-aos-delay="100">
              <div className="w-14 h-14 bg-linear-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Session Recording</h3>
              <p className="text-white/70">
                Automatically record sessions for future reference. Review key moments and share recordings with participants.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10" data-aos="fade-up" data-aos-delay="200">
              <div className="w-14 h-14 bg-linear-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Smart Scheduling</h3>
              <p className="text-white/70">
                Intelligent calendar integration with timezone support. Automated reminders and easy rescheduling options.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10" data-aos="fade-up" data-aos-delay="300">
              <div className="w-14 h-14 bg-linear-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Progress Tracking</h3>
              <p className="text-white/70">
                Detailed analytics and insights on learning progress. Track goals, milestones, and skill development over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative py-32 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-5xl font-bold mb-6 bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Get started in minutes with our simple three-step process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center" data-aos="fade-up" data-aos-delay="100">
              <div className="w-20 h-20 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4">Sign Up</h3>
              <p className="text-white/70">
                Create your account as a mentor or student. Set up your profile and preferences in seconds.
              </p>
            </div>

            <div className="text-center" data-aos="fade-up" data-aos-delay="200">
              <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4">Connect</h3>
              <p className="text-white/70">
                Browse mentors or create sessions. Schedule meetings that fit your timezone and availability.
              </p>
            </div>

            <div className="text-center" data-aos="fade-up" data-aos-delay="300">
              <div className="w-20 h-20 bg-linear-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4">Learn & Grow</h3>
              <p className="text-white/70">
                Join live sessions with video, code collaboration, and real-time feedback. Track your progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-5xl font-bold mb-6 bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              What Our Users Say
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Join thousands of mentors and students already learning on OneWise
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10" data-aos="fade-up" data-aos-delay="100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Sarah Chen</h4>
                  <p className="text-white/60 text-sm">Senior Developer</p>
                </div>
              </div>
              <p className="text-white/70">
                "OneWise transformed how I mentor junior developers. The code collaboration features are incredible!"
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10" data-aos="fade-up" data-aos-delay="200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Michael Rodriguez</h4>
                  <p className="text-white/60 text-sm">CS Student</p>
                </div>
              </div>
              <p className="text-white/70">
                "Found an amazing mentor who helped me land my first internship. The platform is so easy to use!"
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10" data-aos="fade-up" data-aos-delay="300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-linear-to-br from-green-500 to-emerald-500 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Priya Sharma</h4>
                  <p className="text-white/60 text-sm">Tech Lead</p>
                </div>
              </div>
              <p className="text-white/70">
                "The video quality and real-time code editing make sessions feel like we're in the same room. Love it!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="get-started" className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
          <h2 className="text-5xl font-bold mb-6 bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/70 mb-12">
            Join OneWise today and experience the future of online mentorship
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/mentor/signup"
              className="px-8 py-4 bg-linear-to-r from-purple-600 to-indigo-600 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
            >
              Sign Up as Mentor
            </Link>
            <Link 
              href="/auth/student/signup"
              className="px-8 py-4 bg-linear-to-r from-blue-600 to-cyan-600 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all"
            >
              Sign Up as Student
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
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
              </div>
              <p className="text-white/60 text-sm">
                Empowering learners and mentors worldwide with cutting-edge technology.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
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
