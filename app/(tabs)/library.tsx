import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  TextInput,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useApp } from '@/contexts/AppContext';
import { useResponsive, getCardWidth, getColumnsForScreen, getResponsivePadding } from '@/hooks/useResponsive';

// Função para obter imagens profissionais baseadas no curso
const getImageForCourse = (courseId: string, type: string = 'course') => {
  const professionalImages = {
    // Imagens para liderança e gestão
    leadership: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    management: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    
    // Imagens para vendas e negociação
    sales: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=300&fit=crop',
    negotiation: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    
    // Imagens para tecnologia e inovação
    technology: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
    innovation: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop',
    
    // Imagens para sustentabilidade
    sustainability: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
    environment: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop',
    
    // Imagens para jurídico e compliance
    legal: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop',
    compliance: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
    
    // Imagens para finanças e investimentos
    finance: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
    investment: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
  };

  // Mapear cursos para categorias de imagens
  const courseImageMap: { [key: string]: string } = {
    '1': professionalImages.technology,
    '2': professionalImages.management,
    '3': professionalImages.sustainability,
    '4': professionalImages.sales,
    '5': professionalImages.leadership,
    '6': professionalImages.finance,
    '7': professionalImages.legal,
    '8': professionalImages.innovation,
  };

  return courseImageMap[courseId] || professionalImages.management;
};

// Componente de card responsivo para biblioteca
const ResponsiveLibraryCard = ({ item, type = 'course' }: { item: any; type?: 'course' | 'app' | 'journey' }) => {
  const { width, isDesktop, isTablet } = useResponsive();
  const padding = getResponsivePadding(width);
  const columns = getColumnsForScreen(width);
  const cardWidth = getCardWidth(width, columns, padding);
  const router = useRouter();
  
  const getTypeIcon = () => {
    switch (type) {
      case 'app': return 'APP';
      case 'journey': return 'TRILHA';
      default: return 'CURSO';
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'app': return '#FF6B6B';
      case 'journey': return '#4ECDC4';
      default: return '#AADD00';
    }
  };

  // Altura do card baseada no tamanho da tela
  const cardHeight = isDesktop ? 220 : isTablet ? 200 : 180;

  const handlePress = () => {
    if (type === 'course') {
      router.push(`/course/${item.id}`);
    }
    // Para apps e jornadas, pode implementar navegação específica no futuro
  };

  return (
    <TouchableOpacity 
      style={[styles.libraryCard, { width: cardWidth, height: cardHeight }]}
      onPress={handlePress}
    >
      <ImageBackground
        source={{ uri: getImageForCourse(item.id, type) }}
        style={styles.cardBackground}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.9)']}
          style={styles.cardGradient}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.typeIndicator, { 
              backgroundColor: getTypeColor(),
              width: isDesktop ? 60 : 50,
              height: isDesktop ? 24 : 20,
              borderRadius: isDesktop ? 12 : 10
            }]}>
              <Text style={[styles.typeIcon, { fontSize: isDesktop ? 10 : 9 }]}>{getTypeIcon()}</Text>
            </View>
          </View>
          
          <View style={[styles.cardContent, { padding: isDesktop ? 16 : 12 }]}>
            <Text style={[styles.cardTitle, { fontSize: isDesktop ? 16 : 14 }]} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={[styles.cardCategory, { fontSize: isDesktop ? 13 : 12 }]}>
              {item.category}
            </Text>
            <Text style={[styles.cardLevel, { fontSize: isDesktop ? 13 : 12 }]}>
              {item.level}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

// Componente de filtro de categoria responsivo
const ResponsiveCategoryFilter = ({ categories, selectedCategory, onSelectCategory }: {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}) => {
  const { width, isDesktop } = useResponsive();
  const padding = getResponsivePadding(width);

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.categoryFilter}
      contentContainerStyle={[styles.categoryFilterContent, { paddingHorizontal: padding }]}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.categoryButton,
            selectedCategory === category && styles.categoryButtonActive,
            { 
              paddingHorizontal: isDesktop ? 24 : 20,
              paddingVertical: isDesktop ? 12 : 10,
              marginRight: isDesktop ? 16 : 12
            }
          ]}
          onPress={() => onSelectCategory(category)}
        >
          <Text style={[
            styles.categoryButtonText,
            selectedCategory === category && styles.categoryButtonTextActive,
            { fontSize: isDesktop ? 16 : 14 }
          ]}>
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

// Componente de seção de conteúdo responsivo
const ResponsiveContentSection = ({ title, data, type }: { title: string; data: any[]; type: 'course' | 'app' | 'journey' }) => {
  const { width, isDesktop } = useResponsive();
  const padding = getResponsivePadding(width);
  const columns = getColumnsForScreen(width);

  return (
    <View style={[styles.contentSection, { marginBottom: isDesktop ? 40 : 30 }]}>
      <Text style={[styles.sectionTitle, { 
        fontSize: isDesktop ? 24 : 20,
        paddingHorizontal: padding
      }]}>
        {title}
      </Text>
      <View style={[styles.contentGrid, { 
        paddingHorizontal: padding,
        gap: isDesktop ? 16 : 12
      }]}>
        {data.map((item, index) => (
          <ResponsiveLibraryCard key={item.id || index} item={item} type={type} />
        ))}
      </View>
    </View>
  );
};

