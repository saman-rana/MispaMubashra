import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../assets/colors/colors';
import MainStyling from '../../assets/styles/MainStyling';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/Button';
import * as Svgs from '../../assets/images/svg';
import {onProfileDetail} from '../../apis/auth-apis';
import Loader from '../../components/Loader';
import {useSelector} from 'react-redux';

const MyProfile = () => {
  const navigation = useNavigation();
  const userDetails = useSelector(state => state.auth.user);
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getProfileList = async () => {
    setIsLoading(true);
    const details = {
      token: userDetails?.api_token,
      id: userDetails?.id,
    };
    onProfileDetail(details)
      .then(response => {
        console.log('Response show there for ProfileList: ', response?.profile);
        setProfileData(response?.user);
        setIsLoading(false);
      })
      .catch(({response}) => {
        console.log(response);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      'focus',
      () => { 
        getProfileList();
        return unsubscribe;
      },
      [navigation],
    );
  });

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.primary}]}>
      <View style={[{flex: 6, backgroundColor: colors.grey_white}]}>
        <View style={[styles.card2]}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{alignSelf: 'flex-end', right: wp('4%')}}>
            <MaterialCommunityIcons
              name={'close'}
              size={wp('7%')}
              color={colors.white}
            />
          </TouchableOpacity>
          <Svgs.UserWhite
            height={wp('15%')}
            width={wp('15%')}
            style={{marginVertical: wp('3%')}}
          />
          <Text
            style={[
              MainStyling.buttonText,
              {fontWeight: 'bold', color: colors.white},
            ]}>
            {profileData?.name}
          </Text>
          <Text style={[MainStyling.mediumText, {color: colors.white}]}>
            {profileData?.email}
          </Text>
        </View>
        {isLoading ? (
          <Loader />
        ) : (
          <View style={[{flex: 4}]}>
            <View style={[MainStyling.divider]}></View>
            <View
              style={[MainStyling.screenPadding, {marginVertical: wp('3%')}]}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('UpdateProfile');
                }}
                style={[
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                  },
                ]}>
                <View>
                  <Text style={[MainStyling.mediumText]}>Name</Text>
                  <Text
                    style={[
                      MainStyling.buttonText,
                      {fontWeight: '600', color: colors.black},
                    ]}>
                    {profileData?.name}
                  </Text>
                </View>
                <View style={[styles.icon, {position: 'absolute', right: 0}]}>
                  <Pressable onPress={() => {}}>
                    <Feather
                      name={'chevron-right'}
                      size={wp('7%')}
                      color={colors.gray}
                    />
                  </Pressable>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={[MainStyling.screenPadding, {marginVertical: wp('3%')}]}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('UpdateProfile');
                }}
                style={[
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                  },
                ]}>
                <View>
                  <Text style={[MainStyling.mediumText]}>Username</Text>
                  <Text
                    style={[
                      MainStyling.buttonText,
                      {fontWeight: '600', color: colors.black},
                    ]}>
                    {profileData?.username}
                  </Text>
                </View>
                <View style={[styles.icon, {position: 'absolute', right: 0}]}>
                  <Pressable onPress={() => {}}>
                    <Feather
                      name={'chevron-right'}
                      size={wp('7%')}
                      color={colors.gray}
                    />
                  </Pressable>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={[MainStyling.screenPadding, {marginVertical: wp('3%')}]}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('UpdateProfile');
                }}
                style={[
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                  },
                ]}>
                <View>
                  <Text style={[MainStyling.mediumText]}>E-mail</Text>
                  <Text
                    style={[
                      MainStyling.buttonText,
                      {fontWeight: '600', color: colors.black},
                    ]}>
                    {profileData?.email}
                  </Text>
                </View>
                <View style={[styles.icon, {position: 'absolute', right: 0}]}>
                  <Pressable onPress={() => {}}>
                    <Feather
                      name={'chevron-right'}
                      size={wp('7%')}
                      color={colors.gray}
                    />
                  </Pressable>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={[MainStyling.screenPadding, {marginVertical: wp('3%')}]}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('UpdateProfile');
                }}
                style={[
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                  },
                ]}>
                <View>
                  <Text style={[MainStyling.mediumText]}>Bio</Text>
                  <Text
                    style={[
                      MainStyling.buttonText,
                      {fontWeight: '600', color: colors.black},
                    ]}>
                    {profileData?.bio}
                  </Text>
                </View>
                <View style={[styles.icon, {position: 'absolute', right: 0}]}>
                  <Pressable onPress={() => {}}>
                    <Feather
                      name={'chevron-right'}
                      size={wp('7%')}
                      color={colors.gray}
                    />
                  </Pressable>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={[
                MainStyling.screenPadding,
                styles.blackLine,
                {alignItems: 'center'},
              ]}></View>
          </View>
        )}
        <View style={[MainStyling.screenPadding, {flex: 0.8}]}>
          <Button
            variant="outline"
            label={'Update profile'}
            labelStyle={MainStyling.buttonText}
            onPress={() => {
              navigation.navigate('UpdateProfile');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  card2: {
    width: wp('100%'),
    height: wp('62%'),
    borderBottomRightRadius: 5000,
    borderBottomLeftRadius: 5000,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: wp('10'),
    width: wp('10'),
  },
  blackLine: {
    height: wp('0.1%'),
    backgroundColor: colors.light_black,
  },
});
export default MyProfile;
