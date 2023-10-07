
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View, Image, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import { TextField, Wizard, WizardStepStates, Picker, Switch, DateTimePicker, NumberInput, NumberInputData } from 'react-native-ui-lib';
import { ReuseTheme } from '../../types/types';
import { Button } from 'react-native-paper';
import { RootState } from '../../redux/store/dev';
import { useFirebase } from '../../hooks/useFirebase';
import { useSelector } from 'react-redux';
import { dynamicGeneralStyles } from '../../utils/generalstyles/dynamicGeneralStyles';
import UploadComponent from '../../components/UploadComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { PRODUCT_STORAGE } from '../../utils/constants/constants';
import { UploadImage } from '../../hooks/UploadImage';
import TextArea from '../../components/TextArea';
import * as reactNativeFlashMessage from 'react-native-flash-message';
import UserLocation from '../onboarding/UserLocation';
import { useNavigation } from '@react-navigation/native';
import { API_KEY } from '@env';



interface State {
    activeIndex: number;
    completedStepIndex?: number;
    allTypesIndex: number;
    toastMessage?: string;
}



const CreateDonationProduct = () => {
    const { reuseTheme } = useUserPreferredTheme();
    const generalstyles = dynamicGeneralStyles(reuseTheme);
    const styles = productStyles(reuseTheme);
    //product details
    const [showModal, setShowModal] = useState<boolean>(false);
    const [imagePath, setImagePath] = useState<any>(null);
    const { user } = useSelector((state: RootState) => state.user);
    const [uploadingImages, setUploadingImages] = useState<boolean>(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [communities, setCommunities] = useState<any[]>([]);

    const [loading, setLoading] = useState<boolean>(false);
    const { createDonationProduct, getAllCategories, getAllCommunities } = useFirebase();


    const navigation = useNavigation<any>();

    useEffect(() => {
        getAllCategories().then((res) => {
            //create new array for the categories
            let categories: any = [];
            res.forEach((item: any) => {
                categories.push({
                    label: item.name,
                    value: item.id
                })
            })
            setCategories(categories);
        }).catch((err) => {
        })
    }, [])

    useEffect(() => {
        getAllCommunities()
            .then((res) => {
                let communities: any = [];
                res.forEach((item: any) => {
                    communities.push({
                        label: item.communityName,
                        value: item.id
                    })
                })
                setCommunities(communities);
            }).catch((err) => {

            })
    })


    const [productDetials, setProductDetails] = useState<any>({
        title: "",
        description: "",
        category: "",
        quantity: 0,
        price: 0,
        images: [],
        coverImage: "",
        location: "",
        estimatedWeight: 0,
        pickupDate: "",
        isNegotiable: false,
        isFree: true,
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
        receiverCommunity: "",
        estimatedPickUp: "",
        status: "UPLOADED",

    });

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
            //first upload the cover image
            if (imagePath) {
                const { image, error } = await UploadImage(
                    user?.UID,
                    imagePath.imagePath,
                    PRODUCT_STORAGE
                );
                if (error) {
                    Alert.alert(`Error uploading image for cover image. Please try again.`);
                }
                if (image) {
                    // Update imagePath for the uploaded item
                    setProductDetails((prev: { coverImage: any; }) => {
                        return { ...prev, coverImage: image };
                    });
                }
            }
            //firs upload cover image
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

                        setProductDetails((prev: { images: any; }) => {
                            const updatedImages = [...prev.images];
                            updatedImages[index] = image; // Update image at the specific index
                            return { ...prev, images: updatedImages };
                        });

                    }
                }
            }
            setCount(updatedCount); // Update the state with the uploaded images

            setUploadingImages(false);
        } catch (error) {
            setUploadingImages(false);
        }
    }, [count, setCount]);

    //product details


    const [state, setState] = useState<State>({
        activeIndex: 0,
        completedStepIndex: undefined,
        allTypesIndex: 0,

    })
    const onActiveIndexChanged = (activeIndex: number) => {
        // Update the activeIndex in the state
        setState((prevState) => ({
            ...prevState,
            activeIndex,
        }));
    };



    const goToNextStep = () => {
        const { activeIndex: prevActiveIndex, completedStepIndex: prevCompletedStepIndex } = state;
        const reset = prevActiveIndex === 2;

        if (reset) {
        } else {
            const activeIndex = prevActiveIndex + 1;
            let completedStepIndex: number | undefined = prevCompletedStepIndex;

            if (!prevCompletedStepIndex || prevCompletedStepIndex < prevActiveIndex) {
                completedStepIndex = prevActiveIndex;
            }

            // Check if the activeIndex or completedStepIndex needs updating
            if (activeIndex !== prevActiveIndex || completedStepIndex !== prevCompletedStepIndex) {
                // Update the state to move to the next step
                setState((prevState) => ({
                    ...prevState,
                    activeIndex,
                    completedStepIndex,
                }));
            }
        }
    };


    const goBack = () => {
        const { activeIndex: prevActiveIndex } = state;
        const activeIndex = prevActiveIndex === 0 ? 0 : prevActiveIndex - 1;

        setState((prevState) => ({
            ...prevState,
            activeIndex,
        }));
    };

    useEffect(() => {
        console.log("==========================");
        console.log(productDetials);
        console.log("============================");
    }, [productDetials])


    const createProduct = async () => {
        try {
            setLoading(true);
            await createDonationProduct(user?.UID, productDetials);
            setLoading(false);
            reactNativeFlashMessage.showMessage({
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
                receiverCommunity: "",
                estimatedPickUp: ""
            })

            navigation.navigate("MyProducts");

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }




    const renderCurrentStep = () => {
        switch (state.activeIndex) {
            case 0:
                return <View>

                    {
                        imagePath ? (<View>
                            <TouchableOpacity
                                onPress={() => {

                                    setShowModal(!showModal);

                                }}
                                style={[generalstyles.centerContent]}>
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
                            count.map((item: any, index: number) => (
                                <View key={item.id}>
                                    <TouchableOpacity
                                        key={item.id}
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
                    <View style={styles.buttonStyles}>
                        <Button

                            mode="contained"
                            contentStyle={{
                                flexDirection: 'row-reverse',
                            }}
                            buttonColor={reuseTheme.colors.preference.primaryForeground}
                            textColor={reuseTheme.colors.preference.primaryText}
                            onPress={uploadImagesAutomatically}
                            disabled={count.some((item: any) => item.imagePath === null) || uploadingImages}
                            loading={uploadingImages}


                        >
                            {/* Create Product */}
                            Upload Images
                        </Button>

                        <Button
                            icon={{ source: 'play', direction: 'ltr' }}
                            mode="contained"
                            contentStyle={{
                                flexDirection: 'row-reverse',
                            }}
                            style={styles.buttonSpaceStyles}
                            buttonColor={reuseTheme.colors.preference.primaryForeground}
                            textColor={reuseTheme.colors.preference.primaryText}
                            onPress={goToNextStep}
                        //disabled={count.some((item: any) => item.imagePath === null) || uploadingImages}
                        >

                            Next
                        </Button>

                    </View>
                    {/* upload all */}



                </View>; // Replace with your Step 1 component
            case 1:
                return <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        marginVertical: 10,
                        marginHorizontal: 5
                    }}
                >

                    <View
                        style={styles.viewStyles}
                    >
                        <TextField
                            style={styles.fieldStyles}
                            placeholder={'enter product name'}
                            hint={"enter product name"}
                            labelStyle={{
                                marginHorizontal: 10
                            }}
                            label='Product Name'
                            labelColor={reuseTheme.colors.preference.primaryText}
                            placeholderTextColor={reuseTheme.colors.preference.grey3}
                            color={reuseTheme.colors.preference.primaryText}

                            onChangeText={text =>
                                setProductDetails((prev: any) => {
                                    return { ...prev, title: text }
                                })

                            }
                            enableErrors
                            validate={['required']}
                            validationMessage={['Product name is required']}
                            showCharCounter
                            maxLength={30}
                        />

                    </View>


                    {/* category */}
                    <View
                        style={styles.viewStyles}
                    >
                        <Picker
                            style={styles.fieldStyles}
                            placeholder=" enter product category"
                            // floatingPlaceholder
                            label='Product Category'
                            labelColor={reuseTheme.colors.preference.primaryText}
                            placeholderTextColor={reuseTheme.colors.preference.grey3}
                            value={productDetials.category}
                            enableModalBlur={false}
                            onChange={item => {
                                setProductDetails((prev: any) => {
                                    return { ...prev, category: item }
                                })

                            }}
                            color={reuseTheme.colors.preference.primaryText}
                            topBarProps={{ title: 'Product Categories' }}

                            showSearch
                            searchPlaceholder={'Search a product category'}
                            searchStyle={{ color: reuseTheme.colors.preference.primaryForeground, placeholderTextColor: reuseTheme.colors.preference.grey3 }}
                        // onSearchChange={value => console.warn('value', value)}
                        >
                            {categories.map((item, index) => (
                                <Picker.Item key={item.value}
                                    value={item.value}
                                    label={item.label}
                                />
                            ))}
                        </Picker>
                    </View>
                    {/* category */}

                    {/* switches  */}

                    {/* free product */}
                    <View style={[generalstyles.flexStyles, { alignItems: "center", justifyContent: "center", marginVertical: 10 }]}>

                        <Switch
                            width={80}
                            height={38}
                            thumbSize={34}
                            thumbColor={reuseTheme.colors.preference.primaryBackground}
                            value={productDetials.isFree}
                            onValueChange={
                                () => {
                                    setProductDetails((prev: { isFree: any; }) => {
                                        return { ...prev, isFree: !prev.isFree }
                                    })
                                }
                            }
                            onColor={reuseTheme.colors.preference.primaryForeground}
                        />
                        <Text style={{ marginHorizontal: 10 }}>Is Product free of Charge  ?</Text>
                    </View>

                    {/* free product */}

                    {
                        !productDetials.isFree && (<View style={[generalstyles.flexStyles, { alignItems: "center", justifyContent: "center", marginVertical: 10 }]}>

                            <Switch
                                width={80}
                                height={38}
                                thumbSize={34}
                                thumbColor={reuseTheme.colors.preference.primaryBackground}
                                value={productDetials.isDeliveryFeeCovered}
                                onValueChange={
                                    () => {
                                        setProductDetails((prev: { isDeliveryFeeCovered: any; }) => {
                                            return { ...prev, isDeliveryFeeCovered: !prev.isDeliveryFeeCovered }
                                        })
                                    }
                                }
                                onColor={reuseTheme.colors.preference.primaryForeground}
                            />
                            <Text style={{ marginHorizontal: 10 }}>Is  Delivery Fee  Covered    ?</Text>
                        </View>)
                    }


                    {/* for all */}
                    <View style={[generalstyles.flexStyles, { alignItems: "center", justifyContent: "center", marginVertical: 10 }]}>
                        <Switch
                            width={80}
                            height={38}
                            thumbSize={34}
                            thumbColor={reuseTheme.colors.preference.primaryBackground}
                            value={productDetials.isProductAvailableForAll}
                            onValueChange={
                                () => {
                                    setProductDetails((prev: { isProductAvailableForAll: any; }) => {
                                        return { ...prev, isProductAvailableForAll: !prev.isProductAvailableForAll }
                                    })
                                }
                            }
                            onColor={reuseTheme.colors.preference.primaryForeground}
                        />
                        <Text style={{ marginHorizontal: 10 }}>Is Product Available For All ?</Text>
                    </View>
                    {/* for all */}

                    {/* product new */}
                    <View style={[generalstyles.flexStyles, { alignItems: "center", justifyContent: "center", marginVertical: 10 }]}>
                        <Switch
                            width={80}
                            height={38}
                            thumbSize={34}
                            thumbColor={reuseTheme.colors.preference.primaryBackground}
                            value={productDetials.isProductNew}
                            onValueChange={
                                () => {
                                    setProductDetails((prev: { isProductNew: any; }) => {
                                        return { ...prev, isProductNew: !prev.isProductNew }
                                    })
                                }
                            }
                            onColor={reuseTheme.colors.preference.primaryForeground}
                        />
                        <Text style={{ marginHorizontal: 10 }}>Is the Created Product New ?</Text>
                    </View>
                    {/* product new */}

                    {/* damages */}
                    <View style={[generalstyles.flexStyles, { alignItems: "center", justifyContent: "center", marginVertical: 10 }]}>
                        <Switch
                            width={80}
                            height={38}
                            thumbSize={34}
                            thumbColor={reuseTheme.colors.preference.primaryBackground}
                            value={productDetials.isProductDamaged}
                            onValueChange={
                                () => {
                                    setProductDetails((prev: { isProductDamaged: any; }) => {
                                        return { ...prev, isProductDamaged: !prev.isProductDamaged }
                                    })
                                }
                            }
                            onColor={reuseTheme.colors.preference.primaryForeground}
                        />
                        <Text style={{ marginHorizontal: 10 }}> Product has any damages ?</Text>
                    </View>
                    {/* damages */}

                    {/* switches */}

                    <View>
                        {
                            productDetials.isProductDamaged && (
                                <TextArea
                                    placeholder="Tell us about the damage"
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
                    </View>

                    {/* product price  */}
                    {
                        !productDetials.isFree && (
                            <View style={styles.viewStyles}>
                                <NumberInput

                                    leadingText={"shs"}
                                    leadingTextStyle={{
                                        fontSize: 30,
                                        color: reuseTheme.colors.preference.primaryText,
                                        marginRight: 10

                                    }}
                                    textFieldProps={{
                                        label: "Price",
                                        labelColor: reuseTheme.colors.preference.primaryText,
                                        //style: styles.fieldStyles,
                                        color: reuseTheme.colors.preference.primaryText


                                    }}
                                    // fractionDigits={2}
                                    // initialNumber={productDetials.price}
                                    onChangeNumber={(data: NumberInputData) => {
                                        setProductDetails((prev: any) => {
                                            return { ...prev, price: data }
                                        })

                                    }}
                                    containerStyle={styles.fieldStyles}

                                />

                            </View>
                        )
                    }
                    {/* product price */}

                    {/* community */}
                    {
                        !productDetials.isProductAvailableForAll && (<View
                            style={styles.viewStyles}
                        >
                            <Picker
                                style={styles.fieldStyles}
                                placeholder="enter community "
                                // floatingPlaceholder
                                label='Community'
                                labelColor={reuseTheme.colors.preference.primaryText}

                                placeholderTextColor={reuseTheme.colors.preference.grey3}
                                value={productDetials.receiverCommunity}
                                enableModalBlur={false}
                                onChange={item => {
                                    setProductDetails((prev: any) => {
                                        return { ...prev, receiverCommunity: item }
                                    })
                                }}
                                color={reuseTheme.colors.preference.primaryText}
                                topBarProps={{ title: 'Available Communities' }}

                                showSearch
                                searchPlaceholder={'Search for a community'}
                                searchStyle={{ color: reuseTheme.colors.preference.primaryForeground, placeholderTextColor: reuseTheme.colors.preference.grey3 }}

                            >
                                {communities.map((item, index) => (
                                    <Picker.Item key={item.value}
                                        value={item.value}
                                        label={item.label}
                                    //   disabled={option.disabled}
                                    />
                                ))}
                            </Picker>
                        </View>)

                    }


                    {/* community */}

                    {/* estimated weight */}
                    <View
                        style={styles.viewStyles}
                    >
                        <TextField
                            style={styles.fieldStyles}
                            placeholder={'enter estimated weight in(kgs)'}
                            hint={"enter estimated  weight"}
                            labelStyle={{
                                marginHorizontal: 10
                            }}
                            label='Estimated Weight(kgs)'
                            labelColor={reuseTheme.colors.preference.primaryText}
                            placeholderTextColor={reuseTheme.colors.preference.grey3}
                            color={reuseTheme.colors.preference.primaryText}

                            onChangeText={text =>
                                setProductDetails((prev: any) => {
                                    return { ...prev, estimatedWeight: text }
                                })

                            }
                            enableErrors
                            validate={['required']}
                            validationMessage={['Estimated  weight name is required']}
                            showCharCounter
                            maxLength={30}
                        />

                    </View>

                    {/* estimated weight */}

                    {/* estimated pick up date */}
                    <View style={styles.viewStyles}>
                        <DateTimePicker
                            // title={'Select time'}
                            label={"Estimated Pick Up Date"}
                            labelColor={reuseTheme.colors.preference.primaryText}
                            placeholder={"select estimated pick up date"}
                            placeholderTextColor={reuseTheme.colors.preference.grey3}
                            mode={'date'}
                            onChange={date =>
                                setProductDetails((prev: any) => {
                                    return { ...prev, pickupDate: date }
                                })
                            }
                            style={styles.fieldStyles}
                            color={reuseTheme.colors.preference.primaryText}

                        />
                    </View>

                    {/* estimated pick up  date*/}

                    <View>
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
                    </View>

                    <View style={styles.buttonStyles}>

                        <Button
                            icon={{ source: 'play', direction: 'rtl' }}
                            mode="contained"

                            style={styles.buttonSpaceStyles}
                            buttonColor={reuseTheme.colors.preference.primaryForeground}
                            textColor={reuseTheme.colors.preference.primaryText}
                            onPress={goBack}
                        >

                            Prev
                        </Button>

                        <Button
                            icon={{ source: 'play', direction: 'ltr' }}
                            mode="contained"
                            contentStyle={{
                                flexDirection: 'row-reverse',
                            }}
                            style={styles.buttonSpaceStyles}
                            buttonColor={reuseTheme.colors.preference.primaryForeground}
                            textColor={reuseTheme.colors.preference.primaryText}
                            onPress={goToNextStep}
                        //disabled={count.some((item: any) => item.imagePath === null) || uploadingImages}
                        >

                            Next
                        </Button>

                    </View>
                </ScrollView>

            case 2:
                return <View>

                    <View
                        style={styles.viewStyles}
                    >
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            style={generalstyles.container}
                        >
                            <View style={{
                                height: 400,
                                marginVertical: 20
                            }}>
                                <UserLocation
                                    placeholder={"Enter estimated pick up location"}
                                    // setPickUpAddress={setProductDetails}
                                    onPress={(data: any, details = null) => {
                                        // 'details' is provided when fetchDetails = true



                                        fetch(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${data?.place_id}&key=${API_KEY}`)
                                            .then((response) => response.json())
                                            .then((data) => {
                                                if (data.results && data.results.length > 0) {
                                                    const address = {
                                                        data,
                                                        details,
                                                        location: data.results[0].geometry.location
                                                    }

                                                    setProductDetails((prev: any) => {
                                                        return { ...prev, estimatedPickUp: address }
                                                    })
                                                }
                                                else {

                                                    const address = {
                                                        data,
                                                        details,

                                                    }

                                                    setProductDetails((prev: any) => {
                                                        return { ...prev, estimatedPickUp: address }
                                                    })

                                                }


                                            })
                                            .catch((error) => {
                                                console.error("Error fetching coordinates:", error);
                                            });


                                    }
                                    }
                                />

                                <View style={styles.buttonStyles}>

                                    <Button
                                        icon={{ source: 'play', direction: 'rtl' }}
                                        mode="contained"

                                        style={styles.buttonSpaceStyles}
                                        buttonColor={reuseTheme.colors.preference.primaryForeground}
                                        textColor={reuseTheme.colors.preference.primaryText}
                                        onPress={goBack}
                                    >

                                        Prev
                                    </Button>

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

                                        {loading ? "Creating ..." : "Create Product"}
                                    </Button>
                                    {/* button */}

                                </View>



                            </View>

                        </KeyboardAvoidingView>
                    </View>

                </View>;
            default:
                return null;
        }
    };

    const getStepState = (index: number) => {
        const { activeIndex, completedStepIndex } = state;
        let stepState = Wizard.States.DISABLED;

        if (completedStepIndex && completedStepIndex > index - 1) {
            stepState = Wizard.States.COMPLETED;
        } else if (activeIndex === index || completedStepIndex === index - 1) {
            stepState = Wizard.States.ENABLED;
        }

        return stepState;
    };





    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: reuseTheme.colors.preference.primaryBackground,
                marginVertical: 10,
                marginHorizontal: 5
            }}
        >

            {/* Wizard for your main steps */}
            <Wizard testID={'uilib.wizard'}
                activeIndex={state.activeIndex} onActiveIndexChanged={onActiveIndexChanged}
                containerStyle={{
                    marginHorizontal: 0,
                    marginVertical: 10,
                    borderRadius: 20,
                    backgroundColor: reuseTheme.colors.preference.primaryText
                }}
                activeConfig={
                    {
                        color: reuseTheme.colors.preference.primaryText,
                        state: WizardStepStates.ENABLED,
                        circleSize: 30,
                        circleBackgroundColor: reuseTheme.colors.preference.primaryBackground,
                        circleColor: reuseTheme.colors.preference.primaryBackground,


                    }

                }

            >
                <Wizard.Step
                    state={getStepState(0)}
                    label={'Image Upload'}
                    enabled={true}

                />
                <Wizard.Step state={getStepState(1)} label={'Product Information'} />
                <Wizard.Step state={getStepState(2)} label={'Pick Up'} />
            </Wizard>

            {/* Render the current step */}
            {renderCurrentStep()}

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

    buttonStyles: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        marginHorizontal: 20
    },
    buttonSpaceStyles: {
        marginHorizontal: 10
    },
    modalStyles: {
        backgroundColor: theme.colors.preference.primaryBackground
    },
    fieldStyles: {
        borderBottomColor: theme.colors.preference.primaryText,
        borderBottomWidth: 2
    },
    viewStyles: {
        marginHorizontal: 20,
        marginVertical: 10,
        height: 60
    }
})