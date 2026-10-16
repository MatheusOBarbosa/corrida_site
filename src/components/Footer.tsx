/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Flame, Mail, Phone, MapPin, Shield } from 'lucide-react';
import { RACE_CONFIG } from '../data/raceData';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-[#06080A] text-slate-400 text-xs">
      {/* Top Sponsor & Homologation Strip */}
      <div className="border-b border-slate-800/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6">
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
              Chancela Técnica & Realização Desportiva
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75">
            <div className="flex items-center gap-2 font-display font-black text-slate-300 text-base sm:text-lg tracking-wider">
              <span>CBAt</span>
              <span className="text-[10px] font-sans font-normal text-slate-500">HOMOLOGADO</span>
            </div>
            <div className="flex items-center gap-2 font-display font-black text-slate-300 text-base sm:text-lg tracking-wider">
              <span>FPA ATLETISMO</span>
              <span className="text-[10px] font-sans font-normal text-slate-500">PERCURSO OFICIAL</span>
            </div>
            <div className="flex items-center gap-2 font-display font-black text-slate-300 text-base sm:text-lg tracking-wider">
              <span>CET SÃO PAULO</span>
              <span className="text-[10px] font-sans font-normal text-slate-500">TRÂNSITO MONITORADO</span>
            </div>
            <div className="flex items-center gap-2 font-display font-black text-slate-300 text-base sm:text-lg tracking-wider">
              <span>IBIRAPUERA PARQUE</span>
              <span className="text-[10px] font-sans font-normal text-slate-500">ARENA OFICIAL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <a href="#" className="flex items-center gap-2 text-xl font-display font-extrabold text-white">
              <div className="w-7 h-7 rounded-lg bg-lime-400 flex items-center justify-center text-slate-950">
                <Flame className="w-4 h-4 fill-slate-950" />
              </div>
              <span className="tracking-widest">
                SPEED<span className="text-lime-400">NIGHT</span>
              </span>
            </a>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md leading-relaxed">
              O maior portal esportivo e circuito de corrida de rua noturna de São Paulo. Tecnologia de ponta em cronometragem RFID, reconhecimento facial para fotos e atendimento premium ao corredor.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Plataforma homologada de inscrições desportivas. CNPJ 24.891.042/0001-90.</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h5 className="font-display font-bold text-white uppercase text-sm tracking-wider">
              Links Rápidos
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#percursos" className="hover:text-lime-400 transition-colors">
                  Percursos & Altimetria
                </a>
              </li>
              <li>
                <a href="#kits-lotes" className="hover:text-lime-400 transition-colors">
                  Kits de Atleta & Lotes
                </a>
              </li>
              <li>
                <a href="#cronograma" className="hover:text-lime-400 transition-colors">
                  Cronograma & Retirada de Kits
                </a>
              </li>
              <li>
                <a href="#regulamento" className="hover:text-lime-400 transition-colors">
                  Regulamento Geral (PDF)
                </a>
              </li>
              <li>
                <a href="#resultados" className="hover:text-lime-400 transition-colors">
                  Consulta de Resultados & Fotos
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h5 className="font-display font-bold text-white uppercase text-sm tracking-wider">
              Central de Atendimento
            </h5>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-lime-400" />
                <span>suporte@circuitospeednight.com.br</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-lime-400" />
                <span>(11) 3984-7700 (Seg a Sex das 9h às 18h)</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                <span>Parque Ibirapuera · Av. Pedro Álvares Cabral, s/n - Vila Mariana, São Paulo - SP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © 2026 Circuito SpeedNight Esportes & Eventos Ltda. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-4">
            <a href="#regulamento" className="hover:underline">Termos de Uso</a>
            <span aria-hidden="true">·</span>
            <a href="#regulamento" className="hover:underline">Política de Privacidade & LGPD</a>
            <span aria-hidden="true">·</span>
            <a href="#regulamento" className="hover:underline">Regulamento Técnico CBAt</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
