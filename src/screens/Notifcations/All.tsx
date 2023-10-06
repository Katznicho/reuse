import { SafeAreaView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import ReviewTypes from '../../components/ReviewTypes';
import { NotificationInterface } from '../../types/types';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import NotificationCard from '../../components/NotificationCard';

/**
 * Renders the Recent component.
 *
 * @return {JSX.Element} The rendered Recent component.
 */
const All = (): JSX.Element => {

    const { reuseTheme } = useUserPreferredTheme();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [details] = useState([
        {
            name: 'Recent',
            screen: 'Recent',
        },
        {
            name: 'Events',
            screen: 'Events',
        },
        {
            name: 'All',
            screen: 'All',
        },
    ]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [notifications,] = useState<NotificationInterface[]>([
        {
            type: 'Congratulations All',
            description:
                'Your payment was successful please check your email for more details',
            time: '9:45 AM',
            id: 1,
        },
        {
            type: 'Attention',
            description:
                'Your product   has been accepted please check your email for more details',
            time: '8:00 PM',
            id: 2,
        },
        {
            type: 'New',
            description: 'New notification',
            time: '10:00 AM',
            id: 3,
        },
    ]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: reuseTheme.colors.preference.primaryBackground }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* notification type */}
                <ReviewTypes name="All" data={details} />
                {/* notification type */}
                {/* notification details */}
                {notifications.map((item, index) => {
                    return (
                        <NotificationCard
                            key={item.id}
                            type={item.type}
                            description={item.description}
                            time={item.time}
                            id={item.id}
                        />
                    );
                })}
                {/* notification details */}
            </ScrollView>
        </SafeAreaView>
    )
}

export default All
