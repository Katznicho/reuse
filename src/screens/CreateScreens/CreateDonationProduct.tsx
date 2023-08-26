import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';

import TextArea from '../../components/TextArea';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../../utils/generalstyles/dynamicGeneralStyles';
import { ReuseTheme } from '../../types/types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-element-dropdown';
import { scale } from 'react-native-size-scaling';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



const CreateDonationProduct = () => {

    const { reuseTheme } = useUserPreferredTheme();
    const generalstyles = dynamicGeneralStyles(reuseTheme);
    const styles = productStyles(reuseTheme);
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [category, setCategory] = useState<any[]>([
        {
            label: "Clothes",
            value: "clothes"
        },
        {
            label: "Electronics",

            value: "electronics"
        },
        {
            label: "Furniture",
            value: "furniture"
        },
        {
            label: "Food",
            value: "food"
        },
        {
            label: "Books",
            value: "books"
        },
        {
            label: "Others",
            value: "others"
        },
    ])


    const [productType, setProductType] = useState<any[]>([
        {
            label: "Donation",
            value: "Donation"
        },
        {
            label: "Resell",
            value: "Resell"
        },
    ])

    const [productDetials, setProductDetails] = useState({
        title: "",
        description: "",
        category: "",
        quantity: 0,
        price: 0,
        images: [],
        coverImage: "",
        location: "",
        locationCoordinates: {
            latitude: 0,
            longitude: 0
        },
        isNegotiable: false,
        isFree: false,
        isDonation: true,
        isExchange: false,
        isDeliveryAvailable: false,
        isPickupAvailable: false,
        isProductNew: false,
        isProductUsed: false,
        isProductRefurbished: false,
        isProductDamaged: false,
        receiverDetails: {
            name: "",
            email: "",
            phone: "",
            address: "",
        },
    });

    const [count, setCount] = useState([1, 2, 3, 4])
    return (
        <SafeAreaView style={[generalstyles.container]}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
            >

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* upload area */}
                    <TouchableOpacity style={[styles.coverStyles, generalstyles.centerContent]}>
                        <AntDesign
                            name={'plus'}
                            color={reuseTheme.colors.preference.primaryText}
                            size={20}
                            style={{
                                borderRadius: 10,
                                padding: 10,
                            }}
                        />
                        <View>
                            <Text>Add cover photos</Text>
                        </View>

                    </TouchableOpacity>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                        {
                            count.map((item, index) => (

                                <TouchableOpacity key={index} style={[styles.imageStyles, generalstyles.centerContent]}>
                                    <AntDesign
                                        name={'plus'}
                                        color={reuseTheme.colors.preference.primaryText}
                                        size={20}
                                        style={{
                                            borderRadius: 10,
                                            padding: 10,
                                        }}
                                    />

                                </TouchableOpacity>

                            ))
                        }

                        {/* second one */}
                        {/* second one */}

                    </ScrollView>
                    {/* upload area */}

                    <View>
                        <TextInput
                            style={generalstyles.InputContainer}
                            placeholder={'product title'}
                            keyboardType="default"
                            placeholderTextColor="#aaaaaa"
                            onChangeText={text =>
                                setProductDetails((prev) => {
                                    return { ...prev, title: text }
                                })

                            }
                            value={productDetials.title}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />


                    </View>

                    {/* category */}
                    <View style={styles.container}>
                        {/* {renderLabel()} */}
                        <Dropdown
                            backgroundColor='transparent'
                            containerStyle={{
                                backgroundColor: reuseTheme.colors.preference.primaryBackground,
                                borderRadius: 10,
                                // marginHorizontal: 20,
                            }}
                            style={[styles.dropdown]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            itemContainerStyle={{ maxHeight: scale(200), marginHorizontal: 20, backgroundColor: reuseTheme.colors.preference.primaryBackground }}
                            itemTextStyle={{ color: reuseTheme.colors.preference.primaryText }}
                            data={category}
                            search
                            maxHeight={scale(200)}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Select Product Category' : '...'}
                            searchPlaceholder="Search Categories..."
                            value={productDetials.category}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setProductDetails((prev) => {
                                    return { ...prev, category: item.value }
                                })
                                setIsFocus(false);
                            }}
                            renderLeftIcon={() => (
                                <AntDesign
                                    style={styles.icon}
                                    color={isFocus ? 'blue' : 'black'}
                                    name="Safety"
                                    size={scale(20)}
                                />
                            )}
                        />
                    </View>

                    {/* category */}

                    {/* location */}

                    {/* descriptin */}
                    <TextArea />
                    {/* description */}
                </ScrollView>
                  
            </KeyboardAwareScrollView>

        </SafeAreaView>


    )
}

export default CreateDonationProduct

const productStyles = (theme: ReuseTheme) => StyleSheet.create({
    coverStyles: {
        borderWidth: 1,
        borderColor: theme.colors.preference.grey3,
        width: "90%",
        marginHorizontal: 10,
        marginVertical: 10,
        height: 150,
        borderStyle: "dotted",
        borderRadius: 10
    },
    imageStyles: {
        borderWidth: 1,
        borderColor: theme.colors.preference.grey3,
        width: 80,
        marginHorizontal: 5,
        marginVertical: 10,
        height: 80,
        borderStyle: "dotted",
        borderRadius: 10
    },
    textStyle: {
        color: theme.colors.preference.primaryText,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center"
    },
    container: {
        backgroundColor: theme.colors.preference.primaryBackground,
        paddingTop: 16,
        marginHorizontal: 30
    },
    dropdown: {
        height: 40,
        borderColor: theme.colors.preference.grey3,
        borderWidth: 2,
        borderRadius: 20,
        paddingHorizontal: 8,
        backgroundColor: theme.colors.preference.primaryBackground,

    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: theme.colors.preference.primaryText,
        left: 16,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
        color: theme.colors.preference.primaryText,
        borderWidth: 0,
        backgroundColor: theme.colors.preference.primaryBackground,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        backgroundColor: theme.colors.preference.primaryBackground,
        color: theme.colors.preference.primaryText,
        borderWidth: 0,


    },
})