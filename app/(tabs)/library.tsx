import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '@/contexts/AppContext';

const { width } = Dimensions.get('window');

// Componente de card de conteúdo para biblioteca
const LibraryCard = ({ item, type = 'course' }: { item: any; type?: 'course' | 'app' | 'journey' }) => {
  const cardWidth = (width - 60) / 2; // 2 colunas com espaçamento
  
  const getTypeIcon = () => {
    switch (type) {
      case 'app': return '📱';
      case 'journey': return '🗺️';
      default: return '📚';
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'app': return '#FF6B6B';
      case 'journey': return '#4ECDC4';
      default: return '#AADD00';
    }
  };

  return (
    <TouchableOpacity style={[styles.libraryCard, { width: cardWidth }]}>
      <ImageBackground
        source={{ uri: `https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=300&h=200&fit=crop` }}
        style={styles.cardBackground}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.9)']}
          style={styles.cardGradient}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.typeIndicator, { backgroundColor: getTypeColor() }]}>
              <Text style={styles.typeIcon}>{getTypeIcon()}</Text>
            </View>
          </View>
          
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.cardCategory}>{item.category}</Text>
            <Text style={styles.cardLevel}>{item.level}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

// Componente de filtro de categoria
const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }: {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.categoryFilter}
      contentContainerStyle={styles.categoryFilterContent}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.categoryButton,
            selectedCategory === category && styles.categoryButtonActive
          ]}
          onPress={() => onSelectCategory(category)}
        >
          <Text style={[
            styles.categoryButtonText,
            selectedCategory === category && styles.categoryButtonTextActive
          ]}>
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

// Componente de seção de conteúdo
const ContentSection = ({ title, data, type }: { title: string; data: any[]; type: 'course' | 'app' | 'journey' }) => {
  return (
    <View style={styles.contentSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.contentGrid}>
        {data.map((item, index) => (
          <LibraryCard key={item.id || index} item={item} type={type} />
        ))}
      </View>
    </View>
  );
};

export default function LibraryScreen() {
  const { courses } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

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
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Biblioteca</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
        </View>

        {/* Barra de busca */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar cursos, apps ou jornadas..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filtros de categoria */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Conteúdo */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Cursos */}
          {filteredCourses.length > 0 && (
            <ContentSection title="Cursos" data={filteredCourses} type="course" />
          )}

          {/* Apps */}
          {filteredApps.length > 0 && (
            <ContentSection title="Aplicativos" data={filteredApps} type="app" />
          )}

          {/* Jornadas */}
          {filteredJourneys.length > 0 && (
            <ContentSection title="Jornadas" data={filteredJourneys} type="journey" />
          )}

          {/* Mensagem quando não há resultados */}
          {filteredCourses.length === 0 && filteredApps.length === 0 && filteredJourneys.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>Nenhum conteúdo encontrado</Text>
              <Text style={styles.emptyStateSubtext}>Tente ajustar os filtros ou termo de busca</Text>
            </View>
          )}

          <View style={styles.bottomSpacing} />
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
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 18,
  },
  
  // Busca
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#fff',
  },

  // Filtros de categoria
  categoryFilter: {
    marginBottom: 20,
  },
  categoryFilterContent: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
  },
  categoryButtonActive: {
    backgroundColor: '#AADD00',
  },
  categoryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#000',
    fontWeight: 'bold',
  },

  // Conteúdo
  content: {
    flex: 1,
  },
  contentSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  contentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },

  // Cards da biblioteca
  libraryCard: {
    height: 200,
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
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeIcon: {
    fontSize: 16,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    lineHeight: 18,
  },
  cardCategory: {
    fontSize: 12,
    color: '#ccc',
    marginBottom: 2,
  },
  cardLevel: {
    fontSize: 12,
    color: '#AADD00',
    fontWeight: '600',
  },

  // Estado vazio
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 100,
  },
});

