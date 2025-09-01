import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Billing from '../screens/billings/Billing';
import BillingDetail from '../screens/billings/BillingDetail';
import AddVehicle from '../screens/addVehicles/addVehicle';
import MyProfile from '../screens/profile/MyProfile';
import Dashboard from '../screens/home/Dashboard';
import ScheduleDetails from '../screens/scedule/ScheduleDetails';
import ScheduleSuccess from '../screens/scedule/ScheduleSuccess';
import Massages from '../screens/scedule/Massages';
import SetupSchedule from '../screens/scedule/SetupSchedule';
import PreviewSchedule from '../screens/scedule/PreviewSchedule';
import List from '../screens/List';
import Notifications from '../screens/notifications/Notifications';
import DeleteAccount from '../screens/auth/DeleteAccount';

const Stack = createStackNavigator();

function BillingNavigator() {
  console.log(Stack);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Billing'}>
      <Stack.Screen name={'DeleteAccount'} component={DeleteAccount} />
      <Stack.Screen name={'MyProfile'} component={MyProfile} />
      <Stack.Screen name={'Dashboard'} component={Dashboard} />
      <Stack.Screen name={'ScheduleDetails'} component={ScheduleDetails} />
      <Stack.Screen name={'ScheduleSuccess'} component={ScheduleSuccess} />
      <Stack.Screen name={'Massages'} component={Massages} />
      <Stack.Screen name={'SetupSchedule'} component={SetupSchedule} />
      <Stack.Screen name={'PreviewSchedule'} component={PreviewSchedule} />
      <Stack.Screen name={'AddVehicle'} component={AddVehicle} />
      <Stack.Screen name={'BillingDetail'} component={BillingDetail} />
      <Stack.Screen name={'Notifications'} component={Notifications} />
      <Stack.Screen
        initialParams={{jobs: {id: 10, amount: 400}, billingTab: 'true'}}
        name={'Billing'}
        component={Billing}
      />
    </Stack.Navigator>
  );
}

export default BillingNavigator;
