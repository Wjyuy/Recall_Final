import React, { useState } from "react";

function ApiSaveButton() {
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleSave = async () => {
		setLoading(true);
		setResult(null);
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
			setResult(`✅ ${data.message} (저장: ${data.savedCount}건)`);
		} catch (err) {
			console.error(err);
			setResult("❌ 저장 실패");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div >
			<button className="gray-button" onClick={handleSave} disabled={loading}>
				{loading ? "저장 중..." : "API 저장"}
			</button>
			{result && <p>{result}</p>}
		</div>
	);
}

export default ApiSaveButton;
