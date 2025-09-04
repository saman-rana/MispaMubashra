import React, {useEffect, useState} from 'react';
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
import colors from '../../assets/colors/colors';
import MainStyling from '../../assets/styles/MainStyling';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/Button';
import DrawerHeader from '../../components/DrawerHeader';
import * as Svgs from '../../assets/images/svg';
import {addSchedules} from '../../apis/schedule-apis';
import {useSelector} from 'react-redux';
import Loader from '../../components/Loader';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PreviewSchedule = ({route}) => {
  const navigation = useNavigation();
  const {scheduleData} = route?.params;
  const [isLoading, setIsLoading] = useState(false);
  const userDetails = useSelector(state => state.auth.user);
  console.log(userDetails);
  const onAddSchedule = async () => {
    setIsLoading(true);
    const details = {
      service_type: scheduleData?.service,
      month: scheduleData?.months,
      day: scheduleData?.days,
      time: scheduleData?.selectedDate,
      name: scheduleData?.orgName,
      vehicle_number: scheduleData?.vehicleNumber,
      chassis_number: scheduleData?.chasisNumber,
      engine_number: scheduleData?.engineNumber,
      contact_number: scheduleData?.contactNumber,
      address: scheduleData?.address,
      kilometers: scheduleData?.kiloMeters,
      pincode: scheduleData?.pinCode,
      notes: scheduleData?.notes,
      amount: scheduleData?.amount,
      company_id: scheduleData?.id,
      token: userDetails?.api_token,
    };
    addSchedules(details)
      .then(response => {
        setIsLoading(false);
        console.log('Response add schedule', response);
        navigation.navigate('ScheduleSuccess');
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          console.log(error.response.data);
          // alert(error.response.data.errors.vehicle_number[0]);
        } else {
          console.log(error);
        }
      });
  };

  useEffect(() => {
    // alert(scheduleData?.id);
  }, []);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.white}]}>
      <DrawerHeader />
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
                flex: 0.85,
              },
            ]}>
            Schedule
          </Text>
        </View>
        <View style={MainStyling.divider}></View>
        <View style={MainStyling.screenPadding}>
          <Text style={[MainStyling.subHeading, {fontWeight: '700'}]}>
            IS EVERYTHING CORRECT?
          </Text>
          <View style={MainStyling.dividerTwo} />
          <View style={styles.card}>
            <Text style={[MainStyling.subHeading, {marginVertical: wp('1%')}]}>
              {scheduleData?.service}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
               <Ionicons
                  name={'calendar-clear-outline'}
                  size={wp('6%')}
                  color={colors.blue}
                  />
              {/* <Svgs.Calendar height={wp('7%')} width={wp('7%')} /> */}
              <Text
                style={[
                  MainStyling.subHeading,
                  {marginVertical: wp('1%'), marginHorizontal: wp('2%')},
                ]}>
                {scheduleData?.days}, {scheduleData?.months}{' '}
                {scheduleData?.selectedDate}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {/* <Svgs.Location height={wp('7%')} width={wp('7%')} /> */}
               <Ionicons
                  name={'location-sharp'}
                  size={wp('7%')}
                  color={colors.blue}
                  />
              <Text
                style={[
                  MainStyling.subHeading,
                  {marginVertical: wp('1%'), marginHorizontal: wp('2%')},
                ]}>
                {scheduleData?.address}
              </Text>
            </View>
          </View>
          <View style={MainStyling.divider} />

          <Text style={[MainStyling.subHeading, {fontWeight: '700'}]}>
            CONTACT INFO
          </Text>

          <View style={MainStyling.dividerTwo} />
          <View style={styles.card}>
            <Text style={[MainStyling.subHeading, {marginVertical: wp('1%')}]}>
              {scheduleData?.orgName}
            </Text>
            <Text style={[MainStyling.subHeading, {marginVertical: wp('1%')}]}>
              +{scheduleData?.contactNumber}
            </Text>
            {/* <Text style={[MainStyling.subHeading, {marginVertical: wp('1%')}]}>
              naresh@gmail.com
            </Text> */}
          </View>
          <View style={MainStyling.divider} />
          <Text style={[MainStyling.subHeading, {fontWeight: '700'}]}>
            VEHICLE DETAIL
          </Text>

          <View style={MainStyling.dividerTwo} />
          <View style={styles.card}>
            <Text style={[MainStyling.subHeading, {marginVertical: wp('1%')}]}>
              VehicleNumber : {scheduleData?.vehicleNumber}
            </Text>
            <Text style={[MainStyling.subHeading, {marginVertical: wp('1%')}]}>
              chasisNumber : {scheduleData?.chasisNumber}
            </Text>
            <Text style={[MainStyling.subHeading, {marginVertical: wp('1%')}]}>
              engineNumber : {scheduleData?.engineNumber}
            </Text>
            <Text style={[MainStyling.subHeading, {marginVertical: wp('1%')}]}>
              kiloMeters : {scheduleData?.kiloMeters}
            </Text>
          </View>
        </View>
      </ScrollView>
      {isLoading ? (
        <Loader />
      ) : (
        <Button
          label={'Schdule Appointment'}
          buttonStyle={{marginHorizontal: wp('5%')}}
          labelStyle={MainStyling.buttonText}
          onPress={() => {
            onAddSchedule();
            //
          }}
        />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  card: {
    backgroundColor: colors.white,
    width: wp('89%'),
    borderRadius: 10,
    padding: wp('5%'),
    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 4,
    alignSelf: 'center',
    marginBottom: wp('3%'),
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
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: 'grey',
    paddingHorizontal: wp('3%'),
    alignItems: 'center',
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
});
export default PreviewSchedule;
