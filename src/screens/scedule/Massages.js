import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import colors from '../../assets/colors/colors';
import MainStyling from '../../assets/styles/MainStyling';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/Button';
import Feather from 'react-native-vector-icons/Feather';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import DrawerHeader from '../../components/DrawerHeader';

const Massages = () => {
  const navigation = useNavigation();
  const [text, setText] = useState('');

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.white}]}>
      <ScrollView style={{backgroundColor: colors.grey_white}}>
        <DrawerHeader />
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
        <View style={[MainStyling.screenPadding, MainStyling.divider]}>
          <View style={[MainStyling.divider]}></View>
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
          <View style={[MainStyling.divider]}></View>
          <Button
            label={'Send'}
            labelStyle={MainStyling.buttonText}
            onPress={() => {
              navigation.navigate('PreviewSchedule');
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
    // padding: ,
    backgroundColor: 'white',
  },

  margins: {
    marginHorizontal: wp('4'),
  },
  imageStyles: {
    height: wp('23%'),
    width: wp('23%'),
    borderRadius: 10,
  },
  extraT: {
    color: colors.black,
    marginBottom: wp('1.2%'),
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
    padding: wp('6.2%'),
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
export default Massages;
