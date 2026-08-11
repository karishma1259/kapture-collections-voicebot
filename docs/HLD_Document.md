# High-Level Design (HLD)

# Kapture Collections Voice AI Agent

## 1. Project Overview

Kapture Collections Voice AI Agent is a voice-based collections assistant designed to handle repayment reminder conversations.

The AI assistant, named Maya, communicates with customers, verifies their identity, discusses overdue payment information only after successful verification, captures Promise-to-Pay commitments, sends payment links, records call dispositions, and escalates cases that require human intervention.

## 2. Objectives

- Automate repayment reminder conversations.
- Verify customer identity before disclosing debt information.
- Capture Promise-to-Pay commitments.
- Send payment links.
- Handle customer objections and special cases.
- Escalate disputes and financial hardship cases.
- Record the final outcome of every call.
- Support Do Not Call requests.

## 3. High-Level Architecture

Customer
   |
   v
Vapi Voice AI Assistant
       Maya
   |
   | Tool Calls
   v
Webhook / Express Mock API
   |
   +-------------------+-------------------+
   |                   |                   |
   v                   v                   v
Verification       Payment/PTP        Disposition
Tools              Tools              Tools
   |                   |                   |
   +-------------------+-------------------+
                       |
                       v
              Human Agent /
              Resolution Desk

## 4. Main Components

### Vapi Voice Assistant

Vapi manages the voice conversation, assistant persona, system prompt, customer responses, and backend tool calls.

The assistant persona is Maya.

### Mock Webhook Server

The backend is implemented using Node.js and Express.

Health endpoint:

GET /

Webhook endpoint:

POST /webhook

Local server:

http://localhost:3000

### Tool Layer

The system supports these tools:

- verify_customer
- log_promise_to_pay
- send_payment_link
- escalate_to_agent
- mark_disposition

## 5. Authentication Gate

Customer identity must be verified before debt information is disclosed.

Customer
   |
   v
Verification
   |
   +---- Failed ----> Do not disclose debt details
   |
   +---- Successful
              |
              v
       Continue conversation
              |
              v
       Disclose debt details

## 6. Happy Path

1. Greeting
2. Introduce purpose of call
3. Verify customer identity
4. Disclose overdue information after verification
5. Ask for payment commitment
6. Capture Promise-to-Pay
7. Send payment link
8. Confirm next steps
9. Mark PTP_AGREED
10. End call

## 7. Edge Cases

### Already Paid

Do not create a new Promise-to-Pay. Record ALREADY_PAID and conclude the call.

### Dispute

If the customer disputes or does not recognize the debt, do not argue. Escalate to a human or resolution desk.

### Financial Hardship

If the customer cannot pay due to hardship, do not promise an unauthorized waiver or settlement. Escalate to a human agent.

### Do Not Call

If the customer requests no further calls, record DO_NOT_CALL and end the call.

### Wrong Person

If the contacted person is not the intended customer, do not disclose debt information. Record WRONG_PERSON and end the call.

## 8. Security and Compliance

The system follows these principles:

- Customer verification before debt disclosure.
- No sensitive information to an unverified person.
- No unauthorized promises regarding discounts or waivers.
- Immediate handling of Do Not Call requests.
- Human escalation for disputes.
- Human escalation for financial hardship.
- Final disposition logging for auditability.

## 9. Error Handling

The webhook server handles unknown tool requests and server-side exceptions.

Unknown tools return a failure response.

Server-side exceptions return HTTP 500.

## 10. Local Deployment

Prerequisites:

- Node.js
- npm
- Git

Install dependencies:

cd mock-server
npm install

Start the server:

npm start

Expected:

Kapture Collections Mock Webhook Server running on port 3000

Health check:

curl http://localhost:3000/

Webhook test:

curl -X POST http://localhost:3000/webhook

## 11. Repository Structure

kapture-collections-voicebot/
|
+-- README.md
|
+-- docs/
|   +-- HLD_Document.md
|   +-- System_Architecture.png
|
+-- vapi/
|   +-- system_prompt.txt
|   +-- tool_definitions.json
|
+-- mock-server/
|   +-- .env.example
|   +-- package.json
|   +-- package-lock.json
|   +-- server.js
|
+-- tests/
    +-- test_cases.json

## 12. Future Deployment Flow

Customer
   |
   v
Vapi Voice Assistant
   |
   v
Public HTTPS Webhook
   |
   v
Hosted Node.js / Express Backend
   |
   +-- Verification
   +-- PTP
   +-- Payment Link
   +-- Escalation
   +-- Disposition

The webhook must be publicly reachable over HTTPS before connecting the production Vapi assistant.

## 13. Testing Strategy

The solution should be tested for:

- Successful customer verification.
- Failed customer verification.
- Promise-to-Pay capture.
- Payment-link delivery.
- Already Paid scenario.
- Dispute escalation.
- Financial hardship escalation.
- Do Not Call request.
- Wrong Person scenario.
- Final disposition logging.
- Unknown tool handling.
- Webhook error handling.

## 14. Conclusion

The architecture separates the voice conversation layer from the backend tool execution layer.

Vapi manages the conversational experience while the Express mock server demonstrates the backend actions required by the collections workflow.

The authentication gate, controlled tool usage, escalation paths, and final dispositions provide the foundation for a safe and auditable voice collections assistant.
