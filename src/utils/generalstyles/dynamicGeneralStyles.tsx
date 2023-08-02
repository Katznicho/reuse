import { StyleSheet } from "react-native";
import { ReuseTheme } from "../../types/types";

export const dynamicGeneralStyles = (theme:ReuseTheme) => {

    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            backgroundColor: theme.colors.preference.primaryBackground,
          },
          flexStyles: {
            display: 'flex',
            flexDirection: 'row',
          },
          absoluteStyles: {
            position: 'absolute',
            zIndex: 20,
          },
          resideViews: {
            alignItems: 'center',
            flexDirection: 'row',
            width: '100%',
            margin: 2,
          },
          centerContent: {
            justifyContent: 'center',
            alignItems: 'center',
          },
          bottomHairline: {
            borderBottomColor: theme.colors.preference.primaryText,
            borderBottomWidth: 3,
            marginRight: 10,
            marginLeft: 20,
            width:80,
          },
          authTitle:{
            fontSize: 25,
            fontWeight: 'bold',
            color: theme.colors.preference.primaryForeground,
            marginTop: 25,
            marginBottom: 10,
            alignSelf: 'stretch',
            textAlign: 'left',
            marginLeft: 30,
          }

    })

}