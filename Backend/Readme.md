# 🚖 Ride Booking Application - Backend

This repository contains the **backend API and real-time server** for a ride-booking application.

The backend is built using **Node.js, Express.js, MongoDB, Mongoose, Socket.io, JWT authentication, and external map services**. It handles user and captain authentication, ride creation, fare calculation, location services, nearby captain detection, OTP-based ride verification, ride status management, and real-time communication between users and captains.

---

## ✨ Features

### 👤 User Management

* User registration
* User login
* JWT authentication
* Protected user routes
* User profile access
* User logout
* Token blacklisting

---

### 🚗 Captain Management

* Captain registration
* Captain login
* JWT authentication
* Protected captain routes
* Captain profile access
* Vehicle information management
* Captain logout
* Token blacklisting
* Real-time socket connection management
* Captain location updates

---

### 🚖 Ride Management

* Create a new ride
* Calculate ride fare
* Store pickup and destination details
* Convert addresses into coordinates
* Find nearby captains
* Send ride requests to nearby captains
* Captain ride acceptance
* OTP-based ride verification
* Start a ride
* Complete a ride
* Ride status management

---

### 🗺️ Map and Location Services

* Convert addresses into coordinates
* Calculate distance and travel time
* Location autocomplete suggestions
* Nearby captain search
* Geospatial location queries
* OpenStreetMap integration
* OSRM route service integration

---

### 📡 Real-Time Communication

The backend uses **Socket.io** for real-time communication between users and captains.

Real-time functionality includes:

* User socket registration
* Captain socket registration
* Captain location updates
* New ride notifications
* Ride confirmation notifications
* Ride start notifications
* Ride completion notifications
* Live captain location updates for users

---

## 🛠️ Technologies Used

The backend uses the following technologies and libraries:

* **Node.js** – JavaScript runtime
* **Express.js** – Backend web framework
* **MongoDB** – NoSQL database
* **Mongoose** – MongoDB object modeling
* **Socket.io** – Real-time communication
* **JSON Web Token (JWT)** – Authentication
* **bcrypt** – Password hashing
* **Express Validator** – Request validation
* **Cookie Parser** – Cookie handling
* **CORS** – Cross-origin request handling
* **dotenv** – Environment variable management
* **Axios** – External API requests
* **OpenStreetMap / Nominatim** – Geocoding and location search
* **OSRM** – Route, distance, and travel-time calculations

---

# 📁 Project Structure

```text
backend/
│
├── app.js
├── server.js
├── socket.js
├── .env
│
├── controllers/
│   ├── user.controller.js
│   ├── captain.controller.js
│   ├── map.controller.js
│   └── ride.controller.js
│
├── db/
│   └── db.js
│
├── middlewares/
│   └── auth.middleware.js
│
├── models/
│   ├── user.model.js
│   ├── captain.model.js
│   ├── ride.model.js
│   └── blacklistToken.model.js
│
├── routes/
│   ├── user.routes.js
│   ├── captain.routes.js
│   ├── maps.routes.js
│   └── ride.routes.js
│
└── services/
    ├── user.service.js
    ├── captain.service.js
    ├── maps.service.js
    └── ride.service.js
```

---

# ⚙️ Application Architecture

The backend follows a structured architecture based on the following layers:

```text
Client
   │
   ▼
Routes
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Models / Database
```

### Routes

Routes define the API endpoints and apply validation and authentication middleware.

### Controllers

Controllers receive requests and responses and manage the application flow.

### Services

Services contain the main business logic of the application.

### Models

Models define the MongoDB database structure using Mongoose schemas.

### Middleware

Middleware handles authentication and authorization for protected routes.

---

# 🚀 Server Setup

The application uses an HTTP server created with Node.js.

The Socket.io server is attached to the same HTTP server.

The server entry point is:

```text
server.js
```

The application starts using the configured environment port.

Example:

```text
PORT=4000
```

If no port is provided, the application uses a default port.

---

# 🔌 Express Application

The main Express application is configured in:

```text
app.js
```

The backend enables:

* CORS
* JSON request parsing
* URL-encoded request parsing
* Cookie parsing
* Database connection
* API routes

The main API route groups are:

```text
/users
/captains
/maps
/rides
```

---

# 🗄️ Database

The application uses **MongoDB** with **Mongoose**.

Database connection logic is located in:

