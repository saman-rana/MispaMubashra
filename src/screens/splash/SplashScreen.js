import {View, StyleSheet, Image, SafeAreaView, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import MainStyling from '../../assets/styles/MainStyling';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import {setUserDetail} from '../../reduxes/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {onLogin} from '../../apis/auth-apis';

const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.auth.user);
  const [errorMessage, setErrorMessage] = useState('');

  const onLoginLogin = async () => {
    // setIsLoading(true);
    console.log(await AsyncStorage.getItem('@pass'));
    if (
      (await AsyncStorage.getItem('@email')) === null &&
      (await AsyncStorage.getItem('@pass')) === null
    ) {
      navigation.navigate('LoginSetup', {navRoute: 'login'});
    } else {
      const details = {
        email: await AsyncStorage.getItem('@email'),
        password: await AsyncStorage.getItem('@pass'),
      };
      onLogin(details)
        .then(response => {
          console.log('Response shoe theress for logines:', response);
          dispatch(setUserDetail(response?.user));
          navigation.navigate('HomeNew');
          // setIsLoading(false);
        })
        .catch(({response}) => {
          setErrorMessage(response?.data?.error);
          console.log(response?.data?.data);
          // setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    // setTimeout(() => {
    onLoginLogin();
    // }, 1000);
  }, [1]);

  return (
    <View
      style={[MainStyling.mainContainer, {backgroundColor: colors.grey_white}]}>
      <StatusBar backgroundColor={colors.grey_white} barStyle="dark-content" />
      <View style={styles.container}>
        <Image
          source={require('./../../assets/images/png/MispaMotorsCompany.png')}
          style={styles.imageStyle}
        />
        <Image
          source={require('./../../assets/images/png/Vehicle.png')}
          style={styles.image}
        />
        <Image
          source={require('./../../assets/images/png/smlCompany.png')}
          style={styles.imageStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grey_white,
  },
  subContainer: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: colors.grey_white,
    flex: 0.45,
  },

  paragraph: {
    marginTop: wp('4.2%'),
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  textView: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.primary,
  },

  buttonView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: wp('10%'),
  },

  image: {
    width: wp('75%'),
    height: wp('75%'),
    resizeMode: 'contain',
  },
  imageStyle: {
    // width: wp('30%'),
    height: wp('30%'),
    resizeMode: 'contain',
    // backgroundColor: 'red',
  },
});
export default SplashScreen;
