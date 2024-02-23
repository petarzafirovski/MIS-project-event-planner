import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../Home/homecss";
import Card from "./Card";


const EventsList = ({ data, title, navigation }) => {

  const handleViewAll = () => {
    navigation.navigate("Events", { title, data });
  };
  return (
    <View>
      {data.length > 0 ? (
        <>
          <View style={styles.eventListHeader}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {title}
            </Text>
            <TouchableOpacity onPress={handleViewAll}>
              <Text>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cards}>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <Card
                  key={item.Id}
                  title={
                    item.Name.length > 20
                      ? item.Name.slice(0, 20) + "..."
                      : item.Name
                  }
                  location={
                    item.EventCenter.length > 20
                      ? item?.EventCenter.slice(0, 20) + "..."
                      : item?.EventCenter
                  }
                  date={item.EventStartDate.toString()}
                  price={item.IsFree}
                  id={item.Id}
                  eventImage={item.Poster}
                  navigation={navigation}
                />
              )}
              keyExtractor={(item) => item.Id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </>
      ) : (
        <View
  style={{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    marginTop: 20, // Add margin at the top
  }}
>
  <Text
    style={{
      fontSize: 36,
      fontWeight: "bold",
      color: "#2E86C1",
      marginBottom: 20,
      textShadowColor: "#34495E",
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 5,
    }}
  >
    {title}
  </Text>
  <View
    style={{
      borderBottomWidth: 2,
      borderBottomColor: "#3498DB",
      width: "80%", // Adjust the width as needed
      marginBottom: 20,
    }}
  />
  <Text
    style={{
      fontSize: 24,
      color: "#7F8C8D",
      fontStyle: "italic",
      textAlign: "center",
    }}
  >
    No Events
  </Text>
</View>

      )}
    </View>
  );
};

export default EventsList;
