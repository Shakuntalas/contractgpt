import Hero from "../components/Hero";
import Features from "../components/Features";
import Stats from "../components/Stats";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import CTASection from "../components/CTASection";

function Home() {
  return (
    <div className="page-content">
      <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <FAQ />
      <CTASection />
    </div>
  );
}

export default Home;
