import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  ScrollView,
 
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import colors from './../assets/colors/colors';
import {useNavigation} from '@react-navigation/native';


import MainStyling from './../assets/styles/MainStyling';
import { productList } from '../apis/product-apis ';
import { userList } from '../apis/product-apis ';
import Button from '../components/Button';

const List = () => {
    const [spareParts, setSpareParts] = useState([]);
    const [information, setInformation] = useState([]);
    const [brand, setBrand] = useState([
        {
          title: 'Mispa Motors',
          subTitle: 'Spare Parts',
          contact: 'Contact: +91 888 6099008',
          source: require('./../assets/images/png/Vehicle.png'),
        },
        {
          title: 'Mispa Motors',
          subTitle: 'Mechanical',
          contact: 'Contact: +91 888 6099008',
          source: require('./../assets/images/png/Vehicle.png'),        },
        {
          title: 'Mispa Motors',
          subTitle: 'Electrical',
          contact: 'Contact: +91 888 6099008',
          source: require('./../assets/images/png/Vehicle.png'),        },
        {
          title: 'Mispa Motors',
          subTitle: 'Electrical',
          contact: 'Contact: +91 888 6099008',
          source: require('./../assets/images/png/Vehicle.png'),        },
        {
          title: 'Mispa Motors',
          subTitle: 'Electrical',
          contact: 'Contact: +91 888 6099008',
          source: require('./../assets/images/png/Vehicle.png'),        },
        {
          title: 'Mispa Motors',
          subTitle: 'Electrical',
          contact: 'Contact: +91 888 6099008',
          source: require('./../assets/images/png/Vehicle.png'),        },
        {
          title: 'Mispa Motors',
          subTitle: 'Electrical',
          contact: 'Contact: +91 888 6099008',
          source: require('./../assets/images/png/Vehicle.png'),        },
        {
          title: 'Mispa Motors',
          subTitle: 'Electrical',
          contact: 'Contact: +91 888 6099008',
          source: require('./../assets/images/png/Vehicle.png'),        },
        {
          title: 'Mispa Motors',
          subTitle: 'Electrical',
          contact: 'Contact: +91 888 6099008',
          source: require('./../assets/images/png/Vehicle.png'),        },
        {
          title: 'Mispa Motors',
          subTitle: 'Electrical',
          contact: 'Contact: +91 888 6099008',
          source: require('./../assets/images/png/Vehicle.png'),        },
      ]);

      const getproductList = async () => {
        const details = { };
        productList(details)
        .then(response => {
            console.log('Response: ', response?.products);
            setSpareParts(response?.products);
        })
        .catch(({response}) =>{
            console.log(response)
        });
      };

      const getuserList = async () => {
        const details = { };
        userList(details)
        .then(response => {
            console.log('Response: ', response?.products);
            setInformation(response?.users);
        })
        .catch(({response}) =>{
            console.log(response)
        });
      };
      useEffect(() => {
        getproductList();
        getuserList();
      },[])

      const SparePartsCard = ({item}) => {
        return (
          <View
            style={[
              styles.scheduleV,
              {
                backgroundColor: colors.white,
                flexDirection: 'row',
                alignItems: 'center',
              },
            ]}>
            <Image style={styles.image} source={{uri: item?.thumbnail}} />
            <View style={{marginHorizontal: wp('3%'), flex: 1}}>
              <Text style={[MainStyling.paragraph, {color: colors.black}]}>
                {item.title}
              </Text>
              <Text style={[MainStyling.header, {color: colors.black}]}>
                {item.category}
              </Text>
              <Text style={[MainStyling.paragraph, {color: colors.black}]}>
                {item.discountPercentage}
              </Text>
            </View>
            <Image
              style={[
                styles.imagePhone,
                {marginRight: wp('2%'), resizeMode: 'contain'},
              ]}
              source={require('./../assets/images/png/call.png')}
            />
          </View>
        );
      };
      const informationCard = ({item}) => {
        return (
          <View
            style={[
              styles.scheduleV,
              {
                backgroundColor: colors.white,
                flexDirection: 'row',
                alignItems: 'center',
              },
            ]}>
            <Image style={styles.image} source={{uri: item?.image}} />
            <View style={{marginHorizontal: wp('3%'), flex: 1}}>
              <Text style={[MainStyling.paragraph, {color: colors.black}]}>
             Name:  {item.firstName}
              </Text>
              <Text style={[MainStyling.header, {color: colors.black}]}>
                LastName: {item.lastName}
              </Text>
              <Text style={[MainStyling.paragraph, {color: colors.black}]}>
               Age:  {item.age}
              </Text>
              <Text style={[MainStyling.paragraph, {color: colors.black}]}>
               Gender:  {item.gender}
              </Text>
              <Text style={[MainStyling.paragraph, {color: colors.black}]}>
               PhoneNo:  {item.phone}
              </Text>
            </View>
            {/* <Image
              style={[
                styles.imagePhone,
                {marginRight: wp('2%'), resizeMode: 'contain'},
              ]}
              source={require('./../assets/images/png/call.png')}
            /> */}
          </View>
        );
      };
    
  return (
   
        <View style={[styles.secondContainer, styles.margins]}>
          {/* <FlatList
              showsHorizontalScrollIndicator={false}
              vertical={true}
              data={spareParts}
              keyExtractor={item => item.id}
              renderItem={SparePartsCard}
            /> */}
            <Text style={[MainStyling.heading, {backgroundColor:"red"}]}> An other FlatList is Here!</Text>
             <FlatList
              showsHorizontalScrollIndicator={false}
              vertical={true}
              data={information}
              keyExtractor={item => item.id}
              renderItem={informationCard}
            />
            <Button
            variant="outline"
            label={'Login'}
            labelStyle={[MainStyling.buttonText, styles.button]}
            onPress={() => {
             //getuserList();
              // navigation.navigate('LoginSetup', {
              //   navRoute: 'login',
                
              // });
            }}
          />
    </View>
  )
}
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
    containerEye: {
      padding: 15,
      backgroundColor: 'rgba(0,0,0,0.3)',
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    buttonContainer: {
      backgroundColor: colors.grey_white,
      padding: 4,
      width: wp('25%'),
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: wp('1%'),
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
      fontSize: wp('4.5%'),
    },
  
    scheduleV: {
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
  
    align: {
      justifyContent: 'center',
    },
    image: {
      height: wp('17%'),
      width: wp('17%'),
      borderRadius: 10,
    },
    imagePhone: {
      height: wp('10%'),
      width: wp('10%'),
    },
    imageStyle: {
      height: wp('47%'),
      width: wp('85%'),
      marginRight: wp('4%'),
      padding: 20,
    },
    title: {
      fontSize: wp('3%'),
    },
    subTitle: {
      fontSize: wp('4.5%'),
      fontWeight: 'bold',
    },
    contact: {
      fontSize: wp('3%'),
    },
    hours: {
      height: wp('7%'),
      borderRadius: 5,
      flexDirection: 'row',
      backgroundColor: colors.black,
      paddingHorizontal: wp('3%'),
      alignItems: 'center',
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
export default List