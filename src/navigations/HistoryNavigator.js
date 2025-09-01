import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import History from '../screens/history/History';
import AddVehicle from '../screens/addVehicles/addVehicle';
import MyProfile from '../screens/profile/MyProfile';
import Dashboard from '../screens/home/Dashboard';
import ScheduleDetails from '../screens/scedule/ScheduleDetails';
import ScheduleSuccess from '../screens/scedule/ScheduleSuccess';
import Massages from '../screens/scedule/Massages';
import SetupSchedule from '../screens/scedule/SetupSchedule';
import PreviewSchedule from '../screens/scedule/PreviewSchedule';
import BillingDetail from '../screens/billings/BillingDetail';
import Billing from '../screens/billings/Billing';
import HistoryDetail from '../screens/history/HistoryDetail';
import List from '../screens/List';
import DetailChatEstimaion from '../screens/Chat/DetailChatEstimaion';
import Privacy from '../screens/general/Privacy';
import FAQ from '../screens/general/FAQ';
import Invoice from '../screens/billings/Invoice';
import Notifications from '../screens/notifications/Notifications';
import DeleteAccount from '../screens/auth/DeleteAccount';

const Stack = createStackNavigator();

function HistoryNavigator() {
  console.log(Stack);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'History'}>
      <Stack.Screen name={'History'} component={History} />
      <Stack.Screen name={'HistoryDetail'} component={HistoryDetail} />
      <Stack.Screen name={'Dashboard'} component={Dashboard} />
      <Stack.Screen name={'ScheduleDetails'} component={ScheduleDetails} />
      <Stack.Screen name={'ScheduleSuccess'} component={ScheduleSuccess} />
      <Stack.Screen name={'MyProfile'} component={MyProfile} />
      <Stack.Screen name={'Massages'} component={Massages} />
      <Stack.Screen name={'SetupSchedule'} component={SetupSchedule} />
      <Stack.Screen name={'PreviewSchedule'} component={PreviewSchedule} />
      <Stack.Screen name={'AddVehicle'} component={AddVehicle} />
      <Stack.Screen name={'BillingDetail'} component={BillingDetail} />
      <Stack.Screen name={'Billing'} component={Billing} />
      <Stack.Screen name={'Invoice'} component={Invoice} />
      <Stack.Screen name={'Notifications'} component={Notifications} />
      <Stack.Screen name={'DeleteAccount'} component={DeleteAccount} />

      <Stack.Screen
        name={'DetailChatEstimaion'}
        component={DetailChatEstimaion}
      />
      <Stack.Screen name={'Privacy'} component={Privacy} />
      <Stack.Screen name={'FAQ'} component={FAQ} />
    </Stack.Navigator>
  );
}

export default HistoryNavigator;
