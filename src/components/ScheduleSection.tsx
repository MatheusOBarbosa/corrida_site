/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SCHEDULE_DAYS } from '../data/raceData';
import { Clock, MapPin, AlertCircle, FileText, UserCheck, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const ScheduleSection: React.FC = () => {
  const [activeDayIndex, setActiveDayIndex] = useState(2); // Default to Race Day

  const activeDay = SCHEDULE_DAYS[activeDayIndex];

  return (
    <section id="cronograma" className="py-16 lg:py-24 border-b border-slate-800 bg-[#090B0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-lime-400 mb-2">
              <Clock className="w-4 h-4" />
              <span>Programação Oficial do Evento</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white uppercase tracking-tight">
              Cronograma & Retirada de Kits
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Fique atento aos horários da Expo SpeedNight para retirar seu chip e número de peito. Não haverá entrega na arena de largada.
            </p>
          </div>

          {/* Day Selector Buttons */}
          <div className="flex items-center p-1.5 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
            {SCHEDULE_DAYS.map((day, idx) => (
              <button
                key={idx}
                onClick={() => setActiveDayIndex(idx)}
                className={`px-4 py-2 text-xs sm:text-sm font-display font-bold rounded-lg transition-all whitespace-nowrap ${
                  activeDayIndex === idx
                    ? 'bg-gradient-to-r from-lime-400 to-emerald-400 text-slate-950 shadow-md shadow-lime-400/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {idx === 0 ? 'Sexta (Expo 1)' : idx === 1 ? 'Sábado (Expo 2)' : 'Noite da Prova (Dia D)'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Timeline column */}
          <div className="lg:col-span-7 rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 space-y-6">
            <div className="pb-4 border-b border-slate-800">
              <span className="text-xs uppercase font-extrabold tracking-wider text-lime-400">
                {activeDay.day}
              </span>
              <h3 className="text-2xl font-display font-black text-white uppercase mt-0.5">
                {activeDay.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
                <MapPin className="w-4 h-4 text-lime-400 shrink-0" />
                <span>{activeDay.location}</span>
              </div>
            </div>

            {/* Timeline Steps */}
            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
              {activeDay.items.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Pin Dot */}
                  <div className="absolute -left-6 sm:-left-8 top-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-950 border-2 border-lime-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                  </div>

                  <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-colors">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-display font-black text-lime-400 text-lg font-mono-num">
                        {item.time}
                      </span>
                      <h4 className="font-display font-bold text-white text-base uppercase">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rules & Documents Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            {/* Urgent Alert Banner */}
            <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-600/40 text-amber-300 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                <span>ATENÇÃO: Retirada Somente na Expo</span>
              </div>
              <p className="text-xs leading-relaxed text-amber-200/90">
                Não serão entregues kits após as 18h00 do sábado (21/11) e em nenhuma hipótese na arena de largada no Parque Ibirapuera.
              </p>
            </div>

            {/* Required Documents Card */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <FileText className="w-4 h-4 text-lime-400" />
                <span>Documentos Obrigatórios para Retirada</span>
              </h4>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-300">
                    <strong className="text-white block">Documento Oficial com Foto:</strong>
                    RG, CNH (física ou digital oficial), Passaporte ou Carteira de Trabalho.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-300">
                    <strong className="text-white block">Comprovante de Inscrição:</strong>
                    Disponível no painel da Área do Atleta deste portal com o QR Code de check-in.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
                  <UserCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-300">
                    <strong className="text-white block">Retirada por Terceiros:</strong>
                    Cópia do documento do atleta inscrito + autorização por escrito assinada + comprovante de pagamento.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
                  <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-300">
                    <strong className="text-white block">Menores de 18 Anos:</strong>
                    Termo de responsabilidade assinado pelo responsável legal anexado à ficha do atleta.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
