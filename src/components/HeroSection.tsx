/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, ChevronRight, Activity, ShieldCheck, Trophy, Sparkles } from 'lucide-react';
import { RACE_CONFIG } from '../data/raceData';

interface HeroSectionProps {
  onOpenCheckout: () => void;
  onScrollToPercursos: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCheckout, onScrollToPercursos }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 38, hours: 14, minutes: 22, seconds: 40 });

  useEffect(() => {
    const target = new Date(RACE_CONFIG.countdownTarget).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800">
      {/* Background Graphic Elements & Dynamic Radial Lights */}
      <div className="absolute inset-0 bg-radial from-lime-500/10 via-slate-950/60 to-[#090B0E] pointer-events-none" />
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-lime-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* SVG Circuit Grid Overlay */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#94A3B8" strokeWidth="0.5" />
              <circle cx="60" cy="0" r="1.5" fill="#CCFF00" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Main Hero Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Athletic Event Pill & Trust Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300">
              <span className="text-lime-400 font-bold uppercase tracking-wider">
                {RACE_CONFIG.edition}
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300">Chancela Oficial CBAt</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-emerald-400 font-bold">2º Lote Aberto (84% Vendido)</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white uppercase leading-[0.95]">
              DOMINE A NOITE. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-300 to-teal-400">
                QUEBRE SEU RECORDE
              </span>{' '}
              NO CORAÇÃO DE SP.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              A corrida noturna mais eletrizante do calendário nacional. Percurso 100% asfaltado no Parque Ibirapuera,
              túnel iluminado com efeitos de luz, hidratação de elite e kit premium de alta performance.
            </p>

            {/* Event Key Details Row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 pt-1 text-sm font-medium text-slate-200">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-lime-400 shrink-0" />
                <span>{RACE_CONFIG.dateFormatted}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-5 h-5 text-lime-400 shrink-0" />
                <span>{RACE_CONFIG.venue}</span>
              </div>
            </div>

            {/* Distance Tags Strip */}
            <div className="pt-2">
              <p className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-2">
                Distâncias Oficiais Disponíveis:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { tag: '3K Caminhada', color: 'border-slate-700 bg-slate-900/80 text-slate-300' },
                  { tag: '5K Speed Run', color: 'border-lime-500/40 bg-lime-950/30 text-lime-300' },
                  { tag: '10K Pro Challenge', color: 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300' },
                  { tag: '21K Meia Maratona', color: 'border-cyan-500/40 bg-cyan-950/30 text-cyan-300 font-bold' },
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 text-xs font-semibold rounded-md border ${item.color} whitespace-nowrap`}
                  >
                    {item.tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={onOpenCheckout}
                className="px-8 py-3.5 text-sm sm:text-base font-extrabold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-lime-400 to-emerald-400 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-lime-400/25 flex items-center justify-center gap-2"
              >
                <span>Garantir Vaga no 2º Lote</span>
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              <button
                onClick={onScrollToPercursos}
                className="px-6 py-3.5 text-sm font-bold text-slate-200 bg-slate-900/90 border border-slate-700 hover:border-slate-500 hover:text-white rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <span>Ver Altimetria e Traçados</span>
              </button>
            </div>
          </div>

          {/* Right Column: Countdown Box & Race Graphic Showcase */}
          <div className="lg:col-span-5 space-y-6">
            {/* Real-time Countdown Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-2xl relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-lime-400 animate-pulse" />
                  <span className="text-xs font-extrabold uppercase tracking-widest text-slate-300">
                    Cronômetro Regressivo Oficial
                  </span>
                </div>
                <span className="text-xs font-mono-num text-lime-400 font-bold bg-lime-950/50 px-2.5 py-0.5 rounded border border-lime-800/40">
                  LARGADA EM BREVE
                </span>
              </div>

              {/* Countdown Digits */}
              <div className="grid grid-cols-4 gap-2.5 sm:gap-3 text-center">
                {[
                  { label: 'DIAS', val: timeLeft.days },
                  { label: 'HORAS', val: timeLeft.hours },
                  { label: 'MINUTOS', val: timeLeft.minutes },
                  { label: 'SEGUNDOS', val: timeLeft.seconds },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="p-3 sm:p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-col items-center justify-center"
                  >
                    <span className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight font-mono-num">
                      {item.val.toString().padStart(2, '0')}
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Lote quick progress */}
              <div className="mt-5 pt-4 border-t border-slate-800/80">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-400">Vagas do 2º Lote:</span>
                  <span className="text-lime-400 font-bold font-mono-num">84% Preenchido</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-lime-400 to-emerald-400 rounded-full transition-all duration-1000"
                    style={{ width: '84%' }}
                  />
                </div>
              </div>
            </div>

            {/* Stadium Night Race Stylized Graphic Preview */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                <span>ESTRUTURA COMPLETA DA PROVA</span>
                <span className="text-lime-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Padrão Ouro
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                  <Trophy className="w-5 h-5 text-lime-400 mx-auto mb-1" />
                  <div className="font-display text-lg font-bold text-white">R$ 25.000</div>
                  <div className="text-[11px] text-slate-400">Em Premiações</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                  <div className="font-display text-lg font-bold text-white">UTI Móvel</div>
                  <div className="text-[11px] text-slate-400">Em 4 Pontos</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                  <Activity className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                  <div className="font-display text-lg font-bold text-white">Chip RFID</div>
                  <div className="text-[11px] text-slate-400">4 Tapetes Split</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
