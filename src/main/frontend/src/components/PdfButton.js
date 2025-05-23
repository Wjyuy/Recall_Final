import React from 'react';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const PdfDownloadButton = ({ pdfBaseUrl, startYear, endYear, startMonth, endMonth }) => {
  const handleDownload = () => {
    const params = [];
    if (startYear) params.push(`startYear=${startYear}`);
    if (endYear) params.push(`endYear=${endYear}`);
    if (startMonth) params.push(`startMonth=${startMonth}`);
    if (endMonth) params.push(`endMonth=${endMonth}`);
    
    // 최종 PDF를 생성할 API URL (예: http://localhost:8485/pdf/recall_statics_summaryList)
    const dataUrl = `${pdfBaseUrl}?${params.join('&')}`;

    // PDF 생성을 요청할 서버 엔드포인트 (실제 PDF 파일을 내려주는 역할)
    // 이 URL은 서버에서 `dataUrl`을 받아서 PDF로 변환 후 응답해야 합니다.
    const generatePdfEndpoint = 'http://localhost:8485/api/generatePdfFromUrl'; 

    // 동적으로 form 생성하여 PDF 다운로드 트리거
    const form = document.createElement('form');
    form.method = 'GET';
    form.action = generatePdfEndpoint;
    form.target = '_self'; // 현재 창에서 다운로드 (새 창을 원하면 '_blank'로 변경)

    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'url';
    input.value = dataUrl;
    form.appendChild(input);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form); // form 제출 후 제거
  };

  return (
    <button
      className="gray-button-round pdf-download-button"
      style={{ marginBottom: 24 }}
      onClick={handleDownload}
      data-tooltip="pdf를 다운받으시면, 자료에 대한 gemini의 summarize도 포함됩니다!"
    >
      PDF 다운로드
    </button>
  );
};

export default PdfDownloadButton;