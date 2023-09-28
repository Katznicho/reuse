import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View, TextInput, Image, Alert } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';

import TextArea from '../../components/TextArea';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../../utils/generalstyles/dynamicGeneralStyles';
import { ReuseTheme } from '../../types/types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-element-dropdown';
import { scale } from 'react-native-size-scaling';
import CalendarComponent from '../../components/CalendarComponent';
import Radio from '../../components/Radio/Radio';
import UploadComponent from '../../components/UploadComponent';
import { UploadImage } from '../../hooks/UploadImage';
import { RootState } from '../../redux/store/dev';
import { useSelector } from 'react-redux';
import { PRODUCT_STORAGE } from '../../utils/constants/constants';
import { Button } from 'react-native-paper';
import { useFirebase } from '../../hooks/useFirebase';
import { showMessage } from 'react-native-flash-message';


interface DayDetails {
    dateString: string
    day: number,
    month: number,
    timestamp: number,
    year: number
}

interface CustomStyles {
    container: {
        backgroundColor: string;
    };
    text: {
        color: string;
    };
}

interface Output {
    [key: string]: {
        customStyles: CustomStyles;
        isBooked: boolean;


    };
}



const CreateDonationProduct = () => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [imagePath, setImagePath] = useState<any>(null);
    const { user } = useSelector((state: RootState) => state.user);
    const [uploadingImages , setUploadingImages] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);
    const { createDonationProduct } = useFirebase();

    const { reuseTheme } = useUserPreferredTheme();
    const generalstyles = dynamicGeneralStyles(reuseTheme);
    const styles = productStyles(reuseTheme);
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [markedDates, setMarkedDates] = useState<Output>({});
    const [category] = useState<any[]>([
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


    const [communites, setCommunities] = useState<any[]>([
        {
            label: "Community One",
            value: "Community One"
        },
        {
            label: "Community Two",
            value: "Community Two"
        },
    ])


    const setStartDate = (day: DayDetails) => {


        if (!productDetials.pickupDate) {

            setProductDetails((prevState: any) => {
                return { ...prevState, pickupDate: day.dateString }
            })
        } else {

            setProductDetails((prevState: any) => {
                return { ...prevState, pickupDate: day.dateString }
            })


        }

        const updatedMarkedDates: Output = {};

        updatedMarkedDates[productDetials.pickupDate] = {
            customStyles: {
                container: {
                    backgroundColor: reuseTheme.colors.preference.primaryForeground,
                },
                text: {
                    color: 'white',
                },
            },
            isBooked: true,
        };

        //keep the previous marked dates
        setMarkedDates((prevState) => ({
            ...prevState,
            ...updatedMarkedDates,
        }));


    };

    async function uploadImage(imagePath: any) {
        try {
            if (imagePath) {
                const { image, error } = await UploadImage(
                    user?.UID,
                    imagePath.imagePath,
                    PRODUCT_STORAGE,
                );
                //update the cpver image
                if (error) {
                    Alert.alert('Something went wrong please try aagin');
                }
                if (image) {
                    setProductDetails((prev: any) => {
                        return { ...prev, coverImage: image }
                    })

                }
            }


        } catch (error) {

        }

    }


    useEffect(() => {
        uploadImage(imagePath);
    },
        [imagePath])





    const [productDetials, setProductDetails] = useState<any>({
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
        estimatedWeight: 0,
        pickupDate: "",
        isNegotiable: false,
        isFree: false,
        isDonation: true,
        isExchange: false,
        isDeliveryAvailable: false,
        isDeliveryFeeCovered: false,
        isPickupAvailable: false,
        isProductNew: false,
        isProductUsed: false,
        isProductAvailableForAll: false,
        isProductRefurbished: false,
        isProductDamaged: false,
        damageDescription: "",
        receiverDetails: {
            name: "",
            email: "",
            phone: "",
            address: "",
        },
        status:"UPLOADED",
    
    });


    useEffect(() => {
        if (productDetials.pickupDate) {
            const updatedMarkedDates: Output = {};
            updatedMarkedDates[productDetials.pickupDate] = {
                customStyles: {
                    container: {
                        backgroundColor: reuseTheme.colors.preference.primaryForeground,
                    },
                    text: {
                        color: 'white',
                    },
                },
                isBooked: true,
            };
            setMarkedDates(updatedMarkedDates);
        }




    }, [productDetials.pickupDate])

    const [count, setCount] = useState<any>([
        {
            id: 1,
            showModal: false,
            imagePath: null,

        },
        {
            id: 2,
            showModal: false,
            imagePath: null
        },
        {
            id: 3,
            showModal: false,
            imagePath: null
        },
        {
            id: 4,
            showModal: false,
            imagePath: null
        },
    ])



    const uploadImagesAutomatically = useCallback(async () => {
        try {
             setUploadingImages(true);
            const updatedCount = [...count];
            for (let index = 0; index < updatedCount.length; index++) {
                const item = updatedCount[index];
                if (item.imagePath) {
                    const { image, error } = await UploadImage(
                        user?.UID,
                        item.imagePath?.imagePath,
                        PRODUCT_STORAGE
                    );
                    if (error) {
                        Alert.alert(`Error uploading image for item ${item.id}. Please try again.`);
                    }
                    if (image) {
                        // Update imagePath for the uploaded item
                        // updatedCount[index] = {
                        //     ...updatedCount[index],
                        //     imagePath: image,
                        // };
                        setProductDetails((prev: { images: any; }) => {
                            const updatedImages = [...prev.images];
                            updatedImages[index] = image; // Update image at the specific index
                            return { ...prev, images: updatedImages };
                        });

                    }
                }
            }
            setCount(updatedCount); // Update the state with the uploaded images

            // Update productDetails after all images are uploaded
            // const updatedImages = updatedCount.map(item => item.imagePath ? item.imagePath : null);
            // setProductDetails((prev: any) => ({
            //     ...prev,
            //     images: updatedImages
            // }));
            setUploadingImages(false);
        } catch (error) {
            setUploadingImages(false);
        }
    }, [count, setCount]);


    const createProduct = async () => {
        try {
            setLoading(true);
            await createDonationProduct(user?.UID, productDetials);
            setLoading(false);
            showMessage({
                message: 'Product created successfully',
                type: 'success',
                icon: 'success',
            })
            //reset the product details
            setProductDetails({
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
                estimatedWeight: 0,
                pickupDate: "",
                isNegotiable: false,
                isFree: false,
                isDonation: true,
                isExchange: false,
                isDeliveryAvailable: false,
                isDeliveryFeeCovered: false,
                isPickupAvailable: false,
                isProductNew: false,
                isProductUsed: false,
                isProductAvailableForAll: false,
                isProductRefurbished: false,
                isProductDamaged: false,
                damageDescription: "",
                receiverDetails: {
                    name: "",
                    email: "",
                    phone: "",
                    address: "",
                },
            })

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }




    return (
        <SafeAreaView style={[generalstyles.container]}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
            >

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* upload area */}
                    {
                        imagePath ? (<View>
                            <TouchableOpacity
                                onPress={() => {

                                    setShowModal(!showModal);

                                }}
                                style={[ generalstyles.centerContent]}>
                                <Image
                                    source={{ uri: imagePath.imagePath }}
                                    style={[styles.coverStyles, generalstyles.centerContent]}
                                />

                            </TouchableOpacity>



                        </View>) : (<TouchableOpacity
                            onPress={() => {

                                setShowModal(!showModal);


                            }}
                            style={[styles.coverStyles, generalstyles.centerContent]}>

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

                        </TouchableOpacity>)
                    }

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                        {
                            count.map((item:any, index:number) => (
                                <View key={item.id}>
                                    <TouchableOpacity
                                        key={index}
                                        style={[styles.imageStyles, generalstyles.centerContent]}
                                        onPress={() => {
                                            // Create a copy of the count array to modify the specific item
                                            const updatedCount = [...count];
                                            updatedCount[index] = {
                                                ...updatedCount[index],
                                                showModal: true, // Set showModal to true for the clicked item
                                            };
                                            setCount(updatedCount);
                                        }}
                                    >
                                        {
                                            item.imagePath ? (<Image
                                                source={{ uri: item?.imagePath?.imagePath }}
                                                style={[styles.imageStyles, generalstyles.centerContent]}
                                            />) : (<AntDesign
                                                name={'plus'}
                                                color={reuseTheme.colors.preference.primaryText}
                                                size={20}
                                                style={{
                                                    borderRadius: 10,
                                                    padding: 10,
                                                }}
                                            />)
                                        }


                                    </TouchableOpacity>


                                    {item.showModal && (
                                        <UploadComponent
                                            image={item.imagePath}
                                            setImage={(newImage: any) => {
                                                // Update the image path for the specific item
                                                const updatedCount = [...count];
                                                updatedCount[index] = {
                                                    ...updatedCount[index],
                                                    imagePath: newImage,
                                                };
                                                setCount(updatedCount);
                                            }}
                                            setModal={(newModalState: any) => {
                                                // Update the showModal property for the specific item
                                                const updatedCount = [...count];
                                                updatedCount[index] = {
                                                    ...updatedCount[index],
                                                    showModal: newModalState,
                                                };
                                                setCount(updatedCount);
                                            }}
                                            showModal={item.showModal}
                                            selectDocument={false}
                                        />
                                    )}

                                </View>



                            ))
                        }

                    </ScrollView>
                    {/* upload all */}
                     <View  style={styles.buttonStyles}>
                     <Button

                            mode="contained"
                            contentStyle={{
                                flexDirection: 'row-reverse',
                            }}
                            buttonColor={reuseTheme.colors.preference.primaryForeground}
                            textColor={reuseTheme.colors.preference.primaryText}
                            onPress={uploadImagesAutomatically}
                            disabled={count.some((item:any) => item.imagePath === null) || uploadingImages}
                            loading={uploadingImages}


                        >
                            {/* Create Product */}
                             Upload Images
                        </Button>
                          
                     </View>
                    {/* upload all */}
                    {/* upload area */}

                    <View>
                        <TextInput
                            style={generalstyles.InputContainer}
                            placeholder={'product title'}
                            keyboardType="default"
                            placeholderTextColor="#aaaaaa"
                            onChangeText={text =>
                                setProductDetails((prev: any) => {
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

                        <Dropdown
                            backgroundColor='transparent'
                            containerStyle={{
                                backgroundColor: reuseTheme.colors.preference.primaryBackground,
                                borderRadius: 10,
                        
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
                                setProductDetails((prev: any) => {
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

                    {/* Radio button */}
                    <View style={[generalstyles.flexStyles, { alignItems: "center", justifyContent: "center", marginVertical: 10 }]}>


                        <View
                            style={{
                                width: "25%"
                            }}
                        >
                            <Radio
                                enabled={productDetials.isDeliveryFeeCovered}
                                toggle={() => {
                                    setProductDetails((prev: { isDeliveryFeeCovered: any; }) => {
                                        return { ...prev, isDeliveryFeeCovered: !prev.isDeliveryFeeCovered }
                                    })
                                }}
                                containerStyle={{
                                    marginLeft: -20
                                }}


                            />
                        </View>
                        <Text style={{ marginHorizontal: 10 }}>Is Delivery Fee Covered  ?</Text>


                    </View>

                    <View style={[generalstyles.flexStyles, { alignItems: "center", justifyContent: "center", marginVertical: 10 }]}>


                        <View
                            style={{
                                width: "25%"
                            }}
                        >
                            <Radio
                                enabled={productDetials.isProductAvailableForAll}
                                toggle={() => {
                                    setProductDetails((prev: { isProductAvailableForAll: any; }) => {
                                        return { ...prev, isProductAvailableForAll: !prev.isProductAvailableForAll }
                                    })
                                }}
                                containerStyle={{
                                    marginLeft: -20
                                }}

                            />
                        </View>
                        <Text style={{ marginHorizontal: 10 }}>Product Available For All ?</Text>


                    </View>


                    <View style={[generalstyles.flexStyles, { alignItems: "center", justifyContent: "center", marginVertical: 10 }]}>


                        <View
                            style={{
                                width: "25%"
                            }}
                        >
                            <Radio
                                enabled={productDetials.isProductNew}
                                toggle={() => {
                                    setProductDetails((prev: { isProductNew: any; }) => {
                                        return { ...prev, isProductNew: !prev.isProductNew }
                                    })
                                }}
                                containerStyle={{
                                    marginLeft: -35
                                }}

                            />
                        </View>
                        <Text style={{ marginHorizontal: 10 }}> Is the Product New   ?</Text>


                    </View>



                    <View style={[generalstyles.flexStyles, { alignItems: "center", justifyContent: "center", marginVertical: 10 }]}>


                        <View
                            style={{
                                width: "25%"
                            }}
                        >
                            <Radio
                                enabled={productDetials.isProductDamaged}
                                toggle={() => {
                                    setProductDetails((prev: { isProductDamaged: any; }) => {
                                        return { ...prev, isProductDamaged: !prev.isProductDamaged }
                                    })
                                }}
                                containerStyle={{
                                    marginLeft: -20
                                }}

                            />
                        </View>
                        <Text style={{ marginHorizontal: 10 }}> Product has any damages?</Text>


                    </View>




                    {/* Radio button */}






                    {/* damage description */}
                    {
                        productDetials.isProductDamaged && (
                            <TextArea
                                placehoder="Tell us about the damage"
                                text={productDetials.damageDescription}
                                setText={(text: any) => {
                                    setProductDetails((prev: any) => {
                                        return { ...prev, damageDescription: text }
                                    })
                                }
                                }
                            />
                        )

                    }

                    {/* damage description */}


                    {/* community */}
                    {
                        !productDetials.isProductAvailableForAll && (
                            <View style={styles.container}>
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
                                    data={communites}
                                    search
                                    maxHeight={scale(200)}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={!isFocus ? 'Select Community' : '...'}
                                    searchPlaceholder="Search Communities..."
                                    value={productDetials.category}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setProductDetails((prev: any) => {
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
                        )
                    }


                    {/* community */}





                    {/* estimated weight */}
                    <View>
                        <TextInput
                            style={generalstyles.InputContainer}
                            placeholder={'enter estimated weight... in kgs'}
                            keyboardType="default"
                            placeholderTextColor="#aaaaaa"
                            onChangeText={text =>
                                setProductDetails((prev: any) => {
                                    return { ...prev, estimatedWeight: text }
                                })

                            }
                            value={productDetials.estimatedWeight}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                    </View>
                    {/* estimated weight */}

                    {/* pick up da */}
                    <View>
                        <TextInput
                            style={generalstyles.InputContainer}
                            placeholder={'estimate pick up date (optional)'}
                            keyboardType="default"
                            placeholderTextColor="#aaaaaa"
                            editable={false}
                            value={productDetials.pickupDate}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                    </View>

                    <View>
                        <CalendarComponent
                            containerStyles={{
                                borderWidth: 1,
                                borderColor: reuseTheme.colors.preference.primaryBackground,
                                height: 400,
                                // marginHorizontal: 25,
                                marginTop: 10,
                                borderRadius: 10,
                                backgroundColor: reuseTheme.colors.preference.primaryBackground,
                                color: reuseTheme.colors.preference.primaryText,
                                fontWeight: 'bold',
                                elevation: 30,
                            }}
                            disableAllTouchEventsForDays={false}
                            handleDayPress={setStartDate}
                            markedDates={markedDates}

                        />

                    </View>


                    {/* pickup date */}



                    {/* descriptin */}
                    <TextArea
                        placeholder="Tell us about your product"
                        text={productDetials.description}
                        setText={(text: any) => {
                            setProductDetails((prev: any) => {
                                return { ...prev, description: text }
                            })
                        }
                        }
                    />
                    {/* description */}

                    <View
                        style={styles.buttonStyles}
                    >
                        {/* button */}
                        <Button
                            icon={{ source: 'play', direction: 'ltr' }}
                            mode="contained"
                            contentStyle={{
                                flexDirection: 'row-reverse',
                            }}
                            buttonColor={reuseTheme.colors.preference.primaryForeground}
                            textColor={reuseTheme.colors.preference.primaryText}
                            onPress={createProduct}
                            disabled={loading}


                        >
                            {/* Create Product */}
                            {
                                loading ? "Creating Product..." : "Create Product"
                            }
                        </Button>
                        {/* button */}
                    </View>
                </ScrollView>

                {/* modal section */}
                {showModal && (
                    <UploadComponent
                        image={imagePath}
                        setImage={setImagePath}
                        setModal={setShowModal}
                        showModal={showModal}
                        selectDocument={false}
                    />
                )}

                {/* modal section */}

            </KeyboardAwareScrollView>

        </SafeAreaView>


    )
}

export default CreateDonationProduct

const productStyles = (theme: ReuseTheme) => StyleSheet.create({
    coverStyles: {
        borderWidth: 1,
        borderColor: theme.colors.preference.grey3,
        width: "95%",
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
    buttonStyles:{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        marginHorizontal: 20
    }
})