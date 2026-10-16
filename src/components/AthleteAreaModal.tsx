/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  QrCode,
  Printer,
  Download,
  Search,
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  ShieldCheck,
  User,
  Shirt,
  Award,
} from 'lucide-react';
import { RACE_CONFIG } from '../data/raceData';
import { AthleteFormData } from '../utils/raceLogic';

export interface StoredRegistration {
  code: string;
  athlete: AthleteFormData;
  grandTotal: number;
  createdAt: string;
  bibNumber?: string;
}

interface AthleteAreaModalProps {
  isOpen: boolean;
  onClose: () => void;
  registrations: StoredRegistration[];
}

export const AthleteAreaModal: React.FC<AthleteAreaModalProps> = ({
  isOpen,
  onClose,
  registrations,
}) => {
  const [searchVal, setSearchVal] = useState('');
  const [selectedReg, setSelectedReg] = useState<StoredRegistration>(registrations[0]);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchVal.trim().toLowerCase();
    if (!query) return;

    const found = registrations.find(
      (r) =>
        r.code.toLowerCase().includes(query) ||
        r.athlete.fullName.toLowerCase().includes(query) ||
        r.athlete.cpf.replace(/\D/g, '').includes(query.replace(/\D/g, ''))
    );

    if (found) {
      setSelectedReg(found);
    } else {
      alert('Nenhuma inscrição encontrada com estes dados. Tente pelo código ou CPF.');
    }
  };

  const handlePrintVoucher = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0D1117] border border-slate-700 w-full max-w-4xl max-h-[94vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lime-400/10 border border-lime-400/30 flex items-center justify-center text-lime-400">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-white text-lg sm:text-xl uppercase">
                Área do Atleta · Check-in Rápido
              </h3>
              <p className="text-xs text-slate-400">
                Apresente este voucher digital com QR Code na Expo para retirar seu kit.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintVoucher}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Imprimir Voucher"
              aria-label="Imprimir Voucher"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Fechar Área do Atleta"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search bar inside modal */}
        <div className="px-6 py-3.5 bg-slate-950/90 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2 w-full">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Buscar por código (SN26-...) ou CPF do atleta..."
                className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold whitespace-nowrap transition-colors"
            >
              Localizar
            </button>
          </form>

          {/* Quick switcher if multiple registrations */}
          {registrations.length > 1 && (
            <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
              <span>Cadastros:</span>
              <div className="flex gap-1.5 overflow-x-auto">
                {registrations.map((reg) => (
                  <button
                    key={reg.code}
                    onClick={() => setSelectedReg(reg)}
                    className={`px-2.5 py-1 rounded font-mono-num text-xs transition-colors ${
                      selectedReg.code === reg.code
                        ? 'bg-lime-400 text-slate-950 font-bold'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {reg.code}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Voucher Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {selectedReg ? (
            <div className="max-w-2xl mx-auto rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-black border-2 border-slate-800 shadow-2xl p-6 sm:p-8 relative overflow-hidden">
              {/* Event Watermark & Badge */}
              <div className="flex items-start justify-between pb-6 border-b border-dashed border-slate-800">
                <div>
                  <span className="text-[10px] font-mono-num font-bold uppercase tracking-wider text-lime-400 bg-lime-950/60 px-2.5 py-1 rounded border border-lime-800/40">
                    COMPROVANTE OFICIAL DE INSCRIÇÃO
                  </span>
                  <h4 className="font-display font-black text-2xl sm:text-3xl text-white uppercase mt-2">
                    {RACE_CONFIG.name}
                  </h4>
                  <p className="text-xs text-slate-400">{RACE_CONFIG.edition}</p>
                </div>

                <div className="text-right">
                  <div className="font-mono-num text-xs text-slate-400">Voucher:</div>
                  <div className="font-display font-black text-lime-400 text-xl font-mono-num">
                    {selectedReg.code}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 justify-end mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Inscrição Confirmada</span>
                  </div>
                </div>
              </div>

              {/* Main Athlete Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 py-6 border-b border-dashed border-slate-800">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Nome do Corredor:
                  </span>
                  <span className="font-display font-bold text-lg text-white block">
                    {selectedReg.athlete.fullName}
                  </span>
                  <span className="text-xs font-mono-num text-slate-400">
                    CPF: {selectedReg.athlete.cpf}
                  </span>
                </div>

                <div className="space-y-1 sm:text-right">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Distância & Pelotão:
                  </span>
                  <span className="font-display font-black text-2xl text-lime-400 block">
                    {selectedReg.athlete.distance} Run
                  </span>
                  <span className="text-xs text-slate-400">
                    {selectedReg.athlete.runningClub || 'Atleta Individual'}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Kit Escolhido & Camiseta:
                  </span>
                  <span className="font-bold text-white text-sm capitalize block">
                    Kit {selectedReg.athlete.kitType} · Tam. {selectedReg.athlete.tShirtSize}
                  </span>
                  <span className="text-xs text-slate-400">
                    Medalha Finisher garantida na chegada
                  </span>
                </div>

                <div className="space-y-1 sm:text-right">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Número de Peito Estimado:
                  </span>
                  <span className="font-display font-black text-2xl text-white font-mono-num block">
                    Bib #{selectedReg.bibNumber || '1042'}
                  </span>
                  <span className="text-xs text-slate-400">Chip RFID acoplado ao peito</span>
                </div>
              </div>

              {/* QR Code and Check-in Expo Instructions */}
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-5 flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-inner">
                  {/* High Quality SVG QR Code */}
                  <svg viewBox="0 0 140 140" className="w-36 h-36">
                    <rect width="140" height="140" fill="#FFFFFF" />
                    {/* Corner 1 */}
                    <rect x="10" y="10" width="35" height="35" fill="#000000" />
                    <rect x="15" y="15" width="25" height="25" fill="#FFFFFF" />
                    <rect x="20" y="20" width="15" height="15" fill="#000000" />

                    {/* Corner 2 */}
                    <rect x="95" y="10" width="35" height="35" fill="#000000" />
                    <rect x="100" y="15" width="25" height="25" fill="#FFFFFF" />
                    <rect x="105" y="20" width="15" height="15" fill="#000000" />

                    {/* Corner 3 */}
                    <rect x="10" y="95" width="35" height="35" fill="#000000" />
                    <rect x="15" y="100" width="25" height="25" fill="#FFFFFF" />
                    <rect x="20" y="105" width="15" height="15" fill="#000000" />

                    {/* QR Code Pattern Bars */}
                    <rect x="55" y="15" width="10" height="10" fill="#000000" />
                    <rect x="75" y="15" width="10" height="10" fill="#000000" />
                    <rect x="55" y="35" width="20" height="10" fill="#000000" />
                    <rect x="15" y="55" width="10" height="25" fill="#000000" />
                    <rect x="35" y="55" width="15" height="10" fill="#000000" />
                    <rect x="55" y="55" width="30" height="30" fill="#000000" />
                    <rect x="60" y="60" width="20" height="20" fill="#FFFFFF" />
                    <rect x="65" y="65" width="10" height="10" fill="#000000" />
                    <rect x="95" y="55" width="15" height="15" fill="#000000" />
                    <rect x="115" y="65" width="15" height="15" fill="#000000" />
                    <rect x="55" y="95" width="15" height="15" fill="#000000" />
                    <rect x="75" y="105" width="15" height="15" fill="#000000" />
                    <rect x="95" y="95" width="35" height="15" fill="#000000" />
                    <rect x="105" y="115" width="20" height="15" fill="#000000" />
                  </svg>
                  <span className="text-[10px] text-slate-800 font-mono-num font-bold mt-1">
                    {selectedReg.code}
                  </span>
                </div>

                <div className="sm:col-span-7 space-y-3 text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Local da Retirada do Kit:</strong>
                      Shopping Ibirapuera - Piso Jurupis (Tenda Oficial SpeedNight)
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Horários da Expo:</strong>
                      Sexta (20/11) das 10h às 20h e Sábado (21/11) das 10h às 18h.
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                    Apresente este voucher impresso ou na tela do celular acompanhado de um documento de identificação original com foto.
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              Nenhuma inscrição selecionada.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Voucher com validade fiscal e garantia desportiva CBAt.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handlePrintVoucher}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Salvar / Imprimir Voucher PDF</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2 text-xs font-extrabold uppercase text-slate-950 bg-lime-400 hover:bg-lime-300 rounded-lg transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
