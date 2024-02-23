import React from "react";
import { SafeAreaView } from "react-native";
import Success from "EventPlannerApp/app/Components/Home/Success.js";
import SuccessAuth from "EventPlannerApp/app/auth/Success.js";
import CreateNewEvent from "EventPlannerApp/app/Components/Home/CreateNewEvent.js";
import { styles } from "./homecss";
import HomeMainScreen from "../Components/Home/HomeMainScreen";
import { createStackNavigator } from "@react-navigation/stack";
import EventDetail from "../EventDetail/EventDetail";
import EventsByTime from "EventPlannerApp/app/Components/Home/EventsByTime.js";
import SignUp from "../auth/SignUp";
import SignIn from "../auth/SignIn";
const Stack = createStackNavigator();

function HomeScreen(user) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeMainScreen" >
        {(props) => <HomeMainScreen {...props} user={user} />}
      </Stack.Screen>
      <Stack.Screen
        name="EventsDetail"
        component={EventDetail}
        options={({ route }) => ({
          title: route.params.title,
          headerShown: true,
          headerStyle: {
            backgroundColor: "#ffffff",
            shadowColor: "#ffffff",
            elevation: 0,
          },
          headerTintColor: "#256fbe",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      />
      <Stack.Screen
        name="CreateNewEvent"
        component={CreateNewEvent}
        options={({ route }) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: "#ffffff",
            shadowColor: "#ffffff",
            elevation: 0,
          },
          headerTintColor: "#256fbe",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      />
      <Stack.Screen
        name="Success"
        component={Success}
        options={({ route }) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: "#ffffff",
            shadowColor: "#ffffff",
            elevation: 0,
          },
          headerTintColor: "#256fbe",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      />
      <Stack.Screen
        name="Events"
        component={EventsByTime}
        options={({ route }) => ({
          title: route.params.title,
          headerShown: true,
          headerStyle: {
            backgroundColor: "#ffffff",
            shadowColor: "#ffffff",
            elevation: 0,
          },
          headerTintColor: "#256fbe",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={({ route }) => ({          
          headerShown: true,
          headerStyle: {
            backgroundColor: "#ffffff",
            shadowColor: "#ffffff",
            elevation: 0,
          },
          headerTintColor: "#256fbe",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={({ route }) => ({         
          headerShown: true,
          headerStyle: {
            backgroundColor: "#ffffff",
            shadowColor: "#ffffff",
            elevation: 0,
          },
          headerTintColor: "#256fbe",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      />
      <Stack.Screen
        name="SuccessAuth"
        component={SuccessAuth}
        options={({ route }) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: "#ffffff",
            shadowColor: "#ffffff",
            elevation: 0,
          },
          headerTintColor: "#256fbe",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      />
    </Stack.Navigator>
  );
}

export default HomeScreen;