export default function LibraryScreen() {
  const { courses } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const { width, isDesktop, isTablet } = useResponsive();
  const padding = getResponsivePadding(width);

  // Dados mockados para apps e jornadas
  const apps = [
    {
      id: 'app1',
      title: 'Calculadora de Irrigação',
      category: 'Ferramentas',
      level: 'Gratuito',
      description: 'Calcule a quantidade ideal de água para suas culturas'
    },
    {
      id: 'app2',
      title: 'Monitor de Pragas',
      category: 'Monitoramento',
      level: 'Premium',
      description: 'Identifique e monitore pragas em tempo real'
    },
    {
      id: 'app3',
      title: 'Previsão do Tempo Agrícola',
      category: 'Clima',
      level: 'Gratuito',
      description: 'Previsões meteorológicas específicas para agricultura'
    }
  ];

  const journeys = [
    {
      id: 'journey1',
      title: 'Jornada do Produtor Iniciante',
      category: 'Iniciante',
      level: '6 meses',
      description: 'Trilha completa para quem está começando no agronegócio'
    },
    {
      id: 'journey2',
      title: 'Especialização em Sustentabilidade',
      category: 'Avançado',
      level: '12 meses',
      description: 'Torne-se um especialista em práticas sustentáveis'
    },
    {
      id: 'journey3',
      title: 'Liderança no Agronegócio',
      category: 'Gestão',
      level: '9 meses',
      description: 'Desenvolva habilidades de liderança no setor agrícola'
    }
  ];

  // Categorias disponíveis
  const categories = ['Todos', 'Tecnologia', 'Gestão', 'Sustentabilidade', 'Ferramentas', 'Monitoramento'];

  // Filtrar conteúdo baseado na categoria e busca
  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'Todos' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredApps = apps.filter(app => {
    const matchesCategory = selectedCategory === 'Todos' || app.category === selectedCategory;
    const matchesSearch = app.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredJourneys = journeys.filter(journey => {
    const matchesCategory = selectedCategory === 'Todos' || journey.category === selectedCategory;
    const matchesSearch = journey.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header responsivo */}
        <View style={[styles.header, { paddingHorizontal: padding }]}>
          <Text style={[styles.headerTitle, { fontSize: isDesktop ? 32 : 28 }]}>Biblioteca</Text>
          <TouchableOpacity style={[styles.searchButton, {
            width: isDesktop ? 44 : 40,
            height: isDesktop ? 44 : 40,
            borderRadius: isDesktop ? 22 : 20
          }]}>
            <Text style={[styles.searchIcon, { fontSize: isDesktop ? 20 : 18 }]}>🔍</Text>
          </TouchableOpacity>
        </View>

        {/* Barra de busca responsiva */}
        <View style={[styles.searchContainer, { paddingHorizontal: padding }]}>
          <TextInput
            style={[styles.searchInput, { 
              paddingHorizontal: isDesktop ? 20 : 16,
              paddingVertical: isDesktop ? 16 : 12,
              fontSize: isDesktop ? 18 : 16
            }]}
            placeholder="Buscar cursos, apps ou jornadas..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filtros de categoria responsivos */}
        <ResponsiveCategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Conteúdo responsivo */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Cursos */}
          {filteredCourses.length > 0 && (
            <ResponsiveContentSection title="Cursos" data={filteredCourses} type="course" />
          )}

          {/* Apps */}
          {filteredApps.length > 0 && (
            <ResponsiveContentSection title="Aplicativos" data={filteredApps} type="app" />
          )}

          {/* Jornadas */}
          {filteredJourneys.length > 0 && (
            <ResponsiveContentSection title="Jornadas" data={filteredJourneys} type="journey" />
          )}

          {/* Mensagem quando não há resultados */}
          {filteredCourses.length === 0 && filteredApps.length === 0 && filteredJourneys.length === 0 && (
            <View style={[styles.emptyState, { paddingHorizontal: padding }]}>
              <Text style={[styles.emptyStateText, { fontSize: isDesktop ? 20 : 18 }]}>
                Nenhum conteúdo encontrado
              </Text>
              <Text style={[styles.emptyStateSubtext, { fontSize: isDesktop ? 16 : 14 }]}>
                Tente ajustar os filtros ou termo de busca
              </Text>
            </View>
          )}

          <View style={[styles.bottomSpacing, { height: isDesktop ? 120 : 100 }]} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingTop: Platform.OS === 'web' ? 20 : 16,
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: 'transparent',
  },
  searchButton: {
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {},
  
  // Busca
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#333333',
    borderRadius: 8,
    color: '#FFFFFF',
    backgroundColor: 'transparent',
  },

  // Filtros de categoria
  categoryFilter: {
    marginBottom: 20,
  },
  categoryFilterContent: {},
  categoryButton: {
    backgroundColor: '#333333',
    borderRadius: 20,
  },
  categoryButtonActive: {
    backgroundColor: '#AADD00',
  },
  categoryButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
  categoryButtonTextActive: {
    color: '#000000',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },

  // Conteúdo
  content: {
    flex: 1,
  },
  contentSection: {},
  sectionTitle: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  contentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  // Cards da biblioteca
  libraryCard: {
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: '#222',
  },
  cardBackground: {
    flex: 1,
  },
  cardGradient: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardHeader: {
    padding: 12,
    alignItems: 'flex-end',
  },
  typeIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeIcon: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  cardContent: {},
  cardTitle: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    backgroundColor: 'transparent',
  },
  cardCategory: {
    color: '#CCCCCC',
    marginBottom: 2,
    backgroundColor: 'transparent',
  },
  cardLevel: {
    color: '#AADD00',
    fontWeight: '600',
    backgroundColor: 'transparent',
  },

  // Estado vazio
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  emptyStateSubtext: {
    color: '#CCCCCC',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  bottomSpacing: {},
});

