import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { DrawerContentScrollView } from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Avatar, Caption, Drawer, Title } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { useDispatch, useSelector } from 'react-redux';

import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import { drawerContentStyles } from './drawercontentstyles';
import { RootState } from '../../redux/store/dev';
import { dynamicGeneralStyles } from '../../utils/generalstyles/dynamicGeneralStyles';
import Verification from '../Verification';

const DrawerContentComponent = ({ props }: any) => {

    const dispatch = useDispatch<any>();

    const { isLoggedIn,  guestUser,user } = useSelector((state: RootState) => state.user);

    const {reuseTheme} =  useUserPreferredTheme();
    const styles = drawerContentStyles(reuseTheme);
    const generalstyles = dynamicGeneralStyles(reuseTheme);

    const handleSignOut = async () => {
        try {

          // Handle any additional actions after the user is signed out
          
        } catch (error) {
             console.log(JSON.stringify(error))
          // Handle any errors that may occur during the signout process
        }
      };
      
      
      
      
      
      
      
      
      
      const onSignOut = () => {
        Alert.alert(
          'Sign Out',
          'Are you sure you want to sign out?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
      
            {
              text: 'OK',
              onPress: () => handleSignOut(),
            },
          ],
          { cancelable: false },
        );
      };

      
    return (<View style={[generalstyles.container]}>
        <DrawerContentScrollView  {...props}>
        <View style={[styles.userInfoSection]}>
            <View
              style={[
                generalstyles.flexStyles,
                {marginTop: 15, justifyContent: 'space-evenly'},
              ]}>
                <Avatar.Image
            size={50}
            source={{uri:"https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
          />
              <View>
                <Title style={styles.title}>
                  {'Mr'}
                  <Verification
                    isVerified={true}
                    style={{
                      margin: 10,
                    }}
                    size={18}
                  />
                </Title>
                <Caption style={styles.caption}>{`Nicholas`}</Caption>
              </View>
            </View>
            {/*some info */}
            {/*some info */}
          </View>

            {/*drawer items */}
            <Drawer.Section style={[styles.drawerSection]}>

                {/* home */}
                <Drawer.Item
                    label="Home"
                    icon={({ color, size }: any) => (
                        <AntDesign
                            name="home"
                            size={size}
                            color={color}
                        />
                    )}
                    active={true}


                />
                {/* home */}

                {/* chats */}
                <Drawer.Item
                    label="Chats"
                    icon={({ color, size }: any) => (
                        <Ionicons
                            name="chatbox-ellipses-outline"
                            size={size}
                            color={color}
                        />
                    )}

                />
                {/* chats */}

                {/* market place */}
                <Drawer.Item
                    label="Market Place"
                    icon={({ color, size }: any) => (
                        <AntDesign
                            name="shoppingcart"
                            size={size}
                            color={color}
                        />
                    )}

                />
                {/* market place*/}


                <Drawer.Item
                    label="Support"
                    icon={({ color, size }: any) => (
                        <AntDesign
                            name="customerservice"
                            size={size}
                            color={color}
                        />
                    )}

                />
                <Drawer.Item
                    label="Invite People"
                    icon={({ color, size }: any) => (
                        <AntDesign name="sharealt" size={size} color={color} />
                    )}

                />
            </Drawer.Section>

            {/* add drawer section with title communities */}
            <Drawer.Section style={[styles.drawerSection]} title="Communities">
                <Drawer.Item
                    label="Community 1"
                    icon={({ color, size }: any) => (
                        <AntDesign
                            name="customerservice"
                            size={size}
                            color={color}
                        />
                    )}
                />
                <Drawer.Item
                    label="Community 1"
                    icon={({ color, size }: any) => (
                        <AntDesign
                            name="customerservice"
                            size={size}
                            color={color}
                        />
                    )}
                />
            </Drawer.Section>

            <Drawer.Section >
                <Drawer.Item
                    label="Sign Out"
                    onPress={onSignOut}
                    icon={({ color, size }: any) => (
                        <MaterialCommunityIcons
                            name="exit-to-app"
                            size={size}
                            color={color}
                        />
                    )}

                />
            </Drawer.Section>

        </DrawerContentScrollView>

    </View>
    )
}

export default DrawerContentComponent

