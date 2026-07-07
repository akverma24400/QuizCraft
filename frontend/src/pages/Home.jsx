import HeroSection from "../components/home/HeroSection";
import UploadSection from "../components/home/UploadSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}

      <HeroSection />

      {/* Upload */}

      <UploadSection />
    </div>
  );
}
