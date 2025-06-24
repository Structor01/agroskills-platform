import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

interface ScreenDimensions {
  width: number;
  height: number;
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  isLandscape: boolean;
}

export const useResponsive = (): ScreenDimensions => {
  const [dimensions, setDimensions] = useState(() => {
    const { width, height } = Dimensions.get('window');
    return {
      width,
      height,
      isDesktop: width >= 1024,
      isTablet: width >= 768 && width < 1024,
      isMobile: width < 768,
      isLandscape: width > height,
    };
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      const { width, height } = window;
      setDimensions({
        width,
        height,
        isDesktop: width >= 1024,
        isTablet: width >= 768 && width < 1024,
        isMobile: width < 768,
        isLandscape: width > height,
      });
    });

    return () => subscription?.remove();
  }, []);

  return dimensions;
};

// Função para calcular largura de cards responsivos
export const getCardWidth = (screenWidth: number, columns: number, padding: number = 20): number => {
  const totalPadding = padding * 2; // padding lateral
  const gap = 12; // espaço entre cards
  const totalGaps = (columns - 1) * gap;
  return (screenWidth - totalPadding - totalGaps) / columns;
};

// Função para determinar número de colunas baseado na tela
export const getColumnsForScreen = (screenWidth: number): number => {
  if (screenWidth >= 1200) return 4; // Desktop grande
  if (screenWidth >= 1024) return 3; // Desktop
  if (screenWidth >= 768) return 2;  // Tablet
  return 2; // Mobile (mínimo 2 colunas)
};

// Função para espaçamentos responsivos
export const getResponsivePadding = (screenWidth: number): number => {
  if (screenWidth >= 1024) return 40; // Desktop
  if (screenWidth >= 768) return 30;  // Tablet
  return 20; // Mobile
};

