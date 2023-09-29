import {  View, SafeAreaView, ScrollView, Alert } from 'react-native'
import React, { useState , useEffect} from 'react'
import { FAKE_PRODUCTS } from '../../fakedata/data'
import { dynamicGeneralStyles } from '../../utils/generalstyles/dynamicGeneralStyles';
import SearchComponent from '../../components/SearcComponent';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import TextTypes from '../../components/TextType/TextTypes';
import ScrollCard from '../../components/ScrollCard';
import Donaters from '../../components/Donators';
import Categories from '../../components/Categoris';
import Geolocation from '@react-native-community/geolocation';
import { useFirebase } from '../../hooks/useFirebase';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/dev';
import { ActivityIndicator } from '../../components/ActivityIndicator';



const HomeScreeen = () => {

  const {reuseTheme} =  useUserPreferredTheme();
  const generalstyles = dynamicGeneralStyles(reuseTheme);
  const {user} =  useSelector((state:RootState) => state.user);


  const {updateUserLocation} = useFirebase();

   const [products, setProducts] = useState<any[]>([]);
   const [loading , setLoading] =  useState<boolean>(false);
   const {getAllProducts} = useFirebase();



   const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
        (pos) => {

            const {latitude , longitude } = pos.coords;
            setPosition({ latitude, longitude });
        },
        (error) => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
        { enableHighAccuracy: true, }
    );
};

useEffect(() => {
  setLoading(true);
   getAllProducts().then((products)=>{
     setProducts(products);
   })
   setLoading(false);
  getCurrentPosition();
  if(position){
    updateUserLocation(user?.UID, position.latitude, position.longitude);
  }


}, []);

const [position, setPosition] = useState<any>(null);






  const [searchQuery, setSearchQuery] = useState('');
  return (
    <SafeAreaView style={generalstyles.container}>

      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingBottom: 100 }}>
              {/* search component */}
      <View style={[generalstyles.centerContent]}>
        <SearchComponent
          placeholder="search for properties"
          value={searchQuery}
          searchStyles={{
            elevation: 4,
            borderRadius: 25,
            marginTop: 15,
            marginBottom: 5,
            height: 55,
            backgroundColor: reuseTheme.colors.preference.primaryBackground,
            color: `${reuseTheme.colors.preference.primaryText}}`,
            width: '90%',
          }}
          onSearchChange={(query: any) => {

            setSearchQuery(query);
          }}
        />
      </View>
      {/* search component */}
        {/* categories */}
        <TextTypes text="Your Favourites" />
        <Categories />
        {/* categories */}

        {/* most receommended */}
        <TextTypes text="Our Recommendations"  />
        {

          products.length? <ScrollCard cardProducts={products} />:
          <ActivityIndicator/>
        }

        {/* most recommended */}

        {/* popular */}
        <TextTypes text="Most Popular" />
        {

products.length? <ScrollCard cardProducts={products} />:
<ActivityIndicator/>
}
        {/* popular */}

        {/* nearby */}
        <TextTypes text="Near by You" />
        {
          products.length>0 && <ScrollCard cardProducts={products} />
        }
        {/* nearby */}

        {/* nearby */}
        <TextTypes text="Most Searched" />
        {
          products.length>0 && <ScrollCard cardProducts={products} />
        }
        {/* nearby */}

        {/* top donaters */}
        <TextTypes text="Top Donaters"  screen="AllDonaters"/>
        <Donaters />
        {/* top donaters */}

      </ScrollView>


    </SafeAreaView>
  )
}

export default HomeScreeen

