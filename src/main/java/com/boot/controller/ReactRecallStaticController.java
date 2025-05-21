package com.boot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.boot.dto.DefectReportSummaryDTO;
import com.boot.dto.ManufacturerRecallDTO;
import com.boot.service.RecallService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/api")
@RestController
public class ReactRecallStaticController {
	@Autowired
    private RecallService recallService;
	
	@RequestMapping(value = "/recall_statics_year", method = {RequestMethod.GET, RequestMethod.POST})
	public Map<String, Object> recall_statics_year( 
			@RequestParam(required = false) Integer startYear,
		    @RequestParam(required = false) Integer endYear,
		    Model model,
		    HttpSession session) {
		
		log.info("@#recall_statics_year");
		Map<String, Object> paramMap = new HashMap<>();
		if (startYear == null || startYear == 0) {
			startYear=2000;
		}
		if (endYear == null || endYear == 0) {
			endYear=2025;
		}
		paramMap.put("start_year", startYear);
        paramMap.put("end_year", endYear);
        //리콜현황
        DefectReportSummaryDTO summary = recallService.getDefectReportSummary(paramMap);
        List<DefectReportSummaryDTO> summaryList  = recallService.getDefectReportSummaryByYear(paramMap);
        List<ManufacturerRecallDTO> stats = recallService.getYearlyRecallStats(startYear, endYear);
        Map<String, List<ManufacturerRecallDTO>> grouped = stats.stream()
        	    .collect(Collectors.groupingBy(ManufacturerRecallDTO::getCar_manufacturer));
        // JSON 응답용 Map 생성
        Map<String, Object> result = new HashMap<>();
        result.put("summary", summary);
        result.put("summaryList", summaryList);
        result.put("recallStats", stats);
        result.put("groupedRecallStats", grouped.entrySet().stream()
            .map(e -> Map.of("key", e.getKey(), "value", e.getValue()))
            .collect(Collectors.toList()));
        return result;
	}
	
	@GetMapping("/recall_statics_month")
    public String recall_statics_month(
        @RequestParam(required = false) Integer startYear,
        @RequestParam(required = false) Integer endYear,
        @RequestParam(required = false) Integer startMonth,
        @RequestParam(required = false) Integer endMonth,
        Model model) {
		
		log.info("recall_statics_month");
        Map<String, Object> params = new HashMap<>();
        params.put("start_year", startYear);
        params.put("start_month", startMonth);
        params.put("end_year", endYear);
        params.put("end_month", endMonth);

        List<DefectReportSummaryDTO> monthsummaryList = recallService.getDefectReportSummaryByMonth(params);
//        log.info("monthsummaryList"+monthsummaryList);
        model.addAttribute("monthsummaryList", monthsummaryList);
//        log.info("monthsummaryList: {}", monthsummaryList);
        List<ManufacturerRecallDTO> stats = recallService.getYearlyRecallStatsByMonth(params);
        model.addAttribute("recallStats", stats);
        Map<String, List<ManufacturerRecallDTO>> grouped = stats.stream()
        	    .collect(Collectors.groupingBy(ManufacturerRecallDTO::getCar_manufacturer));

        	model.addAttribute("groupedRecallStats", grouped);
        
        return "recall_statics_month"; 
    }
	

}
