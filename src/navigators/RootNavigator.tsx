import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/login/Login';
import AuthStackNavigator from './AuthStack';


const Root = createNativeStackNavigator<any>();
const RootNavigator = () => {
  return (

    <Root.Navigator

      initialRouteName="LoginScreen">

      <Root.Screen name="AuthStack" 
      component={AuthStackNavigator} 
      options={{ headerShown: false }}
      />
    </Root.Navigator>



  )
}

export default RootNavigator
