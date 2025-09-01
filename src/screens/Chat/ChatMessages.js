import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import MainStyling from '../../assets/styles/MainStyling';
import colors from '../../assets/colors/colors';
import DrawerHeader from '../../components/DrawerHeader';
import Loader from '../../components/Loader';
import {jobList, onSendMessage} from '../../apis/messages-apis';
import {useSelector} from 'react-redux';
import InputField from '../../components/InputField';
import {COMPANY_IMAGE, COMPANY_IMAGE_URL, Message_IMAGE} from '../../apis/apis';

const ChatMessages = ({route}) => {
  const navigation = useNavigation();
  const {jobDetail} = route.params;
  const userDetails = useSelector(state => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [values, setValues] = useState({
    message: 'hi the is ',
    shedule: '1',
    token: userDetails?.api_token,
  });

  const [chat, setChat] = useState([]);

  const onSendMessagePress = async () => {
    setIsLoading(true);
    const details = {
      message: message,
      shedule_id: jobDetail?.id,
      token: userDetails?.api_token,
    };
    onSendMessage(details)
      .then(response => {
        console.log('Response for Sendmessages: ', response);
        setMessage('');
        getJobList();
      })
      .catch(({response}) => {
        // setErrorMessage(response?.data?.error)
        console.log('message important', response?.data);
        setIsLoading(false);
      });
  };

  const getJobList = async () => {
    // alert(jobDetail?.id);
    const details = {
      id: jobDetail?.id,
    };
    jobList(details)
      .then(response => {
        console.log('Response for jobList: s', response?.job?.chat_history);
        setChat(response?.job?.chat_history);
        setIsLoading(false);
      })
      .catch(({response}) => {
        console.log(response, 'error for jobList: s');
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getJobList();
  }, []);

  const chatCard = ({item}) => {
    console.log(
      'mmmm',
      item?.sender_id,
      jobDetail?.user_id,
      userDetails?.user_id,
    );
    if (item?.sender_id) {
      return (
        <View style={[]}>
          <View style={[MainStyling.divider]}></View>
          {item?.image ? (
            <View
              style={[
                styles.chat,
                {
                  borderTopLeftRadius: wp('8%'),
                  borderTopRightRadius: wp('8%'),
                  borderBottomLeftRadius: wp('8%'),
                  borderBottomRightRadius: 0,
                  alignSelf: 'flex-end',
                  backgroundColor: colors.primary,
                },
              ]}>
              <Text
                style={[
                  MainStyling.subHeading,
                  {
                    color: colors.white,
                  },
                ]}>
                {item?.image}
              </Text>
            </View>
          ) : (
            <View
              style={[
                styles.chat,
                {
                  borderTopLeftRadius: wp('8%'),
                  borderTopRightRadius: wp('8%'),
                  borderBottomLeftRadius: wp('8%'),
                  borderBottomRightRadius: 0,
                  alignSelf: 'flex-end',
                  backgroundColor: colors.primary,
                },
              ]}>
              <Text
                style={[
                  MainStyling.subHeading,
                  {
                    color: colors.white,
                  },
                ]}>
                {item?.message}
              </Text>
            </View>
          )}
        </View>
      );
    } else {
      return (
        <View style={[]}>
          <View style={[MainStyling.divider]}></View>
          {item?.image ? (
            <View
              style={[
                styles.chat,
                {
                  borderTopLeftRadius: wp('8%'),
                  borderTopRightRadius: wp('8%'),
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: wp('8%'),
                  alignSelf: 'flex-start',
                  backgroundColor: colors.light_grey,
                },
              ]}>
              <Image
                style={styles.imageStyle}
                source={{uri: `${Message_IMAGE}${item?.image}`}}
              />
              {/* <Text
                style={[
                  MainStyling.subHeading,
                  {
                    color: colors.black,
                  },
                ]}>
                {item?.image}
              </Text> */}
            </View>
          ) : (
            <View
              style={[
                styles.chat,
                {
                  borderTopLeftRadius: wp('8%'),
                  borderTopRightRadius: wp('8%'),
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: wp('8%'),
                  alignSelf: 'flex-start',
                  backgroundColor: colors.light_grey,
                },
              ]}>
              <Text
                style={[
                  MainStyling.subHeading,
                  {
                    color: colors.black,
                  },
                ]}>
                {item?.message}
              </Text>
            </View>
          )}
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.white}]}>
      <DrawerHeader />
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView
          style={{backgroundColor: colors.grey_white}}
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
              Messages
            </Text>
          </View>

          <View
            style={[
              styles.card,
              {
                flex: 1,
                backgroundColor: colors.light_red,
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: wp('3%'),
              },
            ]}>
            <Image
              style={styles.image}
              source={{
                uri: `${COMPANY_IMAGE}${jobDetail?.company_info?.company_image}`,
              }}
            />
            <View
              style={{
                marginHorizontal: wp('3%'),
                flex: 1,
                flexDirection: 'row',
                alignSelf: 'center',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={[MainStyling.buttonText, styles.title]}>
                  {jobDetail?.name}
                </Text>
                <Text style={[MainStyling.label, {color: colors.gray}]}>
                  {jobDetail?.time}
                </Text>
              </View>
            </View>
          </View>

          <View style={[MainStyling.screenPadding]}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              vertical={true}
              data={chat}
              keyExtractor={item => item.id}
              renderItem={chatCard}
            />
          </View>
        </ScrollView>
      )}
      {jobDetail?.scheduling_status != '4' ? (
        <View style={[styles.iconV]}>
          <InputField
            inputContainerStyle={{flex: 1}}
            value={message}
            placeholder={'Type your message here...'}
            onChangeText={value => {
              setMessage(value);
            }}
          />
          <View style={[styles.bar]}>
            <MaterialCommunityIcons
              onPress={() => {
                onSendMessagePress();
                // navigation.navigate('InboxChat', {
                //   history: {
                //     id: chatHistory?.id,
                //     user_id: chatHistory?.user_id,
                //     schedule_id: chatHistory?.schedule_id,
                //     message: chatHistory?.message,
                //     flag: chatHistory?.flag,
                //     sender_id: chatHistory?.sender_id,
                //     receiver_id: chatHistory?.receiver_id,
                //     created_at: chatHistory?.created_at,
                //     updated_at: chatHistory?.updated_at,
                //   },
                // });
              }}
              name="send"
              size={wp('6%')}
              color={colors.blue}
              style={{alignSelf: 'flex-end'}}
            />
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scheduleT: {
    color: 'black',
    fontSize: wp('5%'),
    fontWeight: 'bold',
    // marginHorizontal: wp("20%"),
  },
  card: {
    marginVertical: wp('1.5%'),
    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    // shadowOpacity: 0.9,
    // shadowRadius: 3,
  },
  image: {
    height: wp('21%'),
    width: wp('23%'),
  },
  title: {
    color: colors.black,
    fontWeight: '600',
  },
  chat: {
    // width: wp('20%'),
    padding: wp('4%'),
    backgroundColor: colors.light_grey,
  },
  iconV: {
    flexDirection: 'row',
    paddingVertical: wp('2%'),
    marginHorizontal: wp('3%'),
  },
  bar: {
    height: wp('10%'),
    marginLeft: wp('3'),
    // width: wp('52%'),
    borderRadius: wp('5%'),
    padding: wp('1.5%'),
    backgroundColor: colors.light_grey,
    alignSelf: 'flex-end',
  },
  imageStyle: {
    height: wp('45%'),
    width: wp('45%'),
    resizeMode: 'contain',
    borderTopLeftRadius: wp('8%'),
    borderTopRightRadius: wp('8%'),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: wp('8%'),
  },
});
export default ChatMessages;
