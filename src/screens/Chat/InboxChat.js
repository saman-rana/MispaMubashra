import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import MainStyling from '../../assets/styles/MainStyling';
import colors from '../../assets/colors/colors';
import DrawerHeader from '../../components/DrawerHeader';
import {sheduleList, sheduleStatusUpdate} from '../../apis/company-apis';
import Loader from '../../components/Loader';

import ChatCards from '../../components/chatCard/ChatCards';

const InboxChat = ({}) => {
  const userDetails = useSelector(state => state.auth.user);
  const [indexes, setIndexes] = useState(false);
  const navigation = useNavigation();
  const [index, setIndex] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [brand, setBrand] = useState([]);
  const [currentTime, setCurrentTime] = useState('');
  const [providedDate, setProvidedDate] = useState(
    new Date('2024-05-08T21:20:00'),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const timeString = `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`;
      setCurrentTime(timeString);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   const currentDate = new Date();

  //   const timeDifference = providedDate - currentDate;

  //   if (timeDifference <= 0) {
  //     clearInterval(interval);
  //     setCurrentTime('Time has passed');
  //     return;
  //   }

  //   const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  //   const minutes = Math.floor(
  //     (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
  //   );
  //   const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  //   setCurrentTime(`${hours} : ${minutes} : ${seconds} `);
  //   const interval = setInterval(updateTime, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  const getSheduleList = () => {
    setIsLoading(true);
    const details = {
      token: userDetails?.api_token,
    };
    sheduleList(details)
      .then(response => {
        console.log('Response show there for SheduleListssss', response);
        // alert(response?.schedule?.length);
        setBrand(response?.schedule);
        setIsLoading(false);
      })
      .catch(({error}) => {
        console.log(
          error,
          'errorerroerrorrResponse show there for SheduleLists',
        );
        setIsLoading(false);
      });
  };
  const onSheduleStatusUpdate = () => {
    setIsLoading(true);
    const details = {
      token: userDetails?.api_token,
      scheduling_status: 1,
    };
    sheduleStatusUpdate(details)
      .then(response => {
        getSheduleList();

        setIsLoading(false);
      })
      .catch(({error}) => {
        console.log(error, 'errorerroerrorr');
        setIsLoading(false);
      });
  };

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener(
  //     'focus',
  //     () => {

  //       return unsubscribe;
  //     },
  //     [navigation],
  //   );
  // });

  useEffect(() => {
    getSheduleList();
    const unsubscribe = navigation.addListener('focus', () => {
      setIsLoading(false);
      getSheduleList();
    });
    return unsubscribe;
  }, [navigation]);

  const sortedBrand = brand.slice().sort((a, b) => {
    // Assuming each item in brand has a timestamp field
    return new Date(b?.created_at) - new Date(a?.created_at);
  });

  const ChatInbox = ({item}) => {
    return <ChatCards item={item} indexes={indexes} />;
    // if (index === true) {
    //   if (item?.scheduling_status === '3') {
    //     return (
    //       <View
    //         style={{
    //           backgroundColor: colors.light_red,
    //           marginVertical: wp('2%'),
    //           marginHorizontal: wp('2%'),
    //           paddingVertical: wp('4%'),
    //           borderRadius: 10,
    //           elevation: 8,
    //         }}>
    //         <View
    //           style={[
    //             styles.card,
    //             {
    //               flexDirection: 'row',
    //               alignItems: 'center',
    //               marginTop: wp('7%'),
    //             },
    //           ]}>
    //           <FastImage
    //             style={styles.image}
    //             source={{
    //               uri: `${COMPANY_IMAGE}${item?.company_info?.company_image}`,
    //               priority: FastImage.priority.high,
    //             }}
    //             resizeMode={FastImage.resizeMode.contain}
    //           />
    //           <View style={{marginHorizontal: wp('3%'), flex: 1}}>
    //             <Text style={[MainStyling.buttonText, styles.title]}>
    //               {item?.name}
    //             </Text>

    //             <Text style={[MainStyling.label, {color: colors.gray}]}>
    //               {item?.time}
    //             </Text>

    //             <Text
    //               style={[
    //                 MainStyling.label,
    //                 {color: colors.gray},
    //                 styles.cityT,
    //               ]}>
    //               {item?.address}{' '}
    //             </Text>
    //           </View>
    //         </View>
    //         <View
    //           style={{
    //             flexDirection: 'row',
    //             alignItems: 'center',
    //             marginHorizontal: wp('3%'),
    //           }}>
    //           {/* <TouchableOpacity
    //             onPress={() => {
    //               setIndex(false);
    //               navigation.navigate('Billing', {
    //                 job: item,
    //               });
    //             }}
    //             style={[
    //               styles.buttonDC,
    //               {
    //                 backgroundColor: colors.white,
    //                 borderWidth: 1,
    //                 borderColor: colors.primary,
    //                 borderRadius: 30,
    //               },
    //             ]}>
    //             <Text style={[MainStyling.buttonText, {color: colors.primary}]}>
    //               Payment
    //             </Text>
    //           </TouchableOpacity> */}
    //           <TouchableOpacity
    //             onPress={() => {
    //               setIndex(false);
    //               navigation.navigate('DetailChatEstimaion', {
    //                 detailSchedule: item,
    //               });
    //             }}
    //             style={[
    //               styles.buttonDC,
    //               {
    //                 backgroundColor: colors.white,
    //                 borderWidth: 1,
    //                 borderColor: colors.primary,
    //                 borderRadius: 30,
    //               },
    //             ]}>
    //             <Text style={[MainStyling.buttonText, {color: colors.primary}]}>
    //               {' '}
    //               View
    //             </Text>
    //           </TouchableOpacity>
    //           <TouchableOpacity
    //             onPress={() => {
    //               navigation?.navigate('ChatMessages', {jobDetail: item});
    //             }}
    //             style={[
    //               styles.buttonDC,
    //               {
    //                 backgroundColor: colors.primary,
    //                 borderRadius: 30,
    //               },
    //             ]}>
    //             <Text style={[MainStyling.buttonText, {color: colors.white}]}>
    //               {' '}
    //               Chat
    //             </Text>
    //           </TouchableOpacity>
    //         </View>
    //         <TouchableOpacity
    //           onPress={() => {
    //             navigation.navigate('Billing', {
    //               job: item,
    //               billingTab: 'false',
    //             });
    //           }}
    //           style={[
    //             styles.buttonDC,
    //             {
    //               backgroundColor: colors.primary,
    //               borderRadius: 30,
    //               marginHorizontal: wp('3%'),
    //               marginTop: wp('3%'),
    //             },
    //           ]}>
    //           <Text style={[MainStyling.buttonText, {color: colors.white}]}>
    //             Payment {item?.scheduling_status}
    //           </Text>
    //         </TouchableOpacity>
    //         <View
    //           style={{
    //             flexDirection: 'row',
    //             justifyContent: 'space-between',
    //             // marginHorizontal: wp('5%'),
    //             position: 'absolute',
    //             right: wp('5%'),
    //             left: wp('5%'),
    //             top: 10,
    //           }}>
    //           <View
    //             onPress={() => {}}
    //             style={[
    //               {
    //                 backgroundColor: colors.primary,
    //                 borderRadius: 30,

    //                 paddingHorizontal: wp('3%'),
    //                 paddingVertical: wp('1%'),
    //               },
    //             ]}>
    //             <Text style={[MainStyling.label, {color: colors.white}]}>
    //               Job number: #{item?.vehicle_number}
    //             </Text>
    //           </View>
    //           {item?.scheduling_status === '3' ? (
    //             <View
    //               onPress={() => {}}
    //               style={[
    //                 {
    //                   backgroundColor: colors.green,
    //                   borderRadius: 30,

    //                   paddingHorizontal: wp('3%'),
    //                   paddingVertical: wp('1%'),
    //                 },
    //               ]}>
    //               <Text style={[MainStyling.label, {color: colors.white}]}>
    //                 Pending
    //               </Text>
    //             </View>
    //           ) : item?.scheduling_status === '4' ? (
    //             <View
    //               onPress={() => {}}
    //               style={[
    //                 {
    //                   backgroundColor: colors.primary,
    //                   borderRadius: 30,

    //                   paddingHorizontal: wp('3%'),
    //                   paddingVertical: wp('1%'),
    //                 },
    //               ]}>
    //               <Text style={[MainStyling.label, {color: colors.white}]}>
    //                 Completed
    //               </Text>
    //             </View>
    //           ) : (
    //             <View
    //               onPress={() => {}}
    //               style={[
    //                 {
    //                   backgroundColor: colors.primary,
    //                   borderRadius: 30,
    //                   paddingHorizontal: wp('3%'),
    //                   paddingVertical: wp('1%'),
    //                 },
    //               ]}>
    //               <Text style={[MainStyling.label, {color: colors.white}]}>
    //                 Ongoing
    //               </Text>
    //             </View>
    //           )}
    //         </View>

    //         {/* <Text style={[MainStyling.label, {color: colors.red}]}>
    //           {currentTime}
    //         </Text> */}
    //       </View>
    //     );
    //   }
    // } else {
    //   if (item?.scheduling_status != '4') {
    //     return (
    //       <View
    //         style={{
    //           backgroundColor: colors.light_red,
    //           marginVertical: wp('2%'),
    //           paddingVertical: wp('4%'),
    //           borderRadius: 10,
    //           elevation: 8,
    //           marginHorizontal: wp('2%'),
    //         }}>
    //         <View
    //           style={[
    //             styles.card,
    //             {
    //               flexDirection: 'row',
    //               alignItems: 'center',
    //               marginTop: wp('7%'),
    //             },
    //           ]}>
    //           <FastImage
    //             style={styles.image}
    //             source={{
    //               uri: `${COMPANY_IMAGE}${item?.company_info?.company_image}`,
    //               priority: FastImage.priority.high,
    //             }}
    //             resizeMode={FastImage.resizeMode.contain}
    //           />
    //           <View style={{marginHorizontal: wp('3%'), flex: 1}}>
    //             <Text style={[MainStyling.buttonText, styles.title]}>
    //               {item?.name}
    //               {/* {item?.id} */}
    //             </Text>
    //             {/* <Text style={[MainStyling.label, {color: colors.gray}]}>
    //           {item?.scheduling_status}
    //           {item?.scheduling_status === '1'
    //             ? 'Ongoing'
    //             : item?.scheduling_status === '2'
    //             ? 'Started'
    //             : 'Completed'}
    //         </Text> */}
    //             <Text style={[MainStyling.label, {color: colors.gray}]}>
    //               {item?.time}
    //               {/* {item?.day} {item?.month} */}
    //             </Text>

    //             <Text
    //               style={[
    //                 MainStyling.label,
    //                 {color: colors.gray},
    //                 styles.cityT,
    //               ]}>
    //               {item?.address}{' '}
    //             </Text>
    //           </View>
    //         </View>
    //         <View
    //           style={{
    //             flexDirection: 'row',
    //             alignItems: 'center',
    //             marginHorizontal: wp('3%'),
    //           }}>
    //           <TouchableOpacity
    //             onPress={() => {
    //               setIndex(false);
    //               navigation.navigate('DetailChatEstimaion', {
    //                 detailSchedule: item,
    //               });
    //             }}
    //             style={[
    //               styles.buttonDC,
    //               {
    //                 backgroundColor: colors.white,
    //                 borderWidth: 1,
    //                 borderColor: colors.primary,
    //                 borderRadius: 30,
    //               },
    //             ]}>
    //             <Text style={[MainStyling.buttonText, {color: colors.primary}]}>
    //               {' '}
    //               View
    //             </Text>
    //           </TouchableOpacity>
    //           <TouchableOpacity
    //             onPress={() => {
    //               navigation?.navigate('ChatMessages', {jobDetail: item});
    //             }}
    //             style={[
    //               styles.buttonDC,
    //               {
    //                 backgroundColor: colors.primary,
    //                 borderRadius: 30,
    //               },
    //             ]}>
    //             <Text style={[MainStyling.buttonText, {color: colors.white}]}>
    //               {' '}
    //               Chat
    //             </Text>
    //           </TouchableOpacity>
    //         </View>
    //         <View
    //           style={{
    //             flexDirection: 'row',
    //             justifyContent: 'space-between',
    //             // marginHorizontal: wp('5%'),
    //             position: 'absolute',
    //             right: wp('5%'),
    //             left: wp('5%'),
    //             top: 10,
    //           }}>
    //           <View
    //             onPress={() => {}}
    //             style={[
    //               {
    //                 backgroundColor: colors.primary,
    //                 borderRadius: 30,

    //                 paddingHorizontal: wp('3%'),
    //                 paddingVertical: wp('1%'),
    //               },
    //             ]}>
    //             <Text style={[MainStyling.label, {color: colors.white}]}>
    //               Job number: #{item?.vehicle_number}
    //             </Text>
    //           </View>
    //           {item?.scheduling_status === '2' ? (
    //             <View
    //               onPress={() => {}}
    //               style={[
    //                 // styles.buttonDC,
    //                 {
    //                   backgroundColor: colors.green,
    //                   borderRadius: 30,

    //                   paddingHorizontal: wp('3%'),
    //                   paddingVertical: wp('1%'),
    //                 },
    //               ]}>
    //               <Text style={[MainStyling.label, {color: colors.white}]}>
    //                 Started
    //               </Text>
    //             </View>
    //           ) : item?.scheduling_status === '4' ? (
    //             <View
    //               onPress={() => {}}
    //               style={[
    //                 // styles.buttonDC,
    //                 {
    //                   backgroundColor: colors.primary,
    //                   borderRadius: 30,

    //                   paddingHorizontal: wp('3%'),
    //                   paddingVertical: wp('1%'),
    //                 },
    //               ]}>
    //               <Text style={[MainStyling.label, {color: colors.white}]}>
    //                 Completed
    //               </Text>
    //             </View>
    //           ) : (
    //             <View
    //               onPress={() => {}}
    //               style={[
    //                 // styles.buttonDC,
    //                 {
    //                   backgroundColor: colors.primary,
    //                   borderRadius: 30,

    //                   paddingHorizontal: wp('3%'),
    //                   paddingVertical: wp('1%'),
    //                 },
    //               ]}>
    //               <Text style={[MainStyling.label, {color: colors.white}]}>
    //                 Ongoing
    //               </Text>
    //             </View>
    //           )}
    //         </View>
    //         {/* {item?.scheduling_status === '2' ? (
    //           <View
    //             onPress={() => {}}
    //             style={[
    //               // styles.buttonDC,
    //               {
    //                 backgroundColor: colors.green,
    //                 borderRadius: 30,
    //                 position: 'absolute',
    //                 right: 10,
    //                 top: 10,
    //                 paddingHorizontal: wp('3%'),
    //                 paddingVertical: wp('1%'),
    //               },
    //             ]}>
    //             <Text style={[MainStyling.label, {color: colors.white}]}>
    //               Started
    //             </Text>
    //           </View>
    //         ) : item?.scheduling_status === '4' ? (
    //           <View
    //             onPress={() => {}}
    //             style={[
    //               // styles.buttonDC,
    //               {
    //                 backgroundColor: colors.primary,
    //                 borderRadius: 30,
    //                 position: 'absolute',
    //                 right: 10,
    //                 top: 10,
    //                 paddingHorizontal: wp('3%'),
    //                 paddingVertical: wp('1%'),
    //               },
    //             ]}>
    //             <Text style={[MainStyling.label, {color: colors.white}]}>
    //               Completed
    //             </Text>
    //           </View>
    //         ) : (
    //           <View
    //             onPress={() => {}}
    //             style={[
    //               // styles.buttonDC,
    //               {
    //                 backgroundColor: colors.primary,
    //                 borderRadius: 30,
    //                 position: 'absolute',
    //                 right: 10,
    //                 top: 10,
    //                 paddingHorizontal: wp('3%'),
    //                 paddingVertical: wp('1%'),
    //               },
    //             ]}>
    //             <Text style={[MainStyling.label, {color: colors.white}]}>
    //               Ongoing
    //             </Text>
    //           </View>
    //         )} */}
    //         {item?.scheduling_status === '2' ? (
    //           <Text
    //             style={[
    //               MainStyling.heading,
    //               {
    //                 color: colors.primary,
    //                 textAlign: 'center',
    //                 marginTop: wp('2%'),
    //               },
    //             ]}>
    //             {currentTime}
    //           </Text>
    //         ) : null}
    //       </View>
    //     );
    //   }
    // }
  };

  return (
    <SafeAreaView style={MainStyling?.mainContainer}>
      <DrawerHeader />
      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
        }}>
        <Text
          style={[
            MainStyling.header,
            {
              textAlign: 'center',
              flex: 1,
            },
          ]}>
          Messages
        </Text>
      </View> */}
      <View style={styles.viewDC}>
        <TouchableOpacity
          onPress={() => {
            setIndexes(false);
          }}
          style={[
            styles.buttonDC,
            {
              backgroundColor:
                indexes === false ? colors.primary : colors.white,
            },
          ]}>
          <Text
            style={[
              MainStyling.buttonText,
              {color: indexes === false ? colors.white : colors.primary},
            ]}>
            {' '}
            Ongoing
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIndexes(true);
          }}
          style={[
            styles.buttonDC,
            {
              backgroundColor:
                indexes === false ? colors.white : colors.primary,
            },
          ]}>
          <Text
            style={[
              MainStyling.buttonText,
              {color: indexes === false ? colors.primary : colors.white},
            ]}>
            Pending
          </Text>
        </TouchableOpacity>
      </View>

      {/* /////////Commented */}
      <View style={{flex: 1}}>
        {isLoading ? (
          <Loader />
        ) : (
          <FlatList
            style={[MainStyling?.screenPadding]}
            showsHorizontalScrollIndicator={false}
            vertical={true}
            data={sortedBrand}
            keyExtractor={item => item.id}
            renderItem={ChatInbox}
          />
        )}
      </View>
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
  },
  viewDC: {
    backgroundColor: colors.light_red,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: wp('2%'),
    padding: wp('2%'),
    marginHorizontal: wp('8%'),
    borderRadius: 10,
  },
  buttonDC: {
    flex: 1,
    height: wp('11%'),
    marginHorizontal: wp('1%'),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previousT: {
    color: colors.primary,
    fontSize: wp('4.4'),
  },

  card: {
    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginHorizontal: wp('5%'),
    marginVertical: wp('3%'),
  },
  image: {
    height: wp('21%'),
    width: wp('23%'),
    borderRadius: 15,
    backgroundColor: colors.light_grey,
  },

  title: {
    color: colors.black,
    fontWeight: 'bold',
  },
  cityT: {
    marginVertical: wp('2%'),
  },
});

export default InboxChat;

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   FlatList,
//   TouchableOpacity,
//   RefreshControl,
// } from 'react-native';
// import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
// import {useSelector} from 'react-redux';
// import {useNavigation} from '@react-navigation/native';
// import MainStyling from '../../assets/styles/MainStyling';
// import colors from '../../assets/colors/colors';
// import DrawerHeader from '../../components/DrawerHeader';
// import {sheduleList, sheduleStatusUpdate} from '../../apis/company-apis';
// import Loader from '../../components/Loader';
// import {COMPANY_IMAGE, COMPANY_IMAGE_URL} from '../../apis/apis';
// import FastImage from 'react-native-fast-image';
// import ChatCards from '../../components/chatCard/ChatCards';

// const InboxChat = ({route}) => {
//   const userDetails = useSelector(state => state.auth.user);

//   const navigation = useNavigation();
//   const [indexes, setIndexes] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [brand, setBrand] = useState([]);
//   const [refresh, setRefresh] = useState(false);
// const [currentTime, setCurrentTime] = useState('');
// const [providedDate, setProvidedDate] = useState(
//   new Date('2024-05-08T21:20:00'),
// );

// useEffect(() => {
//   updateTime();
//   const interval = setInterval(updateTime, 1000);
//   return () => clearInterval(interval);
// }, []);

// const updateTime = () => {
//   const currentDate = new Date();

//   const timeDifference = providedDate - currentDate;

//   if (timeDifference <= 0) {
//     clearInterval(interval);
//     setCurrentTime('Time has passed');
//     return;
//   }

//   const hours = Math.floor(timeDifference / (1000 * 60 * 60));
//   const minutes = Math.floor(
//     (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
//   );
//   const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
//   setCurrentTime(`${hours} : ${minutes} : ${seconds} `);
// };

//   const getSheduleList = () => {
//     setIsLoading(true);
//     const details = {
//       token: userDetails?.api_token,
//     };
//     sheduleList(details)
//       .then(response => {
//         console.log('Response show there for SheduleListssss', response);
//         setBrand(response?.schedule);
//         setIsLoading(false);
//       })
//       .catch(({error}) => {
//         console.log(
//           error,
//           'errorerroerrorrResponse show there for SheduleLists',
//         );
//         setIsLoading(false);
//       });
//   };

//   useEffect(() => {
//     getSheduleList();
//     const unsubscribe = navigation.addListener('focus', () => {
//       setIsLoading(false);
//       getSheduleList();
//     });
//     return unsubscribe;
//   }, [navigation]);

//   const sortedBrand = brand.slice().sort((a, b) => {
//     return new Date(b?.created_at) - new Date(a?.created_at);
//   });

