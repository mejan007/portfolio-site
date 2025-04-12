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
  ExternalLink
} from 'lucide-react';
import { loadSlim } from "tsparticles-slim";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";

function App() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const certificationsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const [showParticles, setShowParticles] = useState(true);
  const [titleIndex, setTitleIndex] = useState(0);
  const [fadeState, setFadeState] = useState('fade-in');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [showMailTooltip, setShowMailTooltip] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  let navTimeout: NodeJS.Timeout;

  const titles = [
    "Computer Engineer",
    "Machine Learning Enthusiast",
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isAtTop = window.scrollY <= 100;
      setIsScrolled(!isAtTop);
      
      // Automatically show nav when at top
      if (isAtTop) {
        setIsNavVisible(true);
      } else {
        setIsNavVisible(false);
        clearTimeout(navTimeout);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(navTimeout);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 100) {
        setIsNavVisible(true);
      } else if (!isScrolled) {
        setIsNavVisible(true);
      } else {
        clearTimeout(navTimeout);
        navTimeout = setTimeout(() => setIsNavVisible(false), 2000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isScrolled]);

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

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    // Don't disable particles when navigating
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Add global styles for html and body */}
      <style>
        {`
          html, body {
            background: linear-gradient(to bottom right, #1a202c, #2d3748);
            min-height: 100%;
            margin: 0;
            padding: 0;
          }
          
          #tsparticles {
            position: fixed !important;
            width: 100% !important;
            height: 100% !important;
            top: 0 !important;
            left: 0 !important;
            z-index: 0 !important;
          }
        `}
      </style>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white relative">
        {showParticles && (
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              background: {
                opacity: 0
              },
              fpsLimit: 60,
              particles: {
                color: {
                  value: "#ffffff"
                },
                links: {
                  color: "#ffffff",
                  distance: 150,
                  enable: true,
                  opacity: 0.2,
                  width: 1
                },
                move: {
                  enable: true,
                  speed: 2
                },
                number: {
                  density: {
                    enable: true,
                    area: 800
                  },
                  value: 80
                },
                opacity: {
                  value: 0.3
                },
                size: {
                  value: { min: 1, max: 3 }
                }
              },
              detectRetina: true
            }}
          />
        )}


{/* Social Sidebar */}
<div className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-gray-900/90 p-4 rounded-r-lg backdrop-blur-sm z-50">
  <div className="flex flex-col gap-6">

    <a
      href="https://github.com/mejan007"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-300 hover:text-amber-400 transition-colors"
    >
      <Github className="w-6 h-6" />
    </a>

    <a
      href="https://www.linkedin.com/in/mejan-lamichhane-581408284/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-300 hover:text-amber-400 transition-colors"
    >
      <Linkedin className="w-6 h-6" />
    </a>

    {/* Mail Link */}
    <div className="relative">
      <a
        href={`mailto:mejan.lamichhane15@gmail.com?subject=Hello from your portfolio`}
        onClick={(e) => {
          e.preventDefault(); // Prevent the default mailto action for now
          console.log("Toggling tooltip, current state:", showMailTooltip);
          setShowMailTooltip(!showMailTooltip); // Toggle the tooltip regardless of clipboard
        }}
        className="text-gray-300 hover:text-amber-400 transition-colors"
      >
        <Mail className="w-6 h-6" />
      </a>

      {showMailTooltip && (
        <div 
          className="absolute left-10 -top-12 w-52 bg-gray-800 p-3 rounded-lg shadow-lg z-50 text-sm"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-white text-xs truncate">mejan.lamichhane15@gmail.com</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigator.clipboard.writeText("mejan.lamichhane15@gmail.com");
                  setCopiedEmail(true);
                  setTimeout(() => setCopiedEmail(false), 2000);
                }}
                className="text-gray-300 hover:text-amber-400"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex gap-2 text-xs">
              <a 
                href={`mailto:mejan.lamichhane15@gmail.com`}
                className="bg-indigo-600 hover:bg-indigo-700 px-2 py-1 rounded text-white flex-1 text-center"
              >
                Open Mail
              </a>
              <button 
                onClick={() => setShowMailTooltip(false)}
                className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

  </div>
</div>


        {/* Navigation Bar */}
        <nav 
          className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${
            isNavVisible ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="container mx-auto px-4 py-6">
            <div className="max-w-md mx-auto bg-gray-900/90 backdrop-blur-sm rounded-full px-8 py-3">
              <div className="flex justify-between items-center">
                {[
                  { name: 'About', icon: User, ref: aboutRef },
                  { name: 'Projects', icon: Code, ref: projectsRef },
                  { name: 'Certifications', icon: Award, ref: certificationsRef },
                  { name: 'Skills', icon: Brain, ref: skillsRef },
                ].map(({ name, icon: Icon, ref }) => (
                  <button
                    key={name}
                    onClick={() => scrollToSection(ref)}
                    className="flex items-center gap-2 text-gray-300 hover:text-amber-400 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 pt-24 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="min-h-screen flex flex-col items-center justify-center">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden ring-4 ring-indigo-500 shadow-xl mb-8">
                <img
                  src="assets/me.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover absolute inset-0"
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

            {/* About Section */}
            <div ref={aboutRef} className="mb-24 scroll-mt-24">
              <h2 className="text-3xl font-bold mb-8 text-amber-400">About Me</h2>
              <div className="bg-gray-800/50 rounded-xl p-8">
                <p className="text-gray-300 leading-relaxed mb-8">
                  With over 5 years of experience in full-stack development, I specialize in building scalable web applications using modern technologies. My passion lies in creating elegant solutions to complex problems and staying at the forefront of web development trends.
                </p>
                
                {/* CV Button Section */}
                <div className="flex justify-center mt-4">
                  <a 
                    href="/CV.pdf" 
                    download
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

            {/* Projects Section */}
            <div ref={projectsRef} className="mb-24 scroll-mt-24">
              <h2 className="text-3xl font-bold mb-8 text-amber-400">Projects</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((project) => (
                  <div key={project} className="bg-gray-800/50 rounded-xl p-6 hover:ring-2 hover:ring-indigo-500 transition-all">
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

            {/* Certifications Section */}
            <div ref={certificationsRef} className="mb-24 scroll-mt-24">
              <h2 className="text-3xl font-bold mb-8 text-amber-400">Certifications</h2>
              <div className="space-y-6">
                {[1, 2, 3].map((cert) => (
                  <div key={cert} className="bg-gray-800/50 rounded-xl p-6 flex items-center gap-6">
                    <Award className="w-12 h-12 text-indigo-400" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Certification {cert}</h3>
                      <p className="text-gray-400">Issuing organization • Year</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Section */}
            <div ref={skillsRef} className="mb-24 scroll-mt-24">
              <h2 className="text-3xl font-bold mb-8 text-amber-400">Skills</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { category: 'Frontend', skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'] },
                  { category: 'Backend', skills: ['Node.js', 'Python', 'PostgreSQL', 'Redis'] },
                  { category: 'DevOps', skills: ['Docker', 'AWS', 'CI/CD', 'Kubernetes'] },
                  { category: 'Tools', skills: ['Git', 'VS Code', 'Figma', 'Postman'] },
                ].map(({ category, skills }) => (
                  <div key={category} className="bg-gray-800/50 rounded-xl p-6">
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

        {/* Added Footer */}
        <footer className="bg-gray-900 py-8">
          <div className="container mx-auto px-4 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Mejan Lamichhane. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;