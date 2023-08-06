
import HomeStack from '../StackNavigator/HomeStack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Avatar } from 'react-native-paper';
import { useUserPreferredTheme } from '../../../hooks/useUserPreferredTheme';
import { View } from 'react-native';
import ProfileStack from '../../../screens/ProfileScreens/ProfileStack';






const Tab = createBottomTabNavigator();


 //create an empty screen for create tab
 const Empty = () => {
  return null;
}


export default function BottomTabs() {
  const {reuseTheme} =  useUserPreferredTheme();
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      // screenOptions={{
      //   headerShown: false,
      // }}
      sceneContainerStyle={{
        backgroundColor: reuseTheme.colors.preference.primaryBackground,
        flex: 1,
      }}
      screenOptions={
        {
          tabBarStyle: {
            backgroundColor:reuseTheme.colors.preference.primaryBackground,
            borderWidth: 0,
            borderTopWidth: 0,
            borderColor: reuseTheme.colors.preference.primaryBackground,
            height: 60,
            // elevation: 0,
          },
          headerShown: false,
          tabBarActiveTintColor: reuseTheme.colors.preference.grey6,
          tabBarInactiveTintColor:reuseTheme.colors.preference.primaryText,
  
  
  
        }
      }
      
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
      <Tab.Screen name="Reuse" 
      component={Empty} 
      options={{
        tabBarLabel: 'Reuse',
        tabBarAccessibilityLabel: 'Reuse',
        tabBarIcon: ({ color }: any) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: reuseTheme.colors.preference.primaryBackground,
               borderRadius: 50,
              width: 80,
              //move the tab bar to the top
              position: 'absolute',
              // top: -20,
              //...styles.shadowStyles,

            }}
          >
            <Avatar.Image
              size={35}
              source={require("../../../assets/images/logo_white.png")}
              style={{
                backgroundColor:reuseTheme.colors.preference.primaryBackground,
                borderRadius: 50,
                // marginVertical: 10,
                // height: 80,
                borderColor: reuseTheme.colors.preference.primaryText,
              }}

            />

          </View>
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
              name="notifications-sharp"
              color={color}
              size={26}
            />
          ),
        }}
      />
            
      {/* saved books */}

      <Tab.Screen name="Profile"
      component={ProfileStack}
      options={{
        tabBarLabel: 'Profile',

        tabBarIcon: ({color }:any) => (
          <Avatar.Image
            size={30}
            source={{
              uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            }}
          />
        ),
      }}

      />
    </Tab.Navigator>
  );
}
