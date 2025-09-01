import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import Dashboard from '../screens/home/Dashboard';
import ScheduleDetails from '../screens/scedule/ScheduleDetails';
import PreviewSchedule from '../screens/scedule/PreviewSchedule';
import SetupSchedule from '../screens/scedule/SetupSchedule';
import AddVehicle from '../screens/addVehicles/addVehicle';
import Massages from '../screens/scedule/Massages';
import RecordDetails from '../screens/scedule/RecordDetails';
// import SchoolDetail from '../screens/scedule/SchoolDetail';
import InboxChat from '../screens/Chat/InboxChat';
import ChatMessages from '../screens/Chat/ChatMessages';
import Billing from '../screens/billings/Billing';
import BillingDetail from '../screens/billings/BillingDetail';
import ScheduleSuccess from '../screens/scedule/ScheduleSuccess';
import MyProfile from '../screens/profile/MyProfile';
// import List from '../screens/List';
import UpdateProfile from '../screens/profile/UpdateProfile';
import VehicleSuccess from '../screens/addVehicles/VehicleSuccess';
import MyVehicle from '../screens/addVehicles/MyVehicle';
import aboutUs from '../screens/general/aboutUs';
import TermCondition from '../screens/general/TermCondition';
import Privacy from '../screens/general/Privacy';
import FAQ from '../screens/general/FAQ';
import DashboardScreen from '../screens/dashboardScreen/DashboardScreen';
import Notifications from '../screens/notifications/Notifications';
import DeleteAccount from '../screens/auth/DeleteAccount';

const Stack = createStackNavigator();

function HomeNavigator() {
  console.log(Stack);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Dashboard'}>
      <Stack.Screen name={'Dashboard'} component={DashboardScreen} />
      <Stack.Screen name={'ChatMessages'} component={ChatMessages} />
      <Stack.Screen name={'InboxChat'} component={InboxChat} />
      <Stack.Screen name={'BillingDetail'} component={BillingDetail} />
      <Stack.Screen name={'Billing'} component={Billing} />
      <Stack.Screen name={'ScheduleDetails'} component={ScheduleDetails} />
      <Stack.Screen name={'ScheduleSuccess'} component={ScheduleSuccess} />
      <Stack.Screen name={'MyProfile'} component={MyProfile} />
      <Stack.Screen name={'UpdateProfile'} component={UpdateProfile} />
      <Stack.Screen name={'RecordDetails'} component={RecordDetails} />
      <Stack.Screen name={'Massages'} component={Massages} />
      <Stack.Screen name={'SetupSchedule'} component={SetupSchedule} />
      <Stack.Screen name={'PreviewSchedule'} component={PreviewSchedule} />
      <Stack.Screen name={'AddVehicle'} component={AddVehicle} />
      <Stack.Screen name={'VehicleSuccess'} component={VehicleSuccess} />
      <Stack.Screen name={'MyVehicle'} component={MyVehicle} />
      <Stack.Screen name={'AboutUs'} component={aboutUs} />
      <Stack.Screen name={'TermCondition'} component={TermCondition} />
      <Stack.Screen name={'Privacy'} component={Privacy} />
      <Stack.Screen name={'Notifications'} component={Notifications} />
      <Stack.Screen name={'DeleteAccount'} component={DeleteAccount} />
      <Stack.Screen name={'FAQ'} component={FAQ} />
    </Stack.Navigator>
  );
}

export default HomeNavigator;
