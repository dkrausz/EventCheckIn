import express, { json } from "express";
import { HandleErrors } from "./@shared/handleErros";
import { eventRouter } from "./routes/eventRoute";
import cors from "cors";

export const app = express();

app.use(json());
app.use(cors());
app.use("/auth", eventRouter);
app.use(HandleErrors.execute);
