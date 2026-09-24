import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (value.length > 100) return 'Name must be 100 characters or fewer';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Enter a valid email address';
        return '';
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        if (value.length > 5000) return 'Message must be 5000 characters or fewer';
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return; // block double submits

    // Validate all fields
    const errors: Record<string, string> = {};
    (['name', 'email', 'message'] as const).forEach((field) => {
      const msg = validateField(field, formData[field]);
      if (msg) errors[field] = msg;
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      // Move focus to the first field that needs attention
      const firstInvalid = (['name', 'email', 'message'] as const).find((f) => errors[f]);
      if (firstInvalid) formRef.current?.querySelector<HTMLElement>(`#${firstInvalid}`)?.focus();
      return;
    }

    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      setSubmitError("You appear to be offline. Your message is still here. Reconnect and try again.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
      website: String(form.get('website') || ''), // honeypot, left empty by real visitors
    };

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
      .then(async (res) => {
        let data: { success?: boolean; sent?: boolean; errors?: string[]; error?: string } = {};
        try {
          data = await res.json();
        } catch {
          // Non-JSON response (for example the API is not deployed)
        }
        if (res.status === 400 && data.errors?.length) {
          throw new Error(data.errors[0]);
        }
        if (res.status === 429) {
          throw new Error('Too many messages in a short time. Please wait a few minutes, or email me directly.');
        }
        if (!res.ok || !data.success || data.sent === false) {
          throw new Error('The message could not be delivered.');
        }
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setFieldErrors({});
      })
      .catch((err: Error) => {
        setSubmitError(
          err.name === 'AbortError'
            ? 'The request timed out. Your message is still here. Please try again.'
            : err.message || 'The message could not be sent.'
        );
      })
      .finally(() => {
        window.clearTimeout(timeout);
        setIsSubmitting(false);
      });
  };

  return (
    <section id="contact" className="py-24 px-6 sm:px-10 lg:px-16 border-t border-neutral-300 bg-editorial-cream text-left">
      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Contact Details */}
          <div className="lg:col-span-5 space-y-8 sticky lg:top-24">
            <div>
              <h2 className="font-serif font-medium tracking-tight text-4xl sm:text-5xl text-editorial-charcoal mb-4">
                Let&apos;s build something reliable.
              </h2>
              <p className="font-sans text-base leading-relaxed text-neutral-600">
                I&apos;m open to QA, full-stack and UI/UX roles. If you have a product to ship, or one that needs testing, let&apos;s talk.
              </p>
            </div>

            {/* Direct Contact Links */}
            <div className="border-t border-neutral-300 pt-8 space-y-6">
              
              {/* Link 1 */}
              <div className="group">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-600 block mb-1 font-bold">
                  Email
                </span>
                <a
                  href="mailto:jianhilario@gmail.com"
                  className="min-h-[44px] inline-flex items-center font-serif italic text-base sm:text-lg font-bold text-editorial-charcoal hover:text-neutral-600 transition-colors inline-flex items-center gap-1.5"
                >
                  jianhilario@gmail.com
                  <ArrowUpRight size={13} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              {/* Link 2 */}
              <div className="group">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-600 block mb-1 font-bold">
                  LinkedIn
                </span>
                <a
                  href="https://www.linkedin.com/in/jian-marie-hilario"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center font-serif italic text-base sm:text-lg font-bold text-editorial-charcoal hover:text-neutral-600 transition-colors inline-flex items-center gap-1.5"
                >
                  linkedin.com/in/jian-marie-hilario
                  <ArrowUpRight size={13} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              {/* Link 3 */}
              <div className="group">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-600 block mb-1 font-bold">
                  GitHub
                </span>
                <a
                  href="https://github.com/jianhilario"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center font-serif italic text-base sm:text-lg font-bold text-editorial-charcoal hover:text-neutral-600 transition-colors inline-flex items-center gap-1.5"
                >
                  github.com/jianhilario
                  <ArrowUpRight size={13} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

            </div>
          </div>

          {/* Right Column - Contact Form Box */}
          <div className="lg:col-span-7">
            
            <div className="p-6 sm:p-10 border border-neutral-300 rounded-sm bg-white/60 shadow-sm relative">
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    ref={formRef}
                    noValidate
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Your Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="font-mono text-xs uppercase tracking-widest text-neutral-600 font-bold block">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        autoComplete="name"
                        maxLength={100}
                        aria-required="true"
                        aria-invalid={fieldErrors.name ? 'true' : 'false'}
                        aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                        placeholder="Jane Doe"
                        className={`min-touch-wide w-full bg-white border rounded-sm px-4 text-base font-sans focus:outline-none transition-colors duration-200 ${
                          fieldErrors.name
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-neutral-300 focus:border-editorial-charcoal '
                        }`}
                      />
                      {fieldErrors.name && (
                        <p id="name-error" role="alert" className="text-xs font-mono text-red-500 font-bold">
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-neutral-600 font-bold block">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        autoComplete="email"
                        maxLength={254}
                        aria-required="true"
                        aria-invalid={fieldErrors.email ? 'true' : 'false'}
                        aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                        placeholder="jane@example.com"
                        className={`min-touch-wide w-full bg-white border rounded-sm px-4 text-base font-sans focus:outline-none transition-colors duration-200 ${
                          fieldErrors.email
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-neutral-300 focus:border-editorial-charcoal '
                        }`}
                      />
                      {fieldErrors.email && (
                        <p id="email-error" role="alert" className="text-xs font-mono text-red-500 font-bold">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <label htmlFor="subject" className="font-mono text-xs uppercase tracking-widest text-neutral-600 font-bold block">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        maxLength={150}
                        placeholder="QA analyst role at your company"
                        className="min-touch-wide w-full bg-white border border-neutral-300 rounded-sm px-4 text-base font-sans focus:outline-none focus:border-editorial-charcoal transition-colors duration-200"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-neutral-600 font-bold block">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        maxLength={5000}
                        aria-required="true"
                        aria-invalid={fieldErrors.message ? 'true' : 'false'}
                        aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                        placeholder="Tell me about the role or project you have in mind."
                        className={`min-touch-wide w-full bg-white border rounded-sm px-4 text-base font-sans focus:outline-none transition-colors duration-200 resize-none ${
                          fieldErrors.message
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-neutral-300 focus:border-editorial-charcoal '
                        }`}
                      />
                      {fieldErrors.message && (
                        <p id="message-error" role="alert" className="text-xs font-mono text-red-500 font-bold">
                          {fieldErrors.message}
                        </p>
                      )}
                    </div>

                    {/* Honeypot: hidden from people and assistive tech, bots fill it */}
                    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                      <label htmlFor="website">Website</label>
                      <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                    </div>

                    {/* Submit Error Block */}
                    {submitError && (
                      <div role="alert" className="p-4 rounded-sm border border-red-500/20 bg-red-500/5 font-mono text-xs text-red-700 font-bold leading-relaxed">
                        {submitError}{' '}
                        <a href="mailto:jianhilario@gmail.com" className="min-h-[44px] inline-flex items-center underline underline-offset-2">
                          Email jianhilario@gmail.com
                        </a>{' '}
                        if it keeps failing.
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                      className="min-touch-wide w-full px-6 rounded-sm bg-editorial-charcoal text-editorial-cream hover:bg-neutral-800 font-mono text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer focus:outline-none disabled:opacity-40"
                    >
                      <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                      <Send size={12} />
                    </button>
                  </motion.form>
                ) : (
                  /* SUCCESS STATE */
                  <motion.div
                    key="success-state"
                    role="status"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 text-center space-y-6"
                  >
                    <div className="flex justify-center">
                      <div className="p-4 rounded-full bg-editorial-panel border border-neutral-400 text-editorial-charcoal ">
                        <CheckCircle size={36} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-serif font-bold text-2xl text-editorial-charcoal ">
                        Message sent
                      </h3>
                      <p className="font-sans text-sm sm:text-base text-neutral-600 font-normal max-w-md mx-auto leading-relaxed">
                        Thanks for reaching out. Your message has been sent to Jian Marie.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="min-touch-wide inline-flex items-center gap-2 px-6 border border-neutral-300 hover:border-editorial-charcoal rounded-sm font-mono text-xs font-bold uppercase tracking-widest text-editorial-charcoal transition-colors duration-300 cursor-pointer focus:outline-none"
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
