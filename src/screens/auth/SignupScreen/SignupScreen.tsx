import React, { useState } from 'react'
import {
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import dynamicStyles from './styles'
import TermsOfUseView from '../../../components/TermsOfUse'
import { useUserPreferredTheme } from '../../../hooks/useUserPreferredTheme'
import { config } from '../../../config/config'
import { ProfilePictureSelector } from '../../../components/ProfilePictureSelector/ProfilePictureSelector'
import { ActivityIndicator } from '../../../components/ActivityIndicator'
import { dynamicGeneralStyles } from '../../../utils/generalstyles/dynamicGeneralStyles'


const SignupScreen = ({ navigation }: any) => {

  const { reuseTheme } = useUserPreferredTheme();

  const styles = dynamicStyles(reuseTheme)
  const generalStyles = dynamicGeneralStyles(reuseTheme);

  const [inputFields, setInputFields] = useState({})

  const [profilePictureFile, setProfilePictureFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const validateEmail = (text: any) => {
    let reg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return reg.test(String(text).toLowerCase()) ? true : false
  }

  const validatePassword = (text: any) => {
    let reg = /^(?=.*[A-Z])(?=.*[a-z])/
    return reg.test(String(text)) ? true : false
  }

  const trimFields = (fields: any) => {
    var trimmedFields = {}
    Object.keys(fields).forEach(key => {
      if (fields[key]) {
        //trimmedFields[key] = fields[key].trim()
      }
    })
    return trimmedFields
  }

  const onRegister = async () => {

  }

  const onChangeInputFields = (text: string, key: any) => {
    setInputFields(prevFields => ({
      ...prevFields,
      [key]: text,
    }))
  }

  const renderInputField = (field: any, index: any) => {
    return (
      <TextInput
        key={index?.toString()}
        style={styles.InputContainer}
        placeholder={field.placeholder}
        placeholderTextColor="#aaaaaa"
        secureTextEntry={field.secureTextEntry}
        onChangeText={text => onChangeInputFields(text, field.key)}
        //value={inputFields[field.key]}
        keyboardType={field.type}
        underlineColorAndroid="transparent"
        autoCapitalize={field.autoCapitalize}
      />
    )
  }

  const renderSignupWithEmail = () => {
    return (
      <>
        {config.signupFields.map(renderInputField)}
        <TouchableOpacity style={styles.signupContainer} onPress={onRegister}>
          <Text style={styles.signupText}>{'Sign Up'}</Text>
        </TouchableOpacity>
      </>
    )
  }

  return (
    <View style={generalStyles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
        {/* login and register */}
        <View
          style={[
            generalStyles.flexStyles,
            {
              alignItems: 'center',
            },
          ]}
        >
          <View

          >
            <TouchableOpacity 
              onPress={() => {

                navigation.navigate('Login');
              }}
            >
              <Text style={generalStyles.authTitle}>Login</Text>
            </TouchableOpacity>


          </View>

          <View>
            <TouchableOpacity>
              <Text style={generalStyles.authTitle}>Register</Text>
            </TouchableOpacity>
            <View style={[
              generalStyles.bottomHairline,
              {
                width: 110,
              }
            ]} />
          </View>
        </View>
        {/* login and register */}

        <Text style={generalStyles.authTitle}>{'Create new account'}</Text>
        <ProfilePictureSelector setProfilePictureFile={setProfilePictureFile} />
        {renderSignupWithEmail()}
        {config.isSMSAuthEnabled && (
          <>
            <Text style={styles.orTextStyle}>{'OR'}</Text>
            <TouchableOpacity
              style={styles.PhoneNumberContainer}
              onPress={() => navigation.navigate('Sms', { isSigningUp: true })}>
              <Text>{'Sign up with phone number'}</Text>
            </TouchableOpacity>
          </>
        )}
        <TermsOfUseView
          tosLink={config.tosLink}
          privacyPolicyLink={config.tosLink}
          style={styles.tos}
        />
      </KeyboardAwareScrollView>
      {loading && <ActivityIndicator />}
    </View>
  )
}

export default SignupScreen
