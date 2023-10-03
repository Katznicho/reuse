import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NotificationInterface } from '../types';
import { generalstyles } from '../generalstyles/generalstyles';
import { theme } from '../theme/theme';

const NotificationCard = ({
  // id,
  type,
  time,
  description,
}: NotificationInterface) => {
  return (
    <View style={[generalstyles.flexStyles, styles.containerStyles]}>
      <View>
        <View>
          <Text style={[styles.textColor, { fontWeight: 'bold' }]}>{type}</Text>
        </View>
        <View style={[generalstyles.resideViews, styles.textStyles]}>
          <Text>{description}</Text>
        </View>
      </View>
      <View>
        <Text style={[styles.textColor]}> {time}</Text>
      </View>
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  containerStyles: {
    justifyContent: 'space-between',
    // alignItems:"center" ,
    marginHorizontal: 10,
    borderBottomColor: theme.colors.placeholder,
    borderWidth: 1,
    borderTopColor: theme.colors.placeholder,
    paddingVertical: 10,
  },
  textColor: {
    color: theme.colors.white,
  },
  textStyles: {
    width: '80%',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});
