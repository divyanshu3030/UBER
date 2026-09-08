# 🚖 Ride Booking Application

A full-stack **ride-booking web application** built with **React.js, Node.js, Express.js, MongoDB, and Socket.io**. The application provides separate interfaces for users and captains, supporting ride booking, fare calculation, location search, real-time ride updates, OTP verification, and live ride tracking.

---

## ✨ Features

### 👤 User Features

* User registration and login
* Protected user routes
* User logout
* Pickup and destination selection
* Location search suggestions
* Debounced location search
* Vehicle selection
* Car, Auto, and Moto options
* Dynamic fare calculation
* Ride confirmation
* Driver search and assignment
* Real-time ride status updates
* OTP-based ride verification
* Live ride tracking

### 🚗 Captain Features

* Captain registration and login
* Protected captain routes
* Captain dashboard
* Real-time ride requests
* Ride confirmation
* OTP-based ride verification
* Start ride functionality
* Complete ride functionality
* Real-time location updates

---

## 🛠️ Technologies Used

### Frontend

* **React.js**
* **React Router DOM**
* **Axios**
* **Socket.io Client**
* **GSAP**
* **React Icons**
* **Leaflet**
* **React Leaflet**
* **OpenStreetMap**
* **Tailwind CSS**
* **Vite**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **Socket.io**
* **JWT Authentication**
* **bcrypt**
* **Express Validator**
* **Axios**
* **Nominatim OpenStreetMap API**
* **OSRM Routing API**
* **cookie-parser**
* **dotenv**

---

# 📁 Project Structure

```text
Ride-Booking-Application/
│
├── frontend/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
│   └── package.json
│
└── backend/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── services/
    ├── middlewares/
    ├── db/
    ├── app.js
    ├── server.js
    └── package.json
```

---

# 🏗️ Application Architecture

The application follows a client-server architecture:

```text
React Frontend
      │
      │ REST API / Axios
      ▼
Node.js + Express Backend
      │
      ├── Authentication
      ├── Ride Management
      ├── Fare Calculation
      ├── Location Services
      └── Captain Management
      │
      ▼
MongoDB Database

React Frontend
      │
      │ Socket.io
      ▼
Node.js Socket Server
      │
      ├── User ↔ Captain communication
      ├── New ride notifications
      ├── Ride confirmation
      ├── Ride started events
      └── Captain location updates
```

---

# 🔐 Authentication

The application provides separate authentication systems for users and captains.

### User Authentication

* Signup
* Login
* Logout
* JWT-based authentication
* Protected routes

### Captain Authentication

* Signup
* Login
* Logout
* JWT-based authentication
* Protected routes

Authentication middleware verifies the user's or captain's token before allowing access to protected resources.

---

# 🗺️ Location Services

The backend provides location-related APIs for the frontend.

The application uses **Nominatim/OpenStreetMap** for geocoding and location suggestions.

Location search supports:

* Pickup location
* Destination location
* Address suggestions
* Geographic coordinates

The frontend uses:

```text
/maps/get-suggestions
```

for location suggestions.

The backend also uses **OSRM** for routing-related functionality.

---

# 💰 Fare Calculation

The backend calculates fares based on:

* Pickup location
* Destination location
* Distance
* Vehicle type

Supported vehicle types:

```text
Car
Auto
Moto
```

The calculated fare is returned to the frontend and displayed before ride confirmation.

---

# 🚖 Ride Management

The complete ride lifecycle is managed by the backend.

```text
Ride Creation
      ↓
Captain Search
      ↓
Captain Confirmation
      ↓
Ride Confirmation
      ↓
OTP Verification
      ↓
Ride Started
      ↓
Ride Completed
```

The ride model stores important ride information such as:

* User
* Captain
* Pickup
* Destination
* Fare
* Vehicle type
* OTP
* Ride status

---

# 🔌 Real-Time Communication

**Socket.io** is used for real-time communication between users and captains.

Important real-time operations include:

* User/captain socket connection
* New ride notifications
* Ride confirmation
* Ride started notification
* Captain location updates
* Real-time ride status changes

The frontend manages the socket connection through:

```text
SocketContext.jsx
```

The backend maintains socket connections and associates them with users and captains.

---

# 📍 Live Tracking

The frontend uses:

* React Leaflet
* Leaflet
* OpenStreetMap

to display ride locations.

The map can display:

* Pickup location
* Destination
* Captain location

Captain location updates are sent through Socket.io, allowing the frontend to update the ride-tracking interface in real time.

---

# 🚗 Captain Ride Flow

The captain application follows this flow:

