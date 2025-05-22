package com.boot.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@CrossOrigin(origins = "http://localhost:3000")
public class ReactController {
	
	@GetMapping("/api/test")
    public String hello() {
        return "안녕하세요 백엔드입니다.";
    }
	
	@GetMapping("/test")
	@ResponseBody
	public String test() {
		return "안녕하세요 백엔드입니다.";
	}

}
