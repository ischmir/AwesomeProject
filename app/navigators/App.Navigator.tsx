import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Overview from '../screens/OverviewScreen';
import TaskDetails from '../screens/TaskDetailsScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import { TaskProvider } from '../contexts/Tasks.Context';


// This line initializes the stack navigator.
const Stack = createNativeStackNavigator();

const App = () => {

   // Default options for all screens under this navigator.
  const scrOptions = {
    headerStyle: { backgroundColor: '#6200ee' },
    headerTitleStyle: { color: 'white'},
    headerBackTitleVisible: false,
    headerTintColor: 'white',
  };

  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={scrOptions}>
          <Stack.Screen name="Overview" options={{ headerShown: false}} component={Overview} />
          <Stack.Screen name="TaskDetails" component={TaskDetails} />
          <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
};

export default App;
