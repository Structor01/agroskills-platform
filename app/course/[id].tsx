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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useApp } from '@/contexts/AppContext';

const { width, height } = Dimensions.get('window');

// Componente de módulo/episódio
const ModuleItem = ({ module, index, isCompleted }: { module: any; index: number; isCompleted: boolean }) => {
  return (
    <TouchableOpacity style={styles.moduleItem}>
      <View style={styles.moduleNumber}>
        <Text style={styles.moduleNumberText}>{index + 1}</Text>
      </View>
      
      <View style={styles.moduleContent}>
        <Text style={styles.moduleTitle}>{module.title}</Text>
        <Text style={styles.moduleDescription} numberOfLines={2}>
          {module.description}
        </Text>
        <Text style={styles.moduleDuration}>{module.duration}</Text>
      </View>
      
      <View style={styles.moduleStatus}>
        {isCompleted ? (
          <Text style={styles.completedIcon}>✓</Text>
        ) : (
          <Text style={styles.playIcon}>▶</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

// Componente de curso relacionado
const RelatedCourseCard = ({ course }: { course: any }) => {
  return (
    <TouchableOpacity style={styles.relatedCard}>
      <ImageBackground
        source={{ uri: `https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=300&h=200&fit=crop` }}
        style={styles.relatedCardBackground}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.relatedCardGradient}
        >
          <View style={styles.relatedCardContent}>
            <Text style={styles.relatedCardTitle} numberOfLines={2}>{course.title}</Text>
            <Text style={styles.relatedCardLevel}>{course.level}</Text>
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

  const relatedCourses = courses.filter(c => c.id !== course.id).slice(0, 3);
  const completedModules = ['1', '2']; // Simulado

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
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
              <SafeAreaView style={styles.headerContainer}>
                <TouchableOpacity 
                  style={styles.backButton}
                  onPress={() => router.back()}
                >
                  <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
              </SafeAreaView>

              {/* Hero Content */}
              <View style={styles.heroContent}>
                <Text style={styles.courseCategory}>{course.category}</Text>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseDescription}>{course.description}</Text>
                
                <View style={styles.courseMetadata}>
                  <Text style={styles.metadataItem}>⭐ {course.level}</Text>
                  <Text style={styles.metadataItem}>🕒 {course.duration}</Text>
                  <Text style={styles.metadataItem}>📚 {courseModules.length} módulos</Text>
                </View>

                <View style={styles.heroActions}>
                  <TouchableOpacity style={styles.playButton}>
                    <Text style={styles.playButtonText}>▶ Começar curso</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>+ Minha lista</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'episodes' && styles.tabActive]}
            onPress={() => setSelectedTab('episodes')}
          >
            <Text style={[styles.tabText, selectedTab === 'episodes' && styles.tabTextActive]}>
              Módulos
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'details' && styles.tabActive]}
            onPress={() => setSelectedTab('details')}
          >
            <Text style={[styles.tabText, selectedTab === 'details' && styles.tabTextActive]}>
              Detalhes
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'related' && styles.tabActive]}
            onPress={() => setSelectedTab('related')}
          >
            <Text style={[styles.tabText, selectedTab === 'related' && styles.tabTextActive]}>
              Relacionados
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {selectedTab === 'episodes' && (
            <View style={styles.episodesTab}>
              <Text style={styles.sectionTitle}>Módulos do curso</Text>
              {courseModules.map((module, index) => (
                <ModuleItem
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
              <Text style={styles.sectionTitle}>Sobre este curso</Text>
              <Text style={styles.detailsText}>
                Este curso abrangente explora as tecnologias emergentes que estão transformando 
                o setor agrícola. Você aprenderá sobre IoT, inteligência artificial, drones e 
                outras inovações que estão revolucionando a agricultura moderna.
              </Text>
              
              <Text style={styles.subsectionTitle}>O que você vai aprender</Text>
              <View style={styles.learningPoints}>
                <Text style={styles.learningPoint}>• Fundamentos das tecnologias emergentes no agro</Text>
                <Text style={styles.learningPoint}>• Implementação prática de IoT na agricultura</Text>
                <Text style={styles.learningPoint}>• Aplicações de IA para otimização de processos</Text>
                <Text style={styles.learningPoint}>• Uso de drones para agricultura de precisão</Text>
              </View>

              <Text style={styles.subsectionTitle}>Instrutor</Text>
              <View style={styles.instructorInfo}>
                <View style={styles.instructorAvatar}>
                  <Text style={styles.instructorInitials}>DR</Text>
                </View>
                <View style={styles.instructorDetails}>
                  <Text style={styles.instructorName}>Dr. Roberto Silva</Text>
                  <Text style={styles.instructorTitle}>Especialista em Tecnologia Agrícola</Text>
                </View>
              </View>
            </View>
          )}

          {selectedTab === 'related' && (
            <View style={styles.relatedTab}>
              <Text style={styles.sectionTitle}>Cursos relacionados</Text>
              <View style={styles.relatedGrid}>
                {relatedCourses.map((relatedCourse) => (
                  <RelatedCourseCard key={relatedCourse.id} course={relatedCourse} />
                ))}
              </View>
            </View>
          )}
        </View>

        <View style={styles.bottomSpacing} />
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
  heroSection: {
    height: height * 0.6,
  },
  heroBackground: {
    flex: 1,
  },
  heroGradient: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  heroContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  courseCategory: {
    fontSize: 14,
    color: '#AADD00',
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 8,
  },
  courseTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    lineHeight: 32,
  },
  courseDescription: {
    fontSize: 16,
    color: '#ccc',
    lineHeight: 22,
    marginBottom: 16,
  },
  courseMetadata: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  metadataItem: {
    fontSize: 14,
    color: '#ccc',
    marginRight: 16,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 12,
  },
  playButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
  },
  playButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Tabs
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 16,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#AADD00',
  },
  tabText: {
    fontSize: 16,
    color: '#ccc',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // Tab Content
  tabContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },

  // Episodes Tab
  episodesTab: {},
  moduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  moduleNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  moduleNumberText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  moduleContent: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  moduleDescription: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 4,
  },
  moduleDuration: {
    fontSize: 12,
    color: '#AADD00',
  },
  moduleStatus: {
    width: 40,
    alignItems: 'center',
  },
  completedIcon: {
    fontSize: 20,
    color: '#AADD00',
  },
  playIcon: {
    fontSize: 16,
    color: '#ccc',
  },

  // Details Tab
  detailsTab: {},
  detailsText: {
    fontSize: 16,
    color: '#ccc',
    lineHeight: 24,
    marginBottom: 24,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  learningPoints: {
    marginBottom: 24,
  },
  learningPoint: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 8,
    lineHeight: 20,
  },
  instructorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#AADD00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  instructorInitials: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  instructorDetails: {},
  instructorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  instructorTitle: {
    fontSize: 14,
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
    width: (width - 60) / 2,
    height: 120,
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
  relatedCardContent: {
    padding: 12,
  },
  relatedCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  relatedCardLevel: {
    fontSize: 12,
    color: '#AADD00',
  },
  bottomSpacing: {
    height: 100,
  },
});

