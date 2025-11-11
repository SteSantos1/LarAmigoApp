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

export default function TemporaryHome() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    experience: "",
    homeType: "",
    hasOtherPets: "",
    otherPetsInfo: "",
    timeAvailable: "",
    petPreferences: "",
    whyTemporaryHome: ""
  });
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

  const handleSubmit = () => {
    // Remove caracteres não numéricos para validar
    const phoneDigits = formData.phone.replace(/\D/g, '');
    
    // Valida se tem exatamente 11 dígitos
    if (phoneDigits.length !== 11) {
        Alert.alert("Atenção", "O telefone deve conter 11 dígitos (DDD + número). Ex: 41999999999");
        return;
    }

    // Validação básica
    if (!formData.name || !formData.email || !formData.phone) {
      Alert.alert("Atenção", "Por favor, preencha pelo menos nome, e-mail e telefone.");
      return;
    }

    Alert.alert(
      "Inscrição Enviada!",
      `Obrigado ${formData.name}! Sua inscrição para lar temporário foi recebida. Entraremos em contato em até 48 horas para conversarmos mais.`,
      [
        {
          text: "OK",
          onPress: () => {
            setFormData({
              name: "",
              email: "",
              phone: "",
              address: "",
              experience: "",
              homeType: "",
              hasOtherPets: "",
              otherPetsInfo: "",
              timeAvailable: "",
              petPreferences: "",
              whyTemporaryHome: ""
            });
            setPhoneError("");
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
        <Text style={styles.headerTitle}>Lar Temporário</Text>
        <View style={styles.headerRight} />
      </View>

      <LinearGradient colors={["#ffffffff", "#b563c5ff"]} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Ionicons name="home" size={50} color="#b563c5ff" />
          <Text style={styles.bannerTitle}>Seja um Lar Temporário</Text>
          <Text style={styles.bannerSubtitle}>
            Ofereça um lar seguro e amoroso para um pet enquanto ele espera por uma adoção definitiva.
          </Text>
        </View>
      </LinearGradient>

      {/* Benefícios */}
      <View style={styles.benefitsSection}>
        <Text style={styles.sectionTitle}>Como Funciona?</Text>
        
        <View style={styles.benefitItem}>
          <Ionicons name="shield-checkmark" size={24} color="#b563c5ff" />
          <View style={styles.benefitText}>
            <Text style={styles.benefitTitle}>Suporte Total</Text>
            <Text style={styles.benefitDescription}>
              Fornecemos ração, medicamentos e todo suporte veterinário necessário
            </Text>
          </View>
        </View>

        <View style={styles.benefitItem}>
          <Ionicons name="calendar" size={24} color="#b563c5ff" />
          <View style={styles.benefitText}>
            <Text style={styles.benefitTitle}>Tempo Flexível</Text>
            <Text style={styles.benefitDescription}>
              Você escolhe por quanto tempo pode acolher o pet (semanas ou meses)
            </Text>
          </View>
        </View>

        <View style={styles.benefitItem}>
          <Ionicons name="heart" size={24} color="#b563c5ff" />
          <View style={styles.benefitText}>
            <Text style={styles.benefitTitle}>Salve Vidas</Text>
            <Text style={styles.benefitDescription}>
              Cada lar temporário libera espaço para resgatar mais animais necessitados
            </Text>
          </View>
        </View>
      </View>

      {/* Formulário de Inscrição */}
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Formulário de Inscrição</Text>
        
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
          <Text style={styles.label}>Endereço Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Rua, número, bairro, cidade"
            value={formData.address}
            onChangeText={(value) => handleInputChange("address", value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tipo de Residência</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Casa, apartamento, sítio..."
            value={formData.homeType}
            onChangeText={(value) => handleInputChange("homeType", value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Experiência com Pets</Text>
          <TextInput
            style={styles.input}
            placeholder="Conte sua experiência anterior com animais"
            value={formData.experience}
            onChangeText={(value) => handleInputChange("experience", value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tem outros pets atualmente?</Text>
          <TextInput
            style={styles.input}
            placeholder="Se sim, quais? Quantos?"
            value={formData.hasOtherPets}
            onChangeText={(value) => handleInputChange("hasOtherPets", value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Por quanto tempo pode acolher?</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 2 semanas, 1 mês, 3 meses..."
            value={formData.timeAvailable}
            onChangeText={(value) => handleInputChange("timeAvailable", value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Preferências de Pet</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Cachorro filhote, gato adulto, porte pequeno..."
            value={formData.petPreferences}
            onChangeText={(value) => handleInputChange("petPreferences", value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Por que quer ser um lar temporário?</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Conte um pouco sobre sua motivação..."
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={formData.whyTemporaryHome}
            onChangeText={(value) => handleInputChange("whyTemporaryHome", value)}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Ionicons name="home" size={20} color="#fff" />
          <Text style={styles.submitButtonText}>Enviar Inscrição</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          * Campos obrigatórios. Entraremos em contato para agendar uma conversa e visita ao local.
        </Text>
      </View>

      {/* Informações Importantes */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>O que esperamos de um lar temporário?</Text>
        
        <View style={styles.infoItem}>
          <Ionicons name="checkmark-circle" size={16} color="#b563c5ff" />
          <Text style={styles.infoText}>Ambiente seguro e livre de riscos</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Ionicons name="checkmark-circle" size={16} color="#b563c5ff" />
          <Text style={styles.infoText}>Disponibilidade para levar ao veterinário quando necessário</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Ionicons name="checkmark-circle" size={16} color="#b563c5ff" />
          <Text style={styles.infoText}>Paciência e amor para ajudar na socialização do pet</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Ionicons name="checkmark-circle" size={16} color="#b563c5ff" />
          <Text style={styles.infoText}>Compromisso com o período combinado</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Lar Amigo - Juntos salvamos mais vidas 💜</Text>
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
  benefitsSection: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  benefitText: {
    flex: 1,
    marginLeft: 12,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 18,
  },
  formContainer: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
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
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    flexDirection: "row",
    backgroundColor: "#b563c5ff",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 10,
    marginBottom: 15,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  disclaimer: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 16,
  },
  infoSection: {
    backgroundColor: "#f0e6f5",
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoText: {
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