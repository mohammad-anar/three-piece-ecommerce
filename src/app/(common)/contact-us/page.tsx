"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { FaWhatsapp, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 4000);
  };

  return (
    <div className="w-full bg-background pb-20">
      {/* Top Google Map iframe (Image 2 top) */}
      <div className="w-full h-[360px] md:h-[420px] bg-background-surface border-b border-border relative overflow-hidden">
        <iframe
          title="Zanass Store Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118103.46824949576!2d91.73153549726562!3d22.338400000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd899478f654b%3A0xb355153c3933c162!2sChittagong%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1716382000000!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full grayscale-25 contrast-110"
        />
      </div>

      {/* Main 2-Column Section (Image 2 bottom) */}
      <div className="container mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Title, Description, Direct Contacts & Channels */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-content leading-snug">
                Elevating Elegance, Empowering You.
              </h1>
              <p className="text-sm md:text-base text-content-body leading-relaxed mt-4">
                Welcome to <strong className="text-content">Zanass</strong>, your premier destination for high-quality and stylish women&apos;s ethnic wear. We believe that fashion is more than just clothing; it is a reflection of identity, culture, and confidence. At <strong className="text-content">zanass.com</strong>, our mission is to bring you the perfect blend of tradition and modern trends through our curated collections.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border">
              {/* WhatsApp */}
              <a
                href="https://wa.me/8801700000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-4 border border-border bg-background-surface hover:border-primary transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] shrink-0">
                  <FaWhatsapp size={20} />
                </div>
                <div>
                  <span className="text-xs text-content-body block">WhatsApp Us</span>
                  <span className="text-sm font-bold text-content group-hover:text-primary transition-colors">
                    +880 1700-000000
                  </span>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+8801700000000"
                className="flex items-center gap-3 p-4 border border-border bg-background-surface hover:border-primary transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-xs text-content-body block">Call Us</span>
                  <span className="text-sm font-bold text-content group-hover:text-primary transition-colors">
                    +880 1700-000000
                  </span>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:support@zanass.com"
                className="flex items-center gap-3 p-4 border border-border bg-background-surface hover:border-primary transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-xs text-content-body block">Email Support</span>
                  <span className="text-sm font-bold text-content group-hover:text-primary transition-colors">
                    support@zanass.com
                  </span>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-center gap-3 p-4 border border-border bg-background-surface">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-xs text-content-body block">Store Address</span>
                  <span className="text-sm font-bold text-content">
                    Chittagong & Dhaka, BD
                  </span>
                </div>
              </div>
            </div>

            {/* Operating Hours & Socials */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border text-xs text-content-body">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>Customer Care: Sat – Thu (10am – 10pm)</span>
              </div>
              <div className="flex items-center gap-3 text-content-body">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  <FaFacebook size={16} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  <FaInstagram size={16} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  <FaLinkedin size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (Image 2 right) */}
          <div className="lg:col-span-6 bg-background border border-border p-8 shadow-xs">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-1.5">
                Information About Us
              </span>
              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-content">
                Contact Us For Any Questions
              </h2>
            </div>

            {submitted && (
              <div className="p-4 mb-6 bg-success/10 border border-success/30 text-success text-sm font-semibold">
                Thank you for your message! Our team will get back to you shortly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-content block">
                  Name
                </label>
                <Input
                  required
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="rounded-none border-border"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-content block">
                  Email
                </label>
                <Input
                  required
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="rounded-none border-border"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-content block">
                  Message
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="flex w-full rounded-none border border-border bg-background px-3 py-2 text-sm text-content ring-offset-background placeholder:text-content-muted focus-visible:outline-hidden focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full py-6 uppercase tracking-wider text-sm font-bold bg-primary text-primary-fg hover:bg-primary-hover rounded-none shadow-md cursor-pointer mt-2"
              >
                Send
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

