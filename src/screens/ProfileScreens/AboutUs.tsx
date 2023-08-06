import { SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import TextComponent from '../../components/TextComponent';


const AboutUs = () => {
  const {reuseTheme} =  useUserPreferredTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: reuseTheme.colors.preference.primaryBackground }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TextComponent />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutUs;