//   const ChatInbox = ({item, index}) => {
//     return (
//       <ChatCards
//         item={item}
//         // index={index}
//         setIndexes={setIndexes}
//         indexes={indexes}
//       />
//     );
//     // if (index === true) {
//     //   if (item?.scheduling_status === '3') {
//     //     return (
//     //       <View
//     //         style={{
//     //           backgroundColor: colors.light_red,
//     //           marginVertical: wp('2%'),
//     //           marginHorizontal: wp('2%'),
//     //           paddingVertical: wp('4%'),
//     //           borderRadius: 10,
//     //           elevation: 8,
//     //         }}>
//     //         <View
//     //           style={[
//     //             styles.card,
//     //             {
//     //               flexDirection: 'row',
//     //               alignItems: 'center',
//     //               marginTop: wp('7%'),
//     //             },
//     //           ]}>
//     //           <FastImage
//     //             style={styles.image}
//     //             source={{
//     //               uri: `${COMPANY_IMAGE}${item?.company_info?.company_image}`,
//     //               priority: FastImage.priority.high,
//     //             }}
//     //             resizeMode={FastImage.resizeMode.contain}
//     //           />
//     //           <View style={{marginHorizontal: wp('3%'), flex: 1}}>
//     //             <Text style={[MainStyling.buttonText, styles.title]}>
//     //               {item?.name}
//     //             </Text>

