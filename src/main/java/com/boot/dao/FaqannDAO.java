package com.boot.dao;

import java.util.ArrayList;
import java.util.HashMap;

import com.boot.dto.AnnounceDTO;
import com.boot.dto.Criteria;
import com.boot.dto.FaqsDTO;

public interface FaqannDAO {
	public ArrayList<AnnounceDTO> announcelistWithPaging(Criteria cri);
	public int announcegetTotalCount(Criteria cri);
	public void announce_write_ok(AnnounceDTO announceDTO);
	public AnnounceDTO announce_view(Long param);
	
	public void notice_write_ok(FaqsDTO faqsDTO);
	public ArrayList<FaqsDTO> noticelistWithPaging(Criteria cri);
	public int noticegetTotalCount(Criteria cri);
//	public void modify(HashMap<String, String> param);
//	public void delete(HashMap<String, String> param);
	
}















