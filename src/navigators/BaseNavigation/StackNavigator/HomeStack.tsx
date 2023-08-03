
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreeen from '../../screens/HomeScreens/HomeScreeen';
import { APP_NAME } from '../../constants/constants';
import { theme } from '../../theme/theme';
import AppBar from '../../components/AppBars/AppBar';
import AllDonaters from '../../screens/HomeScreens/AllDonaters';
import SearchAppBar from '../../components/AppBars/SearchBar';
import DonaterDetails from '../../screens/HomeScreens/DonaterDetails';
import ReviewStack from '../../screens/HomeScreens/ReviewStack/ReviewStack';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import WriteReview from '../../screens/HomeScreens/ReviewStack/WriteReview';
import ProductDetails from '../../screens/HomeScreens/ProductDetails';



const Stack = createNativeStackNavigator();

function HomeStack() {

  const navigation = useNavigation<any>();

  return (

    <Stack.Navigator>

      <Stack.Screen
        name="HomeSCreen"
        component={HomeScreeen}
        options={({ route }) => ({
          header: props => (
            <AppBar
              showSearch
              {...props}
              title={APP_NAME}
              barStyle={{
                width: '100%',
                elevation: 0,
              }}
              titleStyle={{
                alignSelf: 'center',
                color: `${theme.colors.textColor}`,
              }}
            />
          ),
        })}
      />

      <Stack.Screen
        name="AllDonaters"
        component={AllDonaters}
        options={({ route }) => ({
          header: props => (
            <SearchAppBar
              {...props}
              placeholder={'search for donaters'}
              previous={true}
              searchStyles={{
                elevation: 4,
                borderRadius: 25,
                marginTop: 5,
                marginBottom: 10,
                marginLeft: -8,
                marginRight: 25,
                backgroundColor: theme.colors.darkBlack,
                height: 50,
                color: `${theme.colors.white}`,
                width: theme.dimensions.width - 80,
              }}
            />
          ),
        })}
      />

      <Stack.Screen
        name="DonaterDetails"
        component={DonaterDetails}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="Reviews"
        component={ReviewStack}
        options={{
          title: 'Reviews',
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTitleStyle: {
            fontSize: 30,
          },
          headerTintColor: theme.colors.white,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <IconButton
              icon="chevron-left"
              iconColor={theme.colors.white}
              size={28}
              onPress={() => navigation.goBack()}
              containerColor={theme.colors.arraowBackGroundColor}
            />
          ),
        }}
      />

      {/* write a review */}
      <Stack.Screen
        name="WriteReview"
        component={WriteReview}
        options={{
          title: 'Write a Review',
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTitleStyle: {
            fontSize: 25,
          },
          headerTintColor: theme.colors.white,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <IconButton
              icon="chevron-left"
              iconColor={theme.colors.white}
              size={28}
              onPress={() => navigation.goBack()}
              containerColor={theme.colors.arraowBackGroundColor}
            />
          ),
        }}
      />

      {/* write a review */}

      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          headerShown: false
        }}
      />




    </Stack.Navigator>

  );
}

export default HomeStack