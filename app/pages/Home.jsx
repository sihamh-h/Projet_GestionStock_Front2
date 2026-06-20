import NavBar from "@/navigation/MainNav/NavBar";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Faq from "@/components/Faq";
import Footer from "@/navigation/footer/Footer";
import LoginDialog from "@/components/LoginDialog";
import RegisterDialog from "@/components/RegisterDialog";
import { useState } from "react";



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
        <ProblemSolution/>
        <Features/>
        <HowItWorks/>
        <Faq/>
        <Footer/>
  
      </main>
  );
}