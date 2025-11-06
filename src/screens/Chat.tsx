import React, { useState, useRef, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Linking from 'expo-linking';

export default function Chat() {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Olá! Bem-vindo ao Lar Amigo. Como posso ajudar você hoje?",
      time: "10:00",
      isUser: false
    }
  ]);
  const flatListRef = useRef<FlatList>(null);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: true
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");

    // Simular resposta automática após 1 segundo
    setTimeout(() => {
      const botResponse = {
        id: Date.now().toString(),
        text: "Obrigado pela sua mensagem! Em breve nossa equipe responderá. Enquanto isso, você pode ver nossos pets disponíveis para adoção.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isUser: false
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  // Auto-scroll para a última mensagem
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const openWhatsApp = () => {
    const phoneNumber = "5511999999999"; // Substitua pelo número do abrigo
    const message = "Olá! Gostaria de mais informações sobre adoção de pets.";
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    Linking.openURL(url).catch(() => {
      Alert.alert("Erro", "WhatsApp não está instalado no seu dispositivo.");
    });
  };

  const quickQuestions = [
    "Quais documentos preciso para adotar?",
    "Posso visitar os pets antes de adotar?",
    "Quais são os custos da adoção?",
    "Como funciona o lar temporário?",
    "Preciso de experiência prévia com pets?"
  ];

  const handleQuickQuestion = (question: string) => {
    const newMessage = {
      id: Date.now().toString(),
      text: question,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: true
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");

    // Resposta automática baseada na pergunta
    setTimeout(() => {
      let response = "";
      switch(question) {
        case "Quais documentos preciso para adotar?":
          response = "Para adotar, você precisa de: RG, CPF, comprovante de residência e assinatura do termo de responsabilidade. Todos os pets são vacinados e castrados!";
          break;
        case "Posso visitar os pets antes de adotar?":
          response = "Sim! Agendamos visitas mediante agendamento. Você pode conhecer o pet e nossa equipe antes de tomar a decisão.";
          break;
        case "Quais são os custos da adoção?":
          response = "A adoção é gratuita! Porém, pedimos uma contribuição simbólica de R$ 50 para ajudar com custos de vacinas e castração.";
          break;
        case "Como funciona o lar temporário?":
          response = "No lar temporário, você acolhe um pet por um período determinado. Nós fornecemos ração, medicamentos e suporte veterinário!";
          break;
        case "Preciso de experiência prévia com pets?":
          response = "Não é obrigatório, mas recomendamos. Oferecemos orientação para tutores de primeira viagem!";
          break;
        default:
          response = "Obrigado pela pergunta! Nossa equipe responderá em breve.";
      }

      const botResponse = {
        id: Date.now().toString(),
        text: response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isUser: false
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const renderMessage = ({ item }: any) => (
    <View style={[
      styles.messageContainer,
      item.isUser ? styles.userMessage : styles.botMessage
    ]}>
      <View style={[
        styles.messageBubble,
        item.isUser ? styles.userBubble : styles.botBubble
      ]}>
        <Text style={[
          styles.messageText,
          item.isUser ? styles.userMessageText : styles.botMessageText
        ]}>
          {item.text}
        </Text>
      </View>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Ionicons name="chatbubble-ellipses" size={20} color="#b563c5ff" />
          <Text style={styles.headerTitle}>Chat</Text>
        </View>
        {/* REMOVIDO O BOTÃO DO WHATSAPP DO HEADER */}
        <View style={styles.headerRightPlaceholder} />
      </View>

      <LinearGradient colors={["#ffffffff", "#b563c5ff"]} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Ionicons name="chatbubble-ellipses" size={40} color="#b563c5ff" />
          <Text style={styles.bannerTitle}>Central de Ajuda</Text>
          <Text style={styles.bannerSubtitle}>
            Tire suas dúvidas sobre adoção, voluntariado e cuidados com pets
          </Text>
        </View>
      </LinearGradient>

      {/* Perguntas Rápidas */}
      <View style={styles.quickQuestionsSection}>
        <Text style={styles.quickQuestionsTitle}>Perguntas Frequentes</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.quickQuestionsContainer}>
            {quickQuestions.map((question, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickQuestionButton}
                onPress={() => handleQuickQuestion(question)}
              >
                <Text style={styles.quickQuestionText}>{question}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Área de Chat */}
      <View style={styles.chatContainer}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        {/* Input de Mensagem */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Digite sua mensagem..."
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={handleSendMessage}
            disabled={!message.trim()}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={message.trim() ? "#b563c5ff" : "#ccc"} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Botão do WhatsApp - AGORA FIXO NA PARTE INFERIOR, CENTRALIZADO */}
      <View style={styles.whatsappContainer}>
        <TouchableOpacity style={styles.whatsappButton} onPress={openWhatsApp}>
          <Ionicons name="logo-whatsapp" size={24} color="#fff" />
          <Text style={styles.whatsappButtonText}>Falar no WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  headerCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  headerRightPlaceholder: {
    width: 40, // Espaço reservado para manter o layout balanceado
  },
  banner: {
    borderRadius: 16,
    margin: 20,
    padding: 20,
    alignItems: "center",
  },
  bannerContent: {
    alignItems: "center",
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginTop: 8,
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
    lineHeight: 18,
  },
  quickQuestionsSection: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  quickQuestionsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  quickQuestionsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  quickQuestionButton: {
    backgroundColor: "#f0e6f5",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#b563c5ff",
  },
  quickQuestionText: {
    fontSize: 12,
    color: "#b563c5ff",
    fontWeight: "500",
  },
  chatContainer: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    padding: 15,
    paddingBottom: 10,
  },
  messageContainer: {
    marginBottom: 15,
    maxWidth: "80%",
  },
  userMessage: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },
  botMessage: {
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    marginBottom: 4,
  },
  userBubble: {
    backgroundColor: "#b563c5ff",
    borderTopRightRadius: 4,
  },
  botBubble: {
    backgroundColor: "#f0e6f5",
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 18,
  },
  userMessageText: {
    color: "#fff",
  },
  botMessageText: {
    color: "#333",
  },
  messageTime: {
    fontSize: 10,
    color: "#888",
    marginTop: 2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#f9f9f9",
  },
  textInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 14,
    maxHeight: 100,
  },
  sendButton: {
    marginLeft: 10,
    padding: 10,
  },
  // NOVOS ESTILOS PARA O BOTÃO DO WHATSAPP NA PARTE INFERIOR
  whatsappContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#debcebff",
  },
  whatsappButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#25D366",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    gap: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  whatsappButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});