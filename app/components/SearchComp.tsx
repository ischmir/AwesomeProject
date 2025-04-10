import React from 'react';
import { Button, StyleSheet, Text, Pressable, View } from 'react-native';
import { useTasks } from '../contexts/Tasks.Context';

export const TaskItem = (props: any) => {

    /** Components logic */
    const { title, onPress } = props;

    return (
        <View style={styles.inputContainer} >
            {/* Input field */}
            <TextInput
                value={newTask}
                style={styles.textInput}
                placeholder="Search for a task..."
                placeholderTextColor="#aaa"
            />
            {/* Search Function */}
            <Button title="Search" onPress={() => {
                const filteredTasks = tasks.filter(task => task.toLowerCase().includes(newTask.toLowerCase()));
                navigation.navigate({ task: filteredTasks });
            }} />
        </View>
    );
};

const styles = StyleSheet.create({
    /** Components styles */
    task: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        margin: 10,
      },
    taskItem: {
        flex: 1,
        justifyContent: 'center',
      },
    taskText: {
        fontSize: 17,
    },
});
