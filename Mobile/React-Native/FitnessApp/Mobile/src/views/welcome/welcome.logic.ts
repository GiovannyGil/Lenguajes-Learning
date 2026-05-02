import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Welcome: undefined;
  FitnessApp: undefined;
  EconomyApp: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

export const useWelcomeLogic = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleGetStarted = () => {
    navigation.navigate('FitnessApp');
  };

  return {
    handleGetStarted,
  };
};
