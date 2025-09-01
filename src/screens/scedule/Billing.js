import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import MainStyling from '../../assets/styles/MainStyling';
import colors from '../../assets/colors/colors';
import DrawerHeader from '../../components/DrawerHeader';
import Button from '../../components/Button';
import * as Svgs from '../../assets/images/svg';
import InputField from '../../components/InputField';

const Billing = () => {
  const navigation = useNavigation();
  const [press1, setPress1] = useState(0);
  const [press2, setPress2] = useState(0);
  const [press3, setPress3] = useState(0);

  const [values, setValues] = useState({
    cvv: '',
    token: '',
    errorMessage: '',
  });

  const handlePress = () => {
    setPress1(!press1);
  };

  const onChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.white}]}>
      <ScrollView
        style={{backgroundColor: colors.grey_white}}
        showsVerticalScrollIndicator={false}>
        <DrawerHeader />
        <View style={MainStyling.dividerTwo}></View>

        <Text style={[MainStyling?.heading, {textAlign: 'center', flex: 1}]}>
          Billing
        </Text>
        <View style={[MainStyling.screenPadding, {marginVertical: wp('5%')}]}>
          <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
            <TouchableOpacity onPress={handlePress}>
              <Ionicons
                name={'checkmark-circle'}
                size={wp('8%')}
                color={colors.primary}
              />
            </TouchableOpacity>
            <View
              style={{
                borderWidth: 0.7,
                flex: 1,
                height: 0,
                borderColor: colors.light_black,
              }}
            />
            <TouchableOpacity onPress={handlePress}>
              <Ionicons
                name={'checkmark-circle'}
                size={wp('8%')}
                color={press2 === 0 ? colors.primary : colors.white}
              />
            </TouchableOpacity>
            <View
              style={{
                borderWidth: 0.7,
                flex: 1,
                height: 0,
                borderColor: colors.light_black,
              }}
            />
            <TouchableOpacity onPress={handlePress}>
              <Ionicons
                name={'checkmark-circle-outline'}
                size={wp('8%')}
                color={press3 === 0 ? colors.primary : colors.white}
              />
            </TouchableOpacity>
          </View>
          <View style={[MainStyling.divider]}></View>
          <Text style={[MainStyling.heading]}>Choose a payment method</Text>
          <View style={MainStyling.dividerTwo} />

          <TouchableOpacity
            style={styles.payment}
            onPress={() => {
              navigation.navigate('BillingDetail');
            }}>
            <Text style={[MainStyling.subHeading, {color: colors.primary}]}>
              Add payment method
            </Text>
          </TouchableOpacity>

          <View style={[MainStyling.divider]}></View>
          <Text style={[MainStyling.heading]}>Cards</Text>
          <View style={MainStyling.dividerTwo} />
          <View
            style={[styles.mainCard, {flex: 1, backgroundColor: colors.white}]}>
            <View style={[styles.blackPart, {flexDirection: 'row'}]}>
              <Svgs.Card width={wp('8%')} />
              <Text
                style={[
                  MainStyling.subHeading,
                  {color: colors.white, marginLeft: wp('2%')},
                ]}>
                1234 1234 1234 1234
              </Text>
              <Feather
                onPress={() => {}}
                name={'chevron-down'}
                color={colors.white}
                size={wp('8%')}
                style={{position: 'absolute', right: wp('3%')}}
              />
            </View>
            <View
              style={[
                MainStyling.screenPaddingTwo,
                {marginVertical: wp('3%')},
              ]}>
              <InputField
                keyboardType={'numeric'}
                maxLength={3}
                value={values.cvv}
                placeholder={'Enter CVV'}
                label={'Enter CVV'}
                inputContainerStyle={{width: '100%'}}
                onChangeText={value => {
                  onChange('cvv', value.replace(/[^0-9]/g, ''));
                }}
                onIconPress={() => {}}
              />

              <Button
                label={'Pay securely'}
                outerStyle={{backgroundColor: colors.white}}
                labelStyle={MainStyling.buttonText}
                onPress={() => {}}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  payment: {
    height: wp('12%'),
    width: wp('48%'),
    borderRadius: 5,
    backgroundColor: colors.primaryLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainCard: {
    height: wp('55%'),
    width: wp('88%'),
    borderTopRightRadius: wp('5%'),
    borderTopLeftRadius: wp('5%'),
  },
  blackPart: {
    height: wp('14%'),
    width: wp('88%'),
    borderTopRightRadius: wp('5%'),
    borderTopLeftRadius: wp('5%'),
    backgroundColor: colors.greyBlack,
    alignItems: 'center',
    padding: wp('5%'),
  },
});
export default Billing;
