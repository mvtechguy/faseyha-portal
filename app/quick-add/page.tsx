"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Building2, Loader2, Send } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const CATEGORIES = [
  'Restaurant',
  'Hotel & Accommodation',
  'Retail & Shopping',
  'Healthcare',
  'Education',
  'Technology',
  'Professional Services',
  'Entertainment',
  'Transportation',
  'Construction',
  'Real Estate',
  'Tourism',
  'Other'
];

export default function QuickAddPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessNameEn: '',
    category: '',
    descriptionEn: '',
    contactPerson: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.businessNameEn || !formData.category || !formData.descriptionEn ||
        !formData.contactPerson || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submissionType: 'quick',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Submission successful!');
        router.push(`/success?id=${data.id}`);
      } else {
        toast.error(data.error || 'Failed to submit');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl mb-4">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Quick Add Your Business
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get listed in just 2 minutes with essential information
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Business Name */}
              <div>
                <label htmlFor="businessNameEn" className="block text-sm font-semibold text-gray-900 mb-2">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="businessNameEn"
                  name="businessNameEn"
                  value={formData.businessNameEn}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your business name"
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-gray-900 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="descriptionEn" className="block text-sm font-semibold text-gray-900 mb-2">
                  Business Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="descriptionEn"
                  name="descriptionEn"
                  value={formData.descriptionEn}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Describe your business, products, and services..."
                />
                <p className="mt-2 text-sm text-gray-500">
                  Provide a clear description to help customers understand what you offer
                </p>
              </div>

              {/* Contact Information */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
                
                <div className="space-y-6">
                  {/* Contact Person */}
                  <div>
                    <label htmlFor="contactPerson" className="block text-sm font-semibold text-gray-900 mb-2">
                      Contact Person Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="contactPerson"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Full name of contact person"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="+960 7XX XXXX"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Business
                    </>
                  )}
                </button>

                <p className="mt-4 text-sm text-gray-500 text-center">
                  By submitting, you agree that the information provided is accurate
                </p>
              </div>
            </form>
          </div>

          {/* Want more features */}
          <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Want to add more details?
                </h3>
                <p className="text-sm text-gray-600">
                  Create a comprehensive profile with logo, documents, services, and more
                </p>
              </div>
              <Link
                href="/detailed-profile"
                className="whitespace-nowrap px-6 py-3 bg-white border-2 border-blue-200 text-blue-700 rounded-lg font-semibold hover:border-blue-600 hover:bg-blue-50 transition-all"
              >
                Create Detailed Profile →
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
