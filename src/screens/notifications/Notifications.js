import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  RefreshControl,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../assets/colors/colors';
import MainStyling from '../../assets/styles/MainStyling';
import {useNavigation} from '@react-navigation/native';
import DrawerHeader from '../../components/DrawerHeader';
import {vehicleList} from '../../apis/vehicle-api';
// import Notificationss from '../../components/vehicles/Notificationss';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useSelector} from 'react-redux';
import Loader from '../../components/Loader';
import {getNotification} from '../../apis/notifications-api';

const Notifications = () => {
  const dropDownRef = useRef();
  const navigation = useNavigation();
  const userDetails = useSelector(state => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleLists, setVehicleLists] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState();
  const [notificationRefresh, setNotificationRefresh] = useState(false);

  const getVehicleList = async () => {
    const details = {
      token: userDetails?.api_token,
    };
    getNotification(details)
      .then(response => {
        console.log('Response show here for vehicle: ', response?.notification);
        setVehicleLists(response?.notification);
        setIsLoading(false);
        setNotificationRefresh(false);
      })
      .catch(({response}) => {
        console.log(response);
        setIsLoading(false);
        setNotificationRefresh(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getVehicleList();
  }, []);

  const VehicleCard = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: colors.white,
          padding: wp('3%'),
          borderRadius: 8,
          marginVertical: wp('1.5%'),
        }}>
        <Text style={MainStyling?.label}>{`${item?.message_text}`}</Text>
        {/* <Text>{`You have successfully created job with ${item?.message_text}`}</Text> */}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[MainStyling.mainContainer, {backgroundColor: colors.grey_white}]}>
      <DrawerHeader />
      <View style={MainStyling?.dividerTwo}></View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={[
            MainStyling.heading,
            {
              textAlign: 'center',
              flex: 1,
            },
          ]}>
          Notifications
        </Text>
      </View>
      <View style={MainStyling?.dividerTwo}></View>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={[MainStyling.screenPadding, {flex: 1}]}>
          {vehicleLists?.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              vertical={true}
              data={[...vehicleLists].reverse()}
              keyExtractor={item => item.id}
              renderItem={VehicleCard}
              refreshControl={
                <RefreshControl
                  refreshing={notificationRefresh}
                  onRefresh={() => {
                    getVehicleList();
                  }}
                  tintColor={colors.primary}
                  colors={[colors.primary, colors.red, colors.primary]}
                />
              }
            />
          ) : (
            <Text
              style={[
                MainStyling.label,
                {
                  marginVertical: wp('10%'),
                  color: colors.gray,
                  textAlign: 'center',
                },
              ]}>
              No notifications
            </Text>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  VehicleCardStyle: {
    borderRadius: 10,
    marginVertical: wp('3%'),
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('4.5%'),
    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    marginHorizontal: 3,
  },
  imageProfile: {
    height: wp('30%'),
    width: wp('30%'),
    borderRadius: 300,
    alignSelf: 'center',
    borderWidth: 1.5,
    borderColor: colors.primary,
    resizeMode: 'contain',
  },
});
export default Notifications;
