import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useApp } from '@/contexts/AppContext';
import { useResponsive, getResponsivePadding } from '@/hooks/useResponsive';

// Componente de estrelas para avaliação
const StarRating = ({ rating, reviews }: { rating: number; reviews: number }) => {
  const { isDesktop } = useResponsive();
  const stars = [];
  
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Text 
        key={i} 
        style={[styles.star, { 
          color: i <= Math.floor(rating) ? '#4CAF50' : '#E0E0E0',
          fontSize: isDesktop ? 18 : 16 
        }]}
      >
        ★
      </Text>
    );
  }
  
  return (
    <View style={styles.ratingContainer}>
      <View style={styles.starsContainer}>
        {stars}
      </View>
      <Text style={[styles.ratingText, { fontSize: isDesktop ? 16 : 14 }]}>
        {rating} ({reviews} avaliações)
      </Text>
    </View>
  );
};

// Componente de métrica
const MetricItem = ({ icon, value, label }: { icon: string; value: string; label: string }) => {
  const { isDesktop } = useResponsive();
  
  return (
    <View style={styles.metricItem}>
      {icon && (
        <Text style={[styles.metricIcon, { fontSize: isDesktop ? 18 : 16 }]}>{icon}</Text>
      )}
      <View style={styles.metricContent}>
        <Text style={[styles.metricValue, { fontSize: isDesktop ? 16 : 14 }]}>{value}</Text>
        {label && (
          <Text style={[styles.metricLabel, { fontSize: isDesktop ? 14 : 12 }]}>{label}</Text>
        )}
      </View>
    </View>
  );
};

// Componente de item com checkmark
const ChecklistItem = ({ text }: { text: string }) => {
  const { isDesktop } = useResponsive();
  
  return (
    <View style={styles.checklistItem}>
      <View style={styles.checkmark}>
        <Text style={styles.checkmarkIcon}>✓</Text>
      </View>
      <Text style={[styles.checklistText, { fontSize: isDesktop ? 16 : 14 }]}>
        {text}
      </Text>
    </View>
  );
};

// Componente de módulo do curso
const ModuleItem = ({ number, title }: { number: number; title: string }) => {
  const { isDesktop } = useResponsive();
  
  return (
    <View style={styles.moduleItem}>
      <Text style={[styles.moduleNumber, { fontSize: isDesktop ? 16 : 14 }]}>
        {number}
      </Text>
      <Text style={[styles.moduleTitle, { fontSize: isDesktop ? 16 : 14 }]}>
        {title}
      </Text>
    </View>
  );
};

