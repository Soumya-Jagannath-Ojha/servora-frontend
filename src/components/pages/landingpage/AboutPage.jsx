import { Link } from 'react-router-dom'
import PageTransition from "../../animation/PageTransition";

function AboutPage() {
  const values = [
    { title: 'Innovation', desc: 'We push boundaries to deliver cutting-edge HR solutions.', icon: '💡' },
    { title: 'Integrity', desc: 'Trust and transparency guide everything we do.', icon: '🛡️' },
    { title: 'Impact', desc: 'We measure success by the growth of our customers.', icon: '🚀' },
  ]

  const testimonialsRow1 = [
    {
      name: 'Subhashree Sahoo',
      role: 'UI/UX Designer',
      quote: 'Exceeded our expectations with innovative designs that brought our vision to life - a truly remarkable creative agency.',
      avatar: 'SS'
    },
    {
      name: 'Bramhananda Swain',
      role: 'Android Developer',
      quote: 'Their ability to capture our brand essence in every project is unparalleled - an invaluable creative collaborator.',
      avatar: 'BS'
    },
    {
      name: 'Mukkala Vaishno Reddy',
      role: 'DevOps Engineer',
      quote: 'Creative geniuses who listen, understand, and craft captivating visuals - an agency that truly understands our needs.',
      avatar: 'MVR'
    },
    {
      name: 'Spandan Swain',
      role: 'Data Analyst',
      quote: 'Creative geniuses who listen, understand, and craft captivating visuals - an agency that truly understands our needs.',
      avatar: 'SS'
    }

  ];

  const testimonialsRow2 = [
    {
      name: 'Swatish Choudhury',
      role: 'Backend Developer',
      quote: 'Their team\'s artistic flair and strategic approach resulted in remarkable campaigns - a reliable creative partner.',
      avatar: 'SC'
    },
    {
      name: 'Rohit ',
      role: 'Full Stack Developer',
      quote: 'From concept to execution, their creativity knows no bounds - a game-changer for our brand\'s success.',
      avatar: 'RR'
    },
    {
      name: 'Swagatika Sahoo',
      role: 'Project Consultant',
      quote: 'Exceptional visual design coupled with lightning-fast turnaround. They have elevated our brand identity to a whole new level.',
      avatar: 'SS'
    },
    {
      name: 'Soumya Ranjan Khuntia',
      role: 'Salesforce Developer',
      quote: 'A masterpiece of development and styling. Our conversion rate increased significantly after deployment.',
      avatar: 'SRK'
    }
  ];

  return (
    <PageTransition>
      <section className="py-16 sm:py-24 px-4 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
            Building the future of <span className="text-blue-600 dark:text-blue-400">project management</span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Founded in 2026, PMMS was born from a simple idea: project management software should be intuitive, powerful, and delightful to use. We&apos;re on a mission to empower every organization with tools that make project management effortless.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-24">
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

        {/* Testimonials Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 mb-4 animate-scale-in">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-tight max-w-2xl">
            Real feedback from the community on our impact. 
          </h2>
        </div>

        {/* Sliding Testimonials Container */}
        <div className="space-y-6 relative w-full select-none">
          {/* Left & Right Fade Gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-[#f8f9fa] to-transparent dark:from-[#0b0a19] z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-[#f8f9fa] to-transparent dark:from-[#0b0a19] z-20 pointer-events-none" />

          {/* Row 1: Sliding Left */}
          <div className="relative overflow-hidden w-full flex">
            <div className="animate-marquee-left flex gap-6 hover:[animation-play-state:paused]">
              {[...testimonialsRow1, ...testimonialsRow1].map((t, idx) => (
                <div
                  key={idx}
                  className="w-[360px] shrink-0 bg-slate-100 dark:bg-gray-800/40 rounded-3xl border border-gray-100 dark:border-white/5 p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="text-blue-500 dark:text-blue-400 text-5xl font-serif leading-none block h-5">&ldquo;</span>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {t.quote}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-white/5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white font-black flex items-center justify-center text-xs shadow-md shrink-0">
                      {t.avatar}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm truncate">{t.name}</h4>
                      <p className="text-[10px] text-gray-400 font-bold mt-0.5 truncate">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Sliding Right */}
          <div className="relative overflow-hidden w-full flex">
            <div className="animate-marquee-right flex gap-6 hover:[animation-play-state:paused]">
              {[...testimonialsRow2, ...testimonialsRow2].map((t, idx) => (
                <div
                  key={idx}
                  className="w-[360px] shrink-0 bg-slate-100 dark:bg-gray-800/40 rounded-3xl border border-gray-100 dark:border-white/5 p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="text-blue-500 dark:text-blue-400 text-5xl font-serif leading-none block h-5">&ldquo;</span>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {t.quote}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-white/5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white font-black flex items-center justify-center text-xs shadow-md shrink-0">
                      {t.avatar}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm truncate">{t.name}</h4>
                      <p className="text-[10px] text-gray-400 font-bold mt-0.5 truncate">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
