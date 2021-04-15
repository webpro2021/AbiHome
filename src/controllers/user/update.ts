//-----------------------------------------------------
// USER UPDATE
// ----------------------------------------------------
import User from "../../models/user";
import bcrypt from "bcrypt";
const saltRounds = 12;

const update = async (req, res) => {
	let {  id, password: userPassword  } = req.body;

	try {
        bcrypt.genSalt(  saltRounds, (_error, salt) => {
           
            bcrypt.hash(userPassword, salt, async (error, hash) => {
                if (error) {
                    return res.status(500).json({
                        status: "error",
                        message: "error on hash",
                    });
                }
                const response = await User.updateOne( {_id: id} ,{ password: hash })
                return res.status(200).json({ response });
            })
        } )
        
    } catch (error) {
        return res.status(500)
    }

};

export default update;