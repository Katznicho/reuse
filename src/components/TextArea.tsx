import { StyleSheet, View, TextInput } from 'react-native';
import React, { useState } from 'react'
import { ReuseTheme } from '../types/types';
import { useUserPreferredTheme } from '../hooks/useUserPreferredTheme';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TextArea = () => {
    const {reuseTheme} =  useUserPreferredTheme();
    const styles = textStyles(reuseTheme);
    const [text, setText] = useState<any>('');
  return (
    <View style={[styles.textareaContainer]}>
       <TextInput
        style={styles.textInput}
        multiline={true}
        numberOfLines={4}
        placeholder="Type your message here..."
        value={text}
        onChangeText={setText}
      />
    </View>
  );
};

export default TextArea;

const textStyles =(theme:ReuseTheme)=> StyleSheet.create({
  textareaContainer: {
    height: 200,
    width: '88%',
    padding: 5,
    backgroundColor: theme.colors.preference.primaryBackground,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  textInput: {
    height: 150,
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,

  },
});
