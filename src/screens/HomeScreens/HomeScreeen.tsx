import {  View, SafeAreaView, ScrollView } from 'react-native'
import React, { useState , useEffect} from 'react'
import { FAKE_PRODUCTS } from '../../fakedata/data'
import { dynamicGeneralStyles } from '../../utils/generalstyles/dynamicGeneralStyles';
import SearchComponent from '../../components/SearcComponent';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import TextTypes from '../../components/TextType/TextTypes';
import ScrollCard from '../../components/ScrollCard';
import Donaters from '../../components/Donators';



const HomeScreeen = () => {

  const {reuseTheme} =  useUserPreferredTheme();
  const generalstyles = dynamicGeneralStyles(reuseTheme);

   const [products, setProducts] = useState<any[]>([]);

  async function getProducts() {
    try {

      setProducts(FAKE_PRODUCTS);
      return products;
    } catch (err:any) {
      console.error('Error fetching products', JSON.stringify(err.message));
      return [];
    }
  }
  

  useEffect(()=>{
    getProducts();
  },[products])

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
        {/* <Categories /> */}
        {/* categories */}

        {/* most receommended */}
        <TextTypes text="Our Recommendations"  />
        {
          products.length>0 && <ScrollCard cardProducts={products} />
        }

        {/* most recommended */}

        {/* popular */}
        <TextTypes text="Most Popular" />
        {
          products.length>0 && <ScrollCard cardProducts={products} />
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

