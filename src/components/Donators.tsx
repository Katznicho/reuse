import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Box from './Box';
import { dynamicGeneralStyles } from '../utils/generalstyles/dynamicGeneralStyles';
import { useUserPreferredTheme } from '../hooks/useUserPreferredTheme';
import { ReuseTheme } from '../types/types';


// Define the Donator interface
interface Donator {
    id: string;
    avatar: string;
    firstName: string;
    lastName: string;
    totalfollowers: number;
}


const Donaters = () => {

    const { reuseTheme } = useUserPreferredTheme();
    const generalstyles = dynamicGeneralStyles(reuseTheme);
    const styles = donatorStyles(reuseTheme);


    const [donaters, setDonaters] = useState<Donator[]>([]);

    // Generate dummy data for the donators array
    useEffect(() => {
        const dummyDonaters: Donator[] = [
            {
                id: '1',
                avatar: 'https://dummyurl.com/avatar1.jpg',
                firstName: 'John',
                lastName: 'Doe',
                totalfollowers: 1000,
            },
            {
                id: '2',
                avatar: 'https://dummyurl.com/avatar2.jpg',
                firstName: 'Jane',
                lastName: 'Smith',
                totalfollowers: 500,
            },
            // Add more dummy donators as needed...
        ];

        setDonaters(dummyDonaters);
    }, []);


    const navigation = useNavigation<any>();




    return (
        <View >

            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                {donaters.map(donator => (
                    <TouchableOpacity
                        style={[generalstyles.centerContent, styles.containerStyle]}
                        key={donator.id}
                        onPress={() =>
                            navigation.navigate('DonaterDetails', { item: donator })
                        }
                    >
                        <View>
                            <Avatar.Image
                                size={120}
                                source={{
                                    uri: donator?.avatar,
                                }}
                            />
                            {/* details */}
                            <View
                                style={[
                                    generalstyles.centerContent,
                                    { marginTop: 10 },
                                    generalstyles.flexStyles,
                                ]}
                            >
                                <Text
                                    style={{
                                        color: reuseTheme.colors.preference.primaryText,
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {`${donator?.firstName} ${donator?.lastName}`}
                                </Text>

                            </View>
                            <View style={[generalstyles.centerContent]}>
                                <Box rating={donator?.totalfollowers} />
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default Donaters;

export const donatorStyles = (theme: ReuseTheme) => StyleSheet.create({
    trainerTitle: {
        color: theme.colors.preference.primaryText,
        fontSize: 20,
        fontWeight: 'bold',
    },
    containerStyle: {
        marginHorizontal: 5,
    },
});
