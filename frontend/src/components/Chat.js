import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from "@mui/icons-material/Chat";
import GroupIcon from "@mui/icons-material/Group";
import BusinessIcon from "@mui/icons-material/Business";
import { deepPurple, blueGrey } from "@mui/material/colors";

const socket = io("http://localhost:8000"); // Update with your backend URL

const Chat = ({ projectId, user, projectName }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
//     socket.emit("joinProject", projectId);

//     socket.on("receiveMessage", (data) => {
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [projectId]);
  if (!projectId) {
    console.error("❌ Error: projectId is missing in Chat.js!");
    return;
  }

  socket.emit("joinProject", projectId);
  console.log(`✅ Joining project room: ${projectId}`);

  socket.on("receiveMessage", (data) => {
    setMessages((prevMessages) => [...prevMessages, data]);
  });

  return () => {
    socket.off("receiveMessage");
  };
}, [projectId]);

  const sendMessage = () => {
//     if (message.trim()) {
//       const newMessage = { projectId, message, sender: user, timestamp: new Date().toLocaleTimeString() };
//       socket.emit("sendMessage", newMessage);
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//       setMessage("");
//     }
//   };
if (!projectId) {
    console.error("❌ Error: Cannot send message, projectId is missing!");
    return;
  }

  if (message.trim()) {
    const newMessage = { projectId, message, sender: user, timestamp: new Date().toLocaleTimeString() };
    socket.emit("sendMessage", newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");
  }
};

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: blueGrey[50] }}>
      
      {/* Sidebar */}
      <Box
        sx={{
          width: 280,
          backgroundColor: blueGrey[900],
          color: "white",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            <BusinessIcon sx={{ marginRight: 1 }} /> Project Chat
          </Typography>
          <Divider sx={{ backgroundColor: blueGrey[700], my: 2 }} />

          <Typography variant="subtitle1">
            <ChatIcon sx={{ marginRight: 1 }} /> {projectName}
          </Typography>

          <Typography variant="subtitle2" sx={{ mt: 1, color: blueGrey[300] }}>
            <GroupIcon sx={{ marginRight: 1 }} /> Team Members:
          </Typography>

          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: deepPurple[500] }}>A</Avatar>
              </ListItemAvatar>
              <ListItemText primary="Alice" />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: deepPurple[500] }}>B</Avatar>
              </ListItemAvatar>
              <ListItemText primary="Bob" />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: deepPurple[500] }}>C</Avatar>
              </ListItemAvatar>
              <ListItemText primary="Charlie" />
            </ListItem>
          </List>
        </Box>

        <Typography textAlign="center" sx={{ fontSize: "12px", color: blueGrey[400] }}>
          © 2025 Project Management Chat
        </Typography>
      </Box>

      {/* Chat Window */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        
        {/* Chat Header */}
        <Box
          sx={{
            backgroundColor: blueGrey[800],
            color: "white",
            padding: "10px 20px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          {projectName} <h4>Team Chat</h4>
        </Box>

        {/* Chat Messages */}
        <Paper
          elevation={3}
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            padding: 3,
            backgroundColor: blueGrey[100],
          }}
        >
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: msg.sender === user ? "row-reverse" : "row",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Avatar sx={{ bgcolor: msg.sender === user ? deepPurple[500] : blueGrey[500], mr: 1 }}>
                {msg.sender.charAt(0)}
              </Avatar>

              <Box
                sx={{
                  padding: 1,
                  borderRadius: "12px",
                  backgroundColor: msg.sender === user ? "#4CAF50" : "#1976D2",
                  color: "white",
                  maxWidth: "60%",
                  fontSize: "14px",
                  textAlign: "left",
                }}
              >
                <Typography variant="body2" fontWeight="bold">
                  {msg.sender}
                </Typography>
                <Typography variant="body1">{msg.message}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.7, display: "block", textAlign: "right" }}>
                  {msg.timestamp}
                </Typography>
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Paper>

        {/* Chat Input */}
        <Box sx={{ display: "flex", padding: 2, backgroundColor: blueGrey[200] }}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            sx={{ backgroundColor: "white", borderRadius: "8px" }}
          />
          <Button
            onClick={sendMessage}
            variant="contained"
            color="primary"
            sx={{ marginLeft: 1 }}
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
