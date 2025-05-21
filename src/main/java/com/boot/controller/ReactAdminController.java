package com.boot.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boot.dto.AdminDTO;
import com.boot.security.JwtUtil;
import com.boot.service.AdminService;

import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/api/admin")
@Log4j2
public class ReactAdminController {

	@Autowired
	private AdminService adminService;

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
		String id = loginData.get("id");
		String password = loginData.get("password");
		log.info("입력 ID: {}", id);
		log.info("입력 PW: {}", password);
		
		AdminDTO admin = adminService.getAdminById(id);
		log.info("DB Admin: {}", admin);
		
		if (admin != null && admin.getPassword().equals(password)) {
			String token = JwtUtil.generateToken(id);

			Map<String, String> response = new HashMap<>();
			response.put("token", token);
			response.put("adminId", id);

			return ResponseEntity.ok(response);
		}

		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
	}
	
	@GetMapping("/test-auth")
	public ResponseEntity<String> testAuth(HttpServletRequest request) {
		String adminId = (String) request.getAttribute("adminId");
		
		log.info("Admin ID: {}", adminId);
		if (adminId != null) {
			return ResponseEntity.ok("인증된 관리자: " + adminId);
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("토큰이 유효하지 않거나 누락됨");
		}
	}

}
