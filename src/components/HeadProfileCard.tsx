import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';

import { showMessage } from 'react-native-flash-message';
import { DEFAULT_USER_PROFILE, PROFILE_STORAGE } from '../utils/constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/dev';
import { UploadImage } from '../hooks/UploadImage';
import { useUserPreferredTheme } from '../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../utils/generalstyles/dynamicGeneralStyles';
import { ReuseTheme } from '../types/types';
import UploadComponent from './UploadComponent';
import { Avatar, IconButton } from 'react-native-paper';

const HeadProfileCard = () => {

    const {reuseTheme} =  useUserPreferredTheme();
    const generalstyles = dynamicGeneralStyles(reuseTheme);
    const styles = cardStyles(reuseTheme);


  const { user, isLoggedIn } = useSelector((state: RootState) => state.user);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [imagePath, setImagePath] = useState<any | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const handleUpload = async () => {
    try {
      const { error, image } = await UploadImage(
        user?.uid,
        imagePath.imagePath,
        PROFILE_STORAGE,
      );
      if (error) {
        Alert.alert('Something went wrong please try aagin');
      }
      if (image) {
        const data_avatar = new FormData();
        data_avatar.append('avatar', image);

        setImagePath(null);
      }
    } catch (error: any) {
      showMessage({
        message: error.response.data.message,
        description: error.response.data.error,
        type: 'danger',
        icon: 'danger',
        duration: 3000,
        floating: true,
      });
    }
  };

  useEffect(() => {}, [imagePath]);

  return (
    <View style={[generalstyles.flexStyles]}>
      <TouchableOpacity
        style={[{ marginHorizontal: 20 }]}
        onPress={() => {
          if (isLoggedIn) {
            setShowModal(!showModal);
          }
        }}
      >
        {imagePath ? (
          <View>
            <Avatar.Image
              size={80}
              source={{
                uri: `${imagePath.imagePath}`,
              }}
            />
            <View
              style={[generalstyles.absoluteStyles, { bottom: -6, right: -15 }]}
            >
              <IconButton
                icon="upload"
                iconColor={reuseTheme.colors.preference.primaryText}
                size={30}
                onPress={handleUpload}
                containerColor={reuseTheme.colors.preference.primaryForeground}
              />
            </View>
          </View>
        ) : (
          <Avatar.Image
            size={80}
            source={{
              uri: `${
                user?.displayPicture
                  ? user?.displayPicture
                  : DEFAULT_USER_PROFILE
              }
            `,
            }}
          />
        )}
      </TouchableOpacity>

      <View style={styles.viewStyles}>
        <Text style={styles.nameStyle}>{
          //check if user is not null otherwise show hello Guest
          `${user?.fname ?? 'Hello'} ${user?.lname ?? 'Guest'}`
        }</Text>
      </View>

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
    </View>
  );
};

export default HeadProfileCard;

const cardStyles = (theme:ReuseTheme)=> StyleSheet.create({
  nameStyle: { fontSize: 25, fontWeight: 'bold', color: theme.colors.preference.primaryText},

  viewStyles: { marginTop: 20, marginLeft: -10 },
});
