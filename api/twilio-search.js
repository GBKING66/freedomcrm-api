export default async function handler(req, res) {
  const { area = "214" } = req.query;
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !token) return res.status(500).json({ ok:false, error:"Missing Twilio creds" });

  const r = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${sid}/AvailablePhoneNumbers/US/Local.json?AreaCode=${encodeURIComponent(area)}&SmsEnabled=true&VoiceEnabled=true`,
    { headers: { Authorization: "Basic " + Buffer.from(`${sid}:${token}`).toString("base64") } }
  );
  const js = await r.json().catch(()=>({}));
  return res.status(200).json({ ok:true, numbers: js?.available_phone_numbers?.slice(0, 20) || [] });
}