//     //             <Text style={[MainStyling.label, {color: colors.gray}]}>
//     //               {item?.time}
//     //             </Text>

//     //             <Text
//     //               style={[
//     //                 MainStyling.label,
//     //                 {color: colors.gray},
//     //                 styles.cityT,
//     //               ]}>
//     //               {item?.address}{' '}
//     //             </Text>
//     //           </View>
//     //         </View>
//     //         <View
//     //           style={{
//     //             flexDirection: 'row',
//     //             alignItems: 'center',
//     //             marginHorizontal: wp('3%'),
//     //           }}>
//     //           {/* <TouchableOpacity
//     //             onPress={() => {
//     //               setIndex(false);
//     //               navigation.navigate('Billing', {
//     //                 job: item,
//     //               });
//     //             }}
//     //             style={[
//     //               styles.buttonDC,
//     //               {
//     //                 backgroundColor: colors.white,
//     //                 borderWidth: 1,
//     //                 borderColor: colors.primary,
//     //                 borderRadius: 30,
//     //               },
//     //             ]}>
//     //             <Text style={[MainStyling.buttonText, {color: colors.primary}]}>
//     //               Payment
//     //             </Text>
//     //           </TouchableOpacity> */}
//     //           <TouchableOpacity
//     //             onPress={() => {
//     //               setIndex(false);
//     //               navigation.navigate('DetailChatEstimaion', {
//     //                 detailSchedule: item,
//     //               });
//     //             }}
//     //             style={[
//     //               styles.buttonDC,
//     //               {
//     //                 backgroundColor: colors.white,
//     //                 borderWidth: 1,
//     //                 borderColor: colors.primary,
//     //                 borderRadius: 30,
//     //               },
//     //             ]}>
//     //             <Text style={[MainStyling.buttonText, {color: colors.primary}]}>
//     //               {' '}
//     //               View
//     //             </Text>
//     //           </TouchableOpacity>
//     //           <TouchableOpacity
//     //             onPress={() => {
//     //               navigation?.navigate('ChatMessages', {jobDetail: item});
//     //             }}
//     //             style={[
//     //               styles.buttonDC,
//     //               {
//     //                 backgroundColor: colors.primary,
//     //                 borderRadius: 30,
//     //               },
//     //             ]}>
//     //             <Text style={[MainStyling.buttonText, {color: colors.white}]}>
//     //               {' '}
//     //               Chat{item?.scheduling_status}
//     //             </Text>
//     //           </TouchableOpacity>
//     //         </View>
//     //         {item?.scheduling_status != '4' ? (
//     //           <TouchableOpacity
//     //             onPress={() => {
//     //               navigation.navigate('Billing', {
//     //                 job: item,
//     //                 billingTab: 'false',
//     //               });
//     //             }}
//     //             style={[
//     //               styles.buttonDC,
//     //               {
//     //                 backgroundColor: colors.primary,
//     //                 borderRadius: 30,
//     //                 marginHorizontal: wp('3%'),
//     //                 marginTop: wp('3%'),
//     //               },
//     //             ]}>
//     //             <Text style={[MainStyling.buttonText, {color: colors.white}]}>
//     //               Payment
//     //             </Text>
//     //           </TouchableOpacity>
//     //         ) : null}

