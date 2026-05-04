import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Welcome: undefined;
  FitnessApp: undefined;
  EconomyApp: undefined;
  EventsApp: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

export const useWelcomeLogic = () => {
  const navigation = useNavigation<NavigationProp>();

  // ir a fitnessApp
  const handleGetStartedFitnessApp = () => {
    navigation.navigate('FitnessApp');
  };

  // ir a economyApp
  const handleGetStartedEconomyApp = () => {
    navigation.navigate('EconomyApp');
  };

  // ir a eventsApp
  const handleGetStartedEventsApp = () => {
    navigation.navigate('EventsApp');
  };

  return {
    handleGetStartedFitnessApp,
    handleGetStartedEconomyApp,
    handleGetStartedEventsApp,
  };
};
