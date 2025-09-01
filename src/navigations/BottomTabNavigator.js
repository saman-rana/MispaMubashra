import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, View, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import SettingsNavigator from './SettingsNavigator';
// import CustomTabBarButton from '../components/CustomTabBarButton';
import {useNavigation} from '@react-navigation/native';
// import * as Svg from '../assets/images/svg';
import HomeNavigator from './HomeNavigator';
import colors from '../assets/colors/colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Text} from 'react-native';
import MainStyling from '../assets/styles/MainStyling';
import SchduleNavigator from './SchduleNavigator';
import HistoryNavigator from './HistoryNavigator';
import BillingNavigator from './BillingNavigator';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabNavigator({route}) {
  const navigation = useNavigation();
  const getIcons = (route, focused) => {
    if (route.name === 'billing') {
      return (
        <MaterialCommunityIcons
          name="map"
          size={wp('8%')}
          color={focused ? colors.white : colors.light_color}
        />
      );
    } else if (route.name === 'schedule') {
      return (
        <Feather
          name="truck"
          size={wp('8%')}
          color={focused ? colors.white : colors.light_color}
        />
      );
    } else if (route.name === 'messages') {
      return (
        <MaterialCommunityIcons
          name="message-text-outline"
          size={wp('8.5%')}
          color={focused ? colors.white : colors.light_color}
        />
      );
    } else if (route.name === 'Dashboard') {
      return (
        <Feather
          name="shopping-bag"
          size={wp('8%')}
          color={focused ? colors.white : colors.light_color}
        />
      );
    } else if (route.name === 'history') {
      return (
        <MaterialCommunityIcons
          name="history"
          size={wp('8.5%')}
          color={focused ? colors.white : colors.light_color}
        />
      );
    }
  };
  return (
    <Tab.Navigator
      initialRouteName={'Dashboard' || ''}
      screenOptions={{headerShown: false, tabBarHideOnKeyboard: true}}
      safeAreaInsets={{
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
      tabBar={({state, navigation}) => {
        return (
          <View
            style={{
              backgroundColor: colors.primary,
              flexDirection: 'row',
              paddingHorizontal: Platform.OS === 'android' ? 17 : 15,
              paddingVertical: Platform.OS === 'android' ? 10 : 18,
              justifyContent: 'space-between',
            }}>
            {state?.routes?.map((route, index) => {
              const isFocused = state.index === index;

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate({
                    name: route.name,
                    merge: true,
                    ...route.params,
                  });
                }
              };

              return (
                <Pressable
                  key={index}
                  onPress={onPress}
                  style={{
                    width: wp('16%'),
                    height: wp('15%'),
                    borderRadius: 300,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {getIcons(route, isFocused)}
                  <Text
                    style={[
                      MainStyling.miniText,
                      {
                        color: isFocused ? colors.white : colors.light_color,
                        marginBottom: wp('2%'),
                      },
                    ]}>
                    {route.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        );
      }}>
      <Tab.Screen
        name={'billing'}
        component={BillingNavigator}
        // options={{
        //   tabBarLabel: '',
        //   title: '',
        //   headerShown: false,
        //   // tabBarButton: props => (
        //   //   <CustomTabBarButton route="settings" {...props} />
        //   // ),
        //   headerRight: () => {
        //     return (
        //       <TouchableOpacity
        //         onPress={() => {
        //           if (navigation) {
        //             navigation.openDrawer();
        //           }
        //         }}>
        //         <Icon
        //           name={Platform.OS === 'ios' ? 'ios-menu' : 'ios-menu'}
        //           size={30}
        //           color={'red'}
        //           style={{marginRight: 10}}
        //         />
        //       </TouchableOpacity>
        //     );
        //   },
        // }}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'schedule',
          title: '',
          headerShown: false,
        }}
        name="schedule"
        component={SchduleNavigator}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Dashboard',
          title: '',
          headerShown: false,
        }}
        name="Dashboard"
        component={HomeNavigator}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'history',
          title: '',
          headerShown: false,
        }}
        name="history"
        component={HistoryNavigator}
      />
      <Tab.Screen
        name={'messages'}
        component={SettingsNavigator}
        options={{
          tabBarLabel: 'Settings',
          title: '',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
