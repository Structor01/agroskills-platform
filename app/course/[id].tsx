import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useApp } from '@/contexts/AppContext';
import { useResponsive, getCardWidth, getColumnsForScreen, getResponsivePadding } from '@/hooks/useResponsive';

// Componente de módulo/episódio responsivo
const ResponsiveModuleItem = ({ module, index, isCompleted }: { module: any; index: number; isCompleted: boolean }) => {
  const { isDesktop, isTablet } = useResponsive();

  return (
    <TouchableOpacity style={[styles.moduleItem, { 
      paddingVertical: isDesktop ? 20 : 16,
      paddingHorizontal: isDesktop ? 20 : 0
    }]}>
      <View style={[styles.moduleNumber, {
        width: isDesktop ? 48 : 40,
        height: isDesktop ? 48 : 40,
        borderRadius: isDesktop ? 24 : 20,
        marginRight: isDesktop ? 20 : 16
      }]}>
        <Text style={[styles.moduleNumberText, { fontSize: isDesktop ? 18 : 16 }]}>
          {index + 1}
        </Text>
      </View>
      
      <View style={styles.moduleContent}>
        <Text style={[styles.moduleTitle, { fontSize: isDesktop ? 18 : 16 }]}>
          {module.title}
        </Text>
        <Text style={[styles.moduleDescription, { fontSize: isDesktop ? 16 : 14 }]} numberOfLines={2}>
          {module.description}
        </Text>
        <Text style={[styles.moduleDuration, { fontSize: isDesktop ? 14 : 12 }]}>
          {module.duration}
        </Text>
      </View>
      
      <View style={[styles.moduleStatus, { width: isDesktop ? 48 : 40 }]}>
        {isCompleted ? (
          <Text style={[styles.completedIcon, { fontSize: isDesktop ? 24 : 20 }]}>✓</Text>
        ) : (
          <Text style={[styles.playIcon, { fontSize: isDesktop ? 20 : 16 }]}>▶</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

// Componente de curso relacionado responsivo
const ResponsiveRelatedCourseCard = ({ course }: { course: any }) => {
  const { width, isDesktop } = useResponsive();
  const padding = getResponsivePadding(width);
  const columns = getColumnsForScreen(width);
  const cardWidth = getCardWidth(width, columns, padding);
  const cardHeight = isDesktop ? 140 : 120;

  return (
    <TouchableOpacity style={[styles.relatedCard, { width: cardWidth, height: cardHeight }]}>
      <ImageBackground
        source={{ uri: `https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=300&h=200&fit=crop` }}
        style={styles.relatedCardBackground}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.relatedCardGradient}
        >
          <View style={[styles.relatedCardContent, { padding: isDesktop ? 16 : 12 }]}>
            <Text style={[styles.relatedCardTitle, { fontSize: isDesktop ? 16 : 14 }]} numberOfLines={2}>
              {course.title}
            </Text>
            <Text style={[styles.relatedCardLevel, { fontSize: isDesktop ? 13 : 12 }]}>
              {course.level}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default function CourseDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { courses, currentUser } = useApp();
  const [selectedTab, setSelectedTab] = useState('episodes');
  const { width, height, isDesktop, isTablet, isMobile } = useResponsive();
  const padding = getResponsivePadding(width);

  // Encontrar o curso pelo ID (simulado)
  const course = courses.find(c => c.id === id) || courses[0];
  
  // Dados mockados para demonstração
  const courseModules = [
    {
      id: '1',
      title: 'Introdução às Tecnologias Emergentes',
      description: 'Visão geral das principais tecnologias que estão transformando o agronegócio',
      duration: '15 min'
    },
    {
      id: '2',
      title: 'IoT na Agricultura',
      description: 'Como a Internet das Coisas está revolucionando o monitoramento de culturas',
      duration: '22 min'
    },
    {
      id: '3',
      title: 'Inteligência Artificial no Campo',
      description: 'Aplicações práticas de IA para otimização de processos agrícolas',
      duration: '28 min'
    },
    {
      id: '4',
      title: 'Drones e Agricultura de Precisão',
      description: 'Uso de drones para mapeamento e monitoramento de propriedades rurais',
      duration: '25 min'
    }
  ];

  const relatedCourses = courses.filter(c => c.id !== course.id).slice(0, isDesktop ? 4 : 3);
  const completedModules = ['1', '2']; // Simulado

  // Altura do hero baseada no tamanho da tela
  const heroHeight = isDesktop ? height * 0.7 : isTablet ? height * 0.6 : height * 0.5;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section Responsivo */}
        <View style={[styles.heroSection, { height: heroHeight }]}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=500&fit=crop' }}
            style={styles.heroBackground}
            resizeMode="cover"
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
              style={styles.heroGradient}
            >
              {/* Header */}
              <SafeAreaView style={[styles.headerContainer, { paddingHorizontal: padding }]}>
                <TouchableOpacity 
                  style={[styles.backButton, {
                    width: isDesktop ? 48 : 40,
                    height: isDesktop ? 48 : 40,
                    borderRadius: isDesktop ? 24 : 20
                  }]}
                  onPress={() => router.back()}
                >
                  <Text style={[styles.backButtonText, { fontSize: isDesktop ? 24 : 20 }]}>←</Text>
                </TouchableOpacity>
              </SafeAreaView>

              {/* Hero Content */}
              <View style={[styles.heroContent, { 
                paddingHorizontal: padding,
                maxWidth: isDesktop ? '60%' : '90%'
              }]}>
                <Text style={[styles.courseCategory, { fontSize: isDesktop ? 16 : 14 }]}>
                  {course.category}
                </Text>
                <Text style={[styles.courseTitle, { 
                  fontSize: isDesktop ? 36 : isTablet ? 32 : 28,
                  lineHeight: isDesktop ? 42 : isTablet ? 38 : 32
                }]}>
                  {course.title}
                </Text>
                <Text style={[styles.courseDescription, { 
                  fontSize: isDesktop ? 18 : 16,
                  lineHeight: isDesktop ? 26 : 22
                }]}>
                  {course.description}
                </Text>
                
                <View style={[styles.courseMetadata, { 
                  flexDirection: isDesktop ? 'row' : 'column',
                  alignItems: isDesktop ? 'center' : 'flex-start',
                  gap: isDesktop ? 24 : 8
                }]}>
                  <Text style={[styles.metadataItem, { fontSize: isDesktop ? 16 : 14 }]}>
                    ⭐ {course.level}
                  </Text>
                  <Text style={[styles.metadataItem, { fontSize: isDesktop ? 16 : 14 }]}>
                    🕒 {course.duration}
                  </Text>
                  <Text style={[styles.metadataItem, { fontSize: isDesktop ? 16 : 14 }]}>
                    📚 {courseModules.length} módulos
                  </Text>
                </View>

                <View style={[styles.heroActions, { 
                  flexDirection: isDesktop ? 'row' : 'column',
                  gap: isDesktop ? 16 : 12,
                  maxWidth: isDesktop ? 400 : '100%'
                }]}>
                  <TouchableOpacity style={[styles.playButton, { 
                    paddingHorizontal: isDesktop ? 40 : 32,
                    paddingVertical: isDesktop ? 16 : 12,
                    flex: isDesktop ? 1 : 0
                  }]}>
                    <Text style={[styles.playButtonText, { fontSize: isDesktop ? 18 : 16 }]}>
                      ▶ Começar curso
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={[styles.addButton, { 
                    paddingHorizontal: isDesktop ? 32 : 24,
                    paddingVertical: isDesktop ? 16 : 12,
                    flex: isDesktop ? 0 : 0
                  }]}>
                    <Text style={[styles.addButtonText, { fontSize: isDesktop ? 18 : 16 }]}>
                      + Minha lista
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

        {/* Tabs Responsivos */}
        <View style={[styles.tabsContainer, { paddingHorizontal: padding }]}>
          {['episodes', 'details', 'related'].map((tab) => {
            const tabLabels = { episodes: 'Módulos', details: 'Detalhes', related: 'Relacionados' };
            return (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tab,
                  selectedTab === tab && styles.tabActive,
                  { 
                    paddingHorizontal: isDesktop ? 20 : 16,
                    paddingVertical: isDesktop ? 12 : 8,
                    marginRight: isDesktop ? 20 : 16
                  }
                ]}
                onPress={() => setSelectedTab(tab)}
              >
                <Text style={[
                  styles.tabText,
                  selectedTab === tab && styles.tabTextActive,
                  { fontSize: isDesktop ? 18 : 16 }
                ]}>
                  {tabLabels[tab as keyof typeof tabLabels]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Tab Content */}
        <View style={[styles.tabContent, { paddingHorizontal: padding }]}>
          {selectedTab === 'episodes' && (
            <View style={styles.episodesTab}>
              <Text style={[styles.sectionTitle, { fontSize: isDesktop ? 24 : 20 }]}>
                Módulos do curso
              </Text>
              {courseModules.map((module, index) => (
                <ResponsiveModuleItem
                  key={module.id}
                  module={module}
                  index={index}
                  isCompleted={completedModules.includes(module.id)}
                />
              ))}
            </View>
          )}

          {selectedTab === 'details' && (
            <View style={styles.detailsTab}>
              <Text style={[styles.sectionTitle, { fontSize: isDesktop ? 24 : 20 }]}>
                Sobre este curso
              </Text>
              <Text style={[styles.detailsText, { 
                fontSize: isDesktop ? 18 : 16,
                lineHeight: isDesktop ? 28 : 24
              }]}>
                Este curso abrangente explora as tecnologias emergentes que estão transformando 
                o setor agrícola. Você aprenderá sobre IoT, inteligência artificial, drones e 
                outras inovações que estão revolucionando a agricultura moderna.
              </Text>
              
              <Text style={[styles.subsectionTitle, { fontSize: isDesktop ? 20 : 18 }]}>
                O que você vai aprender
              </Text>
              <View style={styles.learningPoints}>
                {[
                  'Fundamentos das tecnologias emergentes no agro',
                  'Implementação prática de IoT na agricultura',
                  'Aplicações de IA para otimização de processos',
                  'Uso de drones para agricultura de precisão'
                ].map((point, index) => (
                  <Text key={index} style={[styles.learningPoint, { 
                    fontSize: isDesktop ? 16 : 14,
                    lineHeight: isDesktop ? 24 : 20
                  }]}>
                    • {point}
                  </Text>
                ))}
              </View>

              <Text style={[styles.subsectionTitle, { fontSize: isDesktop ? 20 : 18 }]}>
                Instrutor
              </Text>
              <View style={styles.instructorInfo}>
                <View style={[styles.instructorAvatar, {
                  width: isDesktop ? 60 : 50,
                  height: isDesktop ? 60 : 50,
                  borderRadius: isDesktop ? 30 : 25,
                  marginRight: isDesktop ? 20 : 16
                }]}>
                  <Text style={[styles.instructorInitials, { fontSize: isDesktop ? 20 : 18 }]}>
                    DR
                  </Text>
                </View>
                <View style={styles.instructorDetails}>
                  <Text style={[styles.instructorName, { fontSize: isDesktop ? 18 : 16 }]}>
                    Dr. Roberto Silva
                  </Text>
                  <Text style={[styles.instructorTitle, { fontSize: isDesktop ? 16 : 14 }]}>
                    Especialista em Tecnologia Agrícola
                  </Text>
                </View>
              </View>
            </View>
          )}

          {selectedTab === 'related' && (
            <View style={styles.relatedTab}>
              <Text style={[styles.sectionTitle, { fontSize: isDesktop ? 24 : 20 }]}>
                Cursos relacionados
              </Text>
              <View style={[styles.relatedGrid, { gap: isDesktop ? 16 : 12 }]}>
                {relatedCourses.map((relatedCourse) => (
                  <ResponsiveRelatedCourseCard key={relatedCourse.id} course={relatedCourse} />
                ))}
              </View>
            </View>
          )}
        </View>

        <View style={[styles.bottomSpacing, { height: isDesktop ? 120 : 100 }]} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  scrollView: {
    flex: 1,
  },
  
  // Hero Section
  heroSection: {},
  heroBackground: {
    flex: 1,
  },
  heroGradient: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerContainer: {
    paddingTop: Platform.OS === 'web' ? 20 : 10,
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  heroContent: {
    paddingBottom: 40,
  },
  courseCategory: {
    color: '#AADD00',
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 8,
  },
  courseTitle: {
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  courseDescription: {
    color: '#ccc',
    marginBottom: 16,
  },
  courseMetadata: {
    marginBottom: 24,
  },
  metadataItem: {
    color: '#ccc',
  },
  heroActions: {},
  playButton: {
    backgroundColor: '#fff',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },

  // Tabs
  tabsContainer: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tab: {},
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#AADD00',
  },
  tabText: {
    color: '#ccc',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // Tab Content
  tabContent: {
    paddingTop: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },

  // Episodes Tab
  episodesTab: {},
  moduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  moduleNumber: {
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moduleNumberText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  moduleContent: {
    flex: 1,
  },
  moduleTitle: {
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  moduleDescription: {
    color: '#ccc',
    marginBottom: 4,
  },
  moduleDuration: {
    color: '#AADD00',
  },
  moduleStatus: {
    alignItems: 'center',
  },
  completedIcon: {
    color: '#AADD00',
  },
  playIcon: {
    color: '#ccc',
  },

  // Details Tab
  detailsTab: {},
  detailsText: {
    color: '#ccc',
    marginBottom: 24,
  },
  subsectionTitle: {
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  learningPoints: {
    marginBottom: 24,
  },
  learningPoint: {
    color: '#ccc',
    marginBottom: 8,
  },
  instructorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructorAvatar: {
    backgroundColor: '#AADD00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructorInitials: {
    fontWeight: 'bold',
    color: '#000',
  },
  instructorDetails: {},
  instructorName: {
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  instructorTitle: {
    color: '#ccc',
  },

  // Related Tab
  relatedTab: {},
  relatedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  relatedCard: {
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: '#222',
  },
  relatedCardBackground: {
    flex: 1,
  },
  relatedCardGradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  relatedCardContent: {},
  relatedCardTitle: {
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  relatedCardLevel: {
    color: '#AADD00',
  },
  bottomSpacing: {},
});

