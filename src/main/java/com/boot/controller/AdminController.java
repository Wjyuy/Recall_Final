package com.boot.controller;

import com.boot.dto.AdminDTO;
import com.boot.security.JwtUtil;
import com.boot.service.AdminService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@Slf4j
@RequiredArgsConstructor
public class AdminController {

	private final AdminService adminService;

	@GetMapping("/admin/login")
	public String loginPage() {	
		log.info("@# /admin/login");
		return "admin/login";
	}

	@PostMapping("/admin/login")
	public ResponseEntity<?> login(@RequestParam String id, @RequestParam String password, HttpServletResponse response) {
		log.info("입력 ID: {}", id);
		log.info("입력 PW: {}", password);
		AdminDTO admin = adminService.getAdminById(id);
		log.info("DB Admin: {}", admin);

		if (admin != null && admin.getPassword().equals(password)) {
			String token = JwtUtil.generateToken(id);

			Cookie cookie = new Cookie("jwt_token", token);
			cookie.setHttpOnly(true);	// JS 접근 방지 → XSS 방지
			cookie.setSecure(true);		// HTTPS에서만 동작 (개발 중엔 false로 임시 테스트 가능)
			cookie.setPath("/");		// 전체 경로에서 쿠키 사용 가능
			cookie.setMaxAge(60 * 60);	// 1시간

			response.addCookie(cookie);

			// 쿠키로 처리하므로 토큰 자체는 body로 전달할 필요 없음
			return ResponseEntity.ok("로그인 성공");
		}

		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패");
	}

	
	@GetMapping("/admin/test")
	public String adminTestPage() {
		log.info("@# /admin/test");	
		return "admin/test";
	}
	

	@PostMapping("/admin/logout")
	public ResponseEntity<?> logout(HttpServletResponse response) {
		Cookie cookie = new Cookie("jwt_token", null);
		cookie.setHttpOnly(true);
		cookie.setSecure(true); // 실제 운영에서는 true, 개발 중엔 false로 테스트 가능
		cookie.setPath("/");
		cookie.setMaxAge(0); // 즉시 만료

		response.addCookie(cookie);
		return ResponseEntity.ok("로그아웃 완료");
	}

}
