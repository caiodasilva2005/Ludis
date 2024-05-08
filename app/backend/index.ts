import express from "express";
import userRouter from "./src/routes/users.routes.ts";
import cors from "cors";

const app = express();
const port = 3001;

const options: cors.CorsOptions = {
  origin: ["http://localhost:3000"],
  methods: "GET, POST, DELETE",
  allowedHeaders: [
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  ],
};

//so express can use json
app.use(express.json());

//cors settings
app.use(cors(options));

//routes
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Ludis listening at https://localhost:${port}`);
  console.log(`\n 
    █████       █████  █████ ██████████   █████  █████████ 
    ░░███       ░░███  ░░███ ░░███░░░░███ ░░███  ███░░░░░███
     ░███        ░███   ░███  ░███   ░░███ ░███ ░███    ░░░ 
     ░███        ░███   ░███  ░███    ░███ ░███ ░░█████████ 
     ░███        ░███   ░███  ░███    ░███ ░███  ░░░░░░░░███
     ░███      █ ░███   ░███  ░███    ███  ░███  ███    ░███
     ███████████ ░░████████   ██████████   █████░░█████████ 
    ░░░░░░░░░░░   ░░░░░░░░   ░░░░░░░░░░   ░░░░░  ░░░░░░░░░                             
    `);
});
