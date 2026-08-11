const express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Kapture Collections Mock Webhook Server is running"
  });
});

// Vapi webhook
app.post("/webhook", (req, res) => {
  try {
    const { message } = req.body;

    console.log("\n========== VAPI WEBHOOK ==========");
    console.log("Request:", JSON.stringify(req.body, null, 2));

    // Handle Vapi tool calls
    if (message && message.type === "tool-calls") {
      const toolCalls = message.toolCalls || [];

      const results = toolCalls.map((toolCall) => {
        const toolName = toolCall.function.name;
        const args = toolCall.function.arguments || {};
        const callId = toolCall.id;

        console.log("Tool:", toolName);
        console.log("Arguments:", args);

        let result;

        switch (toolName) {

          // 1. Verify customer
          case "verify_customer":
            if (
              args.verification_code === "1234" ||
              args.verification_code === "1995"
            ) {
              result = {
                verified: true,
                message: "Identity verified successfully."
              };
            } else {
              result = {
                verified: false,
                message: "Verification failed. Incorrect code."
              };
            }
            break;

          // 2. Log Promise To Pay
          case "log_promise_to_pay":
            result = {
              success: true,
              ptp_id: `PTP-${Math.floor(1000 + Math.random() * 9000)}`,
              confirmed_date: args.ptp_date,
              amount: args.amount,
              message: "Promise to Pay recorded successfully."
            };
            break;

          // 3. Send payment link
          case "send_payment_link":
            result = {
              success: true,
              link_sent: true,
              channel: args.channel,
              message: `Payment link sent successfully via ${args.channel}.`
            };
            break;

          // 4. Escalate to human agent
          case "escalate_to_agent":
            result = {
              success: true,
              escalated: true,
              reason: args.reason,
              message: "Customer has been escalated to a human agent."
            };
            break;

          // 5. Mark final call disposition
          case "mark_disposition":
            result = {
              success: true,
              disposition_logged: args.status,
              notes: args.notes || "",
              timestamp: new Date().toISOString()
            };
            break;

          // Unknown tool
          default:
            result = {
              success: false,
              message: `Unknown tool: ${toolName}`
            };
        }

        return {
          toolCallId: callId,
          result: JSON.stringify(result)
        };
      });

      console.log("Response:", JSON.stringify(results, null, 2));
      console.log("=================================\n");

      return res.status(200).json({
        results
      });
    }

    // Other Vapi events
    return res.status(200).json({
      status: "acknowledged"
    });

  } catch (error) {
    console.error("Webhook error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `Kapture Collections Mock Webhook Server running on port ${PORT}`
  );
});
