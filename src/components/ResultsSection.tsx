/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MOCK_RUNNERS_RESULTS } from '../data/raceData';
import { filterResults, formatTime, calculatePace, RunnerResult } from '../utils/raceLogic';
import { Search, Trophy, Medal, Camera, Timer, User, ArrowUpDown } from 'lucide-react';
import { PhotoGalleryModal } from './PhotoGalleryModal';

export const ResultsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistance, setSelectedDistance] = useState('all');
  const [selectedRunnerForPhotos, setSelectedRunnerForPhotos] = useState<RunnerResult | null>(null);

  const filteredRunners = filterResults(searchQuery, selectedDistance, MOCK_RUNNERS_RESULTS);

  return (
    <section id="resultados" className="py-16 lg:py-24 border-b border-slate-800 bg-[#090B0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-lime-400 mb-2">
              <Trophy className="w-4 h-4" />
              <span>Cronometragem Oficial & Reconhecimento Facial</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white uppercase tracking-tight">
              Área de Resultados & Fotos
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Consulte seu tempo bruto, líquido, ritmo médio (pace) e acesse suas fotos oficiais da prova pelo número de peito ou nome.
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-8 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Busque por número de peito (ex: 1042) ou nome do atleta..."
                className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-lime-400 text-sm font-medium transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-slate-400 hover:text-white"
                >
                  Limpar
                </button>
              )}
            </div>

            {/* Distance Filter Tabs */}
            <div className="md:col-span-4 flex items-center justify-end p-1 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
              {[
                { id: 'all', label: 'Todas' },
                { id: '5K', label: '5K' },
                { id: '10K', label: '10K' },
                { id: '21K', label: '21K' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedDistance(tab.id)}
                  className={`flex-1 px-3 py-2 text-xs font-bold rounded-lg transition-all text-center whitespace-nowrap ${
                    selectedDistance === tab.id
                      ? 'bg-gradient-to-r from-lime-400 to-emerald-400 text-slate-950 font-extrabold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1 font-mono-num">
            <span>
              Exibindo <strong>{filteredRunners.length}</strong> atleta(s) homologado(s)
            </span>
            <span>Atualizado em tempo real pelos tapetes de cronometragem RFID</span>
          </div>
        </div>

        {/* Results Table */}
        {filteredRunners.length > 0 ? (
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-xs font-extrabold uppercase tracking-wider text-slate-400 bg-slate-950/60">
                    <th className="py-4 pl-6 pr-3 font-mono-num">Bib #</th>
                    <th className="py-4 px-4">Atleta & Equipe</th>
                    <th className="py-4 px-3">Distância</th>
                    <th className="py-4 px-3">Faixa Etária</th>
                    <th className="py-4 px-3 font-mono-num">Tempo Líquido</th>
                    <th className="py-4 px-3 font-mono-num">Tempo Bruto</th>
                    <th className="py-4 px-3 font-mono-num">Pace Médio</th>
                    <th className="py-4 px-3">Classif. Geral</th>
                    <th className="py-4 pr-6 pl-3 text-right">Fotos Oficiais</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredRunners.map((runner) => {
                    const distKm =
                      runner.distance === '5K'
                        ? 5
                        : runner.distance === '10K'
                        ? 10
                        : 21.097;
                    const pace = calculatePace(runner.netTimeSeconds, distKm);

                    return (
                      <tr
                        key={runner.bib}
                        className="hover:bg-slate-800/40 transition-colors group"
                      >
                        {/* Bib */}
                        <td className="py-4 pl-6 pr-3 font-mono-num font-bold text-lime-400">
                          #{runner.bib}
                        </td>

                        {/* Name and Club */}
                        <td className="py-4 px-4">
                          <div className="font-display font-bold text-white text-base group-hover:text-lime-300 transition-colors">
                            {runner.name}
                          </div>
                          <div className="text-xs text-slate-400">
                            {runner.club || 'Atleta Individual'}
                          </div>
                        </td>

                        {/* Distance */}
                        <td className="py-4 px-3">
                          <span className="text-xs font-extrabold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                            {runner.distance}
                          </span>
                        </td>

                        {/* Category */}
                        <td className="py-4 px-3 text-xs font-mono-num text-slate-300">
                          {runner.category} ({runner.categoryRank}º)
                        </td>

                        {/* Net Time */}
                        <td className="py-4 px-3 font-mono-num font-bold text-white text-base">
                          {formatTime(runner.netTimeSeconds)}
                        </td>

                        {/* Gross Time */}
                        <td className="py-4 px-3 font-mono-num text-slate-400 text-xs sm:text-sm">
                          {formatTime(runner.grossTimeSeconds)}
                        </td>

                        {/* Pace */}
                        <td className="py-4 px-3 font-mono-num font-bold text-emerald-400 text-xs sm:text-sm">
                          {pace}
                        </td>

                        {/* Overall Rank */}
                        <td className="py-4 px-3">
                          <div className="flex items-center gap-1.5 font-mono-num text-xs font-semibold text-slate-300">
                            {runner.overallRank <= 3 ? (
                              <Medal className="w-4 h-4 text-amber-400 fill-amber-400" />
                            ) : null}
                            <span>{runner.overallRank}º Geral</span>
                          </div>
                        </td>

                        {/* Photos Button */}
                        <td className="py-4 pr-6 pl-3 text-right">
                          <button
                            onClick={() => setSelectedRunnerForPhotos(runner)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-200 bg-slate-800 hover:bg-lime-400 hover:text-slate-950 rounded-lg transition-colors border border-slate-700 hover:border-lime-400"
                          >
                            <Camera className="w-3.5 h-3.5" />
                            <span>Ver Fotos ({runner.photosCount})</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-400 space-y-3">
            <Search className="w-10 h-10 text-slate-600 mx-auto" />
            <h4 className="font-display font-bold text-lg text-white">Nenhum resultado encontrado</h4>
            <p className="text-xs max-w-md mx-auto">
              Não encontramos nenhum atleta cadastrado para os critérios de busca digitados. Verifique se o número de peito ou nome está correto.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDistance('all');
              }}
              className="px-4 py-2 text-xs font-bold text-lime-400 hover:underline"
            >
              Limpar filtros e ver todos os atletas
            </button>
          </div>
        )}
      </div>

      {/* Photo Gallery Modal */}
      <PhotoGalleryModal
        runner={selectedRunnerForPhotos}
        onClose={() => setSelectedRunnerForPhotos(null)}
      />
    </section>
  );
};
