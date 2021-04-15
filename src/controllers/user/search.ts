//-----------------------------------------------------
// USER SEARCH WITH PAGINATION
// ----------------------------------------------------
import User from "../../models/user";

const search = async (req, res) => {
	let { key = "", page = 1, limit = 5 } = req.query;
	try {
		const response = await User.paginate({ firstname: { $regex: key } }, { page, limit });
		res.status(200).json({ response });
	} catch (error) {
		return error.message;
	}
};

export default search;
