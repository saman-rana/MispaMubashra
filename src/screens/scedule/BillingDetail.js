import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  TextInput,
} from 'react-native';
import InputField from '../../components/InputField';
import BottomSheetOpener from '../../components/skills/BottomSheetOpener';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import MainStyling from '../../assets/styles/MainStyling';
import colors from '../../assets/colors/colors';
import DrawerHeader from '../../components/DrawerHeader';
import Button from '../../components/Button';
import Calendar from '../../components/Calendar';

const BillingDetail = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [time, setTime] = useState('Time');
  const [cVV, setCVV] = useState('Time');
  const [isChecked, setChecked] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCVVDate, setSelectedCVVDate] = useState('');

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView
        style={{backgroundColor: colors.grey_white}}
        showsVerticalScrollIndicator={false}>
        <DrawerHeader />
        <View style={MainStyling.dividerTwo}></View>

        <View style={{flexDirection: 'row'}}>
          <Feather
            onPress={() => {
              navigation.goBack();
            }}
            name={'chevron-left'}
            size={wp('8%')}
            style={{marginLeft: wp('2')}}
          />
          <Text
            style={[
              styles.scheduleT,
              {textAlign: 'center', flex: 1, left: -wp('5%')},
            ]}>
            Billingss
          </Text>
        </View>
        <View style={MainStyling.dividerTwo}></View>
        <View style={{flex: 5}}>
          <View style={styles.viewDC}>
            <TouchableOpacity
              onPress={() => {
                setIndex(false);
              }}
              style={[
                styles.buttonDC,
                {
                  backgroundColor:
                    index === false ? colors.white : colors.light_sky,
                },
              ]}>
              <Text
                style={[
                  MainStyling.titleHeading,
                  {color: colors.primary, fontSize: wp('4.4')},
                ]}>
                Cards
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIndex(true);
              }}
              style={[
                styles.buttonDC,
                {
                  backgroundColor:
                    index === true ? colors.white : colors.light_sky,
                },
              ]}>
              <Text style={[MainStyling.titleHeading, styles.companyT]}>
                Mobile
              </Text>
            </TouchableOpacity>
          </View>
          {index === true ? (
            <View style={{paddingHorizontal: '9%'}}></View>
          ) : (
            <View style={[{marginHorizontal: wp('6.8%')}]}>
              <View style={[MainStyling.divider]}></View>
              <InputField
                value={cardNumber}
                placeholder={'Card number'}
                label={'Card number'}
                onChangeText={value => {
                  setCardNumber(value);
                }}
              />
              <View style={[MainStyling.dividerTwo]}></View>
              <InputField
                value={cardHolder}
                placeholder={'Card holder name'}
                label={'Card holder name'}
                onChangeText={value => {
                  setCardHolder(value);
                }}
              />
              <View style={[MainStyling.dividerTwo]}></View>
              <View style={[{flex: 1, flexDirection: 'row'}]}>
                <View style={[{flex: 0.5}]}>
                  <BottomSheetOpener
                    label={'Expire on'}
                    value={time}
                    data={selectedDate ? selectedDate : 'Date'}
                    placeholder={'Expire on'}
                    onChangeText={value => {
                      setTime(value);
                    }}
                    iconSize={wp('4.8%')}
                    iconPosition={'right'}
                    iconName={'calendar'}
                    onIconPress={() => {
                      showTimePicker();
                    }}
                  />
                </View>
                <View style={[{flex: 0.5, marginLeft: wp('2%')}]}>
                  <BottomSheetOpener
                    label={'3-Digit CVV'}
                    value={cVV}
                    data={cVV ? cVV : 'CVV'}
                    placeholder={'3-Digit CVV'}
                    onChangeText={value => {
                      setCVV(value);
                    }}
                    // iconSize={wp('4.8%')}
                    // iconPosition={'right'}
                    // iconName={'calendar'}
                    // onIconPress={() => {
                    //   showTimePicker();
                    // }}
                  />
                </View>
              </View>
              <View style={[MainStyling.dividerTwo]}></View>
              {/* <View style={[styles.flexR]}>
                <Checkbox
                  boxType="square"
                  value={isChecked}
                  onTintColor={colors.primary}
                  onCheckColor={colors.primary}
                  onValueChange={handleCheckBoxChange}
                  tintColors={{true: colors.primary, false: colors.grayLight}}
                  style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
                />
                <Text style={[MainStyling.mediumText, styles.forgotText]}>
                  Save card for future
                </Text>
              </View> */}

              <Button
                label={'Create'}
                labelStyle={[MainStyling.buttonText]}
                onPress={() => {
                  navigation.navigate('JobListing');
                }}
              />
            </View>
          )}
        </View>
      </ScrollView>
      <Calendar
        hideTimePicker={hideTimePicker}
        isTimePickerVisible={isTimePickerVisible}
        setSelectedDate={setSelectedDate}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: ,
    // backgroundColor: colors.white,
  },
  scheduleT: {
    color: 'black',
    fontSize: wp('5%'),
    fontWeight: 'bold',
    // marginHorizontal: wp("20%"),
  },
  fulltimeV: {
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: wp('2%'),
    paddingHorizontal: wp('4%'),
    marginHorizontal: wp('5%'),
    marginVertical: wp('3%'),
  },
  fulltimeT: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  viewDC: {
    backgroundColor: colors.light_red,
    flex: 1,
    padding: wp('0.5%'),
    paddingVertical: wp('1.5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: wp('4%'),
    marginHorizontal: wp('6.8%'),
    borderRadius: wp('3%'),
  },

  buttonDC: {
    flex: 1,
    height: wp('13%'),
    marginHorizontal: wp('1%'),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: wp('19%'),
    width: wp('19%'),
    borderRadius: 45,
  },
  locationIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: wp('1%'),
  },
  forgotText: {
    textAlign: 'left',
    color: colors.gray,
  },

  companyT: {
    color: colors.primary,
    fontSize: wp('4.4'),
  },
});
export default BillingDetail;
