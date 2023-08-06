import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../../utils/generalstyles/dynamicGeneralStyles';
import SwiperText from '../../components/SwiperText/SwiperText';
import { ScrollView } from 'react-native-gesture-handler';

const interests = [
    {
        id: 1,
        name: 'Art',


    }, {
        id: 2,
        name: 'Books',

    },
    {
        id: 3,
        name: 'Environment',

    },
    {
        id: 4,
        name: 'Food',

    }, {
        id: 5,
        name: 'Health',
    },
    {
        id: 6,
        name: 'Disaster Relief',
    }, {
        id: 7,
        name: 'Education',
    },
    {
        id: 8,
        name: "Campaigns"
    }, {
        id: 9,
        name: "Animals"
    },
    {
        id: 10,
        name: "Community"
    }, {
        id: 11,
        name: "Children"
    }, {
        id: 12,
        name: "Orphans"
    }, {
        id: 13,
        name: "Social"
    }, {
        id: 14,
        name: "Sports"
    }, {
        id: 15,
        name: "Technology"
    }, {
        id: 16,
        name: "Others"
    }
]

const Interests = () => {
    const { reuseTheme } = useUserPreferredTheme();
    const generalStyles = dynamicGeneralStyles(reuseTheme);
    const [selectedInterests, setSelectedInterests] = React.useState<any[]>([])

    const renderItem = ({ item }:any) => {
        return (
          <TouchableOpacity style={styles.itemContainer}>
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        );
      };

    return (
        <KeyboardAvoidingView
            style={{
                flex: 1,
                backgroundColor: reuseTheme.colors.preference.primaryBackground,
            }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView>

                <SwiperText
                    headerText={`Select your interests`}
                    smallText={` Dont worry you can change this later`}
                    smallerText={`in the settings`}
                />
                {/* 3 items per row */}
            
                <FlatList
                    data={interests}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                    contentContainerStyle={{ paddingHorizontal: 5, marginHorizontal: 20 }}
                />
                {/* 3 items per row */}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Interests

const styles = StyleSheet.create({
    itemContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
    item: {
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 16,
      elevation: 4, // This adds the raised effect for Android
      shadowColor: 'rgba(0,0,0,0.2)', // This adds the raised effect for iOS
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 4,
    },
    itemText: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });