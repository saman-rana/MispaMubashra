import React from 'react';
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

const VehicleSuccess = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.white}]}>
      <ScrollView style={{backgroundColor: colors.grey_white}}>
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
                flex: 0.85,
              },
            ]}>
            Confirmation
          </Text>
        </View>
        <View style={MainStyling.screenPadding}>
          <View style={MainStyling.dividerTwo} />
          <View style={styles.card}>
            <Text
              style={[
                MainStyling.header,
                {
                  marginVertical: wp('1%'),
                  textAlign: 'center',
                  width: wp('45%'),
                  alignSelf: 'center',
                },
              ]}>
              Your vehicle is registered successfully
            </Text>
            <View style={MainStyling.dividerTwo} />
            <Text
              style={[
                MainStyling.subHeading,
                {
                  marginVertical: wp('1%'),
                  textAlign: 'center',
                  width: wp('65%'),
                  alignSelf: 'center',
                },
              ]}>
              You will receive a confirmation email from Mispa Motors
            </Text>
            <View style={MainStyling.dividerTwo} />
          </View>
          <Button
            variant="outline"
            label={'My vehicles'}
            buttonStyle={{backgroundColor: colors.grey_white}}
            labelStyle={MainStyling.buttonText}
            onPress={() => {
              navigation.navigate('MyVehicle');
            }}
          />
          <View style={MainStyling.divider} />
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
export default VehicleSuccess;
