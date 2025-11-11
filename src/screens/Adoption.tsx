import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
    Image
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Adoption() {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        experience: "",
        petPreference: "",
        familyMembers: "",
        hasOtherPets: "",
        whyAdopt: ""
    });
    const [phoneError, setPhoneError] = useState("");

    const petsAvailable = [
        {
            id: "1",
            name: "Thor",
            species: "cachorro",
            breed: "Beagle",
            age: "adulto",
            size: "médio",
            gender: "macho",
            info: "Brincalhão e carinhoso",
            src: require("../screens/img/Thor.png")
        },
        {
            id: "2",
            name: "Luna",
            species: "gato",
            breed: "Siamês",
            age: "adulto",
            size: "pequeno",
            gender: "fêmea",
            info: "Calma e afetuosa",
            src: require("../screens/img/gato.png")
        },
        // ... (seus outros pets permanecem iguais)
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

    const handleSubmit = () => {
        // Remove caracteres não numéricos para validar
        const phoneDigits = formData.phone.replace(/\D/g, '');
        
        // Valida se tem exatamente 11 dígitos
        if (phoneDigits.length !== 11) {
            Alert.alert("Atenção", "O telefone deve conter 11 dígitos (DDD + número). Ex: 41999999999");
            return;
        }

        // Validação básica dos outros campos
        if (!formData.name || !formData.email || !formData.phone) {
            Alert.alert("Atenção", "Por favor, preencha pelo menos nome, e-mail e telefone.");
            return;
        }

        Alert.alert(
            "Formulário Enviado!",
            `Obrigado ${formData.name}! Sua solicitação de adoção foi recebida. Entraremos em contato em até 48 horas.`,
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
                            petPreference: "",
                            familyMembers: "",
                            hasOtherPets: "",
                            whyAdopt: ""
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
                <Text style={styles.headerTitle}>Processo de Adoção</Text>
                <View style={styles.headerRight} />
            </View>

            <LinearGradient colors={["#ffffffff", "#b563c5ff"]} style={styles.banner}>
                <View style={styles.bannerContent}>
                    <Ionicons name="heart" size={50} color="#b563c5ff" />
                    <Text style={styles.bannerTitle}>Adote um Amigo</Text>
                    <Text style={styles.bannerSubtitle}>
                        Preencha o formulário abaixo para iniciar o processo de adoção responsável.
                    </Text>
                </View>
            </LinearGradient>

            {/* Pets Available */}
            <View style={styles.petsSection}>
                <Text style={styles.sectionTitle}>Pets Disponíveis para Adoção</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.petsScroll}>
                    {petsAvailable.map((pet) => (
                        <View key={pet.id} style={styles.petCard}>
                            <Image source={pet.src} style={styles.petImage} />
                            <Text style={styles.petName}>{pet.name}</Text>
                            <Text style={styles.petInfo}>{pet.breed}</Text>
                            <Text style={styles.petInfo}>{pet.age} • {pet.size}</Text>
                            <Text style={styles.petTemperament}>{pet.info}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>

            {/* Formulário de Adoção */}
            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>Formulário de Adoção</Text>

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
                    <Text style={styles.label}>Já teve experiência com pets?</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Conte sua experiência anterior"
                        value={formData.experience}
                        onChangeText={(value) => handleInputChange("experience", value)}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Preferência de Pet (escolhido)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: Cachorro pequeno, Gato adulto, etc."
                        value={formData.petPreference}
                        onChangeText={(value) => handleInputChange("petPreference", value)}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Número de pessoas na casa</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Quantas pessoas moram com você?"
                        value={formData.familyMembers}
                        onChangeText={(value) => handleInputChange("familyMembers", value)}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Já tem outros pets?</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Se sim, quais?"
                        value={formData.hasOtherPets}
                        onChangeText={(value) => handleInputChange("hasOtherPets", value)}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Por que quer adotar?</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Conte um pouco sobre sua motivação para adotar..."
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                        value={formData.whyAdopt}
                        onChangeText={(value) => handleInputChange("whyAdopt", value)}
                    />
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Ionicons name="paw" size={20} color="#fff" />
                    <Text style={styles.submitButtonText}>Enviar Solicitação de Adoção</Text>
                </TouchableOpacity>

                <Text style={styles.disclaimer}>
                    * Campos obrigatórios. Entraremos em contato para agendar uma visita e conversar sobre o processo.
                </Text>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Lar Amigo - Adoção Responsável 💜</Text>
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
    petsSection: {
        marginHorizontal: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#333",
        marginBottom: 15,
    },
    petsScroll: {
        flexDirection: "row",
    },
    petCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        marginRight: 15,
        width: 140,
        alignItems: "center",
    },
    petImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    petName: {
        fontSize: 16,
        fontWeight: "700",
        color: "#333",
        marginBottom: 4,
    },
    petInfo: {
        fontSize: 12,
        color: "#666",
        marginBottom: 2,
        textAlign: "center",
    },
    petTemperament: {
        fontSize: 11,
        color: "#b563c5ff",
        fontStyle: "italic",
        textAlign: "center",
        marginTop: 4,
    },
    formContainer: {
        backgroundColor: "rgba(255, 255, 255, 1)",
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