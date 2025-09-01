import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Pressable,
  TextInput,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import DrawerHeader from '../../components/DrawerHeader';
import MainStyling from '../../assets/styles/MainStyling';
import colors from '../../assets/colors/colors';

const HistoryDetail = () => {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [brand, setBrand] = useState([
    {
      title: 'Mispa Motors',
      subTitle: 'Spare Parts',
      contact: 'Contact: +91 888 6099008',
      source: require('./../../assets/images/png/images.jpeg'),
    },
    {
      title: 'Mispa Motors',
      subTitle: 'Mechanical',
      contact: 'Contact: +91 888 6099008',
      source: require('./../../assets/images/png/images.jpeg'),
    },
    {
      title: 'Mispa Motors',
      subTitle: 'Electrical',
      contact: 'Contact: +91 888 6099008',
      source: require('./../../assets/images/png/images.jpeg'),
    },
    {
      title: 'Mispa Motors',
      subTitle: 'Electrical',
      contact: 'Contact: +91 888 6099008',
      source: require('./../../assets/images/png/images.jpeg'),
    },
    {
      title: 'Mispa Motors',
      subTitle: 'Electrical',
      contact: 'Contact: +91 888 6099008',
      source: require('./../../assets/images/png/images.jpeg'),
    },
    {
      title: 'Mispa Motors',
      subTitle: 'Electrical',
      contact: 'Contact: +91 888 6099008',
      source: require('./../../assets/images/png/images.jpeg'),
    },
    {
      title: 'Mispa Motors',
      subTitle: 'Electrical',
      contact: 'Contact: +91 888 6099008',
      source: require('./../../assets/images/png/images.jpeg'),
    },
    {
      title: 'Mispa Motors',
      subTitle: 'Electrical',
      contact: 'Contact: +91 888 6099008',
      source: require('./../../assets/images/png/images.jpeg'),
    },
    {
      title: 'Mispa Motors',
      subTitle: 'Electrical',
      contact: 'Contact: +91 888 6099008',
      source: require('./../../assets/images/png/images.jpeg'),
    },
    {
      title: 'Mispa Motors',
      subTitle: 'Electrical',
      contact: 'Contact: +91 888 6099008',
      source: require('./../../assets/images/png/images.jpeg'),
    },
  ]);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.white}]}>
      <ScrollView
        style={{backgroundColor: colors.grey_white}}
        showsVerticalScrollIndicator={false}>
        <DrawerHeader />

        <View style={[MainStyling.dividerTwo]} />

        <View style={MainStyling.screenPadding}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('History');
            }}
            style={{}}>
            <View style={[styles.card, {marginVertical: wp('2%')}]}>
              <Text style={[MainStyling.header]}>Eicher</Text>
              <Text style={[MainStyling.mediumText, {color: colors.gray}]}>
                02/01/2024
              </Text>
              <View style={[MainStyling.dividerTwo]}></View>
              <TouchableOpacity
                style={[
                  {
                    flexDirection: 'row',
                    backgroundColor: colors.white,
                    alignItems: 'center',
                  },
                ]}>
                <Text style={[MainStyling.header]}>Services Completed</Text>
                <View style={[styles.icon, {position: 'absolute', right: 0}]}>
                  <Pressable
                    onPress={() => {
                      dropDownRef.current.open();
                    }}>
                    <Feather
                      name={'chevron-right'}
                      size={wp('7%')}
                      color={colors.gray}
                    />
                  </Pressable>
                </View>
              </TouchableOpacity>
              <Text style={[MainStyling.mediumText, {color: colors.gray}]}>
                Tire Repaired
              </Text>
              <Text style={[MainStyling.mediumText, {color: colors.gray}]}>
                Rare brakes pads replaced
              </Text>
            </View>
          </TouchableOpacity>
          <View style={[MainStyling.divider]} />
          <Text style={[MainStyling.header]}>My Notes</Text>
          <TextInput
            style={styles.input}
            value={text}
            multiline={true}
            numberOfLines={4}
            placeholder={'Tap here to add any notes (1000) characters max'}
            label={'Degree'}
            onChangeText={value => {
              setText(value);
            }}
          />
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
    height: wp('15%'),
    // width: wp('15%'),
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
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: wp('10'),
    width: wp('10'),
  },
  card: {
    height: wp('35%'),

    backgroundColor: colors.white,
    borderColor: colors.white,
    borderWidth: 2,
    borderRadius: 7,

    padding: wp('3%'),

    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 3,
  },
  buttonContainer: {
    backgroundColor: colors.grey_white,
    padding: 4,
    width: wp('25%'),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: wp('10%'),
  },
  addContainer: {
    backgroundColor: colors.grey_white,
    paddingHorizontal: wp('7%'),
    paddingVertical: wp('2%'),
    flexDirection: 'row',
    // width: wp('46%'),
    alignSelf: 'center',
    borderRadius: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: wp('3%'),
  },
  imageTitle: {
    color: colors.grey_white,
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
  },
  iconStyle: {
    backgroundColor: colors.blue,
    padding: wp('2%'),
    borderRadius: 300,
    alignItems: 'center',
    justifyContent: 'center',
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
  imageContainer: {
    width: wp('90%'),
    borderRadius: 10,
    marginVertical: wp('2%'),
    padding: wp('2.5%'),
    padding: wp('5%'),
  },
  align: {
    justifyContent: 'center',
  },
  image: {
    height: wp('17%'),
    width: wp('17%'),
    borderRadius: 10,
  },
  imageStyles: {
    height: wp('26%'),
    width: wp('26%'),
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
  input: {
    height: wp('45%'),
    width: wp('87%'),
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderWidth: 2,
    borderRadius: 7,
    textAlignVertical: 'top',
    padding: wp('3%'),
    marginVertical: wp('2%'),
    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 3,
  },
});

export default HistoryDetail;
