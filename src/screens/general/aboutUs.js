import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet, View, ScrollView} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import MainStyling from '../../assets/styles/MainStyling';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Headers from '../../components/Headers';

const aboutUs = () => {
  const navigation = useNavigation();
  const userDetails = useSelector(state => state.auth.user);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.grey_white}]}>
      {/* <DrawerHeader /> */}
      <Headers title="" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginHorizontal: 30}}>
        <Text style={[MainStyling.heading]}>About us</Text>
        <View style={MainStyling.divider}></View>

        <Text style={[MainStyling.paragraph]}>
          Mispa About, the data you enter will be biased towards your own usage
          patterns and won't match real-world usage, leaving important bugs
          undiscovered
        </Text>
        <View style={MainStyling.dividerTwo}></View>

        <Text style={[MainStyling.paragraph]}>
          If you're developing an application, you'll want to make sure you're
          testing it under conditions that closely simulate a production
          environment.
        </Text>
        <View style={MainStyling.dividerTwo}></View>

        <Text style={[MainStyling.paragraph]}>
          Worse, the data you enter will be biased towards your own usage
          patterns and won't match real-world usage, leaving important bugs
          undiscovered
        </Text>
        <View style={MainStyling.dividerTwo}></View>

        <Text style={[MainStyling.paragraph]}>
          If you're developing an application, you'll want to make sure you're
          testing it under conditions that closely simulate a production
          environment.
        </Text>
        <View style={MainStyling.dividerTwo}></View>

        <Text style={[MainStyling.paragraph]}>
          Worse, the data you enter will be biased towards your own usage
          patterns and won't match real-world usage, leaving important bugs
          undiscovered
        </Text>
        <View style={MainStyling.dividerTwo}></View>

        <Text style={[MainStyling.paragraph]}>
          If you're developing an application, you'll want to make sure you're
          testing it under conditions that closely simulate a production
          environment.
        </Text>
        <View style={MainStyling.dividerTwo}></View>

        <Text style={[MainStyling.paragraph]}>
          Worse, the data you enter will be biased towards your own usage
          patterns and won't match real-world usage, leaving important bugs
          undiscovered
        </Text>
        <View style={MainStyling.dividerTwo}></View>

        <Text style={[MainStyling.paragraph]}>
          If you're developing an application, you'll want to make sure you're
          testing it under conditions that closely simulate a production
          environment.
        </Text>
        <View style={MainStyling.dividerTwo}></View>

        <Text style={[MainStyling.paragraph]}>
          Worse, the data you enter will be biased towards your own usage
          patterns and won't match real-world usage, leaving important bugs
          undiscovered
        </Text>
        <View style={MainStyling.dividerTwo}></View>

        <Text style={[MainStyling.paragraph]}>
          If you're developing an application, you'll want to make sure you're
          testing it under conditions that closely simulate a production
          environment.
        </Text>
        <View style={MainStyling.dividerTwo}></View>

        <Text style={[MainStyling.paragraph]}>
          Worse, the data you enter will be biased towards your own usage
          patterns and won't match real-world usage, leaving important bugs
          undiscovered
        </Text>
        <View style={MainStyling.dividerTwo}></View>

        <Text style={[MainStyling.paragraph]}>
          If you're developing an application, you'll want to make sure you're
          testing it under conditions that closely simulate a production
          environment.
        </Text>
        <View style={MainStyling.dividerTwo}></View>

        <Text style={[MainStyling.paragraph]}>
          Worse, the data you enter will be biased towards your own usage
          patterns and won't match real-world usage, leaving important bugs
          undiscovered
        </Text>
        <View style={MainStyling.dividerTwo}></View>

        <Text style={[MainStyling.paragraph]}>
          If you're developing an application, you'll want to make sure you're
          testing it under conditions that closely simulate a production
          environment.
        </Text>
        <View style={MainStyling.dividerTwo}></View>

        <Text style={[MainStyling.paragraph]}>
          Worse, the data you enter will be biased towards your own usage
          patterns and won't match real-world usage, leaving important bugs
          undiscovered
        </Text>
        <View style={MainStyling.dividerTwo}></View>

        <Text style={[MainStyling.paragraph]}>
          If you're developing an application, you'll want to make sure you're
          testing it under conditions that closely simulate a production
          environment.
        </Text>
        <View style={MainStyling.dividerTwo}></View>

        <Text style={[MainStyling.paragraph]}>
          Worse, the data you enter will be biased towards your own usage
          patterns and won't match real-world usage, leaving important bugs
          undiscovered
        </Text>
        <View style={MainStyling.dividerTwo}></View>

        <Text style={[MainStyling.paragraph]}>
          If you're developing an application, you'll want to make sure you're
          testing it under conditions that closely simulate a production
          environment.
        </Text>
        <View style={MainStyling.dividerTwo}></View>

        <Text style={[MainStyling.paragraph]}>
          Worse, the data you enter will be biased towards your own usage
          patterns and won't match real-world usage, leaving important bugs
          undiscovered
        </Text>
        <View style={MainStyling.dividerTwo}></View>

        <Text style={[MainStyling.paragraph]}>
          If you're developing an application, you'll want to make sure you're
          testing it under conditions that closely simulate a production
          environment.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  card2: {
    width: wp('100%'),
    height: wp('62%'),
    borderBottomRightRadius: 5000,
    borderBottomLeftRadius: 5000,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: wp('10'),
    width: wp('10'),
  },
  blackLine: {
    height: wp('0.1%'),
    backgroundColor: colors.light_black,
  },
});
export default aboutUs;
