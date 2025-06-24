import React from 'react';
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
import { useApp, useInProgressCourses, useRecommendedCourses } from '@/contexts/AppContext';
import { calculateOverallProgress } from '@/data/progress';

const { width } = Dimensions.get('window');

// Componente de card de curso estilo Netflix
const NetflixCourseCard = ({ course, progress, size = 'medium' }: { course: any; progress?: any; size?: 'small' | 'medium' | 'large' }) => {
  const cardWidth = size === 'large' ? width * 0.8 : size === 'medium' ? width * 0.6 : width * 0.4;
  const cardHeight = size === 'large' ? 200 : size === 'medium' ? 160 : 120;

  return (
    <TouchableOpacity style={[styles.netflixCard, { width: cardWidth, height: cardHeight }]}>
      <ImageBackground
        source={{ uri: `https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop&crop=center` }}
        style={styles.cardBackground}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.cardGradient}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle} numberOfLines={2}>{course.title}</Text>
            {progress && (
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${progress.progress}%` }]} />
                </View>
                <Text style={styles.progressText}>{progress.progress}% concluído</Text>
              </View>
            )}
            {!progress && (
              <View style={styles.courseMetadata}>
                <Text style={styles.courseLevel}>{course.level}</Text>
                <Text style={styles.courseDuration}>{course.duration}</Text>
              </View>
            )}
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

// Componente de carrossel horizontal
const NetflixCarousel = ({ title, data, showProgress = false, size = 'medium' }: { 
  title: string; 
  data: any[]; 
  showProgress?: boolean; 
  size?: 'small' | 'medium' | 'large' 
}) => {
  return (
    <View style={styles.carouselSection}>
      <View style={styles.carouselHeader}>
        <Text style={styles.carouselTitle}>{title}</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>Ver todos</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.carouselScroll}
        contentContainerStyle={styles.carouselContent}
      >
        {data.map((item, index) => (
          <NetflixCourseCard 
            key={item.id || index} 
            course={item} 
            progress={showProgress ? { progress: 65 } : undefined}
            size={size}
          />
        ))}
      </ScrollView>
    </View>
  );
};

// Componente de hero banner principal
const HeroBanner = ({ course }: { course: any }) => {
  return (
    <View style={styles.heroBanner}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=400&fit=crop' }}
        style={styles.heroBackground}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
          style={styles.heroGradient}
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroCategory}>DESTAQUE</Text>
            <Text style={styles.heroTitle}>{course.title}</Text>
            <Text style={styles.heroDescription} numberOfLines={3}>
              {course.description}
            </Text>
            
            <View style={styles.heroActions}>
              <TouchableOpacity style={styles.playButton}>
                <Text style={styles.playButtonText}>▶ Continuar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.infoButton}>
                <Text style={styles.infoButtonText}>ℹ Mais informações</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default function DashboardScreen() {
  const { currentUser, courses } = useApp();
  const inProgressCourses = useInProgressCourses();
  const recommendedCourses = useRecommendedCourses();
  const overallProgress = currentUser ? calculateOverallProgress(currentUser.id) : 0;

  // Curso em destaque (primeiro curso em progresso ou recomendado)
  const featuredCourse = inProgressCourses[0] || recommendedCourses[0] || courses[0];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header minimalista */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>AGRO</Text>
            <Text style={styles.logoTextGreen}>SKILLS</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileIcon}>👤</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Banner */}
        <HeroBanner course={featuredCourse} />

        {/* Continuar assistindo */}
        {inProgressCourses.length > 0 && (
          <NetflixCarousel 
            title="Continuar de onde parou" 
            data={inProgressCourses} 
            showProgress={true}
            size="large"
          />
        )}

        {/* Recomendados para você */}
        <NetflixCarousel 
          title="Recomendado para você" 
          data={recommendedCourses} 
          size="medium"
        />

        {/* Tecnologia no Agro */}
        <NetflixCarousel 
          title="Tecnologia no Agro" 
          data={courses.filter(c => c.category === 'Tecnologia')} 
          size="medium"
        />

        {/* Gestão e Liderança */}
        <NetflixCarousel 
          title="Gestão e Liderança" 
          data={courses.filter(c => c.category === 'Gestão')} 
          size="medium"
        />

        {/* Sustentabilidade */}
        <NetflixCarousel 
          title="Sustentabilidade" 
          data={courses.filter(c => c.category === 'Sustentabilidade')} 
          size="medium"
        />

        {/* Espaçamento final */}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoTextGreen: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#AADD00',
  },
  profileButton: {
    width: 32,
    height: 32,
    borderRadius: 4,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 16,
    color: '#fff',
  },
  
  // Hero Banner
  heroBanner: {
    height: 400,
    marginBottom: 20,
  },
  heroBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  heroGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  heroContent: {
    maxWidth: '80%',
  },
  heroCategory: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    lineHeight: 36,
  },
  heroDescription: {
    fontSize: 16,
    color: '#ccc',
    lineHeight: 22,
    marginBottom: 24,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 12,
  },
  playButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Carrossel
  carouselSection: {
    marginBottom: 30,
  },
  carouselHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  carouselTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  seeAllText: {
    fontSize: 14,
    color: '#ccc',
    fontWeight: '500',
  },
  carouselScroll: {
    paddingLeft: 20,
  },
  carouselContent: {
    paddingRight: 20,
  },

  // Cards Netflix
  netflixCard: {
    borderRadius: 8,
    marginRight: 12,
    overflow: 'hidden',
    backgroundColor: '#222',
  },
  cardBackground: {
    flex: 1,
  },
  cardGradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    lineHeight: 20,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#AADD00',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#ccc',
  },
  courseMetadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  courseLevel: {
    fontSize: 12,
    color: '#AADD00',
    fontWeight: '600',
  },
  courseDuration: {
    fontSize: 12,
    color: '#ccc',
  },
  bottomSpacing: {
    height: 100,
  },
});

