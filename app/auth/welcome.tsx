import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Background com gradiente */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=1200&fit=crop' }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
          style={styles.gradient}
        >
          <SafeAreaView style={styles.safeArea}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>AGRO</Text>
              <Text style={styles.logoTextGreen}>SKILLS</Text>
            </View>

            {/* Conteúdo principal */}
            <View style={styles.content}>
              <Text style={styles.title}>Acelere sua carreira no Agro</Text>
              <Text style={styles.subtitle}>
                Desenvolvimento personalizado para profissionais do agronegócio
              </Text>
              
              <View style={styles.features}>
                <View style={styles.feature}>
                  <Text style={styles.featureIcon}>🚀</Text>
                  <Text style={styles.featureText}>Cursos especializados</Text>
                </View>
                <View style={styles.feature}>
                  <Text style={styles.featureIcon}>📊</Text>
                  <Text style={styles.featureText}>Acompanhe seu progresso</Text>
                </View>
                <View style={styles.feature}>
                  <Text style={styles.featureIcon}>🏆</Text>
                  <Text style={styles.featureText}>Conquiste certificações</Text>
                </View>
              </View>
            </View>

            {/* Botões de ação */}
            <View style={styles.actionContainer}>
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={() => router.push('/auth/register')}
              >
                <Text style={styles.primaryButtonText}>Começar Jornada</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={() => router.push('/auth/login')}
              >
                <Text style={styles.secondaryButtonText}>Já tenho conta</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  logoTextGreen: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#AADD00',
    letterSpacing: 2,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 56,
  },
  subtitle: {
    fontSize: 18,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  features: {
    width: '100%',
    marginTop: 20,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  featureText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  actionContainer: {
    paddingBottom: 40,
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#AADD00',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff',
    width: '100%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

