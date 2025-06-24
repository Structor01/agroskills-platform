import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppState, User, Course, UserProgress } from '../data/types';
import { initialAppState } from '../data';

interface AppContextType extends AppState {
  // Estado de autenticação
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Ações para atualizar o estado
  updateUserProgress: (courseId: string, progress: number) => void;
  markModuleComplete: (courseId: string, moduleId: string) => void;
  setCurrentUser: (user: User | null) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    ...initialAppState,
    currentUser: null // Iniciar sem usuário logado
  });
  const [isLoading, setIsLoading] = useState(false);

  const updateUserProgress = (courseId: string, progress: number) => {
    setState(prevState => ({
      ...prevState,
      userProgress: prevState.userProgress.map(p =>
        p.courseId === courseId && p.userId === prevState.currentUser?.id
          ? { ...p, progress, lastAccessedAt: new Date().toISOString() }
          : p
      )
    }));
  };

  const markModuleComplete = (courseId: string, moduleId: string) => {
    setState(prevState => {
      const userProgress = prevState.userProgress.find(
        p => p.courseId === courseId && p.userId === prevState.currentUser?.id
      );
      
      if (!userProgress) return prevState;

      const updatedCompletedModules = [...userProgress.completedModules];
      if (!updatedCompletedModules.includes(moduleId)) {
        updatedCompletedModules.push(moduleId);
      }

      // Calcular novo progresso baseado nos módulos completados
      const course = prevState.courses.find(c => c.id === courseId);
      const newProgress = course 
        ? Math.round((updatedCompletedModules.length / course.modules.length) * 100)
        : userProgress.progress;

      return {
        ...prevState,
        userProgress: prevState.userProgress.map(p =>
          p.courseId === courseId && p.userId === prevState.currentUser?.id
            ? { 
                ...p, 
                completedModules: updatedCompletedModules,
                progress: newProgress,
                lastAccessedAt: new Date().toISOString(),
                completedAt: newProgress === 100 ? new Date().toISOString() : undefined
              }
            : p
        )
      };
    });
  };

  const setCurrentUser = (user: User | null) => {
    setState(prevState => ({
      ...prevState,
      currentUser: user
    }));
  };

  const logout = () => {
    setState(prevState => ({
      ...prevState,
      currentUser: null
    }));
  };

  const contextValue: AppContextType = {
    ...state,
    isAuthenticated: !!state.currentUser,
    isLoading,
    updateUserProgress,
    markModuleComplete,
    setCurrentUser,
    logout
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Hook para obter progresso de um curso específico
export const useCourseProgress = (courseId: string) => {
  const { currentUser, userProgress } = useApp();
  
  return userProgress.find(
    p => p.courseId === courseId && p.userId === currentUser?.id
  );
};

// Hook para obter cursos em andamento
export const useInProgressCourses = () => {
  const { currentUser, userProgress, courses } = useApp();
  
  const inProgressIds = userProgress
    .filter(p => p.userId === currentUser?.id && p.progress > 0 && p.progress < 100)
    .map(p => p.courseId);
    
  return courses.filter(c => inProgressIds.includes(c.id));
};

// Hook para obter cursos recomendados
export const useRecommendedCourses = () => {
  const { recommendations, courses } = useApp();
  
  return recommendations
    .sort((a, b) => a.priority - b.priority)
    .map(r => courses.find(c => c.id === r.courseId))
    .filter(Boolean) as Course[];
};

