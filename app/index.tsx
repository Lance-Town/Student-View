import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

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

// Define the Student interface
interface Student {
  id: number;
  name: string;
  college: string;
  state: string;
  interest: string;
}

export default function Index() {
  // Set the initial state
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/students')
    .then((response) => response.json())
    .then((data: Student[]) => {
      setStudents(data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      />
    </View>
  );
}
