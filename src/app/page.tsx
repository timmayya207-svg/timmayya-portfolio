"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ChevronDown,
  ExternalLink,
  Send,
  CheckCircle,
  Compass,
  Building2,
  UtensilsCrossed,
  Cuboid,
  ArrowRight,
  Zap,
  Award,
  ChefHat,
  Utensils,
  Image as ImageIcon,
  XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

// Project Detail Modal Component
function ProjectModal({ 
  project, 
  isOpen, 
  onClose 
}: { 
  project: {
    title: string;
    category: string;
    location: string;
    description: string;
    images: {
      kitchen: string[];
      dining: string[];
      restaurant: string[];
    };
  } | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"kitchen" | "dining" | "restaurant">("kitchen");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!project) return null;

  const tabs = [
    { id: "kitchen" as const, label: "Kitchen Setup", icon: ChefHat, count: project.images.kitchen.length },
    { id: "dining" as const, label: "Dining Setup", icon: Utensils, count: project.images.dining.length },
    { id: "restaurant" as const, label: "Restaurant Setup", icon: Building2, count: project.images.restaurant.length },
  ];

  const currentImages = project.images[activeTab];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-sm"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] bg-gradient-to-b from-gray-900 to-black border border-gold-metallic/30 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 bg-black/95 backdrop-blur-md border-b border-gold-metallic/20 p-3 sm:p-6">
                <div className="flex items-start justify-between gap-2 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <span className="px-2 sm:px-3 py-1 bg-gold-metallic/20 border border-gold-metallic/40 rounded-full text-xs text-gold-metallic">
                      {project.category}
                    </span>
                    <h2 className="text-xl sm:text-3xl font-playfair gold-gradient mt-2">
                      {project.title}
                    </h2>
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-400 mt-1">
                      <MapPin size={14} />
                      {project.location}
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 bg-gold-metallic/10 border border-gold-metallic/30 rounded-lg hover:bg-gold-metallic/20 transition-colors shrink-0"
                  >
                    <X className="w-5 h-5 text-gold-metallic" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                        activeTab === tab.id
                          ? "bg-gold-metallic text-black"
                          : "bg-gold-metallic/10 border border-gold-metallic/30 text-gold-metallic hover:bg-gold-metallic/20"
                      }`}
                    >
                      <tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">{tab.label}</span>
                      <span className="xs:hidden">{tab.id === "kitchen" ? "Kitchen" : tab.id === "dining" ? "Dining" : "Restaurant"}</span>
                      {tab.count > 0 && (
                        <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-xs ${
                          activeTab === tab.id ? "bg-black/20" : "bg-gold-metallic/20"
                        }`}>
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-3 sm:p-6 overflow-y-auto max-h-[50vh] sm:max-h-[60vh]">
                {currentImages.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                    {currentImages.map((img, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden border border-gold-metallic/20 cursor-pointer group"
                        onClick={() => setSelectedImage(img)}
                      >
                        <Image
                          src={img}
                          alt={`${project.title} - ${activeTab} ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gold-metallic" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gold-metallic/10 border border-gold-metallic/30 flex items-center justify-center mb-4">
                      <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gold-metallic/50" />
                    </div>
                    <p className="text-gray-400 text-sm sm:text-base">No images available for this category</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-black/95 backdrop-blur-md border-t border-gold-metallic/20 p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-400 text-center">
                  {project.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Image View */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/98"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-3 bg-gold-metallic/20 border border-gold-metallic/40 rounded-full hover:bg-gold-metallic/30 transition-colors z-[120]"
            >
              <XCircle className="w-6 h-6 sm:w-8 sm:h-8 text-gold-metallic" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-5xl h-[70vh] sm:h-[85vh] mx-2 sm:mx-4"
            >
              <Image
                src={selectedImage}
                alt="Full size image"
                fill
                className="object-contain"
                unoptimized
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ["home", "about", "expertise", "projects", "contact"];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#expertise", label: "Expertise" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home");
            }}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10 lg:w-12 lg:h-12">
              <Image
                src="/tn-logo.png"
                alt="TN Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="hidden sm:block text-xl lg:text-2xl font-great-vibes gold-gradient">
              Timmayya
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`nav-link text-sm font-medium transition-colors ${
                  activeSection === link.href.slice(1)
                    ? "text-gold-metallic"
                    : "text-gray-300 hover:text-gold-metallic"
                }`}
              >
                {link.label}
              </a>
            ))}
            <Button
              onClick={() => scrollToSection("#contact")}
              className="btn-gold px-6 py-2 text-sm font-semibold"
            >
              Contact Me
            </Button>
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gold-metallic hover:text-gold-shine transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 backdrop-blur-md border-t border-gold-metallic/20"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === link.href.slice(1)
                      ? "bg-gold-metallic/10 text-gold-metallic"
                      : "text-gray-300 hover:bg-gold-metallic/5 hover:text-gold-metallic"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <Button
                onClick={() => scrollToSection("#contact")}
                className="btn-gold mt-2 py-3 text-sm font-semibold"
              >
                Contact Me
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 hero-pattern">
        <Image
          src="/bg-pattern.png"
          alt="Background Pattern"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-gold-metallic/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-gold-metallic/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-great-vibes gold-gradient mb-4">
              Timmayya
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl font-playfair text-white mb-4">
              Commercial Kitchen Designer
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mb-8">
              <span className="px-3 sm:px-4 py-2 bg-gold-metallic/10 border border-gold-metallic/30 rounded-full text-xs sm:text-sm text-gold-metallic">
                Kitchen Layout Design
              </span>
              <span className="px-3 sm:px-4 py-2 bg-gold-metallic/10 border border-gold-metallic/30 rounded-full text-xs sm:text-sm text-gold-metallic">
                MEP Coordination
              </span>
              <span className="px-3 sm:px-4 py-2 bg-gold-metallic/10 border border-gold-metallic/30 rounded-full text-xs sm:text-sm text-gold-metallic">
                Project Execution
              </span>
            </div>

            <p className="text-gray-400 text-base sm:text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              Specialized in designing efficient commercial kitchens for restaurants, bars, hotels, and cloud kitchens across Karnataka.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={() => {
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-gold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold"
              >
                View My Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold border-gold-metallic/30 text-gold-metallic hover:bg-gold-metallic/10"
              >
                Get In Touch
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative order-1 lg:order-2 flex justify-center"
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-full border-2 border-gold-metallic/30 animate-pulse" />
              <div className="absolute inset-4 rounded-full border border-gold-metallic/20" />
              
              <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-gold-metallic/40 shadow-2xl shadow-gold-metallic/20 bg-black/50">
                <Image
                  src="/tn-logo.png"
                  alt="Timmayya - TN Gold Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 bg-black border border-gold-metallic/40 rounded-xl px-3 sm:px-4 py-2 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs sm:text-sm text-gold-metallic font-medium">Available for Projects</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex flex-col items-center gap-2 text-gold-metallic/60 hover:text-gold-metallic transition-colors"
          >
            <span className="text-sm">Scroll Down</span>
            <ChevronDown className="animate-bounce" size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32 relative">
      <div className="section-divider mb-24" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-playfair gold-gradient mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-metallic to-transparent mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center"
          >
            <div className="relative w-64 h-64 lg:w-80 lg:h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-metallic/10 to-transparent rounded-3xl" />
              <div className="absolute inset-0 border border-gold-metallic/20 rounded-3xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/tn-logo.png"
                  alt="TN Gold Logo"
                  fill
                  className="object-contain p-2"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl lg:text-4xl font-great-vibes gold-gradient mb-6">
              Hello, I'm Timmayya.
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              I am a <span className="text-gold-metallic">Commercial Kitchen Designer</span> specializing in creating efficient, functional, and innovative kitchen layouts for restaurants, bars, hotels, and cloud kitchens.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              I provide end-to-end kitchen design solutions including layout planning, equipment placement, MEP coordination (electrical, plumbing, drainage), and complete project execution. Whether you're opening a new restaurant or upgrading your existing kitchen setup, I deliver customized solutions tailored to your specific requirements.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
              <div className="text-center p-3 sm:p-4 bg-gold-metallic/5 border border-gold-metallic/20 rounded-xl">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold gold-gradient">50+</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">Projects</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-gold-metallic/5 border border-gold-metallic/20 rounded-xl">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold gold-gradient">2+</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">Years Exp.</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-gold-metallic/5 border border-gold-metallic/20 rounded-xl">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold gold-gradient">40+</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">Happy Clients</div>
              </div>
            </div>

            {/* Certification */}
            <div className="flex items-start gap-3 sm:gap-4 p-4 bg-gold-metallic/5 border border-gold-metallic/20 rounded-xl">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gold-metallic/10 border border-gold-metallic/30 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-gold-metallic" />
              </div>
              <div>
                <div className="font-semibold text-white text-sm sm:text-base">Certified Professional</div>
                <div className="text-xs sm:text-sm text-gray-400">AutoCAD 2D & 3D, SketchUp, V-Ray</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Expertise Section
function ExpertiseSection() {
  const expertise = [
    {
      icon: Compass,
      title: "Kitchen Layout Design",
      items: ["Restaurant layouts", "Kitchen equipment planning", "Workflow optimization", "Space planning"],
      color: "from-amber-500/20 to-orange-500/20",
    },
    {
      icon: Zap,
      title: "MEP Coordination",
      items: ["Electrical design", "Plumbing design", "Drainage systems", "Utility planning"],
      color: "from-yellow-500/20 to-amber-500/20",
    },
    {
      icon: Building2,
      title: "Project Management",
      items: ["Site supervision", "Vendor coordination", "Quality control", "Client handling"],
      color: "from-orange-500/20 to-red-500/20",
    },
    {
      icon: Cuboid,
      title: "3D Design & Rendering",
      items: ["SketchUp modeling", "Revit Architecture", "V-Ray rendering", "3D visualization"],
      color: "from-amber-400/20 to-yellow-500/20",
    },
  ];

  return (
    <section id="expertise" className="py-24 lg:py-32 relative bg-gradient-to-b from-transparent via-gold-metallic/5 to-transparent">
      <div className="section-divider mb-24" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-playfair gold-gradient mb-4">
            My Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-metallic to-transparent mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Specialized services in commercial kitchen design, MEP coordination, and project execution
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {expertise.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-black/50 border-gold-metallic/20 card-hover overflow-hidden group">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <CardHeader className="relative">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gold-metallic/10 border border-gold-metallic/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-gold-metallic" />
                  </div>
                  <CardTitle className="text-base sm:text-lg text-white group-hover:text-gold-metallic transition-colors">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <ul className="space-y-2">
                    {item.items.map((listItem) => (
                      <li key={listItem} className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-metallic" />
                        {listItem}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Projects Section
function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const projects = [
    {
      image: "/project-chalukya.png",
      title: "Chalukya Samrat Restaurant",
      category: "Restaurant",
      location: "Karnataka",
      description: "Complete kitchen design, equipment installation, and MEP coordination for a premium vegetarian restaurant.",
      images: {
        kitchen: ["/gallery/IMG-20260318-WA0001.jpg", "/gallery/IMG-20260318-WA0004.jpg"],
        dining: ["/gallery/IMG-20260318-WA0010.jpg"],
        restaurant: ["/gallery/IMG-20260318-WA0017.jpg", "/gallery/IMG-20260318-WA0024.jpg", "/gallery/IMG-20260318-WA0025.jpg"],
      },
    },
    {
      image: "/project-shreenidhi.png",
      title: "Shreenidhi Sagara",
      category: "Veg Hotel",
      location: "Chandapoor",
      description: "Kitchen layout design, electrical and plumbing systems integration for a traditional vegetarian hotel.",
      images: {
        kitchen: ["/gallery/IMG-20260318-WA0001.jpg"],
        dining: ["/gallery/IMG-20260318-WA0010.jpg", "/gallery/IMG-20260318-WA0017.jpg"],
        restaurant: ["/gallery/IMG-20260318-WA0024.jpg"],
      },
    },
    {
      image: "/project-sarovara.png",
      title: "Sarovara Bar and Restaurant",
      category: "Bar & Restaurant",
      location: "Karnataka",
      description: "Comprehensive kitchen setup with specialized equipment placement and utility design.",
      images: {
        kitchen: ["/gallery/IMG-20260318-WA0004.jpg", "/gallery/IMG-20260318-WA0010.jpg"],
        dining: ["/gallery/IMG-20260318-WA0017.jpg"],
        restaurant: ["/gallery/IMG-20260318-WA0025.jpg"],
      },
    },
    {
      image: "/project-kadamba.png",
      title: "Kadamba Restaurant",
      category: "Restaurant",
      location: "Karnataka",
      description: "Full-service kitchen design and installation project management for a multi-cuisine restaurant.",
      images: {
        kitchen: ["/gallery/IMG-20260318-WA0001.jpg", "/gallery/IMG-20260318-WA0024.jpg"],
        dining: ["/gallery/IMG-20260318-WA0010.jpg", "/gallery/IMG-20260318-WA0017.jpg"],
        restaurant: ["/gallery/IMG-20260318-WA0025.jpg"],
      },
    },
  ];

  return (
    <>
      <section id="projects" className="py-24 lg:py-32 relative">
        <div className="section-divider mb-24" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-playfair gold-gradient mb-4">
              Key Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-metallic to-transparent mx-auto mb-6" />
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Click on any project to view detailed images of kitchen, dining, and restaurant setups
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className="group overflow-hidden bg-black/50 border-gold-metallic/20 card-hover cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2 py-1 bg-gold-metallic/20 border border-gold-metallic/40 rounded text-xs text-gold-metallic">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-2 bg-gold-metallic rounded-full">
                        <ImageIcon className="w-4 h-4 text-black" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-white group-hover:text-gold-metallic transition-colors mb-1 text-sm sm:text-base">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 mb-2 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin size={12} />
                        {project.location}
                      </div>
                      <span className="text-xs text-gold-metallic">Click to view →</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="flex flex-wrap items-center justify-center gap-2 px-4 py-3 bg-gold-metallic/5 border border-gold-metallic/20 rounded-full mx-auto max-w-md">
              <UtensilsCrossed className="w-5 h-5 text-gold-metallic" />
              <span className="text-gray-400">Also worked on:</span>
              <span className="text-white">Hotels</span>
              <span className="text-gold-metallic">•</span>
              <span className="text-white">Bakeries</span>
              <span className="text-gold-metallic">•</span>
              <span className="text-white">Cloud Kitchens</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

// Contact Section
function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Using Formsubmit.co - completely free, no setup required
      // First submission will send a confirmation email to activate
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("email", formData.email);
      formDataObj.append("message", formData.message);
      formDataObj.append("_subject", `New Contact from ${formData.name} - Portfolio Website`);
      formDataObj.append("_captcha", "false");
      formDataObj.append("_template", "table");

      const response = await fetch("https://formsubmit.co/timmayya207@gmail.com", {
        method: "POST",
        body: formDataObj,
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setSubmitError("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: "Location",
      value: "Bengaluru – BTM 2nd Stage, Karnataka",
      href: "https://maps.google.com/?q=BTM+2nd+Stage+Bengaluru",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 997272 8878",
      href: "tel:+919972728878",
    },
    {
      icon: Mail,
      label: "Email",
      value: "timmayya207@gmail.com",
      href: "mailto:timmayya207@gmail.com",
    },
    {
      icon: ExternalLink,
      label: "Website",
      value: "www.timmayadesign.com",
      href: "https://timmayya-portfolio.vercel.app",
    },
  ];

  return (
    <section id="contact" className="py-24 lg:py-32 relative bg-gradient-to-b from-transparent via-gold-metallic/5 to-transparent">
      <div className="section-divider mb-24" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-playfair gold-gradient mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-metallic to-transparent mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Looking for professional kitchen design services? Let's discuss your project!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <h3 className="text-3xl font-great-vibes gold-gradient mb-2">
                Timmayya
              </h3>
              <p className="text-gray-400">Commercial Kitchen Designer</p>
            </div>

            <div className="space-y-3 sm:space-y-4 mb-8">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.label === "Website" ? "_blank" : undefined}
                  rel={item.label === "Website" ? "noopener noreferrer" : undefined}
                  className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gold-metallic/5 border border-gold-metallic/20 rounded-xl hover:bg-gold-metallic/10 transition-colors group"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gold-metallic/10 border border-gold-metallic/30 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gold-metallic" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm text-gray-500">{item.label}</div>
                    <div className="text-sm sm:text-base text-white group-hover:text-gold-metallic transition-colors break-all">
                      {item.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="hidden lg:flex justify-center">
              <div className="relative w-48 h-48">
                <Image
                  src="/tn-logo.png"
                  alt="TN Logo"
                  fill
                  className="object-contain opacity-50"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-black/50 border-gold-metallic/20">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                {/* Error Message */}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2"
                  >
                    <XCircle className="w-5 h-5 text-red-500" />
                    <span className="text-red-400 text-sm">{submitError}</span>
                  </motion.div>
                )}
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-400">
                      Thank you for reaching out. I'll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-black/50 border-gold-metallic/20 text-white placeholder:text-gray-500 focus:border-gold-metallic"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-black/50 border-gold-metallic/20 text-white placeholder:text-gray-500 focus:border-gold-metallic"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Tell me about your project..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={5}
                        className="bg-black/50 border-gold-metallic/20 text-white placeholder:text-gray-500 focus:border-gold-metallic resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-gold py-5 sm:py-6 text-base sm:text-lg font-semibold"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          Sending...
                        </div>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-8 border-t border-gold-metallic/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <Image
                src="/tn-logo.png"
                alt="TN Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-lg font-great-vibes gold-gradient">
              Timmayya
            </span>
          </div>
          
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Timmayya. All rights reserved.
          </p>
          
          <a
            href="https://timmayya-portfolio.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gold-metallic hover:text-gold-shine transition-colors"
          >
            www.timmayadesign.com
          </a>
        </div>
      </div>
    </footer>
  );
}

// Main Page Component
export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ExpertiseSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
