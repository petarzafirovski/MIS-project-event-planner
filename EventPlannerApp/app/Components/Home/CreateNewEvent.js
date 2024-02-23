import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { styles } from "./CreateEventCss";
import * as Location from "expo-location";
import axios from "axios";
import moment from "moment";
import { createNewEvent, Event } from "EventPlannerApp/app/api/data.js";
import Success from "./Success";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

function CreateNewEvent({ navigation }) {
  const [locationPermission, setLocationPermission] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [locationAddress, setLocationAddress] = useState("");
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [posterPhoto, setPosterPhoto] = useState(null);
  const [image, setImage] = useState(null);
  const [dateError, setDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");
  const [startTimeError, setStartTimeError] = useState("");
  const [endTimeError, setEndTimeError] = useState("");
  const [base64Image, setBase64Image] = useState(null);
  const [eventDetails, setEventDetails] = useState({
    type: "CONCERT",
    name: "",
    location: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    isFree: false,
    description: "",
    artist: "",
    latitude: 42.00967846563436,
    longitude: 21.404003106650553,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status);
    })();
  }, []);

  const takePhotoFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const convertToBase64 = async () => {
    try {
      const base64 = await FileSystem.readAsStringAsync(image, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setBase64Image({ type: "image/jpeg", data: base64 });
    } catch (error) {
      console.error("Error converting image to base64:", error);
    }
  };

  useEffect(() => {
    if (image) {
      convertToBase64();
    }
  }, [image]);

  const handleCreateEvent = () => {
    setIsCreatingEvent(true);
    let posterBase64 = null;

    if (base64Image) {
      posterBase64 = `data:${base64Image.type};base64,${base64Image.data}`;
    }
    const formattedEvent: Event = {
      Type: eventDetails.type,
      Name: eventDetails.name,
      EventStartDate: moment(
        `${eventDetails.startDate}T${eventDetails.startTime}:00`
      ).format(),
      EventEndDate: moment(
        `${eventDetails.endDate}T${eventDetails.endTime}:00`
      ).format(),
      Poster: posterBase64 ? posterBase64 : "",
      EventCenter: eventDetails.location,
      EventCenterLocation: {
        Latitude: eventDetails.latitude,
        Longitude: eventDetails.longitude,
      },
      BriefDescription: eventDetails.description,
      TicketSalesLink: "https://orneklink.com/bilet19",
      IsFree: eventDetails.isFree,
      Picture:
        "https://im.haberturk.com/l/2021/12/03/ver1638536162/3272038/jpg/640x360",
      EventUrl: eventDetails.name.toLowerCase().replace(/\s+/g, "-"),
      Artist: eventDetails.artist,
      CreatedBy: "2",
    };
    createNewEvent(formattedEvent)
      .then((response) => {
        console.log("Creating Event:", formattedEvent);

        if (response === 201) {
          setIsCreate(true);
        }
      })
      .catch((error) => {
        console.error("Error creating event:", error);
      })
      .finally(() => {
        setIsCreatingEvent(false);
      });
  };

  const handleLocationChange = async (text) => {
    if (locationPermission !== "granted") {
      console.log("Location permission not granted");
      return;
    }
    setLocationAddress(text);
    try {
      const location = await Location.geocodeAsync(text);
      if (location.length > 0) {
        const { latitude, longitude } = location[0];
        setEventDetails({ ...eventDetails, latitude, longitude });
      }
    } catch (error) {
      console.error("Error geocoding address:", error);
    }
  };

  const handleDateChange = (text) => {
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(text);
    setEventDetails({ ...eventDetails, startDate: text });
    if (isValidDate || text === "") {
      setDateError("");
    } else {
      setDateError("Invalid date format. Please use YYYY-MM-DD.");
    }
  };

  const handleEndDateChange = (text) => {
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(text);
    setEventDetails({ ...eventDetails, endDate: text });
    if (isValidDate || text === "") {
      setEndDateError("");
    } else {
      setEndDateError("Invalid date format. Please use YYYY-MM-DD.");
    }
  };

  const handleStartTimeChange = (text) => {
    const isValidTime = /^([01]\d|2[0-3]):[0-5]\d$/.test(text);
    setEventDetails({ ...eventDetails, startTime: text });
    if (isValidTime || text === "") {
      setStartTimeError("");
    } else {
      setStartTimeError("Invalid time format. Please use HH:mm.");
    }
  };

  const handleEndTimeChange = (text) => {
    const isValidTime = /^([01]\d|2[0-3]):[0-5]\d$/.test(text);
    setEventDetails({ ...eventDetails, endTime: text });
    if (isValidTime || text === "") {
      setEndTimeError("");
    } else {
      setEndTimeError("Invalid time format. Please use HH:mm.");
    }
  };

  return (
    <ScrollView>
      {isCreatingEvent ? (
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
      ) : !isCreatingEvent && isCreate ? (
        <View>
          <Success isCreate={true} navigation={navigation}></Success>
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={{ paddingHorizontal: 20, marginBottom: 200 }}>
            <Text style={styles.label}>Event Type</Text>
            <Picker
              selectedValue={eventDetails.type}
              style={styles.input}
              onValueChange={(itemValue) =>
                setEventDetails({ ...eventDetails, type: itemValue })
              }
            >
              <Picker.Item label="FESTIVAL" value="FESTIVAL" />
              <Picker.Item label="CONCERT" value="CONCERT" />
              <Picker.Item label="EXHIBITION" value="EXHIBITION" />
              <Picker.Item label="THEATRE" value="THEATRE" />
              <Picker.Item label="SPORT" value="SPORT" />
              <Picker.Item label="TALKSHOW" value="TALKSHOW" />
            </Picker>

            <Text style={styles.label}>Event Name</Text>
            <TextInput
              style={styles.input}
              value={eventDetails.name}
              onChangeText={(text) =>
                setEventDetails({ ...eventDetails, name: text })
              }
            />

            <Text style={styles.label}>Start Date</Text>
            <TextInput
              style={styles.input}
              value={eventDetails.startDate}
              onChangeText={handleDateChange}
              placeholder="YYYY-MM-DD"
            />
            {dateError !== "" && (
              <Text style={styles.errorText}>{dateError}</Text>
            )}
            <Text style={styles.label}>Start Time</Text>
            <TextInput
              style={styles.input}
              value={eventDetails.startTime}
              onChangeText={handleStartTimeChange}
              placeholder="HH:mm"
            />
            {startTimeError !== "" && (
              <Text style={styles.errorText}>{startTimeError}</Text>
            )}

            <Text style={styles.label}>End Date</Text>
            <TextInput
              style={styles.input}
              value={eventDetails.endDate}
              onChangeText={handleEndDateChange}
              placeholder="YYYY-MM-DD"
            />
            {endDateError !== "" && (
              <Text style={styles.errorText}>{endDateError}</Text>
            )}
            <Text style={styles.label}>End Time</Text>
            <TextInput
              style={styles.input}
              value={eventDetails.endTime}
              onChangeText={handleEndTimeChange}
              placeholder="HH:mm"
            />
            {endTimeError !== "" && (
              <Text style={styles.errorText}>{endTimeError}</Text>
            )}
            <View style={styles.checkboxContainer}>
              <FontAwesome name="money" size={20} color="black" />
              <Text style={styles.checkboxLabel}>Is Free?</Text>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() =>
                  setEventDetails({
                    ...eventDetails,
                    isFree: !eventDetails.isFree,
                  })
                }
              >
                {eventDetails.isFree && (
                  <FontAwesome name="check" size={15} color="white" />
                )}
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, { height: 100 }]}
              multiline
              value={eventDetails.description}
              onChangeText={(text) =>
                setEventDetails({ ...eventDetails, description: text })
              }
            />

            <Text style={styles.label}>Artist</Text>
            <TextInput
              style={styles.input}
              value={eventDetails.artist}
              onChangeText={(text) =>
                setEventDetails({ ...eventDetails, artist: text })
              }
            />
            <Text style={styles.label}>Location Name:</Text>
            <TextInput
              style={styles.input}
              value={eventDetails.location}
              onChangeText={(text) =>
                setEventDetails({ ...eventDetails, location: text })
              }
            />
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              value={locationAddress}
              onChangeText={handleLocationChange}
            />
            <MapView
              style={styles.map}
              provider="google"
              region={{
                latitude: eventDetails.latitude,
                longitude: eventDetails.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: eventDetails.latitude,
                  longitude: eventDetails.longitude,
                }}
                title="Event Location"
              />
            </MapView>
            <View style={{ marginHorizontal: 40 }}>
              <TouchableOpacity style={styles.choosePhoto} onPress={pickImage}>
                <Text style={styles.createButtonText}>Choose Poster Photo</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.choosePhoto}
                onPress={takePhotoFromCamera}
              >
                <Text style={styles.createButtonText}>
                  Take Poster Photo From Camera
                </Text>
              </TouchableOpacity>
            </View>
            {image && (
              <View style={{ marginVertical: 20, alignItems: "center" }}>
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 200 }}
                />
              </View>
            )}

            <TouchableOpacity
              disabled={
                dateError.length > 0 ||
                startTimeError.length > 0 ||
                !eventDetails.type ||
                !eventDetails.name ||
                !eventDetails.location ||
                !eventDetails.startDate ||
                !eventDetails.startTime ||
                !eventDetails.endDate ||
                !eventDetails.endTime ||
                !eventDetails.description ||
                !eventDetails.artist ||
                !eventDetails.latitude ||
                !eventDetails.longitude ||
                !image
              }
              style={styles.createButton}
              onPress={handleCreateEvent}
            >
              <Text style={styles.createButtonText}>Create Event</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </ScrollView>
  );
}

export default CreateNewEvent;