```text
db/db.js
```

The MongoDB connection string is stored using an environment variable.

```env
DB_CONNECT=your_mongodb_connection_string
```

The application connects to MongoDB when the server starts.

---

# 🔐 Authentication System

The application uses **JWT (JSON Web Token)** authentication.

When a user or captain successfully logs in or registers, an authentication token is generated.

The token contains the user's database ID.

Example concept:

```text
JWT
   │
   ▼
User ID / Captain ID
   │
   ▼
Authentication Middleware
   │
   ▼
Protected API Access
```

---

# 🔒 Password Security

Passwords are hashed using:

```text
bcrypt
```

Passwords are never intended to be stored as plain text.

The application uses password hashing before creating users and captains.

Password comparison is performed during login.

---

# 🍪 Cookie Authentication

The backend can store authentication tokens in cookies.

The authentication middleware checks for the token from:

1. Cookies
2. Authorization headers

Authorization header format:

```text
Bearer <token>
```

---

# 🚫 Token Blacklisting

The application uses a blacklist token model to invalidate tokens after logout.

The blacklist model stores logged-out tokens temporarily.

The blacklist token schema includes an expiration period.

This means old blacklisted tokens are automatically removed after the configured expiry time.

The blacklist model is located in:

```text
models/blacklistToken.model.js
```

---

# 👤 User API

User routes are managed through:

```text
routes/user.routes.js
```

The main user-related functionality includes:

* Register user
* Login user
* Get user profile
* Logout user

---

## 📝 Register User

Users can create a new account by providing:

* First name
* Last name
* Email
* Password

The backend:

1. Validates the request
2. Checks whether the user already exists
3. Hashes the password
4. Creates a new user
5. Generates a JWT token
6. Returns the token and user data

---

## 🔑 User Login

During login, the backend:

1. Validates the request
2. Finds the user using the email address
3. Retrieves the hashed password
4. Compares the entered password
5. Generates a JWT token
6. Stores the token in a cookie
7. Returns the token and user information

---

## 👤 User Profile

Authenticated users can access their profile.

The authentication middleware verifies the token and attaches the authenticated user to:

```text
req.user
```

---

## 🚪 User Logout

When a user logs out:

* The authentication token is invalidated
* The token can be added to the blacklist
* The authentication cookie is cleared

---

# 🚗 Captain API

Captain routes are managed through:

```text
routes/captain.routes.js
```

Captain functionality includes:

* Captain registration
* Captain login
* Captain profile access
* Captain logout

---

## 📝 Captain Registration

A captain account includes:

### Personal Information

* First name
* Last name
* Email
* Password

### Vehicle Information

* Vehicle color
* Vehicle plate number
* Vehicle capacity
* Vehicle type

Supported vehicle types include:

```text
car
motorcycle
auto
```

---

## 🔑 Captain Login

Captain login follows a secure authentication flow:

1. Validate email and password
2. Find the captain
3. Retrieve the hashed password
4. Compare the password
5. Generate a JWT token
6. Store the token in a cookie
7. Return captain information

---

# 🛡️ Authentication Middleware

Authentication logic is located in:

```text
middlewares/auth.middleware.js
```

The backend provides two authentication middleware functions.

### User Authentication

```text
authUser
```

This middleware protects user routes.

It:

* Reads the JWT token
* Checks whether the token exists
* Checks whether the token is blacklisted
* Verifies the JWT
* Finds the user
* Stores the authenticated user in:

```text
req.user
```

---

### Captain Authentication

```text
authCaptain
```

This middleware protects captain routes.

It:

* Reads the JWT token
* Checks whether the token exists
* Checks whether the token is blacklisted
* Verifies the JWT
* Finds the captain
* Stores the authenticated captain in:

```text
req.captain
```

---

# 🗺️ Maps API

Map routes are managed through:

```text
routes/maps.routes.js
```

The map service provides several location-related features.

---

## 📍 Get Coordinates

The backend can convert an address into geographical coordinates.

The coordinate response includes:

```text
Latitude
Longitude
```

The location service is useful for:

* Ride pickup locations
* Ride destination locations
* Captain location tracking
* Nearby captain search

---

## ⏱️ Get Distance and Time

The backend can calculate:

* Distance
* Estimated travel duration

The system uses location coordinates and routing services to determine route information.

---

