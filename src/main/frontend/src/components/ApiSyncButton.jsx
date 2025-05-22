import React, { useState } from "react";

function ApiSyncButton() {
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleSync = async () => {
		setLoading(true);
		setResult(null);
		const token = localStorage.getItem("jwt_token");

		try {
			const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/recall/sync_all`, {
				method: "GET",
				headers: {
					"Authorization": `Bearer ${token}`,
					"Content-Type": "application/json"
				}
			});
			const data = await res.json();
			setResult(`✅ ${data.message} (insert: ${data.inserted}, update: ${data.updated}, skip: ${data.skipped})`);
		} catch (err) {
			console.error(err);
			setResult("❌ 동기화 실패");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={{ marginBottom: "20px" }}>
			<button onClick={handleSync} disabled={loading}>
				{loading ? "동기화 중..." : "API 동기화"}
			</button>
			{result && <p>{result}</p>}
		</div>
	);
}

export default ApiSyncButton;
