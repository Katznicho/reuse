import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../../utils/generalstyles/dynamicGeneralStyles';
import { useFirebase } from '../../hooks/useFirebase';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ReuseTheme } from '../../types/types';

const PaymentSummary = () => {

    const { reuseTheme } = useUserPreferredTheme();
    const generalstyles = dynamicGeneralStyles(reuseTheme);
    const [ownerDetails, setOwnerDetails] = useState<any>();

    const { getUserByUid } = useFirebase();

    const navigation = useNavigation<any>();
    const { params } = useRoute<any>();

    useEffect(() => {
        // console.log(params.item?.estimatedPickUp?.details);
        if (params.item) {
            getUserByUid(params.item.userId).then((res) => {
                setOwnerDetails(res);

            })
        }

    }, [])

    return (
        <SafeAreaView style={generalstyles.container}>

            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            ></ScrollView>
        </SafeAreaView>
    )
}

export default PaymentSummary

const paymentStyles = (theme: ReuseTheme) => StyleSheet.create({

});