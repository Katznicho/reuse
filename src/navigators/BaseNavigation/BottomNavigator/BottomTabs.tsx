
import HomeStack from '../StackNavigator/HomeStack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';






const Tab = createBottomTabNavigator();


 //create an empty screen for create tab
 const Empty = () => {
  return null;
}


export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
    >
      <Tab.Screen 
      name="HomeStack" 
      component={HomeStack} 
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }:any) => (
            <MaterialCommunityIcons
            name="home-variant"
            color={color}
            size={26}
          />
          
        ),
      }}
      />
      <Tab.Screen name="Create" 
      component={Empty} 
      options={{
        tabBarLabel: 'Create',
        tabBarIcon: ({ color }) => (
            <AntDesign
            name="pluscircleo"
            color={color}
            size={26}
          />
        ),
      }}
      />
      {/* mine */}
      <Tab.Screen name="Mine" 
      component={Empty} 
      options={{
        tabBarLabel: 'Mine',
        tabBarIcon: ({ color }) => (
            <AntDesign
            name="filetext1"
            color={color}
            size={26}
          />
        ),
      }}
      />
      {/* mine */}

      {/* saved books */}
      <Tab.Screen name="Notifications"
        component={Empty}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="ios-notifications-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
            
      {/* saved books */}

      <Tab.Screen name="Profile"
      component={Empty}
      options={{
        tabBarLabel: 'Profile',

        tabBarIcon: ({color }:any) => (
          <Ionicons
          name="ios-notifications-outline"
          color={color}
          size={26}
        />
        ),
      }}

      />
    </Tab.Navigator>
  );
}
