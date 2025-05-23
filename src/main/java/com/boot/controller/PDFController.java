package com.boot.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired; // @Autowired 어노테이션 사용 [21, 24, 27, 28, 30]
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller; // @Controller 어노테이션 사용 [18-20]
import org.springframework.ui.Model; // Model 객체 사용 (뷰에 데이터 전달) [24, 34]
import org.springframework.web.bind.annotation.GetMapping; // @GetMapping 어노테이션 사용 [22, 24]
import org.springframework.web.bind.annotation.PostMapping; // @PostMapping 어노테이션 사용 [22, 24]
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam; // @RequestParam 어노테이션 사용 [24]
import org.springframework.web.bind.annotation.ResponseBody;

import com.boot.dto.ChatRequest;
import com.boot.dto.DefectReportSummaryDTO;
import com.boot.dto.ManufacturerRecallDTO;
import com.boot.service.GeminiService;
import com.boot.service.PdfGenerationService;
import com.boot.service.RecallService;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequestMapping("/api")
public class PDFController {
    
    @Autowired
    private PdfGenerationService pdfGenerationService;

	@Autowired
    private RecallService recallService;
	
	@Autowired
    private GeminiService geminiService; // 인터페이스 타입으로 주입
	
    @PostMapping("/generatePdfFromHtml")
    public void generatePdfFromHtml(@RequestParam("htmlContent") String htmlContent, HttpServletResponse response) throws IOException, InterruptedException {
    	log.info("generatePdfFromHtml");
    	log.info("htmlContent"+htmlContent);
        File pdfFile = pdfGenerationService.generatePdfFromHtml(htmlContent, "generated_from_html.pdf");
        sendFileToClient(pdfFile, response, "generated_from_html.pdf");
    }

    @GetMapping("/generatePdfFromUrl")
    public void generatePdfFromUrl(@RequestParam("url") String url, HttpServletResponse response) throws IOException, InterruptedException {
    	log.info("generatePdfFromUrl");
        File pdfFile = pdfGenerationService.generatePdfFromUrl(url, "generated_from_url.pdf");
        sendFileToClient(pdfFile, response, "generated_from_url.pdf");
    }
    

    private void sendFileToClient(File file, HttpServletResponse response, String fileName) throws IOException {
        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
        response.setContentLength((int) file.length());

        try (InputStream inputStream = new FileInputStream(file);
             java.io.OutputStream outputStream = response.getOutputStream()) {
            byte[] buffer = new byte[8192]; // 버퍼 크기 설정 (적절한 크기로 조정 가능)
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
            outputStream.flush();
        } finally {
            if (file.exists()) {
                file.delete(); // 임시 파일 삭제
            }
        }
    }
    
    @RequestMapping("/pdf/recall_statics_summaryList")
    public String recall_statics_pdf(
            @RequestParam(required = false) Integer startYear,
            @RequestParam(required = false) Integer endYear,
            Model model) {

        Map<String, Object> paramMap = new HashMap<>();
        if (startYear == null || startYear == 0) {
            startYear = 2000;
        }
        if (endYear == null || endYear == 0) {
            endYear = 2025;
        }
        paramMap.put("start_year", startYear);
        paramMap.put("end_year", endYear);
        
        //리콜현황
        DefectReportSummaryDTO summary = recallService.getDefectReportSummary(paramMap);
        model.addAttribute("summary", summary);
        List<DefectReportSummaryDTO> summaryList  = recallService.getDefectReportSummaryByYear(paramMap);
        model.addAttribute("summaryList", summaryList);

        String predefinedQuestion = "이 자료들은 연도별 리콜현황에 관한 자료인데, domesticmodelcount는 국산 차종, importedmodelcount는 수입 차종이야. <br><br> 국산과 수입에 의거한 리콜 위험 점수 내용,<br> 주요 리콜 국산과 수입에 의거한 현황 내용,<br> 자동차 리콜의 중요성을 작성해줘. 각 항목은 <p> 태그로 감싸서 출력해줘.```html``` 로는 감쌀 필요 없어" // 미리 지정할 질문
         + summaryList;
        // Gemini API를 호출하여 predefinedQuestion에 대한 답변 얻기
        String geminiAnswer = geminiService.askGemini(predefinedQuestion); 
        model.addAttribute("answer", geminiAnswer);
    
		return "pdf/recall_statics_summaryList";
	}
    
    @RequestMapping("/pdf/recall_statics_manafacturer")
    public String recall_statics_manafacturer(
    		@RequestParam(required = false) Integer startYear,
    		@RequestParam(required = false) Integer endYear,
    		Model model) {
    	
    	Map<String, Object> paramMap = new HashMap<>();
    	if (startYear == null || startYear == 0) {
    		startYear = 2000;
    	}
    	if (endYear == null || endYear == 0) {
    		endYear = 2025;
    	}
    	paramMap.put("start_year", startYear);
    	paramMap.put("end_year", endYear);
    	
        List<ManufacturerRecallDTO> stats = recallService.getYearlyRecallStats(startYear, endYear);
        model.addAttribute("recallStats", stats);
    	
        Map<String, List<ManufacturerRecallDTO>> grouped = stats.stream()
        	    .collect(Collectors.groupingBy(ManufacturerRecallDTO::getCar_manufacturer));

        	model.addAttribute("groupedRecallStats", grouped);
    	
    	
    	String predefinedQuestion = "이 자료들은 연도별 리콜현황 제조사별에 관한 자료인데, car_manufacturer는 제조사야. <br><br> 제조사별 리콜 위험 점수 내용,<br> 제조사별 주요 리콜 현황 내용,<br> 자동차 리콜의 중요성을 작성해줘. 각 항목은 <p> 태그로 감싸서 출력해줘.```html``` 로는 감쌀 필요 없어" // 미리 지정할 질문
    			+ grouped;
    	
    	String geminiAnswer = geminiService.askGemini(predefinedQuestion);
    	model.addAttribute("answer", geminiAnswer);
    	
    	return "pdf/recall_statics_manafacturer";
    }
    
