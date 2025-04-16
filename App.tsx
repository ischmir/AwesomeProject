import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Overview from './app/screens/OverviewScreen.tsx';
import TaskDetails from './app/screens/TaskDetailsScreen';
import AddTaskScreen from './app/screens/AddTaskScreen.tsx';
import { TaskProvider } from './app/contexts/Tasks.Context.tsx';
import DoneTasksScreen from './app/screens/DoneTasksScreen.tsx';


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
          <Stack.Screen name="Task Details" component={TaskDetails} />
          <Stack.Screen name="Add Task" component={AddTaskScreen} />
          <Stack.Screen name="DoneTasks" component={DoneTasksScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
};

export default App;
