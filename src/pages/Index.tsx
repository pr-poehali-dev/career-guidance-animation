import { useState } from "react";
import NavBar from "@/components/NavBar";
import HomePage from "@/pages/HomePage";
import ProfessionsPage from "@/pages/ProfessionsPage";
import ProfilePage from "@/pages/ProfilePage";
import RatingPage from "@/pages/RatingPage";
import ScenariosPage from "@/pages/ScenariosPage";

type Page = "home" | "professions" | "scenarios" | "rating" | "profile";

export default function Index() {
  const [activePage, setActivePage] = useState<Page>("home");

  const renderPage = () => {
    switch (activePage) {
      case "home": return <HomePage />;
      case "professions": return <ProfessionsPage />;
      case "scenarios": return <ScenariosPage />;
      case "rating": return <RatingPage />;
      case "profile": return <ProfilePage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen grid-bg bg-background">
      <NavBar activePage={activePage} onNavigate={(page) => setActivePage(page as Page)} />

      <main className="md:pl-64 pb-20 md:pb-0 min-h-screen">
        <div key={activePage} className="animate-fade-in-up">
          {renderPage()}
        </div>
      </main>

      <div className="fixed top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)', zIndex: 0 }} />
      <div className="fixed bottom-20 left-64 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.05) 0%, transparent 70%)', zIndex: 0 }} />
    </div>
  );
}