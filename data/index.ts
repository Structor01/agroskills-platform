// Arquivo principal que exporta todos os dados mocados
export * from './types';
export * from './users';
export * from './courses';
export * from './progress';

import { AppState } from './types';
import { mockUsers, currentUser } from './users';
import { mockCourses, mockCategories } from './courses';
import { mockUserProgress, mockRecommendations } from './progress';

export const initialAppState: AppState = {
  currentUser,
  courses: mockCourses,
  userProgress: mockUserProgress,
  categories: mockCategories,
  recommendations: mockRecommendations
};

// Dados para demonstração rápida
export const demoData = {
  user: currentUser,
  courses: mockCourses,
  categories: mockCategories,
  progress: mockUserProgress,
  recommendations: mockRecommendations
};

