
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from '../../theme/theme';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import CreateDonationProduct from '../../screens/CreateScreens/CreateDonationProduct';
import CreateReuseProduct from '../../screens/CreateScreens/CreateReuseProduct';



const Stack = createNativeStackNavigator();

function CreateStack() {

    const navigation = useNavigation<any>();

    return (

        <Stack.Navigator>

            <Stack.Screen
                name="CreateNewDonation"
                component={CreateDonationProduct}
                options={{
                    title: 'New Donation',
                    headerStyle: {
                        backgroundColor: theme.colors.primary,
                    },
                    headerTitleStyle: {
                        fontSize: 30,
                    },
                    headerTintColor: theme.colors.white,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <IconButton
                            icon="chevron-left"
                            iconColor={theme.colors.white}
                            size={28}
                            onPress={() => navigation.goBack()}
                            containerColor={theme.colors.arraowBackGroundColor}
                        />
                    ),
                }}
            />

            <Stack.Screen
                name="CreateNewProduct"
                component={CreateReuseProduct}
                options={{
                    title: 'New Product',
                    headerStyle: {
                        backgroundColor: theme.colors.primary,
                    },
                    headerTitleStyle: {
                        fontSize: 30,
                    },
                    headerTintColor: theme.colors.white,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <IconButton
                            icon="chevron-left"
                            iconColor={theme.colors.white}
                            size={28}
                            onPress={() => navigation.goBack()}
                            containerColor={theme.colors.arraowBackGroundColor}
                        />
                    ),
                }}
            />





        </Stack.Navigator>

    );
}

export default CreateStack