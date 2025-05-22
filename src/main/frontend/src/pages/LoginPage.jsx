import React from "react";
import LoginForm from "../components/LoginForm";

function LoginPage() {
	return (
		<section id="starter-section" className="starter-section section">
      <div className="container" data-aos="fade-up">
        <div className="section-title text-center">
            <h2 className="title">로그인 페이지</h2>
        </div>
		<div className="login-page">
			<LoginForm />
		</div>
		</div>
		</section>


	);
}

export default LoginPage;
