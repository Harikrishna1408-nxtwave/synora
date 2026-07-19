import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Problem from "@/components/home/Problem";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import WhySynora from "@/components/home/WhySynora";
import CTA from "@/components/home/CTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Problem />
      <Features />
      <HowItWorks />
      <WhySynora />
      <CTA />
      <Footer />
    </>
  );
}