//     //         <View
//     //           style={{
//     //             flexDirection: 'row',
//     //             justifyContent: 'space-between',
//     //             position: 'absolute',
//     //             right: wp('5%'),
//     //             left: wp('5%'),
//     //             top: 10,
//     //           }}>
//     //           <View
//     //             onPress={() => {}}
//     //             style={[
//     //               {
//     //                 backgroundColor: colors.primary,
//     //                 borderRadius: 30,

//     //                 paddingHorizontal: wp('3%'),
//     //                 paddingVertical: wp('1%'),
//     //               },
//     //             ]}>
//     //             <Text style={[MainStyling.label, {color: colors.white}]}>
//     //               Job number: #{item?.vehicle_number}
//     //             </Text>
//     //           </View>
//     //           {item?.scheduling_status === '3' ? (
//     //             <View
//     //               onPress={() => {}}
//     //               style={[
//     //                 {
//     //                   backgroundColor: colors.green,
//     //                   borderRadius: 30,
//     //                   paddingHorizontal: wp('3%'),
//     //                   paddingVertical: wp('1%'),
//     //                 },
//     //               ]}>
//     //               <Text style={[MainStyling.label, {color: colors.white}]}>
//     //                 Pending
//     //               </Text>
//     //             </View>
//     //           ) : item?.scheduling_status === '4' ? (
//     //             <View
//     //               onPress={() => {}}
//     //               style={[
//     //                 {
//     //                   backgroundColor: colors.primary,
//     //                   borderRadius: 30,
//     //                   paddingHorizontal: wp('3%'),
//     //                   paddingVertical: wp('1%'),
//     //                 },
//     //               ]}>
//     //               <Text style={[MainStyling.label, {color: colors.white}]}>
//     //                 Completed
//     //               </Text>
//     //             </View>
//     //           ) : (
//     //             <View
//     //               onPress={() => {}}
//     //               style={[
//     //                 {
//     //                   backgroundColor: colors.primary,
//     //                   borderRadius: 30,
//     //                   paddingHorizontal: wp('3%'),
//     //                   paddingVertical: wp('1%'),
//     //                 },
//     //               ]}>
//     //               <Text style={[MainStyling.label, {color: colors.white}]}>
//     //                 Ongoing
//     //               </Text>
//     //             </View>
//     //           )}
//     //         </View>
//     //       </View>
//     //     );
//     //   }
//     // } else {
//     //   if (item?.scheduling_status != '3' && item?.scheduling_status != '4') {
//     //     return (
//     //       <View
//     //         style={{
//     //           backgroundColor: colors.light_red,
//     //           marginVertical: wp('2%'),
//     //           paddingVertical: wp('4%'),
//     //           borderRadius: 10,
//     //           elevation: 8,
//     //           marginHorizontal: wp('2%'),
//     //         }}>
//     //         <View
//     //           style={[
//     //             styles.card,
//     //             {
//     //               flexDirection: 'row',
//     //               alignItems: 'center',
//     //               marginTop: wp('7%'),
//     //             },
//     //           ]}>
//     //           <FastImage
//     //             style={styles.image}
//     //             source={{
//     //               uri: `${COMPANY_IMAGE}${item?.company_info?.company_image}`,
//     //               priority: FastImage.priority.high,
//     //             }}
//     //             resizeMode={FastImage.resizeMode.contain}
//     //           />
//     //           <View style={{marginHorizontal: wp('3%'), flex: 1}}>
//     //             <Text style={[MainStyling.buttonText, styles.title]}>
//     //               {item?.name}
//     //               {/* {item?.scheduling_status} */}
//     //               {/* {item?.id} */}
//     //             </Text>
//     //             {/* <Text style={[MainStyling.label, {color: colors.gray}]}>
//     //           {item?.scheduling_status}
//     //           {item?.scheduling_status === '1'
//     //             ? 'Ongoing'
//     //             : item?.scheduling_status === '2'
//     //             ? 'Started'
//     //             : 'Completed'}
//     //         </Text> */}
//     //             <Text style={[MainStyling.label, {color: colors.gray}]}>
//     //               {item?.time}
//     //               {/* {item?.day} {item?.month} */}
//     //             </Text>

