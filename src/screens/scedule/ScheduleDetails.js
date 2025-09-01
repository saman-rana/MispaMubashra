import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Linking,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../assets/colors/colors';
import MainStyling from '../../assets/styles/MainStyling';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/Button';
import DrawerHeader from '../../components/DrawerHeader';
import * as Svgs from '../../assets/images/svg';
import {companyList} from '../../apis/company-apis';
import Loader from '../../components/Loader';
import CompanyListCard from '../../components/schedule/CompanyListCard';

const ScheduleDetails = ({route}) => {
  const navigation = useNavigation();
  // const {companyDetail} = route?.params;
  const [selectedCompanyDetail, setSelectedCompanyDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCompany, setselectedCompany] = useState('TATA');
  // companyDetail?.company_name,
  const [images, setImages] = useState([]);

  const handleOpenMap = () => {
    const mapUrl = `https://www.google.com/maps?q=${selectedCompanyDetail?.company_latitude},${selectedCompanyDetail?.company_longitude}`;
    Linking.openURL(mapUrl);
  };
  const handleOpenUrl = url => {
    Linking.openURL(url);
  };

  const handleOpenContactDail = phone => {
    const phoneNumber = `tel:${phone}`;
    Linking.openURL(phoneNumber);
  };

  const getCompanyList = async () => {
    const details = {};
    companyList(details)
      .then(response => {
        console.log('Response show  for CompanyList: ', response?.show);
        const filteredCompanies = response?.show.filter(
          company => company.company_name === selectedCompany,
        );
        setSelectedCompanyDetail(filteredCompanies[0]);
        setselectedCompany(filteredCompanies[0]?.company_name);
        console.log('consolelogsss', filteredCompanies[0]?.company_name);

        setImages(response?.show);

        setIsLoading(false);
      })
      .catch(({response}) => {
        console.log(response);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    setIsLoading(true);
    getCompanyList();
  }, []);

  const itemCard = ({item}) => {
    return (
      <CompanyListCard
        item={item}
        setSelectedCompanyDetail={setSelectedCompanyDetail}
        selectedCompanyDetail={selectedCompanyDetail}
        setselectedCompany={setselectedCompany}
        selectedCompany={selectedCompany}
      />
    );
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.white}]}>
      <DrawerHeader />
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView style={{backgroundColor: colors.grey_white}}>
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
              Schedule
            </Text>
          </View>
          <View style={{paddingHorizontal: wp('5')}}>
            <FlatList
              // style={[MainStyling.screenPadding]}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={images}
              keyExtractor={item => item.id}
              renderItem={itemCard}
            />
          </View>

          <View style={MainStyling.dividerTwo}></View>
          <View style={styles.card}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={MainStyling.header}>
                {selectedCompanyDetail?.company_name}
              </Text>
              <View style={styles.line} />
              <View style={styles.hours}>
                <Feather name={'clock'} size={wp('4%')} color={'white'} />
                <Text
                  style={[
                    MainStyling.mediumText,
                    {color: 'white', marginLeft: 5},
                  ]}>
                  {selectedCompanyDetail?.company_time}
                </Text>
              </View>
            </View>
            <View style={MainStyling.dividerTwo}></View>

            <Text style={MainStyling.mediumText}>
              {selectedCompanyDetail?.company_address}
            </Text>
            <TouchableOpacity
              onPress={() => {
                handleOpenContactDail(selectedCompanyDetail?.company_contact);
              }}
              style={{
                flexDirection: 'row',
                marginTop: wp('3%'),
                alignItems: 'center',
              }}>
                <View style={[styles.callIcon]}>
                  <Ionicons
                  name={'call'}
                  size={wp('3.5%')}
                  color={colors.white}
                  />
                </View>
              {/* <Svgs.Call height={wp('6%')} width={wp('6%')} /> */}
              <Text
                style={[
                  MainStyling.mediumText,
                  styles.marginH,
                  {textDecorationLine: 'underline'},
                ]}>
                + {selectedCompanyDetail?.company_contact}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                handleOpenMap();
              }}
              style={{
                flexDirection: 'row',
                marginTop: wp('3%'),
                alignItems: 'center',
              }}>
                   <Ionicons
                  name={'location-sharp'}
                  size={wp('7%')}
                  color={colors.blue}
                  />
              {/* <Svgs.Location height={wp('7%')} width={wp('7%')} /> */}
              <Text
                style={[
                  MainStyling.mediumText,
                  styles.marginH,
                  {textDecorationLine: 'underline'},
                ]}>
                Get Directions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleOpenUrl(selectedCompanyDetail?.company_website);
              }}
              style={{
                flexDirection: 'row',
                marginTop: wp('3%'),
                alignItems: 'center',
              }}>
                 <Ionicons
                  name={'globe-sharp'}
                  size={wp('6.6%')}
                  color={colors.blue}
                  />
              {/* <Svgs.Web height={wp('6%')} width={wp('6%')} /> */}

              <Text
                style={[
                  MainStyling.mediumText,
                  styles.marginH,
                  {textDecorationLine: 'underline'},
                ]}>
                {selectedCompanyDetail?.company_website}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                flexDirection: 'row',
                marginTop: wp('3%'),
                alignItems: 'center',
              }}>
                 <Ionicons
                  name={'globe-sharp'}
                  size={wp('6.6%')}
                  color={colors.blue}
                  />
              {/* <Svgs.Web height={wp('6%')} width={wp('6%')} /> */}

              <Text
                style={[
                  MainStyling.mediumText,
                  styles.marginH,
                  {textDecorationLine: 'underline'},
                ]}>
                {selectedCompanyDetail?.email}
              </Text>
            </TouchableOpacity>
            <View style={MainStyling.dividerTwo} />
            <Text
              style={[
                MainStyling.header,
                {
                  textDecorationLine: 'underline',
                },
              ]}>
              Manager
            </Text>
            <TouchableOpacity
              onPress={() => {
                handleOpenContactDail(
                  selectedCompanyDetail?.company_other_contact,
                );
              }}
              style={{
                flexDirection: 'row',
                marginTop: wp('3%'),
                alignItems: 'center',
              }}>
                     <View style={[styles.callIcon]}>
                  <Ionicons
                  name={'call'}
                  size={wp('3.5%')}
                  color={colors.white}
                  />
                </View>
              {/* <Svgs.Call height={wp('6%')} width={wp('6%')} /> */}
              <Text
                style={[
                  styles.marginH,
                  MainStyling.mediumText,
                  {textDecorationLine: 'underline', marginVertical: wp('2%')},
                ]}>
                + {selectedCompanyDetail?.company_other_contact}
              </Text>
            </TouchableOpacity>
            <View style={MainStyling.dividerTwo} />
            {/* <Text
              style={[
                MainStyling.header,
                {
                  textDecorationLine: 'underline',
                },
              ]}>
              Supervisor
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: wp('3%'),
                alignItems: 'center',
              }}>
              <Svgs.Call height={wp('6%')} width={wp('6%')} />
              <Text
                style={[
                  styles.marginH,
                  MainStyling.mediumText,
                  {textDecorationLine: 'underline', marginVertical: wp('2%')},
                ]}>
                +91 903409687
              </Text>
            </View>
            <View style={MainStyling.dividerTwo} />

            <Text
              style={[
                MainStyling.header,
                {
                  textDecorationLine: 'underline',
                },
              ]}>
              Manager
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: wp('3%'),
                alignItems: 'center',
              }}>
              <Svgs.Call height={wp('6%')} width={wp('6%')} />
              <Text
                style={[
                  styles.marginH,
                  MainStyling.mediumText,
                  {textDecorationLine: 'underline', marginVertical: wp('2%')},
                ]}>
               {company_other_contact}
              </Text>
            </View>
            <View style={MainStyling.dividerTwo} /> */}

            {/* <Text
              style={[
                MainStyling.header,
                {
                  textDecorationLine: 'underline',
                },
              ]}>
              Senior Technitian
            </Text>

            <View
              style={{
                flexDirection: 'row',
                marginTop: wp('3%'),
                alignItems: 'center',
              }}>
              <Svgs.Call height={wp('6%')} width={wp('6%')} />
              <Text
                style={[
                  styles.marginH,
                  MainStyling.mediumText,
                  {textDecorationLine: 'underline', marginVertical: wp('2%')},
                ]}>
                +91 903409687
              </Text>
            </View> */}
            {/* <View style={[styles.marginT, styles.faithV]}>
              <Text
                style={[
                  MainStyling.mediumText,
                  {
                    color: 'white',
                    fontWeight: 'bold',
                    paddingHorizontal: wp('3%'),
                  },
                ]}>
                Faith first
              </Text>
            </View> */}
            <Text style={[MainStyling.mediumText, {marginVertical: wp('3%')}]}>
              {selectedCompanyDetail?.company_description}
            </Text>
          </View>

          <Button
            label={'Schedule Appointment'}
            buttonStyle={{marginHorizontal: wp('5%')}}
            labelStyle={MainStyling.buttonText}
            onPress={() => {
              navigation.navigate('SetupSchedule', {
                selectedCompanyDetail: selectedCompanyDetail,
              });
            }}
          />
          {/* <View
            style={[
              styles.scheduleV,
              {
                backgroundColor: colors.white,
              },
            ]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SetupSchedule');
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
          </View> */}
          <View style={MainStyling.divider} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: ,
    backgroundColor: 'white',
  },

  card: {
    elevation: 10,
    backgroundColor: 'white',
    //height: wp('15%'),
    width: wp('89%'),
    borderRadius: 10,
    padding: wp('5%'),
    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 3,
    shadowRadius: 5,
    alignSelf: 'center',
    marginBottom: wp('3%'),
  },
  heading: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  line: {
    borderWidth: 0.7,
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
    // height: wp('8%'),
    // width: wp('18%'),
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
  callIcon:{
    padding: wp('1%'),
    backgroundColor:colors.blue,
     borderRadius:300,
    },
});
export default ScheduleDetails;
