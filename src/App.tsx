import React, { useRef, useCallback, useState, useEffect } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Code,
  Award,
  Brain,
  User,
  Download,
  ExternalLink,
  Copy,
  Check,
  Home,
} from 'lucide-react';
import { loadSlim } from "tsparticles-slim";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";

function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const certificationsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [showParticles, setShowParticles] = useState(true);
  const [titleIndex, setTitleIndex] = useState(0);
  const [fadeState, setFadeState] = useState('fade-in');
  const [showMailTooltip, setShowMailTooltip] = useState(false);
  const [activeTab, setActiveTab] = useState('mailto');
  const [activeSection, setActiveSection] = useState('about');
  const email = "mejan.lamichhane15@gmail.com";
  const [copied, setCopied] = useState(false);

  const titles = [
    "Computer Engineer",
    "Machine Learning Enthusiast",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    const sections = [
      { ref: heroRef, id: 'home' },
      { ref: aboutRef, id: 'about' },
      { ref: projectsRef, id: 'projects' },
      { ref: certificationsRef, id: 'certifications' },
      { ref: skillsRef, id: 'skills' },
    ];

    sections.forEach(({ ref, id }) => {
      if (ref.current) {
        ref.current.id = id;
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowParticles(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowMailTooltip(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const fadeTimeout = setTimeout(() => {
      if (fadeState === 'fade-in') {
        setFadeState('fade-out');
      } else {
        setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
        setFadeState('fade-in');
      }
    }, fadeState === 'fade-in' ? 2000 : 500);

    return () => clearTimeout(fadeTimeout);
  }, [fadeState]);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log(container);
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>, id: string) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  };

  return (
    <>
      <style>
        {`
          html, body {
            background: linear-gradient(to bottom right, #1a202c, #2d3748);
            min-height: 100%;
            margin: 0;
            padding: 0;
          }
          
          #tsparticles {
            position: absolute !important;
            width: 100% !important;
            height: 100vh !important;
            top: 0 !important;
            left: 0 !important;
            z-index: 0 !important;
            pointer-events: none;
            max-height: 100vh;
            overflow: hidden;
          }

          .hero-section {
            position: relative;
            height: 100vh;
            max-height: 100vh;
            overflow: hidden;
            clip-path: inset(0);
          }

          .hero-content {
            position: relative;
            z-index: 1;
            background: radial-gradient(circle at center, transparent 30%, rgba(26, 32, 44, 0.8) 100%);
            border-radius: 50%;
            padding: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .section-heading {
            text-align: center;
            position: relative;
            padding-bottom: 1rem;
            margin-bottom: 2rem;
          }

          .section-heading::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 3px;
            background: #f6ad55;
            border-radius: 3px;
          }

          .section-divider {
            height: 8px;
            background: linear-gradient(to right, rgba(79, 84, 92, 0.2), rgba(99, 102, 241, 0.2), rgba(79, 84, 92, 0.2));
            position: relative;
            overflow: hidden;
          }

          .section-divider::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            animation: shine 3s infinite linear;
          }

          @keyframes shine {
            to {
              left: 100%;
            }
          }

          .nav-item {
            transition: all 0.3s ease;
          }

          .nav-item.active {
            color: #f6ad55;
            text-shadow: 0 0 10px rgba(246, 173, 85, 0.5);
            transform: scale(1.05);
          }

          .nav-item.active svg {
            filter: drop-shadow(0 0 5px rgba(246, 173, 85, 0.5));
          }

          .profile-image-container {
            width: 256px;
            height: 256px;
            margin: 0 auto;
            position: relative;
            border-radius: 50%;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
          }

          .profile-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
          }
        `}
      </style>
      
      <div className="text-white relative">
        <div className="relative">
          <div className="hero-section bg-gradient-to-br from-gray-900 to-gray-800" ref={heroRef} id="home">
            <div className="container mx-auto px-4 pt-24 h-full">
              <div className="max-w-4xl mx-auto h-full">
                <div className="h-full flex flex-col items-center justify-center">
                  <div className="hero-content w-full">
                    <div className="profile-image-container mb-8">
                      <img
                        src="/me.jpg"
                        alt="Profile"
                        className="profile-image"
                      />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Mejan Lamichhane</h1>
                    <p 
                      className={`text-xl md:text-2xl text-gray-300 transition-opacity duration-500 ${
                        fadeState === 'fade-in' ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {titles[titleIndex]}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {showParticles && (
              <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                  fpsLimit: 120,
                  interactivity: {
                    events: {
                      onClick: {
                        enable: true,
                        mode: "push",
                      },
                      resize: true,
                    },
                    modes: {
                      push: {
                        quantity: 4,
                      },
                    },
                  },
                  particles: {
                    color: {
                      value: "#ffffff",
                    },
                    links: {
                      color: "#ffffff",
                      distance: 150,
                      enable: true,
                      opacity: 0.5,
                      width: 1,
                    },
                    move: {
                      direction: "none",
                      enable: true,
                      outModes: {
                        default: "bounce",
                      },
                      random: false,
                      speed: 2,
                      straight: false,
                    },
                    number: {
                      density: {
                        enable: true,
                        area: 800,
                      },
                      value: 80,
                    },
                    opacity: {
                      value: 0.5,
                    },
                    shape: {
                      type: "circle",
                    },
                    size: {
                      value: { min: 1, max: 5 },
                    },
                  },
                  detectRetina: true,
                }}
              />
            )}
          </div>

          <div className="section-divider"></div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-700">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div ref={aboutRef} className="py-24 scroll-mt-24">
                  <h2 className="section-heading text-3xl font-bold text-amber-400">About Me</h2>
                  <div className="bg-gray-800/30 rounded-xl p-8 backdrop-blur-sm">
                    <p className="text-gray-300 leading-relaxed mb-8">
                      With over 5 years of experience in full-stack development, I specialize in building scalable web applications using modern technologies. My passion lies in creating elegant solutions to complex problems and staying at the forefront of web development trends.
                    </p>
                    
                    <div className="flex justify-center mt-4">
                      <a 
                        href="/CV.pdf"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-lg group cursor-pointer"
                      >
                        <ExternalLink className="w-5 h-5 group-hover:animate-pulse" />
                        <span>View CV</span>
                        <Download className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section-divider"></div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div ref={projectsRef} className="py-24 scroll-mt-24">
                  <h2 className="section-heading text-3xl font-bold text-amber-400">Projects</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((project) => (
                      <div key={project} className="bg-gray-800/30 rounded-xl p-6 hover:ring-2 hover:ring-indigo-500 transition-all backdrop-blur-sm">
                        <h3 className="text-xl font-semibold mb-3">Project {project}</h3>
                        <p className="text-gray-400 mb-4">A brief description of the project and its key features. Technologies used and impact created.</p>
                        <div className="flex gap-2">
                          <span className="px-3 py-1 bg-indigo-900/50 rounded-full text-sm">React</span>
                          <span className="px-3 py-1 bg-indigo-900/50 rounded-full text-sm">Node.js</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section-divider"></div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div ref={certificationsRef} className="py-24 scroll-mt-24">
                  <h2 className="section-heading text-3xl font-bold text-amber-400">Certifications</h2>
                  <div className="space-y-6">
                    {[1, 2, 3].map((cert) => (
                      <div key={cert} className="bg-gray-800/30 rounded-xl p-6 flex items-center gap-6 backdrop-blur-sm">
                        <Award className="w-12 h-12 text-indigo-400" />
                        <div>
                          <h3 className="text-xl font-semibold mb-2">Certification {cert}</h3>
                          <p className="text-gray-400">Issuing organization • Year</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section-divider"></div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div ref={skillsRef} className="py-24 scroll-mt-24">
                  <h2 className="section-heading text-3xl font-bold text-amber-400">Skills</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { category: 'Frontend', skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'] },
                      { category: 'Backend', skills: ['Node.js', 'Python', 'PostgreSQL', 'Redis'] },
                      { category: 'DevOps', skills: ['Docker', 'AWS', 'CI/CD', 'Kubernetes'] },
                      { category: 'Tools', skills: ['Git', 'VS Code', 'Figma', 'Postman'] },
                    ].map(({ category, skills }) => (
                      <div key={category} className="bg-gray-800/30 rounded-xl p-6 backdrop-blur-sm">
                        <h3 className="text-xl font-semibold mb-4 text-indigo-400">{category}</h3>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill) => (
                            <span key={skill} className="px-3 py-1 bg-indigo-900/50 rounded-full text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className="bg-gray-900 py-8">
            <div className="container mx-auto px-4 text-center text-gray-400">
              <p>© {new Date().getFullYear()} Mejan Lamichhane. All rights reserved.</p>
            </div>
          </footer>
        </div>

        <div className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-gray-900/90 p-4 rounded-r-lg backdrop-blur-sm z-50">
          <div className="flex flex-col gap-6">
            <a href="https://github.com/mejan007" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-400 transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/mejan-lamichhane-581408284/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-400 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>

            <div className="relative">
              <button
                onClick={() => setShowMailTooltip(!showMailTooltip)}
                className="text-gray-300 hover:text-amber-400 transition-colors"
              >
                <Mail className="w-6 h-6" />
              </button>

              {showMailTooltip && (
                <div ref={tooltipRef} className="absolute left-full top-1/2 -translate-y-1/2 ml-3 w-72 bg-gray-800 p-4 rounded-lg shadow-lg z-[51]">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl text-white font-bold">Contact Me</h3>
                    <button
                      onClick={() => setShowMailTooltip(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex border-b border-gray-700 mb-4">
                    <button 
                      className={`px-4 py-2 ${activeTab === 'mailto' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-gray-400'}`}
                      onClick={() => setActiveTab('mailto')}
                    >
                      Mail Link
                    </button>
                    <button 
                      className={`px-4 py-2 ${activeTab === 'copy' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-gray-400'}`}
                      onClick={() => setActiveTab('copy')}
                    >
                      Copy Email
                    </button>
                  </div>
                  
                  {activeTab === 'mailto' && (
                    <div className="flex flex-col items-center">
                      <p className="text-gray-300 mb-4">Open your email client to contact me:</p>
                      <a
                        href={`mailto:${email}?subject=Hello from your portfolio`}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors"
                      >
                        <Mail className="w-5 h-5" />
                        Email Me
                      </a>
                      <p className="text-gray-400 text-sm mt-4">
                        Note: This requires a configured email client on your device
                      </p>
                    </div>
                  )}
                  
                  {activeTab === 'copy' && (
                    <div className="flex flex-col items-center">
                      <p className="text-gray-300 mb-4">Copy my email address:</p>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-white">{email}</span>
                        <button
                          onClick={copyToClipboard}
                          className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-colors"
                        >
                          {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-gray-300" />}
                        </button>
                      </div>
                      <p className="text-gray-400 text-sm">
                        {copied ? 'Copied to clipboard!' : 'Click the copy button to copy the email'}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <nav className="fixed top-0 left-0 right-0 z-40">
            <div className="container mx-auto px-4 py-6">
            <div className="max-w-lg mx-auto bg-gray-900/90 backdrop-blur-sm rounded-full px-8 py-3">
            <div className="flex items-center gap-6">
                {[	
		        { name: 'Home', icon: Home, ref: heroRef, id: 'home' },
                  { name: 'About', icon: User, ref: aboutRef, id: 'about' },
                  { name: 'Projects', icon: Code, ref: projectsRef, id: 'projects' },
                  { name: 'Certifications', icon: Award, ref: certificationsRef, id: 'certifications' },
                  { name: 'Skills', icon: Brain, ref: skillsRef, id: 'skills' },
                ].map(({ name, icon: Icon, ref, id }) => (
                  <button
                    key={name}
                    onClick={() => scrollToSection(ref, id)}
                    className={`nav-item flex items-center gap-1 text-gray-300 hover:text-amber-400 transition-colors ${
                      activeSection === id ? 'active' : ''
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default App;