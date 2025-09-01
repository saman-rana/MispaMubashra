import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Massages from '../screens/scedule/Massages';
import AddVehicle from '../screens/addVehicles/addVehicle';
import MyProfile from '../screens/profile/MyProfile';
import Dashboard from '../screens/home/Dashboard';
import ScheduleDetails from '../screens/scedule/ScheduleDetails';
import ScheduleSuccess from '../screens/scedule/ScheduleSuccess';
import SetupSchedule from '../screens/scedule/SetupSchedule';
import PreviewSchedule from '../screens/scedule/PreviewSchedule';
import BillingDetail from '../screens/billings/BillingDetail';
import Billing from '../screens/billings/Billing';
import InboxChat from '../screens/Chat/InboxChat';
import ChatMessages from '../screens/Chat/ChatMessages';
import DetailChatEstimaion from '../screens/Chat/DetailChatEstimaion';
import aboutUs from '../screens/general/aboutUs';
import TermCondition from '../screens/general/TermCondition';
import Privacy from '../screens/general/Privacy';
import FAQ from '../screens/general/FAQ';
import Invoice from '../screens/billings/Invoice';
import Notifications from '../screens/notifications/Notifications';
import DeleteAccount from '../screens/auth/DeleteAccount';
import History from '../screens/history/History';

const Stack = createStackNavigator();

function SettingsNavigator() {
  console.log(Stack);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'InboxChat'}>
      <Stack.Screen name={'History'} component={History} />
      <Stack.Screen name={'MyProfile'} component={MyProfile} />
      <Stack.Screen name={'Dashboard'} component={Dashboard} />
      <Stack.Screen name={'ScheduleDetails'} component={ScheduleDetails} />
      <Stack.Screen name={'ScheduleSuccess'} component={ScheduleSuccess} />
      <Stack.Screen name={'Massages'} component={Massages} />
      <Stack.Screen name={'SetupSchedule'} component={SetupSchedule} />
      <Stack.Screen name={'PreviewSchedule'} component={PreviewSchedule} />
      <Stack.Screen name={'AddVehicle'} component={AddVehicle} />
      <Stack.Screen name={'InboxChat'} component={InboxChat} />
      <Stack.Screen name={'DeleteAccount'} component={DeleteAccount} />
      <Stack.Screen
        name={'DetailChatEstimaion'}
        component={DetailChatEstimaion}
      />
      <Stack.Screen name={'ChatMessages'} component={ChatMessages} />
      <Stack.Screen name={'BillingDetail'} component={BillingDetail} />
      <Stack.Screen name={'Billing'} component={Billing} />
      <Stack.Screen name={'Invoice'} component={Invoice} />
      <Stack.Screen name={'AboutUs'} component={aboutUs} />
      <Stack.Screen name={'TermCondition'} component={TermCondition} />
      <Stack.Screen name={'Privacy'} component={Privacy} />
      <Stack.Screen name={'FAQ'} component={FAQ} />
      <Stack.Screen name={'Notifications'} component={Notifications} />
    </Stack.Navigator>
  );
}

export default SettingsNavigator;
