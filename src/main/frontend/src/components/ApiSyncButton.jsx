import React, { useState } from "react";

function ApiSyncButton({onResultUpdate}) {
	const [loading, setLoading] = useState(false);

	const handleSync = async () => {
		setLoading(true);
		onResultUpdate(null); // ⭐️ 버튼 클릭 시 부모의 결과 상태를 초기화
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
			onResultUpdate(`✅ ${data.message} (insert: ${data.inserted}, update: ${data.updated}, skip: ${data.skipped})`);
		} catch (err) {
			console.error(err);
			onResultUpdate("❌ 동기화 실패");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<button className="gray-button" onClick={handleSync} disabled={loading}>
				{loading ? "동기화 중..." : "API 동기화"}
			</button>
		</div>
	);
}

export default ApiSyncButton;
