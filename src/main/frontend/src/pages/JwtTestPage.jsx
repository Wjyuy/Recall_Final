import React, { useEffect, useState } from "react";
import LogoutButton from "../components/LogoutButton";
import ApiSaveButton from "../components/ApiSaveButton";
import ApiSyncButton from "../components/ApiSyncButton";

function JwtTestPage() {
	const [message, setMessage] = useState("뭔가를 넣어 놨습니다. 화이팅.");
	const [error, setError] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("jwt_token");

		if (!token) {
			alert("로그인이 필요합니다.");
			window.location.href = "/login";
			return;
		}

		// fetch("http://localhost:8485/api/admin/test-auth", {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/test-auth`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json"
				}
			})
			.then(res => {
				if (res.status !== 200)
					throw new Error("인증 실패");
			})
			.catch(err => {
				console.error(err);
				setError("접근 권한이 없습니다.");
				// setTimeout(() => {
				// 	window.location.href = "/login";
				// }, 1500);
			});
	}, []);

	return (
		<section id="starter-section" className="starter-section section">
			<div className="container" data-aos="fade-up">
				<div className="section-title text-center">
					<h2 className="title">관리자 페이지</h2>
				</div>
				<div style={{ padding: "40px" }}>
					{error ? <p style={{ color: "red" }}>{error}</p> : <p>{message}</p>}

					<ApiSaveButton />
					<ApiSyncButton />
					<LogoutButton />

				</div>
			</div>
		</section>
	);
}

export default JwtTestPage;
