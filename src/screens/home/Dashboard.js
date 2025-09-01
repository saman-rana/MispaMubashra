import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Linking,
  StatusBar,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../assets/colors/colors';
import {useNavigation} from '@react-navigation/native';
import * as Svgs from '../../assets/images/svg';
import DrawerHeader from '../../components/DrawerHeader';
import MainStyling from '../../assets/styles/MainStyling';
import SearchingInput from '../../components/SearchingInput';
import {
  advertisementList,
  companyList,
  expertsList,
} from '../../apis/company-apis';
import {COMPANY_IMAGE, COMPANY_IMAGE_URL, Image_URL} from '../../apis/apis';
import Loader from '../../components/Loader';
import {useSelector} from 'react-redux';
import ExpertCard from '../../components/experts/ExpertCard';
import MyVehicles from '../../components/vehicles/MyVehicles';
import {vehicleList} from '../../apis/vehicle-api';
import Advertisements from '../../components/advertisements/Advertisements';
import RBSheet from 'react-native-raw-bottom-sheet';
import FastImage from 'react-native-fast-image';
// import PushNotification from 'react-native-push-notification';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';

const Dashboard = () => {
  const navigation = useNavigation();
  const dropDownRef = useRef();
  const userDetails = useSelector(state => state.auth.user);
  const [filteredVehicleList, setFilteredVehicleList] = useState([]);
  const [searchingValue, setSearchingValue] = useState('');
  const [toggle, setToggle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState();
  const [vehicleLists, setVehicleLists] = useState([]);
  console.log('.......................ss..', userDetails);
  const [expertList, setExpertLists] = useState();
  const [images, setImages] = useState([
    {
      source: require('./../../assets/images/png/mispa.png'),
    },
    {
      source: require('./../../assets/images/png/motor.png'),
    },
    {
      source: require('./../../assets/images/png/Vehicle.png'),
    },
    {
      source: require('./../../assets/images/png/mispa.png'),
    },
  ]);

  const searchVehicle = value => {
    const filteredList = vehicleLists.filter(vehicle =>
      vehicle.vehicle_number.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredVehicleList(filteredList);
  };

  const getCompanyList = async () => {
    const details = {};
    companyList(details)
      .then(response => {
        console.log('Response show here for companyList: ', response?.show);
        setImages(response?.show);
        setIsLoading(false);
      })
      .catch(({response}) => {
        console.log(response);
        setIsLoading(false);
      });
  };

  const getAdvertisementList = async () => {
    const details = {};
    advertisementList(details)
      .then(response => {
        console.log('Response show here for Advertisement: ', response?.user);
        setSchedule(response?.show);
        setIsLoading(false);
      })
      .catch(({response}) => {
        console.log(response);
        setIsLoading(false);
      });
  };

  const getExpertList = async () => {
    const details = {};
    expertsList(details)
      .then(response => {
        console.log('Response show here for SparePart: ', response?.expert);
        setExpertLists(response?.expert);
        setIsLoading(false);
      })
      .catch(({response}) => {
        console.log(response);
        setIsLoading(false);
      });
  };

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

  // const notifications = () => {
  //   PushNotification.configure({
  //     onRegister: function (token) {
  //       console.log('TOKEN android:', token);
  //     },

  //     onNotification: function (notification) {
  //       console.log('NOTIFICATION:', notification);
  //       notification.finish(PushNotificationIOS.FetchResult.NoData);
  //     },

  //     onAction: function (notification) {
  //       console.log('ACTION:', notification.action);
  //       console.log('NOTIFICATION:', notification);
  //     },

  //     onRegistrationError: function (err) {
  //       console.error(err.message, err);
  //     },

  //     permissions: {
  //       alert: true,
  //       badge: true,
  //       sound: true,
  //     },

  //     popInitialNotification: true,

  //     requestPermissions: true,
  //   });
  // };

  useEffect(() => {
    // notifications();
    setIsLoading(true);
    getAdvertisementList();
    getExpertList();
    getCompanyList();
    getVehicleList();
  }, []);
  //
  const itemCard = ({item}) => {
    console.log('imagesss', `${COMPANY_IMAGE}${item?.company_image}`);
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ScheduleDetails', {companyDetail: item});
        }}
        style={styles.card}>
        <FastImage
          style={{
            height: wp('15%'),
            width: wp('15%'),
            resizeMode: 'cover',
            borderRadius: 300,
          }}
          source={{
            uri: `${COMPANY_IMAGE}${item?.company_image}`,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
    );
  };

  const expertCard = ({item}) => {
    return <ExpertCard item={item} />;
  };
  const myVehicles = ({item}) => {
    return (
      <MyVehicles
        item={item}
        dropDownRef={dropDownRef}
        setSelectedVehicle={setSelectedVehicle}
      />
    );
  };

  const advertisementCard = ({item}) => {
    return <Advertisements item={item} />;
  };

  const fieldCard = ({item}) => {
    return (
      <View style={[MainStyling.alignmentCenter, styles.text]}>
        <Text style={[MainStyling.header, {color: colors.white}]}>
          {item?.title?.substring(0, 30)}
        </Text>
      </View>
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
              source={
                require('./../../assets/images/png/motor.png')
                // userDetails?.image
                //   ? {uri: `${COMPANY_IMAGE_URL}${userDetails?.image}`}
                //   : require('./../../assets/images/png/motor.png')
              }
            />
            <View style={MainStyling?.divider} />
            <View style={{marginHorizontal: wp('3%'), flex: 1}}>
              <View style={MainStyling.flxDirection}>
                <Text style={[MainStyling.paragraph, {color: colors.black}]}>
                  Company name:
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
    <SafeAreaView style={[styles.container, {backgroundColor: colors.white}]}>
      <StatusBar backgroundColor={colors?.white} barStyle="dark-content" />

      <DrawerHeader />

      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView
          style={{backgroundColor: colors.grey_white}}
          showsVerticalScrollIndicator={false}>
          <View style={[(styles.firstContainer, styles.margins)]}>
            <Text
              style={[
                MainStyling.heading,
                {marginVertical: wp('1.5%'), color: colors.black},
              ]}>
              MULTI BRAND
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={images}
                keyExtractor={item => item.id}
                renderItem={itemCard}
              />
              <Feather
                onPress={() => {
                  setToggle(!toggle);
                }}
                name={'search'}
                size={wp('8%')}
                color={colors.primary}
              />
            </View>
            {toggle ? (
              <SearchingInput
                icon={'Password'}
                value={searchingValue}
                placeholder={'EX: TS98787Z'}
                onChangeText={value => {
                  setSearchingValue(value);
                  searchVehicle(value);
                }}
              />
            ) : null}
          </View>
          {searchingValue ? null : (
            <View style={[styles.secondContainer, styles.margins]}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                vertical={true}
                data={schedule}
                keyExtractor={item => item.id}
                renderItem={advertisementCard}
              />
            </View>
          )}

          <View style={[styles.thirdContainer, styles.margins]}>
            {searchingValue ? null : (
              <>
                <View
                  style={[
                    styles.scheduleV,
                    {
                      backgroundColor: colors.white,
                    },
                  ]}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ScheduleDetails', {
                        companyDetail: images[0],
                      });
                    }}
                    style={{flex: 1}}>
                    <Text style={MainStyling.header}>SCHEDULE APPOINTMENT</Text>
                    <Text style={MainStyling.paragraph}>
                      Time to give your car some love
                    </Text>
                  </TouchableOpacity>
                  <Feather
                    name={'chevron-right'}
                    size={wp('6%')}
                    color={colors.black}
                  />
                </View>
                <View
                  style={[styles.scheduleV, {backgroundColor: colors.primary}]}>
                  <View style={{flex: 1}}>
                    <Text
                      style={[
                        styles.heading,
                        {textAlign: 'center', color: colors.grey_white},
                      ]}>
                      Register your Vehicle
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: colors.grey_white,
                        marginVertical: wp('1'),
                      }}>
                      Get tarcked all the vehicle information
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('AddVehicle');
                      }}
                      style={styles.addContainer}>
                      <Svgs.Vehicle width={27} />
                      <Text
                        style={[
                          styles.imageTitle,
                          {
                            color: colors.primary,
                            fontWeight: '500',
                            marginHorizontal: wp('2%'),
                          },
                        ]}>
                        ADD VEHICLE
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            <Text
              style={[
                MainStyling.heading,
                {marginVertical: wp('1.5%'), color: colors.black},
              ]}>
              My Vehicles
            </Text>
            {vehicleLists?.length > 0 ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={searchingValue ? filteredVehicleList : vehicleLists}
                keyExtractor={item => item.id}
                renderItem={myVehicles}
              />
            ) : (
              <Text
                style={[
                  MainStyling.label,
                  {
                    marginVertical: wp('3%'),
                    color: colors.gray,
                    textAlign: 'center',
                  },
                ]}>
                No vehicle
              </Text>
            )}

            <Text
              style={[
                MainStyling.heading,
                {marginVertical: wp('1.5%'), color: colors.black},
              ]}>
              Experts
            </Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              vertical={true}
              data={expertList}
              keyExtractor={item => item.id}
              renderItem={expertCard}
            />

            {/* <View style={[MainStyling.divider]}></View>
            <View style={[styles.worker]}>
              <Text style={[MainStyling.header, {paddingHorizontal: wp('2%')}]}>
                Mispa Motors
              </Text>
              <View style={[MainStyling.dividerTwo]}></View>
              <Text
                style={[
                  MainStyling.header,
                  {fontWeight: 'normal', paddingHorizontal: wp('2%')},
                ]}>
                Total worker: 100 members,
              </Text>
              <View style={[MainStyling.dividerTwo]}></View>
              <Text
                style={[
                  MainStyling.header,
                  {fontWeight: 'normal', paddingHorizontal: wp('2%')},
                ]}>
                Work shop radius: 1.5 Acres,
              </Text>
              <View style={[MainStyling.dividerTwo]}></View>
              <View style={{width: wp('80%')}}>
                <FlatList
                  numColumns={3}
                  vertical={true}
                  data={field}
                  keyExtractor={item => item.id}
                  renderItem={fieldCard}
                />
              </View>
            </View> */}
            <View style={[MainStyling.divider]}></View>
          </View>
        </ScrollView>
      )}
      {DropdownSheet()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  firstContainer: {
    flex: 1,
  },
  secondContainer: {
    flex: 1.5,
    marginVertical: wp('4%'),
  },
  thirdContainer: {
    flex: 3,
    backgroundColor: colors.grey_white,
  },
  margins: {
    marginHorizontal: wp('4'),
  },
  heading: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  multi: {
    color: 'black',
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  card: {
    height: wp('15.5%'),
    width: wp('15.5%'),
    borderRadius: 40,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('2.5%'),
    marginVertical: wp('2.5%'),
  },

  addContainer: {
    backgroundColor: colors.grey_white,
    paddingHorizontal: wp('7%'),
    paddingVertical: wp('2%'),
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: wp('3%'),
  },
  imageTitle: {
    color: colors.grey_white,
    //color: colors.black,
    fontSize: wp('4.5%'),
  },

  scheduleV: {
    elevation: 8,
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

  sheetContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: colors.grey_white,
    borderWidth: 1,
  },

  align: {
    justifyContent: 'center',
  },
  image: {
    height: wp('17%'),
    width: wp('17%'),
    borderRadius: 10,
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
  title: {
    fontSize: wp('3%'),
  },
  subTitle: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
  },
  worker: {
    width: wp('90%'),
    backgroundColor: colors.white,
    borderRadius: wp('3%'),
    padding: wp('3.5%'),
  },
  text: {
    heigh: wp('25%'),
    backgroundColor: colors.primary,
    padding: wp('1.2%'),
    margin: 4,
    borderRadius: 8,
    paddingHorizontal: wp('2%'),
  },
});

export default Dashboard;
