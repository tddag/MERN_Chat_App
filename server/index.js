const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/users");
const conversationRouter = require("./routes/conversations");
const messageRouter = require("./routes/messages")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false}));

// database
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, {
    dbName: 'mernChatApp'
})
mongoose.connection.on('connected', () => console.log("Database connected"))

app.use("/api/users", userRouter);
app.use("/api/conversation", conversationRouter)
app.use("/api/messages", messageRouter)

const PORT = 8000;
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));