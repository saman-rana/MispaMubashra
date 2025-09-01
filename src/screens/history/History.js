import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import {useSelector} from 'react-redux';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import DrawerHeader from '../../components/DrawerHeader';
import colors from '../../assets/colors/colors';
import {advertisementList, sheduleList} from '../../apis/company-apis';
import Loader from '../../components/Loader';
import Advertisements from '../../components/advertisements/Advertisements';
import {COMPANY_IMAGE_URL} from '../../apis/apis';
import MainStyling from '../../assets/styles/MainStyling';

const History = () => {
  const navigation = useNavigation();
  const userDetails = useSelector(state => state.auth.user);
  const [advertisement, setAdvertisement] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [upcomingRefreshing, setUpcomingRefreshing] = useState(false);
  const [brand, setBrand] = useState([]);

  const getAdvertisementList = async () => {
    const details = {};
    advertisementList(details)
      .then(response => {
        console.log('Response of the: ', response?.user);
        setAdvertisement(response?.show);
        setIsLoading(false);
      })
      .catch(({response}) => {
        console.log(response);
        setIsLoading(false);
      });
  };

  const getSheduleList = () => {
    setIsLoading(true);
    const details = {
      token: userDetails?.api_token,
    };
    sheduleList(details)
      .then(response => {
        console.log('Response show there for SheduleListssss', response);
        setBrand(response?.schedule);
        setIsLoading(false);
        setUpcomingRefreshing(false);
      })
      .catch(({error}) => {
        setIsLoading(false);
        setUpcomingRefreshing(false);
      });
  };

  const sortedBrand = brand.slice().sort((a, b) => {
    return new Date(b?.created_at) - new Date(a?.created_at);
  });

  const ChatInbox = ({item}) => {
    if (item?.scheduling_status === '4') {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DetailChatEstimaion', {
              detailSchedule: item,
            });
          }}
          style={{
            backgroundColor: colors.light_red,
            marginVertical: wp('2%'),
            marginHorizontal: wp('1%'),
            paddingVertical: wp('3%'),
            borderRadius: 10,
            elevation: 3,
          }}>
          <View style={[styles.card]}>
            <Image
              style={styles.image}
              source={{
                uri: `${COMPANY_IMAGE_URL}${item?.company_info?.company_image}`,
              }}
            />
            <View style={{marginHorizontal: wp('3%'), flex: 1}}>
              <Text style={[MainStyling.buttonText, styles.title]}>
                {item?.name}
              </Text>

              <Text style={[MainStyling.label, {color: colors.gray}]}>
                {item?.time}
              </Text>

              <Text
                style={[MainStyling.label, {color: colors.gray}, styles.cityT]}>
                {item?.address}{' '}
              </Text>
            </View>
          </View>

          <View style={styles.containerMargin}>
            <Text style={[MainStyling.label, styles.title]}>
              Service completed
            </Text>
            <Text style={[MainStyling.label, {color: colors.gray}]}>
              {item?.company_info?.company_name}
            </Text>
            <Text style={[MainStyling.label, {color: colors.gray}]}>
              {item?.service_type}
            </Text>
          </View>
          <View
            onPress={() => {}}
            style={[
              {
                backgroundColor: colors.primary,
                borderRadius: 30,
                position: 'absolute',
                right: 10,
                top: 10,
                paddingHorizontal: wp('3%'),
                paddingVertical: wp('1%'),
              },
            ]}>
            <Text style={[MainStyling.label, {color: colors.white}]}>
              Completed
            </Text>
          </View>
          <View
            onPress={() => {}}
            style={[
              {
                backgroundColor: colors.primary,
                borderRadius: 30,
                position: 'absolute',
                left: 10,
                top: 10,
                paddingHorizontal: wp('3%'),
                paddingVertical: wp('1%'),
              },
            ]}>
            <Text style={[MainStyling.label, {color: colors.white}]}>
              {`Job Card: #${item?.vehicle_number}`}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  useEffect(() => {
    getAdvertisementList();
    const unsubscribe = navigation.addListener('focus', () => {
      setIsLoading(true);
      getSheduleList();
    });
    return unsubscribe;
  }, [navigation]);

  const advCard = ({item}) => {
    return <Advertisements item={item} />;
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.white}]}>
      <DrawerHeader />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <ScrollView>
              <Text
                style={[
                  MainStyling.heading,
                  {
                    textAlign: 'center',
                  },
                ]}>
                Service History
              </Text>
              <View style={MainStyling.dividerTwo} />

              <View style={[styles.secondContainer, styles.margins]}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={advertisement}
                  keyExtractor={item => item.id}
                  renderItem={advCard}
                />
              </View>
              {sortedBrand?.length <= 0 ? (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: wp('9%'),
                  }}>
                  <Text style={[MainStyling?.header, {color: colors.gray}]}>
                    No Service history found
                  </Text>
                </View>
              ) : (
                <FlatList
                  style={[MainStyling.screenPadding, {flex: 1}]}
                  showsHorizontalScrollIndicator={false}
                  vertical={true}
                  data={sortedBrand}
                  keyExtractor={item => item.id}
                  renderItem={ChatInbox}
                  refreshControl={
                    <RefreshControl
                      refreshing={upcomingRefreshing}
                      onRefresh={() => {
                        getSheduleList();
                      }}
                      tintColor={colors.primary}
                      colors={[colors.primary, colors.red, colors.primary]}
                    />
                  }
                />
              )}
            </ScrollView>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  secondContainer: {
    marginVertical: wp('4%'),
  },

  margins: {
    marginHorizontal: wp('4'),
  },
  heading: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },

  image: {
    height: wp('13%'),
    width: wp('13%'),
    borderRadius: 15,
    marginLeft: wp('4%'),
    marginBottom: wp('3%'),
    backgroundColor: colors.light_grey,
  },

  title: {
    color: colors.black,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: wp('9%'),
  },

  containerMargin: {
    marginHorizontal: wp('5%'),
    marginVertical: wp('1%'),
  },
});

export default History;
