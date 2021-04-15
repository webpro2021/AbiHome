//-----------------------------------------------------
// POST INDEX
// ----------------------------------------------------
import search from "./search";
import create from './create'
import update from './update'
import remove from './remove'
import like from './like'
import unlike from './unlike'
const PostController = {
	search,
	create,
	update,
	like,
	unlike,
	remove,
};

export default PostController;
