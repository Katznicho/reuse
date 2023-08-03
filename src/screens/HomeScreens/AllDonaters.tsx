import { StyleSheet,  View, FlatList } from 'react-native'
import React from 'react'
import { donaters } from '../../fakedata/data';
import DonaterCard from '../../components/DonatorCard';
import { dynamicGeneralStyles } from '../../utils/generalstyles/dynamicGeneralStyles';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';


const AllDonaters = () => {

  const {reuseTheme} =  useUserPreferredTheme();
  const generalstyles = dynamicGeneralStyles(reuseTheme);

  return (
    <View style={generalstyles.container}>
    <FlatList
      data={donaters}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <DonaterCard
          item={item}
          key={item.id}
          //   showAvailable={true}
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  </View>
  )
}

export default AllDonaters

const styles = StyleSheet.create({})