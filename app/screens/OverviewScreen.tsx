import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { TaskItem } from '../components/TaskItem';
import { useTasks } from '../contexts/Tasks.Context';

const Overview = ({ navigation }) => {

    const { tasks, clearTasks } = useTasks();
        const [searchQuery, setSearchQuery] = useState('');
        const filteredTasks = tasks.filter(task =>
            !task.completed && // Exclude completed tasks
            (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.desc.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <SafeAreaView style={styles.background}>

            {/* Header */}
            <View style={styles.headerContainer} >
                <Text style={styles.headerText}>To-Do App</Text>
                {/* Add task button */}
                <View style={styles.addTaskButton}>
                    <Button
                      title="+"
                      onPress={() => navigation.navigate('Add Task', {name: 'AddTaskScreen'})}
                    />
                </View>
            </View>

            <View style={styles.inputContainer} >

                {/* Input field */}
                <TextInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={styles.textInput}
                    placeholder="Search for a task..."
                    placeholderTextColor="#aaa"
                />
            </View>

            <View style={styles.seperator} />

            {/* Task List */}
            {
                tasks.length === 0 ? (
                    <Text style={styles.errorNoTasks}>No tasks available</Text>
                ) : (
                  <FlatList
                    style={styles.tasksContainer}
                    data={filteredTasks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <TaskItem
                        id={item.id}
                        title={item.title}
                        task={item}
                        onPressGoToDetails={()=>navigation.navigate('Task Details', {task: item})}
                      />
                    )}
                  />
                )
            };

            {/* Clear button */}
            {
                tasks.length > 0 && (
                    <Button
                      title="Clear All Tasks"
                      onPress={clearTasks}
                    />
                )
            };
            {
                <Button
                  title="View Completed Tasks"
                  onPress={() => navigation.navigate('DoneTasks')}
                />
            };
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#3b3b3b',
        flex: 1,
    },
    headerContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#1320bf',
      marginBottom: 10,
    },
    headerText: {
      fontSize: 24,
      color: '#fff',
      fontWeight: 'bold',
    },
    addTaskButton: {
      backgroundColor: '#fff',
      borderRadius: 50,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#400000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 5,
    },
    inputContainer: {
      flexDirection: 'row',
      marginBottom: 10,
      marginHorizontal: 16,
    },
    textInput: {
      flex: 1,
      borderWidth: 1,
      borderRadius: 6,
      padding: 10,
      backgroundColor: '#fff',
    },
    seperator: {
      height: 6,
      backgroundColor: '#1320bf',
    },

    tasksContainer: {
      padding: 10,
    },
    errorNoTasks: {
      color: '#fff',
      fontSize: 16,
      textAlign: 'center',
      marginTop: 20,
    },
});

export default Overview;
