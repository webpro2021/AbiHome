//-----------------------------------------------------
// USER REGISGTER
// ----------------------------------------------------
import User from "../../models/user";
import bcrypt from "bcrypt";
import JWToken from "../../libs/JWToken";
const saltRounds = 12;

const register = async (req, res) => {
	
	try {
		const email = req.body.email;
		const existingUser = await User.findOne({ email });
		// check duplicate user
		if (existingUser) {
			res.statusMessage = "Email already exist";
			return res.status(409).json({
				status: "error",
				message: "Email already exist",
			});
		}

		bcrypt.genSalt(saltRounds, (_error, salt) => {
			const { password: userPassword, ...userRest } = req.body;

			bcrypt.hash(userPassword, salt, async (error, hash) => {
				if (error) {
					return res.status(500).json({
						status: "error",
						message: "error on hash",
					});
				}

				console.log(userRest);
				const user: any = await User.create({
					password: hash,
					...userRest,
				});

				console.log( " register ",user)
				const {
					password,
					...rest
				} = user

				const token = JWToken.create(rest);

				res.cookie("authToken", token, { maxAge: 259200000 * 30, httpOnly: true });
				console.log(token);
				return res.status(200).json({ token });
			});
		});

	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: "error",
			message: "error on trying register",
		});
	}
};

export default register;
