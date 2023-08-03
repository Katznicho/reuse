import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { generalstyles } from '../../generalstyles/generalstyles';
import { theme } from '../../theme/theme';

const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
    return (
        <View style={generalstyles.container}>
            <Text>Home</Text>
        </View>
    )
}

export function TopBars() {
    return (
        <Tab.Navigator

            screenOptions={{
                tabBarLabelStyle: { fontSize: 12 },
                tabBarStyle: {
                    backgroundColor: theme.colors.primary,
                    borderBottomColor: theme.colors.buttonColor

                },
                tabBarActiveTintColor: theme.colors.white,
                tabBarInactiveTintColor: theme.colors.placeholder,
                tabBarItemStyle: {
                    // borderBottomColor:theme.colors.buttonColor,
                    // borderWidth:1
                }

            }}


        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}

                options={{
                    tabBarLabel: "Draft(24)",


                }}

            />
            <Tab.Screen name="Settings"
                options={{
                    tabBarLabel: "Published(44)",


                }}
                component={HomeScreen} />

                
        </Tab.Navigator>
    );
}