import USER_MODEL from "../../models/user.js";

const checkValidProfile = async (req, res) => {
  try {
    const userId = req.body.userId;

    const user = await USER_MODEL.findOne({ _id:userId});

    if (!user) {
      return res.status(200).json(false);
    }
    res.status(200).json(true);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export default checkValidProfile;
