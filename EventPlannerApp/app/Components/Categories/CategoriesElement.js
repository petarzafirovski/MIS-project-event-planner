import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../Categories/categoriesStyle";

function CategoriesElement({events, title, navigation }) {
  const navigateEvents = () => {
    navigation.navigate("Events", { title: title, events: events });
  };
  return (
    <TouchableOpacity
      style={{
        borderRadius: 30,
        margin: 10,
      }}
      onPress={() => {
        navigateEvents();
      }}
    >
      <View style={{ position: "relative", overflow: "hidden" }}>
        <Image
          source={require("../../../assets/categoriesbg.png")}
          style={{
            width: 170,
            height: 170,
          }}
        />
      </View>
      <View style={styles.categoriesCardContent}>
        <Text style={styles.categoriesCardContentTitle}>{title} </Text>
        {title === "FESTIVAL" && (
          <Image
            source={require("../../../assets/festival.png")}
            style={styles.categoriesCardContentImg}
          />
        )}
        {title === "CONCERT" && (
          <Image
            source={require("../../../assets/sing.png")}
            style={styles.categoriesCardContentImg}
          />
        )}
        {title === "EXHIBITION" && (
          <Image
            source={require("../../../assets/sergi.png")}
            style={styles.categoriesCardContentImg}
          />
        )}
        {title === "THEATRE" && (
          <Image
            source={require("../../../assets/tiyatro.png")}
            style={styles.categoriesCardContentImg}
          />
        )}
        {title === "SPORT" && (
          <Image
            source={require("../../../assets/sports.png")}
            style={styles.categoriesCardContentImg}
          />
        )}
        {title === "TALKSHOW" && (
          <Image
            source={require("../../../assets/talkshow.png")}
            style={{
              position: "absolute",
              bottom: -20,
              right: 45,
              width: 80,
              height: 80,
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

export default CategoriesElement;
