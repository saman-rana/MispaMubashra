import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import InputField from '../../components/InputField';
import BottomSheetOpener from '../../components/skills/BottomSheetOpener';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import MainStyling from '../../assets/styles/MainStyling';
import colors from '../../assets/colors/colors';
import DrawerHeader from '../../components/DrawerHeader';
import Button from '../../components/Button';
import Calendar from '../../components/Calendar';
import CheckBox from '@react-native-community/checkbox';
import {cardNumberList, onCreditCard} from '../../apis/payment-apis';
import Loader from '../../components/Loader';
import {encode} from 'base-64';
import {useSelector} from 'react-redux';

const BillingDetail = ({route}) => {
  const {job, billingTab} = route?.params;

  const navigation = useNavigation();
  const userDetails = useSelector(state => state.auth.user);
  const [index, setIndex] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [time, setTime] = useState('Time');
  const [cVV, setCVV] = useState('');
  const [decoedCvv, setDecoedCvv] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleCheckBoxChange = () => {
    setChecked(!isChecked);
  };

  const onCreditCardPress = async () => {
    console.log(encode(cardNumber));
    console.log(userDetails?.api_token);
    console.log(encode(cardHolder));
    console.log(encode(cVV));
    console.log(encode(selectedDate));
    const details = {
      card_number: encode(cardNumber),
      card_holder_name: encode(cardHolder),
      cvv: encode(cVV),
      expiry_date: encode(selectedDate),
      token: userDetails?.api_token,
    };
    onCreditCard(details)
      .then(response => {
        console.log('responseresponseresponseresponse', response);
        alert('Card info stored successfully');
        navigation.navigate('Billing', {job, billingTab});
        // console.log('Response CreditCard status:', response?.message);
        // if (response?.message == 'Card info stored successfully') {
        //   navigation.navigate('Billing');
        // } else {
        //   alert('Card detail issue');
        // }
        //
        setIsLoading(false);
      })
      .catch(({response}) => {
        setErrorMessage(response?.data?.error);
        console.log(response?.data);
        setIsLoading(false);
      });
  };

  const getCardNumber = async () => {
    const details = {
      id: userDetails?.id,
    };
    cardNumberList(details)
      .then(response => {
        console.log('Response for CardNumbersssessok: ', response?.card);
        setCardNumber(response?.card?.encrypted_number);
        setCardHolder(response?.card?.carholder_name);
        setSelectedDate(response?.card?.encrypted_expiry_date);
        // console.log(
        //   'decode(cardNo?.encrypted_number?.toString());',
        //   decode(cardNo?.encrypted_number?.toString()),
        // );
        setIsLoading(false);
      })
      .catch(({response}) => {
        console.log(response);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getCardNumber();
    const unsubscribe = navigation.addListener('focus', () => {
      setIsLoading(true);
      getCardNumber();
    });
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.white}]}>
      <DrawerHeader />
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView
          style={{backgroundColor: colors.grey_white}}
          showsVerticalScrollIndicator={false}>
          <View style={MainStyling.dividerTwo}></View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Feather
                name={'chevron-left'}
                size={wp('8%')}
                color={colors.black}
                style={{
                  marginLeft: wp('3'),
                }}
              />
            </TouchableOpacity>

            <Text
              style={[
                MainStyling.heading,
                {
                  textAlign: 'center',
                  flex: 0.8,
                },
              ]}>
              Billing
            </Text>
          </View>

          <View style={MainStyling.dividerTwo}></View>

          <View style={{flex: 5}}>
            <View style={MainStyling.divider}></View>

            {/* <View style={styles.viewDC}>
              <TouchableOpacity
                onPress={() => {
                  setIndex(false);
                }}
                style={[
                  styles.buttonDC,
                  {
                    backgroundColor:
                      index === false ? colors.primary : colors.white,
                  },
                ]}>
                <Text
                  style={[
                    MainStyling.buttonText,
                    {color: index === false ? colors.white : colors.primary},
                  ]}>
                  {' '}
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
                      index === false ? colors.white : colors.primary,
                  },
                ]}>
                <Text
                  style={[
                    MainStyling.buttonText,
                    {color: index === false ? colors.primary : colors.white},
                  ]}>
                  Mobile
                </Text>
              </TouchableOpacity>
            </View> */}
            {index === true ? (
              <View style={[{marginHorizontal: wp('6.8%')}]}>
                <View style={[MainStyling.divider]} />
                <InputField
                  value={cardNumber}
                  keyboardType={'numeric'}
                  maxLength={16}
                  placeholder={'Card number'}
                  label={'Card number'}
                  onChangeText={value => {
                    setCardNumber(value);
                    setErrorMessage('');
                  }}
                />
                <View style={[MainStyling.dividerTwo]} />
                <InputField
                  value={cardHolder}
                  placeholder={'Card holder name'}
                  label={'Card holder name'}
                  onChangeText={value => {
                    setCardHolder(value);
                    setErrorMessage('');
                  }}
                />
                <View style={[MainStyling.dividerTwo]} />
                <View style={[{flex: 1, flexDirection: 'row'}]}>
                  <View style={[{flex: 0.5}]}>
                    <BottomSheetOpener
                      label={'Expire on'}
                      value={time}
                      data={selectedDate ? selectedDate : 'Date'}
                      placeholder={'Expire on'}
                      onChangeText={value => {
                        setTime('25');
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
                    <InputField
                      value={cVV}
                      maxLength={3}
                      placeholder={'3 Digits CVV'}
                      label={'3 Digits CVV'}
                      onChangeText={value => {
                        setCVV(value);
                        setErrorMessage('');
                      }}
                    />
                  </View>
                </View>
                <View style={[MainStyling.dividerTwo]} />
                {/* <View style={[styles.flexR]}>
                  <CheckBox
                    boxType="square"
                    value={isChecked ? true : false}
                    onTintColor={colors.primary}
                    onCheckColor={colors.primary}
                    onValueChange={handleCheckBoxChange}
                    tintColors={{
                      true: isChecked ? colors.primary : colors.green,
                      false: colors?.gray,
                    }}
                    style={{
                      transform: [{scaleX: 0.7}, {scaleY: 0.7}],
                    }}
                  />

                  <Text style={[MainStyling.mediumText, styles.forgotText]}>
                    Save card for future
                  </Text>
                </View> */}
                <Text
                  style={[
                    MainStyling.label,
                    {color: colors.primary, marginVertical: wp('1.5%')},
                  ]}>
                  {errorMessage}
                </Text>
                <Button
                  label={'Update card'}
                  labelStyle={[MainStyling.buttonText]}
                  onPress={() => {
                    if (cardNumber === '') {
                      setErrorMessage('Enter card number');
                    } else if (cardHolder === '') {
                      setErrorMessage('Enter card name');
                    } else if (selectedDate === '') {
                      setErrorMessage('Enter expire date');
                    } else if (cVV === '') {
                      setErrorMessage('Enter CVV');
                    } else {
                      setErrorMessage('');

                      onCreditCardPress();
                    }
                  }}
                />
              </View>
            ) : (
              <View style={[{marginHorizontal: wp('6.8%')}]}>
                <View style={[MainStyling.divider]} />
                <InputField
                  value={cardNumber}
                  keyboardType={'numeric'}
                  maxLength={16}
                  placeholder={'Card number'}
                  label={'Card number'}
                  onChangeText={value => {
                    setCardNumber(value);
                    setErrorMessage('');
                  }}
                />
                <View style={[MainStyling.dividerTwo]} />
                <InputField
                  value={cardHolder}
                  placeholder={'Card holder name'}
                  label={'Card holder name'}
                  onChangeText={value => {
                    setCardHolder(value);
                    setErrorMessage('');
                  }}
                />
                <View style={[MainStyling.dividerTwo]} />
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
                    <InputField
                      value={cVV}
                      maxLength={3}
                      placeholder={'3 Digits CVV'}
                      label={'3 Digits CVV'}
                      onChangeText={value => {
                        setCVV(value);
                        setErrorMessage('');
                      }}
                    />
                  </View>
                </View>
                <View style={[MainStyling.dividerTwo]} />
                {/* <View style={[styles.flexR]}>
                  <CheckBox
                    boxType="square"
                    value={isChecked ? true : false}
                    onTintColor={colors.primary}
                    onCheckColor={colors.primary}
                    onValueChange={handleCheckBoxChange}
                    tintColors={{
                      true: isChecked ? colors.primary : colors.green,
                      false: colors?.gray,
                    }}
                    style={{
                      transform: [{scaleX: 0.7}, {scaleY: 0.7}],
                    }}
                  />

                  <Text style={[MainStyling.mediumText, styles.forgotText]}>
                    Save card for future
                  </Text>
                </View> */}
                <Text
                  style={[
                    MainStyling.label,
                    {color: colors.primary, marginVertical: wp('1.5%')},
                  ]}>
                  {errorMessage}
                </Text>
                <Button
                  label={'Update card'}
                  labelStyle={[MainStyling.buttonText]}
                  onPress={() => {
                    if (cardNumber === '') {
                      setErrorMessage('Enter card number');
                    }  else if (cardNumber.length < 16) {
                        setErrorMessage('Card number must be 16 digits');         
                    } else if (cardHolder === '') {
                      setErrorMessage('Enter card name');
                    } else if (selectedDate === '') {
                      setErrorMessage('Enter expire date');
                    } else if (cVV === '') {
                      setErrorMessage('Enter CVV');
                    } else { 
                      setErrorMessage('');
                      onCreditCardPress();
                      // navigation.navigate('Billing');
                    }
                  }}
                />
              </View>
            )}
          </View>
        </ScrollView>
      )}

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
  },
  viewDC: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: wp('4%'),
    marginHorizontal: wp('6%'),
    borderRadius: wp('3%'),
  },
  buttonDC: {
    flex: 1,
    height: wp('13%'),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotText: {
    textAlign: 'left',
    color: colors.gray,
  },
  flexR: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default BillingDetail;
