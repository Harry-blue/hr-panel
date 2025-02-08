import Header from "./landing/header";
import Hero from "./landing/hero";
import Features from "./landing/features";
import Modules from "./landing/modules";
import Stats from "./landing/stats";
import Footer from "./landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <Modules />
        <Stats />
      </main>
      <Footer />
    </div>
  );
}
