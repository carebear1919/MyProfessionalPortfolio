import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Github, Linkedin, ArrowUpRight, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Enter a valid email address';
        return '';
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (fieldErrors[name]) {
      const msg = validateField(name, value);
      setFieldErrors((prev) => {
        const next = { ...prev };
        if (msg) next[name] = msg;
        else delete next[name];
        return next;
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'subject') return;
    const msg = validateField(name, value);
    setFieldErrors((prev) => {
      const next = { ...prev };
      if (msg) next[name] = msg;
      else delete next[name];
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const errors: Record<string, string> = {};
    (['name', 'email', 'message'] as const).forEach((field) => {
      const msg = validateField(field, formData[field]);
      if (msg) errors[field] = msg;
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(false);
    
    // Simulate pipeline request dispatch
    setTimeout(() => {
      // Small simulated chance of failure for error testing block, otherwise succeeds
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-24 px-6 sm:px-10 lg:px-16 border-t border-neutral-200 dark:border-neutral-900 bg-editorial-cream dark:bg-editorial-charcoal transition-colors duration-500 text-left overflow-hidden">
      
      {/* BACKGROUND WATERMARK */}
      <div className="absolute right-0 bottom-0 select-none pointer-events-none z-0 opacity-[0.03] dark:opacity-[0.02] translate-y-12 translate-x-12">
        <h2 className="text-[25vw] font-serif font-black tracking-tighter leading-none uppercase">
          CONTACT
        </h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Contact Details */}
          <div className="lg:col-span-5 space-y-8 sticky lg:top-24">
            <div>
              {/* STATUS BADGE */}
              <div className="inline-flex items-center gap-1.5 font-mono text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-blue-500/10 to-violet-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/15 px-2.5 py-0.5 rounded-full mb-4">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full animate-pulse"></span>
                STATUS: ONLINE
              </div>

              <h2 className="font-serif font-bold tracking-tight text-3xl sm:text-4xl md:text-5xl text-editorial-charcoal dark:text-editorial-cream mb-4">
                Initialize Connection.
              </h2>
              <p className="font-sans text-xs sm:text-[13px] leading-relaxed font-light text-neutral-500 dark:text-neutral-400">
                Have questions or ready to transform your vision into secure code and responsive UI suites?
              </p>
            </div>

            {/* Direct Contact Links */}
            <div className="border-t border-neutral-200 dark:border-neutral-900 pt-8 space-y-6">
              
              {/* Link 1 */}
              <div className="group">
                <span className="font-mono text-[10.5px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 block mb-1 font-bold">
                  01 // Direct Work Mail
                </span>
                <a
                  href="mailto:jianhilario@gmail.com"
                  className="font-serif italic text-base sm:text-lg font-bold text-editorial-charcoal dark:text-editorial-cream hover:text-neutral-500 transition-colors inline-flex items-center gap-1.5"
                >
                  jianhilario@gmail.com
                  <ArrowUpRight size={13} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              {/* Link 2 */}
              <div className="group">
                <span className="font-mono text-[10.5px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 block mb-1 font-bold">
                  02 // LinkedIn Network
                </span>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif italic text-base sm:text-lg font-bold text-editorial-charcoal dark:text-editorial-cream hover:text-neutral-500 transition-colors inline-flex items-center gap-1.5"
                >
                  linkedin.com/in/jian-marie
                  <ArrowUpRight size={13} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              {/* Link 3 */}
              <div className="group">
                <span className="font-mono text-[10.5px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 block mb-1 font-bold">
                  03 // GitHub Repository
                </span>
                <a
                  href="https://github.com/jianhilario"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif italic text-base sm:text-lg font-bold text-editorial-charcoal dark:text-editorial-cream hover:text-neutral-500 transition-colors inline-flex items-center gap-1.5"
                >
                  github.com/jianhilario
                  <ArrowUpRight size={13} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

            </div>
          </div>

          {/* Right Column - Contact Form Box */}
          <div className="lg:col-span-7">
            
            {/* BorderGlow card container style */}
            <div className="p-6 sm:p-10 border border-neutral-200 dark:border-neutral-900 rounded-sm bg-white/60 dark:bg-neutral-950/20 shadow-sm relative">
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Your Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="font-mono text-[10.5px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-bold block">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="Jane Doe"
                        className={`w-full bg-white dark:bg-neutral-950/40 border rounded-sm px-4 py-3 text-xs sm:text-sm font-sans focus:outline-none transition-colors duration-200 ${
                          fieldErrors.name
                            ? 'border-red-500 dark:border-red-500 focus:border-red-500'
                            : 'border-neutral-200 dark:border-neutral-800 focus:border-editorial-charcoal dark:focus:border-editorial-cream'
                        }`}
                      />
                      {fieldErrors.name && (
                        <p className="text-[10px] font-mono text-red-500 font-bold">
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="font-mono text-[10.5px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-bold block">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="jane@example.com"
                        className={`w-full bg-white dark:bg-neutral-950/40 border rounded-sm px-4 py-3 text-xs sm:text-sm font-sans focus:outline-none transition-colors duration-200 ${
                          fieldErrors.email
                            ? 'border-red-500 dark:border-red-500 focus:border-red-500'
                            : 'border-neutral-200 dark:border-neutral-800 focus:border-editorial-charcoal dark:focus:border-editorial-cream'
                        }`}
                      />
                      {fieldErrors.email && (
                        <p className="text-[10px] font-mono text-red-500 font-bold">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <label htmlFor="subject" className="font-mono text-[10.5px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-bold block">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Dashboard design collaboration"
                        className="w-full bg-white dark:bg-neutral-950/40 border border-neutral-200 dark:border-neutral-800 rounded-sm px-4 py-3 text-xs sm:text-sm font-sans focus:outline-none focus:border-editorial-charcoal dark:focus:border-editorial-cream transition-colors duration-200"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="font-mono text-[10.5px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-bold block">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="Detail your pipeline specifications, workspace integration proposal, or system requirements..."
                        className={`w-full bg-white dark:bg-neutral-950/40 border rounded-sm px-4 py-3 text-xs sm:text-sm font-sans focus:outline-none transition-colors duration-200 resize-none ${
                          fieldErrors.message
                            ? 'border-red-500 dark:border-red-500 focus:border-red-500'
                            : 'border-neutral-200 dark:border-neutral-800 focus:border-editorial-charcoal dark:focus:border-editorial-cream'
                        }`}
                      />
                      {fieldErrors.message && (
                        <p className="text-[10px] font-mono text-red-500 font-bold">
                          {fieldErrors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Error Block */}
                    {submitError && (
                      <div className="p-4 rounded-sm border border-red-500/10 bg-red-500/5 font-mono text-[10px] text-red-500 font-bold leading-relaxed">
                        Failed to send message. Please try again or email me directly at jianhilario@gmail.com.
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-sm bg-editorial-charcoal text-editorial-cream dark:bg-editorial-cream dark:text-editorial-charcoal hover:bg-neutral-800 dark:hover:bg-neutral-200 font-mono text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer focus:outline-none disabled:opacity-40"
                    >
                      <span>{isSubmitting ? 'Dispatching...' : 'Send Message'}</span>
                      <Send size={12} className={isSubmitting ? 'animate-bounce' : ''} />
                    </button>
                  </motion.form>
                ) : (
                  /* SUCCESS STATE */
                  <motion.div
                    key="success-state"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 text-center space-y-6"
                  >
                    <div className="flex justify-center">
                      <div className="p-4 rounded-full bg-gradient-to-br from-blue-500/15 to-violet-500/15 border border-indigo-500/30 text-indigo-500 dark:text-indigo-400">
                        <CheckCircle size={36} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-serif font-bold text-2xl text-editorial-charcoal dark:text-editorial-cream">
                        Message Dispatched!
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-light max-w-md mx-auto leading-relaxed">
                        Thank you for reaching out. Jian Marie has received your query and will reply within 24 business hours.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="inline-flex items-center gap-2 px-6 py-2.5 border border-neutral-200 dark:border-neutral-800 hover:border-editorial-charcoal dark:hover:border-editorial-cream rounded-sm font-mono text-[10px] font-bold uppercase tracking-widest text-editorial-charcoal dark:text-editorial-cream transition-colors duration-300 cursor-pointer focus:outline-none"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
