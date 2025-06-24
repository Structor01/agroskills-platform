// Tipos de dados para a plataforma AgroSkills

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  profession: string;
  specialization: string;
  experience: string;
  joinDate: string;
  competencies: Competency[];
  achievements: Achievement[];
}

export interface Competency {
  id: string;
  name: string;
  level: number; // 0-100
  category: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  duration: string; // ex: "3h 20min"
  studentsCount: number;
  rating: number; // 0-5
  reviewsCount: number;
  thumbnail: string;
  instructor: string;
  price?: number;
  tags: string[];
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl?: string;
  completed: boolean;
  order: number;
}

export interface UserProgress {
  userId: string;
  courseId: string;
  progress: number; // 0-100
  completedModules: string[];
  startedAt: string;
  lastAccessedAt: string;
  completedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Recommendation {
  id: string;
  courseId: string;
  reason: string;
  priority: number;
}

export interface AppState {
  currentUser: User | null;
  courses: Course[];
  userProgress: UserProgress[];
  categories: Category[];
  recommendations: Recommendation[];
}

