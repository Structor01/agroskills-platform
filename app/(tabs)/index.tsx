import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useApp, useInProgressCourses, useRecommendedCourses } from '@/contexts/AppContext';
import { calculateOverallProgress } from '@/data/progress';

const { width } = Dimensions.get('window');

// Componente de progresso circular
const CircularProgress = ({ progress, size = 120 }: { progress: number; size?: number }) => {
  return (
    <View style={[styles.progressContainer, { width: size, height: size }]}>
      <View style={styles.progressBackground}>
        <View style={[styles.progressFill, { 
          transform: [{ rotate: `${(progress / 100) * 360}deg` }] 
        }]} />
      </View>
      <View style={styles.progressCenter}>
        <Text style={styles.progressText}>{progress}%</Text>
      </View>
    </View>
  );
};

// Componente de card de curso
const CourseCard = ({ course, progress }: { course: any; progress?: any }) => {
  return (
    <TouchableOpacity style={styles.courseCard}>
      <View style={styles.courseImagePlaceholder}>
        <Text style={styles.courseImageText}>📚</Text>
      </View>
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle} numberOfLines={2}>{course.title}</Text>
        <Text style={styles.courseProgress}>
          {progress ? `${progress.progress}% concluído` : course.level}
        </Text>
        <Text style={styles.courseModule}>
          {progress ? `Módulo ${progress.completedModules.length + 1}/${course.modules.length}` : course.duration}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function DashboardScreen() {
  const { currentUser, courses } = useApp();
  const inProgressCourses = useInProgressCourses();
  const recommendedCourses = useRecommendedCourses();
  const overallProgress = currentUser ? calculateOverallProgress(currentUser.id) : 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header com logo */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>AGRO</Text>
            <Text style={styles.logoTextGreen}>SKILLS</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileIcon}>👤</Text>
          </TouchableOpacity>
        </View>

        {/* Saudação */}
        <View style={styles.greetingSection}>
          <Text style={styles.greetingText}>Bom dia, {currentUser?.name || 'Usuário'}</Text>
          <Text style={styles.journeyTitle}>Sua Jornada</Text>
        </View>

        {/* Progresso geral */}
        <View style={styles.progressSection}>
          <CircularProgress progress={overallProgress} />
          <Text style={styles.progressLabel}>Você está avançando bem!</Text>
        </View>

        {/* Continuar de onde parou */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Continuar de onde parou</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {inProgressCourses.map((course) => {
              const progress = currentUser ? 
                course : null; // Simplificado para o mockup
              return (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  progress={{ progress: 65, completedModules: ['1', '2'] }} 
                />
              );
            })}
          </ScrollView>
        </View>

        {/* Recomendações */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recomendado para você</Text>
          
          {recommendedCourses.slice(0, 2).map((course) => (
            <TouchableOpacity key={course.id} style={styles.recommendedCard}>
              <View style={styles.recommendedImagePlaceholder}>
                <Text style={styles.courseImageText}>🎯</Text>
              </View>
              <View style={styles.recommendedInfo}>
                <Text style={styles.recommendedTitle}>{course.title}</Text>
                <Text style={styles.recommendedDescription} numberOfLines={2}>
                  {course.description}
                </Text>
                <View style={styles.recommendedMeta}>
                  <Text style={styles.recommendedLevel}>{course.level}</Text>
                  <Text style={styles.recommendedDuration}>{course.duration}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  logoTextGreen: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#AADD00',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 20,
  },
  greetingSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  greetingText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  journeyTitle: {
    fontSize: 18,
    color: '#666',
  },
  progressSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  progressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressBackground: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    position: 'relative',
    overflow: 'hidden',
  },
  progressFill: {
    width: '50%',
    height: '100%',
    backgroundColor: '#AADD00',
    position: 'absolute',
    right: 0,
    transformOrigin: 'left center',
  },
  progressCenter: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  progressLabel: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  seeAllText: {
    fontSize: 14,
    color: '#AADD00',
    fontWeight: '600',
  },
  horizontalScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  courseCard: {
    width: 200,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseImagePlaceholder: {
    width: '100%',
    height: 100,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  courseImageText: {
    fontSize: 32,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  courseProgress: {
    fontSize: 14,
    color: '#AADD00',
    fontWeight: '600',
    marginBottom: 2,
  },
  courseModule: {
    fontSize: 12,
    color: '#666',
  },
  recommendedCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recommendedImagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  recommendedInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  recommendedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  recommendedDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  recommendedMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recommendedLevel: {
    fontSize: 12,
    color: '#AADD00',
    fontWeight: '600',
  },
  recommendedDuration: {
    fontSize: 12,
    color: '#666',
  },
});

