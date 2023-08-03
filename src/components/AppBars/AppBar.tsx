import React,{useEffect, useState} from 'react';
import { Appbar, Badge } from 'react-native-paper';
import { Pressable, View } from 'react-native';

import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../../utils/generalstyles/dynamicGeneralStyles';


const AppBar = ({
  navigation,
  previous,
  title,
  titleStyle,
  barStyle,
  showSearch,
}: any) => {

  const { reuseTheme } = useUserPreferredTheme();
  const generalstyles = dynamicGeneralStyles(reuseTheme);

  return (
    <Appbar.Header dark={true} style={[barStyle, {
      backgroundColor: `${reuseTheme.colors.preference.primaryBackground}`,
      height: 40,
    }]}>
      {previous ? (
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('Home');
          }}
          color={`${reuseTheme.colors.preference.primaryBackground}`}
        />
      ) : null}
      <View>
        {/* icon menu */}
        <Appbar.Action
          icon="menu"
          size={30}
          color={reuseTheme.colors.preference.primaryForeground}

          onPress={() => navigation.toggleDrawer()}
        />
        {/* icon menu */}
      </View>

      <Appbar.Content
        title={title}
        titleStyle={[titleStyle, { marginLeft: -30 }]}
      />

      {/*show cart */}
      {showSearch && (
        <View
          style={{
            marginRight: 10,
          }}>
          <Pressable
            onPress={() =>
              navigation.navigate("Notifications")
            }

          >
            <Badge
              size={17}
              visible={true}
              style={[
                generalstyles.absoluteStyles,
                {
                  right: 0,
                  color: `${reuseTheme.colors.preference.primaryForeground}`,
                  backgroundColor: `${reuseTheme.colors.preference.primaryText}`,
                  fontWeight: '900',
                  fontSize: 15,
                  zIndex: 20,


                },
              ]}>
              0
            </Badge>
            <MaterialCommunityIcons name="bell" size={30}
              color={reuseTheme.colors.preference.primaryText} />
          </Pressable>
        </View>
      )}
      {/*show cart */}
    </Appbar.Header>
  );
};

export default AppBar;
