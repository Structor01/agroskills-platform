import { Course, Module, Category } from '../types';

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Todos',
    icon: '📚',
    color: '#4CAF50'
  },
  {
    id: '2',
    name: 'Carreira',
    icon: '💼',
    color: '#2196F3'
  },
  {
    id: '3',
    name: 'Conhecimento',
    icon: '🧠',
    color: '#FF9800'
  },
  {
    id: '4',
    name: 'Tecnologia',
    icon: '🚀',
    color: '#9C27B0'
  }
];

const mockModules: Module[] = [
  {
    id: '1',
    title: 'Introdução às Tecnologias Emergentes',
    description: 'Visão geral das principais tecnologias no agronegócio',
    duration: '45min',
    completed: true,
    order: 1
  },
  {
    id: '2',
    title: 'IoT na Agricultura',
    description: 'Internet das Coisas aplicada ao campo',
    duration: '1h 20min',
    completed: true,
    order: 2
  },
  {
    id: '3',
    title: 'Inteligência Artificial no Agro',
    description: 'IA para otimização de culturas',
    duration: '1h 15min',
    completed: false,
    order: 3
  }
];

export const mockCourses: Course[] = [
  {
    id: '0',
    title: 'Carreira de Sucesso no Agronegócio',
    description: 'O programa completo para vendedores, diretores e advogados que querem construir uma carreira sólida e lucrativa no setor do agronegócio. Aprenda as estratégias, networking e competências essenciais para se destacar neste mercado de trilhões.',
    instructor: 'Dr. Roberto Silva',
    duration: '8h 30min',
    level: 'Intermediário',
    rating: 4.9,
    studentsCount: 2847,
    category: 'Carreira',
    tags: ['carreira', 'agronegócio', 'liderança', 'vendas', 'networking'],
    thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=450&fit=crop',
    modules: [
      {
        id: '0-1',
        title: 'Panorama do Agronegócio Brasileiro',
        description: 'Entenda o mercado, oportunidades e principais players',
        duration: '1h 15min',
        completed: false,
        order: 1
      },
      {
        id: '0-2',
        title: 'Competências do Profissional de Sucesso',
        description: 'Habilidades técnicas e comportamentais essenciais',
        duration: '1h 30min',
        completed: false,
        order: 2
      },
      {
        id: '0-3',
        title: 'Estratégias de Networking no Agro',
        description: 'Como construir relacionamentos que geram oportunidades',
        duration: '1h 20min',
        completed: false,
        order: 3
      },
      {
        id: '0-4',
        title: 'Vendas Consultivas no Agronegócio',
        description: 'Técnicas avançadas para vendedores do setor',
        duration: '2h 10min',
        completed: false,
        order: 4
      },
      {
        id: '0-5',
        title: 'Liderança e Gestão de Equipes',
        description: 'Para diretores e gestores do agronegócio',
        duration: '1h 45min',
        completed: false,
        order: 5
      },
      {
        id: '0-6',
        title: 'Aspectos Jurídicos e Compliance',
        description: 'Conhecimentos essenciais para advogados do setor',
        duration: '30min',
        completed: false,
        order: 6
      }
    ]
  },
  {
    id: '1',
    title: 'Tecnologias Emergentes no Agro',
    description: 'Domine as tecnologias que estão transformando o agronegócio',
    category: 'Tecnologia',
    level: 'Intermediário',
    duration: '3h 20min',
    studentsCount: 2800,
    rating: 4.8,
    reviewsCount: 342,
    thumbnail: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=300&h=200&fit=crop',
    instructor: 'Dr. Roberto Santos',
    price: 199,
    tags: ['IoT', 'IA', 'Drones', 'Sensores'],
    modules: mockModules
  },
  {
    id: '2',
    title: 'Gestão de Projetos no Agronegócio',
    description: 'Metodologias eficazes para gestão de projetos rurais',
    category: 'Carreira',
    level: 'Intermediário',
    duration: '2h 45min',
    studentsCount: 1200,
    rating: 4.6,
    reviewsCount: 156,
    thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop',
    instructor: 'Maria Fernanda',
    price: 149,
    tags: ['Gestão', 'Projetos', 'Planejamento'],
    modules: mockModules.slice(0, 2)
  },
  {
    id: '3',
    title: 'Simulador de Entrevistas',
    description: 'Prepare-se para entrevistas no agronegócio',
    category: 'Carreira',
    level: 'Iniciante',
    duration: '1h 30min',
    studentsCount: 850,
    rating: 4.7,
    reviewsCount: 98,
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
    instructor: 'Carlos Mendes',
    price: 99,
    tags: ['Entrevista', 'Carreira', 'Comunicação'],
    modules: mockModules.slice(0, 1)
  },
  {
    id: '4',
    title: 'Comunidade de Inovação Agrícola',
    description: 'Conecte-se com inovadores do agronegócio',
    category: 'Conhecimento',
    level: 'Iniciante',
    duration: 'Contínuo',
    studentsCount: 3500,
    rating: 4.9,
    reviewsCount: 420,
    thumbnail: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=300&h=200&fit=crop',
    instructor: 'Comunidade AgroSkills',
    tags: ['Networking', 'Inovação', 'Comunidade'],
    modules: []
  },
  {
    id: '5',
    title: 'Especialista em Agricultura',
    description: 'Programa completo para especialização agrícola',
    category: 'Carreira',
    level: 'Avançado',
    duration: '12h 30min',
    studentsCount: 650,
    rating: 4.9,
    reviewsCount: 89,
    thumbnail: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=300&h=200&fit=crop',
    instructor: 'Dr. Ana Costa',
    price: 399,
    tags: ['Especialização', 'Agricultura', 'Certificação'],
    modules: [...mockModules, ...mockModules.map(m => ({ ...m, id: m.id + '_2', order: m.order + 3 }))]
  }
];

export const featuredCourses = mockCourses.slice(0, 3);
export const recommendedCourses = mockCourses.slice(1, 4);

