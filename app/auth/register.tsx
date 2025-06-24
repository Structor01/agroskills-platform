import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useApp } from '@/contexts/AppContext';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    profession: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const router = useRouter();
  const { setCurrentUser } = useApp();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      handleRegister();
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    
    // Simular registro (em produção seria uma chamada à API)
    setTimeout(() => {
      // Criar usuário automaticamente
      setCurrentUser({
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        profession: formData.profession,
        specialization: 'Novo membro',
        experience: 'Iniciando jornada no AgroSkills',
        joinDate: new Date().toISOString(),
        competencies: [],
        achievements: []
      });
      
      setIsLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  };

  const renderStep1 = () => (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Criar conta</Text>
        <Text style={styles.subtitle}>Vamos começar sua jornada!</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            placeholderTextColor="#666"
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#666"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#666"
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirmar senha"
            placeholderTextColor="#666"
            value={formData.confirmPassword}
            onChangeText={(value) => handleInputChange('confirmPassword', value)}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>
      </View>
    </>
  );

  const renderStep2 = () => (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Quase lá!</Text>
        <Text style={styles.subtitle}>Conte-nos sobre sua área</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Profissão (ex: Engenheiro Agrônomo)"
            placeholderTextColor="#666"
            value={formData.profession}
            onChangeText={(value) => handleInputChange('profession', value)}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.professionOptions}>
          <Text style={styles.optionsTitle}>Ou escolha uma opção:</Text>
          
          {[
            'Engenheiro Agrônomo',
            'Zootecnista',
            'Veterinário',
            'Técnico Agrícola',
            'Produtor Rural',
            'Consultor Agro'
          ].map((profession) => (
            <TouchableOpacity
              key={profession}
              style={[
                styles.professionOption,
                formData.profession === profession && styles.professionOptionSelected
              ]}
              onPress={() => handleInputChange('profession', profession)}
            >
              <Text style={[
                styles.professionOptionText,
                formData.profession === profession && styles.professionOptionTextSelected
              ]}>
                {profession}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <LinearGradient
        colors={['#000000', '#1a1a1a', '#000000']}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
          >
            <ScrollView contentContainerStyle={styles.scrollContent}>
              {/* Header */}
              <View style={styles.header}>
                <TouchableOpacity 
                  style={styles.backButton}
                  onPress={() => step > 1 ? setStep(step - 1) : router.back()}
                >
                  <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                
                <View style={styles.logoContainer}>
                  <Text style={styles.logoText}>AGRO</Text>
                  <Text style={styles.logoTextGreen}>SKILLS</Text>
                </View>
              </View>

              {/* Progress indicator */}
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${(step / 2) * 100}%` }]} />
                </View>
                <Text style={styles.progressText}>Passo {step} de 2</Text>
              </View>

              {/* Conteúdo do step */}
              {step === 1 ? renderStep1() : renderStep2()}

              {/* Botão de ação */}
              <TouchableOpacity 
                style={[styles.actionButton, isLoading && styles.actionButtonDisabled]}
                onPress={handleNextStep}
                disabled={isLoading}
              >
                <Text style={styles.actionButtonText}>
                  {isLoading ? 'Criando conta...' : step === 1 ? 'Continuar' : 'Criar conta'}
                </Text>
              </TouchableOpacity>

              {/* Footer */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>Já tem uma conta? </Text>
                <TouchableOpacity onPress={() => router.push('/auth/login')}>
                  <Text style={styles.footerLink}>Entrar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 40,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  logoTextGreen: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#AADD00',
    letterSpacing: 1,
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#AADD00',
    borderRadius: 2,
  },
  progressText: {
    color: '#ccc',
    fontSize: 12,
    textAlign: 'center',
  },
  titleContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#444',
  },
  professionOptions: {
    marginTop: 20,
  },
  optionsTitle: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 16,
    fontWeight: '500',
  },
  professionOption: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#444',
    marginBottom: 12,
  },
  professionOptionSelected: {
    borderColor: '#AADD00',
    backgroundColor: 'rgba(170, 221, 0, 0.1)',
  },
  professionOptionText: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
  },
  professionOptionTextSelected: {
    color: '#AADD00',
    fontWeight: '600',
  },
  actionButton: {
    backgroundColor: '#AADD00',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  actionButtonDisabled: {
    opacity: 0.6,
  },
  actionButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  footerText: {
    color: '#ccc',
    fontSize: 14,
  },
  footerLink: {
    color: '#AADD00',
    fontSize: 14,
    fontWeight: '600',
  },
});

