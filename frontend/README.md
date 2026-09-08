# 🚖 Ride Booking Application - Frontend

A modern and responsive **ride-booking web application frontend** built using **React.js**. The application provides separate interfaces for users and captains, allowing users to search for locations, select vehicles, book rides, and track ride status in real time.

The frontend communicates with a backend API for authentication, location suggestions, fare calculation, ride management, and real-time updates.

---

## ✨ Features

### 👤 User Features

* User registration and login
* Protected user routes
* User logout functionality
* Pickup and destination location input
* Location search suggestions
* Debounced location search requests
* Vehicle selection
* Multiple vehicle options:

  * Car
  * Auto
  * Moto
* Dynamic fare display
* Ride confirmation
* Driver/captain search status
* Driver assignment updates
* Real-time ride confirmation
* Ride start notifications
* Live ride tracking interface

---

### 🚗 Captain Features

* Captain registration and login
* Protected captain routes
* Captain dashboard
* Ride request notifications
* Ride confirmation interface
* OTP-based ride process
* Captain ride screen
* Ride completion functionality
* Real-time communication using Socket.io

---

## 🛠️ Technologies Used

The frontend is built using the following technologies and libraries:

* **React.js** – Frontend user interface
* **React Router DOM** – Client-side routing
* **Axios** – API communication
* **Socket.io Client** – Real-time communication
* **GSAP** – UI animations
* **@gsap/react** – GSAP integration with React
* **React Icons** – Application icons
* **Leaflet** – Interactive maps
* **React Leaflet** – React integration for Leaflet maps
* **OpenStreetMap** – Map tile provider
* **Tailwind CSS** – Styling and responsive UI
* **Vite** – Frontend development and build tool

---

## 📁 Project Structure

```text
frontend/
│
├── App.jsx
├── main.jsx
│
├── components/
│   ├── CaptainDetails.jsx
│   ├── ConfirmRide.jsx
│   ├── ConfirmRidePopUp.jsx
│   ├── FinishRide.jsx
│   ├── LiveTracking.jsx
│   ├── LocationSearchPanel.jsx
│   ├── LookingForDriver.jsx
│   ├── RidePopUp.jsx
│   ├── VehiclePanel.jsx
│   └── WaitingForDriver.jsx
│
├── context/
│   ├── CaptainContext.jsx
│   ├── SocketContext.jsx
│   └── UserContext.jsx
│
└── pages/
    ├── Start.jsx
    ├── Home.jsx
    ├── Riding.jsx
    ├── UserLogin.jsx
    ├── UserSignup.jsx
    ├── UserLogout.jsx
    ├── UserProtectWrapper.jsx
    ├── CaptainHome.jsx
    ├── Captainlogin.jsx
    ├── Captainsignup.jsx
    ├── CaptainRiding.jsx
    └── CaptainProtectWrapper.jsx
```

---

# 📄 Application Pages

## 🏠 Start Page

The start page acts as the entry point of the application. Users can navigate to the login and signup sections from this page.
<img width="423" height="760" alt="Screenshot 2026-09-08 205309" src="https://github.com/user-attachments/assets/2ab6f0eb-9bf6-4067-85c0-658c9e391846" />


---

## 🔐 User Authentication

The application provides separate pages for user authentication.

### User Signup

New users can create an account using the signup page.

<img width="350" height="632" alt="user signup" src="https://github.com/user-attachments/assets/41c63e4b-c67d-41d8-ab12-cf369ef67f13" />



### User Login

Registered users can log in to access the ride-booking functionality.

<img width="428" height="762" alt="user login" src="https://github.com/user-attachments/assets/89f7fd34-8f47-4151-8aa8-8ba2ba647bae" />



### User Logout

The application provides a dedicated logout route for authenticated users.

---

## 👤 User Protected Routes

The `UserProtectWrapper` component protects user-specific routes.

