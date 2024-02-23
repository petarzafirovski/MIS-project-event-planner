import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import SearchCard from "EventPlannerApp/app/Components/Search/SearchCard";
import { styles } from "EventPlannerApp/app/Categories/categoriesStyle";
import { FlatList } from "react-native";

function EventsByTime({ route, navigation }) {
    const { title, data } = route.params;
  const [eventsByTime, setEvents] = useState([]);

  useEffect(() => {
    setEvents(data);
  }, []);
  return (
    <View style={styles.categoryContainer}>
      <FlatList
        data={eventsByTime}
        renderItem={({ item }) => (
          <SearchCard
            title={item.Name}
            image={item.Poster}
            date={item.EventStartDate}
            location={item.EventCenter}
            onPress={() => navigation.navigate("EventsDetail", { id: item.Id })}
          />
        )}
        keyExtractor={(item) => item.Id}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default EventsByTime;
