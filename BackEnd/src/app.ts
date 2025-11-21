import express, { json } from "express";
import { HandleErrors } from "./@shared/handleErros";
import { userRouter } from "./routes/eventRoute";
import cors from "cors";

export const app = express();

app.use(json());
app.use(cors());
app.use("/user", userRouter);
app.use(HandleErrors.execute);
