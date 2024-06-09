const express = require("express");
const app = express();
const cors = require("cors");
const userRoute = require("./routes/users");

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false}));

app.use("/api/users", userRoute);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));