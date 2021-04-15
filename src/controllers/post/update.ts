//-----------------------------------------------------
// POST UPDATE
// ----------------------------------------------------
import Post from "../../models/post";

const update = async (req, res) => {
	let {  id, title, content   } = req.body;
	try {
		const response = await Post.updateOne( {_id: id} ,{ title, content  })
		res.status(200).json({ response });
	} catch (error) {
		return error.message;
	}
};

export default update;