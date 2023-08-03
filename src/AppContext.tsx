import React from 'react'
import { StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import BaseNavigation from './navigators/BaseNavigation/BaseNavigation';
import AuthStackNavigator from './navigators/AuthStack';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store/dev';

const AppContent = () => {
    const { isLoggedIn, guestUser, appIntro } = useSelector((state: RootState) => state.user);

    return (
        <>
            <StatusBar />
            <NavigationContainer>
                {
                    isLoggedIn ? <BaseNavigation /> : <AuthStackNavigator />
                }


            </NavigationContainer>

        </>



    )
}

export default AppContent
