const sendEmail = require("../../../helpers/sendEmail");

import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { connectToDatabase } from "helpers/connectDb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { body } = req;
    body.verifyId = uuidv4();
    body.date = new dayjs(Date()).format("MMMM D, YYYY");

    try {
      const collection = await connectToDatabase(
        process.env.MONGO_DB,
        "contact-list"
      );

      // Check if the email already exists
      const check = await collection.findOne({ email: body.email });

      if (check) {
        // Email already exists, return an error response
        return res
          .status(400)
          .json({ success: false, message: "Email already exists" });
      }

      // Email doesn't exist, insert the data into the collection

      const emailSent = await sendEmail({
        to: body.email,
        templateId: process.env.EMAIL_TEMPLATE_ID,
      });

      if (!emailSent) {
        body.status = "failed";
      }

      if (emailSent) {
        body.status = "success";
      }
      // Get the result of the insertion operation
      const newUser = collection.insertOne(body);

      const result = await newUser;

      // Send a success response with the result data
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "This endpoint supports only POST method.",
    });
  }
}
