import app from "~app";
import * as database from "~database";

const PORT = process.env.PORT || 3000;

//@ts-ignore
await database.connect();

export default { port: PORT, fetch: app.fetch };
