import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import DrawerHeader from '../../components/DrawerHeader';
import Loader from '../../components/Loader';
import WebView from 'react-native-webview';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import MainStyling from '../../assets/styles/MainStyling';

const Invoice = ({route}) => {
  const {invoice} = route?.params;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  console.log(invoice);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.white}]}>
      <DrawerHeader />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
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
          Invoice
        </Text>
      </View>
      {isLoading ? (
        <Loader />
      ) : (
        <WebView
          source={{
            uri: `${invoice}`,
          }}
          style={{backgroundColor: colors?.gray}}
          startInLoadingState={true}
          allowUniversalAccessFromFileURLs={true}
          javaScriptEnabled={true}
          mixedContentMode={'always'}
          onNavigationStateChange={result => {}}
        />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  webView: {
    flex: 1,
    height: wp('90%'),
  },
});
export default Invoice;
