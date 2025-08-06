import User from "../models/userModel.js";

// GET /users/profile
const getProfile = async (req, res) => {
  const user = req.user;
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

// PUT /users/profile
const updateProfile = async (req, res) => {
  const user = req.user;
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    const updatedUser = await user.save();
    res.json({
      message: 'Profile updated successfully',
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

//GET /users/doctors
const getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("-password"); // hide password
    res.json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Failed to fetch doctors" });
  }
};

//getPatients
const getPatients = async (req, res) => {
  try {
    const patients = await User.find({ role: "patient" }).select("-password"); // hide password
    res.json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Failed to fetch patients" });
  }
};

export { getProfile, updateProfile,getDoctors, getPatients };
