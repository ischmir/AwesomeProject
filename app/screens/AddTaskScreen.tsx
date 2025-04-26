import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import { useTasks } from '../contexts/Tasks.Context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MenuComp } from '../components/MenuComp';

const AddTaskScreen = ({ navigation }) => {
    const { addTask } = useTasks();
    const [title, setTitle] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [dueDate, setDueDate] = useState(new Date());
    const [showDateTimePicker, setShowDateTimePicker] = useState(true);

    {/* Alerts users fill out fields or adds task to the list */}
    const handleAddTask = () => {
        if (title.trim() === '' || desc.trim() === '') {
            alert('Please fill in all fields.');
            return;
        }
        addTask(title, desc, dueDate.toISOString());
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.inputContainer}>
                {/* Input field for title */}
                <TextInput
                    value={title}
                    style={styles.textInput}
                    placeholder="Enter a new task..."
                    placeholderTextColor="#aaa"
                    onChangeText={text => setTitle(text)}
                    multiline={true}
                    numberOfLines={3}
                />
                {/* Input field for description */}
                <TextInput
                    value={desc}
                    style={styles.textInput}
                    placeholder="Enter a Description..."
                    placeholderTextColor="#aaa"
                    onChangeText={text => setDesc(text)}
                />
                {/* Set Due Date */}
                <Button title="Select Due Date" onPress={() => setShowDateTimePicker(true)} />
                    {showDateTimePicker && (
                        <DateTimePicker
                            value={dueDate}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowDateTimePicker(false);
                                if (selectedDate) {
                                    setDueDate(selectedDate);
                                }
                            }}
                        />
                    )}
                <Text style={styles.dueDateText}>Due Date: {dueDate.toDateString()}</Text>

                {/* Add task button */}
                <Pressable style={styles.buttonAddTask} onPress={handleAddTask}>
                    <Text style={styles.buttonAddTaskText} >Add Task</Text>
                    </Pressable>
            </View>
            <MenuComp />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#fff',
        flex: 1,
    },
    inputContainer: {
        marginBottom: 10,
        marginHorizontal: 16,
        flex: 1,
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 6,
        fontSize: 16,
        padding: 10,
        margin: 10,
        minHeight: 60,
        backgroundColor: '#fff',
    },
    dueDateText: {
        fontSize: 16,
        color: '#00',
        marginVertical: 10,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        margin: 10,
    },
    buttonAddTask: {
        backgroundColor: '#1320bf',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonAddTaskText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default AddTaskScreen;
