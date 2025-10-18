export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { phoneNumber, messagingServiceSid } = req.body || {};

  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !token) return res.status(500).json({ ok:false, error:"Missing Twilio creds" });

  // 1) Purchase number
  const buy = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/IncomingPhoneNumbers.json`, {
    method: "POST",
    headers: {
      "Content-Type":"application/x-www-form-urlencoded",
      Authorization: "Basic " + Buffer.from(`${sid}:${token}`).toString("base64")
    },
    body: new URLSearchParams({
      PhoneNumber: phoneNumber,
      SmsUrl: process.env.TWILIO_SMS_WEBHOOK_URL || "",
      VoiceUrl: process.env.TWILIO_VOICE_WEBHOOK_URL || ""
    })
  });
  if (!buy.ok) return res.status(400).json({ ok:false, error:"Purchase failed" });
  const bought = await buy.json();

  // 2) Optionally attach to a Messaging Service
  if (messagingServiceSid) {
    await fetch(`https://messaging.twilio.com/v1/Services/${messagingServiceSid}/PhoneNumbers`, {
      method:"POST",
      headers: {
        "Content-Type":"application/x-www-form-urlencoded",
        Authorization: "Basic " + Buffer.from(`${sid}:${token}`).toString("base64")
      },
      body: new URLSearchParams({ PhoneNumberSid: bought.sid })
    });
  }

  return res.status(200).json({ ok:true, sid: bought.sid, phone: bought.phone_number });
}
