/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DISTANCES_DATA, DistanceInfo } from '../data/raceData';
import { Clock, Droplet, Mountain, HeartPulse, Flag, ArrowUpRight } from 'lucide-react';

interface ModalitiesAltimetryProps {
  onSelectDistance: (distanceId: string) => void;
}

export const ModalitiesAltimetry: React.FC<ModalitiesAltimetryProps> = ({ onSelectDistance }) => {
  const [selectedId, setSelectedId] = useState<DistanceInfo['id']>('10K');

  const activeDistance = DISTANCES_DATA.find((d) => d.id === selectedId) || DISTANCES_DATA[1];

  // Helper to construct responsive SVG elevation path
  const profile = activeDistance.elevationProfile;
  const minEle = Math.min(...profile.map((p) => p.elevation)) - 10;
  const maxEle = Math.max(...profile.map((p) => p.elevation)) + 10;
  const rangeEle = maxEle - minEle || 1;
  const maxKm = profile[profile.length - 1].km;

  const width = 800;
  const height = 240;
  const paddingX = 40;
  const paddingY = 30;

  const points = profile.map((p) => {
    const x = paddingX + (p.km / maxKm) * (width - 2 * paddingX);
    const y = height - paddingY - ((p.elevation - minEle) / rangeEle) * (height - 2 * paddingY);
    return { x, y, km: p.km, elevation: p.elevation };
  });

  const linePath = points.reduce((acc, curr, idx) => {
    return `${acc} ${idx === 0 ? 'M' : 'L'} ${curr.x.toFixed(1)} ${curr.y.toFixed(1)}`;
  }, '');

  const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${height - paddingY} L ${points[0].x.toFixed(1)} ${height - paddingY} Z`;

  return (
    <section id="percursos" className="py-16 lg:py-24 border-b border-slate-800 bg-[#090B0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-lime-400 mb-2">
              <Mountain className="w-4 h-4" />
              <span>Traçados & Topografia Oficial</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white uppercase tracking-tight">
              Modalidades & Altimetria
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Confira os perfis altimétricos, postos de apoio e horários de largada de cada categoria no Ibirapuera.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex items-center p-1.5 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
            {DISTANCES_DATA.map((dist) => (
              <button
                key={dist.id}
                onClick={() => setSelectedId(dist.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-display font-bold rounded-lg transition-all whitespace-nowrap ${
                  selectedId === dist.id
                    ? 'bg-gradient-to-r from-lime-400 to-emerald-400 text-slate-950 shadow-md shadow-lime-400/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {dist.id} · {dist.name.split(' ')[1] || 'Run'}
              </button>
            ))}
          </div>
        </div>

        {/* Active Modality Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Altimetry & Course Elevation Card */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-lime-400">
                  Categoria {activeDistance.id}
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white uppercase">
                  {activeDistance.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">{activeDistance.tagline}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono-num font-bold text-slate-300 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                  {activeDistance.distanceKm} km aferidos
                </span>
              </div>
            </div>

            {/* SVG Elevation Chart */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-400 font-mono-num">
                <span>Perfil de Altitude (Metros vs Quilômetros)</span>
                <span className="text-lime-400 font-semibold">Desnível acumulado: +{activeDistance.elevationGainMeters}m</span>
              </div>

              <div className="w-full bg-slate-950/90 rounded-xl p-4 border border-slate-800/80 overflow-hidden">
                <svg
                  viewBox={`0 0 ${width} ${height}`}
                  className="w-full h-48 sm:h-56"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="elevationGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#CCFF00" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid lines */}
                  {[0.25, 0.5, 0.75].map((ratio, i) => {
                    const yVal = paddingY + ratio * (height - 2 * paddingY);
                    const eleLabel = Math.round(maxEle - ratio * rangeEle);
                    return (
                      <g key={i}>
                        <line
                          x1={paddingX}
                          y1={yVal}
                          x2={width - paddingX}
                          y2={yVal}
                          stroke="#1E293B"
                          strokeDasharray="4 4"
                          strokeWidth="1"
                        />
                        <text
                          x={paddingX - 10}
                          y={yVal + 4}
                          fill="#64748B"
                          fontSize="10"
                          textAnchor="end"
                          className="font-mono-num"
                        >
                          {eleLabel}m
                        </text>
                      </g>
                    );
                  })}

                  {/* Gradient Area Fill */}
                  <path d={areaPath} fill="url(#elevationGrad)" />

                  {/* Line Stroke */}
                  <path
                    d={linePath}
                    fill="none"
                    stroke="#CCFF00"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Elevation point markers */}
                  {points.map((pt, idx) => (
                    <g key={idx}>
                      <circle cx={pt.x} cy={pt.y} r="4" fill="#090B0E" stroke="#CCFF00" strokeWidth="2" />
                      <text
                        x={pt.x}
                        y={height - paddingY + 16}
                        fill="#94A3B8"
                        fontSize="11"
                        textAnchor="middle"
                        className="font-mono-num font-semibold"
                      >
                        {pt.km}km
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800/60">
              {activeDistance.description}
            </p>
          </div>

          {/* Key Distance Metrics & Quick Register */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
              <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
                Ficha Técnica do Traçado
              </h4>

              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3 text-slate-300 text-sm">
                    <Clock className="w-5 h-5 text-lime-400 shrink-0" />
                    <span>Horário da Largada</span>
                  </div>
                  <span className="font-display font-black text-xl text-white font-mono-num">
                    {activeDistance.startTime}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3 text-slate-300 text-sm">
                    <Mountain className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Elevação Ganha</span>
                  </div>
                  <span className="font-display font-black text-xl text-white font-mono-num">
                    +{activeDistance.elevationGainMeters} m
                  </span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3 text-slate-300 text-sm">
                    <Droplet className="w-5 h-5 text-cyan-400 shrink-0" />
                    <span>Pontos de Hidratação</span>
                  </div>
                  <span className="font-display font-black text-xl text-white font-mono-num">
                    {activeDistance.hydrationPoints} postos
                  </span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3 text-slate-300 text-sm">
                    <HeartPulse className="w-5 h-5 text-rose-400 shrink-0" />
                    <span>Postos Médicos</span>
                  </div>
                  <span className="font-display font-black text-xl text-white font-mono-num">
                    {activeDistance.medicalPoints} unidades
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-slate-300 text-sm">
                    <Flag className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>Tempo Limite (Cut-off)</span>
                  </div>
                  <span className="font-display font-black text-xl text-white font-mono-num">
                    {activeDistance.cutoffTime}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => onSelectDistance(activeDistance.id)}
                  className="w-full py-3.5 px-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-lime-400 to-emerald-400 rounded-xl hover:brightness-110 active:scale-98 transition-all shadow-lg shadow-lime-400/20 flex items-center justify-center gap-2"
                >
                  <span>Inscrever-se nos {activeDistance.id}</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </button>
                <p className="text-[11px] text-center text-slate-400 mt-2 font-mono-num">
                  A partir de R$ {activeDistance.basePrice.toFixed(2).replace('.', ',')} no 2º Lote
                </p>
              </div>
            </div>

            {/* Certifications info box */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400 space-y-1.5">
              <div className="font-semibold text-slate-300">Medição e Certificação Técnica:</div>
              <p>
                Percurso medido segundo as diretrizes de medição da World Athletics e homologado pela Federação Paulista de Atletismo (FPA).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
