//-----------------------------------------------------
// USER LOGIN
// ----------------------------------------------------
import User from "../../models/user";
import bcrypt from "bcrypt";
import JWToken from "../../libs/JWToken";
const  login = async (req, res) => {
    const user: any = await User.findOne({ email: req.body.email }, () => {}).lean();

    if (!user) {
        return res.status(500).json({
            status: "error",
            message: "you are not registerd user",
        });
    }
    // password compare
    bcrypt.compare(req.body.password, user.password, (error, result) => {
        if (error) {
            return res.status(500).json({
                status: "error",
                message: error,
            });
        }

        if (!result) {
            return res.status(500).json({
                status: "error",
                message: "password is incorrect",
            });
        }

        const { password, ...rest } = user;
        // generate token
        const token = JWToken.create(rest);
        // save token to cookie also
        res.cookie("authToken", token, { maxAge: 259200000 * 30, httpOnly: true });
        console.log(token);
        return res.status(200).json({ token });
    });

    
}

export default login