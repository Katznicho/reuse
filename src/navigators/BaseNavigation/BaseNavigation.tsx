import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { createDrawerNavigator} from '@react-navigation/drawer';
import BottomTabs from './BottomNavigator/BottomTabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {  useSelector } from 'react-redux'
import { RootState } from '../../redux/store/dev';
import DrawerContentComponent from '../../components/DrawerContent/DrawerContentComponent';
import { Avatar } from 'react-native-paper';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import SwiperScreen from '../../screens/onboarding/SwiperScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



function NotificationsScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}


const Stack = createNativeStackNavigator();


const Drawer = createDrawerNavigator();

export default function BaseNavigation() {

  const { reuseTheme } = useUserPreferredTheme();


  const { isLoggedIn, guestUser, appIntro } = useSelector((state: RootState) => state.user);
  React.useEffect(() => { }, [guestUser, isLoggedIn])



  return appIntro ? (<Drawer.Navigator
    initialRouteName="HomeDrawer"
    screenOptions={{
      headerShown: false,
      drawerStyle: {
        backgroundColor: reuseTheme.colors.preference.primaryBackground,
        width: 300,
        
      },
      drawerLabelStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: reuseTheme.colors.preference.primaryText,
        
      },
      drawerItemStyle: {
        marginVertical: 0,
      },
      drawerActiveBackgroundColor: reuseTheme.colors.preference.primaryForeground,
      drawerActiveTintColor: reuseTheme.colors.preference.primaryText,
      

    }}
    
    drawerContent={props => <DrawerContentComponent {...props} />}>

    <Drawer.Screen
      name="HomeDrawer"
      component={BottomTabs}
      options={{
        drawerIcon: () => (
          <Avatar.Image
            size={30}
            source={{
              uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            }}
          />

        ),
        drawerLabel(props) {
          return <View>
            <View>
              <Text>Katende Nicholas</Text>

            </View>
            <View>
              <Text >0759983853</Text>
            </View>

          </View>
        },




      }}
    />

    <Drawer.Screen name="Home"

      component={BottomTabs}
      options={{
        drawerIcon: () => (
          <MaterialCommunityIcons
            name="home-variant"
            color={reuseTheme.colors.preference.primaryText}
            size={26}
          />

        ),
        drawerLabel(props) {
          return <View>
            <View>
              <Text >Home</Text>

            </View>

          </View>
        },

      }}
    />

    {/* chats */}
    <Drawer.Screen name="Chats"
      options={{
        drawerIcon: () => (
          <Ionicons
            name="chatbox-ellipses-outline"
            color={reuseTheme.colors.preference.primaryText}
            size={26}
          />

        ),
        drawerLabel(props) {
          return <View>
            <View>
              <Text >Chats</Text>

            </View>

          </View>
        },

      }}
      component={NotificationsScreen}

    />
    {/* chats */}


    <Drawer.Screen name="Notifications"
      options={{
        drawerIcon: () => (
          <AntDesign
            name="shoppingcart"
            color={reuseTheme.colors.preference.primaryText}
            size={26}
          />

        ),
        drawerLabel(props) {
          return <View>
            <View>
              <Text >Market Place</Text>

            </View>

          </View>
        },

      }}
      component={NotificationsScreen}

    />
    {/* add a section */}




  </Drawer.Navigator>)
    : (
      <Stack.Navigator
        initialRouteName="SwiperScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SwiperScreen" component={SwiperScreen} />
      </Stack.Navigator>
    )





}