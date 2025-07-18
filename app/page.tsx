"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Zap, Users, Shield, Rocket, Mail } from "lucide-react"
import Link from "next/link"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { Side3D } from "@/components/side-3d"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged, signOut, User } from "firebase/auth"

export default function LandingPage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    setUser(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Navigation */}
      <header className="relative z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                AppName
              </span>
            </Link>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-slate-600 hover:text-slate-900 transition-colors duration-200 font-medium"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-slate-600 hover:text-slate-900 transition-colors duration-200 font-medium"
              >
                Pricing
              </a>
              <a
                href="#about"
                className="text-slate-600 hover:text-slate-900 transition-colors duration-200 font-medium"
              >
                About
              </a>
            </nav>

            {/* Navigation Buttons or User Info */}
            <div className="flex items-center space-x-3">
              {user ? (
                <>
                  <Mail className="h-6 w-6 text-blue-600" />
                  <span className="text-slate-900 font-medium">{user.email}</span>
                  <Button onClick={handleLogout} variant="ghost" className="hover:bg-slate-100">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200 hover:scale-105"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 h-80 w-80 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-4rem)]">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Animated Badge */}
              <div className="inline-flex items-center rounded-full bg-white/60 px-4 py-2 text-sm font-medium text-slate-600 shadow-lg backdrop-blur-sm border border-slate-200/60 hover:bg-white/80 transition-all duration-300 hover:scale-105 animate-fade-in-up">
                <span className="mr-2 h-2 w-2 rounded-full bg-green-500 animate-ping"></span>
                <span className="mr-2 h-2 w-2 rounded-full bg-green-500 absolute"></span>
                Now in Beta • Join 50k+ developers
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl animate-fade-in-up delay-200">
                Build Amazing
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-gradient-x">
                  Web Applications
                </span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-600 mt-4">
                  10x Faster Than Ever
                </span>
              </h1>

              {/* Description */}
              <p className="max-w-2xl text-lg text-slate-600 sm:text-xl leading-relaxed animate-fade-in-up delay-300">
                Create powerful, scalable web applications with our modern development platform. Ship faster, scale
                effortlessly, and delight your users with exceptional experiences.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-400">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-lg px-8 py-6 border-0 relative overflow-hidden"
                  >
                    <span className="relative z-10">Get Started Free</span>
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </Link>

                <Button
                  size="lg"
                  variant="outline"
                  className="group text-slate-700 border-slate-300 hover:bg-white hover:border-slate-400 hover:shadow-lg transition-all duration-300 hover:scale-105 text-lg px-8 py-6 bg-white/50 backdrop-blur-sm"
                >
                  <Star className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                  Watch Demo
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-6 pt-8 animate-fade-in-up delay-500">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">99.9%</div>
                  <div className="text-sm text-slate-600">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">50k+</div>
                  <div className="text-sm text-slate-600">Developers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">10x</div>
                  <div className="text-sm text-slate-600">Faster</div>
                </div>
              </div>
            </div>

            {/* Right Side - 3D Scene */}
            <div className="relative h-[600px] lg:h-[700px] animate-fade-in-up delay-600">
              <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 shadow-2xl">
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                  <Suspense fallback={null}>
                    <Side3D />
                  </Suspense>
                </Canvas>
              </div>

              {/* 3D Scene Overlay Info */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md rounded-lg p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Interactive 3D Experience</h3>
                    <p className="text-sm text-white/80">Powered by WebGL & Three.js</p>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-white/60">Live</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="relative py-24 bg-white/40 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">Why Choose Our Platform?</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Everything you need to build, deploy, and scale modern web applications
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="group">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-200/60 hover:bg-white/80 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3 text-center">Enterprise Security</h3>
                  <p className="text-slate-600 text-center">
                    Bank-level security with 99.9% uptime guarantee and SOC 2 compliance.
                  </p>
                </div>
              </div>

              <div className="group">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-200/60 hover:bg-white/80 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3 text-center">Global Community</h3>
                  <p className="text-slate-600 text-center">
                    Join 50,000+ developers building the future of web applications.
                  </p>
                </div>
              </div>

              <div className="group">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-200/60 hover:bg-white/80 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Rocket className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3 text-center">Lightning Fast</h3>
                  <p className="text-slate-600 text-center">
                    Deploy 10x faster with our optimized build pipeline and global CDN.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative border-t border-slate-200/60 bg-white/40 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="md:col-span-1">
                <Link href="/" className="flex items-center space-x-2 group mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-slate-900">AppName</span>
                </Link>
                <p className="text-slate-600 mb-6 max-w-sm leading-relaxed">
                  Build amazing web applications with our modern development platform. Ship faster and scale
                  effortlessly with cutting-edge technology.
                </p>
                <div className="flex space-x-4">
                  {[
                    {
                      name: "Twitter",
                      icon: "M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84",
                    },
                    {
                      name: "GitHub",
                      icon: "M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z",
                    },
                    {
                      name: "LinkedIn",
                      icon: "M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z",
                    },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href="#"
                      className="text-slate-400 hover:text-slate-600 transition-all duration-200 hover:scale-110"
                    >
                      <span className="sr-only">{social.name}</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d={social.icon} clipRule="evenodd" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Links Sections */}
              {[
                { title: "Product", links: ["Features", "Pricing", "Documentation", "API Reference", "Changelog"] },
                { title: "Company", links: ["About", "Blog", "Careers", "Contact", "Press"] },
                { title: "Support", links: ["Help Center", "Community", "Status", "Security", "Privacy"] },
              ].map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-slate-600 hover:text-slate-900 transition-colors duration-200 hover:translate-x-1 inline-block"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom Footer */}
            <div className="mt-12 pt-8 border-t border-slate-200/60">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-slate-500 text-sm">© 2024 AppName. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  {["Terms of Service", "Privacy Policy", "Cookie Policy"].map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="text-slate-500 hover:text-slate-700 text-sm transition-colors duration-200"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>

      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-1000 { animation-delay: 1s; }
      `}</style>
    </div>
  )
}