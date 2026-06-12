import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

/* =========================
   REGISTER USER
========================= */

export const registerUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      confirmPassword,
    } = req.body;

    // Validation
    if (
      !fullName?.trim() ||
      !email?.trim() ||
      !password?.trim() ||
      !confirmPassword?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Password Match Validation
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Password Length Validation
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters",
      });
    }

    // Normalize Email
    const normalizedEmail = email.toLowerCase();

    // Existing User Check
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Create User
    const user = await User.create({
      fullName: fullName.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    // Generate Token
    const token = generateToken(
      user._id,
      user.role
    );

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/* =========================
   LOGIN USER
========================= */

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    // Normalize Email
    const normalizedEmail = email.toLowerCase();

    // Find User
    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Generate JWT
    const token = generateToken(
      user._id,
      user.role
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};