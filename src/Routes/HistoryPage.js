import React from "react";
import History from "../Components/History";
import HistoryHelper from "../Components/HistoryHelper";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

/**
 * *History Page
 * *This route is used to display the booking history of both the user and the helper
 * 
 */

function HistoryPage() {
  return (
    <>
      <NavBar />
      {localStorage.getItem("UserType") === "Customer" ? (
        <History />
      ) : (
        <HistoryHelper />
      )}
      <Footer />
    </>
  );
}

export default HistoryPage;