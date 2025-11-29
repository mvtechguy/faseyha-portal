"use client";

import { motion } from 'framer-motion';
import { Building2, FileText, CheckCircle, Clock, Mail, Phone, ArrowRight, Zap, Shield, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Bey</h1>
                <p className="text-xs text-gray-500">Business Portal</p>
              </div>
            </div>
            <a
              href="https://aibey.ai"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Back to AI Bey
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              Join 1000+ Businesses on AI Bey
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Get Your Business<br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Discovered by AI
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              List your business on AI Bey and reach thousands of customers searching through our AI-powered platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/quick-add"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Get Started Free
              </Link>
              <Link
                href="/detailed-profile"
                className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all"
              >
                See All Features
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why List on AI Bey?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join the future of business discovery in Maldives
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">AI-Powered Discovery</h4>
              <p className="text-gray-600">
                Customers find you through natural conversations with our AI assistant
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-cyan-50 to-white p-8 rounded-2xl border border-cyan-100"
            >
              <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Increase Visibility</h4>
              <p className="text-gray-600">
                Reach thousands of potential customers actively searching for services
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border border-green-100"
            >
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">100% Free</h4>
              <p className="text-gray-600">
                No listing fees, no hidden charges. Get started completely free
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Submission Options */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Submission Type</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the option that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {/* Quick Add */}
            <Link href="/quick-add">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="group relative bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all cursor-pointer h-full"
              >
                <div className="absolute -top-3 -right-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  2 MINUTES
                </div>

                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">Quick Add</h4>
                    <p className="text-gray-600">Fast and simple submission</p>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Business name & category</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Basic description</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Contact information</span>
                  </li>
                </ul>

                <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </div>
              </motion.div>
            </Link>

            {/* Detailed Profile */}
            <Link href="/detailed-profile">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="group relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200 hover:border-cyan-500 hover:shadow-xl transition-all cursor-pointer h-full"
              >
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  RECOMMENDED
                </div>

                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">Detailed Profile</h4>
                    <p className="text-gray-700">Complete business showcase</p>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">Everything in Quick Add</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Bilingual (English & ދިވެހި)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Logo & document uploads</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Services, FAQs & hours</span>
                  </li>
                </ul>

                <div className="flex items-center gap-2 text-blue-700 font-semibold group-hover:gap-4 transition-all">
                  Create Full Profile
                  <ArrowRight className="w-5 h-5" />
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h3>
            <p className="text-gray-600">Simple process to get your business listed</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Submit Information</h4>
              <p className="text-gray-600 text-sm">Fill out the form with your business details</p>
            </div>

            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Quick Review</h4>
              <p className="text-gray-600 text-sm">Our team reviews within 24-48 hours</p>
            </div>

            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Go Live!</h4>
              <p className="text-gray-600 text-sm">Your business appears on AI Bey</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h3>
          <p className="text-gray-600 mb-8">Our support team is here to assist you</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:support@aibey.ai"
              className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition-all"
            >
              <Mail className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-700">support@aibey.ai</span>
            </a>
            <a
              href="tel:+9607777777"
              className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition-all"
            >
              <Phone className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-700">+960 777 7777</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">AI Bey Business Portal</p>
                <p className="text-xs text-gray-500">Powered by AI</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">© 2025 AI Bey. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
