//-----------------------------------------------------
// MODEL FOR USER
// ----------------------------------------------------
import { Schema, Document, PaginateModel } from "mongoose";
import connections from "../libs/connection";
import mongoosePaginate from "mongoose-paginate-v2";

export interface IUser extends Document {
	firstname: string,
	lastname: string,
	email: string,
	password: string,
	posts: string[]
}

const userSchema: Schema<IUser> = new Schema({
	firstname: { type: String },
	lastname: { type: String },
	email: { type: String, unique: true, lowercase: true, required: true },
	password: { type: String, required: true },
	posts: [String]
});

interface UserModel<T extends Document> extends PaginateModel<T> {}

userSchema.plugin(mongoosePaginate);


const User: UserModel<IUser> = connections.abiHomeConnection.model<IUser>(
	"user",
	userSchema
) as UserModel<IUser>;

export default User;


