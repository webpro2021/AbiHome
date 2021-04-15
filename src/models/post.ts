//-----------------------------------------------------
// MODEL FOR POST
// ----------------------------------------------------
import { Schema, Document, PaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import connections from "../libs/connection";

export interface IPost extends Document {
	title: string,
	content: string,
	upvote: number,
	downvote: number,
	author_id: string,
	likes: string[],
	unlikes: string[]
}

const postSchema: Schema<any> = new Schema(
	{
		title: String,
		content: String,
		upvote: Number,
		downvote: Number,
		author_id: String,
		likes: [String],
		unlikes: [String]
	},
	{ collection: "posts" }
);
// add plugin pagination
interface PostModel<T extends Document> extends PaginateModel<T> {}

postSchema.plugin(mongoosePaginate);

const Post: PostModel<IPost> = connections.abiHomeConnection.model<IPost>(
	"posts",
	postSchema
) as PostModel<IPost>;

export default Post;
