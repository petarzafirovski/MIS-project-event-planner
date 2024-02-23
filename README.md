# МИС 2023/2024 - EventPlanner
EventPlanner is a cross-platform mobile application made in react native utilizing expo that serves the users of the platform, planning, organizing and creating events of multiple types with one goal to make it smooth and simpler to organize events, rather than the dialing on the phone all day or sending separate messages. Other functionalities are joining an event, seeing which events have I joined, searching an event, uploading a picture for the event and setting location coordinates that can be viusalized in google maps to see where the event is. The mobile app also uses an web API that serves as a web service for creating events, fetching and joining.

<h3>The featues of the app are:</h3>
<ul>
  <li><strong>Custom UI elements:</strong> Designed and implemented custom user interface elements to enhance the visual appeal and user experience of the application</li>
  <li><strong>State management using React Hooks:</strong> Utilized React Hooks for efficient state management, simplifying the handling of component-level state</li>
  <li><strong>Authentication process using Firebase (Register/Login):</strong> Implemented user authentication functionalities, including user registration and login processes, using Firebase authentication</li>
  <li><strong>Camera for uploading images for an event:</strong> Integrated camera functionality to allow users to capture and upload images for events</li>
  <li><strong>Location of the event using Google Maps:</strong> Integrated Google Maps to display the location of events, providing users with visual information about event venues</li>
  <li><strong>Displaying the events, joining an event, creating an event:</strong> Implemented features for users to view events, join existing events, and create new events, enhancing the overall event management experience</li>
</ul>

<h3>Software design patterns used:</h3>
<ul>
  <li><strong>Component-Based Architecture:</strong> Structured the application using modular components to enhance code reusability and encapsulate logic</li>
  <li><strong>Container-Component Pattern:</strong> Components were separated into containers (handling logic and state) and presentational components for better maintainability</li>
  <li><strong>Render Props Pattern:</strong> Utilizing the Render Props pattern to pass functions as props, allowing dynamic rendering and behavior, enhancing component flexibility</li>
  <li><strong>Stack Navigation:</strong> Screen navigation was organized in a stack-like manner for seamless transitions between different application screens</li>
  <li><strong>Tab Navigation:</strong> Content was organized into tabs, enabling users to switch between different sets of functionality easily</li>
</ul>

<h3>How to run it?</h3>
<ul>
  <li>Firstly, startup the web api service with docker compose</li>
  <li>For react-native local development in android (like in my case), I needed to install locally openjdk-17 (by running <code>choco install -y nodejs-lts microsoft-openjdk17</code>)</li>
  <li>In the ```services/Firebase.js``` add your configuration parameters for Firebase in order to setup the authentication provider</li>
  <li>Start your simulator by your choice (in my case I used android studio Pixel 7 Pro API 33 (Android 13.0 Tiramisu))</li>
  <li>Then run <code>npm install</code> and after that in another terminal run <code>npm run android</code></li>
</ul>



