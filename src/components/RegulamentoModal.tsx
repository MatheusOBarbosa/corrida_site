/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Download, Printer, ShieldCheck, FileCheck2 } from 'lucide-react';
import { RACE_CONFIG } from '../data/raceData';

interface RegulamentoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegulamentoModal: React.FC<RegulamentoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#0D1117] border border-slate-700 w-full max-w-4xl max-h-[90vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-lime-400/10 text-lime-400">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-white text-lg sm:text-xl uppercase tracking-wide">
                Regulamento Oficial da Prova
              </h3>
              <p className="text-xs text-slate-400">
                {RACE_CONFIG.name} · Normas Técnicas e Desportivas Homologadas CBAt
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Imprimir Regulamento"
              aria-label="Imprimir Regulamento"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Fechar Regulamento"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body - Scrollable Text */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
          {/* Article 1 */}
          <section className="space-y-2">
            <h4 className="font-display font-bold text-base sm:text-lg text-white uppercase text-lime-400">
              Capítulo I - Do Evento e Organização
            </h4>
            <p>
              <strong>Art. 1º.</strong> O <em>{RACE_CONFIG.name}</em>, doravante denominado EVENTO, será realizado no dia <strong>{RACE_CONFIG.dateFormatted}</strong>, na cidade de São Paulo, no Parque Ibirapuera, sob qualquer condição climática, com participação de pessoas de ambos os sexos, devidamente inscritas.
            </p>
            <p>
              <strong>Art. 2º.</strong> O EVENTO é composto por 4 (quatro) modalidades oficiais:
              <br />a) Meia Maratona (21.097m) com largada às 19h30;
              <br />b) Corrida de 10K com largada às 19h45;
              <br />c) Corrida de 5K com largada às 20h00;
              <br />d) Caminhada de 3K com largada às 20h05.
            </p>
          </section>

          {/* Article 2 */}
          <section className="space-y-2">
            <h4 className="font-display font-bold text-base sm:text-lg text-white uppercase text-lime-400">
              Capítulo II - Das Regras de Inscrição e Lotes
            </h4>
            <p>
              <strong>Art. 3º.</strong> As inscrições serão realizadas exclusivamente pela plataforma online oficial, sujeitas à disponibilidade de vagas limitadas a 5.000 (cinco mil) atletas para preservação da segurança técnica.
            </p>
            <p>
              <strong>Art. 4º.</strong> A inscrição é pessoal e intransferível. Qualquer atleta que ceder seu número de peito e chip para outro corredor sem a autorização expressa da Organização será desclassificado sumariamente e suspenso por 1 (um) ano de etapas futuras.
            </p>
            <p>
              <strong>Art. 5º.</strong> O cancelamento com reembolso integral poderá ser efetuado em até 7 (sete) dias corridos após a compra, conforme o Artigo 49 do Código de Defesa do Consumidor.
            </p>
          </section>

          {/* Article 3 */}
          <section className="space-y-2">
            <h4 className="font-display font-bold text-base sm:text-lg text-white uppercase text-lime-400">
              Capítulo III - Da Cronometragem e Chips
            </h4>
            <p>
              <strong>Art. 6º.</strong> O sistema de cronometragem eletrônica utilizará transponder (chip) descartável acoplado ao número de peito. O número de peito deve ser fixado obrigatoriamente na parte frontal da camiseta, na altura do abdômen, sem ser dobrado ou rasurado.
            </p>
            <p>
              <strong>Art. 7º.</strong> O tempo bruto (ordem de chegada) será o único critério para a classificação geral (1º ao 5º lugares). O tempo líquido (tempo transcorrido entre o tapete de largada e o tapete de chegada) será utilizado para a classificação por faixas etárias.
            </p>
          </section>

          {/* Article 4 */}
          <section className="space-y-2">
            <h4 className="font-display font-bold text-base sm:text-lg text-white uppercase text-lime-400">
              Capítulo IV - Da Premiação
            </h4>
            <p>
              <strong>Art. 8º.</strong> A premiação do EVENTO será distribuída da seguinte forma:
              <br />- <strong>Geral 21K, 10K e 5K (Masculino e Feminino):</strong> Troféu especial para os 5 (cinco) primeiros colocados + premiação em dinheiro conforme tabela técnica do evento.
              <br />- <strong>Faixas Etárias 21K e 10K:</strong> Troféu exclusivo para os 3 (três) primeiros colocados em cada faixa de 5 em 5 anos (18-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50-54, 55-59, 60-64, 65+).
              <br />- <strong>Medalha Finisher:</strong> Garantida a todos os concluintes devidamente inscritos que cruzarem a linha de chegada dentro do tempo limite.
            </p>
          </section>

          {/* Article 5 */}
          <section className="space-y-2">
            <h4 className="font-display font-bold text-base sm:text-lg text-white uppercase text-lime-400">
              Capítulo V - Do Atendimento Médico e Segurança
            </h4>
            <p>
              <strong>Art. 9º.</strong> A Organização disponibilizará serviço de ambulâncias com UTI móvel e postos médicos fixos para prestar os primeiros socorros em caso de emergência. A continuidade do atendimento médico especializado será realizada na rede pública ou hospital indicado pelo convênio do atleta.
            </p>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Documento registrado sob nº 84.102/SP em cartório de registro de títulos.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Salvar / Baixar Regulamento</span>
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2 text-xs font-extrabold uppercase text-slate-950 bg-lime-400 hover:bg-lime-300 rounded-lg transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
