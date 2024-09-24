import React from "react";
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

export default function Index() {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {key: 'Person 1'},
          {key: 'Person 2'},
          {key: 'Person 3'},
          {key: 'Person 4'},
          {key: 'Person 5'},
          {key: 'Person 6'},
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
}
