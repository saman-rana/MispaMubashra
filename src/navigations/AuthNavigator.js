import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import GetStarted from './../screens/getStarted/GetStarted';
import LoginSetup from '../screens/auth/LoginSetup';
import DrawerNavigator from './DrawerNavigator';
import TermCondition from '../screens/general/TermCondition';
import Privacy from '../screens/general/Privacy';
import EmailVerification from '../screens/auth/EmailVerification';
import CodeVerification from '../screens/auth/CodeVerification';
import ResetPassword from '../screens/auth/ResetPassword';
import SplashScreen from '../screens/splash/SplashScreen';
import BottomTabNavigator from './BottomTabNavigator';
import CustomDrawer from '../components/CustomDrawer';
import aboutUs from '../screens/general/aboutUs';
import DeleteAccount from '../screens/auth/DeleteAccount';
import FAQ from '../screens/general/FAQ';

const Stack = createStackNavigator();

function AuthNavigator() {
  console.log(Stack);
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={'GetStarted'}>
      <Stack.Screen
        options={{headerShown: false}}
        name={'SplashScreen'}
        component={SplashScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'GetStarted'}
        component={GetStarted}
      />

      <Stack.Screen
        name={'LoginSetup'}
        component={LoginSetup}
        options={{headerShown: false}}
      />
      <Stack.Screen name={'TermCondition'} component={TermCondition} />
      <Stack.Screen name={'Privacy'} component={Privacy} />

      <Stack.Screen
        options={{headerShown: false}}
        name={'HomeNew'}
        component={DrawerNavigator}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'EmailVerification'}
        component={EmailVerification}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'CodeVerification'}
        component={CodeVerification}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'ResetPassword'}
        component={ResetPassword}
      />
        <Stack.Screen
        options={{headerShown: false}}
        name={'AboutUs'}
        component={aboutUs}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'DeleteAccount'}
        component={DeleteAccount}
      />
       <Stack.Screen
        options={{headerShown: false}}
        name={'FAQ'}
        component={FAQ}
      />
    
    </Stack.Navigator>
  );
}

export default AuthNavigator;
