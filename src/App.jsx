import React, { useEffect, useRef, useState } from "react";

export default function AfterthinkStudioArchitectureLanding() {
  const whatsappLink = "https://api.whatsapp.com/send/?phone=7507003616&text&type=phone_number&app_absent=0";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // --- NAVBAR SCROLL EFFECT ---
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Navbar height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  // --- STATS COUNTER LOGIC ---
  const statsRef = useRef(null);
  const hasAnimated = useRef(false);
  const [counts, setCounts] = useState([0, 0, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateCounts();
        }
      },
      { threshold: 0.6 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const animateCounts = () => {
    const targets = [220, 12, 98];
    targets.forEach((target, i) => {
      let start = 0;
      const duration = 1200;
      const step = target / (duration / 16);

      const interval = setInterval(() => {
        start += step;
        if (start >= target) {
          start = target;
          clearInterval(interval);
        }

        setCounts((prev) => {
          const updated = [...prev];
          updated[i] = Math.floor(start);
          return updated;
        });
      }, 16);
    });
  };

  // --- PORTFOLIO SLIDER LOGIC ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const projects = [
    { title: "Bedroom", img: "/img/image1.png" },
    { title: "Design", img: "/img/image2.png" },
    { title: "Office Design", img: "/img/image3.png" },
    { title: "Modular Bed", img: "/img/image4.png" },
    { title: "Luxury Hall", img: "/img/image5.png" },
    { title: "Modern Gallery", img: "/img/image7.png" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= projects.length - 3 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 3 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-[#F7FBFF] text-gray-900 font-sans">
      
      {/* --- NAVIGATION BAR --- */}
      <nav className={`fixed -top-2 w-full z-20 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
        <div 
  className="flex items-center cursor-pointer"
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
>
  <img 
    src="/img/logoimage.png" 
    alt="Afterthink Logo"
    className="h-20  w-auto object-contain"
  />
</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['About', 'Projects', 'Testimonials', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-semibold text-gray-700 hover:text-[#3A7BFF] transition-colors"
              >
                {item}
              </button>
            ))}
            <a href={whatsappLink} className="bg-[#3A7BFF] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-blue-200 transition-all no-underline">
              Get Started
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className={`w-6 h-0.5 bg-gray-900 mb-1.5 transition-all ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></div>
            <div className={`w-6 h-0.5 bg-gray-900 mb-1.5 ${isMenuOpen ? "opacity-0" : ""}`}></div>
            <div className={`w-6 h-0.5 bg-gray-900 transition-all ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></div>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 md:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          {['About', 'Projects', 'Testimonials', 'Contact'].map((item) => (
            <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-3xl font-bold text-gray-800">{item}</button>
          ))}
          <button onClick={() => setIsMenuOpen(false)} className="mt-10 w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center">✕</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center text-center px-6 overflow-hidden">
        <img
          src="/img/image9.png"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          alt="Hero background"
        />
        <div className="relative z-10 mt-16">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter animate-fadeUp">
            Designing Spaces <br />
            <span className="text-[#3A7BFF]">That Define You</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium">
            Premium interior design with modern elegance and refined aesthetics for visionary clients.
          </p>
          <div className="mt-12 flex flex-col md:flex-row justify-center gap-5">
            <button onClick={() => scrollToSection('projects')} className="bg-[#3A7BFF] text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition shadow-xl shadow-blue-200">
              Explore Projects
            </button>
            <button onClick={() => scrollToSection('contact')} className="bg-white border border-gray-200 px-10 py-4 rounded-full font-bold hover:bg-gray-50 transition">
              Consultation
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-6 py-32 max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <div className="relative w-full aspect-square bg-[#E3D5C5] rounded-[60px] overflow-hidden shadow-2xl flex items-center justify-center p-12">
             <img 
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7" 
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-20"
              alt="Texture"
            />
            <div className="relative z-10 text-center">
              <h3 className="text-3xl md:text-4xl font-black text-gray-800 leading-none uppercase tracking-tighter">
                Interior Design <br />
                <span className="text-sm font-semibold tracking-widest block mt-4 text-gray-600 opacity-70">
                  MAKING THE BEST USE OF THE AVAILABLE
                </span>
                SPACE
              </h3>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-6 w-1/2 aspect-square rounded-[40px] overflow-hidden border-[12px] border-[#F7FBFF] shadow-2xl hidden md:block">
            <img src="/img/image6.png" className="w-full h-full object-cover" alt="Detail" />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 text-[#3A7BFF] font-bold uppercase text-xs tracking-[0.2em]">
            <span className="w-8 h-[2px] bg-[#3A7BFF]"></span>
            The Studio
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-[0.9]">
            Crafting Luxury <br/>Experiences.
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Afterthink Studio is a multidisciplinary design powerhouse. We specialize in turning cold structures into warm, functional homes and high-performance commercial spaces through thoughtful material selection.
          </p>
          <div className="space-y-4">
            {["Bespoke Furniture Design", "Residential Space Planning", "Commercial Interior Branding"].map((text, i) => (
              <div key={i} className="flex items-center gap-4 py-4 border-b border-gray-100 group cursor-pointer">
                <span className="text-[#3A7BFF] font-black">0{i+1}.</span>
                <span className="font-bold text-gray-800 group-hover:translate-x-2 transition-transform">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO SLIDER */}
      <section id="projects" className="px-6 py-32 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 text-[#3A7BFF] font-bold uppercase text-xs tracking-[0.2em] mb-4">
                <span className="w-8 h-[2px] bg-[#3A7BFF]"></span>
                Portfolio
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-none">
                Recent Work.
              </h2>
            </div>
            
            <div className="flex gap-4">
               <button onClick={prevSlide} className="w-14 h-14 flex items-center justify-center rounded-full border border-gray-200 hover:bg-[#3A7BFF] hover:text-white transition-all shadow-sm">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="rotate-180"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
              <button onClick={nextSlide} className="w-14 h-14 flex items-center justify-center rounded-full border border-gray-200 hover:bg-[#3A7BFF] hover:text-white transition-all shadow-sm">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[50px]">
            <div 
              className="flex gap-6 transition-transform duration-1000 cubic-bezier(0.23, 1, 0.32, 1)"
              style={{ transform: `translateX(-${currentIndex * (window.innerWidth < 768 ? 88 : 34.5)}%)` }} 
            >
              {projects.map((project, i) => (
                <div key={i} className="min-w-[85%] md:min-w-[33%] h-[550px] relative rounded-[50px] overflow-hidden group">
                  <img src={project.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={project.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80"></div>
                  <div className="absolute bottom-12 left-12">
                    <p className="text-[#3A7BFF] text-xs font-black uppercase tracking-widest mb-3">Residential</p>
                    <h3 className="text-white text-3xl font-bold">{project.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="py-32 bg-[#F7FBFF]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          {["Projects Completed", "Years Experience", "Happy Clients"].map((label, i) => (
            <div key={i}>
              <h2 className="text-7xl font-black text-gray-900 tabular-nums">
                {counts[i]}{i === 2 ? "%" : "+"}
              </h2>
              <p className="text-[#3A7BFF] font-bold uppercase tracking-widest mt-4">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="px-6 py-32 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center">
          <div className="relative rounded-[60px] overflow-hidden shadow-2xl h-[600px]">
            <img src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe" className="w-full h-full object-cover" alt="Client Space" />
          </div>

          <div className="flex flex-col gap-10">
            <div>
              <div className="flex items-center gap-3 text-[#3A7BFF] font-bold uppercase text-xs tracking-[0.2em] mb-4">
                <span className="w-8 h-[2px] bg-[#3A7BFF]"></span>
                Reviews
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-none">Voices of <br/>Confidence.</h2>
            </div>

            <div className="bg-[#F7FBFF] p-12 rounded-[50px] border border-gray-100 relative">
              <span className="text-9xl absolute -top-10 left-6 text-[#3A7BFF] opacity-10 font-serif">“</span>
              <p className="text-xl text-gray-600 italic leading-relaxed mb-10 relative z-10">
                "Superior finishes, trendy designs and quality modules at affordable prices. Afterthink Studio made our dream home a reality."
              </p>
              <div>
                <h4 className="font-black text-gray-900 text-2xl">Bapu Nikumbh</h4>
                <p className="text-[#3A7BFF] font-bold text-sm uppercase tracking-widest">Nashik, India</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER / CONTACT */}
      <footer id="contact" className="bg-[#111] text-white pt-32 pb-12 px-6 rounded-t-[80px]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-24">
            <div className="space-y-8">
              <div 
  className="flex items-center cursor-pointer"
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
>
  <img 
    src="/img/logoimage.png" 
    alt="Afterthink Logo"
    className="h-20  w-auto object-contain"
  />
</div>
              <p className="text-gray-400 text-lg">Leading the way in modern Indian architecture and interior luxury.</p>
              <div className="flex gap-4">
                {['instagram', 'linkedin', 'facebook'].map(s => (
                  <div key={s} className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center hover:bg-[#3A7BFF] hover:border-[#3A7BFF] transition-all cursor-pointer">
                    <i className={`fab fa-${s}`}></i>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h4 className="text-xl font-bold">Quick Links</h4>
              <ul className="space-y-4 text-gray-400 font-medium list-none p-0">
                {['About', 'Projects', 'Testimonials', 'Contact'].map(l => (
                  <li key={l} onClick={() => scrollToSection(l.toLowerCase())} className="hover:text-white cursor-pointer transition-colors">/ {l}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-xl font-bold">Contact</h4>
              <div className="space-y-6">
                <p className="text-gray-400">squaredealid@gmail.com</p>
                <p className="text-gray-400">+91 7507003616</p>
                <p className="text-gray-400 leading-relaxed">Office 404, The Hub, Parijat Nagar, Mahatma Nagar, Nashik 422005</p>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500 font-bold uppercase tracking-widest">
            <p>© 2026 AFTERTHINK STUDIO. ALL RIGHTS RESERVED.</p>
            <p>DESIGNED FOR LUXURY</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 bg-[#25D366] text-white w-16 h-16 rounded-full flex items-center justify-center hover:scale-110 transition-all z-50 shadow-2xl shadow-green-200">
        <svg width="30" height="30" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
      </a>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        
        .animate-fadeUp { animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #3A7BFF; border-radius: 10px; }
      `}</style>
    </div>
  );
}