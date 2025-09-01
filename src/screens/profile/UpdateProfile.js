import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MainStyling from '../../assets/styles/MainStyling';
import colors from '../../assets/colors/colors';
import {useSelector} from 'react-redux';
import {onProfileDetail, updateProfileList} from '../../apis/auth-apis';
import DisableInputs from '../../components/DisableInputs';
import DrawerHeader from '../../components/DrawerHeader';
import Feather from 'react-native-vector-icons/Feather';

const UpdateProfile = () => {
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const userDetails = useSelector(state => state.auth.user);

  const [values, setValues] = useState({
    name: '',
    username: '',
    email: '',
    bio: '',
  });

  const onChange = (name, value) => {
    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const onUpdateProfileList = async () => {
    const details = {
      name: values?.name,
      username: values?.username,
      bio: values?.bio,
      id: userDetails?.id,
      token: userDetails?.api_token,
    };
    updateProfileList(details)
      .then(response => {
        console.log('Response show there for UpdateProfile: ', response?.data);
        navigation.navigate('MyProfile');
      })
      .catch(({response}) => {
        setErrorMessage(response?.data?.error);
        console.log(response?.data);
      });
  };

  const getProfileList = async () => {
    setIsLoading(true);
    const details = {
      token: userDetails?.api_token,
      id: userDetails?.id,
    };
    onProfileDetail(details)
      .then(response => {
        console.log('Response show there for ProfileList: ', response?.profile);
        const {name, email, bio, username} = response?.user;
        console.log('Name:', name); // Log the extracted name
        console.log('Email:', email); // Log the extracted email
        console.log('Bio:', bio); // Log the extracted bio
        onChange('name', name);
        onChange('email', email);
        onChange('bio', bio);
        onChange('username', username);
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
    <SafeAreaView style={[MainStyling.mainContainer]}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
            Add vehicle
          </Text>
        </View>

        <View style={MainStyling.divider}></View>
        <View style={MainStyling.screenPadding}>
          <InputField
            value={values.name}
            placeholder={'Name'}
            label={'Name'}
            onChangeText={value => {
              onChange('name', value);
              setErrorMessage('');
            }}
            onIconPress={() => {
              setSecureTextEntry(!secureTextEntry);
            }}
          />
          <View style={MainStyling.dividerTwo}></View>
          <InputField
            value={values.username}
            placeholder={'Username'}
            label={'Username'}
            onChangeText={value => {
              onChange('username', value);
              setErrorMessage('');
            }}
            onIconPress={() => {
              setSecureTextEntry(!secureTextEntry);
            }}
          />
          <View style={MainStyling.dividerTwo}></View>
          <DisableInputs label={'Email'} value={values.email} />
          {/* <InputField
          icon={'Email'}
          value={values.email}
          placeholder={'Email'}
          label={'Email'}
          onChangeText={value => {
            onChange('email', value);
            setErrorMessage('');
          }}
        /> */}
          <View style={MainStyling.dividerTwo}></View>
          <InputField
            value={values.bio}
            placeholder={'Bio'}
            label={'Bio'}
            onChangeText={value => {
              onChange('bio', value);
              setErrorMessage('');
            }}
          />
          <View style={MainStyling.dividerTwo}></View>

          <Text
            style={[
              MainStyling.label,
              {color: colors.primary, marginVertical: wp('1.5%')},
            ]}>
            {errorMessage}
          </Text>

          <View style={MainStyling.dividerTwo}></View>
          <Button
            label={'Submit Profile'}
            labelStyle={MainStyling.buttonText}
            onPress={() => {
              const mailformat = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
              if (
                values.email === '' ||
                values.username === '' ||
                values.name === '' ||
                values.bio === ''
              ) {
                setErrorMessage('Enter name, username, eamil and bio');
                // } else if (!mailformat.test(values.email)) {
                //   setErrorMessage('Invalid email');
                // } else if (!isPasswordValid(values.password)) {
                //   setErrorMessage(
                //     'Password must contain one capital letter, one special letter, and minimum 8 digits',
                //   );
                // } else if (values.password != values.confirm_password) {
                //   setErrorMessage('Password does not match');
              } else {
                setErrorMessage('');
                //console.log(!isPasswordValid(values.password));
                // navigation.navigate('Home');
                onUpdateProfileList('');
              }
            }}
          />
        </View>

        <View style={MainStyling.divider}></View>

        <View style={MainStyling.divider}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.primary,
  },
  paragraph: {
    textAlign: 'center',
    marginVertical: wp('1.5%'),
  },
  subHeading: {
    textAlign: 'center',
  },
  justifyC: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    padding: wp('4%'),
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: wp('2%'),
    shadowColor: colors.gray,
    flexDirection: 'row',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
  blackLine: {
    flex: 1,
    height: wp('0.5%'),
    backgroundColor: colors.light_black,
  },
  heading: {
    textAlign: 'center',
  },
});

export default UpdateProfile;
