//-----------------------------------------------------
// USER REMOVE
// ----------------------------------------------------
import User from "../../models/user";

const remove = async (req, res) => {
	let {  id  } = req.body;
	try {
		const response = await User.deleteOne( {_id: id} )
		res.status(200).json({ response });
	} catch (error) {
		return error.message;
	}
};

export default remove;