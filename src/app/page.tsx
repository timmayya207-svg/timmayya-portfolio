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
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] bg-white border border-brand-green/30 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-3 sm:p-6">
                <div className="flex items-start justify-between gap-2 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <span className="px-2 sm:px-3 py-1 bg-brand-green/10 border border-brand-green/40 rounded-full text-xs text-brand-green font-medium">
                      {project.category}
                    </span>
                    <h2 className="text-xl sm:text-3xl font-playfair text-brand-gray mt-2">
                      {project.title}
                    </h2>
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 mt-1">
                      <MapPin size={14} />
                      {project.location}
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors shrink-0"
                  >
                    <X className="w-5 h-5 text-brand-gray" />
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
                          ? "bg-brand-green text-white"
                          : "bg-gray-100 border border-gray-200 text-brand-gray hover:bg-gray-200"
                      }`}
                    >
                      <tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">{tab.label}</span>
                      <span className="xs:hidden">{tab.id === "kitchen" ? "Kitchen" : tab.id === "dining" ? "Dining" : "Restaurant"}</span>
                      {tab.count > 0 && (
                        <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-xs ${
                          activeTab === tab.id ? "bg-white/20" : "bg-gray-200"
                        }`}>
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-3 sm:p-6 overflow-y-auto max-h-[50vh] sm:max-h-[60vh] bg-gray-50">
                {currentImages.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                    {currentImages.map((img, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden border border-gray-200 cursor-pointer group"
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
                          <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center mb-4">
                      <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm sm:text-base">No images available for this category</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-600 text-center">
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
              className="absolute top-4 right-4 p-3 bg-white/20 border border-white/40 rounded-full hover:bg-white/30 transition-colors z-[120]"
            >
              <XCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
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
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white"
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
                src="/kitchenaxis-logo.jpg"
                alt="KitchenAxis Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl lg:text-2xl font-bold">
                <span className="text-brand-gray">KITCHEN</span>
                <span className="text-brand-green">AXIS</span>
              </span>
            </div>
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
                    ? "text-brand-green"
                    : "text-brand-gray hover:text-brand-green"
                }`}
              >
                {link.label}
              </a>
            ))}
            <Button
              onClick={() => scrollToSection("#contact")}
              className="btn-primary px-6 py-2 text-sm font-semibold"
            >
              Contact Us
            </Button>
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-brand-gray hover:text-brand-green transition-colors"
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
            className="lg:hidden bg-white border-t border-gray-200"
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
                      ? "bg-brand-green/10 text-brand-green"
                      : "text-brand-gray hover:bg-gray-100 hover:text-brand-green"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <Button
                onClick={() => scrollToSection("#contact")}
                className="btn-primary mt-2 py-3 text-sm font-semibold"
              >
                Contact Us
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50"
    >
      <div className="absolute inset-0 hero-pattern" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4">
              <span className="text-brand-gray">KITCHEN</span>
              <span className="text-brand-green">AXIS</span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl font-playfair text-brand-gray mb-4">
              Engineering the Heart of Every Kitchen
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mb-8">
              <span className="px-3 sm:px-4 py-2 bg-brand-green/10 border border-brand-green/30 rounded-full text-xs sm:text-sm text-brand-green font-medium">
                Kitchen Layout Design
              </span>
              <span className="px-3 sm:px-4 py-2 bg-brand-green/10 border border-brand-green/30 rounded-full text-xs sm:text-sm text-brand-green font-medium">
                MEP Coordination
              </span>
              <span className="px-3 sm:px-4 py-2 bg-brand-green/10 border border-brand-green/30 rounded-full text-xs sm:text-sm text-brand-green font-medium">
                Project Execution
              </span>
            </div>

            <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              Specialized in designing efficient commercial kitchens for restaurants, bars, hotels, and cloud kitchens across Karnataka.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={() => {
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-primary px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold"
              >
                View Our Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold border-brand-green/30 text-brand-green hover:bg-brand-green/10"
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
              <div className="absolute inset-0 rounded-2xl border-2 border-brand-green/30" />
              <div className="absolute inset-4 rounded-2xl border border-brand-green/20" />
              
              <div className="absolute inset-4 rounded-2xl overflow-hidden border-2 border-brand-green/40 shadow-2xl bg-white">
                <Image
                  src="/kitchenaxis-logo.jpg"
                  alt="KitchenAxis Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 bg-white border border-brand-green/40 rounded-xl px-3 sm:px-4 py-2 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-brand-green rounded-full animate-pulse" />
                  <span className="text-xs sm:text-sm text-brand-green font-medium">Available for Projects</span>
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
            className="flex flex-col items-center gap-2 text-brand-green/60 hover:text-brand-green transition-colors"
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
    <section id="about" className="py-24 lg:py-32 relative bg-white">
      <div className="section-divider mb-24" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-playfair text-brand-gray mb-4">
            About <span className="text-brand-green">Us</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-brand-green to-transparent mx-auto" />
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
              <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 to-transparent rounded-3xl" />
              <div className="absolute inset-0 border border-brand-green/20 rounded-3xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/kitchenaxis-logo.jpg"
                  alt="KitchenAxis Logo"
                  fill
                  className="object-contain p-4"
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
            <h3 className="text-3xl lg:text-4xl font-bold text-brand-gray mb-6">
              Engineering Excellence in Kitchen Design
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              At <span className="text-brand-green font-semibold">KitchenAxis</span>, we specialize in creating efficient, functional, and innovative kitchen layouts for restaurants, bars, hotels, and cloud kitchens.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              We provide end-to-end kitchen design solutions including layout planning, equipment placement, MEP coordination (electrical, plumbing, drainage), and complete project execution. Whether you're opening a new restaurant or upgrading your existing kitchen setup, we deliver customized solutions tailored to your specific requirements.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
              <div className="text-center p-3 sm:p-4 bg-brand-green/5 border border-brand-green/20 rounded-xl">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-green">50+</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">Projects</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-brand-green/5 border border-brand-green/20 rounded-xl">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-green">2+</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">Years Exp.</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-brand-green/5 border border-brand-green/20 rounded-xl">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-green">40+</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">Happy Clients</div>
              </div>
            </div>

            {/* Certification */}
            <div className="flex items-start gap-3 sm:gap-4 p-4 bg-brand-green/5 border border-brand-green/20 rounded-xl">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-brand-green/10 border border-brand-green/30 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-brand-green" />
              </div>
              <div>
                <div className="font-semibold text-brand-gray text-sm sm:text-base">Certified Professional</div>
                <div className="text-xs sm:text-sm text-gray-500">AutoCAD 2D & 3D, SketchUp, V-Ray</div>
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
      color: "from-brand-green/20 to-green-200/20",
    },
    {
      icon: Zap,
      title: "MEP Coordination",
      items: ["Electrical design", "Plumbing design", "Drainage systems", "Utility planning"],
      color: "from-green-200/20 to-emerald-200/20",
    },
    {
      icon: Building2,
      title: "Project Management",
      items: ["Site supervision", "Vendor coordination", "Quality control", "Client handling"],
      color: "from-emerald-200/20 to-teal-200/20",
    },
    {
      icon: Cuboid,
      title: "3D Design & Rendering",
      items: ["SketchUp modeling", "Revit Architecture", "V-Ray rendering", "3D visualization"],
      color: "from-teal-200/20 to-cyan-200/20",
    },
  ];

  return (
    <section id="expertise" className="py-24 lg:py-32 relative bg-gray-50">
      <div className="section-divider mb-24" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-playfair text-brand-gray mb-4">
            Our <span className="text-brand-green">Expertise</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-brand-green to-transparent mx-auto mb-6" />
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
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
              <Card className="h-full bg-white border-gray-200 card-hover overflow-hidden group">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <CardHeader className="relative">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-brand-green/10 border border-brand-green/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-brand-green" />
                  </div>
                  <CardTitle className="text-base sm:text-lg text-brand-gray group-hover:text-brand-green transition-colors">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <ul className="space-y-2">
                    {item.items.map((listItem) => (
                      <li key={listItem} className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-green" />
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
      <section id="projects" className="py-24 lg:py-32 relative bg-white">
        <div className="section-divider mb-24" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-playfair text-brand-gray mb-4">
              Key <span className="text-brand-green">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-brand-green to-transparent mx-auto mb-6" />
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
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
                  className="group overflow-hidden bg-white border-gray-200 card-hover cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2 py-1 bg-brand-green/80 border border-brand-green rounded text-xs text-white font-medium">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-2 bg-brand-green rounded-full">
                        <ImageIcon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-brand-gray group-hover:text-brand-green transition-colors mb-1 text-sm sm:text-base">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mb-2 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <MapPin size={12} />
                        {project.location}
                      </div>
                      <span className="text-xs text-brand-green font-medium">Click to view →</span>
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
            <div className="flex flex-wrap items-center justify-center gap-2 px-4 py-3 bg-brand-green/5 border border-brand-green/20 rounded-full mx-auto max-w-md">
              <UtensilsCrossed className="w-5 h-5 text-brand-green" />
              <span className="text-gray-500">Also worked on:</span>
              <span className="text-brand-gray font-medium">Hotels</span>
              <span className="text-brand-green">•</span>
              <span className="text-brand-gray font-medium">Bakeries</span>
              <span className="text-brand-green">•</span>
              <span className="text-brand-gray font-medium">Cloud Kitchens</span>
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
      formDataObj.append("_subject", `New Contact from ${formData.name} - KitchenAxis Website`);
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
      value: "www.kitchenaxis.com",
      href: "https://timmayya-portfolio.vercel.app",
    },
  ];

  return (
    <section id="contact" className="py-24 lg:py-32 relative bg-gray-50">
      <div className="section-divider mb-24" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-playfair text-brand-gray mb-4">
            Get In <span className="text-brand-green">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-brand-green to-transparent mx-auto mb-6" />
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
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
              <h3 className="text-3xl font-bold mb-2">
                <span className="text-brand-gray">KITCHEN</span>
                <span className="text-brand-green">AXIS</span>
              </h3>
              <p className="text-gray-500">Engineering the Heart of Every Kitchen</p>
            </div>

            <div className="space-y-3 sm:space-y-4 mb-8">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.label === "Website" ? "_blank" : undefined}
                  rel={item.label === "Website" ? "noopener noreferrer" : undefined}
                  className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white border border-gray-200 rounded-xl hover:border-brand-green/30 hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-brand-green/10 border border-brand-green/30 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-brand-green" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm text-gray-400">{item.label}</div>
                    <div className="text-sm sm:text-base text-brand-gray group-hover:text-brand-green transition-colors break-all">
                      {item.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="hidden lg:flex justify-center">
              <div className="relative w-48 h-48">
                <Image
                  src="/kitchenaxis-logo.jpg"
                  alt="KitchenAxis Logo"
                  fill
                  className="object-contain opacity-70"
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
            <Card className="bg-white border-gray-200">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                {/* Error Message */}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2"
                  >
                    <XCircle className="w-5 h-5 text-red-500" />
                    <span className="text-red-600 text-sm">{submitError}</span>
                  </motion.div>
                )}
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-brand-green/20 border border-brand-green/40 flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-brand-green" />
                    </div>
                    <h3 className="text-2xl font-semibold text-brand-gray mb-2">Message Sent!</h3>
                    <p className="text-gray-500">
                      Thank you for contacting us. We'll get back to you soon!
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-brand-gray mb-2">
                        Your Name
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="John Doe"
                        required
                        className="bg-gray-50 border-gray-200 text-brand-gray placeholder:text-gray-400 focus:border-brand-green focus:ring-brand-green"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-gray mb-2">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="john@example.com"
                        required
                        className="bg-gray-50 border-gray-200 text-brand-gray placeholder:text-gray-400 focus:border-brand-green focus:ring-brand-green"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-gray mb-2">
                        Your Message
                      </label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Tell us about your project..."
                        rows={5}
                        required
                        className="bg-gray-50 border-gray-200 text-brand-gray placeholder:text-gray-400 focus:border-brand-green focus:ring-brand-green resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary py-3 text-base"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin h-5 w-5"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send size={18} />
                          Send Message
                        </span>
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
    <footer className="bg-brand-gray py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image
                src="/kitchenaxis-logo.jpg"
                alt="KitchenAxis Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <span className="text-lg font-bold">
                <span className="text-white">KITCHEN</span>
                <span className="text-brand-green">AXIS</span>
              </span>
              <p className="text-gray-400 text-xs">Engineering the Heart of Every Kitchen</p>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} KitchenAxis. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Commercial Kitchen Design & Engineering
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Page Component
export default function Home() {
  return (
    <main className="min-h-screen bg-white">
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
