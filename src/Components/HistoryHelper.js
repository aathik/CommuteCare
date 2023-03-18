import { Button } from "@mui/material";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import {
  acceptBooking,
  getHelperConfirmedBookings,
  getHelperPendings,
  getUserBookings,
  getUserHistory,
  rejectBooking,
} from "../Routes/Login/AuthService";
import "./History.css";

const HistoryHelper = () => {
  const [bookings, setbookings] = useState([]);
  const [isPendingBookings, setisPendingBookings] = useState(true);
  const [isrefresh, setisrefresh] = useState(false);

  const getPendingBookings = async () => {
    try {
      await getHelperPendings().then((response) => {
        setbookings(response.data);
      });
    } catch (error) {
      console.error("error", error);
    }
  };
  const getConfirmedBookings = async () => {
    try {
      await getHelperConfirmedBookings().then((response) => {
        setbookings(response.data);
      });
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleAccept = async (id) => {
    try {
      await acceptBooking(id).then((response) => {
        // setbookings(response.data);
        console.log(response);
        setisrefresh(!isrefresh);
      });
    } catch (error) {
      console.error("error", error);
    }
  };
  const handleReject = async (id) => {
    try {
      await rejectBooking(id).then((response) => {
        // setbookings(response.data);
        console.log(response);
        setisrefresh(!isrefresh);
      });
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    isPendingBookings ? getPendingBookings() : getConfirmedBookings();
  }, [isPendingBookings, isrefresh]);

  return (
    <div className="history">
      <div className="history-container">
        {bookings.map((booking, index) =>
          isPendingBookings ? (
            <div className="booking-card" key={index}>
              <div className="booking-name">
                {`${booking.helper.firstname ?? "No first name"} ${
                  booking.helper.lastname ?? "No last name"
                }`}
              </div>
              <div>Day: {booking.day}</div>
              <div>Time: {moment(booking.starttime).utc().format("HH:mm")}</div>
              <div className="card-buttons">
                <Button onClick={() => handleAccept(booking._id)}>
                  Accept
                </Button>
                <Button onClick={() => handleReject(booking._id)}>
                  Reject
                </Button>
              </div>
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
              <div className="card-buttons">
                <Button>Chat</Button>
              </div>
            </div>
          )
        )}
      </div>
      <div className="history-buttons">
        <Button onClick={() => setisPendingBookings(true)}>Pending</Button>
        <Button onClick={() => setisPendingBookings(false)}>Confirmed</Button>
      </div>
    </div>
  );
};

export default HistoryHelper;
