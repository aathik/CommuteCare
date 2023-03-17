import { Button, TextField } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import {
  addChatMessagesHelper,
  addChatMessagesUser,
  getChatMessages,
} from "../Routes/Login/AuthService";
import "./Chat.css";

const Chat = () => {
  const bottomRef = useRef(null);
  const [sendMessage, setsendMessage] = useState({
    sender: "user",
    message: "",
  });
  const [messageList, setmessageList] = useState([]);

  const getMessagesUser = async () => {
    try {
      await getChatMessages(
        localStorage.getItem("UserID"),
        "6412cc8d8aead6fe1ac74f23"
      ).then((response) => {
        setmessageList(response.data.messages);
      });
    } catch (error) {
      console.error("error", error);
    }
  };
  const getMessagesHelper = async () => {
    try {
      await getChatMessages(
        localStorage.getItem("HelperID"),
        "6413e1ad2f99d8f4ae0bfe31"
      ).then((response) => {
        setmessageList(response.data.messages);
      });
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    setInterval(
      () =>
        localStorage.getItem("UserType") === "Customer"
          ? getMessagesUser()
          : getMessagesHelper(),
      2000
    );
  }, []);

  const handleChatSendUser = async () => {
    setmessageList([...messageList, sendMessage]);
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    try {
      await addChatMessagesUser(
        localStorage.getItem("UserID"),
        "6412cc8d8aead6fe1ac74f23",
        sendMessage.message
      ).then((response) => {
        setmessageList([...messageList, sendMessage]);
        setsendMessage({ ...sendMessage, message: "" });
      });
    } catch (error) {
      console.error("error", error);
    }
  };
  const handleChatSendHelper = async () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    try {
      await addChatMessagesHelper(
        "6413e1ad2f99d8f4ae0bfe31",
        localStorage.getItem("HelperID"),
        sendMessage.message
      ).then((response) => {
        setmessageList([...messageList, sendMessage]);
        setsendMessage({ ...sendMessage, message: "" });
      });
    } catch (error) {
      console.error("error", error);
    }
  };
  console.log(messageList);
  return (
    <div className="chat">
      <div className="chat-logo">LOGO</div>
      <div className="chat-container">
        <div className="chat-header">
          <div className="sender-name">Name</div>
        </div>
        <div className="chat-window">
          <div className="chat-innerwindow">
            {localStorage.getItem("UserType") === "Customer"
              ? messageList.map((message) => (
                  <div className={`chat-${message.sender}`}>
                    {message.message}
                  </div>
                ))
              : messageList.map((message) => (
                  <div
                    className={`chat-${
                      message.sender === "helper" ? "user" : "helper"
                    }`}
                  >
                    {message.message}
                  </div>
                ))}
            <span
              style={{ height: "20px" }}
              className="chat-bottom-space"
              ref={bottomRef}
            />
            <span></span>
          </div>
        </div>
        <div className="footer">
          <Button>Report</Button>
          <TextField
            value={sendMessage.message}
            onChange={(e) =>
              setsendMessage({ ...sendMessage, message: e.target.value })
            }
          />
          <Button
            onClick={() =>
              localStorage.getItem("UserType") === "Customer"
                ? handleChatSendUser()
                : handleChatSendHelper()
            }
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