## 🔎 Location Autocomplete Suggestions

The backend provides location search suggestions.

Users can enter part of an address or location name, and the backend returns matching suggestions.

This feature is useful for:

* Pickup location search
* Destination search

The frontend can display these suggestions to users while they type.

---

# 🌍 Geocoding Service

The application uses external map services for geocoding.

The backend converts an address into coordinates.

Example:

```text
Dehradun, Uttarakhand
        │
        ▼
Geocoding Service
        │
        ▼
Latitude + Longitude
```

These coordinates are later used for:

* Ride creation
* Distance calculation
* Fare calculation
* Nearby captain search
* Live tracking

---

# 🚖 Ride API

Ride routes are managed through:

```text
routes/ride.routes.js
```

The ride system supports the complete ride lifecycle.

The main ride functionality includes:

* Create ride
* Get fare
* Confirm ride
* Start ride
* End ride

---

# ➕ Create Ride

A user can create a ride by providing:

* Pickup location
* Destination location
* Vehicle type

The backend then performs the following process:

```text
User Creates Ride
        │
        ▼
Validate Request
        │
        ▼
Convert Pickup Address to Coordinates
        │
        ▼
Convert Destination Address to Coordinates
        │
        ▼
Calculate Fare
        │
        ▼
Generate OTP
        │
        ▼
Store Ride in Database
        │
        ▼
Find Nearby Captains
        │
        ▼
Send Ride Request Using Socket.io
```

---

# 💰 Fare Calculation

The backend calculates the estimated ride fare using:

* Base fare
* Distance
* Travel time
* Vehicle type

Different vehicle types have different pricing.

Supported ride categories include:

```text
car
auto
moto
```

The fare calculation uses route distance and travel duration information.

---

# 📍 Ride Coordinates

When a ride is created, the backend stores coordinates for:

### Pickup Location

```text
pickupCoordinates
```

The stored information includes:

* Latitude
* Longitude

### Destination Location

```text
destinationCoordinates
```

The stored information includes:

* Latitude
* Longitude

These coordinates are used for ride tracking and captain search.

---

# 🔍 Find Nearby Captains

The application uses MongoDB geospatial queries to find captains near the pickup location.

Captain locations are stored using GeoJSON.

Example structure:

```text
Point
│
├── Longitude
└── Latitude
```

The captain model uses a geospatial index:

```text
2dsphere
```

This allows the backend to efficiently search for captains within a specified radius.

---

# 📡 New Ride Notification

After creating a ride, the backend searches for nearby captains.

Each nearby captain receives a real-time event.

Event:

```text
new-ride
```

The ride information is sent to available captains through Socket.io.

---

# ✅ Confirm Ride

When a captain accepts a ride:

1. The ride status changes to:

```text
accepted
```

2. The captain is assigned to the ride.

3. The user is notified through Socket.io.

Event:

```text
ride-confirmed
```

The ride information is sent to the connected user.

---

# 🔢 OTP-Based Ride Verification

Each ride receives a randomly generated OTP.

The OTP is used to verify the ride before starting it.

The OTP provides an additional verification step between the user and captain.

The OTP is stored in the ride document.

---

# ▶️ Start Ride

Before starting a ride:

* The ride ID is verified
* The OTP is checked
* The ride status is checked

The ride must have the following status:

```text
accepted
```

After successful verification, the ride status changes to:

```text
ongoing
```

The user receives a real-time event:

```text
ride-started
```

---

# 🏁 End Ride

After the ride is completed:

1. The ride is verified
2. The assigned captain is checked
3. The ride status is checked
4. The ride status is updated

The final ride status becomes:

```text
completed
```

The user receives a real-time ride completion event.

---

# 📊 Ride Status Flow

The ride model supports the following statuses:

```text
pending
   │
   ▼
accepted
   │
   ▼
ongoing
   │
   ▼
completed
```

The application also supports:

```text
cancelled
```

The complete ride status structure is:

```text
pending
accepted
ongoing
completed
cancelled
```

---

# 🗄️ Ride Model

The ride model is located in:

```text
models/ride.model.js
```

A ride includes:

* User
* Captain
* Pickup location
* Destination location
* Pickup coordinates
* Destination coordinates
* Fare
* Ride status
* Duration
* Distance
* Payment ID
* Order ID
* Payment signature
* OTP

---

