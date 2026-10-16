/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { KITS_DATA, LOTES_DATA, KitTier } from '../data/raceData';
import { Check, Sparkles, Clock, ArrowRight, Shield, Award } from 'lucide-react';

interface KitsLotesSectionProps {
  onSelectKit: (kitId: KitTier['id']) => void;
  onOpenCheckout: () => void;
}

export const KitsLotesSection: React.FC<KitsLotesSectionProps> = ({ onSelectKit, onOpenCheckout }) => {
  return (
    <section id="kits-lotes" className="py-16 lg:py-24 border-b border-slate-800 bg-[#090B0E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-lime-400 mb-2">
            <Award className="w-4 h-4" />
            <span>Estrutura & Equipamento do Atleta</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white uppercase tracking-tight">
            Seleção de Kits & Lotes
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Escolha a experiência que melhor combina com a sua meta. Todos os kits dão direito ao número oficial de peito, chip de cronometragem e medalha finisher.
          </p>
        </div>

        {/* Kits Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-16">
          {KITS_DATA.map((kit) => (
            <div
              key={kit.id}
              className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                kit.highlighted
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-lime-400 shadow-2xl shadow-lime-400/15 md:-translate-y-2'
                  : 'bg-slate-900/80 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Highlight Badge */}
              {kit.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-lime-400 to-emerald-400 text-slate-950 font-black text-[11px] uppercase tracking-wider rounded-full shadow-md flex items-center gap-1.5 whitespace-nowrap">
                  <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Mais Escolhido pelos Atletas</span>
                </div>
              )}

              {/* Kit Header */}
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
                      {kit.badge}
                    </span>
                    <h3 className="text-2xl font-display font-black text-white uppercase mt-0.5">
                      {kit.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mb-6 leading-relaxed min-h-[36px]">
                  {kit.description}
                </p>

                {/* Price Display */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 mb-6">
                  <span className="text-[11px] text-slate-400 block uppercase font-bold tracking-wider">
                    {kit.id === 'basico' ? 'Incluso no valor da inscrição' : 'Adicional sobre o lote'}
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xs text-slate-400 font-mono-num font-bold">R$</span>
                    <span className="font-display font-black text-3xl text-white font-mono-num">
                      {kit.id === 'basico' ? '0,00' : kit.price.toFixed(2).replace('.', ',')}
                    </span>
                    {kit.id !== 'basico' && (
                      <span className="text-xs text-slate-400 ml-1">/kit oficial</span>
                    )}
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3 mb-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    O que está incluso:
                  </span>
                  {kit.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          kit.highlighted
                            ? 'bg-lime-400/20 text-lime-400'
                            : 'bg-emerald-500/20 text-emerald-400'
                        }`}
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kit Action CTA */}
              <button
                onClick={() => onSelectKit(kit.id)}
                className={`w-full py-3.5 px-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 ${
                  kit.highlighted
                    ? 'bg-gradient-to-r from-lime-400 to-emerald-400 text-slate-950 hover:brightness-110 active:scale-98 shadow-lg shadow-lime-400/25'
                    : 'bg-slate-800 text-white hover:bg-slate-700 active:scale-98'
                }`}
              >
                <span>Escolher {kit.title}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          ))}
        </div>

        {/* Lotes Table & Progress */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-lime-400">
                Tabela Oficial de Inscrições
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase">
                Vigência de Lotes & Preços
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Clock className="w-4 h-4 text-lime-400" />
              <span>O 2º lote encerra em 10/11 ou ao atingir o limite de vagas</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  <th className="pb-3 pr-4">Lote</th>
                  <th className="pb-3 px-4">Período de Vigência</th>
                  <th className="pb-3 px-4 font-mono-num">5K / 10K</th>
                  <th className="pb-3 px-4 font-mono-num">21K (Meia)</th>
                  <th className="pb-3 px-4">Status</th>
                  <th className="pb-3 pl-4 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {LOTES_DATA.map((lote) => (
                  <tr
                    key={lote.number}
                    className={`transition-colors ${
                      lote.status === 'active' ? 'bg-lime-950/15' : 'opacity-80'
                    }`}
                  >
                    <td className="py-4 pr-4 font-display font-bold text-white text-base">
                      {lote.name}
                    </td>
                    <td className="py-4 px-4 text-slate-300 text-xs sm:text-sm">
                      {lote.period}
                    </td>
                    <td className="py-4 px-4 font-mono-num font-bold text-white">
                      R$ {lote.price5k10k.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="py-4 px-4 font-mono-num font-bold text-lime-400">
                      R$ {lote.price21k.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="py-4 px-4">
                      {lote.status === 'closed' && (
                        <span className="text-xs font-bold text-rose-400 bg-rose-950/40 px-2.5 py-1 rounded border border-rose-900/50">
                          Esgotado
                        </span>
                      )}
                      {lote.status === 'active' && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-lime-400 bg-lime-950/50 px-2.5 py-1 rounded border border-lime-800/50">
                            Disponível ({lote.progressPercent}%)
                          </span>
                        </div>
                      )}
                      {lote.status === 'upcoming' && (
                        <span className="text-xs font-bold text-slate-400 bg-slate-800 px-2.5 py-1 rounded">
                          Em Breve
                        </span>
                      )}
                    </td>
                    <td className="py-4 pl-4 text-right">
                      {lote.status === 'active' ? (
                        <button
                          onClick={onOpenCheckout}
                          className="px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-lime-400 to-emerald-400 rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-md shadow-lime-400/20"
                        >
                          Inscrever-se
                        </button>
                      ) : (
                        <span className="text-xs text-slate-500 font-medium">Indisponível</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Inscrição 100% segura com garantia de devolução em até 7 dias conforme CDC.</span>
            </div>
            <div className="text-slate-500">
              Taxa de conveniência bancária já inclusa em todos os valores informados.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
