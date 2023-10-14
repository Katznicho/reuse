import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../../utils/generalstyles/dynamicGeneralStyles';

const MyProductDetails = () => {
    const { reuseTheme } = useUserPreferredTheme();
    const generalstyles = dynamicGeneralStyles(reuseTheme);


    return (
        <SafeAreaView style={generalstyles.container}>

            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingBottom: 100 }}>
                <Text>Product detail</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default MyProductDetails

const styles = StyleSheet.create({})