/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ModalitiesAltimetry } from './components/ModalitiesAltimetry';
import { KitsLotesSection } from './components/KitsLotesSection';
import { ScheduleSection } from './components/ScheduleSection';
import { RegulamentoFaq } from './components/RegulamentoFaq';
import { ResultsSection } from './components/ResultsSection';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';
import { AthleteAreaModal, StoredRegistration } from './components/AthleteAreaModal';
import { ChevronRight, Flame } from 'lucide-react';

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAthleteAreaOpen, setIsAthleteAreaOpen] = useState(false);
  const [checkoutKit, setCheckoutKit] = useState<'basico' | 'atleta' | 'vip'>('atleta');
  const [checkoutDistance, setCheckoutDistance] = useState<string>('10K');

  // Seed with realistic initial registration for instant verification in Athlete Area
  const [registrations, setRegistrations] = useState<StoredRegistration[]>([
    {
      code: 'SN26-8942-SP',
      bibNumber: '1042',
      athlete: {
        fullName: 'Lucas Ferreira Mendes',
        cpf: '348.109.872-00',
        birthDate: '1994-06-12',
        gender: 'M',
        email: 'lucas.mendes@email.com',
        phone: '(11) 98765-4321',
        emergencyContact: 'Juliana Mendes',
        emergencyPhone: '(11) 99887-1122',
        runningClub: 'Equipe Alpha Runners',
        distance: '10K',
        kitType: 'atleta',
        tShirtSize: 'M',
        medalEngraving: true,
        sportsInsurance: true,
        agreedToTerms: true,
        paymentMethod: 'pix',
      },
      grandTotal: 169.9,
      createdAt: '15/10/2026',
    },
  ]);

  const handleOpenCheckout = (kitId?: 'basico' | 'atleta' | 'vip', distanceId?: string) => {
    if (kitId) setCheckoutKit(kitId);
    if (distanceId) setCheckoutDistance(distanceId);
    setIsCheckoutOpen(true);
  };

  const handleSelectKit = (kitId: 'basico' | 'atleta' | 'vip') => {
    setCheckoutKit(kitId);
    setIsCheckoutOpen(true);
  };

  const handleSelectDistance = (distanceId: string) => {
    setCheckoutDistance(distanceId);
    setIsCheckoutOpen(true);
  };

  const handleScrollToPercursos = () => {
    const el = document.getElementById('percursos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegistrationSuccess = (newReg: {
    code: string;
    athlete: any;
    grandTotal: number;
    createdAt: string;
  }) => {
    const fullReg: StoredRegistration = {
      ...newReg,
      bibNumber: `${Math.floor(1000 + Math.random() * 4000)}`,
    };
    setRegistrations((prev) => [fullReg, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090B0E] text-slate-100 font-sans selection:bg-lime-400 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        onOpenCheckout={() => handleOpenCheckout()}
        onOpenAthleteArea={() => setIsAthleteAreaOpen(true)}
      />

      <main className="flex-1 pb-24 sm:pb-28">
        {/* 1. Hero Section */}
        <HeroSection
          onOpenCheckout={() => handleOpenCheckout()}
          onScrollToPercursos={handleScrollToPercursos}
        />

        {/* 2. Modalities & Interactive Altimetry */}
        <ModalitiesAltimetry onSelectDistance={handleSelectDistance} />

        {/* 3. Kits & Lotes Comparison Table */}
        <KitsLotesSection
          onSelectKit={handleSelectKit}
          onOpenCheckout={() => handleOpenCheckout()}
        />

        {/* 4. Timeline Schedule & Kit Pickup Rules */}
        <ScheduleSection />

        {/* 5. Results & Photo Recognition */}
        <ResultsSection />

        {/* 6. Technical Regulations & FAQ */}
        <RegulamentoFaq />
      </main>

      {/* Footer */}
      <Footer />

      {/* Persistent Floating Bottom Action Strip (Responsive, strictly under 15% mobile viewport cap) */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#090B0E]/95 backdrop-blur-md border-t border-slate-800/80 px-3 sm:px-6 py-2 sm:py-3 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left info: Compact on mobile, detailed on desktop */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-lime-400/10 border border-lime-400/30 flex items-center justify-center text-lime-400 shrink-0">
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <div className="text-[11px] sm:text-xs font-bold text-white font-display tracking-wide uppercase flex items-center gap-1.5 sm:gap-2">
                <span className="hidden sm:inline">Circuito SpeedNight SP</span>
                <span className="text-[10px] text-lime-400 font-mono-num font-extrabold bg-lime-950/80 px-2 py-0.5 rounded border border-lime-800/50">
                  2º LOTE ABERTO
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 truncate max-w-[170px] sm:max-w-none">
                3K · 5K · 10K · 21K no Ibirapuera
              </p>
            </div>
          </div>

          {/* Right action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsAthleteAreaOpen(true)}
              className="px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
            >
              Área Atleta
            </button>
            <button
              onClick={() => handleOpenCheckout()}
              className="px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-lime-400 to-emerald-400 rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-md shadow-lime-400/20 flex items-center gap-1 whitespace-nowrap"
            >
              <span>Inscrever</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Modals */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        preselectedKit={checkoutKit}
        preselectedDistance={checkoutDistance}
        onRegistrationSuccess={handleRegistrationSuccess}
      />

      <AthleteAreaModal
        isOpen={isAthleteAreaOpen}
        onClose={() => setIsAthleteAreaOpen(false)}
        registrations={registrations}
      />
    </div>
  );
}
