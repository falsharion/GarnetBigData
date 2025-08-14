// app/contact/components/ContactForm.tsx
'use client';

import { useState, useEffect, useCallback } from "react";
import emailjs from '@emailjs/browser';
import { debounce } from 'lodash-es';

const servicesOptions = [
  "Data Governance & Quality",
  "Training & Culture Building",
  "Data Infrastructure & Centralization",
  "Data Consulting & Process Optimization",
  "Analytics & Automation",
  "Other"
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    service: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY');
  }, []);

  const validateEmail = useCallback((email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }, []);

  const validateForm = useCallback(() => {
    let valid = true;
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      service: "",
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      valid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      valid = false;
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
      valid = false;
    }

    if (!formData.service) {
      newErrors.service = "Please select a service";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }, [formData, validateEmail]);

  // Debounced handleChange
  const handleChange = useCallback(debounce(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));

      if (errors[name as keyof typeof errors]) {
        setErrors(prev => ({
          ...prev,
          [name]: "",
        }));
      }
    }, 100), [errors]);

  const sendToGoogleSheets = useCallback(async (data: typeof formData) => {
    try {
      const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      if (!GOOGLE_SCRIPT_URL) return;

      const payload = {
        ...data,
        timestamp: new Date().toISOString(),
      };

      const url = GOOGLE_SCRIPT_URL.endsWith('/dev') 
        ? GOOGLE_SCRIPT_URL.replace('/dev', '/exec')
        : GOOGLE_SCRIPT_URL;

      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.log('Google Sheets logging failed:', error);
    }
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const templateParams = {
        name: `${formData.firstName} ${formData.lastName}`,
        ...formData
      };

      // Split heavy operations
      setTimeout(async () => {
        const result = await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
          templateParams
        );
      
      await sendToGoogleSheets(formData);
      
      setSubmitted(true);
      setIsSubmitting(false);
      }, 30000);

    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitError('Failed to send message. Please try again.');
      setIsSubmitting(false);
    }
  }, [formData, validateForm, sendToGoogleSheets]);

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Thank you!
        </h3>
        <p className="text-gray-600">
          Your message has been sent successfully. We'll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-4 text-sm">
      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {submitError}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8 md:gap-20">
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full border-b-2 border-b-red-900 bg-red-50 px-4 py-3 border border-gray-200 rounded ${
              errors.firstName ? 'border-red-500' : ''
            }`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full border-b-2 border-b-red-900 bg-red-50 px-4 py-3 border border-gray-200 rounded ${
              errors.lastName ? 'border-red-500' : ''
            }`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-20">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border-b-2 border-b-red-900 bg-red-50 px-4 py-3 border border-gray-200 rounded ${
              errors.email ? 'border-red-500' : ''
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full border-b-2 border-b-red-900 bg-red-50 px-4 py-3 border border-gray-200 rounded ${
              errors.phone ? 'border-red-500' : ''
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      <div>
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          className={`w-full border-b-2 border-b-red-900 bg-red-50 px-4 py-3 border border-gray-200 rounded ${
            errors.company ? 'border-red-500' : ''
          }`}
        />
        {errors.company && (
          <p className="text-red-500 text-xs mt-1">{errors.company}</p>
        )}
      </div>

      <div>
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          className={`w-full border-b-2 border-b-red-900 bg-red-50 px-4 py-3 border border-gray-200 rounded appearance-none ${
            errors.service ? 'border-red-500' : ''
          }`}
        >
          <option value="">Select a service</option>
          {servicesOptions.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
        {errors.service && (
          <p className="text-red-500 text-xs mt-1">{errors.service}</p>
        )}
      </div>

      <textarea
        name="message"
        placeholder="Additional Information (Optional)"
        rows={4}
        value={formData.message}
        onChange={handleChange}
        className="w-full border-b-2 border-b-red-900 bg-red-50 px-4 py-3 border border-gray-200 rounded resize-none"
      ></textarea>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-red-800 hover:bg-red-700 text-white py-2 px-4 rounded text-sm font-bold tracking-wider disabled:opacity-50 transition-colors"
      >
        {isSubmitting ? "Sending..." : "SEND"}
      </button>
    </form>
  );
}