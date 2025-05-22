import React, { useEffect, useState } from 'react';
import PdfDownloadButton from '../components/PdfButton.js';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_RANGE = Array.from({ length: 26 }, (_, i) => 2000 + i); // 2000~2025
const Month_RANGE = Array.from({ length: 12 }, (_, i) => 1 + i); // 1~12

const RecallStaticsYearPage = () => {
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [startMonth, setstartMonth] = useState('');
  const [endMonth, setendMonth] = useState('');

  // PDF를 생성할 데이터의 기본 URL
  const pdfDataApiBaseUrlS = `${API_BASE_URL}/pdf/recall_statics_month_summaryList`;
  const pdfDataApiBaseUrlM = `${API_BASE_URL}/pdf/recall_statics_month_manafacturer`;

  const [monthsummaryList, setMonthsummaryList] = useState([]);
  const [summaryList, setSummaryList] = useState([]);
  const [groupedRecallStats, setGroupedRecallStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 데이터 조회
  const fetchData = async (startYear, endYear, startMonth, endMonth) => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (startYear) params.startYear = startYear;
      if (endYear) params.endYear = endYear;
      if (startMonth) params.startMonth = startMonth;
      if (endMonth) params.endMonth = endMonth;

      const res = await axios.get(`${API_BASE_URL}/recall_statics_month`, { params });
      setMonthsummaryList(res.data.monthsummaryList || []);
      setSummaryList(res.data.summaryList || []);
      setGroupedRecallStats(res.data.groupedRecallStats || []);
    } catch (e) {
      setError('데이터를 불러오는 데 실패했습니다.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData('', '', '', '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(startYear, endYear, startMonth, endMonth);
  };

  return (
    <section id="starter-section" className="starter-section section" >
      <div className="container" data-aos="fade-up">
        <div className="section-title text-center">
          <h2 className="title">리콜 통계</h2>
        </div>
        <div className="widgets-container">

          <div className="text-center">
            <h2 className="title">연도별 리콜 통계 신고 현황</h2>
          </div>
          <form onSubmit={handleSubmit} className="year-form" style={{ marginBottom: 32 }}>
            <div className="inline-group">
              <label htmlFor="startYear">시작 연도</label>
              <select name="startYear" value={startYear} onChange={e => setStartYear(e.target.value)}>
                <option value="">-- 선택 --</option>
                {YEAR_RANGE.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div className="inline-group">
              <label htmlFor="endYear">종료 연도</label>
              <select name="endYear" value={endYear} onChange={e => setEndYear(e.target.value)}>
                <option value="">-- 선택 --</option>
                {YEAR_RANGE.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div className="inline-group">
              <label htmlFor="startMonth">시작 월</label>
              <select name="startMonth" value={startMonth} onChange={e => setstartMonth(e.target.value)}>
                <option value="">-- 선택 --</option>
                {Month_RANGE.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div className="inline-group">
              <label htmlFor="endMonth">종료 월</label>
              <select name="endMonth" value={endMonth} onChange={e => setendMonth(e.target.value)}>
                <option value="">-- 선택 --</option>
                {Month_RANGE.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <input type="submit" value="조회" className="btn-get-started" />
          </form>

          {loading && <div>로딩 중...</div>}
          {error && <div style={{ color: 'red' }}>{error}</div>}

          {/* JSP와 동일한 형태의 월별 통계 테이블 (monthsummaryList) */}
          {monthsummaryList && monthsummaryList.length > 0 && (
            <section style={{ marginBottom: 32 }}>
              <div className="text-center">
                <h2 className="title">월별 결함 신고 요약 통계
                  {startYear && endYear && startMonth && endMonth
                    ? `(${startYear}년 ${startMonth}월 ~ ${endYear}년 ${endMonth}월)`
                    : '(전체 월별 통계)'
                  }
                </h2>
              </div>
              <table className="table-summary">
                <thead>
                  <tr>
                    <th rowSpan={2}>해당 년도-월</th>
                    <th colSpan={2}>국산자동차</th>
                    <th colSpan={2}>수입자동차</th>
                    <th colSpan={2}>계</th>
                  </tr>
                  <tr>
                    <th>국산 차종</th>
                    <th>국산 대수</th>
                    <th>수입 차종</th>
                    <th>수입 대수</th>
                    <th>전체 차종</th>
                    <th>전체 대수</th>
                  </tr>
                </thead>
                <tbody>
                  {monthsummaryList.map((item, index) => (
                    <tr key={item.report_month || index}>
                      <td>{item.report_month}</td>
                      <td>{item.domesticModelCount}</td>
                      <td>{item.domesticCount}</td>
                      <td>{item.importedModelCount}</td>
                      <td>{item.importedCount}</td>
                      <td>{item.totalModelCount}</td>
                      <td>{item.totalCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              
              
            </section>
          )}

            <section>
              <button type="button" onClick={e => {
                const el = document.getElementById('content1');
                if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
                e.target.textContent = el.style.display === 'block' ? '자세히 보기 -' : '자세히 보기 +';
              }} className="btn-get-started" style={{ marginBottom: 16 }}>자세히 보기 +</button>
              <div id="content1" style={{ display: 'none' }}>

                <div className="text-center">
                  <h2 className="title">월별 리콜 차종</h2>
                </div>
                <div style={{ width: '100%', height: 320, background: '#fafbfc', borderRadius: 8, marginBottom: 32, padding: 16 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthsummaryList} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <XAxis dataKey="report_month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="domesticModelCount" name="국산 차종" fill="#80c1ba" />
                      <Bar dataKey="importedModelCount" name="수입 차종" fill="#b7dcd8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center">
                  <h2 className="title">월별 리콜 대수</h2>
                </div>
                <div style={{ width: '100%', height: 320, background: '#fafbfc', borderRadius: 8, marginBottom: 32, padding: 16 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthsummaryList} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <XAxis dataKey="report_month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="domesticCount" name="국산 대수" stroke="#80c1ba" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="importedCount" name="수입 대수" stroke="#b7dcd8" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                {/* PDF 다운로드 버튼 (월별 요약) */}
              <PdfDownloadButton
                pdfBaseUrl={pdfDataApiBaseUrlS}
                startYear={startYear}
                endYear={endYear}
                startMonth={startMonth}
                endMonth={endMonth}
              />
              </div>
            </section>
          

          {/* 제조사별 리콜 요약 통계 - 이 부분은 그대로 사용 */}
          <div className="text-center">
            <h2 className="title">제조사별 리콜 요약 통계</h2>
          </div>
          <table className="table-summary" style={{ marginBottom: 32 }}>
            <thead>
              <tr><th>제조사명</th><th>계</th></tr>
            </thead>
            <tbody>
              {groupedRecallStats.map(entry => (
                <tr key={entry.key} style={{ fontWeight: 'bold' }}>
                  <td>{entry.key}</td>
                  <td>{entry.value.reduce((sum, recall) => sum + recall.recallCount, 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 월별 리콜 현황 - 제조사별 (JSP 코드에 맞춤) */}
          <section>
            <button type="button" onClick={e => {
              const el = document.getElementById('content2');
              if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
              e.target.textContent = el.style.display === 'block' ? '자세히 보기 -' : '자세히 보기 +';
            }} className="btn-get-started" style={{ marginBottom: 16 }}>자세히 보기 +</button>

            <div id="content2" style={{ display: 'none' }}>
              <div className="text-center">
                <h2 className="title">월 별 리콜 현황 - 제조사별</h2> {/* 제목 변경 */}
              </div>
              <table id="makerDetailTable" className="table-summary">
                <thead>
                  <tr>
                    <th>해당 연도-월</th> {/* 헤더 변경 */}
                    <th>제조사명</th>
                    <th>계</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedRecallStats.map((entry, idx) => (
                    <React.Fragment key={entry.key}>
                      <tr
                        className="subtotal"
                        style={{ fontWeight: 'bold', cursor: 'pointer', background: '#f5f5f5' }}
                        onClick={e => {
                          const detailRows = document.querySelectorAll(`.detail-row-${idx}`);
                          detailRows.forEach(row => {
                            row.style.display = row.style.display === 'none' ? 'table-row' : 'none';
                          });
                          const cell = e.currentTarget.querySelector('td');
                          if (cell.innerText.includes('+')) {
                            cell.innerText = cell.innerText.replace('+', '-');
                          } else {
                            cell.innerText = cell.innerText.replace('-', '+');
                          }
                        }}
                      >
                        <td>{'합산 +'}</td>
                        <td>{entry.key}</td>
                        <td>{entry.value.reduce((sum, recall) => sum + recall.recallCount, 0)}</td>
                      </tr>

                      {/* 상세 내용: reportYear 대신 report_month 사용 */}
                      {entry.value.map((recall, i) => (
                        <tr
                          key={recall.report_month + '-' + i} // key를 report_month 기준으로 변경
                          className={`detail-row-${idx}`}
                          style={{ display: 'none', background: '#f9f9f9' }}
                        >
                          <td>{recall.report_month}</td> {/* report_month 표시 */}
                          <td>{recall.car_manufacturer}</td>
                          <td>{recall.recallCount}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              {groupedRecallStats.length > 0 && (
                <section>
                  <div className="text-center">
                    <h2 className="title">제조사별 리콜 대수 비율</h2>
                  </div>
                  <ResponsiveContainer width="100%" height={320}>
                    <PieChart>
                      <Pie
                        data={groupedRecallStats.map(entry => ({ name: entry.key, value: entry.value.reduce((sum, recall) => sum + recall.recallCount, 0) }))}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        label
                      >
                        {groupedRecallStats.map((entry, idx) => (
                          <Cell key={`cell-${idx}`} fill={["#3D8D7A", "#B3D8A8", "#FBFFE4", "#A3D1C6", "#BEE4D0", "#b7dcd8", "#80c1ba"][idx % 7]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </section>
              )}
          {/* 제조사별pdf 다운로드 버튼 */}
          <PdfDownloadButton
            pdfBaseUrl={pdfDataApiBaseUrlM}
            startYear={startYear}
            endYear={endYear}
            startMonth={startMonth}
            endMonth={endMonth}
          />
            </div>
          </section>

        </div>
      </div>
    </section>
  );
};

export default RecallStaticsYearPage;