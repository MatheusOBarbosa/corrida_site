/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RunnerResult } from '../utils/raceLogic';

export interface DistanceInfo {
  id: '3K' | '5K' | '10K' | '21K';
  name: string;
  tagline: string;
  distanceKm: number;
  elevationGainMeters: number;
  maxElevationMeters: number;
  startTime: string;
  cutoffTime: string;
  hydrationPoints: number;
  medicalPoints: number;
  basePrice: number;
  description: string;
  elevationProfile: { km: number; elevation: number }[];
}

export interface KitTier {
  id: 'basico' | 'atleta' | 'vip';
  title: string;
  badge?: string;
  price: number;
  description: string;
  items: string[];
  highlighted?: boolean;
}

export interface LoteTier {
  number: number;
  name: string;
  period: string;
  price5k10k: number;
  price21k: number;
  status: 'closed' | 'active' | 'upcoming';
  progressPercent?: number;
}

export const RACE_CONFIG = {
  name: 'Circuito SpeedNight São Paulo 2026',
  edition: '8ª Edição Oficial',
  dateFormatted: '21 de Novembro de 2026 (Sábado)',
  venue: 'Parque Ibirapuera · Obelisco Mausoléu',
  city: 'São Paulo - SP',
  countdownTarget: new Date(Date.now() + 38 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000).toISOString(),
};

export const DISTANCES_DATA: DistanceInfo[] = [
  {
    id: '5K',
    name: '5K Speed Run',
    tagline: 'Percurso veloz, 100% plano, ideal para recorde pessoal (PR)',
    distanceKm: 5.0,
    elevationGainMeters: 28,
    maxElevationMeters: 785,
    startTime: '20:00',
    cutoffTime: '1h15min',
    hydrationPoints: 2,
    medicalPoints: 2,
    basePrice: 94.9,
    description: 'Circuito perfeitamente asfaltado contornando o Parque Ibirapuera e Av. Pedro Álvares Cabral. Rápido, largo e totalmente iluminado.',
    elevationProfile: [
      { km: 0, elevation: 760 },
      { km: 1, elevation: 764 },
      { km: 2, elevation: 772 },
      { km: 3, elevation: 785 },
      { km: 4, elevation: 768 },
      { km: 5, elevation: 760 },
    ],
  },
  {
    id: '10K',
    name: '10K Pro Challenge',
    tagline: 'A distância mais disputada com passagem pelo Túnel Ayrton Senna',
    distanceKm: 10.0,
    elevationGainMeters: 74,
    maxElevationMeters: 792,
    startTime: '19:45',
    cutoffTime: '2h00min',
    hydrationPoints: 4,
    medicalPoints: 3,
    basePrice: 109.9,
    description: 'Traçado técnico e eletrizante passando pela Av. 23 de Maio, Túnel Ayrton Senna e Monumento às Bandeiras sob efeito de iluminação especial.',
    elevationProfile: [
      { km: 0, elevation: 760 },
      { km: 2, elevation: 752 },
      { km: 4, elevation: 780 },
      { km: 6, elevation: 792 },
      { km: 8, elevation: 765 },
      { km: 10, elevation: 760 },
    ],
  },
  {
    id: '21K',
    name: '21K Meia Maratona Night',
    tagline: 'Chancelada pela CBAt com selo oficial de medição',
    distanceKm: 21.097,
    elevationGainMeters: 142,
    maxElevationMeters: 805,
    startTime: '19:30',
    cutoffTime: '3h30min',
    hydrationPoints: 8,
    medicalPoints: 5,
    basePrice: 139.9,
    description: 'Meia Maratona noturna de São Paulo. Duas voltas dinâmicas com postos de isotônico a cada 5km, gel energético no km 12 e cronometragem em 4 tapetes.',
    elevationProfile: [
      { km: 0, elevation: 760 },
      { km: 3, elevation: 750 },
      { km: 6, elevation: 785 },
      { km: 9, elevation: 770 },
      { km: 12, elevation: 805 },
      { km: 15, elevation: 765 },
      { km: 18, elevation: 790 },
      { km: 21, elevation: 760 },
    ],
  },
  {
    id: '3K',
    name: '3K Caminhada da Família',
    tagline: 'Para iniciantes, famílias e caminhantes de todas as idades',
    distanceKm: 3.0,
    elevationGainMeters: 12,
    maxElevationMeters: 768,
    startTime: '20:05',
    cutoffTime: '1h00min',
    hydrationPoints: 1,
    medicalPoints: 2,
    basePrice: 79.9,
    description: 'Participação inclusiva sem chip competitivo, com medalha finisher garantida para todos que completarem o trajeto.',
    elevationProfile: [
      { km: 0, elevation: 760 },
      { km: 1, elevation: 765 },
      { km: 2, elevation: 768 },
      { km: 3, elevation: 760 },
    ],
  },
];

