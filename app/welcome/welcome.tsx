import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRight, Play, Info, Globe, ChevronDown } from 'lucide-react';
import LandingNavbar from '~/components/navBar';

const Welcome = () => {
  const [email, setEmail] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqs = [
    {
      question: "What is StreamFlix?",
      answer: "StreamFlix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices."
    },
    {
      question: "How much does StreamFlix cost?",
      answer: "Watch StreamFlix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $6.99 to $19.99 a month. No extra costs, no contracts."
    },
    {
      question: "Where can I watch?",
      answer: "Watch anywhere, anytime. Sign in with your StreamFlix account to watch instantly on the web at streamflix.com from your personal computer or on any internet-connected device."
    },
    {
      question: "How do I cancel?",
      answer: "StreamFlix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime."
    }
  ];

  const features = [
    {
      title: "Enjoy on your TV",
      description: "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
      image: "📺"
    },
    {
      title: "Download your shows",
      description: "Save your favorites easily and always have something to watch.",
      image: "⬇️"
    },
    {
      title: "Watch everywhere",
      description: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
      image: "🌍"
    },
    {
      title: "Create profiles for kids",
      description: "Send kids on adventures with their favorite characters in a space made just for them—free with your membership.",
      image: "👶"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <LandingNavbar />
      {/* Hero Section */}
      <section className="relative h-[90vh] sm:h-screen flex items-center justify-center overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-black to-black">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight" style={{ fontFamily: '"Bebas Neue", cursive', animationDelay: '0.1s' }}>
            Unlimited movies, TV shows, and more
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-medium opacity-90" style={{ animationDelay: '0.2s' }}>
            Watch anywhere. Cancel anytime.
          </p>
          <p className="text-base sm:text-lg md:text-xl opacity-80" style={{ animationDelay: '0.3s' }}>
            Ready to watch? Enter your email to create or restart your membership.
          </p>

          {/* Email CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-2xl mx-auto pt-4" style={{ animationDelay: '0.4s' }}>
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 sm:h-16 px-6 text-base sm:text-lg bg-black/50 border-white/30 text-white placeholder:text-gray-400 flex-1 w-full sm:w-auto rounded-md backdrop-blur"
            />
            <Button className="h-14 sm:h-16 px-6 sm:px-8 bg-red-600 hover:bg-red-700 text-white text-lg sm:text-xl font-semibold flex items-center gap-2 w-full sm:w-auto rounded-md">
              Get Started
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 opacity-50" />
        </div>
      </section>

      {/* Separator */}
      <div className="h-2 bg-gradient-to-r from-red-600/20 via-red-600 to-red-600/20"></div>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16 py-12 md:py-20 border-b border-gray-800 last:border-b-0`}
            >
              <div className="flex-1 text-center md:text-left space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black" style={{ fontFamily: '"Bebas Neue", cursive' }}>
                  {feature.title}
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-300">
                  {feature.description}
                </p>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="text-8xl sm:text-9xl md:text-[180px] opacity-80 transform hover:scale-110 transition-transform duration-500">
                  {feature.image}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-8 sm:mb-12" style={{ fontFamily: '"Bebas Neue", cursive' }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-900 hover:bg-gray-800 transition-colors">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 sm:py-6 flex items-center justify-between text-left"
                >
                  <span className="text-lg sm:text-xl md:text-2xl font-semibold pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-96' : 'max-h-0'}`}
                >
                  <div className="px-6 pb-6 text-base sm:text-lg md:text-xl text-gray-300">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12 space-y-4">
            <p className="text-base sm:text-lg md:text-xl">
              Ready to watch? Enter your email to create or restart your membership.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-2xl mx-auto">
              <Input
                type="email"
                placeholder="Email address"
                className="h-14 sm:h-16 px-6 text-base sm:text-lg bg-black/50 border-white/30 text-white placeholder:text-gray-400 flex-1 w-full sm:w-auto rounded-md"
              />
              <Button className="h-14 sm:h-16 px-6 sm:px-8 bg-red-600 hover:bg-red-700 text-white text-lg sm:text-xl font-semibold flex items-center gap-2 w-full sm:w-auto rounded-md">
                Get Started
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-900 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-gray-400 mb-8">
            Questions? Call 1-800-STREAM-1
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400 mb-8">
            <div className="space-y-3">
              <a href="#" className="block hover:underline">FAQ</a>
              <a href="#" className="block hover:underline">Investor Relations</a>
              <a href="#" className="block hover:underline">Privacy</a>
              <a href="#" className="block hover:underline">Speed Test</a>
            </div>
            <div className="space-y-3">
              <a href="#" className="block hover:underline">Help Center</a>
              <a href="#" className="block hover:underline">Jobs</a>
              <a href="#" className="block hover:underline">Cookie Preferences</a>
              <a href="#" className="block hover:underline">Legal Notices</a>
            </div>
            <div className="space-y-3">
              <a href="#" className="block hover:underline">Account</a>
              <a href="#" className="block hover:underline">Ways to Watch</a>
              <a href="#" className="block hover:underline">Corporate Information</a>
              <a href="#" className="block hover:underline">Only on StreamFlix</a>
            </div>
            <div className="space-y-3">
              <a href="#" className="block hover:underline">Media Center</a>
              <a href="#" className="block hover:underline">Terms of Use</a>
              <a href="#" className="block hover:underline">Contact Us</a>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Globe className="w-4 h-4" />
            <select className="bg-transparent border border-gray-700 px-3 py-2 rounded">
              <option>English</option>
              <option>Español</option>
            </select>
          </div>
          <div className="text-sm text-gray-500">
            StreamFlix Kenya
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-fade-in > * {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Welcome;
