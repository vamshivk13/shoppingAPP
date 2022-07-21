import { View, Text, FlatList } from "react-native";
import React from "react";

export default function VirtualizedList({ children }) {
  return (
    <FlatList
      data={[]}
      ListEmptyComponent={null}
      keyExtractor={() => "dummy"}
      renderItem={null}
      ListHeaderComponent={() => <React.Fragment>{children}</React.Fragment>}
    ></FlatList>
  );
}
