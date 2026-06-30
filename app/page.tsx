'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

// A robust React hook for scroll-reveal entrance animations
function useIntersectionObserver(ref: React.RefObject<Element | null>) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return isIntersecting;
}

const services = [
  {
    title: 'Sécurité Physique',
    description: 'La sécurité physique englobe les mesures et les pratiques visant à protéger vos actifs matériels, vos infrastructures et vos équipes.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: 'Surveillance GPS',
    description: 'La technologie de suivi et surveillance GPS permet une géolocalisation en temps réel de vos véhicules et une intervention rapide.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    title: 'Sécurité Résidentielle',
    description: 'Des solutions de protection et de surveillance avancées pour sécuriser votre domicile et garantir le bien-être de ses occupants.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    title: 'Audit & Conseil',
    description: 'Bénéficiez d’une évaluation personnalisée de vos risques et de plans d’action de sécurité sur mesure.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    )
  },
  {
    title: 'Sécurité de Bureaux',
    description: 'Mesures de sécurité indispensables pour protéger vos employés, vos infrastructures et vos données professionnelles sensibles.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    title: 'Protection Rapprochée',
    description: 'Des agents hautement qualifiés pour assurer une protection rapprochée et discrète aux dirigeants, VIP et personnalités.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )
  }
];

const testimonials = [
  { quote: 'Congo Shield Security nous a donné une tranquillité totale pendant nos événements les plus sensibles.', author: 'Directrice opérationnelle' },
  { quote: 'La précision et l’écoute de leur équipe font toute la différence dans nos opérations.', author: 'Manager sécurité' }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);

  const aboutRef = useRef<HTMLDivElement | null>(null);
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const solutionsRef = useRef<HTMLDivElement | null>(null);

  const aboutVisible = useIntersectionObserver(aboutRef);
  const servicesVisible = useIntersectionObserver(servicesRef);
  const solutionsVisible = useIntersectionObserver(solutionsRef);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from('.hero-animate-title', { opacity: 0, y: 50, duration: 1, ease: 'power3.out' });
      gsap.from('.hero-animate-text', { opacity: 0, y: 30, duration: 1, delay: 0.2, ease: 'power3.out' });
      gsap.from('.hero-animate-btn', { opacity: 0, y: 20, duration: 0.8, delay: 0.4, ease: 'power3.out' });
      gsap.from('.hero-animate-img', { opacity: 0, scale: 0.95, x: 50, duration: 1.2, ease: 'power3.out' });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#d59f1f]/30 selection:text-white">
      {/* Top Utility Bar */}
      <div className="bg-[#090d16] text-slate-400 text-xs py-3 border-b border-slate-900">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 hover:text-white transition">
              <svg className="h-4 w-4 text-[#d59f1f]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              contact@cs-securite.com
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-[#d59f1f]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Ouvert : Lun - Sam 8:00 - 18:00
            </span>
            <span className="flex items-center gap-1.5 hover:text-white transition md:inline-flex hidden">
              <svg className="h-4 w-4 text-[#d59f1f]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (+242) 06 625 58 68 / 04 406 25 79
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Suivez-nous :</span>
            <a href="#" className="hover:text-white transition" aria-label="Facebook">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
            </a>
            <a href="#" className="hover:text-white transition" aria-label="Twitter">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
            </a>
            <a href="#" className="hover:text-white transition" aria-label="LinkedIn">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header & Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
        <div className="container h-[76px] flex items-center justify-between">
          <a href="#" className="flex items-center">
            <Image src="/logo-eagle.png" alt="Congo Shield Security" width={220} height={56} className="object-contain h-12 w-auto" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#home" className="hover:text-[#d59f1f] transition">Accueil</a>
            <a href="#about" className="hover:text-[#d59f1f] transition">À Propos</a>
            <a href="#services" className="hover:text-[#d59f1f] transition">Nos Services</a>
            <a href="#solutions" className="hover:text-[#d59f1f] transition">Solutions</a>
            <a href="#contact" className="hover:text-[#d59f1f] transition">Contactez-nous</a>
          </nav>

          {/* Phone Badge & Login */}
          <div className="flex items-center gap-6">
            <a href="tel:+242066255868" className="hidden sm:flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d59f1f]/10 text-[#d59f1f] transition hover:bg-[#d59f1f]/20">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span className="text-sm font-bold text-slate-800 hover:text-[#d59f1f] transition">(+242) 06 625 58 68</span>
            </a>
            <a href="#contact" className="btn-active-state bg-[#d59f1f] hover:bg-[#b78414] text-white text-sm font-bold px-6 py-3 rounded-full shadow-lg shadow-[#d59f1f]/25 transition duration-300">
              Contact
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative bg-[#090d16] text-white pt-20 pb-32 md:pb-48 overflow-hidden min-h-[90vh] flex items-center">
        {/* Absolute Right-aligned Image */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[50%] h-full z-0 lg:block hidden">
          <div className="relative w-full h-full hero-animate-img">
            <Image
              src="/2.jpeg"
              alt="Congo Shield Security Guard"
              fill
              priority
              className="object-cover object-[center_10%]"
            />
            {/* Ambient shadows/gradients to blend the image seamlessly */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#090d16] to-transparent z-10" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#090d16] to-transparent z-10" />
          </div>
        </div>

        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          {/* Left Column Text */}
          <div className="space-y-6 max-w-2xl lg:col-span-7">
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.15] tracking-tight text-white hero-animate-title">
              Services de <span className="text-[#d59f1f]">Sécurité</span> Globale <br className="hidden md:inline" />
              Pour Particuliers et Entreprises
            </h1>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-xl hero-animate-text">
              Congo Shield Security protège vos locaux professionnels, vos résidences et vos événements avec un professionnalisme rigoureux. Nos agents d'élite interviennent sur tous types de sites pour vous garantir une sécurité absolue.
            </p>
            <div className="hero-animate-btn">
              <a href="#contact" className="btn-active-state inline-block bg-[#d59f1f] hover:bg-[#b78414] text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-[#d59f1f]/30 transition duration-300">
                Nous contacter
              </a>
            </div>
          </div>

          {/* Right Column Image for Mobile only */}
          <div className="relative lg:hidden block w-full max-w-[480px] mx-auto aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl z-10 hero-animate-img">
            <Image
              src="/2.jpeg"
              alt="Congo Shield Security Guard"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* Bottom Curved Mask */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-20">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[48px] md:h-[90px] fill-white">
            <path d="M0,40 C360,110 1080,10 1440,50 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" ref={aboutRef} className="py-24 bg-white">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column Image Frame */}
          <div className={`flex justify-center transition-all duration-1000 transform ${aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="relative p-3 border border-slate-200 rounded-[2.75rem] inline-block w-full max-w-[500px] shadow-sm bg-slate-50">
              <div className="overflow-hidden rounded-[2.25rem] border border-slate-900/5 aspect-[4/3] relative">
                <Image
                  src="/1.webp"
                  alt="Congo Shield Security Officers"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column Content */}
          <div className={`space-y-6 max-w-xl transition-all duration-1000 delay-200 transform ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 leading-tight">
              Nous veillons constamment sur votre famille et votre entreprise
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              La mise en place de mesures de sécurité adaptées garantit votre tranquillité d’esprit et protège vos proches et vos biens contre toute menace.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-slate-800 font-semibold">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#d59f1f]/10 text-[#d59f1f]">
                  ✓
                </span>
                Services de sécurité personnelle
              </li>
              <li className="flex items-center gap-3 text-slate-800 font-semibold">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#d59f1f]/10 text-[#d59f1f]">
                  ✓
                </span>
                Sécurité pour entreprises
              </li>
            </ul>
            <div className="pt-2">
              <a href="#solutions" className="btn-active-state inline-block bg-[#d59f1f] hover:bg-[#b78414] text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-[#d59f1f]/20 transition duration-300">
                En savoir plus
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950">
              Nos services optimisent votre productivité en toute sécurité
            </h2>
            <p className="text-slate-600 text-base">
              Il est essentiel de prioriser la protection de vos collaborateurs et de vos installations.
            </p>
          </div>

          <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-[2rem] border border-slate-900/5 bg-[#0d1527] p-8 text-white transition-all duration-700 transform ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Accent Background Glow */}
                <div className="absolute -right-16 -top-16 w-32 h-32 bg-[#d59f1f]/5 rounded-full blur-2xl group-hover:bg-[#d59f1f]/10 transition-all duration-300" />

                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#d59f1f]/20 bg-[#d59f1f]/10 text-[#d59f1f] group-hover:bg-[#d59f1f] group-hover:text-white transition-all duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold mb-3">{service.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition duration-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customized Solutions Section */}
      <section id="solutions" className="py-24 bg-white">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column Text */}
          <div ref={solutionsRef} className={`space-y-6 max-w-xl transition-all duration-1000 transform ${solutionsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 leading-tight">
              Des solutions sur mesure pour protéger vos équipes et vos opérations
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Congo Shield Security propose des solutions adaptées à vos besoins et à votre budget. Forts de notre expertise, nous garantisons une protection optimale au quotidien.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 pt-2">
              <div className="rounded-3xl border border-slate-100 bg-slate-50/50 p-6">
                <span className="text-sm font-extrabold uppercase tracking-wider text-[#d59f1f] block mb-2">
                  Action Rapide
                </span>
                <p className="text-sm text-slate-500">Réponse immédiate aux alertes et interventions d’urgence sur le terrain.</p>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-slate-50/50 p-6">
                <span className="text-sm font-extrabold uppercase tracking-wider text-[#d59f1f] block mb-2">
                  Veille Constante
                </span>
                <p className="text-sm text-slate-500">Surveillance intelligente et humaine 24/7 pour anticiper les menaces.</p>
              </div>
            </div>
          </div>

          {/* Right Column Image */}
          <div className={`flex justify-center transition-all duration-1000 delay-200 transform ${solutionsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="relative p-3 border border-slate-200 rounded-[2.75rem] inline-block w-full max-w-[500px] shadow-sm bg-slate-50">
              <div className="overflow-hidden rounded-[2.25rem] border border-slate-900/5 aspect-[4/3] relative">
                <Image
                  src="/3.png"
                  alt="Custom Security Solutions Agent"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-slate-50 border-t border-slate-100 py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="space-y-4">
              <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#d59f1f] block">
                Témoignages
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950">
                Ce que disent nos clients
              </h2>
              <p className="text-slate-600 max-w-md">
                Découvrez les retours d’expérience de nos partenaires qui nous font confiance pour la sécurisation de leurs locaux et de leurs équipes.
              </p>
            </div>
            <div className="grid gap-6">
              {testimonials.map((item, idx) => (
                <div key={idx} className="rounded-3xl bg-white border border-slate-100 p-8 shadow-sm hover:shadow-md transition">
                  <div className="text-slate-500 text-4xl leading-none font-serif text-[#d59f1f] mb-2">“</div>
                  <p className="text-base text-slate-700 italic mb-4">
                    {item.quote}
                  </p>
                  <p className="text-sm font-bold text-slate-900">
                    — {item.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="space-y-6">
              <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#d59f1f] block">
                Prêt à sécuriser votre avenir ?
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950">
                Parlons de votre sécurité dès aujourd’hui.
              </h2>
              <p className="text-slate-600 leading-relaxed max-w-md">
                Contactez-nous pour une étude gratuite et une stratégie de protection adaptée à vos besoins spécifiques.
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d59f1f]/10 text-[#d59f1f]">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Téléphone</p>
                    <p className="text-sm font-bold text-slate-950">(+242) 06 625 58 68 / 04 406 25 79</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d59f1f]/10 text-[#d59f1f]">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Email</p>
                    <p className="text-sm font-bold text-slate-950">contact@cs-securite.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d59f1f]/10 text-[#d59f1f]">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Siège Social</p>
                    <p className="text-sm font-bold text-slate-950">250 V Case Sonaco Moukondo Mazala, Brazzaville</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-100 bg-slate-50/50 p-8 md:p-10 shadow-xl shadow-slate-100/40">
              <h3 className="text-lg font-bold mb-6 text-slate-900">Demander une étude gratuite</h3>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase text-slate-500 mb-2">Nom Complet</label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Votre nom"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#d59f1f] focus:outline-none transition"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase text-slate-500 mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="adresse@mail.com"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#d59f1f] focus:outline-none transition"
                  />
                </div>
                <div>
                  <label htmlFor="msg" className="block text-xs font-bold uppercase text-slate-500 mb-2">Message</label>
                  <textarea
                    id="msg"
                    rows={4}
                    required
                    placeholder="Décrivez vos besoins de sécurité..."
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#d59f1f] focus:outline-none transition"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-active-state w-full bg-[#d59f1f] hover:bg-[#b78414] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#d59f1f]/20 transition duration-300"
                >
                  Envoyer ma demande
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#090d16] text-slate-500 text-sm py-12 border-t border-slate-900">
        <div className="container flex flex-col sm:flex-row justify-between items-center gap-4">
          <Image src="/logo-eagle.png" alt="Congo Shield Security" width={160} height={42} className="object-contain opacity-50 filter brightness-200" />
          <div className="text-center sm:text-right text-xs space-y-1 text-slate-400">
            <p className="font-bold text-slate-300">© 2026 Congo Shield Security — Votre sécurité, notre priorité.</p>
            <p>Siège social : 250 V Case Sonaco Moukondo Mazala, Brazzaville</p>
            <p>RCCM : CG/BZV/14A17862 | Tél : (+242) 06 625 58 68 / 04 406 25 79 | E-mail : contact@cs-securite.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
