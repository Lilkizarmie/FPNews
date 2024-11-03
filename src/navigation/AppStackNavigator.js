import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigation from './BottomTabNavigation';
import routes from '../constants/routes';
import AuthStackNavigator from './AuthStackNavigator';
const AppStack = createNativeStackNavigator();

const AppStackNavigator = () => {
  
  return (
    
    <AppStack.Navigator screenOptions={{headerShown: false}}>
      <AppStack.Screen
        name={routes.MAIN}
        component={BottomTabNavigation}
      />
      <AppStack.Screen
        name={routes.AUTH}
        component={AuthStackNavigator}
      />
      
    </AppStack.Navigator>
             
  );
};

export default AppStackNavigator;