export const KITS_DATA: KitTier[] = [
  {
    id: 'basico',
    title: 'Kit Básico',
    badge: 'Econômico',
    price: 0,
    description: 'O essencial para quem quer apenas correr e garantir sua medalha e tempo oficial.',
    items: [
      'Número de peito oficial com picote para guarda-volumes',
      'Chip descartável de cronometragem eletrônica',
      'Medalha finisher em metal fundido pesado (pós-prova)',
      'Hidratação no percurso e tenda de frutas na chegada',
      'Seguro individual contra acidentes pessoais durante a prova',
    ],
  },
  {
    id: 'atleta',
    title: 'Kit Atleta',
    badge: 'Mais Escolhido',
    price: 45.0,
    description: 'O combo oficial com a camiseta tecnológica dry-fit de alta performance.',
    highlighted: true,
    items: [
      'Todos os itens inclusos no Kit Básico',
      'Camiseta Oficial SpeedNight Poliamida Dry-Fit antibacteriana',
      'Viseira aerodinâmica com proteção UV50+',
      'Sacochila impermeável reflexiva SpeedNight',
      'Cupom de R$ 50 na loja parceira de nutrição esportiva',
    ],
  },
  {
    id: 'vip',
    title: 'Kit VIP Experience',
    badge: 'Experiência Premium',
    price: 120.0,
    description: 'Tratamento de elite com camarote VIP, largada antecipada e jaqueta premium.',
    items: [
      'Todos os itens do Kit Atleta completo',
      'Jaqueta Corta-Vento ultraleve oficial do Circuito SpeedNight',
      'Acesso exclusivo à Área VIP com buffet de massas pré e pós-prova',
      'Largada no Pelotão Especial (Pelotão VIP / A)',
      'Gravação a laser gratuita do nome e tempo oficial na medalha',
      'Guarda-volumes exclusivo sem filas com segurança monitorada',
    ],
  },
];

export const LOTES_DATA: LoteTier[] = [
  {
    number: 1,
    name: '1º Lote (Promocional)',
    period: 'Até 15 de Outubro de 2026',
    price5k10k: 84.9,
    price21k: 119.9,
    status: 'closed',
    progressPercent: 100,
  },
  {
    number: 2,
    name: '2º Lote (Vigente)',
    period: 'De 16 de Outubro a 10 de Novembro de 2026',
    price5k10k: 99.9,
    price21k: 139.9,
    status: 'active',
    progressPercent: 84,
  },
  {
    number: 3,
    name: '3º Lote (Últimas Vagas)',
    period: 'De 11 de Novembro até esgotar',
    price5k10k: 119.9,
    price21k: 169.9,
    status: 'upcoming',
    progressPercent: 0,
  },
];

