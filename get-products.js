// api/get-products.js
export default async function handler(req, res) {
  // 1. 配置你的飞书信息（这些信息稍后在 Vercel 后台设置，更安全）
  const APP_ID = process.env.FEISHU_APP_ID;
  const APP_SECRET = process.env.FEISHU_APP_SECRET;
  const APP_TOKEN = "RjAGbIVhKaRI0usUsGnc9lwPnBg"; // 你提供的链接中的 Token
  const TABLE_ID = "tblXXXXXX"; // 需要你在多维表格左下角点击数据表名字查看 ID

  try {
    // 2. 获取飞书访问凭证 (Tenant Access Token)
    const authRes = await fetch("https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ app_id: APP_ID, app_secret: APP_SECRET })
    });
    const authData = await authRes.json();
    const token = authData.tenant_access_token;

    // 3. 读取多维表格中的记录
    const recordsRes = await fetch(`https://open.feishu.cn/open-apis/bitable/v1/apps/${APP_TOKEN}/tables/${TABLE_ID}/records`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const recordsData = await recordsRes.json();

    // 4. 返回数据给前端
    res.status(200).json(recordsData.data.items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Feishu data" });
  }
}
