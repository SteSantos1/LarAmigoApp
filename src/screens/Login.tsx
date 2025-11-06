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

export default function Login() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogin = () => {
    // Validação básica
    if (!formData.email || !formData.password) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }

    // Simulação de login bem-sucedido
    Alert.alert(
      "Login realizado!",
      `Bem-vindo de volta!`,
      [
        {
          text: "OK",
          onPress: () => {
            setFormData({
              email: "",
              password: ""
            });
            navigation.goBack();
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
        <Text style={styles.headerTitle}>Login</Text>
        <View style={styles.headerRight} />
      </View>

      <LinearGradient colors={["#ffffffff", "#b563c5ff"]} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Ionicons name="person-circle" size={60} color="#b563c5ff" />
          <Text style={styles.bannerTitle}>Bem-vindo de Volta!</Text>
          <Text style={styles.bannerSubtitle}>
            Acesse sua conta para acompanhar suas adoções e voluntariados.
          </Text>
        </View>
      </LinearGradient>

      {/* Formulário de Login */}
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-mail</Text>
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
          <Text style={styles.label}>Senha</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Sua senha"
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

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Ionicons name="log-in" size={20} color="#fff" />
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity 
          style={styles.registerButton}
          onPress={() => navigation.navigate('Register' as never)}
        >
          <Ionicons name="person-add" size={20} color="#b563c5ff" />
          <Text style={styles.registerButtonText}>Criar uma conta</Text>
        </TouchableOpacity>
      </View>

      {/* Benefícios da Conta */}
      <View style={styles.benefitsSection}>
        <Text style={styles.sectionTitle}>Com uma conta você pode:</Text>
        
        <View style={styles.benefitItem}>
          <Ionicons name="heart" size={20} color="#b563c5ff" />
          <Text style={styles.benefitText}>Acompanhar processos de adoção</Text>
        </View>

        <View style={styles.benefitItem}>
          <Ionicons name="calendar" size={20} color="#b563c5ff" />
          <Text style={styles.benefitText}>Agendar visitas aos pets</Text>
        </View>

        <View style={styles.benefitItem}>
          <Ionicons name="star" size={20} color="#b563c5ff" />
          <Text style={styles.benefitText}>Salvar seus pets favoritos</Text>
        </View>

        <View style={styles.benefitItem}>
          <Ionicons name="notifications" size={20} color="#b563c5ff" />
          <Text style={styles.benefitText}>Receber notificações personalizadas</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Lar Amigo - Sua conta, nossa comunidade 💜</Text>
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
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#b563c5ff",
    fontSize: 14,
    fontWeight: "600",
  },
  loginButton: {
    flexDirection: "row",
    backgroundColor: "#b563c5ff",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
  },
  loginButtonText: {
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
  registerButton: {
    flexDirection: "row",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#b563c5ff",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  registerButtonText: {
    color: "#b563c5ff",
    fontWeight: "600",
    fontSize: 16,
  },
  benefitsSection: {
    backgroundColor: "#f0e6f5",
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 15,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  benefitText: {
    fontSize: 14,
    color: "#555",
    marginLeft: 10,
    flex: 1,
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