export const SCHEDULE_DAYS = [
  {
    day: '20 de Novembro (Sexta-Feira)',
    title: 'Expo SpeedNight & Retirada de Kits - Dia 1',
    location: 'Shopping Ibirapuera - Piso Jurupis (Tenda Principal)',
    items: [
      { time: '10:00', title: 'Abertura oficial da Expo & Entrega de Kits', desc: 'Apresente documento com foto e comprovante com QR Code.' },
      { time: '15:00', title: 'Ativação biomecânica e teste de pisada gratuito', desc: 'Com equipe de fisioterapeutas esportivos parceiros.' },
      { time: '20:00', title: 'Encerramento do primeiro dia de Expo', desc: 'Não haverá entrega após o fechamento dos portões.' },
    ],
  },
  {
    day: '21 de Novembro (Sábado - Manhã)',
    title: 'Expo SpeedNight & Retirada de Kits - Dia 2',
    location: 'Shopping Ibirapuera - Piso Jurupis',
    items: [
      { time: '10:00', title: 'Abertura do segundo dia de retirada de kits', desc: 'Evite filas chegando preferencialmente até às 14h.' },
      { time: '16:00', title: 'Simpósio Técnico e Dicas de Pacing Noturno', desc: 'Com treinadores certificados e ultramaratonistas convidados.' },
      { time: '18:00', title: 'Encerramento impreterível da entrega de kits', desc: 'Atenção: NÃO HAVERÁ ENTREGA DE KITS NO LOCAL DA PROVA!' },
    ],
  },
  {
    day: '21 de Novembro (Sábado - Noite da Prova)',
    title: 'Dia da Corrida - Obelisco do Ibirapuera',
    location: 'Praça Ibrahim Nobre / Obelisco - São Paulo',
    items: [
      { time: '18:00', title: 'Abertura da Arena dos Atletas e Guarda-Volumes', desc: 'DJ oficial, ativação de patrocinadores e massagem pré-prova.' },
      { time: '19:10', title: 'Fechamento dos Currais de Largada e Aquecimento', desc: 'Acesso aos pelotões por cor de número de peito.' },
      { time: '19:30', title: 'LARGADA OFICIAL 21K MEIA MARATONA', desc: 'Pelotão VIP e Geral.' },
      { time: '19:45', title: 'LARGADA OFICIAL 10K PRO', desc: 'Ondas A, B e C.' },
      { time: '20:00', title: 'LARGADA OFICIAL 5K & CAMINHADA 3K', desc: 'Ondas com espaçamento cronometrado de 3 minutos.' },
      { time: '21:30', title: 'Cerimônia de Premiação Geral e Faixas Etárias', desc: 'Troféus para os 5 primeiros gerais e top 3 de cada categoria.' },
      { time: '23:00', title: 'Show de encerramento e fechamento oficial da Arena', desc: 'Retirada final do guarda-volumes.' },
    ],
  },
];

export const MOCK_RUNNERS_RESULTS: RunnerResult[] = [
  {
    bib: '1042',
    name: 'Lucas Ferreira Mendes',
    gender: 'M',
    category: 'M30-34',
    distance: '10K',
    netTimeSeconds: 2195, // 36:35 -> 3:39/km
    grossTimeSeconds: 2210,
    overallRank: 1,
    genderRank: 1,
    categoryRank: 1,
    split5kSeconds: 1080,
    club: 'Alpha Performance SP',
    photosCount: 12,
  },
  {
    bib: '1088',
    name: 'Mariana Duarte Costa',
    gender: 'F',
    category: 'F25-29',
    distance: '10K',
    netTimeSeconds: 2420, // 40:20 -> 4:02/km
    grossTimeSeconds: 2432,
    overallRank: 8,
    genderRank: 1,
    categoryRank: 1,
    split5kSeconds: 1195,
    club: 'Pace Real Assessoria',
    photosCount: 16,
  },
  {
    bib: '2015',
    name: 'Rodrigo Antunes Siqueira',
    gender: 'M',
    category: 'M35-39',
    distance: '21K',
    netTimeSeconds: 4620, // 1h17min00 -> 3:39/km
    grossTimeSeconds: 4622,
    overallRank: 1,
    genderRank: 1,
    categoryRank: 1,
    split5kSeconds: 1085,
    split10kSeconds: 2180,
    club: 'Corredores da USP',
    photosCount: 22,
  },
  {
    bib: '2094',
    name: 'Beatriz Vasconcelos Lima',
    gender: 'F',
    category: 'F30-34',
    distance: '21K',
    netTimeSeconds: 5280, // 1h28min00 -> 4:10/km
    grossTimeSeconds: 5291,
    overallRank: 12,
    genderRank: 1,
    categoryRank: 1,
    split5kSeconds: 1240,
    split10kSeconds: 2490,
    club: 'Assessoria MPR',
    photosCount: 19,
  },
  {
    bib: '5023',
    name: 'Carlos Eduardo Nogueira',
    gender: 'M',
    category: 'M25-29',
    distance: '5K',
    netTimeSeconds: 975, // 16:15 -> 3:15/km
    grossTimeSeconds: 978,
    overallRank: 1,
    genderRank: 1,
    categoryRank: 1,
    club: 'Nike Running Brasil',
    photosCount: 9,
  },
  {
    bib: '5081',
    name: 'Juliana Pires de Almeida',
    gender: 'F',
    category: 'F30-34',
    distance: '5K',
    netTimeSeconds: 1140, // 19:00 -> 3:48/km
    grossTimeSeconds: 1148,
    overallRank: 6,
    genderRank: 1,
    categoryRank: 1,
    club: 'Care Club Ibirapuera',
    photosCount: 11,
  },
  {
    bib: '1154',
    name: 'Thiago Goncalves Rocha',
    gender: 'M',
    category: 'M40-44',
    distance: '10K',
    netTimeSeconds: 2580, // 43:00 -> 4:18/km
    grossTimeSeconds: 2605,
    overallRank: 24,
    genderRank: 20,
    categoryRank: 3,
    split5kSeconds: 1280,
    club: 'Assessoria Run&Fun',
    photosCount: 7,
  },
  {
    bib: '2210',
    name: 'Fernanda Meirelles Prado',
    gender: 'F',
    category: 'F40-44',
    distance: '21K',
    netTimeSeconds: 5850, // 1h37m30 -> 4:37/km
    grossTimeSeconds: 5875,
    overallRank: 42,
    genderRank: 6,
    categoryRank: 2,
    split5kSeconds: 1370,
    split10kSeconds: 2760,
    club: 'G4 Treinamento Esportivo',
    photosCount: 15,
  },
  {
    bib: '5230',
    name: 'Gabriel Martins Barbosa',
    gender: 'M',
    category: 'M35-39',
    distance: '5K',
    netTimeSeconds: 1260, // 21:00 -> 4:12/km
    grossTimeSeconds: 1275,
    overallRank: 18,
    genderRank: 15,
    categoryRank: 4,
    club: 'Amigos do Parque',
    photosCount: 6,
  },
  {
    bib: '1302',
    name: 'Camila Rossi Zanin',
    gender: 'F',
    category: 'F35-39',
    distance: '10K',
    netTimeSeconds: 2890, // 48:10 -> 4:49/km
    grossTimeSeconds: 2920,
    overallRank: 55,
    genderRank: 14,
    categoryRank: 4,
    split5kSeconds: 1420,
    club: 'Team Iron Runner',
    photosCount: 14,
  },
];

