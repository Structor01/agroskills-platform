import { UserProgress, Recommendation } from '../types';

export const mockUserProgress: UserProgress[] = [
  {
    userId: '1',
    courseId: '1',
    progress: 65,
    completedModules: ['1', '2'],
    startedAt: '2024-05-01',
    lastAccessedAt: '2024-06-20',
  },
  {
    userId: '1',
    courseId: '2',
    progress: 100,
    completedModules: ['1', '2'],
    startedAt: '2024-04-15',
    lastAccessedAt: '2024-05-10',
    completedAt: '2024-05-10'
  },
  {
    userId: '1',
    courseId: '3',
    progress: 30,
    completedModules: [],
    startedAt: '2024-06-15',
    lastAccessedAt: '2024-06-18',
  }
];

export const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    courseId: '4',
    reason: 'Baseado no seu interesse em inovação',
    priority: 1
  },
  {
    id: '2',
    courseId: '5',
    reason: 'Próximo passo na sua especialização',
    priority: 2
  }
];

// Função para calcular progresso geral do usuário
export const calculateOverallProgress = (userId: string): number => {
  const userCourses = mockUserProgress.filter(p => p.userId === userId);
  if (userCourses.length === 0) return 0;
  
  const totalProgress = userCourses.reduce((sum, course) => sum + course.progress, 0);
  return Math.round(totalProgress / userCourses.length);
};

// Função para obter cursos em andamento
export const getInProgressCourses = (userId: string) => {
  return mockUserProgress.filter(p => 
    p.userId === userId && 
    p.progress > 0 && 
    p.progress < 100
  );
};

// Função para obter cursos concluídos
export const getCompletedCourses = (userId: string) => {
  return mockUserProgress.filter(p => 
    p.userId === userId && 
    p.progress === 100
  );
};

