import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View, ScrollView, ActivityIndicator } from "react-native";
import { styles } from "../../Categories/categoriesStyle";
import { getAllEvent } from "../../api/data";
import CategoriesElement from "./CategoriesElement";

function CategoriesHome({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const events = await getAllEvent();
        setAllEvents(events);
  
        const categoriesData = events.map((event) => event.Type);
        const uniqueCategories = [...new Set(categoriesData)];
  
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <>
      {loading ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            top: "40%",
            paddingVertical: 200,
          }}
        >
          <View>
            <ActivityIndicator size="large" color="#256fbe" />
          </View>
        </View>
        ) : (
    <SafeAreaView>
      <View style={styles.title}>
        <Text
          style={{
            fontSize: 26,
            fontWeight: "bold",
          }}
        >
          Categories
        </Text>
      </View>
      <View style={styles.categoriesCards}>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <CategoriesElement events={allEvents} title={item} navigation={navigation} />
          )}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
        )}
        </>
  );
}

export default CategoriesHome;