    @GetMapping("/pdf/recall_statics_month_manafacturer")
    public String recall_statics_month_manafacturer(
        @RequestParam(required = false) Integer startYear,
        @RequestParam(required = false) Integer endYear,
        @RequestParam(required = false) Integer startMonth,
        @RequestParam(required = false) Integer endMonth,
        Model model) {
		
		log.info("recall_statics_month_manafacturer");
        Map<String, Object> params = new HashMap<>();
        params.put("start_year", startYear);
        params.put("start_month", startMonth);
        params.put("end_year", endYear);
        params.put("end_month", endMonth);

//        List<DefectReportSummaryDTO> monthsummaryList = recallService.getDefectReportSummaryByMonth(params);
//        model.addAttribute("monthsummaryList", monthsummaryList);
        List<ManufacturerRecallDTO> stats = recallService.getYearlyRecallStatsByMonth(params);
        model.addAttribute("recallStats", stats);
        Map<String, List<ManufacturerRecallDTO>> grouped = stats.stream()
        	    .collect(Collectors.groupingBy(ManufacturerRecallDTO::getCar_manufacturer));

        	model.addAttribute("groupedRecallStats", grouped);
        	String predefinedQuestion = "이 자료들은 월,연도별 리콜현황 제조사별에 관한 자료인데, car_manufacturer는 제조사야. <br><br> 제조사별 리콜 위험 점수 내용,<br> 제조사별 주요 리콜 현황 내용,<br> 자동차 리콜의 중요성을 작성해줘. 각 항목은 <p> 태그로 감싸서 출력해줘.```html``` 로는 감쌀 필요 없어" // 미리 지정할 질문
        			+ grouped;
        	
        	String geminiAnswer = geminiService.askGemini(predefinedQuestion);
        	model.addAttribute("answer", geminiAnswer);
        	
        return "pdf/recall_statics_month_manafacturer"; 
    }
    @GetMapping("/pdf/recall_statics_month_summaryList")
    public String recall_statics_month_summaryList(
    		@RequestParam(required = false) Integer startYear,
    		@RequestParam(required = false) Integer endYear,
    		@RequestParam(required = false) Integer startMonth,
    		@RequestParam(required = false) Integer endMonth,
    		Model model) {
    	
    	log.info("recall_statics_month_summaryList");
    	Map<String, Object> params = new HashMap<>();
    	params.put("start_year", startYear);
    	params.put("start_month", startMonth);
    	params.put("end_year", endYear);
    	params.put("end_month", endMonth);
    	
        List<DefectReportSummaryDTO> monthsummaryList = recallService.getDefectReportSummaryByMonth(params);
        model.addAttribute("monthsummaryList", monthsummaryList);
    	String predefinedQuestion = "이 자료들은 연도별 리콜현황에 관한 자료인데, domesticmodelcount는 국산 차종, importedmodelcount는 수입 차종이야. <br><br> 국산과 수입에 의거한 리콜 위험 점수 내용,<br> 주요 리콜 국산과 수입에 의거한 현황 내용,<br> 자동차 리콜의 중요성을 작성해줘. 각 항목은 <p> 태그로 감싸서 출력해줘.```html``` 로는 감쌀 필요 없어" // 미리 지정할 질문
    			+ monthsummaryList;
    	
    	String geminiAnswer = geminiService.askGemini(predefinedQuestion);
    	model.addAttribute("answer", geminiAnswer);
    	
    	return "pdf/recall_statics_month_summaryList"; 
    }
    
    @PostMapping("/askchatbot")
    public ResponseEntity<String> askChatbot(@RequestBody ChatRequest request) {
        // ⭐️ 사용자 질문에 프롬프트(페르소나) 추가
        String userQuestion = request.getQuestion();
        String predefinedPrompt = "당신은 자동차 결함 및 리콜 전문가 챗봇입니다. " +
                                  "사용자의 질문에 대해 **오직 자동차 결함 및 리콜과 관련된 내용만** 답변해야 합니다. " +
                                  "관련 없는 질문에는 '저는 자동차 결함 및 리콜에 대해서만 답변할 수 있습니다.'라고 답해주세요. " +
                                  "하지만 고마워,감사합니다 등의 인사가 포함되었을때는 '도움이 되어서 다행입니다! 추가 질문 있으시면 부담없이 물어보세요 😊'라고 답해주세요." +
                                  "질문: ";
        
        String fullQuestion = predefinedPrompt + userQuestion;
        
        System.out.println("Gemini에 보낼 전체 질문: " + fullQuestion); // 디버깅 용도

        String geminiAnswer = geminiService.askGemini(fullQuestion);
        return ResponseEntity.ok(geminiAnswer);
    }

}
