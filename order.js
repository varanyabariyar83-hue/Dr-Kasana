export async function onRequestPost(context) {
  let body;
  try { body = await context.request.json(); }
  catch { return json({ success: false, error: "Invalid JSON." }, 400); }
  const { name, phone, concern, notes } = body;
  if (!name || String(name).trim().length < 2) return json({ success: false, error: '"name" is required.' }, 422);
  if (!phone || !/^\+?[\d\s\-]{7,15}$/.test(String(phone).trim())) return json({ success: false, error: '"phone" must be valid.' }, 422);
  const appt = { id: crypto.randomUUID(), timestamp: new Date().toISOString(), patient: { name: name.trim(), phone: String(phone).trim() }, concern: concern?.trim()||null, notes: notes?.trim()||null };
  const hook = context.env?.APPOINTMENT_WEBHOOK_URL;
  if (hook) {
    try {
      await fetch(hook, { method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ text: ["🌿 New Appointment — Dr. Kasana Acu Health Centre","─────────────────────────────────────────────",`ID:      ${appt.id}`,`Time:    ${appt.timestamp}`,`Patient: ${appt.patient.name}`,`Phone:   ${appt.patient.phone}`,...(appt.concern?[`Concern: ${appt.concern}`]:[]),...(appt.notes?[`Notes:   ${appt.notes}`]:[])].join("\n"), appointment: appt }) });
    } catch(e) { console.error(e.message); }
  }
  return json({ success:true, message:"Appointment request received! Dr. Kasana's centre will contact you shortly.", appointmentId:appt.id }, 201);
}
export async function onRequestOptions(){return new Response(null,{status:204,headers:cors()})}
function json(d,s=200){return new Response(JSON.stringify(d),{status:s,headers:{"Content-Type":"application/json",...cors()}})}
function cors(){return{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"POST,OPTIONS","Access-Control-Allow-Headers":"Content-Type"}}
