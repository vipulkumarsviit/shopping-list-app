import { env } from "./configs/env";
import { createApp } from "./app";
import { connectDB } from "./configs/db";

const PORT = env.PORT;
const app = createApp();
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Shopping List API listening on http://localhost:${PORT}`);
  });
});
