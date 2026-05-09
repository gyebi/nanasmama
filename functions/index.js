const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const { Resend } = require("resend");

const RESEND_API_KEY = defineSecret("RESEND_API_KEY");

const BUSINESS_EMAIL = "nanasmamashea@gmail.com";
const FROM_EMAIL = "NanasMama Website <onboarding@resend.dev>";

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

exports.sendNanasMamaEmail = onRequest(
  {
    secrets: [RESEND_API_KEY],
    cors: true,
    invoker: "public",
  },
  async (req, res) => {
    try {
      if (req.method !== "POST") {
        return res.status(405).json({
          success: false,
          error: "Method not allowed. Use POST.",
        });
      }

      const {
        name,
        phone,
        email,
        requestType,
        occasion,
        budget,
        message,
        orderReference,
      } = req.body || {};

      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          error: "Name, email, and message are required.",
        });
      }

      const resend = new Resend(RESEND_API_KEY.value());
      const safeName = escapeHtml(name);
      const safeEmail = escapeHtml(email);
      const safePhone = escapeHtml(phone || "Not provided");
      const safeRequestType = escapeHtml(requestType || "Not provided");
      const safeOccasion = escapeHtml(occasion || "Not provided");
      const safeBudget = escapeHtml(budget || "Not provided");
      const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
      const safeOrderReference = escapeHtml(orderReference || "Not provided");

      const subject = `New NanasMama Inquiry: ${
        requestType || "Website Contact"
      }${orderReference ? ` (${orderReference})` : ""}`;

      const html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
          <h2>New NanasMama Website Inquiry</h2>

          <p style="padding: 12px 14px; background: #fff4df; border: 1px solid #e3c790; border-radius: 8px;">
            <strong>Order Reference:</strong> ${safeOrderReference}
          </p>

          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Phone:</strong> ${safePhone}</p>
          <p><strong>Request Type:</strong> ${safeRequestType}</p>
          <p><strong>Occasion:</strong> ${safeOccasion}</p>
          <p><strong>Budget:</strong> ${safeBudget}</p>

          <hr />

          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>

          <hr />

          <p style="font-size: 13px; color: #666;">
            This message was sent from the NanasMama website contact form.
          </p>
        </div>
      `;

      const { data, error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: [BUSINESS_EMAIL],
        subject,
        html,
      });

      if (error) {
        console.error("Resend error:", error);

        return res.status(500).json({
          success: false,
          error: "Unable to send your message right now. Please try again or email Nanasmamashea@gmail.com directly.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Email sent successfully.",
        id: data?.id,
      });
    } catch (error) {
      console.error("Function error:", error);

      return res.status(500).json({
        success: false,
        error: "Something went wrong while sending the email.",
      });
    }
  }
);
