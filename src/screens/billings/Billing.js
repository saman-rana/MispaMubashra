import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
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
import {cardNumberList, onUpdatecardCVV} from '../../apis/payment-apis';
import Loader from '../../components/Loader';
import {useSelector} from 'react-redux';

const Billing = ({route}) => {
  const navigation = useNavigation();
  const {job, billingTab} = route?.params;
  const userDetails = useSelector(state => state.auth.user);
  const [press1, setPress1] = useState(0);
  const [press2, setPress2] = useState(0);
  const [press3, setPress3] = useState(0);
  const [payment, setPayment] = useState('');
  const [cardNo, setCardNo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [values, setValues] = useState({
    cvv: '',
    token: userDetails?.api_token,
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
  const onUpdatecardPress = async () => {
    setIsButtonLoading(true);
    const filteredEstimations = job?.estimations.filter(
      item => item.job_id === 1,
    );
    const details = {
      cvv: values?.cvv,
      token: userDetails?.api_token,
      schedule_id: job?.id,
      amount: filteredEstimations[0]?.estimation_price,
    };

    console.log(
      'filteredEstimations',
      filteredEstimations[0]?.estimation_price,
    );

    onUpdatecardCVV(details)
      .then(response => {
        console.log('Response show there for paymentsss:', response);
        if (response?.error === 'Invalid CVV') {
          alert('Invalid CVV');
        } else if (response?.error === 'Card not found') {
          alert('Please add a valid card number');
        } else {
          alert('Payment successfull');
          navigation.navigate('History');
        }
        // navigation.navigate('dashboard');
        setIsButtonLoading(false);
      })
      .catch(error => {
        console.log('error is here is ', error);
        alert('Payment is not done due to server issue');
        // console.log(response?.data);
        setIsButtonLoading(false);
      });
  };

  // const getCreatPaymentList = async () => {
  //   const details = {};
  //   creatPaymentList(details)
  //     .then(response => {
  //       console.log('Response shoe there for Create Payment: ', response?.user);
  //       setPayment(response?.show);
  //       setIsLoading(false);
  //     })
  //     .catch(({response}) => {
  //       console.log(response);
  //       setIsLoading(false);
  //     });
  // };

  const getCardNumber = async () => {
    const details = {
      id: userDetails?.id,
    };
    cardNumberList(details)
      .then(response => {
        console.log(
          'Response for CardNumbersssessok: ',
          response?.card?.encrypted_number,
        );
        setCardNo(response?.card?.encrypted_number);
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
    setIsButtonLoading(false);
    getCardNumber();
    const unsubscribe = navigation.addListener('focus', () => {
      setIsLoading(true);
      getCardNumber();
      // getCreatPaymentList();
      // getCardNumber();
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
                navigation.navigate('BillingDetail', {job, billingTab});
              }}>
              <Text style={[MainStyling.subHeading, {color: colors.primary}]}>
                Add payment method
              </Text>
            </TouchableOpacity>

            <View style={[MainStyling.divider]}></View>
            <Text style={[MainStyling.heading]}>Cards</Text>
            <View style={MainStyling.dividerTwo} />
            <View
              style={[
                styles.mainCard,
                {
                  flex: 1,
                  backgroundColor: colors.white,
                },
              ]}>
              <View
                style={[
                  styles.blackPart,
                  {
                    flexDirection: 'row',
                    borderTopRightRadius: wp('5%'),
                    borderBottomRightRadius:
                      billingTab === 'false' ? 0 : wp('5%'),
                    borderTopLeftRadius: wp('5%'),
                    borderBottomLeftRadius:
                      billingTab === 'false' ? 0 : wp('5%'),
                  },
                ]}>
                  <Image
            source={require('../../assets/images/png/card.png')}
            style={[styles.image,]}
          />
                {/* <Svgs.Card width={wp('8%')} /> */}
                <Text
                  style={[
                    MainStyling.subHeading,
                    {color: colors.white, marginLeft: wp('2%')},
                  ]}>
                  {cardNo}
                </Text>
                {/* <Feather
                  onPress={() => {}}
                  name={'chevron-down'}
                  color={colors.white}
                  size={wp('8%')}
                  style={{position: 'absolute', right: wp('3%')}}
                /> */}
              </View>

              {billingTab === 'false' ? (
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
                  {isButtonLoading ? (
                    <Loader />
                  ) : (
                    <Button
                      label={'Pay securely'}
                      outerStyle={{backgroundColor: colors.white}}
                      labelStyle={MainStyling.buttonText}
                      onPress={() => {
                        if (values.cvv) {
                          onUpdatecardPress();
                        } else {
                          alert('Enter a valid cvv');
                        }
                        // navigation.navigate('BillingDetail');
                      }}
                    />
                  )}
                </View>
              ) : null}
            </View>
          </View>
        </ScrollView>
      )}
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
    width: wp('88%'),
    borderTopRightRadius: wp('5%'),
    borderTopLeftRadius: wp('5%'),
  },
  blackPart: {
    height: wp('14%'),
    width: wp('88%'),

    backgroundColor: colors.greyBlack,
    alignItems: 'center',
    padding: wp('5%'),
  },
  image:{
  height: wp('7.5'),
  width: wp('7.5'),
  borderRadius: wp('30'),
  alignSelf: 'center',
  resizeMode: 'contain',
},
});
export default Billing;
