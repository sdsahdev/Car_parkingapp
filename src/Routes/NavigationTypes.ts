import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../Routes/AppNavigator'; // Adjust the path according to your project structure

export type NavigationProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
};
