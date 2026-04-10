export default async function handler(req, res) {
  const APP_ID = process.env.FEISHU_APP_ID;
  const APP_SECRET = process.env.FEISHU_APP_SECRET;
  const APP_TOKEN = "RjAGbIVhKaRI0usUsGnc9lwPnBg"; 
  const TABLE_ID = "tbl38eCDwjhB6cyS"; 

  try {
    // 1. 获取飞书令牌
    const authRes = await fetch("https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ app_id: APP_ID, app_secret: APP_SECRET })
    });
    const authData = await authRes.json();
    const token = authData.tenant_access_token;

    // 2. 获取表格数据
    const recordsRes = await fetch(`https://open.feishu.cn/open-apis/bitable/v1/apps/${APP_TOKEN}/tables/${TABLE_ID}/records`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await recordsRes.json();

    // 3. 这里的 data.data.items 就是你的产品列表
    res.status(200).json(data.data.items || []);
  } catch (error) {
    res.status(500).json({ error: "Feishu Connection Error" });
  }
}
