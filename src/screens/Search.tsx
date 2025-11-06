import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
    FlatList
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Search() {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilters, setSelectedFilters] = useState({
        species: [],
        size: [],
        age: [],
        gender: []
    });
    const [favorites, setFavorites] = useState<string[]>([]); // Array de IDs dos pets favoritados

    // Dados de exemplo para pets
    const allPets = [
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
        {
            id: "3",
            name: "Tobby",
            species: "cachorro",
            breed: "Yorkshire",
            age: "filhote",
            size: "pequeno",
            gender: "macho",
            info: "Energético e inteligente",
            src: require("../screens/img/yorkshire.png")
        },
        {
            id: "4",
            name: "Shake",
            species: "cachorro",
            breed: "Pug",
            age: "adulto",
            size: "médio",
            gender: "macho",
            info: "Hiperativo e dorminhoco",
            src: require("../screens/img/pug.png")
        },
        {
            id: "5",
            name: "Duquesa",
            species: "gato",
            breed: "Persa",
            age: "adulto",
            size: "pequeno",
            gender: "fêmea",
            info: "Tranquila e carinhosa",
            src: require("../screens/img/persa.png")
        },
        {
            id: "6",
            name: "Snow",
            species: "gato",
            breed: "Khao Manee",
            age: "adulto",
            size: "pequeno",
            gender: "macho",
            info: "Sociavel e apegado",
            src: require("../screens/img/KhaoManee.png")
        },
        {
            id: "7",
            name: "Max",
            species: "cachorro",
            breed: "Chihuahua",
            age: "filhote",
            size: "pequeno",
            gender: "macho",
            info: "Leal e corajoso",
            src: require("../screens/img/chihuahua.png")
        },
        {
            id: "8",
            name: "Pantera",
            species: "gato",
            breed: "Bombaim",
            age: "adulto",
            size: "pequeno",
            gender: "fêmea",
            info: "Dócil e inteligente",
            src: require("../screens/img/bombiam.png")
        },
        {
            id: "9",
            name: "Zeus",
            species: "cachorro",
            breed: "Husky Siberiano",
            age: "adulto",
            size: "grande",
            gender: "macho",
            info: "Amigável e gentil",
            src: require("../screens/img/husky.png")
        },
        {
            id: "10",
            name: "Fred",
            species: "gato",
            breed: "Gato Manês",
            age: "adulto",
            size: "médio",
            gender: "macho",
            info: "Curioso e brincal",
            src: require("../screens/img/maine.png")
        },
        {
            id: "11",
            name: "Bella",
            species: "cachorro",
            breed: "Lulu da pomerânia",
            age: "filhote",
            size: "pequeno",
            gender: "fêmea",
            info: "Fofa e querida",
            src: require("../screens/img/lulu.png")
        },
        {
            id: "12",
            name: "Angel",
            species: "gato",
            breed: "Gato Birmanês",
            age: "filhote",
            size: "médio",
            gender: "fêmea",
            info: "Inteligente e amigável",
            src: require("../screens/img/birmanes.png")
        },
    ];

    // Opções de filtro
    const filterOptions = {
        species: [
            { id: "cachorro", label: "Cachorro" },
            { id: "gato", label: "Gato" }
        ],
        size: [
            { id: "pequeno", label: "Pequeno" },
            { id: "médio", label: "Médio" },
            { id: "grande", label: "Grande" }
        ],
        age: [
            { id: "filhote", label: "Filhote" },
            { id: "adulto", label: "Adulto" },
            { id: "idoso", label: "Idoso" }
        ],
        gender: [
            { id: "macho", label: "Macho" },
            { id: "fêmea", label: "Fêmea" }
        ]
    };

    const toggleFilter = (category: string, value: string) => {
        setSelectedFilters(prev => {
            const currentFilters = [...prev[category]];
            const index = currentFilters.indexOf(value);

            if (index > -1) {
                currentFilters.splice(index, 1);
            } else {
                currentFilters.push(value);
            }

            return {
                ...prev,
                [category]: currentFilters
            };
        });
    };

    const toggleFavorite = (petId: string) => {
        setFavorites(prev => {
            if (prev.includes(petId)) {
                return prev.filter(id => id !== petId);
            } else {
                return [...prev, petId];
            }
        });
    };

    const clearFilters = () => {
        setSelectedFilters({
            species: [],
            size: [],
            age: [],
            gender: []
        });
        setSearchQuery("");
    };

    // Filtrar pets baseado na busca e filtros
    const filteredPets = allPets.filter(pet => {
        const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pet.breed.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesSpecies = selectedFilters.species.length === 0 ||
            selectedFilters.species.includes(pet.species);

        const matchesSize = selectedFilters.size.length === 0 ||
            selectedFilters.size.includes(pet.size);

        const matchesAge = selectedFilters.age.length === 0 ||
            selectedFilters.age.includes(pet.age);

        const matchesGender = selectedFilters.gender.length === 0 ||
            selectedFilters.gender.includes(pet.gender);

        return matchesSearch && matchesSpecies && matchesSize && matchesAge && matchesGender;
    });

    const hasActiveFilters = Object.values(selectedFilters).some(filters => filters.length > 0) || searchQuery;

    const FilterSection = ({ title, options, category }: any) => (
        <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>{title}</Text>
            <View style={styles.filterOptions}>
                {options.map((option: any) => (
                    <TouchableOpacity
                        key={option.id}
                        style={[
                            styles.filterOption,
                            selectedFilters[category].includes(option.id) && styles.filterOptionSelected
                        ]}
                        onPress={() => toggleFilter(category, option.id)}
                    >
                        <Text style={[
                            styles.filterOptionText,
                            selectedFilters[category].includes(option.id) && styles.filterOptionTextSelected
                        ]}>
                            {option.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    const renderPetItem = ({ item }: any) => (
        <TouchableOpacity style={styles.petCard}>
            <Image source={item.src} style={styles.petImage} />
            <View style={styles.petInfo}>
                <Text style={styles.petName}>{item.name}</Text>
                <Text style={styles.petBreed}>{item.breed}</Text>
                <Text style={styles.petDetails}>{item.info}</Text>
                <View style={styles.petTags}>
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>{item.size}</Text>
                    </View>
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>{item.age}</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => toggleFavorite(item.id)}
            >
                <Ionicons
                    name={favorites.includes(item.id) ? "heart" : "heart-outline"}
                    size={22}
                    color={favorites.includes(item.id) ? "#FF6B6B" : "#b563c5ff"}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Buscar Pets</Text>
                <View style={styles.headerRight} />
            </View>

            {/* Barra de Busca */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#666" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar por nome ou raça..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {searchQuery ? (
                    <TouchableOpacity onPress={() => setSearchQuery("")}>
                        <Ionicons name="close-circle" size={20} color="#666" />
                    </TouchableOpacity>
                ) : null}
            </View>

            {/* Filtros - Ajustei o espaçamento aqui */}
            <View style={styles.filtersContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.filtersScroll}
                    contentContainerStyle={styles.filtersContent}
                >
                    <FilterSection title="Espécie" options={filterOptions.species} category="species" />
                    <FilterSection title="Porte" options={filterOptions.size} category="size" />
                    <FilterSection title="Idade" options={filterOptions.age} category="age" />
                    <FilterSection title="Gênero" options={filterOptions.gender} category="gender" />
                </ScrollView>
            </View>

            {/* Limpar Filtros */}
            {hasActiveFilters && (
                <TouchableOpacity style={styles.clearFiltersButton} onPress={clearFilters}>
                    <Ionicons name="close-circle" size={16} color="#b563c5ff" />
                    <Text style={styles.clearFiltersText}>Limpar Filtros</Text>
                </TouchableOpacity>
            )}

            {/* Resultados */}
            <View style={styles.resultsHeader}>
                <Text style={styles.resultsTitle}>
                    {filteredPets.length} {filteredPets.length === 1 ? 'pet encontrado' : 'pets encontrados'}
                </Text>
            </View>

            <FlatList
                data={filteredPets}
                renderItem={renderPetItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.petsList}
            />

            {filteredPets.length === 0 && (
                <View style={styles.emptyState}>
                    <Ionicons name="search-outline" size={60} color="#ccc" />
                    <Text style={styles.emptyStateTitle}>Nenhum pet encontrado</Text>
                    <Text style={styles.emptyStateText}>
                        Tente ajustar os filtros ou termos da busca
                    </Text>
                    <TouchableOpacity style={styles.emptyStateButton} onPress={clearFilters}>
                        <Text style={styles.emptyStateButtonText}>Limpar Busca</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
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
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        margin: 20,
        marginBottom: 15, // Reduzi o margin bottom
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: "#333",
    },
    // Container dos filtros - Ajustei o espaçamento
    filtersContainer: {
        marginBottom: 10,
    },
    filtersScroll: {
        paddingHorizontal: 20,
    },
    filtersContent: {
        gap: 20, // Espaço entre as seções de filtro
    },
    filterSection: {
        marginRight: 20,
    },
    filterSectionTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
        marginBottom: 8,
    },
    filterOptions: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    filterOption: {
        backgroundColor: "#f9f9f9",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    filterOptionSelected: {
        backgroundColor: "#b563c5ff",
        borderColor: "#8a4697ff",
    },
    filterOptionText: {
        fontSize: 12,
        color: "#333",
    },
    filterOptionTextSelected: {
        color: "#fff",
    },
    clearFiltersButton: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        marginLeft: 20,
        marginBottom: 15,
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: "#f0e6f5",
        borderRadius: 16,
        gap: 4,
    },
    clearFiltersText: {
        fontSize: 12,
        color: "#b563c5ff",
        fontWeight: "600",
    },
    resultsHeader: {
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    resultsTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#333",
    },
    petsList: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    petCard: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
        alignItems: "center",
    },
    petImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    petInfo: {
        flex: 1,
        marginLeft: 15,
    },
    petName: {
        fontSize: 16,
        fontWeight: "700",
        color: "#333",
        marginBottom: 2,
    },
    petBreed: {
        fontSize: 14,
        color: "#666",
        marginBottom: 2,
    },
    petDetails: {
        fontSize: 12,
        color: "#888",
        marginBottom: 6,
    },
    petTags: {
        flexDirection: "row",
        gap: 6,
    },
    tag: {
        backgroundColor: "#f0e6f5",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
    },
    tagText: {
        fontSize: 10,
        color: "#b563c5ff",
        fontWeight: "600",
    },
    favoriteButton: {
        padding: 8,
    },
    emptyState: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
    },
    emptyStateTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#666",
        marginTop: 16,
        marginBottom: 8,
    },
    emptyStateText: {
        fontSize: 14,
        color: "#888",
        textAlign: "center",
        marginBottom: 20,
    },
    emptyStateButton: {
        backgroundColor: "#b563c5ff",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    emptyStateButtonText: {
        color: "#fff",
        fontWeight: "600",
    },
});