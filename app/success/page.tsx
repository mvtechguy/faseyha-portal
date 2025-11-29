"use client";

import { Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, Clock, ArrowLeft, Building2, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function SuccessContent() {
  const searchParams = useSearchParams();
  const submissionId = searchParams.get('id');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (submissionId) {
      navigator.clipboard.writeText(submissionId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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

      {/* Success Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-600" />
          </motion.div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Submission Received!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for submitting your business information
          </p>

          {/* Submission ID */}
          {submissionId && (
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100 mb-8 max-w-2xl mx-auto">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Your Submission ID
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <code className="text-base sm:text-lg font-mono text-blue-700 bg-white px-4 py-3 rounded-lg border border-blue-200 break-all">
                  {submissionId}
                </code>
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-blue-600 transition-all flex items-center gap-2 font-medium"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Save this ID for tracking your submission status
              </p>
            </div>
          )}

          {/* What Happens Next */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8 text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              What Happens Next?
            </h2>

            <div className="grid sm:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Confirmation Email
                </h3>
                <p className="text-sm text-gray-600">
                  You'll receive a confirmation email shortly
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Clock className="w-8 h-8 text-yellow-600" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Quick Review
                </h3>
                <p className="text-sm text-gray-600">
                  Our team reviews within 24-48 hours
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Go Live!
                </h3>
                <p className="text-sm text-gray-600">
                  Your business appears on AI Bey
                </p>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 mb-8 text-left">
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
              Important Information
            </h3>
            <ul className="space-y-3 max-w-2xl mx-auto">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">
                  You will receive email notifications about your submission status
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">
                  Once approved, your business will be searchable on AI Bey immediately
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">
                  If we need more information, we'll contact you via email
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">
                  You can update your business information anytime after approval
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Questions or Need Help?
            </h3>
            <p className="text-gray-600 mb-4">
              Our support team is here to assist you
            </p>
            <a
              href="mailto:support@aibey.ai"
              className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-gray-300 rounded-lg hover:border-blue-600 hover:shadow-md transition-all"
            >
              <Mail className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-700">support@aibey.ai</span>
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Return to Home
            </Link>
            <Link
              href="/quick-add"
              className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all"
            >
              Submit Another Business
            </Link>
          </div>

          {/* Footer Branding */}
          <div className="pt-8 border-t border-gray-200">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-gray-900">AI Bey Business Portal</p>
                <p className="text-xs text-gray-500">Powered by AI</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
