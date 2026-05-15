import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'

function SolutionsPage() {
  const solutions = [
    {
      title: 'For Startups',
      desc: 'Scale your team without the complexity. Simple pricing, powerful features.',
      features: ['Up to 50 employees', 'Core HR features', 'Email support'],
      delay: '0s',
    },
    {
      title: 'For scale-ups',
      desc: 'Enterprise-grade capabilities for growing organizations.',
      features: ['Unlimited employees', 'Advanced analytics', 'Priority support'],
      delay: '0.1s',
    },
    {
      title: 'For Enterprise',
      desc: 'Custom solutions for large organizations with specific needs.',
      features: ['Custom integrations', 'Dedicated success manager', 'SLA guarantee'],
      delay: '0.2s',
    },
  ]

  return (
    <PageTransition>
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
            Built for every <span className="text-blue-600 dark:text-blue-400">stage of growth</span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Whether you&apos;re a 5-person startup or a 5,000-person enterprise, we have the right solution for you.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {solutions.map((s, i) => (
            <div
              key={s.title}
              className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group animate-slide-up"
              style={{ animationDelay: `${0.2 + i * 0.1}s` }}
            >
              <div className="h-1 bg-blue-600 group-hover:bg-blue-500 transition-colors" />
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{s.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">{s.desc}</p>
                <ul className="space-y-2 mb-8">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                      <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all"
                >
                  Learn more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-16 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-6">Not sure which plan is right for you?</p>
          <Link to="/contact" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline">
            Talk to our team
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </PageTransition>
  )
}

export default SolutionsPage
