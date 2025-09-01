import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import MainStyling from '../../assets/styles/MainStyling';
import colors from '../../assets/colors/colors';
import Headers from '../../components/Headers';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RBSheet from 'react-native-raw-bottom-sheet';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';

const Setting = () => {
  const dropDownRef = useRef(null);
  const navigation = useNavigation();
  const [card, setCard] = useState([
    {
      title: 'Contact us',
      subTitle: 'Questions about the application',
      source: require('./../../assets/images/png/contact.png'),
    },
    {
      title: 'Share the app',
      subTitle: 'Share with people close to you ',
      source: require('./../../assets/images/png/share.png'),
    },
    {
      title: 'Rate us',
      subTitle: 'Your review is useful for us',
      source: require('./../../assets/images/png/rate.png'),
    },
    {
      title: 'Logout',
      source: require('./../../assets/images/png/logout.png'),
    },
  ]);

  const itemButtonCard = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          item?.title === 'Logout' ? dropDownRef.current.open() : null;
        }}
        style={[styles.flexD, MainStyling.alignmentCenter, styles.buttonV]}>
        <View
          style={[
            styles.iconV,
            {
              backgroundColor:
                item?.title === 'Logout'
                  ? colors.light_grey
                  : colors.light_color,
            },
          ]}>
          <Image
            source={item.source}
            style={{height: wp('5%'), width: wp('5%')}}
          />
        </View>
        <View style={[styles.flex1, styles.mh4]}>
          <Text style={[MainStyling.subHeading, , {color: colors.black}]}>
            {item.title}
          </Text>
          <Text style={[MainStyling.paragraph, {color: colors.light_black}]}>
            {item.subTitle}
          </Text>
        </View>
        <View>
          <FontAwesome
            name={'angle-right'}
            size={wp('5%')}
            color={colors.light_black}
          />
        </View>
        {Dropdown()}
      </TouchableOpacity>
    );
  };

  const Dropdown = () => {
    return (
      <SafeAreaView style={styles.dropDownContainer}>
        <RBSheet
          ref={dropDownRef}
          closeOnDragDown={true}
          height={340}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0,0,0,0.6)',
            },
            draggableIcon: {
              backgroundColor: '#8898AA',
            },
            container: styles.sheetContainer,
          }}>
          <View
            style={[
              {flex: 1, marginHorizontal: wp('3%'), alignItems: 'center'},
            ]}>
            <Image
              source={require('./../../assets/images/png/LogoutApp.png')}
              style={{}}
            />
            <Text style={[MainStyling.header, {marginVertical: wp('3%')}]}>
              Are you sure you want to logout?
            </Text>
            <View style={[styles.flex, {padding: 15}]}>
              <Button
                label={'Cancel'}
                variant="outline"
                buttonStyle={{
                  marginHorizontal: wp('1.5%'),
                  borderRadius: 30,
                }}
                onPress={() => {
                  dropDownRef.current.close();
                }}
              />
              <Button
                label={'Logout'}
                onPress={() => {
                  dropDownRef.current.close();
                  navigation.navigate('Login');
                }}
                buttonStyle={{
                  marginHorizontal: wp('1.5%'),
                }}
              />
              {/* <TouchableOpacity
                onPress={() => {
                  dropDownRef.current.close();
                }}
                style={[styles.button, {backgroundColor: colors.primary}]}>
                <Text style={[styles.buttonText, {color: colors.light_color}]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                style={[styles.button, {backgroundColor: colors.light_color}]}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </RBSheet>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={MainStyling.mainContainer}>
      <Headers title={'Settings'} />
      <View style={MainStyling.screenPadding}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={card}
          keyExtractor={item => item.id}
          renderItem={itemButtonCard}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonV: {
    // height: wp('15%'),
    borderBottomColor: colors.light_grey,
    borderBottomWidth: 0.5,
    paddingVertical: wp('5%'),
  },
  iconV: {
    height: wp('8.5%'),
    width: wp('8.5%'),
    borderRadius: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexD: {
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
  mh4: {
    marginHorizontal: wp('4%'),
  },
  flex: {
    flexDirection: 'row',
    flex: 1,
  },
  button: {
    borderWidth: 1,
    borderColor: colors.primary,
    flex: 1,
    height: wp('13%'),
    marginHorizontal: wp('1%'),
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: wp('4%'),
    color: colors.primary,
    fontWeight: 'bold',
  },
  sheetContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: colors.grey_white,
    borderWidth: 1,
  },
  dropDownContainer: {
    borderRadius: 10,
    borderWidth: 1,
  },
});
export default Setting;