//     //             <Text
//     //               style={[
//     //                 MainStyling.label,
//     //                 {color: colors.gray},
//     //                 styles.cityT,
//     //               ]}>
//     //               {item?.address}{' '}
//     //             </Text>
//     //           </View>
//     //         </View>
//     //         <View
//     //           style={{
//     //             flexDirection: 'row',
//     //             alignItems: 'center',
//     //             marginHorizontal: wp('3%'),
//     //           }}>
//     //           <TouchableOpacity
//     //             onPress={() => {
//     //               setIndex(false);
//     //               navigation.navigate('DetailChatEstimaion', {
//     //                 detailSchedule: item,
//     //               });
//     //             }}
//     //             style={[
//     //               styles.buttonDC,
//     //               {
//     //                 backgroundColor: colors.white,
//     //                 borderWidth: 1,
//     //                 borderColor: colors.primary,
//     //                 borderRadius: 30,
//     //               },
//     //             ]}>
//     //             <Text style={[MainStyling.buttonText, {color: colors.primary}]}>
//     //               {' '}
//     //               View
//     //             </Text>
//     //           </TouchableOpacity>
//     //           <TouchableOpacity
//     //             onPress={() => {
//     //               navigation?.navigate('ChatMessages', {jobDetail: item});
//     //             }}
//     //             style={[
//     //               styles.buttonDC,
//     //               {
//     //                 backgroundColor: colors.primary,
//     //                 borderRadius: 30,
//     //               },
//     //             ]}>
//     //             <Text style={[MainStyling.buttonText, {color: colors.white}]}>
//     //               {' '}
//     //               Chat{item?.scheduling_status}
//     //             </Text>
//     //           </TouchableOpacity>
//     //         </View>
//     //         <View
//     //           style={{
//     //             flexDirection: 'row',
//     //             justifyContent: 'space-between',
//     //             // marginHorizontal: wp('5%'),
//     //             position: 'absolute',
//     //             right: wp('5%'),
//     //             left: wp('5%'),
//     //             top: 10,
//     //           }}>
//     //           <View
//     //             onPress={() => {}}
//     //             style={[
//     //               {
//     //                 backgroundColor: colors.primary,
//     //                 borderRadius: 30,

//     //                 paddingHorizontal: wp('3%'),
//     //                 paddingVertical: wp('1%'),
//     //               },
//     //             ]}>
//     //             <Text style={[MainStyling.label, {color: colors.white}]}>
//     //               Job number: #{item?.vehicle_number}
//     //             </Text>
//     //           </View>
//     //           {item?.scheduling_status === '2' ? (
//     //             <View
//     //               onPress={() => {}}
//     //               style={[
//     //                 // styles.buttonDC,
//     //                 {
//     //                   backgroundColor: colors.green,
//     //                   borderRadius: 30,

//     //                   paddingHorizontal: wp('3%'),
//     //                   paddingVertical: wp('1%'),
//     //                 },
//     //               ]}>
//     //               <Text style={[MainStyling.label, {color: colors.white}]}>
//     //                 Started
//     //               </Text>
//     //             </View>
//     //           ) : item?.scheduling_status === '4' ? (
//     //             <View
//     //               onPress={() => {}}
//     //               style={[
//     //                 // styles.buttonDC,
//     //                 {
//     //                   backgroundColor: colors.primary,
//     //                   borderRadius: 30,