export default function CourseDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { courses } = useApp();
  const [selectedTab, setSelectedTab] = useState('sobre');
  const { width, isDesktop, isTablet } = useResponsive();
  const padding = getResponsivePadding(width);

  // Encontrar o curso pelo ID
  const course = courses.find(c => c.id === id) || courses[0];
  
  // Dados do curso baseados no mockup
  const courseData = {
    category: 'Intermediário',
    title: 'Tecnologias Emergentes no Agro',
    subtitle: 'Domine as tecnologias que estão transformando o agronegócio',
    duration: '3h 20min',
    students: '2.8k alunos',
    level: 'Intermediário',
    rating: 4.8,
    reviews: 342,
    benefits: [
      'Deseja se manter atualizado sobre as últimas tecnologias do agro',
      'Busca implementar soluções inovadoras em sua operação',
      'Quer se destacar no mercado com conhecimentos avançados',
      'Precisa tomar decisões baseadas em dados e tecnologia'
    ],
    description: 'Este curso abrange as principais tecnologias emergentes que estão transformando o agronegócio, desde IoT e sensores até inteligência artificial e blockchain aplicados à cadeia produtiva.',
    modules: [
      'Introdução às Tecnologias no Agro',
      'Internet das Coisas (IoT) e Sensores',
      'Inteligência Artificial no Campo',
      'Blockchain e Rastreabilidade',
      'Implementação e Casos de Sucesso'
    ],
    instructor: {
      name: 'Dr. Ricardo Oliveira',
      title: 'Especialista em Tecnologia Agrícola'
    }
  };

  const tabs = [
    { id: 'sobre', label: 'Sobre' },
    { id: 'conteudo', label: 'Conteúdo' },
    { id: 'avaliacoes', label: 'Avaliações' }
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header minimalista */}
        <View style={[styles.header, { paddingHorizontal: padding }]}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={[styles.backIcon, { fontSize: isDesktop ? 24 : 20 }]}>←</Text>
          </TouchableOpacity>
          
          <View style={styles.categoryBadge}>
            <Text style={[styles.categoryText, { fontSize: isDesktop ? 14 : 12 }]}>
              {courseData.category}
            </Text>
          </View>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Título e descrição */}
          <View style={[styles.titleSection, { paddingHorizontal: padding }]}>
            <Text style={[styles.title, { fontSize: isDesktop ? 32 : 28 }]}>
              {courseData.title}
            </Text>
            <Text style={[styles.subtitle, { fontSize: isDesktop ? 18 : 16 }]}>
              {courseData.description}
            </Text>
          </View>

          {/* Métricas */}
          <View style={[styles.metricsSection, { paddingHorizontal: padding }]}>
            <MetricItem icon="" value="3h" label="20min" />
            <MetricItem icon="" value="2.8k" label="alunos" />
            <MetricItem icon="" value="Intermediário" label="" />
          </View>

          {/* Avaliação */}
          <View style={[styles.ratingSection, { paddingHorizontal: padding }]}>
            <StarRating rating={courseData.rating} reviews={courseData.reviews} />
          </View>

          {/* Tabs */}
          <View style={[styles.tabsContainer, { paddingHorizontal: padding }]}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tab,
                  selectedTab === tab.id && styles.tabActive
                ]}
                onPress={() => setSelectedTab(tab.id)}
              >
                <Text style={[
                  styles.tabText,
                  selectedTab === tab.id && styles.tabTextActive,
                  { fontSize: isDesktop ? 16 : 14 }
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Conteúdo das tabs */}
          <View style={[styles.tabContent, { paddingHorizontal: padding }]}>
            {selectedTab === 'sobre' && (
              <View style={styles.aboutTab}>
                {/* Este produto é para você se... */}
                <View style={styles.section}>
                  <Text style={[styles.sectionTitle, { fontSize: isDesktop ? 20 : 18 }]}>
                    Este produto é para você se...
                  </Text>
                  {courseData.benefits.map((benefit, index) => (
                    <ChecklistItem key={index} text={benefit} />
                  ))}
                </View>

                {/* O que você vai aprender */}
                <View style={styles.section}>
                  <Text style={[styles.sectionTitle, { fontSize: isDesktop ? 20 : 18 }]}>
                    O que você vai aprender
                  </Text>
                  <Text style={[styles.description, { fontSize: isDesktop ? 16 : 14 }]}>
                    {courseData.description}
                  </Text>
                </View>

                {/* Instrutor */}
                <View style={styles.section}>
                  <Text style={[styles.sectionTitle, { fontSize: isDesktop ? 20 : 18 }]}>
                    Instrutor
                  </Text>
                  <View style={styles.instructorInfo}>
                    <View style={styles.instructorAvatar}>
                      <Text style={[styles.instructorInitials, { fontSize: isDesktop ? 20 : 18 }]}>
                        DR
                      </Text>
                    </View>
                    <View style={styles.instructorDetails}>
                      <Text style={[styles.instructorName, { fontSize: isDesktop ? 18 : 16 }]}>
                        {courseData.instructor.name}
                      </Text>
                      <Text style={[styles.instructorTitle, { fontSize: isDesktop ? 14 : 12 }]}>
                        {courseData.instructor.title}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}

            {selectedTab === 'conteudo' && (
              <View style={styles.contentTab}>
                <Text style={[styles.sectionTitle, { fontSize: isDesktop ? 20 : 18 }]}>
                  Módulos do curso
                </Text>
                {courseData.modules.map((module, index) => (
                  <ModuleItem key={index} number={index + 1} title={module} />
                ))}
              </View>
            )}

            {selectedTab === 'avaliacoes' && (
              <View style={styles.reviewsTab}>
                <Text style={[styles.sectionTitle, { fontSize: isDesktop ? 20 : 18 }]}>
                  Avaliações dos alunos
                </Text>
                <Text style={[styles.description, { fontSize: isDesktop ? 16 : 14 }]}>
                  Em breve você poderá ver as avaliações detalhadas dos alunos que já fizeram este curso.
                </Text>
              </View>
            )}
          </View>

          {/* Botão de ação */}
          <View style={[styles.actionSection, { paddingHorizontal: padding }]}>
            <TouchableOpacity style={styles.startButton}>
              <Text style={[styles.startButtonText, { fontSize: isDesktop ? 18 : 16 }]}>
                Começar Agora
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.bottomSpacing, { height: isDesktop ? 120 : 100 }]} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingTop: Platform.OS === 'web' ? 20 : 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    color: '#333333',
    fontWeight: '300',
  },
  categoryBadge: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    color: '#666666',
    fontWeight: '500',
  },

  // Conteúdo
  content: {
    flex: 1,
  },
  titleSection: {
    paddingVertical: 24,
  },
  title: {
    fontWeight: '700',
    color: '#1A1A1A',
    lineHeight: 1.2,
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  subtitle: {
    color: '#666666',
    lineHeight: 1.4,
    backgroundColor: 'transparent',
    fontWeight: '400',
  },

  // Métricas
  metricsSection: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  metricIcon: {
    marginRight: 8,
  },
  metricContent: {
    alignItems: 'flex-start',
  },
  metricValue: {
    fontWeight: '600',
    color: '#1A1A1A',
    backgroundColor: 'transparent',
  },
  metricLabel: {
    color: '#666666',
    fontWeight: '400',
    backgroundColor: 'transparent',
  },

  // Avaliação
  ratingSection: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  star: {
    marginRight: 2,
  },  ratingText: {
    color: '#666666',
    fontWeight: '400',
    backgroundColor: 'transparent',
  },

  // Tabs
  tabsContainer: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 24,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#AADD00',
  },
  tabText: {
    color: '#666666',
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
  tabTextActive: {
    color: '#1A1A1A',
    fontWeight: '600',
    backgroundColor: 'transparent',
  },

  // Conteúdo das tabs
  tabContent: {
    paddingTop: 24,
  },
  aboutTab: {},
  contentTab: {},
  reviewsTab: {},
  
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  description: {
    color: '#333333',
    lineHeight: 1.6,
    backgroundColor: 'transparent',
    fontWeight: '400',
  },

  // Checklist
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkmarkIcon: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  checklistText: {
    flex: 1,
    color: '#333333',
    lineHeight: 1.5,
    fontWeight: '400',
    backgroundColor: 'transparent',
  },

  // Módulos
  moduleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F8F8',
  },
  moduleNumber: {
    fontWeight: '600',
    color: '#666666',
    marginRight: 12,
    minWidth: 20,
    backgroundColor: 'transparent',
  },
  moduleTitle: {
    flex: 1,
    color: '#333333',
    fontWeight: '500',
    backgroundColor: 'transparent',
  },

  // Instrutor
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
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: 'transparent',
  },
  instructorDetails: {},
  instructorName: {
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
    backgroundColor: 'transparent',
  },
  instructorTitle: {
    color: '#666666',
    fontWeight: '400',
    backgroundColor: 'transparent',
  },

  // Botão de ação
  actionSection: {
    paddingVertical: 32,
  },
  startButton: {
    backgroundColor: '#AADD00',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    color: '#1A1A1A',
    fontWeight: '700',
    backgroundColor: 'transparent',
  },
  
  bottomSpacing: {},
});

