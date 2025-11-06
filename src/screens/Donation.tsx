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

export default function Donation() {
  const navigation = useNavigation();
  const [donationAmount, setDonationAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const predefinedAmounts = [
    { value: "10", label: "R$ 10" },
    { value: "25", label: "R$ 25" },
    { value: "50", label: "R$ 50" },
    { value: "100", label: "R$ 100" },
  ];

  const handleAmountSelect = (amount: string) => {
    setDonationAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmount = (amount: string) => {
    setCustomAmount(amount);
    setDonationAmount("");
  };

  const handleDonation = () => {
    const finalAmount = customAmount || donationAmount;
    
    if (!finalAmount) {
      Alert.alert("Atenção", "Por favor, selecione ou informe um valor para doação.");
      return;
    }

    if (!donorName || !donorEmail) {
      Alert.alert("Atenção", "Por favor, preencha seu nome e e-mail.");
      return;
    }

    Alert.alert(
      "Doação Realizada!",
      `Obrigado, ${donorName}! Sua doação de R$ ${finalAmount} foi processada com sucesso.`,
      [
        {
          text: "OK",
          onPress: () => {
            setDonationAmount("");
            setCustomAmount("");
            setDonorName("");
            setDonorEmail("");
            setPaymentMethod("");
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
        <Text style={styles.headerTitle}>Fazer Doação</Text>
        <View style={styles.headerRight} />
      </View>

      <LinearGradient colors={["#ffffffff", "#b563c5ff"]} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Ionicons name="heart" size={50} color="#b563c5ff" />
          <Text style={styles.bannerTitle}>Faça a Diferença</Text>
          <Text style={styles.bannerSubtitle}>
            Sua doação ajuda a fornecer alimentos, medicamentos e cuidados para animais necessitados.
          </Text>
        </View>
      </LinearGradient>

      {/* Valor da Doação */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Escolha o Valor da Doação</Text>
        
        <View style={styles.amountsContainer}>
          {predefinedAmounts.map((amount) => (
            <TouchableOpacity
              key={amount.value}
              style={[
                styles.amountButton,
                donationAmount === amount.value && styles.amountButtonSelected
              ]}
              onPress={() => handleAmountSelect(amount.value)}
            >
              <Text style={[
                styles.amountText,
                donationAmount === amount.value && styles.amountTextSelected
              ]}>
                {amount.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.customAmountContainer}>
          <Text style={styles.label}>Ou informe outro valor:</Text>
          <TextInput
            style={styles.input}
            placeholder="R$ 0,00"
            keyboardType="numeric"
            value={customAmount}
            onChangeText={handleCustomAmount}
          />
        </View>
      </View>

      {/* Informações do Doador */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Seus Dados</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome Completo *</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            value={donorName}
            onChangeText={setDonorName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-mail *</Text>
          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
            keyboardType="email-address"
            value={donorEmail}
            onChangeText={setDonorEmail}
          />
        </View>
      </View>

      {/* Método de Pagamento */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Método de Pagamento</Text>
        
        <TouchableOpacity 
          style={[
            styles.paymentMethod,
            paymentMethod === "pix" && styles.paymentMethodSelected
          ]}
          onPress={() => setPaymentMethod("pix")}
        >
          <Ionicons name="qr-code" size={24} color="#b563c5ff" />
          <View style={styles.paymentText}>
            <Text style={styles.paymentTitle}>PIX</Text>
            <Text style={styles.paymentDescription}>Pagamento instantâneo</Text>
          </View>
          {paymentMethod === "pix" && (
            <Ionicons name="checkmark-circle" size={20} color="#b563c5ff" />
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.paymentMethod,
            paymentMethod === "card" && styles.paymentMethodSelected
          ]}
          onPress={() => setPaymentMethod("card")}
        >
          <Ionicons name="card" size={24} color="#b563c5ff" />
          <View style={styles.paymentText}>
            <Text style={styles.paymentTitle}>Cartão de Crédito</Text>
            <Text style={styles.paymentDescription}>Parcelado em até 12x</Text>
          </View>
          {paymentMethod === "card" && (
            <Ionicons name="checkmark-circle" size={20} color="#b563c5ff" />
          )}
        </TouchableOpacity>
      </View>

      {/* Resumo da Doação */}
      {(donationAmount || customAmount) && (
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Resumo da Doação</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Valor:</Text>
            <Text style={styles.summaryValue}>R$ {customAmount || donationAmount}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Método:</Text>
            <Text style={styles.summaryValue}>
              {paymentMethod === "pix" ? "PIX" : 
               paymentMethod === "card" ? "Cartão de Crédito" : "Não selecionado"}
            </Text>
          </View>
        </View>
      )}

      {/* Botão de Doação */}
      <TouchableOpacity style={styles.donateButton} onPress={handleDonation}>
        <Ionicons name="heart" size={20} color="#fff" />
        <Text style={styles.donateButtonText}>Confirmar Doação</Text>
      </TouchableOpacity>

      {/* Informações Adicionais */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Para onde vai sua doação?</Text>
        <View style={styles.infoItem}>
          <Ionicons name="medical" size={16} color="#b563c5ff" />
          <Text style={styles.infoText}>Vacinas e medicamentos</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="fast-food" size={16} color="#b563c5ff" />
          <Text style={styles.infoText}>Ração de qualidade</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="home" size={16} color="#b563c5ff" />
          <Text style={styles.infoText}>Manutenção do abrigo</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="medkit" size={16} color="#b563c5ff" />
          <Text style={styles.infoText}>Castrações e cirurgias</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Lar Amigo - Todas as doações são fiscalizadas 💜</Text>
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
  section: {
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
  amountsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  amountButton: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: "transparent",
  },
  amountButtonSelected: {
    backgroundColor: "#b563c5ff",
    borderColor: "#8a4697ff",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  amountTextSelected: {
    color: "#fff",
  },
  customAmountContainer: {
    marginTop: 10,
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
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "transparent",
  },
  paymentMethodSelected: {
    backgroundColor: "#f0e6f5",
    borderColor: "#b563c5ff",
  },
  paymentText: {
    flex: 1,
    marginLeft: 12,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  paymentDescription: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  summary: {
    backgroundColor: "#f0e6f5",
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#555",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  donateButton: {
    flexDirection: "row",
    backgroundColor: "#b563c5ff",
    margin: 20,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  donateButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  infoSection: {
    backgroundColor: "#fff",
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
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#555",
    marginLeft: 10,
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