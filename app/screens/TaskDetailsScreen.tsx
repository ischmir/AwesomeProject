import React, { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, View, Pressable } from 'react-native';
import { useTasks } from '../contexts/Tasks.Context';
import { MenuComp } from '../components/MenuComp';

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
            <Text style={styles.infoText}>Title:</Text>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.infoText}>Description:</Text>
            <Text style={styles.desc}>{task.desc}</Text>
            <Text style={styles.infoText}>Due Date:</Text>
            <Text style={styles.dueDate}>{new Date(task.dueDate).toDateString()}</Text>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <Pressable
                    style={isCompleted ? styles.undoButton : styles.doneButton}
                    onPress={handleToggleCompleted}>
                    <Text style={styles.buttonText}>
                        {isCompleted ? 'Mark as Undone' : 'Mark as Done'}
                    </Text>
                </Pressable>
                <Pressable
                    style={styles.removeButton}
                    onPress={handleRemoveTask}>
                    <Text style={styles.buttonText}>
                        Remove Task
                    </Text>
                </Pressable>
            </View>
            {/* Menu Bar */}
            <MenuComp />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    infoText: {
        paddingHorizontal: 20,
        marginBottom: 5,
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    desc: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    dueDate: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    undoButton: {
        backgroundColor: '#DBB229',
        padding: 10,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    doneButton: {
        backgroundColor: '#44A950',
        padding: 10,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#fff',
    },
    removeButton: {
        backgroundColor: '#DB2929',
        padding: 10,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
});

export default TaskDetails;
