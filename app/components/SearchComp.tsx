import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

export const SearchComp = ({ searchQuery, setSearchQuery }) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.textInput}
                placeholder="Search for a task..."
                placeholderTextColor="#aaa"
                autoFocus={false}
                keyboardType="default"
                returnKeyType="search"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        margin: 20,
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#1320bf',
        borderRadius: 6,
        padding: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
});
