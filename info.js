export async function onRequestGet() {
  const info = {
    name: "Dr. Kasana Advance Naturopathy & Acu Health Centre",
    phone: "+91 99904 45265",
    whatsapp: "https://wa.me/919990445265",
    address: {
      full: "RC Plaza, 16, Opposite Assotech Society, Block C, Sakipur, Zeta I, Greater Noida, Delhi, Uttar Pradesh 201310",
      landmark: "Opposite Assotech Society, RC Plaza, Zeta I"
    },
    hours: { weekdays: "9:00 AM – 7:30 PM", note: "Open all 7 days" },
    therapies: ["Acupuncture","Electro-Acupuncture","Naturopathy","Moxibustion","Cupping","Auricular Therapy","Lifestyle & Nutrition","Hydrotherapy"]
  };
  return new Response(JSON.stringify(info,null,2),{status:200,headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","Cache-Control":"public,max-age=3600"}});
}
