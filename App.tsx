import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TaskProvider } from './app/contexts/Tasks.Context.tsx';
import Overview from './app/screens/OverviewScreen';
import TaskDetailsScreen from './app/screens/TaskDetailsScreen';
import AddTaskScreen from './app/screens/AddTaskScreen';
import DoneTasksScreen from './app/screens/DoneTasksScreen';


// This line initializes the stack navigator.
const Stack = createNativeStackNavigator();

const App = () => {

   // Default options for all screens under this navigator.
  const scrOptions = {
    headerStyle: { backgroundColor: '#1320bf' },
    headerTitleStyle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
    headerBackTitleVisible: false,
    headerTintColor: 'white',
  };

  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={scrOptions}>
          <Stack.Screen name="Overview" options={{ headerBackVisible: false, headerTitle: 'Tasks To Do', animation: 'fade' }} component={Overview} />
          <Stack.Screen name="TaskDetails" options={{headerTitle: 'Task Details'}} component={TaskDetailsScreen} />
          <Stack.Screen name="AddTask" options={{headerTitle: 'New Task'}} component={AddTaskScreen} />
          <Stack.Screen name="DoneTasks" options={{ headerBackVisible: false, headerTitle: 'Completed Tasks', animation: 'fade' }} component={DoneTasksScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
};

export default App;
