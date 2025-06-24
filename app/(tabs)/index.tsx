import React from 'react';
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
import { useRouter } from 'expo-router';
import { useApp, useInProgressCourses, useRecommendedCourses } from '@/contexts/AppContext';
import { calculateOverallProgress } from '@/data/progress';
import { useResponsive, getCardWidth, getColumnsForScreen, getResponsivePadding } from '@/hooks/useResponsive';

// Componente de card de curso responsivo
const ResponsiveNetflixCard = ({ course, progress, index }: { course: any; progress?: any; index: number }) => {
  const { width, isDesktop, isTablet, isMobile } = useResponsive();
  const padding = getResponsivePadding(width);
  const router = useRouter();
  
  // Calcular largura do card baseado no tamanho da tela
  const getCardDimensions = () => {
    if (isDesktop) {
      return { width: 280, height: 160 }; // Cards maiores no desktop
    } else if (isTablet) {
      return { width: 240, height: 140 }; // Cards médios no tablet
    } else {
      return { width: 200, height: 120 }; // Cards menores no mobile
    }
  };

  const cardDimensions = getCardDimensions();

  const handlePress = () => {
    router.push(`/course/${course.id}`);
  };

  return (
    <TouchableOpacity 
      style={[styles.netflixCard, cardDimensions, { marginRight: isDesktop ? 16 : 12 }]}
      onPress={handlePress}
    >
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
            <Text style={[styles.cardTitle, { fontSize: isDesktop ? 16 : 14 }]} numberOfLines={2}>
              {course.title}
            </Text>
            {progress && (
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${progress.progress}%` }]} />
                </View>
                <Text style={[styles.progressText, { fontSize: isDesktop ? 12 : 11 }]}>
                  {progress.progress}% concluído
                </Text>
              </View>
            )}
            {!progress && (
              <View style={styles.courseMetadata}>
                <Text style={[styles.courseLevel, { fontSize: isDesktop ? 12 : 11 }]}>{course.level}</Text>
                <Text style={[styles.courseDuration, { fontSize: isDesktop ? 12 : 11 }]}>{course.duration}</Text>
              </View>
            )}
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

// Componente de carrossel responsivo
const ResponsiveCarousel = ({ title, data, showProgress = false }: { 
  title: string; 
  data: any[]; 
  showProgress?: boolean; 
}) => {
  const { width, isDesktop } = useResponsive();
  const padding = getResponsivePadding(width);

  return (
    <View style={[styles.carouselSection, { marginBottom: isDesktop ? 40 : 30 }]}>
      <View style={[styles.carouselHeader, { paddingHorizontal: padding }]}>
        <Text style={[styles.carouselTitle, { fontSize: isDesktop ? 24 : 20 }]}>{title}</Text>
        <TouchableOpacity>
          <Text style={[styles.seeAllText, { fontSize: isDesktop ? 16 : 14 }]}>Ver todos</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={[styles.carouselScroll, { paddingLeft: padding }]}
        contentContainerStyle={[styles.carouselContent, { paddingRight: padding }]}
      >
        {data.map((item, index) => (
          <ResponsiveNetflixCard 
            key={item.id || index} 
            course={item} 
            progress={showProgress ? { progress: 65 } : undefined}
            index={index}
          />
        ))}
      </ScrollView>
    </View>
  );
};

// Componente de hero banner responsivo
const ResponsiveHeroBanner = ({ course }: { course: any }) => {
  const { width, height, isDesktop, isTablet, isMobile } = useResponsive();
  const padding = getResponsivePadding(width);

  // Altura do hero baseada no tamanho da tela
  const heroHeight = isDesktop ? 500 : isTablet ? 400 : 350;

  return (
    <View style={[styles.heroBanner, { height: heroHeight }]}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=400&fit=crop' }}
        style={styles.heroBackground}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
          style={styles.heroGradient}
        >
          <View style={[styles.heroContent, { paddingHorizontal: padding }]}>
            <Text style={[styles.heroCategory, { fontSize: isDesktop ? 16 : 12 }]}>DESTAQUE</Text>
            <Text style={[styles.heroTitle, { 
              fontSize: isDesktop ? 48 : isTablet ? 36 : 28,
              maxWidth: isDesktop ? '60%' : '90%'
            }]}>
              {course.title}
            </Text>
            <Text style={[styles.heroDescription, { 
              fontSize: isDesktop ? 18 : 16,
              maxWidth: isDesktop ? '50%' : '85%'
            }]} numberOfLines={isDesktop ? 4 : 3}>
              {course.description}
            </Text>
            
            <View style={[styles.heroActions, { 
              flexDirection: isDesktop ? 'row' : 'column',
              alignItems: isDesktop ? 'center' : 'stretch',
              gap: isDesktop ? 16 : 12
            }]}>
              <TouchableOpacity style={[styles.playButton, { 
                paddingHorizontal: isDesktop ? 40 : 32,
                paddingVertical: isDesktop ? 16 : 12,
                flex: isDesktop ? 0 : 1
              }]}>
                <Text style={[styles.playButtonText, { fontSize: isDesktop ? 18 : 16 }]}>
                  ▶ Continuar
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.infoButton, { 
                paddingHorizontal: isDesktop ? 32 : 24,
                paddingVertical: isDesktop ? 16 : 12,
                flex: isDesktop ? 0 : 1
              }]}>
                <Text style={[styles.infoButtonText, { fontSize: isDesktop ? 18 : 16 }]}>
                  ℹ Mais informações
                </Text>
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
  const { width, isDesktop, isTablet } = useResponsive();
  const padding = getResponsivePadding(width);

  // Curso em destaque
  const featuredCourse = inProgressCourses[0] || recommendedCourses[0] || courses[0];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header responsivo */}
        <View style={[styles.header, { paddingHorizontal: padding }]}>
          <View style={styles.logoContainer}>
            <Text style={[styles.logoText, { fontSize: isDesktop ? 28 : 24 }]}>AGRO</Text>
            <Text style={[styles.logoTextGreen, { fontSize: isDesktop ? 28 : 24 }]}>SKILLS</Text>
          </View>
          <TouchableOpacity style={[styles.profileButton, { 
            width: isDesktop ? 40 : 32,
            height: isDesktop ? 40 : 32
          }]}>
            <Text style={[styles.profileIcon, { fontSize: isDesktop ? 20 : 16 }]}>👤</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Banner Responsivo */}
        <ResponsiveHeroBanner course={featuredCourse} />

        {/* Carrosséis Responsivos */}
        {inProgressCourses.length > 0 && (
          <ResponsiveCarousel 
            title="Continuar de onde parou" 
            data={inProgressCourses} 
            showProgress={true}
          />
        )}

        <ResponsiveCarousel 
          title="Recomendado para você" 
          data={recommendedCourses} 
        />

        <ResponsiveCarousel 
          title="Tecnologia no Agro" 
          data={courses.filter(c => c.category === 'Tecnologia')} 
        />

        <ResponsiveCarousel 
          title="Gestão e Liderança" 
          data={courses.filter(c => c.category === 'Gestão')} 
        />

        <ResponsiveCarousel 
          title="Sustentabilidade" 
          data={courses.filter(c => c.category === 'Sustentabilidade')} 
        />

        {/* Espaçamento final responsivo */}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'web' ? 40 : 60,
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
    fontWeight: 'bold',
    color: '#fff',
  },
  logoTextGreen: {
    fontWeight: 'bold',
    color: '#AADD00',
  },
  profileButton: {
    borderRadius: 4,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    color: '#fff',
  },
  
  // Hero Banner
  heroBanner: {
    marginBottom: 20,
  },
  heroBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  heroGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  heroContent: {
    maxWidth: '100%',
  },
  heroCategory: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  heroTitle: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  heroDescription: {
    color: '#CCCCCC',
    marginBottom: 24,
    backgroundColor: 'transparent',
  },
  heroActions: {
    width: '100%',
  },
  playButton: {
    backgroundColor: '#fff',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  infoButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    backgroundColor: 'transparent',
  },

  // Carrossel
  carouselSection: {},
  carouselHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  carouselTitle: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: 'transparent',
  },
  seeAllText: {
    color: '#CCCCCC',
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
  carouselScroll: {},
  carouselContent: {},

  // Cards Netflix
  netflixCard: {
    borderRadius: 8,
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
    padding: 12,
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'left',
    backgroundColor: 'transparent',
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
    color: '#CCCCCC',
    backgroundColor: 'transparent',
  },
  courseMetadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  courseLevel: {
    color: '#AADD00',
    fontWeight: '600',
    backgroundColor: 'transparent',
  },
  courseDuration: {
    color: '#CCCCCC',
    backgroundColor: 'transparent',
  },
  bottomSpacing: {},
});

