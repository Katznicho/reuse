import {} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import New from './New';
import Events from './Events';
import All from './All';
import { theme } from '../../theme/theme';

const Stack = createNativeStackNavigator();

const NotificationStack = () => {
  return (
    <Stack.Navigator initialRouteName="New">
      <Stack.Screen
        name="New"
        component={New}
        options={{
          title: 'Notifications',
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTitleStyle: {
            fontSize: 25,
          },
          headerTitleAlign: 'center',
          headerTintColor: theme.colors.white,
        }}
      />
      <Stack.Screen
        name="Events"
        component={Events}
        options={{
          title: 'Notifications',
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTitleStyle: {
            fontSize: 25,
          },
          headerTitleAlign: 'center',
          headerTintColor: theme.colors.white,
        }}
      />
      <Stack.Screen
        name="All"
        component={All}
        options={{
          title: 'Notifications',
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTitleStyle: {
            fontSize: 25,
          },
          headerTitleAlign: 'center',
          headerTintColor: theme.colors.white,
        }}
      />
    </Stack.Navigator>
  );
};

export default NotificationStack;
