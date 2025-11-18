import User from "./User.js";
import Ride from "./Ride.js";
import Booking from "./Booking.js";


User.hasMany(Ride, { foreignKey: "driverId" });
Ride.belongsTo(User, { foreignKey: "driverId" });


User.hasMany(Booking, { foreignKey: "userId", onDelete: "CASCADE" });
Booking.belongsTo(User, { foreignKey: "userId" });


Ride.hasMany(Booking, { foreignKey: "rideId", onDelete: "CASCADE" });
Booking.belongsTo(Ride, { foreignKey: "rideId" });

export { User, Ride, Booking };
