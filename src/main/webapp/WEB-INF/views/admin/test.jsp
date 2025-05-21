<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
<head>
	<title>관리자 전용 페이지</title>
	<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
	<h1>이 페이지는 관리자만 접근할 수 있습니다.</h1>
	<p id="message">로딩 중...</p>

	<button id="logoutBtn">로그아웃</button>

	<script>
		$(document).ready(function () {
			// 관리자 이름 등 서버에서 받아오려면 여기에 fetch 추가 가능
			$("#message").text("관리자 페이지에 오신 것을 환영합니다.");

			$("#logoutBtn").click(function () {
				$.post("/admin/logout", function () {
					alert("로그아웃 되었습니다.");
					window.location.href = "/admin/login";
				});
			});
		});
	</script>
</body>
</html>
