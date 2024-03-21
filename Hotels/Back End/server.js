import express  from "express";
import authRoute from "./Router/AuthRout.js"
import dotenv from "dotenv"
import cors from "cors";
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import { login ,register} from "./Controller/auth.js";

const app = express()

dotenv.config();

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.post("/api/auth",authRoute)
app.post("/api/auth/register",register)
app.post("/api/auth/login",login)

  const DatabaseConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to mongoDB.");
    } catch  {
        console.log("Connection Error");
    }
};
  
  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB Disconnected!");
  });
  

app.get("/", (req, res)=>{
res.json({message:"Hello"})
})

const port = process.env.PORT || 5000;



app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(port, () => {
DatabaseConnection();
  console.log(`Server Listen on port ${port}`);
  console.log("Connected to backend.");
});