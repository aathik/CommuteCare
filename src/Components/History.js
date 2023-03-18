import { Button } from "@mui/material";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  cancelBooking,
  getUserBookings,
  getUserHistory,
} from "../Routes/Login/AuthService";
import "./History.css";

const History = () => {
  const navigate = useNavigate();

  const [bookings, setbookings] = useState([]);
  const [isCurrentBookings, setisCurrentBookings] = useState(true);
  const [isrefresh, setisrefresh] = useState(false);

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

  const deleteData = async (id) => {
    try {
      await cancelBooking(id).then((response) => {
        // setbookings(response.data);
        setisrefresh(!isrefresh);
      });
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    console.log(isCurrentBookings);
    isCurrentBookings ? getBookingsData() : getHistoryData();
  }, [isCurrentBookings, isrefresh]);

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
                  <Button onClick={() => navigate("/chat")}>Chat</Button>
                  <Button onClick={() => deleteData(booking._id)}>
                    Cancel
                  </Button>
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