export const FAQ_DATA = [
  {
    q: 'Onde e quando será realizada a retirada de kits?',
    a: 'A retirada ocorrerá exclusivamente na sexta-feira (20/11 das 10h às 20h) e no sábado (21/11 das 10h às 18h) no Shopping Ibirapuera - Piso Jurupis. Em hipótese alguma haverá entrega de kits na arena de largada ou após o horário estipulado.',
  },
  {
    q: 'Outra pessoa pode retirar o kit em meu nome?',
    a: 'Sim! Terceiros podem retirar o kit apresentando: 1) Cópia do documento oficial com foto do atleta inscrito; 2) Comprovante de inscrição com QR Code; 3) Autorização de retirada assinada pelo atleta (modelo disponível no regulamento).',
  },
  {
    q: 'Qual é a idade mínima para participar de cada prova?',
    a: 'Em conformidade com as normas da Confederação Brasileira de Atletismo (CBAt): para a Caminhada 3K e Corrida 5K, idade mínima de 14 anos completos até 31/12/2026; para os 10K, 16 anos; e para a Meia Maratona 21K, 18 anos completos.',
  },
  {
    q: 'Posso alterar a distância da minha inscrição após o pagamento?',
    a: 'Sim, a troca de distância poderá ser solicitada até 15 dias antes da data do evento através da Central de Ajuda do portal. Se houver diferença de valor de lote, será gerado link para pagamento.',
  },
  {
    q: 'Haverá guarda-volumes na arena do evento?',
    a: 'Sim, todos os atletas inscritos têm direito ao serviço gratuito de guarda-volumes das 18h00 às 23h00 na arena do Obelisco. Recomendamos não deixar itens de alto valor como celulares, cartões ou joias.',
  },
  {
    q: 'Como funciona a cronometragem e o chip?',
    a: 'A cronometragem é eletrônica por chip descartável fixado no verso do número de peito. O tempo oficial para premiação geral é o tempo bruto (ordem de chegada), enquanto a classificação por faixas etárias utiliza o tempo líquido.',
  },
];
