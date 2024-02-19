import express, { NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string; // Define your custom field and its type
    }
  }
}

import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import lectureRoutes from "./routes/lecture";
import teacherRoutes from "./routes/teacher";

import cors from "cors";
import { subjects } from "./util/subjects";
import Subject from "./models/Subject";
import { FileFilterCallback } from "multer";
import path from "path";

const app = express();
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null, path.join(__dirname, "uploads")); // Destination folder for storing uploaded files
  },
  filename: function (req: Request, file: any, cb: any) {
    cb(null, Date.now() + "-" + file.originalname); // Custom filename
  },
});

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Image uploaded is not of type jpg/jpeg or png"));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 3000000 }, // 3MB limit
}).fields([
  { name: "profilePic", maxCount: 1 },
  { name: "cv", maxCount: 1 },
]);

app.use(upload);

app.use(express.json());
app.use((req: express.Request, res: express.Response, next: NextFunction) => {
  // Postman has issue with camelCase header names
  req.userId = (req.headers.userId || req.headers.userid) as string;
  next();
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/lectures", lectureRoutes);
app.use("/teachers", teacherRoutes);

app.get("/", (req, res) => res.send("Hello world!"));

app.use(
  (
    error: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log(error);
    // const status = error.statusCode || 500;
    const message = error.message;
    // const data = error.data;
    res.status(400).json({ message: message });
  }
);

const main = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://amela00108:qP3XXCCgnTkPyKZY@cluster0.iwqh3qq.mongodb.net/favoriteTeacherPlatform"
    );
    console.log("Connected to the database");
    app.listen(4000, () => {
      console.log("Listening on port 4000");
    });
  } catch (err) {
    console.log("Error connecting to the database");
    console.log(err);
  }
};

main();
