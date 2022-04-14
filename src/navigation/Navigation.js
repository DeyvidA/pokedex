import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image } from "react-native";
import Pokedex from "../screens/Pokedex";
import Favorites from "../screens/Favorites";
import AccountScreen from "../screens/Account";
import Icon from "react-native-vector-icons/FontAwesome5";
import PokedexNavigation from "./PokedexNavigation";
import AccountNavigation from "./AccountNavigation";
import FavoriteNavigation from "./FavoriteNavigation";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Favoritos"
        component={FavoriteNavigation}
        options={{
          headerTransparent: true,
          tabBarLabel: "Favoritos",
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Pokedex"
        component={PokedexNavigation}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: () => renderPokeball(),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigation}
        options={{
          headerShown: false,
          tabBarLabel: "Mi Cuenta",
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function renderPokeball() {
  return (
    <Image
      source={require("../assets/pokeball.png")}
      style={{ width: 75, height: 75, top: -20 }}
    />
  );
}
