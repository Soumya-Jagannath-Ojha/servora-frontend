import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'

function AboutPage() {
  const values = [
    { title: 'Innovation', desc: 'We push boundaries to deliver cutting-edge HR solutions.', icon: '💡' },
    { title: 'Integrity', desc: 'Trust and transparency guide everything we do.', icon: '🛡️' },
    { title: 'Impact', desc: 'We measure success by the growth of our customers.', icon: '🚀' },
  ]

  const team = [
    { name: 'Sarah Chen', role: 'CEO & Co-founder' },
    { name: 'Marcus Johnson', role: 'CTO' },
    { name: 'Elena Rodriguez', role: 'Head of Product' },
  ]

  return (
    <PageTransition>
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
            Building the future of <span className="text-blue-600 dark:text-blue-400">workforce management</span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Founded in 2020, HRMS was born from a simple idea: HR software should be intuitive, powerful, and delightful to use. We&apos;re on a mission to empower every organization with tools that make people management effortless.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-20">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-white/10 p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all animate-slide-up"
              style={{ animationDelay: `${0.2 + i * 0.1}s` }}
            >
              <div className="text-3xl mb-4">{v.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{v.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-12">Our leadership</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((t, i) => (
              <div
                key={t.name}
                className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-white/10 p-8 text-center shadow-sm hover:shadow-lg transition-all animate-slide-up"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                  {t.name.charAt(0)}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{t.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 text-sm">{t.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-20 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-500/25 transition-all"
          >
            Get in touch
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </PageTransition>
  )
}

export default AboutPage
