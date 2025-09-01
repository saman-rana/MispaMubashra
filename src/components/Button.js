import React from 'react';
import {Text, Pressable, StyleSheet, SafeAreaView} from 'react-native';
import colors from '../assets/colors/colors';
import MainStyling from '../assets/styles/MainStyling';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const Button = ({
  buttonStyle,
  label,
  labelStyle,
  onPress,
  variant,
  icon,
  outerStyle,
}) => {
  return (
    <>
      {variant === 'outline' ? (
        <SafeAreaView
          style={[{backgroundColor: colors.grey_white, ...outerStyle}]}>
          <Pressable
            onPress={() => {
              onPress();
            }}
            style={[
              Styles.button,
              variant === 'outline' && Styles.outlineButton,
              {backgroundColor: colors.white, ...buttonStyle},
            ]}>
            <Text
              style={[
                {
                  textAlign: 'center',
                  color: colors.primary,
                  fontWeight: 'bold',
                },
                labelStyle,
              ]}>
              {label}
            </Text>
          </Pressable>
        </SafeAreaView>
      ) : (
        <SafeAreaView
          style={[{backgroundColor: colors.grey_white, ...outerStyle}]}>
          <Pressable
            onPress={() => {
              onPress();
            }}
            style={[
              Styles.button,
              {...buttonStyle, backgroundColor: colors.primary},
            ]}>
            <Text
              style={[
                {color: 'white', textAlign: 'center', fontWeight: 'bold'},
                labelStyle,
                MainStyling.buttonText,
              ]}>
              {label}
            </Text>
          </Pressable>
        </SafeAreaView>
      )}
    </>
  );
};

const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 0.5,
    borderRadius: '50',
  },
  shadowOpacity: 0.15,
  shadowRadius: 3.84,
};

const Styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    height: wp('13%'),
    borderRadius: 30,
    marginVertical: wp('3%'),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
      },
      android: {
        elevation: 3,
        backgroundColor: colors.grey_white,
      },
    }),
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Button;
