import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Automation from "@/components/Automation";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Automation />
      
      <footer className="h-20" />
    </main>
  );
}
