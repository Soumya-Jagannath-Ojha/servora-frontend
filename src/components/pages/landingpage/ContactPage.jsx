import { useState } from 'react'
import PageTransition from '../../animation/PageTransition'

function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const contactMethods = [
    { icon: '📧', label: 'Email', value: 'hello@hrms.io' },
    { icon: '📞', label: 'Phone', value: '+1 (555) 123-4567' },
    { icon: '📍', label: 'Office', value: '123 Innovation Blvd, San Francisco' },
  ]

  return (
    <PageTransition>
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
            Let&apos;s <span className="text-blue-600 dark:text-blue-400">connect</span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {contactMethods.map((m) => (
              <div
                key={m.label}
                className="flex items-center gap-4 p-6 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-200/80 dark:border-white/10 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-2xl">
                  {m.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{m.label}</p>
                  <p className="font-medium text-gray-900 dark:text-white">{m.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="p-8 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-200/80 dark:border-white/10 shadow-sm animate-slide-up"
            style={{ animationDelay: '0.3s' }}
          >
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-2xl text-emerald-600 dark:text-emerald-400 mb-4">✓</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Message sent!</h3>
                <p className="text-gray-500 dark:text-gray-400">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Message</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
                    placeholder="Tell us about your needs..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-500/25 transition-all"
                >
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default ContactPage
