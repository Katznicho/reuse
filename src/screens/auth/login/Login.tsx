import React, { useState } from 'react'
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useNavigation } from '@react-navigation/core'
import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication'
import dynamicStyles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import reuseTheme from '../../../theme/theme';
import { ActivityIndicator } from '../../../components/ActivityIndicator';
import IMGoogleSignInButton from '../../../components/IMGoogleSignInButton/IMGoogleSignInButton';
import { useUserPreferredTheme } from '../../../hooks/useUserPreferredTheme';


const Login = () => {
  const navigation = useNavigation<any>()
  const {reuseTheme} =  useUserPreferredTheme();

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const styles = dynamicStyles(reuseTheme)

  const onPressLogin = () => {
    setLoading(true)
    
  }

  const onFBButtonPress = () => {
   
      
  }

  const onGoogleButtonPress = () => {
   
  }

  const onAppleButtonPress = async () => {
    
  }

  const onForgotPassword = async () => {
    navigation.push('ResetPassword', {
      isResetPassword: true,
    })
  }



  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
        <TouchableOpacity
          style={{ alignSelf: 'flex-start' }}
          onPress={() => navigation.goBack()}>
          <Image style={styles.backArrowStyle} source={reuseTheme.icons.backArrow} />
        </TouchableOpacity>
        <Text style={styles.title}>{'Sign In'}</Text>
        <TextInput
          style={styles.InputContainer}
          placeholder={'E-mail'}
          keyboardType="email-address"
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.InputContainer}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder={'Password'}
          onChangeText={text => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        
          <View style={styles.forgotPasswordContainer}>
            <TouchableOpacity onPress={() => onForgotPassword()}>
              <Text style={styles.forgotPasswordText}>
                {'Forgot password?'}
              </Text>
            </TouchableOpacity>
          </View>
        
        <TouchableOpacity
          style={styles.loginContainer}
          onPress={() => onPressLogin()}>
          <Text style={styles.loginText}>{'Log In'}</Text>
        </TouchableOpacity>
        
          <>
            <Text style={styles.orTextStyle}> {'OR'}</Text>
            <TouchableOpacity
              style={styles.facebookContainer}
              onPress={() => onFBButtonPress()}>
              <Text style={styles.facebookText}>
                {'Login With Facebook'}
              </Text>
            </TouchableOpacity>
          </>
        
        
          <IMGoogleSignInButton
            containerStyle={styles.googleButtonStyle}
            onPress={onGoogleButtonPress}
          />
        
        

        
        
          <TouchableOpacity
            style={styles.phoneNumberContainer}
            onPress={() => navigation.navigate('Sms', { isSigningUp: false })}>
            <Text style={styles.phoneNumber}>
              Login with phone number
            </Text>
          </TouchableOpacity>
        
        {loading && <ActivityIndicator />}
      </KeyboardAwareScrollView>
    </View>
  )
}

export default Login
