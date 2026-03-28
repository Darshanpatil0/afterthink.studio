import React, { useEffect, useRef, useState } from "react";

export default function AfterthinkStudioArchitectureLanding() {
  const whatsappLink = "https://api.whatsapp.com/send/?phone=7507003616&text&type=phone_number&app_absent=0";

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
    { title: "Bad Room", img: "/img/image1.png" },
    { title: "   Design", img: "/img/image2.png" },
    { title: "Office Design", img: "/img/image3.png" },
    { title: "Modular Bad ", img: "/img/image4.png" },
    { title: "Luxury Holl ", img: "/img/image5.png" },
    { title: "Modern gallery ", img: "/img/image7.png" },
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
    <div className="min-h-screen bg-[#F7FBFF] text-gray-900">

      {/* HERO */}
      <section className="px-6 py-24 text-center relative overflow-hidden">
        {/* Updated Hero Image Path */}
        <img
          src="/img/image9.png"
          className="absolute inset-0 w-full mt-23 fit object-cover opacity-40"
          alt="Hero background"
        />

        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight animate-fadeUp">
            Designing Spaces <br />
            <span className="text-[#3A7BFF]">That Define You</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Premium interior design with modern elegance and refined aesthetics.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <a href="https://www.instagram.com/afterthink.studio/" target="_blank" rel="noopener noreferrer" className="bg-[#3A7BFF] text-white px-6 py-3 rounded-full hover:scale-105 transition cursor-pointer no-underline">
              View Projects
            </a>
            <a href={whatsappLink} className="border px-6 py-3 rounded-full hover:bg-gray-100 transition cursor-pointer no-underline">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="px-6 py-24 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="relative w-full aspect-square bg-[#E3D5C5] rounded-[40px] overflow-hidden shadow-xl flex items-center justify-center p-12 text-center">
             <img 
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7" 
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-30"
              alt="Texture"
            />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight uppercase tracking-widest">
                Interior Design <br />
                <span className="text-sm font-normal normal-case block mt-2 text-gray-600">
                  is making the best possible use of the available
                </span>
                SPACE
              </h3>
            </div>
            <div className="absolute bottom-10 left-10 w-20 h-20 border-4 border-white/50 rounded-lg"></div>
          </div>

          <div className="absolute -bottom-10 -right-4 md:right-0 w-1/2 aspect-square rounded-[30px] overflow-hidden border-8 border-[#F7FBFF] shadow-2xl">
            <img 
              src="/img/image6.png" 
              className="w-full h-full object-cover "
              alt="Interior detail"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 text-[#3A7BFF] font-semibold uppercase text-xs tracking-widest">
            <span className="w-2 h-4 bg-[#3A7BFF] rounded-full"></span>
            About Us
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            About Afterthink Studio
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Led by our expert team, Afterthink Studio is a design powerhouse with years of experience. 
            Known for exceptional space planning, thoughtful material selection, and trusted service.
          </p>

          <div className="mt-6 border-t border-gray-200">
            {[
              { id: "01", q: "What sets Afterthink Studio apart from others" },
              { id: "02", q: "Do you handle both residential and commercial projects" },
              { id: "03", q: "How involved will I be in the design process" }
            ].map((item, index) => (
              <div key={index} className="py-5 border-b border-gray-200 flex items-center justify-between group cursor-default">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-gray-400">{item.id}.</span>
                  <span className="text-lg font-medium text-gray-800 group-hover:text-[#3A7BFF] transition-colors font-sans">
                    {item.q}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO SLIDER */}
      <section className="px-6 py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 text-[#3A7BFF] font-semibold uppercase text-xs tracking-widest mb-3">
                <span className="w-2 h-4 bg-[#3A7BFF] rounded-full"></span>
                Project Portfolio
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Where Ideas Took Shape
              </h2>
            </div>
            
            <div className="flex gap-3">
               <button onClick={prevSlide} className="group p-4 rounded-full border border-gray-200 hover:bg-[#3A7BFF] active:scale-90 transition-all shadow-sm">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600 group-hover:text-white rotate-180">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button onClick={nextSlide} className="group p-4 rounded-full border border-gray-200 hover:bg-[#3A7BFF] active:scale-90 transition-all shadow-sm">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600 group-hover:text-white">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[40px]">
            <div 
              className="flex gap-6 transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / 3 + 1.2)}%)` }} 
            >
              {projects.map((project, i) => (
                <div key={i} className="min-w-[85%] md:min-w-[calc(33.333%-16px)] h-[500px] relative rounded-[40px] overflow-hidden group shadow-lg">
                  <img src={project.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={project.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                  <div className="absolute bottom-10 left-10">
                    <p className="text-[#3A7BFF] text-xs font-bold uppercase tracking-widest mb-2">Portfolio Item</p>
                    <h3 className="text-white text-2xl font-bold">{project.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center gap-8">
            <div className="flex gap-2">
              {Array.from({ length: projects.length - 2 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${currentIndex === i ? 'w-10 bg-[#3A7BFF]' : 'w-2 bg-gray-300'}`}
                />
              ))}
            </div>
            
            {/* FIXED REDIRECT BUTTON */}
            <a 
              href="https://www.instagram.com/afterthink.studio/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 pl-8 pr-2 py-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-all group no-underline"
            >
              <span className="text-gray-700 font-medium">View All Portfolios</span>
              <div className="bg-[#3A7BFF] text-white p-3 rounded-full group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="px-16 w-full py-20 text-center">
        <div className="grid grid-cols-3 max-w-5xl mx-auto">
          {["Projects", "Years", "Satisfaction"].map((label, i) => (
            <div key={i} className="hover:scale-105 transition duration-300">
              <h2 className="text-5xl font-bold text-[#3A7BFF]">
                {counts[i]}{i === 2 ? "%" : "+"}
              </h2>
              <p className="text-gray-500 font-medium mt-2">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 py-24 bg-[#F7FBFF] overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-[40px] overflow-hidden shadow-2xl aspect-[4/5] md:aspect-auto md:h-[600px]">
            <img 
              src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe" 
              className="w-full h-full object-cover"
              alt="Client space"
            />
          </div>

          <div className="relative flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-2 text-[#3A7BFF] font-semibold uppercase text-xs tracking-widest mb-3">
                <span className="w-2 h-4 bg-[#3A7BFF] rounded-full"></span>
                Client Feedback
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Hear from clients.
              </h2>
            </div>

            <div className="relative min-h-[300px]">
              {[
                {
                  name: "Bapu Nikumbh",
                  location: "Nashik, India",
                  text: "Superior finishes, trendy designs and quality modules at affordable prices.",
                  rating: 5
                },
                {
                  name: "Anita Sharma",
                  location: "Haldwani, India",
                  text: "From concept to execution, Afterthink Studio provided excellent service. Their expertise helped create a beautiful, functional space!",
                  rating: 5
                }
              ].map((item, i) => (
                <div 
                  key={i}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    currentIndex % 2 === i ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12 pointer-events-none'
                  }`}
                >
                  <div className="bg-white p-10 md:p-12 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="flex gap-1 mb-6 text-yellow-400">
                      {[...Array(item.rating)].map((_, s) => (
                        <svg key={s} width="18" height="18" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      ))}
                    </div>
                    <p className="text-gray-600 italic text-lg leading-relaxed mb-8">"{item.text}"</p>
                    <div>
                      <h4 className="font-bold text-gray-900 text-xl">{item.name}</h4>
                      <p className="text-gray-400 text-sm">{item.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-12">
               <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-gray-900">4.99</span>
                  <span className="text-gray-400 text-sm">1000+ Rating</span>
               </div>
               <div className="flex gap-4">
                  <button onClick={prevSlide} className="p-4 rounded-full border border-gray-200 hover:bg-gray-50 transition shadow-sm bg-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="rotate-180"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </button>
                  <button onClick={nextSlide} className="p-4 rounded-full bg-[#3A7BFF] text-white hover:scale-105 transition shadow-lg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </button>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#3D3126] text-[#D4C3A9] pt-20 pb-10 px-6 rounded-t-[60px] mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-2">
                 <div className="w-10 h-10 bg-white rounded flex items-center justify-center font-bold text-[#3D3126]">SQ</div>
                 <span className="text-2xl font-bold tracking-tighter text-white uppercase">Square Deal<br/><span className="text-xs tracking-[0.3em] font-light">Interior</span></span>
              </div>
              <div className="flex gap-4">
                {['facebook', 'instagram', 'linkedin', 'youtube', 'twitter'].map((social) => (
                  <div key={social} className="w-10 h-10 rounded-full border border-[#D4C3A9]/30 flex items-center justify-center hover:bg-[#D4C3A9] hover:text-[#3D3126] transition-all cursor-pointer">
                    <i className={`fab fa-${social} text-sm`}></i>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white text-xl font-semibold mb-6">Useful Links</h4>
              <ul className="flex flex-col gap-4 text-sm list-none p-0">
                {['About Us', 'Services', 'Portfolios', 'Blogs', 'Contact Us'].map((link) => (
                  <li key={link} className="hover:text-white cursor-pointer transition-colors">{link}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white text-xl font-semibold mb-6">Contact Info</h4>
              <ul className="flex flex-col gap-6 text-sm list-none p-0">
                <li className="flex items-center gap-3">
                  <div className="p-2 rounded-full border border-[#D4C3A9]/20"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg></div>
                  squaredealid@gmail.com
                </li>
                <li className="flex items-center gap-3">
                   <div className="p-2 rounded-full border border-[#D4C3A9]/20"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg></div>
                  +91 7507003616
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-xl font-semibold mb-6">Address</h4>
              <div className="flex gap-3 text-sm leading-relaxed">
                <div className="mt-1"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg></div>
                <p>Office Number 404, The Hub, Parijat Nagar Chowk, Mahatma Nagar, Nashik, Maharashtra 422005</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center text-[#3D3126] text-sm font-medium">
            <p>Copyright © 2026 Square Deal Interior. All Rights Reserved.</p>
            <p className="mt-2 md:mt-0">Enquiry: <span className="font-bold">+91 7507003616</span></p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 bg-green-500 text-white px-5 py-3 rounded-full hover:scale-110 transition z-50 shadow-lg no-underline font-medium">
        WhatsApp
      </a>

      <style>{`
        .animate-fadeUp { animation: fadeUp 1s ease forwards; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}