Unauthenticated users are prevented from accessing protected pages directly.

Example protected routes include:

* Home page
* Logout functionality

---

## 🚗 Captain Authentication

The application also provides a separate authentication system for captains.

### Captain Signup

New captains can register through the captain signup page.

<img width="350" height="632" alt="captain signup" src="https://github.com/user-attachments/assets/fcee1890-dd4d-4666-a66f-bc7b6640f7af" />



### Captain Login

Registered captains can log in and access the captain dashboard.

<img width="353" height="632" alt="captain login" src="https://github.com/user-attachments/assets/8a2c8275-f411-4474-afb5-16a53281b9d8" />



---

## 🛡️ Captain Protected Routes

The `CaptainProtectWrapper` component protects captain-specific routes.

Only authenticated captains can access pages such as:

* Captain Home
* Captain Ride Interface

---

# 🗺️ Location Search

The application allows users to enter:

* Pickup location
* Destination location

When the user starts typing a location, the application sends a request to the backend to retrieve location suggestions.

The frontend uses the following API endpoint:

```text
/maps/get-suggestions
```

The request includes the typed location as an input parameter.

<img width="428" height="767" alt="Screenshot 2026-09-08 205428" src="https://github.com/user-attachments/assets/eef5a9ef-2aca-4ab8-af97-f34742428063" />



---

## ⏳ Debounced Search

To reduce unnecessary API requests, the application uses a debounce mechanism.

The application waits before sending the location search request. If the user continues typing, the previous request timer is cancelled.

This improves:

* API efficiency
* Application performance
* User experience
* Location search responsiveness

Location suggestions are displayed after the user enters at least a few characters.

---

# 📍 Location Search Panel

The `LocationSearchPanel` component displays location suggestions returned from the backend.

Each suggestion includes:

* Location icon
* Location description

The user can select a location for either:

* Pickup
* Destination

The selected location is then updated in the ride-booking form.

---

# 🚘 Vehicle Selection

The application provides multiple ride options through the `VehiclePanel` component.

Available vehicle types include:

### 🚙 Car

A compact and affordable car ride option.

### 🛺 Auto

An affordable auto-rickshaw ride option.

### 🏍️ Moto

A motorcycle ride option for individual passengers.

The application displays:

* Vehicle image
* Vehicle name
* Passenger capacity
* Estimated availability
* Ride description
* Dynamic fare

<img width="425" height="766" alt="Screenshot 2026-09-08 205850" src="https://github.com/user-attachments/assets/4de3ba2b-eeae-4984-8bdf-f2f9ef8e8be1" />



---

# 💰 Fare Display

The fare for each vehicle type is received from the backend and displayed dynamically.

Example:

```text
Car   → ₹Fare
Auto  → ₹Fare
Moto  → ₹Fare
```

The user can select a vehicle based on the available options and fare.

<img width="425" height="766" alt="Screenshot 2026-09-08 205850" src="https://github.com/user-attachments/assets/a15a3ff2-9324-4f2e-bf59-08a04e8486ba" />



---

# ✅ Ride Confirmation

After selecting a vehicle, the user is shown a ride confirmation panel.

The confirmation screen displays:

* Selected vehicle
* Pickup location
* Destination location
* Ride fare
* Payment method

The current payment method displayed in the frontend is:

```text
Cash
```

After reviewing the ride details, the user can confirm the ride.



---

# 🔍 Looking for Driver

After confirming a ride, the application displays a driver search interface.

The frontend waits for a captain to accept the ride request.

This process is handled using real-time socket communication.

---

# 👨‍✈️ Waiting for Driver

Once a captain accepts the ride, the application updates the ride status.

The user receives real-time information about the confirmed ride and waits for the captain to proceed.

The `WaitingForDriver` component is used to display the assigned driver and ride information.

---

# 📡 Real-Time Communication

The application uses **Socket.io** for real-time communication between users and captains.

