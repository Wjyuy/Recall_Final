import React from "react";
import LoginForm from "../components/LoginForm";

function LoginPage() {
	const token = localStorage.getItem("jwt_token");

	return (
		<section id="starter-section" className="starter-section section">
			<div className="container" data-aos="fade-up">
				<div className="section-title text-center">
					<h2 className="title">로그인 페이지</h2>
					<h3 className="title">관리자 로그인</h3>
				</div>
				<div className="widgets-container detail-widgets-container">
					{	token ? (
						<p style={{ fontSize: "1.2rem" }}>
							이미 로그인된 상태입니다.<br />
							관리자 페이지로 이동해주세요.
						</p>
					) : (
						<LoginForm />
					)}
				</div>
			</div>
		</section>
	);
}

export default LoginPage;
