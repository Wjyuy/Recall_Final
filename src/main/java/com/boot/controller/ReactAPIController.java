package com.boot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boot.dto.Criteria;
import com.boot.dto.Defect_DetailsDTO;
import com.boot.dto.SyncDTO;
import com.boot.service.RecallService;
import com.boot.service.RecallServiceImpl.XmlParserUtil;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/recall")
public class ReactAPIController {

	@Autowired
	private RecallService recallService;

	// 1. API -> DB 100건 저장용 (테스트용)
	@GetMapping("/save")
	public ResponseEntity<Map<String, Object>> saveToDb() throws Exception {
		String cntntsId = "0301";
		Criteria cri = new Criteria(1, 100);
		String xml = recallService.fetchXmlFromApi(cri, cntntsId);
		List<Defect_DetailsDTO> list = XmlParserUtil.parseToList(xml);
		recallService.saveApiDataToDB(list);

		Map<String, Object> response = new HashMap<>();
		response.put("message", "DB 저장 완료");
		response.put("savedCount", list.size());

		return ResponseEntity.ok(response);
	}

	// 2. API -> DB 전체 저장용
	@GetMapping("/save_all")
	public ResponseEntity<Map<String, Object>> saveAllToDb() throws Exception {
		String cntntsId = "0301";
		int perPage = 100;

		Criteria cri = new Criteria(1, perPage);
		String firstXml = recallService.fetchXmlFromApi(cri, cntntsId);
		int total = XmlParserUtil.getTotalCount(firstXml);
		int totalPages = (int) Math.ceil((double) total / perPage);

		int savedCount = 0;

		for (int page = 1; page <= totalPages; page++) {
			Criteria pageCri = new Criteria(page, perPage);
			String xml = recallService.fetchXmlFromApi(pageCri, cntntsId);
			List<Defect_DetailsDTO> list = XmlParserUtil.parseToList(xml);
			recallService.saveApiDataToDB(list);
			savedCount += list.size();

			log.info(">>> {}페이지 처리 완료 ({}건)", page, list.size());
		}

		Map<String, Object> response = new HashMap<>();
		response.put("message", "전체 저장 완료");
		response.put("savedCount", savedCount);
		response.put("totalPages", totalPages);

		return ResponseEntity.ok(response);
	}

	// 3. 전체 동기화
	@GetMapping("/sync_all")
	public ResponseEntity<Map<String, Object>> syncAllToDb() throws Exception {
		String cntntsId = "0301";
		int perPage = 100;

		Criteria cri = new Criteria(1, perPage);
		String firstXml = recallService.fetchXmlFromApi(cri, cntntsId);
		int total = XmlParserUtil.getTotalCount(firstXml);
		int totalPages = (int) Math.ceil((double) total / perPage);

		int inserted = 0, updated = 0, skipped = 0;

		for (int page = 1; page <= totalPages; page++) {
			Criteria pageCri = new Criteria(page, perPage);
			String xml = recallService.fetchXmlFromApi(pageCri, cntntsId);
			List<Defect_DetailsDTO> list = XmlParserUtil.parseToList(xml);

			SyncDTO result = recallService.syncApiDataWithDB(list);

			inserted += result.getInserted();
			updated += result.getUpdated();
			skipped += result.getSkipped();

			log.info("{}페이지 완료: insert {}, update {}, skip {}", page, result.getInserted(), result.getUpdated(), result.getSkipped());
		}

		Map<String, Object> response = new HashMap<>();
		response.put("message", "전체 동기화 완료");
		response.put("inserted", inserted);
		response.put("updated", updated);
		response.put("skipped", skipped);

		return ResponseEntity.ok(response);
	}

}
