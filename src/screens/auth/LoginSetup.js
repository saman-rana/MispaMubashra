import * as React from 'react';
import {
  SafeAreaView,
  Text,
  useWindowDimensions,
  Image,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Login from '../../components/auth/Login';
import colors from '../../assets/colors/colors';
import MainStyling from '../../assets/styles/MainStyling';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Register from '../../components/auth/Register';

const renderTabBar = props => (
  <SafeAreaView style={{marginTop: -wp('3%')}}>
    <Image
      source={require('./../../assets/images/png/headerImage.png')}
      style={styles.imageStyle}
    />
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: colors.primary}}
      activeColor={colors.primary}     
      inactiveColor={colors.primary}
      style={{
        backgroundColor: colors.white,
        marginTop: -wp('3%'),

        ...Platform.select({
          ios: {
            shadowColor: colors.light_grey,
            shadowOffset: {width: 0, height: 10},
            shadowOpacity: 0.4,
          },
          android: {
            elevation: 3,
            backgroundColor: colors.grey_white,
          },
        }),
      }}
      renderLabel={({route, focused, color}) => (
        <Text style={[MainStyling.subHeading, {color: colors.primary}]}>
          {route.title}
        </Text>
      )}
    />
  </SafeAreaView>
);

const LoginSetup = ({route}) => {
  const {navRoute} = route.params;
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: navRoute === 'register' ? 'second' : 'first',
      title: navRoute === 'login' ? 'Signin' : 'Get Started',
    },
    {
      key: navRoute === 'register' ? 'first' : 'second',
      title: navRoute === 'login' ? 'Get Started' : 'Signin',
    },
  ]);

  const FirstRoute = () => {
    return <Login />;
  };

  const SecondRoute = () => <Register />;

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />

      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
        
        
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: wp('100%'),
    resizeMode: 'contain',

    ...Platform.select({
      ios: {
        shadowColor: colors.white,
        shadowOffset: {width: 0, height: 12},
        shadowOpacity: 0.9,
      },
      android: {
        elevation: 3,
        backgroundColor: colors.grey_white,
      },
    }),
  },
});

export default LoginSetup;
