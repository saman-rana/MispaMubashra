import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  StatusBar,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import MainStyling from '../../assets/styles/MainStyling';
import colors from '../../assets/colors/colors';
import DrawerHeader from '../../components/DrawerHeader';
import {sheduleStatusUpdate} from '../../apis/company-apis';
import Feather from 'react-native-vector-icons/Feather';
import ScheduleEstimationCard from '../../components/schedule/ScheduleEstimationCard';
import Button from '../../components/Button';
import {getJobInvoice} from '../../apis/payment-apis';

const DetailChatEstimaion = ({route}) => {
  const {detailSchedule} = route?.params;
  const userDetails = useSelector(state => state.auth.user);
  const navigation = useNavigation();
  const [moreData, seeMoredata] = useState(false);
  const [selectedEstimation, setSelectedEstimation] = useState('');
  const [estimation, setEstimation] = useState(detailSchedule?.estimations);
  const [invoice, setInvoice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenContactDail = phone => {
    const phoneNumber = `tel:${phone}`;
    Linking.openURL(phoneNumber);
  };

  const startJob = () => {
    setIsLoading(true);
    const details = {
      token: userDetails?.api_token,
      scheduling_status: 6,
      id: detailSchedule?.id,
      job_id: detailSchedule?.id,
      estimation_id: selectedEstimation,
    };
    sheduleStatusUpdate(details)
      .then(response => {
        console.log('Response job 20', response);
        navigation.navigate('InboxChat');
        setIsLoading(false);
      })
      .catch(({error}) => {
        console.log(error, 'errorerroerrorr');
        setIsLoading(false);
      });
  };

  const getInvoice = () => {
    const details = {
      id: detailSchedule?.id,
    };
    getJobInvoice(details)
      .then(response => {
        console.log('invoice job 20', response?.invoice_url);
        setInvoice(response?.invoice_url);
        setIsLoading(false);
      })
      .catch(({error}) => {
        console.log(error, 'errorerroerrorr');
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(false);
    getInvoice();
  }, []);

  return (
    <SafeAreaView
      style={[MainStyling.container, {backgroundColor: colors.white}]}>
      <StatusBar backgroundColor={colors.white} barStyle="light-content" />

      <DrawerHeader />
      <ScrollView
        style={{
          backgroundColor: colors.grey_white,
          marginBottom: wp('32%'),
        }}
        showsVerticalScrollIndicator={false}>
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
            Schedule detail
            {'  '}
          </Text>
        </View>

        {detailSchedule?.scheduling_status === '4' ||
        detailSchedule?.scheduling_status === '2' ? (
          <Button
            variant="outline"
            label={'Invoice'}
            buttonStyle={{
              marginHorizontal: wp('5%'),
              height: wp('8'),
            }}
            outerStyle={{
              alignSelf: 'flex-end',
            }}
            labelStyle={MainStyling.buttonText}
            onPress={() => {
              navigation?.navigate('Invoice', {
                invoice: detailSchedule?.url,
              });
            }}
          />
        ) : null}
        <View
          style={{
            marginHorizontal: wp('7%'),
            marginVertical: wp('8%'),
            flex: 1,
          }}>
          <View style={[MainStyling.flxDirection]}>
            <Text style={[MainStyling.paragraph, {color: colors.black}]}>
              Schedule status
            </Text>
            <View>
              {detailSchedule?.scheduling_status === '2' ? (
                <View onPress={() => {}} style={[styles.statusJob]}>
                  <Text style={[MainStyling.label, {color: colors.white}]}>
                    Started
                  </Text>
                </View>
              ) : detailSchedule?.scheduling_status === '3' ? (
                <View onPress={() => {}} style={[styles.statusJob]}>
                  <Text style={[MainStyling.label, {color: colors.white}]}>
                    Pending
                  </Text>
                </View>
              ) : detailSchedule?.scheduling_status === '4' ? (
                <View onPress={() => {}} style={[styles.statusJob]}>
                  <Text style={[MainStyling.label, {color: colors.white}]}>
                    Completed
                  </Text>
                </View>
              ) : detailSchedule?.scheduling_status === '6' ? (
                <View onPress={() => {}} style={[styles.statusJob]}>
                  <Text style={[MainStyling.label, {color: colors.white}]}>
                    Requested
                  </Text>
                </View>
              ) : (
                <View onPress={() => {}} style={[styles.statusJob]}>
                  <Text style={[MainStyling.label, {color: colors.white}]}>
                    Ongoing
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View style={MainStyling?.dividerTwo} />
          <View style={MainStyling.flxDirection}>
            <Text style={[MainStyling.paragraph, {color: colors.black}]}>
              Service type:
            </Text>
            <Text
              style={[
                MainStyling.header,
                {color: colors.black, width: wp('50%'), textAlign: 'right'},
              ]}>
              {detailSchedule?.service_type}
            </Text>
          </View>
          <View style={MainStyling?.dividerTwo} />

          <View style={MainStyling.flxDirection}>
            <Text style={[MainStyling.paragraph, {color: colors.black}]}>
              Service charges:
            </Text>
            <Text
              style={[
                MainStyling.header,
                {color: colors.black, width: wp('30%'), textAlign: 'right'},
              ]}>
              {detailSchedule?.amount}
            </Text>
          </View>
          <View style={MainStyling?.dividerTwo} />

          <View style={MainStyling.flxDirection}>
            <Text style={[MainStyling.paragraph, {color: colors.black}]}>
              Date:
            </Text>
            <Text style={[MainStyling.header, {color: colors.black}]}>
              {detailSchedule?.date}
            </Text>
          </View>

          <View style={MainStyling?.dividerTwo} />
          <View style={MainStyling.flxDirection}>
            <Text style={[MainStyling.paragraph, {color: colors.black}]}>
              Address:
            </Text>
            <Text style={[MainStyling.header, {color: colors.black}]}>
              {detailSchedule?.address}
            </Text>
          </View>
          <View style={MainStyling?.dividerTwo} />

          <View style={MainStyling.flxDirection}>
            <Text style={[MainStyling.paragraph, {color: colors.black}]}></Text>
            <TouchableOpacity
              onPress={() => {
                seeMoredata(!moreData);
              }}>
              <Text
                style={[
                  MainStyling.header,
                  {color: colors.primary, textDecorationLine: 'underline'},
                ]}>
                See
                {moreData ? ' less' : ' more'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={MainStyling?.divider} />
          {moreData ? (
            <>
              <View style={MainStyling?.divider} />

              <Text
                style={[
                  MainStyling.heading,
                  {
                    textAlign: 'center',
                    flex: 0.8,
                  },
                ]}>
                Company detail
              </Text>
              <View style={MainStyling?.divider} />
              <View style={MainStyling.flxDirection}>
                <Text style={[MainStyling.paragraph, {color: colors.black}]}>
                  Company name:
                </Text>
                <Text style={[MainStyling.header, {color: colors.black}]}>
                  {detailSchedule?.name}
                </Text>
              </View>
              <View style={MainStyling?.dividerTwo} />

              <TouchableOpacity
                onPress={() => {
                  handleOpenContactDail(detailSchedule?.contact_number);
                }}
                style={MainStyling.flxDirection}>
                <Text style={[MainStyling.paragraph, {color: colors.black}]}>
                  Company contact:
                </Text>
                <Text style={[MainStyling.header, {color: colors.black}]}>
                  +{detailSchedule?.contact_number}
                </Text>
              </TouchableOpacity>
              <View style={MainStyling?.dividerTwo} />

              <TouchableOpacity
                onPress={() => {
                  handleOpenContactDail(detailSchedule?.contact_number);
                }}
                style={MainStyling.flxDirection}>
                <Text style={[MainStyling.paragraph, {color: colors.black}]}>
                  manager contact:
                </Text>
                <Text style={[MainStyling.header, {color: colors.black}]}>
                  +{detailSchedule?.company_info?.company_other_contact}
                </Text>
              </TouchableOpacity>
              <View style={MainStyling?.dividerTwo} />

              <View style={MainStyling.flxDirection}>
                <Text style={[MainStyling.paragraph, {color: colors.black}]}>
                  Website:
                </Text>
                <Text style={[MainStyling.header, {color: colors.black}]}>
                  {detailSchedule?.company_info?.company_website}
                </Text>
              </View>
              <View style={MainStyling?.dividerTwo} />

              <View style={MainStyling.flxDirection}>
                <Text style={[MainStyling.paragraph, {color: colors.black}]}>
                  Email:
                </Text>
                <Text style={[MainStyling.header, {color: colors.black}]}>
                  {detailSchedule?.company_info?.email}
                </Text>
              </View>
              <View style={MainStyling?.divider} />
              <View style={MainStyling?.divider} />

              <Text
                style={[
                  MainStyling.heading,
                  {
                    textAlign: 'center',
                    flex: 0.8,
                  },
                ]}>
                Vehicle detail
              </Text>
              <View style={MainStyling?.divider} />

              <View style={MainStyling.flxDirection}>
                <Text style={[MainStyling.paragraph, {color: colors.black}]}>
                  Vehicle number:
                </Text>
                <Text style={[MainStyling.header, {color: colors.black}]}>
                  {detailSchedule?.vehicle_number}
                </Text>
              </View>
              <View style={MainStyling?.dividerTwo} />

              <View style={MainStyling.flxDirection}>
                <Text style={[MainStyling.paragraph, {color: colors.black}]}>
                  Chasis number:
                </Text>
                <Text style={[MainStyling.header, {color: colors.black}]}>
                  {detailSchedule?.chassis_number}
                </Text>
              </View>
              <View style={MainStyling?.dividerTwo} />

              <View style={MainStyling.flxDirection}>
                <Text style={[MainStyling.paragraph, {color: colors.black}]}>
                  Engine number:
                </Text>
                <Text style={[MainStyling.header, {color: colors.black}]}>
                  {detailSchedule?.engine_number}
                </Text>
              </View>
              <View style={MainStyling?.dividerTwo} />

              <View style={MainStyling.flxDirection}>
                <Text style={[MainStyling.header, {color: colors.black}]}>
                  Note:
                </Text>
              </View>
              <View style={MainStyling?.dividerTwo} />

              <Text style={[MainStyling.paragraph, {color: colors.black}]}>
                {detailSchedule?.notes}
              </Text>
              <View style={MainStyling?.dividerTwo} />
            </>
          ) : null}
        </View>
        {detailSchedule?.estimations?.length > 0 ? (
          <>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={{marginLeft: wp('3%')}}>
              {estimation[0]?.year ? (
                <ScheduleEstimationCard
                  item={estimation[0]}
                  title="Company Estimation"
                  setSelectedEstimation={setSelectedEstimation}
                  selectedEstimation={selectedEstimation}
                />
              ) : null}
              {estimation[1]?.year ? (
                <ScheduleEstimationCard
                  item={estimation[1]}
                  title="Best Estimation"
                  setSelectedEstimation={setSelectedEstimation}
                  selectedEstimation={selectedEstimation}
                />
              ) : null}
              {estimation[2]?.year ? (
                <ScheduleEstimationCard
                  item={estimation[2]}
                  title="Normal Estimation"
                  setSelectedEstimation={setSelectedEstimation}
                  selectedEstimation={selectedEstimation}
                />
              ) : null}
            </ScrollView>

            {detailSchedule?.scheduling_status === '1' ? (
              <Button
                label={'Start Job'}
                buttonStyle={{
                  marginHorizontal: wp('5%'),
                }}
                outerStyle={{
                  backgroundColor: colors.white,
                }}
                labelStyle={MainStyling.buttonText}
                onPress={() => {
                  if (selectedEstimation) {
                    startJob();
                  } else {
                    Alert.alert('Please select any estimation');
                  }
                }}
              />
            ) : null}
          </>
        ) : (
          <Text
            style={[
              MainStyling.subHeading,
              {
                color: colors.gray,
                textAlign: 'center',
              },
            ]}>
            Wait for company to start estimations
          </Text>
        )}
        {detailSchedule?.scheduling_status === '4' ? (
          <Button
            label={'Reschedule'}
            buttonStyle={{
              marginHorizontal: wp('5%'),
            }}
            outerStyle={{
              backgroundColor: colors.grey_white,
            }}
            labelStyle={MainStyling.buttonText}
            onPress={() => {
              navigation?.navigate('SetupSchedule', {
                detailSchedule: detailSchedule,
                billingTab: 'true',
                reschedule: 'true',
              });
            }}
          />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  statusJob: {
    backgroundColor: colors.green,
    borderRadius: 30,
    paddingHorizontal: wp('3%'),
    paddingVertical: wp('1%'),
    alignSelf: 'flex-end',
  },
});

export default DetailChatEstimaion;