The socket connection is managed through:

```text
SocketContext.jsx
```

The frontend listens for important ride events such as:

```text
ride-confirmed
```

and:

```text
ride-started
```

---

## 🔄 User Socket Connection

When a user accesses the application, the frontend sends a socket event to join the system.

Example concept:

```text
join
```

The user information is sent with the socket connection so that the backend can identify the connected user.

---

<img width="720" height="1600" alt="WhatsApp Image 2026-09-08 at 9 12 24 PM" src="https://github.com/user-attachments/assets/814dfdec-403f-4528-9a9a-4c1b486f2fa6" />



## 🚗 Ride Confirmed Event

When a captain confirms a ride, the user receives a real-time event.

The frontend then:

* Stores the ride information
* Updates the ride state
* Stops the driver search process
* Opens the waiting interface

<img width="731" height="1600" alt="accept ride" src="https://github.com/user-attachments/assets/5d4d465f-e39d-444a-921c-385b23fa5157" />



---

## ▶️ Ride Started Event

When the captain starts the ride, the user receives another real-time event.

The frontend then redirects the user to the ride screen.

The ride information is passed to the ride page.

---

# 🗺️ Live Tracking

The application includes a `LiveTracking` component for displaying map-based ride information.

The map is created using:

* React Leaflet
* Leaflet
* OpenStreetMap

The map can display:

* Pickup location
* Destination location
* Captain location

---

## 📍 Map Features

The live tracking system dynamically updates the map based on available ride information.

The application can:

* Center the map on the pickup location
* Display the destination
* Track the captain location
* Adjust the map view to show multiple locations

When both pickup and destination locations are available, the map can adjust its bounds to display both points.

---

# 👨‍✈️ Captain Dashboard

The captain dashboard allows drivers to manage incoming ride requests.

The captain can:

* View ride requests
* Check ride information
* Confirm rides
* Start rides
* Complete rides

The interface uses real-time socket communication to receive new ride requests.

<img width="357" height="630" alt="captain home" src="https://github.com/user-attachments/assets/345404ed-280d-4250-b420-518b8d1111e0" />



---

# 🚖 Ride Popup

The `RidePopUp` component displays incoming ride information to captains.

It allows captains to review and respond to ride requests.

---

# 🔐 Ride Confirmation Popup

The `ConfirmRidePopUp` component is used during the captain-side ride confirmation process.

The captain can proceed with the ride after confirming the required ride information.

<img width="731" height="1600" alt="accept ride" src="https://github.com/user-attachments/assets/eab580c8-9d0a-427c-8e38-166cd69da90e" />



---

# 🔢 OTP-Based Ride Process

The application includes an OTP-based ride process.

The OTP is used as part of the ride verification process before the ride begins.

This helps ensure that the correct user and captain are connected to the correct ride.


---

# 🏁 Finish Ride

The `FinishRide` component handles the ride completion interface.

After reaching the destination, the captain can complete the ride.

---

# 👤 User Context

The application uses React Context API to manage user information.

The user context is handled through:

```text
UserContext.jsx
```

It helps make user data accessible across multiple components without passing props through every component.

---

# 🚗 Captain Context

Captain-related information is managed through:

```text
CaptainContext.jsx
```

This context provides captain data to different parts of the application.

---

# 🔌 Socket Context

Socket connection management is handled through:

```text
SocketContext.jsx
```

This allows the application to share the Socket.io connection across multiple components.

---

# 🧭 Application Routing

The application uses **React Router DOM** for navigation.

The main routes include:

| Route             | Description       |
| ----------------- | ----------------- |
| `/`               | Start Page        |
| `/login`          | User Login        |
| `/signup`         | User Signup       |
| `/home`           | User Home Page    |
| `/riding`         | User Ride Page    |
| `/user/logout`    | User Logout       |
| `/captain-login`  | Captain Login     |
| `/captain-signup` | Captain Signup    |
| `/captain-home`   | Captain Dashboard |
| `/captain-riding` | Captain Ride Page |

