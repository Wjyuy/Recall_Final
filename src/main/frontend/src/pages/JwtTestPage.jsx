import React, { useEffect, useState } from "react";
import LogoutButton from "../components/LogoutButton";
import ApiSaveButton from "../components/ApiSaveButton";
import ApiSyncButton from "../components/ApiSyncButton";

function JwtTestPage() {
	const [adminName, setUserName] = useState('관리자');
	const [message, setMessage] = useState(`KH 리콜정보 관리자 시스템에 오신 것을 환영합니다. ${adminName} 님`);
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
				<div className="widgets-container detail-widgets-container">
				<div style={{ justifyContent: 'center',display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
					{error ? <p style={{ color: "red" }}>{error}</p> : <p>{message}</p>}

					<ApiSaveButton />
					<ApiSyncButton />
					<LogoutButton />
					</div>
				</div>
			</div>
		</section>
	);
}

export default JwtTestPage;