export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  const { studentNumber, studentConcern } = req.body;

  if (!studentNumber || !studentConcern) {
    return res.status(400).json({ success: false, error: "필수 값이 누락되었습니다." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ success: false, error: "GEMINI_API_KEY 환경 변수가 설정되지 않았습니다." });
  }

  const prompt = `
당신은 학생의 학교생활 자기 성찰을 돕고 따뜻한 조언을 해주는 "AI 학생 학교생활 자기 성찰 도우미"입니다.
학생 번호: ${studentNumber}번
학생의 고민 및 자기 성찰 내용: ${studentConcern}

[요구사항]
다음 원칙을 준수하여 짧고 따뜻하게 응답해주세요 (3~4문장 내외).
1. 학생의 마음을 먼저 공감하고 위로해주세요.
2. 학생 스스로 해결책을 찾을 수 있도록 긍정적인 방향을 제시해주세요.
3. 너무 길고 장황한 설명이나 부담을 주는 조언은 피해주세요.
4. "선생님께도 편하게 말씀드려보세요"와 같이 도움을 청할 수 있는 방법도 살짝 언급해주세요.
`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ success: false, error: `Gemini API 호출 실패: ${errorText}` });
    }

    const data = await response.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || "응답을 생성하지 못했습니다.";

    return res.status(200).json({ success: true, result: resultText });
  } catch (error) {
    return res.status(500).json({ success: false, error: `서버 오류: ${error.message}` });
  }
}