```text
Captain Login
      ↓
Captain Dashboard
      ↓
Receive Ride Request
      ↓
View Ride Details
      ↓
Confirm Ride
      ↓
OTP Verification
      ↓
Start Ride
      ↓
Complete Ride
```

---

# 👤 User Ride Flow

```text
User Login
      ↓
Enter Pickup Location
      ↓
Enter Destination
      ↓
Select Location Suggestions
      ↓
Choose Vehicle
      ↓
View Fare
      ↓
Confirm Ride
      ↓
Search for Captain
      ↓
Captain Accepts Ride
      ↓
Ride Confirmed
      ↓
Captain Starts Ride
      ↓
Live Ride Tracking
      ↓
Ride Completed
```

---

# 🧩 Frontend Components

Important frontend components include:

| Component             | Purpose                            |
| --------------------- | ---------------------------------- |
| `VehiclePanel`        | Vehicle selection and fare display |
| `LocationSearchPanel` | Location suggestions               |
| `ConfirmRide`         | Ride confirmation                  |
| `LookingForDriver`    | Captain search status              |
| `WaitingForDriver`    | Confirmed captain information      |
| `LiveTracking`        | Live ride map                      |
| `RidePopUp`           | Incoming ride request              |
| `ConfirmRidePopUp`    | Captain ride confirmation          |
| `CaptainDetails`      | Captain information                |
| `FinishRide`          | Ride completion                    |

---

# ⚙️ Backend Structure

The backend is organized into separate layers for maintainability:

```text
Routes
   ↓
Controllers
   ↓
Services
   ↓
Models
   ↓
MongoDB
```

### Controllers

Handle incoming requests and return responses.

### Routes

Define API endpoints for:

* Users
* Captains
* Rides
* Maps

### Services

Contain business logic such as:

* Location services
* Fare calculation
* Ride management

### Models

Mongoose models manage MongoDB data for:

* Users
* Captains
* Rides

### Middleware

Handles:

* Authentication
* Request validation
* Error-related processing

---

# 🌐 Main API Areas

The backend provides APIs for:

```text
User Authentication
Captain Authentication
Map Services
Fare Calculation
Ride Creation
Ride Confirmation
Ride Start
Ride Completion
```

Example map endpoint:

```text
GET /maps/get-suggestions
```

Example ride operations include:

```text
/create
/get-fare
/confirm
/start-ride
```

---

# 🔒 Protected Routes

The application uses separate protection mechanisms for users and captains.

### Frontend

```text
UserProtectWrapper
CaptainProtectWrapper
```

### Backend

Authentication middleware validates the corresponding JWT before allowing protected operations.

---

# ⚡ Performance

The frontend uses **debounced location searches** to reduce unnecessary API requests.

The backend also uses caching for location searches to reduce repeated requests to external geocoding services.

---

# ⚙️ Environment Variables

### Frontend

Create:

```env
VITE_BASE_URL=http://localhost:4000
```

### Backend

Configure the required environment variables for:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Add any other environment variables required by the backend services.

---

# 🚀 Installation

## 1. Clone the Repository

```bash
git clone <your-repository-url>
```

## 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

## 3. Install Backend Dependencies

```bash
cd ../backend
npm install
```

## 4. Configure Environment Variables

Create `.env` files for both frontend and backend and add the required configuration.

## 5. Start Backend

```bash
npm start
```

## 6. Start Frontend

```bash
npm run dev
```

The frontend communicates with the backend using the configured `VITE_BASE_URL`.

---

# 🔄 Complete System Flow

```text
                    ┌──────────────────┐
                    │      User        │
                    └────────┬─────────┘
                             │
                    Login / Signup
                             │
                             ▼
                    ┌──────────────────┐
                    │ React Frontend   │
                    └────────┬─────────┘
                             │
                    REST API / Socket.io
                             │
                             ▼
                    ┌──────────────────┐
                    │ Express Backend  │
                    └───────┬──────────┘
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
          MongoDB       Map Services   Socket.io
              │             │             │
              │             │             │
              └─────────────┼─────────────┘
                            │
                            ▼
                    ┌──────────────────┐
                    │     Captain      │
                    └──────────────────┘
```

---

# 🔮 Future Improvements

* Online payment integration
* Multiple payment methods
* Ride history
* Ride cancellation
* Rating and review system
* Push notifications
* Improved error handling
* Better loading states
* Advanced route visualization
* Enhanced real-time tracking
* Dark mode
* Improved mobile optimization

---

# 🧑‍💻 Author

**Divyanshu Negi**

---

# 📌 Note

This repository contains the complete **Ride Booking Application**, consisting of separate **frontend and backend applications**.

The frontend provides the user and captain interfaces, while the backend handles authentication, database operations, maps, fare calculation, ride management, and real-time communication.
