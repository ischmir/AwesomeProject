import React from 'react';
import { Button, StyleSheet, Text, Pressable, View } from 'react-native';
import { useTasks } from '../contexts/Tasks.Context';

export const TaskItem = (props: any) => {

    /** Components logic */
    const { id, title, onPressGoToDetails, task } = props;

    const { removeTask } = useTasks();

    return (
        <Pressable style={styles.task} onPress={onPressGoToDetails} >
            <View style={styles.taskItem} >
                <Text style={styles.taskText} > {title} </Text>
                <Text style={styles.dueDate}>Due Date: {new Date(task.dueDate).toDateString()}</Text>
            </View>
            <Button title={'Done'} onPress={() => removeTask(id)} />
        </Pressable>
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
    dueDateText: {
        fontSize: 14,
        color: '#666',
    },
});
