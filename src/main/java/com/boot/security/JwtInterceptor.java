package com.boot.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;

import com.boot.controller.ReactAdminController;

import lombok.extern.log4j.Log4j2;
@Log4j2
public class JwtInterceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		
		// ✅ OPTIONS 요청은 통과
		if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
			return true;
		}
		
		String authHeader = request.getHeader("Authorization");

		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			String token = authHeader.substring(7); // "Bearer " 이후만 잘라냄
			String adminId = JwtUtil.validateToken(token);
			
			if (adminId != null) {
				request.setAttribute("adminId", adminId);
				
				log.info("Authorization 헤더: {}", authHeader);
				return true;
			}
		}

		// 인증 실패 → 401 반환
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		return false;
	}
}
