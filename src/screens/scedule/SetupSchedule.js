import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
  Image,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../assets/colors/colors';
import MainStyling from '../../assets/styles/MainStyling';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import BottomSheetOpener from '../../components/skills/BottomSheetOpener';
import RBSheet from 'react-native-raw-bottom-sheet';
import Calendar from '../../components/Calendar';
import DrawerHeader from '../../components/DrawerHeader';
import Loader from '../../components/Loader';
import {Image_URL} from '../../apis/apis';
import {companyList} from '../../apis/company-apis';
import DisableInputs from '../../components/DisableInputs';

const SetupSchedule = ({route}) => {
  const navigation = useNavigation();
  const dropDownRef = useRef();
  const dropDownMonthsRef = useRef();
  const dropDownDaysRef = useRef();
  const [text, setText] = useState('');
  const {selectedCompanyDetail, detailSchedule, reschedule} = route?.params;
  const [service, setservice] = useState('Select type of Service');
  const [months, setMonths] = useState('Month');
  const [days, setDays] = useState('Day');
  const [time, setTime] = useState('Time');
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [domainServices, setDomainServices] = useState('');
  const [values, setValues] = useState({
    orgName:
      `${detailSchedule?.company_info?.company_name}` === 'undefined'
        ? ''
        : `${detailSchedule?.company_info?.company_name}`,
    amount:
      `${detailSchedule?.amount}` === 'undefined'
        ? ''
        : `${detailSchedule?.amount}`,
    kiloMeters:
      `${detailSchedule?.kilometers}` === 'undefined'
        ? ''
        : `${detailSchedule?.kilometers}`,
    vehicleNumber: detailSchedule?.vehicle_number,
    chasisNumber: detailSchedule?.chassis_number,
    engineNumber: detailSchedule?.engine_number,
    contactNumber: detailSchedule?.contact_number,
    address: detailSchedule?.address,
    pinCode: detailSchedule?.pincode,
    notes: '',
    errorMessage: '',
  });

  const [skill, setSkill] = useState([
    {
      title: 'Cleanliness',
    },
    {
      title: 'Teamwork',
    },
  ]);

  const [serviceArray, setserviceArray] = useState([
    {
      id: 0,
      title: 'Mechanical Services:',
      subServices: [
        {id: 0, title: 'Engine overalling mechanical r&r'},
        {id: 1, title: 'Transmission gearbox over alling r and r'},
        {id: 2, title: 'Differential transmission overalling r and r'},
        {id: 3, title: 'Clutch overalling R and R'},
        {id: 4, title: 'Clutch hydraulic overalling'},
      ],
    },
    {
      id: 1,
      title: 'Electrical Services',
      subServices: [
        {id: 0, title: 'self starter service and oralling r and r'},
        {
          id: 1,
          title:
            'Alternator dynamo power generator service and oralling r and r',
        },
      ],
    },
    {
      id: 2,
      title: 'Body Services',
      subServices: [
        {id: 0, title: 'Denting and painting'},
        {id: 1, title: 'Win-shield glasses and around window glasses'},
      ],
    },
    {
      id: 3,
      title: 'Air condition Services',
      subServices: [
        {id: 0, title: 'Any fuel products service and r and r'},
        {id: 1, title: 'Wheel alignment section r and r'},
      ],
    },
  ]);

  const [monthsArray, setMonthsArray] = useState([
    {
      id: 0,
      title: 'January',
    },
    {
      id: 1,
      title: 'February',
    },
    {
      id: 2,
      title: 'March',
    },
    {
      id: 3,
      title: 'April',
    },
    {
      id: 4,
      title: 'May',
    },
    {
      id: 5,
      title: 'June',
    },
    {
      id: 6,
      title: 'July',
    },
    {
      id: 7,
      title: 'August',
    },
    {
      id: 8,
      title: 'September',
    },
    {
      id: 9,
      title: 'October',
    },
    {
      id: 10,
      title: 'November',
    },
    {
      id: 11,
      title: 'December',
    },
  ]);

  const [daysArray, setDaysArray] = useState([
    {
      id: 0,
      title: 'Monday',
    },
    {
      id: 1,
      title: 'Tuesday',
    },
    {
      id: 2,
      title: 'Wednesday',
    },
    {
      id: 3,
      title: 'Thursday',
    },
    {
      id: 4,
      title: 'Friday',
    },
    {
      id: 5,
      title: 'Saturday',
    },
    {
      id: 6,
      title: 'Sunday',
    },
  ]);

  const onChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  useEffect(() => {
    setIsLoading(true);
    // alert(`${detailSchedule?.company_info?.id}`);
    // getCompanyList();
  }, []);

  const itemCard = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          // navigation.navigate('ScheduleDetails');
        }}
        style={styles.card}>
        <Image
          style={{height: wp('11%'), width: wp('11%'), resizeMode: 'contain'}}
          source={{
            uri: `${Image_URL}/${item?.image}`,
          }}
        />
      </TouchableOpacity>
    );
  };

  const Dropdown = () => {
    return (
      <View style={styles.dropDownContainer}>
        <RBSheet
          ref={dropDownRef}
          closeOnDragDown={true}
          height={400}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0,0,0,0.6)',
            },
            draggableIcon: {
              backgroundColor: colors.primary,
              width: wp('13%'),
            },
            container: [styles.sheetContainer, MainStyling?.screenPadding],
          }}>
          <View style={MainStyling?.dividerTwo}></View>
          <FlatList
            data={serviceArray}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{
                  marginVertical: wp('2%'),

                  paddingHorizontal: wp('5%'),
                }}
                onPress={() => {
                  setDomainServices(item?.title);
                }}>
                <Text
                  style={[
                    MainStyling.heading,
                    {
                      backgroundColor: colors.white,
                      color: colors.primary,
                      padding: wp('4%'),
                    },
                  ]}>
                  {item?.title}
                </Text>
                <FlatList
                  data={item?.subServices}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item: subItem, index: subIndex}) => (
                    <TouchableOpacity
                      style={{
                        marginVertical: wp('1%'),
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderWidth: 1.5,
                        borderRadius: 15,
                        borderColor:
                          service === subItem?.title
                            ? colors.primary
                            : colors.white,
                        paddingHorizontal: wp('5%'),
                      }}
                      onPress={() => {
                        setDomainServices(item?.title);
                        setservice(`${item?.title} - ${subItem?.title}`);
                        dropDownRef.current.close();
                      }}>
                      <Text
                        style={[
                          MainStyling.subHeading,
                          {
                            backgroundColor: colors.white,
                            padding: wp('1%'),
                          },
                        ]}>
                        {subItem?.title}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </TouchableOpacity>
            )}
          />
        </RBSheet>
      </View>
    );
  };

  const DropdownMonths = () => {
    return (
      <View style={styles.dropDownContainer}>
        <RBSheet
          ref={dropDownMonthsRef}
          closeOnDragDown={true}
          height={400}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0,0,0,0.6)',
            },
            draggableIcon: {
              backgroundColor: colors.primary,
              width: wp('13%'),
            },
            container: [styles.sheetContainer, MainStyling?.screenPadding],
          }}>
          <View style={MainStyling?.dividerTwo}></View>
          <FlatList
            data={monthsArray}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{
                  marginVertical: wp('2%'),
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1.5,
                  borderRadius: 15,
                  margin: wp('0.2%'),
                  borderColor:
                    months === item?.title ? colors.primary : colors.white,
                  paddingHorizontal: wp('5%'),
                }}
                onPress={() => {
                  setMonths(item?.title);
                  dropDownMonthsRef.current.close();
                }}>
                {/* <Ionicons
                  name={
                    item?.title === 'Male'
                      ? 'male'
                      : item?.title === 'Others'
                      ? 'male-female-sharp'
                      : 'female'
                  }
                  size={wp('6%')}
                  color={service === item?.title ? colors.primary : colors.gray}
                /> */}
                <Text
                  style={[
                    MainStyling.header,
                    {
                      backgroundColor: colors.white,

                      padding: wp('2.5%'),
                    },
                  ]}>
                  {item?.title}
                </Text>
              </TouchableOpacity>
            )}
          />
        </RBSheet>
      </View>
    );
  };

  const DropdownDays = () => {
    return (
      <View style={styles.dropDownContainer}>
        <RBSheet
          ref={dropDownDaysRef}
          closeOnDragDown={true}
          height={400}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0,0,0,0.6)',
            },
            draggableIcon: {
              backgroundColor: colors.primary,
              width: wp('13%'),
            },
            container: [styles.sheetContainer, MainStyling?.screenPadding],
          }}>
          <View style={MainStyling?.dividerTwo}></View>
          <FlatList
            data={daysArray}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{
                  marginVertical: wp('2%'),
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1.5,
                  borderRadius: 15,
                  margin: wp('0.2%'),
                  borderColor:
                    days === item?.title ? colors.primary : colors.white,
                  paddingHorizontal: wp('5%'),
                }}
                onPress={() => {
                  setDays(item?.title);
                  dropDownDaysRef.current.close();
                }}>
                {/* <Ionicons
                  name={
                    item?.title === 'Male'
                      ? 'male'
                      : item?.title === 'Others'
                      ? 'male-female-sharp'
                      : 'female'
                  }
                  size={wp('6%')}
                  color={service === item?.title ? colors.primary : colors.gray}
                /> */}
                <Text
                  style={[
                    MainStyling.header,
                    {
                      backgroundColor: colors.white,

                      padding: wp('2.5%'),
                    },
                  ]}>
                  {item?.title}
                </Text>
              </TouchableOpacity>
            )}
          />
        </RBSheet>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <DrawerHeader />
      {/* {isLoading ? (
        <Loader />
      ) : ( */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: colors.grey_white}}>
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
            Schedules
          </Text>
        </View>
        <View style={MainStyling.dividerTwo}></View>
        {/* <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={images}
          style={MainStyling.screenPadding}
          keyExtractor={item => item.id}
          renderItem={itemCard}
        /> */}
        <View style={MainStyling.screenPadding}>
          <BottomSheetOpener
            data={service}
            placeholder={'Select type of service'}
            label={'Select Service'}
            setSkill={setSkill}
            iconSize={wp('6%')}
            iconPosition={'right'}
            iconName={'chevron-down'}
            onIconPress={() => {
              dropDownRef.current.open();
            }}
          />
          <View
            style={[
              {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}>
            <View style={[{flex: 0.6}]}>
              <BottomSheetOpener
                data={months}
                placeholder={'Month'}
                iconSize={wp('6%')}
                iconPosition={'right'}
                iconName={'chevron-down'}
                onIconPress={() => {
                  dropDownMonthsRef.current.open();
                }}
              />
            </View>
            <View style={[{flex: 0.5, marginLeft: wp('2%')}]}>
              <BottomSheetOpener
                data={days}
                placeholder={'Day'}
                iconSize={wp('6%')}
                iconPosition={'right'}
                iconName={'chevron-down'}
                onIconPress={() => {
                  dropDownDaysRef.current.open();
                }}
              />
            </View>
          </View>

          <BottomSheetOpener
            value={time}
            data={selectedDate ? selectedDate : 'Date'}
            placeholder={'Time'}
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

          <View style={[MainStyling.dividerTwo]}></View>
          <View style={[MainStyling.dividerTwo]}></View>
          <Text style={[MainStyling.paragraph, {color: colors.grey}]}>
            Note: The date and time will be confirmed by the service provider
            within 24 hours after scheduling through MISPA Motors. You'll be
            notified by email, text of a phone call, based on your preference
          </Text>
          <View style={[MainStyling.dividerTwo]}></View>
          <InputField
            value={values.orgName}
            placeholder={'Organization Name'}
            label={'Organization Name'}
            onChangeText={value => {
              onChange('orgName', value);
              setErrorMessage('');
            }}
          />

          <View style={MainStyling.dividerTwo}></View>
          {reschedule === 'true' ? (
            <DisableInputs
              label={'Vehicle Number'}
              value={values.vehicleNumber}
            />
          ) : (
            <InputField
              value={values.vehicleNumber}
              placeholder={'EX: TSO234gz86'}
              label={'Vehicle Number'}
              onChangeText={value => {
                onChange('vehicleNumber', value);
                setErrorMessage('');
              }}
            />
          )}

          <View style={MainStyling.dividerTwo}></View>
          {reschedule === 'true' ? (
            <DisableInputs
              label={'Chasis Number'}
              value={values.chasisNumber}
            />
          ) : (
            <InputField
              value={values.chasisNumber}
              placeholder={'EX: TSO234gz86'}
              label={'Chasis Number'}
              onChangeText={value => {
                onChange('chasisNumber', value);
                setErrorMessage('');
              }}
            />
          )}
          <View style={MainStyling.dividerTwo}></View>
          {reschedule === 'true' ? (
            <DisableInputs
              label={'Engine Number'}
              value={values.engineNumber}
            />
          ) : (
            <InputField
              value={values.engineNumber}
              placeholder={'EX: TSO234gz86'}
              label={'Engine Number'}
              onChangeText={value => {
                onChange('engineNumber', value);
                setErrorMessage('');
              }}
            />
          )}
          <View style={MainStyling.dividerTwo}></View>
          <InputField
            keyboardType={'numeric'}
            maxLength={12}
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
            keyboardType={'numeric'}
            value={values.pinCode}
            maxLength={6}
            placeholder={'EX: 23432'}
            label={'Pincode'}
            onChangeText={value => {
              onChange('pinCode', value);
              setErrorMessage('');
            }}
          />
          <View style={MainStyling.dividerTwo}></View>
          <TextInput
            style={styles.input}
            value={values.notes}
            multiline={true}
            numberOfLines={4}
            placeholder={'Notes'}
            label={'Notes'}
            onChangeText={value => {
              onChange('notes', value);
            }}
          />
          <View style={MainStyling.divider}></View>
        </View>
      </ScrollView>
      {/* )} */}
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

      <Button
        label={'Continue'}
        buttonStyle={{marginHorizontal: wp('5%')}}
        labelStyle={MainStyling.buttonText}
        onPress={() => {
          if (service == 'Select type of Service') {
            setErrorMessage('Select service');
          } else if (months == 'Month') {
            setErrorMessage('Select months');
          } else if (days == 'Day') {
            setErrorMessage('Select day');
          } else if (selectedDate == '') {
            setErrorMessage('Select date');
          } else if (values?.orgName == '') {
            setErrorMessage('Enter organization name');
          } else if (values?.vehicleNumber == '') {
            setErrorMessage('Enter vehicle number');
          } else if (values?.chasisNumber == '') {
            setErrorMessage('Enter chasis number');
          } else if (values?.engineNumber == '') {
            setErrorMessage('Enter engine number');
          } else if (values?.contactNumber == '') {
            setErrorMessage('Enter contact number');
          } else if (values?.address == '') {
            setErrorMessage('Enter address');
          } else if (values?.kiloMeters == '') {
            setErrorMessage('Enter kiloMeters');
          } else if (values?.pinCode == '') {
            setErrorMessage('Enter pin code');
          } else {
            navigation.navigate('PreviewSchedule', {
              scheduleData: {
                service: service,
                months: months,
                days: days,
                time: time,
                selectedDate: selectedDate,
                orgName: values?.orgName,
                amount: values?.amount,
                vehicleNumber: values?.vehicleNumber,
                chasisNumber: values?.chasisNumber,
                engineNumber: values?.engineNumber,
                contactNumber: values?.contactNumber,
                address: values?.address,
                kiloMeters: values?.kiloMeters,
                pinCode: values?.pinCode,
                notes: values?.notes,
                id: detailSchedule?.company_info?.id
                  ? detailSchedule?.company_info?.id
                  : selectedCompanyDetail?.id,
              },
            });
          }
        }}
      />
      <Calendar
        hideTimePicker={hideTimePicker}
        isTimePickerVisible={isTimePickerVisible}
        setSelectedDate={setSelectedDate}
      />
      {Dropdown()}
      {DropdownMonths()}
      {DropdownDays()}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  input: {
    color: colors.black,
    height: wp('45%'),
    width: wp('87%'),
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderWidth: 2,
    borderRadius: 7,
    textAlignVertical: 'top',
    padding: wp('3.5%'),
    marginVertical: wp('2%'),
    // fontSize: wp('3.5%'),
    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 3,
  },
  dropDownContainer: {
    borderRadius: 10,
    // borderWidth: 1,
  },
  sheetContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: colors.grey_white,
    borderWidth: 1,
  },
  card: {
    height: wp('15%'),
    width: wp('15%'),
    borderRadius: 40,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('2.5%'),
    marginVertical: wp('2.5%'),
    backgroundColor: colors.white,
    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});
export default SetupSchedule;
