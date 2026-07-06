import NavBar from "@/navigation/MainNav/NavBar";
import Hero from "@/components/Hero";
//import ProblemSolution from "@/components/ProblemSolution";
//import Features from "@/components/Features";
//import HowItWorks from "@/components/HowItWorks";
//import Faq from "@/components/Faq";
//import Footer from "@/navigation/footer/Footer";
import LoginDialog from "@/components/LoginDialog";
import RegisterDialog from "@/components/RegisterDialog";
import { useState } from "react";
import {lazy, Suspense } from "react";

const ProblemSolution = lazy(() => import("@/components/ProblemSolution"));
const Features = lazy(() => import("@/components/Features"));
const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const Faq = lazy(() => import("@/components/Faq"));
const Footer = lazy(() => import("@/navigation/footer/Footer"));

export function Home() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  return (

      <main className="min-h-screen bg-slate-950 text-white overflow-hidden">
        <NavBar  onLoginOpen={() => setLoginOpen(true)} onRegisterOpen={() => setRegisterOpen(true)}/>
        <Hero onRegisterOpen={() => setRegisterOpen(true)}/>
           <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
      <RegisterDialog
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onSuccess={() => { setRegisterOpen(false); setLoginOpen(true); }}
      />
      <Suspense fallback={null}>
        <ProblemSolution/>
        <Features/>
        <HowItWorks/>
        <Faq/>
        <Footer/>
  </Suspense>
      </main>
  );
}