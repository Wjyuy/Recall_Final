// components/ApiSaveButton.js
import React, { useState } from "react";

// ⭐️ onResultUpdate prop을 받도록 변경
function ApiSaveButton({ onResultUpdate }) {
    // result 상태는 더 이상 이 컴포넌트에서 필요 없습니다.
    // const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        // setResult(null); // 이제 부모의 상태를 업데이트할 것이므로 필요 없습니다.
        onResultUpdate(null); // ⭐️ 버튼 클릭 시 부모의 결과 상태를 초기화

        const token = localStorage.getItem("jwt_token");

        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/recall/save_all`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            // ⭐️ onResultUpdate 함수를 호출하여 부모 컴포넌트의 상태를 업데이트합니다.
            onResultUpdate(`✅ ${data.message} (저장: ${data.savedCount}건)`);
        } catch (err) {
            console.error(err);
            // ⭐️ onResultUpdate 함수를 호출하여 부모 컴포넌트의 상태를 업데이트합니다.
            onResultUpdate("❌ 저장 실패");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button className="gray-button" onClick={handleSave} disabled={loading}>
                {loading ? "저장 중..." : "API 저장"}
            </button>
            {/* ⭐️ 여기에서는 더 이상 result를 직접 렌더링하지 않습니다. */}
            {/* {result && <p>{result}</p>} */}
        </div>
    );
}

export default ApiSaveButton;