
import React from 'react'
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/login/Login';

const AuthStack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false,
        
      }}
      initialRouteName="Login">
      
      <AuthStack.Screen
        name="Login"
        component={Login}
      />
      <AuthStack.Screen
        // options={{ headerStyle: styles.headerStyle }}
        name="Signup"
        component={SignupScreen}
      />
      <AuthStack.Screen
        // options={{ headerStyle: styles.headerStyle }}
        name="Sms"
        component={SmsAuthenticationScreen}
      />
      <AuthStack.Screen
        // options={{ headerStyle: styles.headerStyle }}
        name="ResetPassword"
        component={ResetPasswordScreen}
      />
    </AuthStack.Navigator>
  )
}

const styles = StyleSheet.create({
  headerStyle: {
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0, // remove shadow on Android
  },
})

export default AuthStackNavigator
