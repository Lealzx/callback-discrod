import fetch from "node-fetch";

export default async function handler(req, res) {
  const code = req.query.code;
  if (!code) return res.status(400).send("Código de autorização não encontrado.");

  try {
    const CLIENT_ID = "1402800428936331364";
    const CLIENT_SECRET = "IU_QW9A1UbGPuNztkkZR4uFyLxX9w6_S";
    const REDIRECT_URI = "https://callback-discrod.vercel.app/api/callback";

    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI
      }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.access_token) {
      return res.redirect("/verificado.html");
    } else {
      return res.status(400).send("❌ Erro ao autenticar no Discord.");
    }
  } catch (err) {
    return res.status(500).send("❌ Erro interno: " + err.message);
  }
}
