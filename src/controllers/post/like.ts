//-----------------------------------------------------
// POST LIKE
// ----------------------------------------------------
import Post from "../../models/post";

const like = async (req, res) => {
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
        // increase upvote and push author id into likes 
		const response = await Post.updateOne( {_id: id} ,{ $inc: { upvote: 1 }, $push: { likes: author_id } })
		res.status(200).json({ response });
	} catch (error) {
		return error.message;
	}

};

export default like;