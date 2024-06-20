import USER_MODEL from "../../models/user.js";

const searchUserName = async (req, res) => {
  const { usernameText } = req.params;
  try {
    // Construct a regex pattern to match names containing the provided text
    const regex = new RegExp(usernameText, "i"); // "i" flag for case-insensitive search

    // Search for users whose name partially matches the provided text
    const users = await USER_MODEL.find({ "name": { $regex: `${usernameText}`, $options: "i" }}, 'name profilepicture _id');

    if (!users || users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export default searchUserName;
