//-----------------------------------------------------
// POST SEARCH WITH PAGINATION
// ----------------------------------------------------
import Post from "../../models/post";

const search = async (req, res) => {
	let { key = "", page = 1, limit = 5 } = req.query;
	try {
		// Search post with pagination
		const response = await Post.paginate({ title: { $regex: key } }, { page, limit });
		res.status(200).json({ response });
	} catch (error) {
		return error.message;
	}
};

export default search;
