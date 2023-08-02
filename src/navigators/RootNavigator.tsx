import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/login/Login';


const Root =  createNativeStackNavigator<any>();
const RootNavigator = () => {
  return (

        <Root.Navigator
      // screenOptions={{ headerShown: fa}
      initialRouteName="LoginScreen">

      <Root.Screen name="MainStack" component={Login} />
    </Root.Navigator>


    
  )
}

export default RootNavigator
