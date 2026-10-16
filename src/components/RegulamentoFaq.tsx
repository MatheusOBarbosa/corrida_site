/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FAQ_DATA } from '../data/raceData';
import { ChevronDown, HelpCircle, FileText, Download, CheckCircle2 } from 'lucide-react';
import { RegulamentoModal } from './RegulamentoModal';

export const RegulamentoFaq: React.FC = () => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0, 1]); // first two open by default
  const [isRegulamentoModalOpen, setIsRegulamentoModalOpen] = useState(false);

  const toggleIndex = (idx: number) => {
    if (openIndexes.includes(idx)) {
      setOpenIndexes(openIndexes.filter((i) => i !== idx));
    } else {
      setOpenIndexes([...openIndexes, idx]);
    }
  };

  return (
    <section id="regulamento" className="py-16 lg:py-24 border-b border-slate-800 bg-[#090B0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-lime-400 mb-2">
              <HelpCircle className="w-4 h-4" />
              <span>Dúvidas Frequentes & Termos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white uppercase tracking-tight">
              Regulamento & FAQ
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Tudo o que você precisa saber sobre a prova, transferência de vagas, guarda-volumes e documentação necessária.
            </p>
          </div>

          <button
            onClick={() => setIsRegulamentoModalOpen(true)}
            className="flex items-center gap-2.5 px-5 py-3 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-lime-400 to-emerald-400 rounded-xl hover:brightness-110 active:scale-98 transition-all shadow-lg shadow-lime-400/20 whitespace-nowrap self-start md:self-auto"
          >
            <FileText className="w-4 h-4 stroke-[2.5]" />
            <span>Baixar Regulamento Geral (PDF)</span>
            <Download className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* FAQ Accordion Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-3">
            {FAQ_DATA.map((item, idx) => {
              const isOpen = openIndexes.includes(idx);
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-slate-900/70 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleIndex(idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-display font-bold text-white hover:text-lime-400 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <div
                      className={`w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-lime-400 text-slate-950' : 'text-slate-400'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Side Info Box */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Direitos & Garantias do Atleta
            </h4>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                <span>Medição oficial certificada para validação de índices em maratonas internacionais.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                <span>Seguro individual de acidentes pessoais durante todo o período da prova.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                <span>Certificado digital de conclusão com tempo oficial para download instantâneo.</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <p className="text-[11px] text-slate-400">
                Ficou com alguma dúvida técnica?
                <br />
                Entre em contato com nossa coordenação através do e-mail oficial:
                <strong className="text-lime-400 block mt-0.5">suporte@circuitospeednight.com.br</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Regulamento Modal */}
      <RegulamentoModal
        isOpen={isRegulamentoModalOpen}
        onClose={() => setIsRegulamentoModalOpen(false)}
      />
    </section>
  );
};
