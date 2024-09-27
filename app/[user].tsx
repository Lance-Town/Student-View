import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation, useLocalSearchParams } from "expo-router";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});

export default function User() {
    const navigation = useNavigation();
    const { user } = useLocalSearchParams(); // Grabs 'user' param from URL
    const [student, setStudent] = useState<any>(null);

    // fetch information about the user from db
    useEffect(() => {
        fetch(`http://localhost:3000/students/${user}`)
            .then((response) => {
                if (response.status === 404) {
                    throw new Error("Student not found");
                }
                return response.json();
            })
            .then((data) => {
                setStudent(data);
            })
            .catch((error) =>
                console.error("Error fetching student details:", error)
            );
    }, [user]);

    // sets the header dynamically to be the users name
    useEffect(() => {
        navigation.setOptions({
            title: user ? `Details about ${user}` : "Student View",
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            {student ? (
                <>
                    <Text>Details about {student.name}</Text>
                    <Text>College: {student.college}</Text>
                    <Text>State: {student.state}</Text>
                    <Text>Interest: {student.interest}</Text>
                </>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
}
