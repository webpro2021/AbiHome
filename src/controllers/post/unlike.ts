//-----------------------------------------------------
// POST UNLIKE
// ----------------------------------------------------
import Post from "../../models/post";

const unlike = async (req, res) => {
	let {  id, author_id   } = req.body;
	try {
        // detect duplicated user
        const post = await Post.findOne({ _id: id })
        if (post?.unlikes.includes(author_id) ) {
            res.status(200).json({message: "you already unliked this post"})
        }
        if (post?.likes.includes(author_id) ) {
            res.status(200).json({message: "you already liked this post"})
        }
        // icrease downvote, push author id into unlikes
		const response = await Post.updateOne( {_id: id} ,{ $inc: { downvote: 1 }, $push: { unlikes: author_id } })
		res.status(200).json({ response });
	} catch (error) {
		return error.message;
	}

};

export default unlike;