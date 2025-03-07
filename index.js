require("dotenv").config();
const express = require("express");
const connect = require("./dp/connect");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const doctorRouter = require("./routes/doctorRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/doctors", doctorRouter);

const main = async () => {
  try {
    await connect(process.env.MONGO_URL);
    app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

main();