//     //                   paddingHorizontal: wp('3%'),
//     //                   paddingVertical: wp('1%'),
//     //                 },
//     //               ]}>
//     //               <Text style={[MainStyling.label, {color: colors.white}]}>
//     //                 Completed
//     //               </Text>
//     //             </View>
//     //           ) : item?.scheduling_status === '6' ? (
//     //             <View
//     //               onPress={() => {}}
//     //               style={[
//     //                 {
//     //                   backgroundColor: colors.green,
//     //                   borderRadius: 30,
//     //                   paddingHorizontal: wp('3%'),
//     //                   paddingVertical: wp('1%'),
//     //                 },
//     //               ]}>
//     //               <Text style={[MainStyling.label, {color: colors.white}]}>
//     //                 Requested
//     //               </Text>
//     //             </View>
//     //           ) : (
//     //             <View
//     //               onPress={() => {}}
//     //               style={[
//     //                 // styles.buttonDC,
//     //                 {
//     //                   backgroundColor: colors.primary,
//     //                   borderRadius: 30,

//     //                   paddingHorizontal: wp('3%'),
//     //                   paddingVertical: wp('1%'),
//     //                 },
//     //               ]}>
//     //               <Text style={[MainStyling.label, {color: colors.white}]}>
//     //                 Ongoing
//     //               </Text>
//     //             </View>
//     //           )}
//     //         </View>
//     //         <View style={styles.timerContainer}>
//     //           <Text style={styles.timerText}>{currentTime}</Text>
//     //         </View>
//     //       </View>
//     //     );
//     //   }
//     // }
//   };

//   return (
//     <SafeAreaView style={MainStyling?.mainContainer}>
//       <DrawerHeader />
//       {/* <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           flex: 1,
//         }}>
//         <Text
//           style={[
//             MainStyling.header,
//             {
//               textAlign: 'center',
//               flex: 1,
//             },
//           ]}>
//           Messages
//         </Text>
//       </View> */}
//       <View style={styles.viewDC}>
//         <TouchableOpacity
//           onPress={() => {
//             setIndexes(false);
//           }}
//           style={[
//             styles.buttonDC,
//             {
//               backgroundColor:
//                 indexes === false ? colors.primary : colors.white,
//             },
//           ]}>
//           <Text
//             style={[
//               MainStyling.buttonText,
//               {color: indexes === false ? colors.white : colors.primary},
//             ]}>
//             {' '}
//             Ongoing
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => {
//             setIndexes(true);
//           }}
//           style={[
//             styles.buttonDC,
//             {
//               backgroundColor:
//                 indexes === false ? colors.white : colors.primary,
//             },
//           ]}>
//           <Text
//             style={[
//               MainStyling.buttonText,
//               {color: indexes === false ? colors.primary : colors.white},
//             ]}>
//             Pending
//           </Text>
//         </TouchableOpacity>
//       </View>
//       <View style={{flex: 1}}>
//         {isLoading ? (
//           <Loader />
//         ) : (
//           <FlatList
//             style={[MainStyling?.screenPadding]}
//             showsHorizontalScrollIndicator={false}
//             vertical={true}
//             data={sortedBrand}
//             keyExtractor={item => item.id}
//             renderItem={ChatInbox}
//             refreshControl={
//               <RefreshControl
//                 refreshing={refresh}
//                 onRefresh={() => {
//                   getSheduleList();
//                 }}
//                 tintColor={colors.primary}
//                 colors={[colors.primary, colors.red, colors.primary]}
//               />
//             }
//           />
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scheduleT: {
//     color: 'black',
//     fontSize: wp('5%'),
//     fontWeight: 'bold',
//   },
//   viewDC: {
//     backgroundColor: colors.light_red,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginVertical: wp('2%'),
//     padding: wp('2%'),
//     marginHorizontal: wp('8%'),
//     borderRadius: 10,
//   },
//   buttonDC: {
//     flex: 1,
//     height: wp('11%'),
//     marginHorizontal: wp('1%'),
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   previousT: {
//     color: colors.primary,
//     fontSize: wp('4.4'),
//   },

//   card: {
//     shadowColor: colors.gray,
//     shadowOffset: {
//       width: 0,
//       height: 0,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     marginHorizontal: wp('5%'),
//     marginVertical: wp('3%'),
//   },
//   image: {
//     height: wp('21%'),
//     width: wp('23%'),
//     borderRadius: 15,
//     backgroundColor: colors.light_grey,
//   },

//   title: {
//     color: colors.black,
//     fontWeight: 'bold',
//   },
//   cityT: {
//     marginVertical: wp('2%'),
//   },
//   timerContainer: {
//     backgroundColor: colors.light_red,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: wp('2%'),
//     padding: wp('2%'),
//     borderRadius: 10,
//   },
//   timerText: {
//     color: colors.primary,
//     fontSize: wp('7%'),
//     fontWeight: 'bold',
//   },
//   viewDC: {
//     backgroundColor: colors.light_red,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginVertical: wp('2%'),
//     padding: wp('2%'),
//     marginHorizontal: wp('8%'),
//     borderRadius: 10,
//   },
// });

// export default InboxChat;
