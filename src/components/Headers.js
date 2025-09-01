import React from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import colors from '../assets/colors/colors';
import MainStyling from '../assets/styles/MainStyling';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Headers = ({title, iconLeft}) => {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />

      <SafeAreaView>
        <View style={[Styles.main, Styles.view]}>
          {iconLeft === 'false' ? null : (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <MaterialCommunityIcons
                name={'keyboard-backspace'}
                size={wp('8%')}
                color={colors.black}
              />
            </TouchableOpacity>
          )}
          {title ? (
            <Text style={[MainStyling.Navbar, {marginLeft: wp('2%')}]}>
              {title}
            </Text>
          ) : null}
        </View>
      </SafeAreaView>
    </>
  );
};

const Styles = StyleSheet.create({
  view: {
    paddingHorizontal: wp('5%'),
    paddingVertical: wp('3%'),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grey_white,
  },
});

export default Headers;
