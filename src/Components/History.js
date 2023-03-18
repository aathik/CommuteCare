import { Button } from "@mui/material";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { getUserBookings, getUserHistory } from "../Routes/Login/AuthService";
import "./History.css";

const History = () => {
  const [bookings, setbookings] = useState([]);
  const [isCurrentBookings, setisCurrentBookings] = useState(true);

  const getBookingsData = async () => {
    try {
      await getUserBookings().then((response) => {
        setbookings(response.data);
      });
    } catch (error) {
      console.error("error", error);
    }
  };
  const getHistoryData = async () => {
    try {
      await getUserHistory().then((response) => {
        setbookings(response.data);
      });
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    console.log(isCurrentBookings);
    isCurrentBookings ? getBookingsData() : getHistoryData();
  }, [isCurrentBookings]);

  return (
    <div className="history">
      <div className="history-container">
        {bookings.map((booking, index) =>
          isCurrentBookings ? (
            <div className="booking-card" key={index}>
              <div className="booking-name">
                {`${booking.helper.firstname ?? "No first name"} ${
                  booking.helper.lastname ?? "No last name"
                }`}
              </div>
              <div>Day: {booking.day}</div>
              <div>Time: {moment(booking.starttime).utc().format("HH:mm")}</div>
              {booking.status === "pending" ? (
                booking.status
              ) : (
                <div className="card-buttons">
                  <Button>Chat</Button>
                  <Button>Cancel</Button>
                </div>
              )}
            </div>
          ) : (
            <div className="booking-card" key={index}>
              <div className="booking-name">
                {`${booking.helper.firstname ?? "No first name"} ${
                  booking.helper.lastname ?? "No last name"
                }`}
              </div>
              <div>Day: {booking.day}</div>
              <div>Time: {moment(booking.starttime).utc().format("HH:mm")}</div>
              {booking.status}
            </div>
          )
        )}
      </div>
      <div className="history-buttons">
        <Button onClick={() => setisCurrentBookings(true)}>Current</Button>
        <Button onClick={() => setisCurrentBookings(false)}>History</Button>
      </div>
    </div>
  );
};

export default History;
