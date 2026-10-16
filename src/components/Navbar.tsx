/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, UserCheck, Flame } from 'lucide-react';

interface NavbarProps {
  onOpenCheckout: (kitId?: 'basico' | 'atleta' | 'vip', distanceId?: string) => void;
  onOpenAthleteArea: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCheckout, onOpenAthleteArea }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#090B0E]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-xl sm:text-2xl font-display font-extrabold tracking-wider text-white whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-lime-400 to-emerald-500 flex items-center justify-center text-slate-950 font-black shadow-md shadow-lime-400/20 group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5 fill-slate-950" />
          </div>
          <span className="tracking-widest">
            SPEED<span className="text-lime-400">NIGHT</span>
          </span>
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold tracking-wide text-slate-300">
          <a href="#percursos" className="hover:text-lime-400 transition-colors whitespace-nowrap shrink-0">
            Percursos & Altimetria
          </a>
          <a href="#kits-lotes" className="hover:text-lime-400 transition-colors whitespace-nowrap shrink-0">
            Kits & Lotes
          </a>
          <a href="#cronograma" className="hover:text-lime-400 transition-colors whitespace-nowrap shrink-0">
            Cronograma
          </a>
          <a href="#regulamento" className="hover:text-lime-400 transition-colors whitespace-nowrap shrink-0">
            Regulamento & FAQ
          </a>
          <a href="#resultados" className="hover:text-lime-400 transition-colors whitespace-nowrap shrink-0">
            Resultados & Fotos
          </a>
        </nav>

        {/* Zone 3: 1 primary action or athlete quick access */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenAthleteArea}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-300 bg-slate-900 border border-slate-700/80 rounded-lg hover:border-slate-500 hover:text-white transition-all whitespace-nowrap"
            aria-label="Abrir Área do Atleta"
          >
            <UserCheck className="w-4 h-4 text-lime-400" />
            <span>Área do Atleta</span>
          </button>
          <button
            onClick={() => onOpenCheckout()}
            className="px-5 py-2 text-xs font-extrabold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-lime-400 to-emerald-400 rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-lime-400/25 whitespace-nowrap shrink-0"
          >
            Inscreva-se Agora
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenAthleteArea}
            className="p-2 text-slate-300 bg-slate-900 border border-slate-800 rounded-lg"
            aria-label="Minhas Inscrições"
          >
            <UserCheck className="w-4 h-4 text-lime-400" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg"
            aria-label="Alternar menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-800 bg-[#090B0E] px-4 pt-3 pb-5 space-y-3">
          <nav className="flex flex-col space-y-2 text-sm font-semibold text-slate-200">
            <a
              href="#percursos"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-800 hover:text-lime-400"
            >
              Percursos & Altimetria
            </a>
            <a
              href="#kits-lotes"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-800 hover:text-lime-400"
            >
              Kits & Lotes
            </a>
            <a
              href="#cronograma"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-800 hover:text-lime-400"
            >
              Cronograma & Retirada
            </a>
            <a
              href="#regulamento"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-800 hover:text-lime-400"
            >
              Regulamento Geral & FAQ
            </a>
            <a
              href="#resultados"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-800 hover:text-lime-400"
            >
              Resultados & Fotos
            </a>
          </nav>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCheckout();
              }}
              className="w-full py-2.5 text-center font-extrabold uppercase text-xs tracking-wider text-slate-950 bg-gradient-to-r from-lime-400 to-emerald-400 rounded-lg shadow-md shadow-lime-400/20"
            >
              Inscreva-se Agora (2º Lote)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAthleteArea();
              }}
              className="w-full py-2.5 text-center font-bold text-xs text-slate-200 bg-slate-900 border border-slate-800 rounded-lg"
            >
              Consultar Comprovante / Check-in QR
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