---

# 🔒 Protected Routes

The application uses route protection for authenticated users and captains.

### User Protected Route

```text
UserProtectWrapper
```

This protects user-specific pages.

### Captain Protected Route

```text
CaptainProtectWrapper
```

This protects captain-specific pages.

---

# 🎨 User Interface

The frontend is designed to provide a modern and responsive ride-booking experience.

The UI includes:

* Responsive layouts
* Vehicle selection cards
* Animated panels
* Location search interface
* Ride confirmation screens
* Driver search screens
* Live tracking map
* Captain ride management screens

---

# ⚙️ Environment Variables

The frontend uses an environment variable to connect with the backend API.

Create a `.env` file in the frontend project directory and add:

```env
VITE_BASE_URL=your_backend_url
```

Example:

```env
VITE_BASE_URL=http://localhost:4000
```

Replace the URL with your actual backend server URL.

---

# 🚀 Installation

## 1. Clone the Repository

```bash
git clone <your-repository-url>
```

---

## 2. Navigate to the Frontend Directory

```bash
cd frontend
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Configure Environment Variables

Create a `.env` file:

```env
VITE_BASE_URL=http://localhost:4000
```

Make sure the backend server URL is correct.

---

## 5. Start the Development Server

```bash
npm run dev
```

The application will start on a local development server.

---

# 🔄 Application Flow

The basic user ride-booking flow is:

```text
Start Application
        ↓
User Signup / Login
        ↓
User Home Page
        ↓
Enter Pickup Location
        ↓
Enter Destination
        ↓
Get Location Suggestions
        ↓
Select Locations
        ↓
Choose Vehicle
        ↓
View Fare
        ↓
Confirm Ride
        ↓
Looking for Driver
        ↓
Captain Accepts Ride
        ↓
Ride Confirmed
        ↓
Captain Starts Ride
        ↓
Live Ride Screen
```

---

# 🚗 Captain Flow

The captain-side flow is:

```text
Captain Signup / Login
        ↓
Captain Dashboard
        ↓
Receive Ride Request
        ↓
View Ride Details
        ↓
Confirm Ride
        ↓
Verify Ride Information
        ↓
Start Ride
        ↓
Complete Ride
```

---

# 🔮 Future Improvements

Possible future improvements for the frontend include:

* Online payment integration
* Multiple payment methods
* Estimated arrival time
* Real-time captain movement
* Complete route visualization
* Ride history
* User profile management
* Captain profile management
* Rating and review system
* Push notifications
* Improved error handling
* Loading indicators
* Dark mode
* Better mobile optimization
* Advanced map tracking
* Ride cancellation functionality

---

# 📦 Main Frontend Components

| Component             | Description                                       |
| --------------------- | ------------------------------------------------- |
| `VehiclePanel`        | Displays available vehicle options                |
| `LocationSearchPanel` | Displays location search suggestions              |
| `ConfirmRide`         | Shows ride details before confirmation            |
| `LookingForDriver`    | Shows driver search status                        |
| `WaitingForDriver`    | Displays waiting status after driver confirmation |
| `LiveTracking`        | Displays the interactive ride map                 |
| `RidePopUp`           | Displays ride requests for captains               |
| `ConfirmRidePopUp`    | Handles captain-side ride confirmation            |
| `CaptainDetails`      | Displays captain information                      |
| `FinishRide`          | Handles ride completion                           |

---

# 🧑‍💻 Author

**Divyanshu**

---

# 📌 Note

This repository contains the **frontend part of the Ride Booking Application**.

The frontend communicates with a separate backend application for:

* Authentication
* Location suggestions
* Fare calculation
* Ride creation
* Captain management
* Ride management
* Real-time socket communication

The complete combined project documentation can be created separately after integrating the frontend and backend documentation.
