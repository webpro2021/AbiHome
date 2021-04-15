//-----------------------------------------------------
// POST CREATE
// ----------------------------------------------------
import User from "../..//models/user";
import Post from "../../models/post";

const create = async (req, res) => {
	let { title, content, author_id } = req.body;
	try {
		const response = await Post.create({ title, content, author_id, upvote: 0, downvote: 0 })
        const { _id: id } = response
        // Update posts field along with Post Created
        await User.updateOne({_id: author_id}, { $push: { posts:  id}})
		res.status(200).json({ response });
	} catch (error) {
		return error.message;
	}
};

export default create;