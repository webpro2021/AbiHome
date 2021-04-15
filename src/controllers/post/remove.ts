//-----------------------------------------------------
// POST REMOVE
// ----------------------------------------------------
import Post from "../../models/post";
import User from '../../models/user'

const remove = async (req, res) => {
	let {  id, author_id  } = req.body;
	try {
		const response = await Post.deleteOne( {_id: id} )
		// Update posts field along with Post Created
        await User.updateOne({_id: author_id}, { $pull: { posts:  id}})
		res.status(200).json({ response });
	} catch (error) {
		return error.message;
	}
};

export default remove;