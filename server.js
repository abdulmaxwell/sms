import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Africastalking from "africastalking";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(express.static(".")); // serve index.html from same folder

// Africa's Talking setup
const africastalking = Africastalking({
    apiKey: process.env.AT_API_KEY,
    username: process.env.AT_USERNAME
});
const sms = africastalking.SMS;

app.post("/send-sms", async (req, res) => {
    const { phone, message } = req.body;
    try {
        const response = await sms.send({ to: phone, message, from: process.env.AT_SENDER_ID || "" });
        res.json({ success: true, response });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
