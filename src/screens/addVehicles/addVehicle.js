import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../assets/colors/colors';
import MainStyling from '../../assets/styles/MainStyling';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import DrawerHeader from '../../components/DrawerHeader';
import {onAddVehicle} from '../../apis/company-apis';
import {useSelector} from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import DisableInputs from '../../components/DisableInputs';

const AddVehicle = () => {
  const navigation = useNavigation();
  const userDetails = useSelector(state => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [values, setValues] = useState({
    orgName: '',
    vehicleNumber: '',
    chasisNumber: '',
    engineNumber: '',
    contactNumber: '',
    address: '',
    kiloMeters: '',
    pinCode: '',
    notes: '',
    services: 1,
    errorMessage: '',
  });

  const onChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleCheckBoxChange = () => {
    setIsChecked(!isChecked);
  };

  const onAddVehiclePress = async () => {
    setIsLoading(true);
    const details = {
      services: values?.services,
      orginization_name: values?.orgName,
      vehicle_number: values?.vehicleNumber,
      chasis_number: values?.chasisNumber,
      engin_number: values?.engineNumber,
      contact_number: values?.contactNumber,
      address: values?.address,
      pincode: values?.pinCode,
      note: values?.notes,
      token: userDetails?.api_token,
    };
    onAddVehicle(details)
      .then(response => {
        console.log('Response show there for addVehicle: ', response?.data);
        navigation.navigate('VehicleSuccess');
        setIsLoading(false);
      })
      .catch(({error}) => {
        setIsLoading(false);
        alert('The vehicle number has already been taken');
        // setErrorMessage(response?.data?.error);
        console.log(error);
        // if (error.errors && error.data && error.errors) {
        //   alert(error.errors.vehicle_number[0]);
        // } else {
        //   console.log(error);
        // }
      });
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.white}]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: colors.grey_white}}>
        <DrawerHeader />
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
            Add vehicle
          </Text>
        </View>

        <View style={MainStyling.screenPadding}>
          <View style={[MainStyling.divider]}></View>
          <InputField
            value={values.orgName}
            placeholder={'Ex: Naresh'}
            label={'Name (Organizational Name)'}
            onChangeText={value => {
              onChange('orgName', value);
              setErrorMessage('');
            }}
          />
          <View style={MainStyling.dividerTwo}></View>

          <InputField
            value={values.vehicleNumber}
            placeholder={'EX: TSO234gz86'}
            label={'Vehicle Number'}
            onChangeText={value => {
              onChange('vehicleNumber', value);
              setErrorMessage('');
            }}
          />
          <View style={MainStyling.dividerTwo}></View>
          <InputField
            value={values.chasisNumber}
            placeholder={'EX: TSO234gz86'}
            label={'Chasis Number'}
            onChangeText={value => {
              onChange('chasisNumber', value);
              setErrorMessage('');
            }}
          />
          <View style={MainStyling.dividerTwo}></View>
          <InputField
            value={values.engineNumber}
            placeholder={'EX: TSO234gz86'}
            label={'Engine Number'}
            onChangeText={value => {
              onChange('engineNumber', value);
              setErrorMessage('');
            }}
          />
          <View style={MainStyling.dividerTwo}></View>
          <InputField
            maxLength={11}
            keyboardType={'numeric'}
            value={values.contactNumber}
            placeholder={'EX: 23434 23434'}
            label={'Contact Number'}
            onChangeText={value => {
              onChange('contactNumber', value);
              setErrorMessage('');
            }}
          />
          <View style={MainStyling.dividerTwo}></View>
          <InputField
            value={values.address}
            placeholder={'Address'}
            label={'Address'}
            onChangeText={value => {
              onChange('address', value);
              setErrorMessage('');
            }}
          />
          <View style={MainStyling.dividerTwo}></View>
          <InputField
            keyboardType={'numeric'}
            value={values.kiloMeters}
            placeholder={'EX: 45,1000 kms'}
            label={'Kilo Meters'}
            onChangeText={value => {
              onChange('kiloMeters', value);
              setErrorMessage('');
            }}
          />
          <View style={MainStyling.dividerTwo}></View>
          <InputField
            maxLength={6}
            keyboardType={'numeric'}
            value={values.pinCode}
            placeholder={'EX: 23432'}
            label={'Pincode'}
            onChangeText={value => {
              onChange('pinCode', value);
              setErrorMessage('');
            }}
          />
          <View style={MainStyling.dividerTwo}></View>
        </View>
      </ScrollView>
      <View style={[styles.flexR, MainStyling?.screenPadding]}>
        {/* <Checkbox.Item
          status={isChecked ? 'checked' : 'unchecked'}
          onPress={handleCheckBoxChange}
          rippleColor={colors.primary}
          style={{
            width: 20, // Adjust width as needed
            height: 20, // Adjust height as needed
            borderRadius: 4, // Adjust border radius as needed
            backgroundColor: isChecked ? colors.primary : colors.primary, // Change background color when checked
            borderColor: colors.white,
            borderWidth: 1,
            justifyContent: 'center', // Center the checkbox content
            alignItems: 'center', // Center the checkbox content
          }}
          color={colors.white} // Change the checked color
        /> */}
        <CheckBox
          disabled={false}
          value={isChecked}
          // onValueChange={newValue => handleCheckBoxChange}
        onValueChange={setIsChecked}
           boxType={'square'}
          borderWidth={1}
          borderColor={colors.primary}
          onFillColor={colors.white}
          onTintColor={colors.primary}
          onCheckColor={colors.red}
          tintColors={{ true: colors.primary, false: colors.grey }}
          // style={styles.checkbox}
        />
        {/* <CheckBox
        value={isChecked}
        onValueChange={setIsChecked}
        tintColors={{ true: '#ff6347', false: '#d3d3d3' }} // Optional: Customize the colors
      />
      <Text style={styles.label}>{isChecked ? 'Checked' : 'Unchecked'}</Text> */}
        
        <Text
          style={[
            MainStyling.paragraph,
            {
              textAlign: 'center',
              marginVertical: wp('2%'),
              color: colors.light_black,
              marginHorizontal: wp('1%'),
            },
          ]}>
          {'  '} I agree with
          <Text
            onPress={() => {
              navigation.navigate('TermCondition');
            }}
            style={[
              MainStyling.mediumText,
              {
                textAlign: 'center',
                marginVertical: wp('2%'),
                color: colors.primary,
                fontWeight: 'bold',
              },
            ]}>
            {' '}
            Term{' '}
          </Text>
          and{' '}
          <Text
            onPress={() => {
              navigation.navigate('TermCondition');
            }}
            style={[
              MainStyling.mediumText,
              {
                textAlign: 'center',
                marginVertical: wp('2%'),
                color: colors.primary,
                fontWeight: 'bold',
              },
            ]}>
            conditions
          </Text>
        </Text>
      </View>
      {errorMessage ? (
        <Text
          style={[
            MainStyling.label,
            {
              color: colors.primary,
              paddingVertical: wp('2%'),
              paddingHorizontal: wp('5%'),
              backgroundColor: colors.grey_white,
            },
          ]}>
          {errorMessage}
        </Text>
      ) : null}

      {isLoading ? (
        <ActivityIndicator size={'small'} color={colors.primary} />
      ) : (
        <Button
          label={'Register Vehicle'}
          buttonStyle={{marginHorizontal: wp('5%')}}
          labelStyle={MainStyling.buttonText}
          onPress={() => {
            if (values?.orgName == '') {
              setErrorMessage('Enter organization name');
            } else if (values?.vehicleNumber == '') {
              setErrorMessage('Enter vehicle number');
            } else if (values?.chasisNumber == '') {
              setErrorMessage('Enter chasis number');
            } else if (values?.engineNumber == '') {
              setErrorMessage('Enter engine number');
            } else if (values?.contactNumber == '') {
              setErrorMessage('Enter contact number');
            } else if (values?.contactNumber?.length != 11){
              setErrorMessage('Invalid contact number')
            } else if (values?.address == '') {
              setErrorMessage('Enter address');
            } else if (values?.kiloMeters == '') {
              setErrorMessage('Enter kiloMeters');
            } else if (values?.pinCode == '') {
              setErrorMessage('Enter pin code');
            } else if (isChecked === false) {
              setErrorMessage('You must agree to the Terms and Conditions before registering your vehicle.');
            } else {
              onAddVehiclePress();
            }
          }}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: ,
    backgroundColor: 'white',
  },

  line: {
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    width: wp('17%'),
    height: 0,
  },
  hours: {
    height: wp('7%'),
    //width: wp('15%'),
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: 'grey',
    paddingHorizontal: wp('3%'),
    alignItems: 'center',
    //justifyContent:"center"
  },
  divider: {
    height: wp('7%'),
  },
  margins: {
    marginHorizontal: wp('4'),
  },
  address: {
    fontSize: wp('4.5%'),
    color: 'black',
  },
  addContainer: {
    backgroundColor: 'rgb(229,55,31)',
    padding: 15,
    marginVertical: wp('5%'),
    width: wp('89%'),
    alignSelf: 'center',
    borderRadius: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: wp('3%'),
  },
  faithV: {
    alignSelf: 'flex-start',
    padding: wp('2%'),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('1%'),
    backgroundColor: 'black',
  },
  flexR: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grey_white,
  },
  iconStyle: {
    backgroundColor: colors.blue,
    padding: wp('1.6%'),
    borderRadius: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginH: {
    marginHorizontal: wp('2%'),
  },
  marginT: {
    marginTop: wp('3%'),
  },
  imageStyles: {
    height: wp('23%'),
    width: wp('23%'),
    borderRadius: 10,
  },
  scheduleV: {
    width: wp('89%'),
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: wp('2%'),
    // padding: wp('2.5%'),
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('5%'),
    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    marginHorizontal: 3,
  },
  checkbox:{
    width: 30,
    height:30,
    backgroundColor:'red'
  }
});
export default AddVehicle;
