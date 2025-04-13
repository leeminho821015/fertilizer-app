import { useState } from "react"
import { Card, CardContent } from "./components/ui/card"
import { Input } from "./components/ui/input"
import { Button } from "./components/ui/button"
import { Textarea } from "./components/ui/textarea"

export default function FertilizerAdvisor() {
  const [ec, setEc] = useState("")
  const [moisture, setMoisture] = useState("")
  const [status, setStatus] = useState("")
  const [result, setResult] = useState({ fert: "", foliar: "", warn: "" })

  const handleCalculate = () => {
    let fert = []
    let foliar = []
    let warn = []

    const ecVal = parseFloat(ec)
    const moistureVal = parseFloat(moisture)

    if (!isNaN(ecVal)) {
      if (ecVal < 1.0) fert.push("비료 증량 (EC+0.3)")
      else if (ecVal > 1.8) {
        fert.push("비료 중단")
        foliar.push("맹물 관주 100L")
        warn.push("EC 과다")
      }
    } else warn.push("EC 입력 필요")

    if (!isNaN(moistureVal)) {
      if (moistureVal < 50) fert.push("관수량 +30L")
      else if (moistureVal > 75) warn.push("수분 과다, 배수 확인")
    } else warn.push("수분 입력 필요")

    if (status.includes("잎 연함")) fert.push("요소 10g 추가")
    else if (status.includes("꼭지썩음")) {
      fert.push("질산칼슘 20g 추가")
      foliar.push("칼슘 엽면 시비")
    } else if (status.includes("꽃떨이")) {
      foliar.push("붕소 + 칼슘 엽면 병행")
    }

    setResult({
      fert: fert.join(", "),
      foliar: foliar.join(", "),
      warn: warn.join(", ")
    })
  }

  return (
    <div style={{ maxWidth: "480px", margin: "20px auto", padding: "20px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>고추 비료 자동 보정 앱</h2>
      <Input placeholder="EC 측정값 (예: 1.4)" value={ec} onChange={(e) => setEc(e.target.value)} />
      <Input placeholder="토양 수분율 (예: 60)" value={moisture} onChange={(e) => setMoisture(e.target.value)} />
      <Textarea placeholder="작물 상태 (예: 정상, 잎 연함, 꼭지썩음, 꽃떨이 등)" value={status} onChange={(e) => setStatus(e.target.value)} />
      <Button onClick={handleCalculate}>자동 계산</Button>

      <Card>
        <CardContent>
          <p><strong>📦 비료 조정:</strong> {result.fert || "-"}</p>
          <p><strong>💧 맹물/엽면 보정:</strong> {result.foliar || "-"}</p>
          <p><strong>⚠️ 주의사항:</strong> {result.warn || "-"}</p>
        </CardContent>
      </Card>
    </div>
  )
}
