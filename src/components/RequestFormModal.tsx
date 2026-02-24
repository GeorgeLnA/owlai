"use client";

import React, { useState } from "react";

export type RequestFormData = {
  name: string;
  email: string;
  company: string;
  title: string;
  phone: string;
  problems: string;
};

type Props = {
  onClose: () => void;
  onSubmit: (data: RequestFormData) => Promise<void>;
};

export function RequestFormModal({ onClose, onSubmit }: Props): JSX.Element {
  const [formData, setFormData] = useState<RequestFormData>({
    name: "",
    email: "",
    company: "",
    title: "",
    phone: "",
    problems: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!formData.name.trim()) next.name = "Name is required";
    if (!formData.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      next.email = "Please enter a valid email";
    if (!formData.company.trim()) next.company = "Company is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await onSubmit(formData);
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const change = (field: keyof RequestFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 [font-family:'Manrope',Helvetica]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="request-form-title"
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-6 border-b border-[#afafaf60] flex justify-between items-center">
          <h2 id="request-form-title" className="font-bold text-black text-lg md:text-xl">
            Test Lampost Beta for Free
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-wezomcomdove-gray hover:bg-gray-100 hover:text-black transition-colors touch-manipulation"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        {success ? (
          <div className="p-6 text-center">
            <p className="font-semibold text-[#246193]">Thank you! We'll be in touch.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4">
            {errors.form && (
              <p className="text-sm text-red-600 font-medium">{errors.form}</p>
            )}
            <div>
              <label className="block text-sm font-semibold text-black mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={change("name")}
                className={`w-full h-11 px-3 rounded-xl border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } text-black focus:outline-none focus:ring-2 focus:ring-[#246193]`}
                placeholder="Full name"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={change("email")}
                className={`w-full h-11 px-3 rounded-xl border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } text-black focus:outline-none focus:ring-2 focus:ring-[#246193]`}
                placeholder="Email"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-1">
                Company <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={change("company")}
                className={`w-full h-11 px-3 rounded-xl border ${
                  errors.company ? "border-red-500" : "border-gray-300"
                } text-black focus:outline-none focus:ring-2 focus:ring-[#246193]`}
                placeholder="Company"
              />
              {errors.company && (
                <p className="mt-1 text-xs text-red-500">{errors.company}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-1">
                Title <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={change("title")}
                className="w-full h-11 px-3 rounded-xl border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-[#246193]"
                placeholder="Job title"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-1">
                Phone <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={change("phone")}
                className="w-full h-11 px-3 rounded-xl border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-[#246193]"
                placeholder="Phone"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-1">
                Problems to solve <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <textarea
                value={formData.problems}
                onChange={change("problems")}
                rows={2}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-[#246193] resize-none"
                placeholder="What are you looking to solve?"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 h-11 rounded-xl bg-[#246193] text-white font-semibold text-sm hover:bg-[#1a4a6b] disabled:opacity-50 touch-manipulation"
              >
                {submitting ? "Submitting…" : "Submit Request"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-11 rounded-xl border border-gray-300 font-semibold text-sm hover:bg-gray-50 touch-manipulation"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
