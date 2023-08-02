import React from 'react'
import { StatusBar } from 'react-native'
import RootNavigator from './navigators/RootNavigator'

import { NavigationContainer } from '@react-navigation/native';

const AppContent = () => {


    return (
        <>
            <StatusBar />
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
        </>



    )
}

export default AppContent
