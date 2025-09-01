import React,{useState} from 'react';
import { 
    SafeAreaView,
    View, 
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Pressable,
 } from 'react-native';
 import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
 import Feather from 'react-native-vector-icons/Feather';
 import colors from '../../assets/colors/colors';
 import MainStyling from '../../assets/styles/MainStyling';
 import {useNavigation} from '@react-navigation/native';
 import Button from '../../components/Button';
const SchoolDetail = () => {
    const navigation = useNavigation();
    const [data, setData] = useState ([
        {
            title: 'Name',
            subTitle: "School Name"
          },
          {
              title: 'Username',
              subTitle: "School Name"
            },
            {
              title: 'E-mail',
              subTitle: "webnnaresh@gmail.com"
            },
            {
              title: 'Bio',
              subTitle: "Add a bio to your profile"
            },
      ]);
    const item = ({ item }) => (
        <View style={[MainStyling.screenPadding,{marginVertical:wp('3%')}]}>
        <TouchableOpacity style={[ {    
      flexDirection: 'row',      
       alignItems: 'center',}]}>
        <View>
        <Text style={[MainStyling.mediumText,]}>{item?.title}</Text>
       <Text style={[MainStyling.buttonText,{fontWeight:"bold", color:colors.black}]}>{item.subTitle}</Text>
        </View>
       <View style={[styles.icon,{position: 'absolute', right: 0}]}>
            <Pressable
              onPress={() => {
              
              }}>
              <Feather
                name={'chevron-right'}
                size={wp('7%')}
                color={colors.gray}
              />
            </Pressable>
          </View>
         
       </TouchableOpacity>
       </View>
      );

  return (
    <SafeAreaView
    style={[styles.container, {backgroundColor: colors.grey_white, }]}>
       <View style={[{flex:6}]}>
       <View style={[styles.card1,{}]}></View>
        <View style={[styles.card2,{}]}>
        <Text style={[MainStyling.buttonText,{fontWeight:"bold", color:colors.white}]}>School Name</Text>
        <Text style={[MainStyling.mediumText,{color: colors.white}]}>Kompally, Hyd</Text>
        </View>
        <View style={[MainStyling.divider]}></View>
        <FlatList
      data={data}
      renderItem={item}
      keyExtractor={item => item.id}
     
    />
       </View>
    <View style={[MainStyling.screenPadding,{flex:0.65 }]}>
    <Button
        variant="outline"
        label={'Log Out'}       
        labelStyle={MainStyling.buttonText}
        onPress={() => {
          navigation.navigate('PreviewSchedule');
        }}
      />
    </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,    
    backgroundColor: 'white',
},
card1:{
    width: wp('100%'),
    height: wp('10%'),
  
    // borderBottomRightRadius:  wp('50%'),
    // borderBottomLeftRadius:wp('50%'),
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:colors.primary
},
card2:{
    width: wp('100%'),
    height: wp('46%'),
    borderBottomRightRadius:  wp('50%'),
    borderBottomLeftRadius:wp('50%'),
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:colors.primary
},
icon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: wp('10'),
    width: wp('10'),
   
  },

});
export default SchoolDetail;