import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/check-ip', async (req, res) => {
  try {
    const ip = req.query.ip;

    const response = await fetch(
      `https://api.abuseipdb.com/api/v2/check?ipAddress=${ip}&maxAgeInDays=90`,
      {
        headers: {
          Key: process.env.VITE_ABUSEIPDB_API_KEY,
          Accept: 'application/json',
        },
      }
    );

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Server error',
    });
  }
});

app.get('/api/threat-feed', async (req, res) => {
  try {
    const response = await fetch(
      'https://otx.alienvault.com/api/v1/pulses/subscribed',
      {
        headers: {
          'X-OTX-API-KEY': process.env.VITE_OTX_API_KEY,
        },
      }
    );

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Threat feed failed',
    });
  }
});

app.post('/api/scan-url', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        error: 'URL is required',
      });
    }

    const suspiciousKeywords = [
      'login',
      'verify',
      'secure',
      'bank',
      'crypto',
      'free',
      'gift',
      'bonus',
    ];

    const matchedKeywords = suspiciousKeywords.filter((keyword) =>
      url.toLowerCase().includes(keyword)
    );

    const riskScore = Math.min(matchedKeywords.length * 20, 100);

    const verdict =
      riskScore >= 60
        ? 'malicious'
        : riskScore >= 30
        ? 'suspicious'
        : 'safe';

    res.json({
      url,
      verdict,
      riskScore,
      matchedKeywords,
      scannedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Failed to scan URL',
    });
  }
});

app.listen(3001, () => {
  console.log('Backend running on http://localhost:3001');
});