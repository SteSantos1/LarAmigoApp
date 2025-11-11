import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Alert
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Register() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  // Função específica para validar o telefone
  const handlePhoneChange = (value: string) => {
    // Remove tudo que não é número
    let cleaned = value.replace(/\D/g, '');
    
    // LIMITA A 11 DÍGITOS
    cleaned = cleaned.substring(0, 11);
    
    // Aplica a máscara: (41) 99999-9999
    let formatted = cleaned;
    if (cleaned.length > 0) {
        formatted = `(${cleaned.substring(0, 2)}`;
        if (cleaned.length > 2) {
            formatted += `) ${cleaned.substring(2, 7)}`;
            if (cleaned.length > 7) {
                formatted += `-${cleaned.substring(7)}`;
            }
        }
    }
    
    setFormData(prev => ({
        ...prev,
        phone: formatted
    }));
    
    // Validação em tempo real
    if (cleaned.length === 11) {
        setPhoneError("");
    } else if (cleaned.length > 0) {
        setPhoneError(`Digite 11 dígitos (${cleaned.length}/11)`);
    } else {
        setPhoneError("");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegister = () => {
    // Remove caracteres não numéricos para validar
    const phoneDigits = formData.phone.replace(/\D/g, '');
    
    // Valida se tem exatamente 11 dígitos
    if (phoneDigits.length !== 11) {
        Alert.alert("Atenção", "O telefone deve conter 11 dígitos (DDD + número). Ex: 41999999999");
        return;
    }

    // Validação básica
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Atenção", "As senhas não coincidem.");
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert("Atenção", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    // Simulação de cadastro bem-sucedido
    Alert.alert(
      "Cadastro realizado!",
      `Bem-vindo(a) ${formData.name}! Sua conta foi criada com sucesso.`,
      [
        {
          text: "OK",
          onPress: () => {
            setFormData({
              name: "",
              email: "",
              phone: "",
              password: "",
              confirmPassword: ""
            });
            setPhoneError("");
            navigation.navigate('Login' as never);
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Criar Conta</Text>
        <View style={styles.headerRight} />
      </View>

      <LinearGradient colors={["#ffffffff", "#b563c5ff"]} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Ionicons name="person-add" size={60} color="#b563c5ff" />
          <Text style={styles.bannerTitle}>Junte-se a Nós!</Text>
          <Text style={styles.bannerSubtitle}>
            Crie sua conta e faça parte da comunidade Lar Amigo.
          </Text>
        </View>
      </LinearGradient>

      {/* Formulário de Cadastro */}
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome Completo *</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome completo"
            value={formData.name}
            onChangeText={(value) => handleInputChange("name", value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-mail *</Text>
          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(value) => handleInputChange("email", value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Telefone *</Text>
          <TextInput
            style={[styles.input, phoneError ? styles.inputError : null]}
            placeholder="(41) 99999-9999"
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={handlePhoneChange}
            maxLength={15}
          />
          {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha *</Text>
          <View style={[styles.passwordContainer, phoneError ? styles.inputError : null]}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Mínimo 6 caracteres"
              secureTextEntry={!showPassword}
              value={formData.password}
              onChangeText={(value) => handleInputChange("password", value)}
            />
            <TouchableOpacity 
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons 
                name={showPassword ? "eye-off" : "eye"} 
                size={20} 
                color="#666" 
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirmar Senha *</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Digite a senha novamente"
              secureTextEntry={!showConfirmPassword}
              value={formData.confirmPassword}
              onChangeText={(value) => handleInputChange("confirmPassword", value)}
            />
            <TouchableOpacity 
              style={styles.eyeButton}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons 
                name={showConfirmPassword ? "eye-off" : "eye"} 
                size={20} 
                color="#666" 
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Ionicons name="person-add" size={20} color="#fff" />
          <Text style={styles.registerButtonText}>Criar Conta</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login' as never)}
        >
          <Ionicons name="log-in" size={20} color="#b563c5ff" />
          <Text style={styles.loginButtonText}>Fazer Login</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          Ao criar uma conta, você concorda com nossos{' '}
          <Text style={styles.termsLink}>Termos de Uso</Text> e{' '}
          <Text style={styles.termsLink}>Política de Privacidade</Text>.
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Lar Amigo - Uma comunidade de amor aos animais 💜</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#debcebff",
  },
  header: {
    marginTop: 40,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  headerRight: {
    width: 40,
  },
  banner: {
    borderRadius: 16,
    margin: 20,
    padding: 30,
    alignItems: "center",
  },
  bannerContent: {
    alignItems: "center",
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginTop: 10,
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    lineHeight: 20,
  },
  formContainer: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  eyeButton: {
    padding: 12,
  },
  registerButton: {
    flexDirection: "row",
    backgroundColor: "#b563c5ff",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  dividerText: {
    marginHorizontal: 15,
    color: "#666",
    fontSize: 14,
  },
  loginButton: {
    flexDirection: "row",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#b563c5ff",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 15,
  },
  loginButtonText: {
    color: "#b563c5ff",
    fontWeight: "600",
    fontSize: 16,
  },
  termsText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    lineHeight: 16,
  },
  termsLink: {
    color: "#b563c5ff",
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 12,
    color: "#777",
    textAlign: "center",
  },
});