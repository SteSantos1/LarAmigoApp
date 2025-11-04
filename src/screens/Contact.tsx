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

export default function Contact() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!name || !email || !message) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }

    // Simulação de envio do formulário
    Alert.alert(
      "Mensagem Enviada!",
      "Obrigado pelo seu contato, " + name + "! Retornaremos em breve.",
      [
        {
          text: "OK",
          onPress: () => {
            setName("");
            setEmail("");
            setMessage("");
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
        <Text style={styles.headerTitle}>Contato</Text>
        <View style={styles.headerRight} />
      </View>

      <LinearGradient colors={["#ffffffff", "#b563c5ff"]} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Ionicons name="mail" size={50} color="#b563c5ff" />
          <Text style={styles.bannerTitle}>Fale Conosco</Text>
          <Text style={styles.bannerSubtitle}>
            Estamos aqui para ajudar! Envie sua mensagem e retornaremos o mais breve possível.
          </Text>
        </View>
      </LinearGradient>

      {/* Formulário de Contato */}
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Envie sua Mensagem</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mensagem</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Conte-nos como podemos ajudar..."
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            value={message}
            onChangeText={setMessage}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Ionicons name="send" size={20} color="#fff" />
          <Text style={styles.submitButtonText}>Enviar Mensagem</Text>
        </TouchableOpacity>
      </View>

      {/* Informações de Contato */}
      <View style={styles.contactInfo}>
        <Text style={styles.contactInfoTitle}>Outras Formas de Contato</Text>
        
        <View style={styles.contactItem}>
          <Ionicons name="call" size={24} color="#b563c5ff" />
          <View style={styles.contactText}>
            <Text style={styles.contactType}>Telefone</Text>
            <Text style={styles.contactDetail}>(41) 9999-9999</Text>
          </View>
        </View>

        <View style={styles.contactItem}>
          <Ionicons name="mail" size={24} color="#b563c5ff" />
          <View style={styles.contactText}>
            <Text style={styles.contactType}>E-mail</Text>
            <Text style={styles.contactDetail}>contato@laramigo.org</Text>
          </View>
        </View>

        <View style={styles.contactItem}>
          <Ionicons name="location" size={24} color="#b563c5ff" />
          <View style={styles.contactText}>
            <Text style={styles.contactType}>Endereço</Text>
            <Text style={styles.contactDetail}>Rua dos Animais, 123 - São José dos Pinhais, PR</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Lar Amigo - Todos os direitos reservados 💜</Text>
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
  textArea: {
    height: 120,
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
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  contactInfo: {
    backgroundColor: "#f0e6f5",
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  contactInfoTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  contactText: {
    marginLeft: 12,
    flex: 1,
  },
  contactType: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  contactDetail: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
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