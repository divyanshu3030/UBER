const socketIo = require("socket.io");
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');
const rideModel = require('./models/ride.model');

let io;

function initializeSocket(server) {

    io = socketIo(server, {

        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }

    });

    io.on('connection', (socket) => {

        console.log(`client connected: ${socket.id}`);


        // =========================================
        // JOIN USER / CAPTAIN
        // =========================================

        socket.on('join', async (data) => {

            try {

                const { userId, userType } = data;

                console.log(
                    `👤 User ${userId} joined as ${userType}`
                );

                console.log(
                    `🔌 Socket ID: ${socket.id}`
                );


                if (userType === 'user') {

                    await userModel.findByIdAndUpdate(
                        userId,
                        {
                            socketId: socket.id
                        }
                    );

                }


                else if (userType === 'captain') {

                    await captainModel.findByIdAndUpdate(
                        userId,
                        {
                            socketId: socket.id
                        }
                    );

                }


                console.log(
                    `✅ ${userType} socket saved: ${socket.id}`
                );

            } catch (error) {

                console.error(
                    "❌ JOIN ERROR:",
                    error
                );

            }

        });


        // =========================================
        // CAPTAIN LOCATION
        // =========================================

        socket.on('update-location-captain', async (data) => {

            try {

                const { userId, location } = data;


                console.log(
                    "📍 CAPTAIN LOCATION:",
                    location
                );


                if (
                    !location ||
                    location.ltd == null ||
                    location.lng == null
                ) {

                    return socket.emit('error', {
                        message: 'Invalid Location'
                    });

                }


                // -----------------------------------------
                // SAVE LOCATION IN DATABASE
                // -----------------------------------------

                const captain =
                    await captainModel.findByIdAndUpdate(

                        userId,

                        {
                            location: {
                                type: 'Point',

                                coordinates: [
                                    location.lng,
                                    location.ltd
                                ]
                            }
                        },

                        {
                            new: true
                        }

                    );


                if (!captain) {

                    console.log(
                        "❌ Captain not found"
                    );

                    return;

                }


                console.log(
                    "✅ CAPTAIN LOCATION SAVED"
                );


                // -----------------------------------------
                // FIND ACTIVE RIDE
                // -----------------------------------------

                const ride =
                    await rideModel
                        .findOne({

                            captain: userId,

                            status: {
                                $in: [
                                    'accepted',
                                    'ongoing'
                                ]
                            }

                        })
                        .populate('user');


                if (!ride) {

                    console.log(
                        "ℹ️ No active ride"
                    );

                    return;

                }


                // -----------------------------------------
                // CHECK USER SOCKET
                // -----------------------------------------

                if (
                    !ride.user ||
                    !ride.user.socketId
                ) {

                    console.log(
                        "❌ User socket not found"
                    );

                    return;

                }


                // -----------------------------------------
                // SEND CAPTAIN LOCATION TO USER
                // -----------------------------------------

                sendMessageToSocketId(

                    ride.user.socketId,

                    {

                        event: 'captain-location',

                        data: {

                            ltd: location.ltd,

                            lng: location.lng

                        }

                    }

                );


                console.log(
                    "📡 CAPTAIN LOCATION SENT TO USER"
                );


            } catch (error) {

                console.error(
                    "❌ UPDATE LOCATION ERROR:",
                    error
                );

            }

        });


        // =========================================
        // DISCONNECT
        // =========================================

        socket.on('disconnect', () => {

            console.log(
                `client disconnected: ${socket.id}`
            );

        });

    });

}


// =========================================
// SEND SOCKET MESSAGE
// =========================================

function sendMessageToSocketId(
    socketId,
    messageObject
) {

    console.log(
        "📡 Sending to socket:",
        socketId
    );

    console.log(
        "📡 Event:",
        messageObject.event
    );


    if (!io) {

        console.log(
            "❌ IO not initialized"
        );

        return;

    }


    const targetSocket =
        io.sockets.sockets.get(socketId);


    console.log(
        "🎯 Target socket connected:",
        !!targetSocket
    );


    if (!targetSocket) {

        console.log(
            "❌ Socket not found:",
            socketId
        );

        return;

    }


    targetSocket.emit(

        messageObject.event,

        messageObject.data

    );


    console.log(
        "✅ Event emitted successfully"
    );

}


module.exports = {
    initializeSocket,
    sendMessageToSocketId
};