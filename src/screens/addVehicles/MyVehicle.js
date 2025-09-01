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
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../assets/colors/colors';
import MainStyling from '../../assets/styles/MainStyling';
import {useNavigation} from '@react-navigation/native';
import DrawerHeader from '../../components/DrawerHeader';
import {vehicleList} from '../../apis/vehicle-api';
import MyVehicles from '../../components/vehicles/MyVehicles';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useSelector} from 'react-redux';
import Loader from '../../components/Loader';

const MyVehicle = () => {
  const dropDownRef = useRef();
  const navigation = useNavigation();
  const userDetails = useSelector(state => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleLists, setVehicleLists] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState();

  const getVehicleList = async () => {
    const details = {
      token: userDetails?.api_token,
    };
    vehicleList(details)
      .then(response => {
        console.log('Response show here for vehicle: ', response?.show);
        setVehicleLists(response?.show);
        setIsLoading(false);
      })
      .catch(({response}) => {
        console.log(response);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getVehicleList();
  }, []);

  const VehicleCard = ({item}) => {
    return (
      <MyVehicles
        item={item}
        dropDownRef={dropDownRef}
        setSelectedVehicle={setSelectedVehicle}
      />
    );
  };

  const DropdownSheet = () => {
    return (
      <View style={styles.dropDownContainer}>
        <RBSheet
          ref={dropDownRef}
          closeOnDragDown={true}
          height={600}
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={MainStyling?.divider} />

            <Image
              style={styles.imageProfile}
              source={require('./../../assets/images/png/motor.png')}
            />
            <View style={MainStyling?.divider} />
            <View style={{marginHorizontal: wp('3%'), flex: 1}}>
              <View style={MainStyling.flxDirection}>
                <Text style={[MainStyling.paragraph, {color: colors.black}]}>
                  Company name:{' '}
                </Text>
                <Text style={[MainStyling.header, {color: colors.black}]}>
                  {selectedVehicle?.orginization_name}
                </Text>
              </View>
              <View style={MainStyling?.divider} />

              <View style={MainStyling.flxDirection}>
                <Text style={[MainStyling.paragraph, {color: colors.black}]}>
                  Vehicle number:{' '}
                </Text>
                <Text style={[MainStyling.header, {color: colors.black}]}>
                  {selectedVehicle?.vehicle_number}
                </Text>
              </View>
              <View style={MainStyling?.divider} />

              <View style={MainStyling.flxDirection}>
                <Text style={[MainStyling.paragraph, {color: colors.black}]}>
                  Chasis number:{' '}
                </Text>
                <Text style={[MainStyling.header, {color: colors.black}]}>
                  {selectedVehicle?.chasis_number}
                </Text>
              </View>
              <View style={MainStyling?.divider} />

              <View style={MainStyling.flxDirection}>
                <Text style={[MainStyling.paragraph, {color: colors.black}]}>
                  Engine number:{' '}
                </Text>
                <Text style={[MainStyling.header, {color: colors.black}]}>
                  {selectedVehicle?.engin_number}
                </Text>
              </View>
              <View style={MainStyling?.divider} />

              <View style={MainStyling.flxDirection}>
                <Text style={[MainStyling.paragraph, {color: colors.black}]}>
                  Contact number:{' '}
                </Text>
                <Text style={[MainStyling.header, {color: colors.black}]}>
                  {selectedVehicle?.contact_number}
                </Text>
              </View>
            </View>
          </ScrollView>
        </RBSheet>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[MainStyling.mainContainer, {backgroundColor: colors.grey_white}]}>
      <DrawerHeader />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // flex: 1,
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
          My Vehicle
        </Text>
      </View>
      <View style={MainStyling?.divider}></View>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={[MainStyling.screenPadding, {flex: 1}]}>
          {vehicleLists?.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              vertical={true}
              data={vehicleLists}
              keyExtractor={item => item.id}
              renderItem={VehicleCard}
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
              No vehicle
            </Text>
          )}
        </View>
      )}

      {DropdownSheet()}
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
export default MyVehicle;
