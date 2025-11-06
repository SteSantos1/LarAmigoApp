import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FavoriteProvider } from "../LarAmigoApp/src/screens/FavoriteContext"; // Ajuste o caminho conforme sua estrutura

import Home from "./src/screens/Home";
import Adoption from "./src/screens/Adoption";
import Contact from "./src/screens/Contact";
import Donation from "./src/screens/Donation";
import TemporaryHome from "./src/screens/TemporaryHome";
import Volunteer from "./src/screens/Volunteer";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Search from "./src/screens/Search";
import Favorites from "./src/screens/Favorites";
import Chat from "./src/screens/Chat";
import News from "./src/screens/News";

export type RootStackParamList = {
  Home: undefined;
  Adoption: undefined;
  Contact: undefined;
  Donation: undefined;
  TemporaryHome: undefined;
  Volunteer: undefined;
  Login: undefined;
  Register: undefined;
  Search: undefined;
  Favorites: undefined;
  Chat: undefined;
  News: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <FavoriteProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Adoption" component={Adoption} />
          <Stack.Screen name="Contact" component={Contact} />
          <Stack.Screen name="Donation" component={Donation} />
          <Stack.Screen name="TemporaryHome" component={TemporaryHome} />
          <Stack.Screen name="Volunteer" component={Volunteer} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Favorites" component={Favorites} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="News" component={News} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoriteProvider>
  );
}