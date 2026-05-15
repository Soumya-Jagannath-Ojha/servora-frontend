import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'

function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: '$0',
      period: 'forever',
      desc: 'Perfect for small teams getting started',
      features: ['Up to 10 employees', 'Basic attendance', 'Leave management', 'Email support'],
      cta: 'Start free',
      popular: false,
    },
    {
      name: 'Professional',
      price: '$49',
      period: '/month',
      desc: 'For growing teams that need more',
      features: ['Up to 100 employees', 'Advanced analytics', 'Payroll management', 'Priority support', 'API access'],
      cta: 'Start trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      desc: 'For large organizations',
      features: ['Unlimited employees', 'Custom integrations', 'Dedicated support', 'SLA guarantee', 'On-premise option'],
      cta: 'Contact sales',
      popular: false,
    },
  ]

  return (
    <PageTransition>
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
            Simple, transparent <span className="text-blue-600 dark:text-blue-400">pricing</span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            No hidden fees. Start free and scale as you grow.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative bg-white dark:bg-gray-800/80 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1 animate-slide-up ${
                plan.popular
                  ? 'border-blue-500 shadow-lg shadow-blue-500/10'
                  : 'border-gray-200/80 dark:border-white/10 shadow-sm'
              }`}
              style={{ animationDelay: `${0.2 + i * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white text-sm font-medium">
                  Most popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                  <span className="text-gray-500 dark:text-gray-400">{plan.period}</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">{plan.desc}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
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
                  className={`block w-full py-4 rounded-xl text-center font-semibold transition-all ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25'
                      : 'border-2 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto mt-16 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </section>
    </PageTransition>
  )
}

export default PricingPage
