// import { SafeAreaView, ScrollView } from 'react-native';
// import React, { useState } from 'react';
// import ReviewTypes from '../../components/ReviewTypes';
// import { NotificationInterface } from '../../types/types';
// import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
// import NotificationCard from '../../components/NotificationCard';


// const New = () => {
//   const {reuseTheme} =  useUserPreferredTheme();
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [details, setDetails] = useState([
//     {
//       name: 'New',
//       screen: 'New',
//     },
//     {
//       name: 'Events',
//       screen: 'Events',
//     },
//     {
//       name: 'All',
//       screen: 'All',
//     },
//   ]);

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [notifications, setNotifications] = useState<NotificationInterface[]>([
//     {
//       type: 'Congratulations',
//       description:
//         'Your payment was successful please check your email for more details',
//       time: '9:45 AM',
//       id: 1,
//     },
//     {
//       type: 'Attention',
//       description:
//         'Your subscription is about to expire please renew your subscription',
//       time: '8:00 PM',
//       id: 2,
//     },
//     {
//       type: 'New',
//       description: 'New notification',
//       time: '10:00 AM',
//       id: 3,
//     },
//   ]);

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: reuseTheme.colors.preference.primaryBackground }}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* notification type */}
//         <ReviewTypes name="New" data={details} />
//         {/* notification type */}

//         {/* notification details */}
//         {notifications.map((item, index) => {
//           return (
//             <NotificationCard
//               key={index}
//               type={item.type}
//               description={item.description}
//               time={item.time}
//               id={item.id}
//             />
//           );
//         })}
//         {/* notification details */}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default New;


// import { ScrollView, SafeAreaView } from 'react-native';
// import React, { useState } from 'react';
// import ReviewTypes from '../../components/ReviewTypes';
// import { NotificationInterface } from '../../types/types';
// import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
// import NotificationCard from '../../components/NotificationCard';



// const Events = () => {

//   const {reuseTheme} =  useUserPreferredTheme();

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [details, setDetails] = useState([
//     {
//       name: 'New',
//       screen: 'New',
//     },
//     {
//       name: 'Events',
//       screen: 'Events',
//     },
//     {
//       name: 'All',
//       screen: 'All',
//     },
//   ]);

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [notifications, setNotifications] = useState<NotificationInterface[]>([
//     {
//       type: 'Congratulations',
//       description:
//         'Your payment was successful please check your email for more details',
//       time: '9:45 AM',
//       id: 1,
//     },
//     {
//       type: 'Attention',
//       description:
//         'Your subscription is about to expire please renew your subscription',
//       time: '8:00 PM',
//       id: 2,
//     },
//     {
//       type: 'New',
//       description: 'New notification',
//       time: '10:00 AM',
//       id: 3,
//     },
//   ]);

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: reuseTheme.colors.preference.primaryBackground }}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* notification type */}
//         <ReviewTypes name="Events" data={details} />
//         {/* notification type */}
//         {/* notification details */}
//         {notifications.map((item, index) => {
//           return (
//             <NotificationCard
//               key={index}
//               type={item.type}
//               description={item.description}
//               time={item.time}
//               id={item.id}
//             />
//           );
//         })}
//         {/* notification details */}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Events;



// import { ScrollView, SafeAreaView } from 'react-native';
// import React, { useState } from 'react';
// import ReviewTypes from '../../components/ReviewTypes';
// import { NotificationInterface } from '../../types/types';
// import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
// import NotificationCard from '../../components/NotificationCard';


// const All = () => {
//   const {reuseTheme} =  useUserPreferredTheme();
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [details, setDetails] = useState([
//     {
//       name: 'New',
//       screen: 'New',
//     },
//     {
//       name: 'Events',
//       screen: 'Events',
//     },
//     {
//       name: 'All',
//       screen: 'All',
//     },
//   ]);

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [notifications, setNotifications] = useState<NotificationInterface[]>([
//     {
//       type: 'Congratulations',
//       description:
//         'Your payment was successful please check your email for more details',
//       time: '9:45 AM',
//       id: 1,
//     },
//     {
//       type: 'Attention',
//       description:
//         'Your subscription is about to expire please renew your subscription',
//       time: '8:00 PM',
//       id: 2,
//     },
//     {
//       type: 'New',
//       description: 'New notification',
//       time: '10:00 AM',
//       id: 3,
//     },
//   ]);

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: reuseTheme.colors.preference.primaryBackground }}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* notification type */}
//         <ReviewTypes name="All" data={details} />
//         {/* notification type */}
//         {/* notification details */}
//         {notifications.map((item, index) => {
//           return (
//             <NotificationCard
//               key={index}
//               type={item.type}
//               description={item.description}
//               time={item.time}
//               id={item.id}
//             />
//           );
//         })}
//         {/* notification details */}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default All;