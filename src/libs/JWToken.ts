//-----------------------------------------------------
// JWT MIDDLEWARE, CREATE, DECODE
// ----------------------------------------------------
import jwt from "jsonwebtoken";

const JWToken = {
	create: (data) => jwt.sign(data, process.env.SECRET_TOKEN, { expiresIn: "30d" }),
	decode: (token) => jwt?.verify(token, process.env.SECRET_TOKEN),
	middleware: async (req, res, next) => {
		//  uncomment below line to use cookie also
		const token =
			req?.headers?.authorization?.split(" ")?.[1] // ||  req?.headers?.cookie?.split("=")?.[1] 
			console.log(token, "ise token in middleware");
		try {
			if (token) {
				// verify
				await jwt.verify(token, process.env.SECRET_TOKEN, (err, decode) => {
					if (err) {
						console.log("hello error");
						req.userId = null;
						return res.sendStatus(403);
					}
					req.userId = decode._id;
					next();
				});
			} else {
				return res.sendStatus(401);
			}
		} catch (error) {
			res.status(401).json({
				status: "error",
				message: "Unauthorized Token",
			});
		}
	},
};

export default JWToken;
