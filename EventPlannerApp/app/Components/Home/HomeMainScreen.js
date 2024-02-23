import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import FeaturedEvent from "./FeaturedEvent";
import EventsList from "./EventsList";
import { getAllEvent } from "../../api/data";
import { styles } from "../../Home/homecss";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function HomeMainScreen({ navigation, user }) {
  const [data, setData] = useState([]);
  const [todayEvent, setTodayEvent] = useState([]);
  const [featuredEvent, setFeaturedEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [oldEvents, setOldEvents] = useState([]);
  const [randomNumber, setRandomNumber] = useState(0);

  const [user2, setUser] = React.useState();
  
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user2) => {
      setUser(user2);
    });
  }, [])

  
  const weekendEventGet = async () => {
    setTodayEvent([]);
    if (data.length === 0) return;
    const today = new Date();
    const willComeEvents = await data.filter((item) => {
      const eventDate = new Date(item.EventStartDate);
      return eventDate > today;
    });
    const thisWeekEvents = willComeEvents.filter((item) => {
      const eventDate = new Date(item.EventStartDate);
      const diffTime = eventDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    });
    setTodayEvent(thisWeekEvents);
  };

  const getFeaturedEvent = async () => {
    setFeaturedEvent([]);
    if (data.length === 0) return;

    const today = new Date();
    const willComeEvents = await data.filter((item) => {
      const eventDate = new Date(item.EventStartDate);
      return eventDate > today;
    });

    const featuredEventData = willComeEvents.filter((item) => {
      const eventDate = new Date(item.EventStartDate);
      const diffTime = eventDate.getTime() > today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 30;
    });

    const uniqueRandomFeaturedEvents = new Set();
    while (
      uniqueRandomFeaturedEvents.size < 10 &&
      featuredEventData.length > 0
    ) {
      const randomIndex = Math.floor(Math.random() * featuredEventData.length);
      uniqueRandomFeaturedEvents.add(featuredEventData[randomIndex]);
      featuredEventData.splice(randomIndex, 1);
    }

    setFeaturedEvent([...uniqueRandomFeaturedEvents]);
  };

  const fetchData = async () => {
    const allData = await getAllEvent();
    await setData(allData);
  };
  useEffect(() => {
    const fetchDataAndSetLoading = async () => {
      await Promise.all([fetchData(), weekendEventGet(), getFeaturedEvent()]);
      setLoading(false);
    };

    fetchDataAndSetLoading();
  }, []);
  useEffect(() => {
    fetchData();
    weekendEventGet();
    getFeaturedEvent();
  }, []);

  useEffect(() => {
    weekendEventGet();
    getFeaturedEvent();
    const oldEvents = data.filter((event) => {
      let today = new Date();
      let eventDate = new Date(event.EventStartDate);
      return eventDate < today;
    });
    setOldEvents(oldEvents);
  }, [data]);

  useEffect(() => {
    if (todayEvent.length > 0 && featuredEvent.length > 0) {
      setLoading(false);
    }
  }, [todayEvent, featuredEvent]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.createNewEventButton}
        onPress={() => user2 == null ? navigation.navigate("SignIn") : navigation.navigate("CreateNewEvent")}
      >
        <Text style={styles.createNewEventButtonText}>Create New Event</Text>
      </TouchableOpacity>
      {loading ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            top: "40%",
          }}
        >
          <View>
            <ActivityIndicator size="large" color="#256fbe" />
          </View>
        </View>
      ) : (
        <View>
          <ScrollView>
            <View style={styles.firstView}>
              {featuredEvent.length > 0 && (
                <FeaturedEvent data={featuredEvent[0]} />
              )}
            </View>
            <View style={styles.secondView}>
              <EventsList
                title={"This week Events"}
                data={todayEvent}
                navigation={navigation}
              />
              <EventsList
                title={"Featured Events"}
                data={featuredEvent}
                navigation={navigation}
              />
              <EventsList
                title={"Past Events"}
                data={oldEvents}
                navigation={navigation}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}

export default HomeMainScreen;
