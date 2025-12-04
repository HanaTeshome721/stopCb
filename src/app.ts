import router from "./routes/userr";
import express from 'express';

const app= express()
app.use(express.json())
app.use('/api',router)

export default app;