/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  QrCode,
  CreditCard,
  Copy,
  Check,
  ShieldCheck,
  User,
  Award,
  Shirt,
  FileCheck,
} from 'lucide-react';
import { DISTANCES_DATA, KITS_DATA, RACE_CONFIG } from '../data/raceData';
import {
  AthleteFormData,
  validateAthleteForm,
  calculateOrderTotal,
  getKitPrice,
  generateRegistrationCode,
} from '../utils/raceLogic';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedKit?: 'basico' | 'atleta' | 'vip';
  preselectedDistance?: string;
  onRegistrationSuccess: (newReg: {
    code: string;
    athlete: AthleteFormData;
    grandTotal: number;
    createdAt: string;
  }) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  preselectedKit = 'atleta',
  preselectedDistance = '10K',
  onRegistrationSuccess,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [copiedPix, setCopiedPix] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [completedCode, setCompletedCode] = useState<string | null>(null);

  const [formData, setFormData] = useState<AthleteFormData>({
    fullName: '',
    cpf: '',
    birthDate: '',
    gender: 'M',
    email: '',
    phone: '',
    emergencyContact: '',
    emergencyPhone: '',
    runningClub: '',
    distance: (preselectedDistance as any) || '10K',
    kitType: preselectedKit,
    tShirtSize: 'M',
    medalEngraving: false,
    sportsInsurance: true,
    agreedToTerms: false,
    paymentMethod: 'pix',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Credit card state
  const [ccNumber, setCcNumber] = useState('');
  const [ccName, setCcName] = useState('');
  const [ccExpiry, setCcExpiry] = useState('');
  const [ccCvv, setCcCvv] = useState('');

  if (!isOpen) return null;

  // Pricing calculation
  const activeDistanceObj = DISTANCES_DATA.find((d) => d.id === formData.distance) || DISTANCES_DATA[1];
  const basePrice = activeDistanceObj.basePrice;
  const kitSurcharge = getKitPrice(formData.kitType);
  const orderTotal = calculateOrderTotal(basePrice, kitSurcharge, {
    medalEngraving: formData.medalEngraving,
    sportsInsurance: formData.sportsInsurance,
  });

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate personal data
      const validation = validateAthleteForm(formData);
      const personalErrors: Record<string, string> = {};
      if (validation.errors.fullName) personalErrors.fullName = validation.errors.fullName;
      if (validation.errors.cpf) personalErrors.cpf = validation.errors.cpf;
      if (validation.errors.birthDate) personalErrors.birthDate = validation.errors.birthDate;
      if (validation.errors.email) personalErrors.email = validation.errors.email;
      if (validation.errors.phone) personalErrors.phone = validation.errors.phone;
      if (validation.errors.emergencyPhone) personalErrors.emergencyPhone = validation.errors.emergencyPhone;

      if (Object.keys(personalErrors).length > 0) {
        setErrors(personalErrors);
        return;
      }
    }

    if (currentStep === 4) {
      if (!formData.agreedToTerms) {
        setErrors({ agreedToTerms: 'Você precisa aceitar os termos do regulamento para prosseguir.' });
        return;
      }
    }

    setErrors({});
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFinishPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      const regCode = generateRegistrationCode();
      setCompletedCode(regCode);
      onRegistrationSuccess({
        code: regCode,
        athlete: formData,
        grandTotal: orderTotal.grandTotal,
        createdAt: new Date().toLocaleDateString('pt-BR'),
      });
      setCurrentStep(6); // Success Step
    }, 1200);
  };

  const handleCopyPix = () => {
    const pixPayload = `00020126580014BR.GOV.BCB.PIX0136speednight-financeiro@circuitospeednight.com.br520400005303986540${orderTotal.grandTotal.toFixed(2)}5802BR5925CIRCUITO SPEEDNIGHT EVENT6009SAO PAULO62070503***6304`;
    navigator.clipboard?.writeText(pixPayload);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0D1117] border border-slate-700 w-full max-w-3xl max-h-[94vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-lime-400">
              Inscrição Oficial · 2º Lote
            </span>
            <h3 className="font-display font-extrabold text-white text-lg sm:text-xl uppercase">
              {RACE_CONFIG.name}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Fechar Inscrição"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator (Steps 1 to 5) */}
        {currentStep <= 5 && (
          <div className="px-6 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-xs overflow-x-auto">
            {[
              { num: 1, label: 'Atleta' },
              { num: 2, label: 'Distância & Kit' },
              { num: 3, label: 'Camiseta & Opcionais' },
              { num: 4, label: 'Termos' },
              { num: 5, label: 'Pagamento' },
            ].map((step) => (
              <div
                key={step.num}
                className={`flex items-center gap-2 whitespace-nowrap ${
                  currentStep === step.num
                    ? 'text-lime-400 font-bold'
                    : currentStep > step.num
                    ? 'text-emerald-400'
                    : 'text-slate-500'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono-num font-bold ${
                    currentStep === step.num
                      ? 'bg-lime-400 text-slate-950'
                      : currentStep > step.num
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {currentStep > step.num ? '✓' : step.num}
                </div>
                <span className="hidden sm:inline">{step.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* STEP 1: Personal Data */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h4 className="font-display font-bold text-white text-lg uppercase flex items-center gap-2">
                <User className="w-5 h-5 text-lime-400" />
                <span>1. Dados Pessoais do Atleta</span>
              </h4>
              <p className="text-xs text-slate-400">
                Os dados serão vinculados ao chip eletrônico de cronometragem e ao seguro da prova.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Nome Completo do Corredor *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Ex: Matheus Barbosa Silva"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-lime-400 focus:outline-none"
                  />
                  {errors.fullName && <p className="text-rose-400 text-xs mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    CPF (somente números) *
                  </label>
                  <input
                    type="text"
                    value={formData.cpf}
                    onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                    placeholder="000.000.000-00"
                    maxLength={14}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-lime-400 focus:outline-none font-mono-num"
                  />
                  {errors.cpf && <p className="text-rose-400 text-xs mt-1">{errors.cpf}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Data de Nascimento *
                  </label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-lime-400 focus:outline-none"
                  />
                  {errors.birthDate && <p className="text-rose-400 text-xs mt-1">{errors.birthDate}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Sexo Biológico (para categoria) *
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-lime-400 focus:outline-none"
                  >
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    E-mail para Confirmação *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="atleta@email.com"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-lime-400 focus:outline-none"
                  />
                  {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Telefone celular (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(11) 99999-9999"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-lime-400 focus:outline-none font-mono-num"
                  />
                  {errors.phone && <p className="text-rose-400 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Telefone de Emergência *
                  </label>
                  <input
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                    placeholder="(11) 98888-8888 (Familiar)"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-lime-400 focus:outline-none font-mono-num"
                  />
                  {errors.emergencyPhone && (
                    <p className="text-rose-400 text-xs mt-1">{errors.emergencyPhone}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Assessoria Esportiva / Equipe (Opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.runningClub}
                    onChange={(e) => setFormData({ ...formData, runningClub: e.target.value })}
                    placeholder="Ex: Assessoria Alpha Runners / Individual"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-lime-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Distance & Kit */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h4 className="font-display font-bold text-white text-lg uppercase flex items-center gap-2 mb-1">
                  <Award className="w-5 h-5 text-lime-400" />
                  <span>2. Escolha sua Distância</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Selecione o percurso que deseja correr no Parque Ibirapuera:
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                  {DISTANCES_DATA.map((dist) => (
                    <button
                      key={dist.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, distance: dist.id })}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        formData.distance === dist.id
                          ? 'border-lime-400 bg-lime-950/30 ring-1 ring-lime-400'
                          : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-display font-black text-white text-xl uppercase">
                        {dist.id}
                      </div>
                      <div className="text-[11px] text-slate-400 font-semibold">{dist.name.split(' ')[1]}</div>
                      <div className="text-xs font-mono-num font-bold text-lime-400 mt-2">
                        R$ {dist.basePrice.toFixed(2).replace('.', ',')}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-display font-bold text-white text-lg uppercase flex items-center gap-2 mb-1">
                  <Shirt className="w-5 h-5 text-emerald-400" />
                  <span>Escolha seu Kit do Atleta</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                  {KITS_DATA.map((kit) => (
                    <button
                      key={kit.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, kitType: kit.id })}
                      className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        formData.kitType === kit.id
                          ? 'border-lime-400 bg-lime-950/30 ring-1 ring-lime-400'
                          : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start">
                          <span className="font-display font-black text-white text-lg uppercase">
                            {kit.title}
                          </span>
                          {kit.badge && (
                            <span className="text-[10px] font-bold text-lime-400 bg-lime-950 px-1.5 py-0.5 rounded border border-lime-800">
                              {kit.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                          {kit.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-800/80 font-mono-num font-bold text-sm text-lime-400">
                        {kit.id === 'basico' ? 'Incluso' : `+ R$ ${kit.price.toFixed(2).replace('.', ',')}`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: T-Shirt Size & Add-ons */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h4 className="font-display font-bold text-white text-lg uppercase flex items-center gap-2 mb-1">
                  <Shirt className="w-5 h-5 text-lime-400" />
                  <span>3. Tamanho da Camiseta Oficial</span>
                </h4>
                <p className="text-xs text-slate-400">
                  {formData.kitType === 'basico'
                    ? 'Seu kit básico não inclui camiseta oficial. Se desejar, volte ao passo 2 e selecione Kit Atleta ou VIP.'
                    : 'Camiseta oficial em poliamida com elastano e tratamento antibacteriano:'}
                </p>

                {formData.kitType !== 'basico' && (
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 mt-3">
                    {[
                      { id: 'BL-M', label: 'Babylook M' },
                      { id: 'BL-G', label: 'Babylook G' },
                      { id: 'P', label: 'Unissex P' },
                      { id: 'M', label: 'Unissex M' },
                      { id: 'G', label: 'Unissex G' },
                      { id: 'GG', label: 'Unissex GG' },
                    ].map((sz) => (
                      <button
                        key={sz.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, tShirtSize: sz.id as any })}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          formData.tShirtSize === sz.id
                            ? 'border-lime-400 bg-lime-950/40 text-lime-300 font-bold'
                            : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-xs font-bold block">{sz.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Add-ons */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Serviços Opcionais para sua Prova:
                </span>

                <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-800 bg-slate-950 cursor-pointer hover:border-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.medalEngraving}
                    onChange={(e) => setFormData({ ...formData, medalEngraving: e.target.checked })}
                    className="mt-1 w-4 h-4 accent-lime-400"
                  />
                  <div className="text-xs">
                    <div className="flex justify-between items-center">
                      <strong className="text-white text-sm">Gravação a Laser na Medalha</strong>
                      <span className="text-lime-400 font-mono-num font-bold">+ R$ 25,00</span>
                    </div>
                    <p className="text-slate-400 mt-0.5">
                      Grave seu nome completo e tempo líquido oficial na medalha na tenda de gravação pós-prova.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-800 bg-slate-950 cursor-pointer hover:border-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.sportsInsurance}
                    onChange={(e) => setFormData({ ...formData, sportsInsurance: e.target.checked })}
                    className="mt-1 w-4 h-4 accent-lime-400"
                  />
                  <div className="text-xs">
                    <div className="flex justify-between items-center">
                      <strong className="text-white text-sm">Seguro Atleta Premium Plus</strong>
                      <span className="text-lime-400 font-mono-num font-bold">+ R$ 15,00</span>
                    </div>
                    <p className="text-slate-400 mt-0.5">
                      Cobertura estendida para despesas médicas, hospitalares e odontológicas até R$ 20.000,00.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* STEP 4: Terms */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h4 className="font-display font-bold text-white text-lg uppercase flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-lime-400" />
                <span>4. Termo de Responsabilidade e Regulamento</span>
              </h4>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 max-h-48 overflow-y-auto text-xs text-slate-300 leading-relaxed space-y-2">
                <p>
                  Declaro que participo do <strong>{RACE_CONFIG.name}</strong> por livre e espontânea vontade, isentando de qualquer responsabilidade os Organizadores, Patrocinadores e Realizadores em meu nome e de meus sucessores.
                </p>
                <p>
                  Declaro estar em plenas condições físicas e psicológicas para a prática desta atividade desportiva, tendo realizado consulta médica recente e não possuindo impedimento clínico para percorrer a distância de {formData.distance}.
                </p>
                <p>
                  Estou ciente de que a retirada do kit é obrigatória na Expo e que não haverá entrega no dia da prova na arena do Ibirapuera. Autorizo o uso de minha imagem em fotografias e vídeos para divulgação do evento sem ônus.
                </p>
              </div>

              <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-800 bg-slate-950/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreedToTerms}
                  onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                  className="mt-1 w-4 h-4 accent-lime-400"
                />
                <span className="text-xs text-slate-200">
                  Li, compreendi e concordo integralmente com o <strong>Regulamento Oficial</strong> e o <strong>Termo de Responsabilidade</strong> da prova.
                </span>
              </label>
              {errors.agreedToTerms && (
                <p className="text-rose-400 text-xs font-semibold">{errors.agreedToTerms}</p>
              )}
            </div>
          )}

          {/* STEP 5: Payment */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                <div>
                  <h4 className="font-display font-bold text-white text-lg uppercase">
                    5. Pagamento Seguro
                  </h4>
                  <p className="text-xs text-slate-400">Escolha a forma de pagamento desejada:</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 uppercase font-bold block">Total a Pagar</span>
                  <span className="font-display font-black text-2xl text-lime-400 font-mono-num">
                    R$ {orderTotal.grandTotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* Payment Method Switcher */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'pix' })}
                  className={`p-3.5 rounded-xl border flex items-center justify-center gap-2.5 transition-all ${
                    formData.paymentMethod === 'pix'
                      ? 'border-lime-400 bg-lime-950/30 text-lime-300 font-bold'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <QrCode className="w-5 h-5" />
                  <span className="text-sm">PIX Instantâneo</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'credit_card' })}
                  className={`p-3.5 rounded-xl border flex items-center justify-center gap-2.5 transition-all ${
                    formData.paymentMethod === 'credit_card'
                      ? 'border-lime-400 bg-lime-950/30 text-lime-300 font-bold'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="text-sm">Cartão de Crédito</span>
                </button>
              </div>

              {/* PIX Flow */}
              {formData.paymentMethod === 'pix' && (
                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-4">
                  <div className="w-40 h-40 bg-white p-2 rounded-xl mx-auto flex items-center justify-center shadow-lg">
                    {/* Dynamic QR Code representation */}
                    <svg viewBox="0 0 120 120" className="w-full h-full">
                      <rect width="120" height="120" fill="#FFFFFF" />
                      {/* Corner markers */}
                      <rect x="10" y="10" width="30" height="30" fill="#000000" />
                      <rect x="15" y="15" width="20" height="20" fill="#FFFFFF" />
                      <rect x="20" y="20" width="10" height="10" fill="#000000" />

                      <rect x="80" y="10" width="30" height="30" fill="#000000" />
                      <rect x="85" y="15" width="20" height="20" fill="#FFFFFF" />
                      <rect x="90" y="20" width="10" height="10" fill="#000000" />

                      <rect x="10" y="80" width="30" height="30" fill="#000000" />
                      <rect x="15" y="85" width="20" height="20" fill="#FFFFFF" />
                      <rect x="20" y="90" width="10" height="10" fill="#000000" />

                      {/* Pattern dots */}
                      <rect x="50" y="15" width="8" height="8" fill="#000000" />
                      <rect x="65" y="25" width="8" height="8" fill="#000000" />
                      <rect x="45" y="45" width="12" height="12" fill="#000000" />
                      <rect x="65" y="55" width="15" height="15" fill="#000000" />
                      <rect x="25" y="55" width="8" height="15" fill="#000000" />
                      <rect x="50" y="85" width="14" height="14" fill="#000000" />
                      <rect x="75" y="80" width="10" height="10" fill="#000000" />
                      <rect x="95" y="70" width="12" height="12" fill="#000000" />
                    </svg>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-slate-300">
                      Escaneie com o app do seu banco ou copie a chave:
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono-num">
                      Válido por 15 minutos · Confirmação automática imediata
                    </div>
                  </div>

                  <div className="flex items-center gap-2 max-w-md mx-auto">
                    <input
                      type="text"
                      readOnly
                      value="00020126580014BR.GOV.BCB.PIX0136speednight-financeiro..."
                      className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono-num text-slate-300"
                    />
                    <button
                      type="button"
                      onClick={handleCopyPix}
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      {copiedPix ? <Check className="w-3.5 h-3.5 text-lime-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedPix ? 'Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Credit Card Flow */}
              {formData.paymentMethod === 'credit_card' && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Número do Cartão
                    </label>
                    <input
                      type="text"
                      value={ccNumber}
                      onChange={(e) => setCcNumber(e.target.value)}
                      placeholder="0000 0000 0000 0000"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-sm font-mono-num"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Nome Impresso no Cartão
                    </label>
                    <input
                      type="text"
                      value={ccName}
                      onChange={(e) => setCcName(e.target.value)}
                      placeholder="NOME COMO NO CARTÃO"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-sm uppercase"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Validade (MM/AA)
                      </label>
                      <input
                        type="text"
                        value={ccExpiry}
                        onChange={(e) => setCcExpiry(e.target.value)}
                        placeholder="12/28"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-sm font-mono-num"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        CVV (Código de Segurança)
                      </label>
                      <input
                        type="password"
                        value={ccCvv}
                        onChange={(e) => setCcCvv(e.target.value)}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-sm font-mono-num"
                      />
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Ambiente criptografado SSL 256 bits com tokenização bancária.</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 6: Success Confirmation Screen */}
          {currentStep === 6 && (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-lime-400">
                  Inscrição Confirmada com Sucesso!
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase mt-1">
                  Parabéns, {formData.fullName.split(' ')[0]}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mt-2">
                  Sua vaga no <strong>{RACE_CONFIG.name}</strong> está 100% garantida. Enviamos os dados para seu e-mail <em>{formData.email}</em>.
                </p>
              </div>

              {/* Digital Voucher Snippet */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-3">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-xs text-slate-400">Código de Check-in:</span>
                  <span className="font-display font-black text-lime-400 text-lg font-mono-num">
                    {completedCode}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                  <div>
                    <span className="text-slate-500 block">Distância:</span>
                    <strong className="text-white">{formData.distance}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Kit Selecionado:</span>
                    <strong className="text-white uppercase">{formData.kitType}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Tamanho Camiseta:</span>
                    <strong className="text-white">{formData.tShirtSize}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Valor Pago:</span>
                    <strong className="text-lime-400 font-mono-num">
                      R$ {orderTotal.grandTotal.toFixed(2).replace('.', ',')}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-lime-400 to-emerald-400 rounded-xl hover:brightness-110 active:scale-98 transition-all shadow-lg shadow-lime-400/25"
                >
                  Concluir & Ir para a Área do Atleta
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer (Steps 1 to 5) */}
        {currentStep <= 5 && (
          <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Voltar</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-lime-400 to-emerald-400 rounded-lg hover:brightness-110 active:scale-98 transition-all shadow-md shadow-lime-400/20 flex items-center gap-1.5"
              >
                <span>Avançar</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isProcessingPayment}
                onClick={handleFinishPayment}
                className="px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-lime-400 to-emerald-400 rounded-lg hover:brightness-110 active:scale-98 transition-all shadow-md shadow-lime-400/20 flex items-center gap-2 disabled:opacity-50"
              >
                {isProcessingPayment ? (
                  <span>Processando...</span>
                ) : (
                  <>
                    <span>Confirmar Pagamento</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
