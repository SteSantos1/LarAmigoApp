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

export default function Volunteer() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    occupation: "",
    availability: "",
    interests: [],
    experience: "",
    skills: "",
    whyVolunteer: ""
  });
  const [phoneError, setPhoneError] = useState("");

  const volunteerInterests = [
    { id: "cleaning", label: "Limpeza do abrigo" },
    { id: "feeding", label: "Alimentação dos animais" },
    { id: "walking", label: "Passeio com os cães" },
    { id: "socialization", label: "Socialização dos pets" },
    { id: "events", label: "Eventos de adoção" },
    { id: "admin", label: "Tarefas administrativas" },
    { id: "transport", label: "Transporte de animais" },
    { id: "medical", label: "Auxílio veterinário" }
  ];

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

  const handleInterestToggle = (interestId: string) => {
    setFormData(prev => {
      const currentInterests = [...prev.interests];
      const index = currentInterests.indexOf(interestId);
      
      if (index > -1) {
        currentInterests.splice(index, 1);
      } else {
        currentInterests.push(interestId);
      }
      
      return {
        ...prev,
        interests: currentInterests
      };
    });
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

    if (formData.interests.length === 0) {
      Alert.alert("Atenção", "Por favor, selecione pelo menos uma área de interesse.");
      return;
    }

    Alert.alert(
      "Inscrição Enviada!",
      `Obrigado ${formData.name}! Sua inscrição para voluntariado foi recebida. Entraremos em contato em breve para conversarmos mais.`,
      [
        {
          text: "OK",
          onPress: () => {
            setFormData({
              name: "",
              email: "",
              phone: "",
              age: "",
              occupation: "",
              availability: "",
              interests: [],
              experience: "",
              skills: "",
              whyVolunteer: ""
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
        <Text style={styles.headerTitle}>Voluntariado</Text>
        <View style={styles.headerRight} />
      </View>

      <LinearGradient colors={["#ffffffff", "#b563c5ff"]} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Ionicons name="people" size={50} color="#b563c5ff" />
          <Text style={styles.bannerTitle}>Seja um Voluntário</Text>
          <Text style={styles.bannerSubtitle}>
            Sua dedicação e amor podem transformar a vida de muitos animais. Junte-se à nossa equipe!
          </Text>
        </View>
      </LinearGradient>

      {/* Benefícios */}
      <View style={styles.benefitsSection}>
        <Text style={styles.sectionTitle}>Por que ser voluntário?</Text>
        
        <View style={styles.benefitItem}>
          <Ionicons name="heart-circle" size={24} color="#b563c5ff" />
          <View style={styles.benefitText}>
            <Text style={styles.benefitTitle}>Faça a Diferença</Text>
            <Text style={styles.benefitDescription}>
              Cada hora doada significa mais cuidado e amor para os animais
            </Text>
          </View>
        </View>

        <View style={styles.benefitItem}>
          <Ionicons name="calendar" size={24} color="#b563c5ff" />
          <View style={styles.benefitText}>
            <Text style={styles.benefitTitle}>Horários Flexíveis</Text>
            <Text style={styles.benefitDescription}>
              Trabalhamos com sua disponibilidade, mesmo que sejam poucas horas por semana
            </Text>
          </View>
        </View>

        <View style={styles.benefitItem}>
          <Ionicons name="school" size={24} color="#b563c5ff" />
          <View style={styles.benefitText}>
            <Text style={styles.benefitTitle}>Aprendizado Contínuo</Text>
            <Text style={styles.benefitDescription}>
              Oferecemos treinamento e capacitação sobre cuidado animal
            </Text>
          </View>
        </View>
      </View>

      {/* Formulário de Inscrição */}
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Formulário de Voluntariado</Text>
        
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
          <Text style={styles.label}>Idade</Text>
          <TextInput
            style={styles.input}
            placeholder="Sua idade"
            keyboardType="numeric"
            value={formData.age}
            onChangeText={(value) => handleInputChange("age", value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ocupação/Profissão</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Estudante, Engenheiro, etc."
            value={formData.occupation}
            onChangeText={(value) => handleInputChange("occupation", value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Disponibilidade</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Finais de semana, tardes, etc."
            value={formData.availability}
            onChangeText={(value) => handleInputChange("availability", value)}
          />
        </View>

        {/* Áreas de Interesse */}
        <View style={styles.interestsSection}>
          <Text style={styles.label}>Áreas de Interesse *</Text>
          <Text style={styles.interestsSubtitle}>Selecione as atividades que mais te interessam:</Text>
          
          <View style={styles.interestsGrid}>
            {volunteerInterests.map((interest) => (
              <TouchableOpacity
                key={interest.id}
                style={[
                  styles.interestButton,
                  formData.interests.includes(interest.id) && styles.interestButtonSelected
                ]}
                onPress={() => handleInterestToggle(interest.id)}
              >
                <Text style={[
                  styles.interestText,
                  formData.interests.includes(interest.id) && styles.interestTextSelected
                ]}>
                  {interest.label}
                </Text>
                {formData.interests.includes(interest.id) && (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Experiência com Animais</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Conte sua experiência anterior com animais..."
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            value={formData.experience}
            onChangeText={(value) => handleInputChange("experience", value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Habilidades Especiais</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Ex: Fotografia, veterinária, organização de eventos..."
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            value={formData.skills}
            onChangeText={(value) => handleInputChange("skills", value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Por que quer ser voluntário?</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Conte um pouco sobre sua motivação..."
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={formData.whyVolunteer}
            onChangeText={(value) => handleInputChange("whyVolunteer", value)}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Ionicons name="people" size={20} color="#fff" />
          <Text style={styles.submitButtonText}>Enviar Inscrição</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          * Campos obrigatórios. Entraremos em contato para agendar uma conversa e apresentar o trabalho.
        </Text>
      </View>

      {/* Informações Importantes */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>O que oferecemos aos voluntários?</Text>
        
        <View style={styles.infoItem}>
          <Ionicons name="shield-checkmark" size={16} color="#b563c5ff" />
          <Text style={styles.infoText}>Treinamento e capacitação inicial</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Ionicons name="shield-checkmark" size={16} color="#b563c5ff" />
          <Text style={styles.infoText}>Certificado de voluntariado</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Ionicons name="shield-checkmark" size={16} color="#b563c5ff" />
          <Text style={styles.infoText}>Ambiente acolhedor e seguro</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Ionicons name="shield-checkmark" size={16} color="#b563c5ff" />
          <Text style={styles.infoText}>Kit de voluntário (camiseta e crachá)</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Lar Amigo - Voluntários fazem a diferença 💜</Text>
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
  interestsSection: {
    marginBottom: 20,
  },
  interestsSubtitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 12,
    fontStyle: "italic",
  },
  interestsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  interestButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    gap: 4,
  },
  interestButtonSelected: {
    backgroundColor: "#b563c5ff",
    borderColor: "#8a4697ff",
  },
  interestText: {
    fontSize: 12,
    color: "#333",
  },
  interestTextSelected: {
    color: "#fff",
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