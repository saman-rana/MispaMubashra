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
import {} from 'react-native-gesture-handler';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import * as Svgs from '../../assets/images/svg';
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
                flex: 0.85,
              },
            ]}>
            Record Details
          </Text>
        </View>
        <View style={[MainStyling.dividerTwo]} />

        <View style={MainStyling.screenPadding}>
          <View>
            <View style={[styles.card, {marginVertical: wp('2%')}]}>
              <View style={[MainStyling.dividerTwo]}></View>
              <TouchableOpacity
                style={[
                  {
                    flexDirection: 'row',
                    backgroundColor: colors.white,
                    alignItems: 'center',
                  },
                ]}>
                <Text style={[MainStyling.header]}>Eicher</Text>
                <View style={[styles.icon, {position: 'absolute', right: 0}]}>
                  <TouchableOpacity onPress={() => {}}>
                    <Feather
                      name={'download'}
                      size={wp('6.3%')}
                      color={colors.blue}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              <Text style={[MainStyling.mediumText, {color: colors.gray}]}>
                02/01/2024
              </Text>
              <View style={[MainStyling.dividerTwo]} />
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
          </View>
          <View style={[MainStyling.divider]} />
          <Text style={[MainStyling.header]}>My Notes</Text>
          <TextInput
            style={styles.input}
            value={text}
            placeholderTextColor={colors.grey}
            multiline={true}
            numberOfLines={7}
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
  multi: {
    color: 'black',
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  card: {
    borderRadius: 40,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('2.5%'),
    marginVertical: wp('2.5%'),
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: wp('10'),
    width: wp('10'),
  },
  card: {
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
  align: {
    justifyContent: 'center',
  },
  image: {
    height: wp('17%'),
    width: wp('17%'),
    borderRadius: 10,
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
    color: colors.black,
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
