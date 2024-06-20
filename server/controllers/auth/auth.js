import JWT from "jsonwebtoken";
import {OAuth2Client} from "google-auth-library";
import USER_MODEL from "../../models/user.js";

const AuthController = async (req, res) => {
    try{
        console.log("Helloo from Qazi")
        const GoogleToken=req.body.token;
        const GoogleClient=new OAuth2Client();

        const Ticket=await GoogleClient.verifyIdToken({
            idToken:GoogleToken,
            audience:process.env.GOOGLE_CLIENT_ID
        });
        
        const GooglePayload=Ticket.getPayload();
        if(GooglePayload?.hd==="cfd.nu.edu.pk")
        {
        const user = await USER_MODEL.findOne({ email_id: GooglePayload.email});
        const emailParts = GooglePayload.email.split('@')[0]; // Splitting email at '@' and taking the first part
        if(!user){
            const Rollnum = emailParts; // Extracting "0328" from "f200328"
            const Batch = "20"+emailParts[1] + emailParts[2]; // Extracting "20" from "f2
            let UserData={
                email_id: GooglePayload.email,
                name: GooglePayload.name,
                batch: Batch,
                profilepicture: GooglePayload.picture,
                subscribe: false,
                rollnum: Rollnum,
                usertype: 'student',
            };
            const addedUser=await USER_MODEL.create(UserData);
            addedUser?console.log("User Added To USER_MODEL Database"):
            res.status(500).json({ error: "An error occurred" });
        }

        const NewUserToken=JWT.sign({email:GooglePayload.email},process.env.JWT_SECRET);
        res.status(200).json({token:NewUserToken});
    }
    else
    {
        res.status(500).json({message:"Register With CFD Account"});
    }
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }

}

export default AuthController;
