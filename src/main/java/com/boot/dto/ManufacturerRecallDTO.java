package com.boot.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ManufacturerRecallDTO {
	private String reportYear;
	private String report_month;
//	private LocalDate reportDate; 
    private String car_manufacturer;
    private int recallCount;
}