# 👤 User Model

The user model stores:

* Full name
* Email
* Password
* Socket ID

The socket ID is used for real-time communication.

The user model is located in:

```text
models/user.model.js
```

---

# 🚗 Captain Model

The captain model stores:

### Personal Information

* Full name
* Email
* Password

### Vehicle Information

* Vehicle color
* Vehicle plate number
* Vehicle capacity
* Vehicle type

### Real-Time Information

* Socket ID
* Captain status
* Captain location

The captain location is stored as a GeoJSON point.

The captain model uses a:

```text
2dsphere
```

index for geospatial queries.

---

# 📡 Socket.io

Socket functionality is managed through:

```text
socket.js
```

The Socket.io server handles connections from both users and captains.

---

## 🔌 Socket Connection

When a client connects, the backend generates a unique socket connection ID.

Example flow:

```text
Client
   │
   ▼
Socket Connection
   │
   ▼
Socket ID Generated
   │
   ▼
Saved in User/Captain Database
```

---

# 👤 Join Event

Users and captains send a socket event:

```text
join
```

The event includes:

* User ID
* User type

Example user types:

```text
user
captain
```

The backend saves the socket ID in the corresponding database document.

For users:

```text
user.socketId
```

For captains:

```text
captain.socketId
```

---

# 📍 Captain Location Updates

Captains can send their current location using the socket event:

```text
update-location-captain
```

The location contains:

* Latitude
* Longitude

The backend:

1. Validates the location
2. Updates the captain's database location
3. Checks for an active ride
4. Finds the connected user
5. Sends the captain's location to the user

---

# 📡 Captain Location Event

The user's application receives the captain's location through:

```text
captain-location
```

The location data includes:

* Latitude
* Longitude

This can be used by the frontend for live tracking.

---

# 🔔 Socket Events

The application uses the following important real-time events.

| Event                     | Description                                 |
| ------------------------- | ------------------------------------------- |
| `join`                    | Registers a user or captain socket          |
| `update-location-captain` | Updates captain location                    |
| `new-ride`                | Sends a new ride request to captains        |
| `ride-confirmed`          | Notifies the user about ride confirmation   |
| `ride-started`            | Notifies the user that the ride has started |
| `ride-ended`              | Notifies the user that the ride has ended   |
| `captain-location`        | Sends captain location to the user          |

---

# 🔄 Complete Ride Flow

The backend handles the following complete ride lifecycle:

```text
User Login
    │
    ▼
Enter Pickup Location
    │
    ▼
Enter Destination
    │
    ▼
Request Fare
    │
    ▼
Select Vehicle
    │
    ▼
Create Ride
    │
    ▼
Generate OTP
    │
    ▼
Save Ride
    │
    ▼
Find Nearby Captains
    │
    ▼
Send "new-ride" Event
    │
    ▼
Captain Accepts Ride
    │
    ▼
Send "ride-confirmed" Event
    │
    ▼
Verify OTP
    │
    ▼
Start Ride
    │
    ▼
Send "ride-started" Event
    │
    ▼
Captain Sends Live Location
    │
    ▼
User Receives "captain-location"
    │
    ▼
Complete Ride
    │
    ▼
Send "ride-ended" Event
```

---

# 🛣️ API Route Groups

The backend contains four main route groups.

---

## 👤 User Routes

Base route:

```text
/users
```

Main functionality:

```text
POST   /users/register
POST   /users/login
GET    /users/profile
GET    /users/logout
```

---

## 🚗 Captain Routes

Base route:

```text
/captains
```

Main functionality:

```text
POST   /captains/register
POST   /captains/login
GET    /captains/profile
GET    /captains/logout
```

---

## 🗺️ Map Routes

Base route:

```text
/maps
```

Main functionality includes:

```text
GET /maps/get-coordinates
GET /maps/get-distance-time
GET /maps/get-suggestions
```

These routes handle:

* Coordinates
* Distance
* Travel time
* Location suggestions

---

## 🚖 Ride Routes

Base route:

```text
/rides
```

Main functionality includes:

```text
POST /rides/create
GET  /rides/get-fare
POST /rides/confirm
POST /rides/start-ride
POST /rides/end-ride
```

These routes manage the ride lifecycle.

---

# 🔒 Route Protection

Some routes require authentication.

The application uses:

```text
authUser
```

