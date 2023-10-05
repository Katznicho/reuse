
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import New from './New';
import Events from './Events';
import All from './All';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';


const Stack = createNativeStackNavigator();

const NotificationStack = () => {
  const { reuseTheme } = useUserPreferredTheme();


  return (
    <Stack.Navigator initialRouteName="New">

      <Stack.Screen
        name="All"
        component={All}
      // options={{
      //   title: 'Notifications',
      //   headerStyle: {
      //     backgroundColor:   reuseTheme.colors.preference.primaryBackground,
      //   },
      //   headerTitleStyle: {
      //     fontSize: 25,
      //   },
      //   headerTitleAlign: 'center',
      //   headerTintColor:   reuseTheme.colors.preference.primaryText,
      // }}
      />
    </Stack.Navigator>
  );
};

export default NotificationStack;
