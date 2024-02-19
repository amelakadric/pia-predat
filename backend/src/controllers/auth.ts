import * as express from "express";

import User from "../models/User";
import { error, log } from "console";
import { HttpError } from "../errors/httpError";
import path from "path";
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

interface MulterRequest extends Request {
  files: any;
  body: any;
}

export class AuthController {
  upload = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const profFile = req.files;

    if (
      typeof profFile === "object" &&
      profFile !== null &&
      "profilePicture" in profFile
    ) {
      const picFileName = profFile.profilePic[0].filename;
      const profilePicPath = "http://localhost:4000/uploads/" + picFileName;
      res.json(profilePicPath);
    } else {
      console.log(profFile);
    }
  };

  uploadCV = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const cv = req.files;

    if (typeof cv === "object" && cv !== null && "cv" in cv) {
      const cvName = cv.cv[0].filename;
      const cvPath = "http://localhost:4000/uploads/" + cvName;
      console.log(cvPath); // Output the path
      res.json(cvPath);
    } else {
      console.log(cv);
    }
  };

  signup = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const email = req.body.email;
      const username = req.body.username;
      const firstname = req.body.firstname;
      const lastname = req.body.lastname;

      const password = req.body.password;
      const type = req.body.type;
      const gender = req.body.gender;
      const adress = req.body.adress;
      const phoneNumber = req.body.phoneNumber;

      const safetyQuestion = req.body.safetyQuestion;
      const safetyAnswer = req.body.safetyAnswer;

      let profilePicture = req.body.profilePicture;

      const existingEmail = await User.findOne({ email: email });
      if (existingEmail) {
        const error = new HttpError("email already exists", 402);
        throw error;
      }

      const existingUsername = await User.findOne({ username: username });
      if (existingUsername) {
        const error = new HttpError("username already exists", 402);
        throw error;
      }

      if (!profilePicture) {
        profilePicture = "http://localhost:4000/uploads/defPic.png";
      }

      let hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        email: email,
        username: username,
        password: hashedPassword,
        firstname: firstname,
        lastname: lastname,
        type: type,
        profilePicture: profilePicture,
        gender: gender,
        adress: adress,
        phoneNumber: phoneNumber,
        safetyQuestion: safetyQuestion,
        safetyAnswer: safetyAnswer,
        isApproved: false,
      });

      if (type == "teacher") {
        // user.cv = req.files["cv"][0];
        user.cv = req.body.cv;
        user.subjects = req.body.subjects;
        user.ageWishes = req.body.ageWishes;
        user.heardAboutSite = req.body.heardAboutSite;
      } else if (type == "student") {
        const schoolType = req.body.schoolType;
        const year = req.body.year;

        if (schoolType == "highschool") {
          if (year < 9 || year > 12) {
            const error = new Error("Wrong year for high school");
            throw error;
          }
        }
        if (schoolType == "elementaryschool") {
          if (year > 8) {
            const error = new Error("Wrong year for elementary school");
            throw error;
          }
        }
        user.schoolType = schoolType;
        user.year = year;
      }
      let result = await user.save();
      return res.status(201).json(user);
    } catch (err) {
      console.log(err);
      console.log("Error with validating signup parameters.");
      next(err);
    }
  };

  login = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const username = req.body.username;
      const password = req.body.password;

      const user = await User.findOne({ username: username });
      if (!user) {
        const error = new HttpError("No user with this username");
        throw error;
      }
      const isEqual = await bcrypt.compare(password, user.password);

      if (!isEqual) {
        const error = new HttpError("Bad credentials", 404);
        throw error;
      }
      // if (!user.isApproved && user.type == "teacher") {
      //   const error = new HttpError("User is not approved by admin", 400);
      //   throw error;
      // }
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };
}
