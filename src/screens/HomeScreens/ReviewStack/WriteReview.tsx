import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { Slider } from '@miblanchard/react-native-slider';
import { theme } from '../../../theme/theme';
import { generalstyles } from '../../../generalstyles/generalstyles';
import TextArea from '../../../components/TextArea';

const WriteReview = () => {
  const [rater, setRater] = useState<any>(1.0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
      <ScrollView>
        {/* bar */}
        <View style={[generalstyles.centerContent, { marginHorizontal: 10 }]}>
          <View style={{ marginLeft: 150 }}>
            <Text
              style={{
                color: theme.colors.white,
                fontSize: 15,
                fontWeight: 'bold',
              }}
            >
              {/*  */}
            </Text>
          </View>
          {/* rater */}
          <View style={styles.sliderStyles}>
            <Slider
              value={rater}
              onValueChange={value => setRater(value)}
              minimumValue={0}
              maximumValue={5}
              step={0.2}
              thumbTintColor={theme.colors.buttonColor}
              containerStyle={{
                marginHorizontal: 10,
                borderRadius: 10,
              }}
              trackStyle={{
                height: 25,
                borderRadius: 20,
                backgroundColor: theme.colors.transparent,
              }}
              minimumTrackTintColor={theme.colors.buttonColor}
              maximumTrackTintColor={theme.colors.buttonColor}
              thumbStyle={{
                width: 30,
                height: 25,
              }}
              renderAboveThumbComponent={() => (
                <View style={{ width: 30, height: 25, borderRadius: 20 }}>
                  <Text
                    style={{
                      color: theme.colors.white,
                      fontSize: 15,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    {Math.round(rater * 10) / 10}
                  </Text>
                </View>
              )}
            />
          </View>
          {/* rater */}
        </View>
        {/* bar */}
        {/* text area */}
        <TextArea />
        {/* text area */}
        {/* button */}
        <View>
          <Button
            mode="contained"
            contentStyle={{
              flexDirection: 'row-reverse',
            }}
            style={{
              marginHorizontal: 40,
              marginVertical: 20,
            }}
            //  loading={true}
            buttonColor={theme.colors.buttonColor}
            textColor={theme.colors.primary}
            onPress={() => console.log('Pressed')}
          >
            Send
          </Button>
        </View>
        {/* button */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WriteReview;

const styles = StyleSheet.create({
  sliderStyles: {
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    width: '100%',
    height: 50,
    borderRadius: 10,
    marginHorizontal: 40,
  },
});
