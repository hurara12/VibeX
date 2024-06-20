import jwt from "jsonwebtoken";
import USER_MODEL from "../../models/user.js";

const getAllUsers = async (req, res) => {
  try {

    const users = await USER_MODEL.find({}, 'name profilepicture _id');

    if (!users) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export default getAllUsers;