for user-protected routes.

And:

```text
authCaptain
```

for captain-protected routes.

Authentication is performed before the controller receives the request.

---

# 📝 Request Validation

The backend uses:

```text
express-validator
```

to validate incoming requests.

Validation is used for fields such as:

* Email
* Password
* First name
* Vehicle information
* Vehicle type
* Pickup location
* Destination location
* Ride information

If validation fails, the backend returns an error response.

---

# ⚙️ Environment Variables

Create a `.env` file in the backend directory.

Example:

```env
PORT=4000

DB_CONNECT=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
```

### PORT

Defines the backend server port.

Example:

```env
PORT=4000
```

### DB_CONNECT

Contains the MongoDB connection string.

Example:

```env
DB_CONNECT=mongodb+srv://username:password@cluster.mongodb.net/database_name
```

### JWT_SECRET

Contains the secret key used to generate and verify JWT tokens.

Example:

```env
JWT_SECRET=your_secret_key
```

> Never upload your real `.env` file, database password, or secret keys to a public GitHub repository.

---

# 🚀 Installation

## 1. Clone the Repository

```bash
git clone <your-repository-url>
```

---

## 2. Navigate to the Backend Directory

```bash
cd backend
```

---

## 3. Install Dependencies

Install the required Node.js dependencies.

```bash
npm install
```

The project requires backend dependencies such as:

```text
express
mongoose
socket.io
jsonwebtoken
bcrypt
express-validator
cookie-parser
cors
dotenv
axios
```

---

## 4. Create Environment Variables

Create a `.env` file:

```env
PORT=4000

DB_CONNECT=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## 5. Start MongoDB Connection

Make sure your MongoDB database connection string is correctly configured in:

```text
DB_CONNECT
```

You can use:

* MongoDB Atlas
* A local MongoDB database

---

## 6. Start the Server

Run the backend server.

Example:

```bash
node server.js
```

If Nodemon is configured:

```bash
npm run dev
```

After the server starts successfully, you should see messages similar to:

```text
connected to db
Server is running on port 4000
```

---

# 🧪 Example API Flow

### User Registration

```text
POST
/users/register
```

The user provides:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "password123"
}
```

---

### User Login

```text
POST
/users/login
```

Example request:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

### Captain Registration

```text
POST
/captains/register
```

Example request:

```json
{
  "fullname": {
    "firstname": "Alex",
    "lastname": "Smith"
  },
  "email": "alex@example.com",
  "password": "password123",
  "vehicle": {
    "color": "White",
    "plate": "UK07AB1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

---

### Create Ride

```text
POST
/rides/create
```

Example request:

```json
{
  "pickup": "Dehradun",
  "destination": "Haridwar",
  "vehicleType": "car"
}
```

The backend:

* Finds coordinates
* Calculates the fare
* Generates an OTP
* Creates the ride
* Searches for nearby captains
* Sends a real-time ride request

---

# 📊 Database Collections

The application uses the following main MongoDB collections.

### Users

Stores:

* User information
* Authentication data
* Socket ID

---

### Captains

Stores:

* Captain information
* Vehicle details
* Socket ID
* Current location

---

### Rides

Stores:

* User
* Captain
* Pickup
* Destination
* Coordinates
* Fare
* OTP
* Ride status

---

### Blacklisted Tokens

Stores invalidated authentication tokens after logout.

---

# 🔮 Future Improvements

Possible future improvements include:

* Online payment integration
* Razorpay or Stripe integration
* Ride cancellation API
* Ride history
* User ride history
* Captain earnings dashboard
* Driver rating system
* User rating system
* Push notifications
* Estimated arrival time
* Better error handling
* Centralized logging
* API rate limiting
* Refresh tokens
* Role-based authorization
* Better CORS configuration
* Production-ready environment configuration
* Redis caching
* Advanced real-time ride tracking
* Route visualization
* Ride scheduling
* Emergency or SOS features
* Admin dashboard

---

# 🧑‍💻 Author

**Divyanshu**

---

# 📌 Note

This repository contains the **backend part of the Ride Booking Application**.

The backend works with a separate React frontend and provides:

* REST APIs
* Authentication
* Database management
* Ride management
* Location services
* Fare calculation
* Real-time communication
* Captain location tracking

The frontend and backend documentation can be combined into a single complete project README when both parts are ready.
