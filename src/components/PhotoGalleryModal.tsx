/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Camera, Download, Share2, Sparkles } from 'lucide-react';
import { RunnerResult } from '../utils/raceLogic';

interface PhotoGalleryModalProps {
  runner: RunnerResult | null;
  onClose: () => void;
}

export const PhotoGalleryModal: React.FC<PhotoGalleryModalProps> = ({ runner, onClose }) => {
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState<number>(0);

  if (!runner) return null;

  // Generate realistic race photo slots with athletic SVG renders
  const photoSpots = [
    { title: 'Largada Sob os Holofotes', loc: 'Km 0.2 - Av. Pedro Álvares Cabral', time: '19:47:12' },
    { title: 'Passagem pelo Túnel Ayrton Senna', loc: 'Km 4.5 - Túnel Iluminado', time: '20:04:30' },
    { title: 'Posto de Hidratação & Ritmo', loc: 'Km 7.2 - Obelisco', time: '20:15:45' },
    { title: 'Reta Final & Concentração', loc: 'Km 9.8 - Reta de Chegada', time: '20:23:10' },
    { title: 'Cruzando a Linha de Chegada!', loc: 'Km 10.0 - Pórtico SpeedNight', time: '20:24:05' },
    { title: 'Medalha no Peito & Sorriso', loc: 'Tenda Finisher / Pódio', time: '20:29:40' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0D1117] border border-slate-700 w-full max-w-4xl max-h-[92vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lime-400/10 border border-lime-400/30 flex items-center justify-center text-lime-400">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-extrabold text-white text-lg sm:text-xl uppercase">
                  {runner.name}
                </h3>
                <span className="font-mono-num text-xs font-bold bg-lime-400 text-slate-950 px-2 py-0.5 rounded">
                  Bib #{runner.bib}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {runner.distance} · Categoria {runner.category} · {runner.photosCount} fotos oficiais identificadas por IA facial
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Fechar Galeria"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Selected Photo Canvas */}
          <div className="relative aspect-video sm:aspect-21/9 rounded-2xl overflow-hidden border border-slate-700 bg-gradient-to-br from-slate-900 via-slate-950 to-black flex items-center justify-center">
            {/* Athletic Background Vector Art */}
            <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="photoGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#CCFF00" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
              <line x1="0" y1="20%" x2="100%" y2="80%" stroke="#334155" strokeWidth="2" strokeDasharray="6 6" />
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="url(#photoGrad)" strokeWidth="3" opacity="0.4" />
              <circle cx="50%" cy="45%" r="140" fill="none" stroke="#CCFF00" strokeWidth="1" strokeDasharray="8 8" opacity="0.3" />
            </svg>

            <div className="relative text-center p-6 space-y-3 z-10">
              <div className="w-16 h-16 rounded-full bg-lime-400/20 border border-lime-400 flex items-center justify-center text-lime-400 mx-auto">
                <Camera className="w-8 h-8" />
              </div>
              <div className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                {photoSpots[selectedPhotoIdx % photoSpots.length].title}
              </div>
              <div className="text-xs sm:text-sm text-slate-300 flex items-center justify-center gap-3 font-mono-num">
                <span>{photoSpots[selectedPhotoIdx % photoSpots.length].loc}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Hora: {photoSpots[selectedPhotoIdx % photoSpots.length].time}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-xs text-lime-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Foto Oficial SpeedNight Fotop HD</span>
              </div>
            </div>

            {/* Official Watermark Bar */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-slate-400 font-mono-num z-10">
              <span>FOTOP / CIRCUITO SPEEDNIGHT 2026</span>
              <span>ATLETA: {runner.name.toUpperCase()} (BIB #{runner.bib})</span>
            </div>
          </div>

          {/* Thumbnails Row */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Todas as {photoSpots.length} fotos do percurso de #{runner.bib}:
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {photoSpots.map((spot, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPhotoIdx(idx)}
                  className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    selectedPhotoIdx === idx
                      ? 'border-lime-400 bg-lime-950/30 ring-1 ring-lime-400'
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                  }`}
                >
                  <div className="w-full aspect-square rounded-lg bg-slate-950 flex items-center justify-center text-slate-500 mb-2">
                    <Camera className={`w-5 h-5 ${selectedPhotoIdx === idx ? 'text-lime-400' : ''}`} />
                  </div>
                  <div className="text-[11px] font-bold text-white truncate">{spot.title}</div>
                  <div className="text-[10px] text-slate-400 font-mono-num">{spot.time}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Fotos em alta resolução com liberação de direitos para redes sociais e impressão.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                alert(`Link de download em alta resolução gerado para as fotos do atleta #${runner.bib}!`);
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-bold text-slate-950 bg-lime-400 hover:bg-lime-300 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Baixar Pacote em Alta Resolução</span>
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert('Link de compartilhamento das fotos copiado!');
              }}
              className="p-2.5 text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors"
              title="Compartilhar"
              aria-label="Compartilhar Fotos"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
