import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SwiperText from '../../components/SwiperText/SwiperText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { dynamicGeneralStyles  } from '../../utils/generalstyles/dynamicGeneralStyles';
import { dynamicBaseStyles } from './baseStyles';
import GenderScreen from './GenderScreen';
import AppUserType from './AppUserType';
import Interests from './Interests';
import { useDispatch } from 'react-redux';
import { setAppIntro } from '../../redux/store/slices/UserSlice';




export interface UserProfile {
  gender?: string | null
  reuserType?: string | number | null

}
export interface SwiperScreenProps {
  setUserProfile: Dispatch<SetStateAction<UserProfile>>;
}
export interface ActivityLevelScreenProps {
  setUserProfile: Dispatch<SetStateAction<UserProfile>>;
}



const SwiperScreen = () => {


  const [disabled, setDisabled] = useState<boolean>(false);
  const [finish, setFinish] = useState<string>('Finish');
  const dispatch = useDispatch();

  const  {reuseTheme} =  useUserPreferredTheme();
  const generalStyles = dynamicGeneralStyles(reuseTheme);
  const styles = dynamicBaseStyles(reuseTheme)


  const [profileDetails, setProfileDetails] = useState<UserProfile>({
     gender: null,
    reuserType: null,

  })



  const [slides, _] = useState<any>([
    {
      key: 1,
      page: <GenderScreen setUserProfile={setProfileDetails} />,
    },
    {
      key: 2,
      page: <AppUserType setUserProfile={setProfileDetails} />,
    },
    {
      key: 3,
      page: <Interests/>,
    },
    

  ])



  const renderSlide = ({ item, index }: any) => {
    // if (index === slides.length - 1) {
    //   return (
    //     <ScrollView style={{ flex: 1, backgroundColor: reuseTheme.colors.preference.primaryBackground }} keyboardShouldPersistTaps="always">
    //       {/* text area */}
    //       <SwiperText
    //         headerText={`Your Now Set`}
    //         smallText={`Please confirm the details below to continue`}

    //       />
    //       <View style={{marginHorizontal:20}}>
            

    //         {/* gender */}
    //         <View style={styles.viewStyles}>
    //           <Text style={styles.maintext}>Gender </Text>
    //           <Text style={styles.detailstext}>{profileDetails.gender}</Text>
    //         </View>
            
    //         {/* gendrer */}




    //       </View>


    //     </ScrollView>
    //   );
    // }
    return <>{item.page}</>;
  };


  const onDone = async () => {
    // User finished the introduction. Show real app through
    try {
      setFinish("loading...")
      setDisabled(true)
 
      dispatch(setAppIntro());
      


    }
    catch (error: any) {
 
      
      setFinish("Finish");
      setDisabled(false)
    }

  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderSlide}
      onDone={onDone}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      dotClickEnabled={false}
      showSkipButton={false}
      showNextButton={true}
      showDoneButton={true}
      showPrevButton={true}
      scrollEnabled={true}
      renderNextButton={() => (
        <View style={[generalStyles.flexStyles, styles.nextStyles]}>
          <Text style={styles.textStyles}>Next</Text>
          <MaterialCommunityIcons
            name="play"
            size={30}
            color={reuseTheme.colors.preference.primaryForeground}
          />
        </View>
      )}
      dotStyle={{
        backgroundColor: reuseTheme.colors.preference.primaryBackground,
      }}
      activeDotStyle={{
        backgroundColor: reuseTheme.colors.preference.primaryBackground,
      }}
      renderPrevButton={() => (
        <View style={[styles.backStyles]}>
          <AntDesign name="arrowleft" size={30} color={reuseTheme.colors.preference.primaryText} />
        </View>
      )}
      renderDoneButton={() => (
        <TouchableOpacity
          style={[generalStyles.flexStyles, styles.nextStyles]}
          onPress={onDone}
          disabled={disabled}
        >
          <Text style={styles.textStyles}>{finish}</Text>
          <MaterialCommunityIcons
            name="play"
            size={30}
            color={reuseTheme.colors.preference.primaryForeground}
          />
        </TouchableOpacity>
      )}
    />
  );
};

export default SwiperScreen;


