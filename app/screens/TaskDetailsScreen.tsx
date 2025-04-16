import React, { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, Button, View } from 'react-native';
import { useTasks } from '../contexts/Tasks.Context';

const TaskDetails = ({ route, navigation }) => {
    const { task } = route.params;
    const { toggleTaskCompleted, removeTask } = useTasks();

    // Local state to track the completed status
    const [isCompleted, setIsCompleted] = useState(task.completed);

    const handleToggleCompleted = () => {
        toggleTaskCompleted(task.id);
        setIsCompleted(!isCompleted);
    };

    const handleRemoveTask = () => {
        removeTask(task.id);
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.desc}>{task.desc}</Text>
            <Text style={styles.dueDate}>Due Date: {new Date(task.dueDate).toDateString()}</Text>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <Button
                    title={isCompleted ? 'Undo' : 'Done'}
                    onPress={handleToggleCompleted}
                />
                <Button
                    title="Remove Task"
                    onPress={handleRemoveTask}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    desc: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    dueDate: {
        fontSize: 16,
        color: '#333',
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default TaskDetails;
