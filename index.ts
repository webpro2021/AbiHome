import http from "http";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./src/routes/user";
import postRouter from "./src/routes/post";

const app: express.Express = express();

//-----------------------------------------------------
// ENVIRONEMENT VARIABLE
// ----------------------------------------------------
const corsOptions = {
	origin: ["http://localhost:3000"],
	methods: ["GET", "POST", "DELETE", "PATCH", "UPDATE"],
	credentials: true, // enable set cookie
};

dotenv.config({ path: __dirname + "/.env" });

//-----------------------------------------------------
// MIDDLEWARES
// ----------------------------------------------------
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.disable("x-powered-by");

//-----------------------------------------------------
// CHECK IF SESSION EXIST
// ----------------------------------------------------
app.use((req, res, next: any) => {
	if (!req.headers) {
		return next(new Error("oh no"));
	}
	next();
});

//-----------------------------------------------------
// ROUTES
// ----------------------------------------------------

app.get("/", function (req, res) {
	res.send(JSON.stringify({ Hello: "World" }));
});

//-----------------------------------------------------
// ENDPOINTS
// ----------------------------------------------------
const apiBeta = "/api/beta";
app.use(`${apiBeta}/user`, userRouter);
app.use(`${apiBeta}/post`, postRouter);

//-----------------------------------------------------
// SERVER NODE EXPRESS CONNECTION
// ----------------------------------------------------
const httpServer = http.createServer(app);
httpServer.listen(process.env.PORT || process.env.PORT_SERVER_NODE, () => {
	console.log(`Success -> connection Server node on port: ${process.env.PORT_SERVER_NODE}`);
});
