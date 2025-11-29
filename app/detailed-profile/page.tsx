"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Building2, Loader2, Upload, X, Plus } from 'lucide-react';
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

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface FileUpload {
  file: File | null;
  preview: string;
}

interface OpeningHours {
  [key: string]: { open: string; close: string; closed: boolean };
}

export default function DetailedProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    businessNameEn: '',
    businessNameDv: '',
    category: '',
    descriptionEn: '',
    descriptionDv: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    registrationNumber: '',
  });

  // Social media
  const [socialMedia, setSocialMedia] = useState({
    facebook: '',
    instagram: '',
    twitter: '',
  });

  // Files
  const [logo, setLogo] = useState<FileUpload>({ file: null, preview: '' });
  const [registrationDoc, setRegistrationDoc] = useState<FileUpload>({ file: null, preview: '' });
  const [additionalDocs, setAdditionalDocs] = useState<FileUpload[]>([]);

  // Opening hours
  const [openingHours, setOpeningHours] = useState<OpeningHours>(
    DAYS.reduce((acc, day) => ({
      ...acc,
      [day]: { open: '09:00', close: '17:00', closed: false }
    }), {})
  );

  // Services
  const [services, setServices] = useState<string[]>(['']);

  // FAQs
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([
    { question: '', answer: '' }
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSocialMediaChange = (platform: string, value: string) => {
    setSocialMedia(prev => ({ ...prev, [platform]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'registration' | 'additional') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    const preview = URL.createObjectURL(file);

    if (type === 'logo') {
      setLogo({ file, preview });
    } else if (type === 'registration') {
      setRegistrationDoc({ file, preview });
    } else if (type === 'additional') {
      setAdditionalDocs(prev => [...prev, { file, preview }]);
    }
  };

  const removeAdditionalDoc = (index: number) => {
    setAdditionalDocs(prev => prev.filter((_, i) => i !== index));
  };

  const handleOpeningHoursChange = (day: string, field: 'open' | 'close' | 'closed', value: string | boolean) => {
    setOpeningHours(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
  };

  const addService = () => {
    setServices(prev => [...prev, '']);
  };

  const updateService = (index: number, value: string) => {
    setServices(prev => prev.map((s, i) => i === index ? value : s));
  };

  const removeService = (index: number) => {
    setServices(prev => prev.filter((_, i) => i !== index));
  };

  const addFaq = () => {
    setFaqs(prev => [...prev, { question: '', answer: '' }]);
  };

  const updateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    setFaqs(prev => prev.map((faq, i) =>
      i === index ? { ...faq, [field]: value } : faq
    ));
  };

  const removeFaq = (index: number) => {
    setFaqs(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    const formData = new FormData();

    if (logo.file) formData.append('logo', logo.file);
    if (registrationDoc.file) formData.append('registration', registrationDoc.file);
    additionalDocs.forEach((doc, i) => {
      if (doc.file) formData.append(`additional_${i}`, doc.file);
    });

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload files');
    }

    return await response.json();
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
    setUploadingFiles(true);

    try {
      // Upload files first
      let filePaths = {};
      if (logo.file || registrationDoc.file || additionalDocs.length > 0) {
        filePaths = await uploadFiles();
      }
      setUploadingFiles(false);

      // Prepare submission data
      const submissionData = {
        ...formData,
        submissionType: 'detailed',
        socialMedia: JSON.stringify(socialMedia),
        openingHours: JSON.stringify(openingHours),
        services: JSON.stringify(services.filter(s => s.trim() !== '')),
        faqs: JSON.stringify(faqs.filter(f => f.question.trim() !== '' && f.answer.trim() !== '')),
        ...filePaths,
      };

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
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
      setUploadingFiles(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Create Detailed Business Profile
              </h1>
              <p className="text-gray-600">
                Provide comprehensive information about your business
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Basic Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="businessNameEn" className="block text-sm font-semibold text-gray-900 mb-2">
                    Business Name (English) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="businessNameEn"
                    name="businessNameEn"
                    value={formData.businessNameEn}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter business name in English"
                  />
                </div>

                <div>
                  <label htmlFor="businessNameDv" className="block text-sm font-semibold text-gray-900 mb-2">
                    Business Name (ދިވެހި)
                  </label>
                  <input
                    type="text"
                    id="businessNameDv"
                    name="businessNameDv"
                    value={formData.businessNameDv}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ވިޔަފާރީގެ ނަން ދިވެހިބަހުން"
                    dir="rtl"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="category" className="block text-sm font-semibold text-gray-900 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="descriptionEn" className="block text-sm font-semibold text-gray-900 mb-2">
                    Business Description (English) <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="descriptionEn"
                    name="descriptionEn"
                    value={formData.descriptionEn}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe your business, products, and services in English..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="descriptionDv" className="block text-sm font-semibold text-gray-900 mb-2">
                    Business Description (ދިވެހި)
                  </label>
                  <textarea
                    id="descriptionDv"
                    name="descriptionDv"
                    value={formData.descriptionDv}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ވިޔަފާރީގެ، ތަކެތީގެ، އަދި ޚިދުމަތްތަކުގެ ތަފްސީލް ދިވެހިބަހުން..."
                    dir="rtl"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Full name of contact person"
                  />
                </div>

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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+960 7XX XXXX"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-semibold text-gray-900 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Business address"
                  />
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-semibold text-gray-900 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://www.example.com"
                  />
                </div>

                <div>
                  <label htmlFor="registrationNumber" className="block text-sm font-semibold text-gray-900 mb-2">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    id="registrationNumber"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Business registration number"
                  />
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Social Media
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-2">
                      Facebook
                    </label>
                    <input
                      type="url"
                      id="facebook"
                      value={socialMedia.facebook}
                      onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Facebook page URL"
                    />
                  </div>
                  <div>
                    <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-2">
                      Instagram
                    </label>
                    <input
                      type="url"
                      id="instagram"
                      value={socialMedia.instagram}
                      onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Instagram profile URL"
                    />
                  </div>
                  <div>
                    <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-2">
                      Twitter/X
                    </label>
                    <input
                      type="url"
                      id="twitter"
                      value={socialMedia.twitter}
                      onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Twitter/X profile URL"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* File Uploads */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Documents & Media
              </h2>

              <div className="space-y-6">
                {/* Logo */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Business Logo
                  </label>
                  <div className="flex items-center gap-4">
                    {logo.preview && (
                      <img src={logo.preview} alt="Logo preview" className="w-20 h-20 object-cover rounded-lg border border-gray-300" />
                    )}
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      <Upload className="w-5 h-5" />
                      {logo.file ? 'Change Logo' : 'Upload Logo'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'logo')}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    PNG, JPG, or GIF. Max 5MB.
                  </p>
                </div>

                {/* Registration Document */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Registration Document
                  </label>
                  <div className="flex items-center gap-4">
                    {registrationDoc.file && (
                      <span className="text-sm text-gray-600">{registrationDoc.file.name}</span>
                    )}
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      <Upload className="w-5 h-5" />
                      {registrationDoc.file ? 'Change Document' : 'Upload Document'}
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, 'registration')}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    PDF or image. Max 5MB.
                  </p>
                </div>

                {/* Additional Documents */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Additional Documents
                  </label>
                  {additionalDocs.length > 0 && (
                    <div className="mb-4 space-y-2">
                      {additionalDocs.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-700">{doc.file?.name}</span>
                          <button
                            type="button"
                            onClick={() => removeAdditionalDoc(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <Upload className="w-5 h-5" />
                    Add Document
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, 'additional')}
                      className="hidden"
                    />
                  </label>
                  <p className="mt-1 text-sm text-gray-500">
                    Menu, brochures, certificates, etc. PDF or images.
                  </p>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Opening Hours
              </h2>
              <div className="space-y-4">
                {DAYS.map(day => (
                  <div key={day} className="flex items-center gap-4">
                    <div className="w-32">
                      <span className="text-sm font-medium text-gray-700">{day}</span>
                    </div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={openingHours[day].closed}
                        onChange={(e) => handleOpeningHoursChange(day, 'closed', e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600">Closed</span>
                    </label>
                    {!openingHours[day].closed && (
                      <>
                        <input
                          type="time"
                          value={openingHours[day].open}
                          onChange={(e) => handleOpeningHoursChange(day, 'open', e.target.value)}
                          className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-gray-500">to</span>
                        <input
                          type="time"
                          value={openingHours[day].close}
                          onChange={(e) => handleOpeningHoursChange(day, 'close', e.target.value)}
                          className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500"
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Services Offered
              </h2>
              <div className="space-y-3">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={service}
                      onChange={(e) => updateService(index, e.target.value)}
                      className="flex-1 px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Service ${index + 1}`}
                    />
                    {services.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeService(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addService}
                  className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Add Service
                </button>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="p-6 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-sm font-semibold text-gray-700">FAQ {index + 1}</h4>
                      {faqs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFaq(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => updateFaq(index, 'question', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Question"
                      />
                      <textarea
                        value={faq.answer}
                        onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Answer"
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFaq}
                  className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Add FAQ
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {uploadingFiles ? 'Uploading files...' : 'Submitting...'}
                  </>
                ) : (
                  'Submit Detailed Profile'
                )}
              </button>

              <p className="mt-4 text-sm text-gray-500 text-center">
                By submitting, you agree that the information provided is accurate and you have the authority to represent this business.
              </p>
            </div>
          </form>

          {/* Want simpler option */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-700 mb-3">
              <strong>Too much information?</strong> Use our Quick Add option to submit just the essentials.
            </p>
            <Link
              href="/quick-add"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
            >
              Switch to Quick Add →
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
