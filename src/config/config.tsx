import { Platform } from "react-native";
const regexForNames = /^[a-zA-Z]{2,25}$/

export const config = {
    isSMSAuthEnabled: true,
    isGoogleAuthEnabled: true,
    isAppleAuthEnabled: true,
    isFacebookAuthEnabled: true,
    forgotPasswordEnabled: true,
    appIdentifier: `io.instamobile.rn.${Platform.OS}`,
    facebookIdentifier: '285315185217069',
    webClientId:
      '1099201876026-7p9f7c1ukg55958ck45fc0bn0luilka4.apps.googleusercontent.com',
    
    tosLink: 'https://www.instamobile.io/eula-instachatty/',
    isUsernameFieldEnabled: false,
    smsSignupFields: [
      {
        displayName: 'First Name',
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'firstName',
        placeholder: 'First Name',
      },
      {
        displayName: 'Last Name',
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'lastName',
        placeholder: 'Last Name',
      },
      {
        displayName: 'Username',
        type: 'default',
        editable: true,
        regex: regexForNames,
        key: 'username',
        placeholder: 'Username',
        autoCapitalize: 'none',
      },
    ],
    signupFields: [
      {
        displayName: 'First Name',
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'firstName',
        placeholder: 'First Name',
      },
      {
        displayName: 'Last Name',
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'lastName',
        placeholder: 'Last Name',
      },
      {
        displayName: 'Username',
        type: 'default',
        editable: true,
        regex: regexForNames,
        key: 'username',
        placeholder: 'Username',
        autoCapitalize: 'none',
      },
      {
        displayName: 'E-mail Address',
        type: 'email-address',
        editable: true,
        regex: regexForNames,
        key: 'email',
        placeholder: 'E-mail Address',
        autoCapitalize: 'none',
      },
      {
        displayName: 'Password',
        type: 'default',
        secureTextEntry: true,
        editable: true,
        regex: regexForNames,
        key: 'password',
        placeholder: 'Password',
        autoCapitalize: 'none',
      },
      {
        displayName: 'Confirm Password',
        type: 'default',
        secureTextEntry: true,
        editable: true,
        regex: regexForNames,
        key: 'confirmPassword',
        placeholder: 'Confirm Password',
        autoCapitalize: 'none',
      },
    ],
    communitySignupFields: [
      {
        displayName: 'Community Name',
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'communityName',
        placeholder: 'Community Name',
      },
      {
        displayName: 'Username',
        type: 'default',
        editable: true,
        regex: regexForNames,
        key: 'username',
        placeholder: 'Username',
        autoCapitalize: 'none',
      },
      {
        displayName: 'E-mail Address',
        type: 'email-address',
        editable: true,
        regex: regexForNames,
        key: 'email',
        placeholder: 'E-mail Address',
        autoCapitalize: 'none',
      },
      {
        displayName: 'Password',
        type: 'default',
        secureTextEntry: true,
        editable: true,
        regex: regexForNames,
        key: 'password',
        placeholder: 'Password',
        autoCapitalize: 'none',
      },
      {
        displayName: 'Confirm Password',
        type: 'default',
        secureTextEntry: true,
        editable: true,
        regex: regexForNames,
        key: 'confirmPassword',
        placeholder: 'Confirm Password',
        autoCapitalize: 'none',
      },
    ],
      
  }
