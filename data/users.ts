import { User, Competency, Achievement } from '../types';

export const mockCompetencies: Competency[] = [
  {
    id: '1',
    name: 'Irrigação de Precisão',
    level: 85,
    category: 'Tecnologia'
  },
  {
    id: '2',
    name: 'Gestão de Culturas',
    level: 92,
    category: 'Agronegócio'
  },
  {
    id: '3',
    name: 'Análise de Solo',
    level: 78,
    category: 'Ciência'
  },
  {
    id: '4',
    name: 'Sustentabilidade',
    level: 88,
    category: 'Meio Ambiente'
  },
  {
    id: '5',
    name: 'Inovação Agrícola',
    level: 75,
    category: 'Tecnologia'
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Especialista em Irrigação',
    description: 'Completou 5 cursos de irrigação avançada',
    icon: '💧',
    unlockedAt: '2024-05-15'
  },
  {
    id: '2',
    title: 'Mentor da Comunidade',
    description: 'Ajudou mais de 50 profissionais',
    icon: '🏆',
    unlockedAt: '2024-04-20'
  },
  {
    id: '3',
    title: 'Inovador do Ano',
    description: 'Implementou tecnologias emergentes',
    icon: '🚀',
    unlockedAt: '2024-03-10'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Carlos Mendes',
    email: 'carlos.mendes@agroskills.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    profession: 'Engenheiro Agrônomo',
    specialization: 'Especialista em Irrigação',
    experience: 'Profissional com 5 anos de experiência em sistemas de irrigação de precisão e gestão hídrica para culturas de alto valor.',
    joinDate: '2023-01-15',
    competencies: mockCompetencies,
    achievements: mockAchievements
  },
  {
    id: '2',
    name: 'Ana Silva',
    email: 'ana.silva@agroskills.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    profession: 'Zootecnista',
    specialization: 'Nutrição Animal',
    experience: 'Especialista em nutrição e manejo de bovinos de corte e leite.',
    joinDate: '2023-03-20',
    competencies: mockCompetencies.slice(0, 3),
    achievements: mockAchievements.slice(0, 2)
  }
];

export const currentUser = mockUsers[0];

