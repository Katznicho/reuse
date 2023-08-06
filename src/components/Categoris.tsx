import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ReuseTheme } from '../types/types'
import { useUserPreferredTheme } from '../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../utils/generalstyles/dynamicGeneralStyles';


const Categories = () => {

    const {reuseTheme} =  useUserPreferredTheme();
    const generalstyles = dynamicGeneralStyles(reuseTheme);
    const styles = categoryStyles(reuseTheme);

    const [categories, setCategories] = useState<any[]>([{
        name: "Clothes",
        uri: "https://images.unsplash.com/photo-1612837017391-4b6b2b0e2b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhlc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
    },
    {
        name: "Shoes",
        uri: "https://images.unsplash.com/photo-1612837017391-4b6b2b0e2b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhlc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
    },
    {
        name: "Electronics",
        uri: "https://images.unsplash.com/photo-1612837017391-4b6b2b0e2b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhlc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
    },
    {
        name: "Furniture",
        uri: "https://images.unsplash.com/photo-1612837017391-4b6b2b0e2b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhlc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
    },
])





    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
                categories.length > 0 && categories?.map((item , index)=> (
                    <View
                     key={index}
                     >
                        <TouchableOpacity style={styles.categoryContainer}>
                            <Image style={styles.categoryImage} source={{ uri: item?.uri }} />
                            <Text style={styles.categoryName}>{item?.name}</Text>
                        </TouchableOpacity>
                    </View>
                ))
            }
        </ScrollView>
    )
}

export default Categories

const categoryStyles = (theme:ReuseTheme)=> StyleSheet.create({
    flatlistContainer: {
        marginHorizontal: 10
    },
    categoryContainer: {
        marginHorizontal: 10,
        marginVertical: 5
    },
    categoryImage: {
        width: 60,
        height: 60,
        marginBottom: 10,
        resizeMode: 'cover',
        borderRadius: 20
    },
    categoryName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: theme.colors.preference.primaryText
    },
});