import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeView from '../views/welcome/welcome';
import { RootStackParamList } from '../views/welcome/welcome.logic';
import FitnessApp from '../views/FitnessApp/home/home';
import EconomyApp from '../views/EconomyApp/home/home';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeView} />
        <Stack.Screen name="FitnessApp" component={FitnessApp} />
        <Stack.Screen name="EconomyApp" component={EconomyApp} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
