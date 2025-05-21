import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const API_BASE_URL = 'http://localhost:8485/api';

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_RANGE = Array.from({ length: 26 }, (_, i) => 2000 + i); // 2000~2025

const RecallStaticsYearPage = () => {
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [summary, setSummary] = useState(null);
  const [summaryList, setSummaryList] = useState([]);
  const [groupedRecallStats, setGroupedRecallStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 데이터 조회
  const fetchData = async (start, end) => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (start) params.startYear = start;
      if (end) params.endYear = end;
      const res = await axios.get(`${API_BASE_URL}/recall_statics_year`, { params });
      setSummary(res.data.summary);
      setSummaryList(res.data.summaryList || []);
      setGroupedRecallStats(res.data.groupedRecallStats || []);
    } catch (e) {
      setError('데이터를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(startYear, endYear);
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(startYear, endYear);
  };

  return (
    <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
      <h2 style={{ margin: '32px 0 16px' }}>연도별 리콜 통계 신고 현황</h2>
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
        <input type="submit" value="조회" className="btn-get-started" style={{ marginLeft: 20 }} />
      </form>
      {loading && <div>로딩 중...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {summary && (
        <section>
          <h3>📊 결함 신고 요약 통계 {startYear && endYear ? `(${startYear} ~ ${endYear})` : '(2000 ~ 2025 전체)'}</h3>
          <table className="table-summary" style={{ marginBottom: 32 }}>
            <thead>
              <tr>
                <th rowSpan={2}>해당 연도</th>
                <th colSpan={2}>국산자동차</th>
                <th colSpan={2}>수입자동차</th>
                <th colSpan={2}>계</th>
              </tr>
              <tr>
                <th>차종</th><th>대수</th><th>차종</th><th>대수</th><th>차종</th><th>대수</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{summary.label}</td>
                <td>{summary.domesticModelCount}</td>
                <td>{summary.domesticCount}</td>
                <td>{summary.importedModelCount}</td>
                <td>{summary.importedCount}</td>
                <td>{summary.totalModelCount}</td>
                <td>{summary.totalCount}</td>
              </tr>
            </tbody>
          </table>
        </section>
      )}
      {summaryList.length > 0 && (
        <section>
          {/* 연도별 리콜 통계 차트 */}
          <h3 style={{ marginTop: 32 }}>연도별 리콜 대수(전체) 추이</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={summaryList} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="report_year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalCount" name="전체 대수" fill="#8884d8" />
              <Bar dataKey="domesticCount" name="국산 대수" fill="#82ca9d" />
              <Bar dataKey="importedCount" name="수입 대수" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
          <button type="button" onClick={e => {
            const el = document.getElementById('content1');
            if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
          }} className="btn-get-started" style={{ marginBottom: 16 }}>자세히 보기 +</button>
          <div id="content1" style={{ display: 'none' }}>
            <h3>연도별 리콜현황</h3>
            <table className="table-summary" style={{ marginBottom: 32 }}>
              <thead>
                <tr>
                  <th rowSpan={2}>해당 연도</th>
                  <th colSpan={2}>국산자동차</th>
                  <th colSpan={2}>수입자동차</th>
                  <th colSpan={2}>계</th>
                </tr>
                <tr>
                  <th>국산 차종</th><th>국산 대수</th><th>수입 차종</th><th>수입 대수</th><th>전체 차종</th><th>전체 대수</th>
                </tr>
              </thead>
              <tbody>
                {summaryList.map(item => (
                  <tr key={item.report_year}>
                    <td>{item.report_year}</td>
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
            {/* 연도별 리콜현황 BarChart 시각화 */}
            <h4 style={{ margin: '32px 0 8px' }}>연도별 리콜 대수(BarChart)</h4>
            <div style={{ width: '100%', height: 320, background: '#fafbfc', borderRadius: 8, marginBottom: 32, padding: 16 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={summaryList} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <XAxis dataKey="report_year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="domesticCount" name="국산 대수" fill="#1976d2" />
                  <Bar dataKey="importedCount" name="수입 대수" fill="#ff9800" />
                  <Bar dataKey="totalCount" name="전체 대수" fill="#43a047" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* PDF 다운로드 버튼 */}
            <button
              className="btn-get-started pdf-download-button"
              style={{ marginBottom: 24 }}
              onClick={() => {
                const params = [];
                if (startYear) params.push(`startYear=${startYear}`);
                if (endYear) params.push(`endYear=${endYear}`);
                window.location.href = `/recall_statics_year/pdf?${params.join('&')}`;
              }}
              data-tooltip="pdf를 다운받으시면, 자료에 대한 gemini의 summarize도 포함됩니다!"
            >
              PDF 다운로드
            </button>
          </div>
        </section>
      )}
      {groupedRecallStats.length > 0 && (
        <section>
          <h3>제조사별 리콜 대수 비율</h3>
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
                  <Cell key={`cell-${idx}`} fill={["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c", "#d0ed57"][idx % 7]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <h4 style={{ margin: '32px 0 8px' }}>제조사별 리콜 대수(PieChart)</h4>
          <div style={{ width: '100%', height: 320, background: '#fafbfc', borderRadius: 8, marginBottom: 32, padding: 16 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={groupedRecallStats.map(entry => ({ name: entry.key, value: entry.value.reduce((sum, recall) => sum + recall.recallCount, 0) }))}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  label
                >
                  {groupedRecallStats.map((entry, idx) => (
                    <Cell key={`cell2-${idx}`} fill={["#1976d2", "#ff9800", "#43a047", "#e91e63", "#9c27b0", "#00bcd4", "#ffc107"][idx % 7]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <h3>연도별 리콜 요약 통계-제조사별</h3>
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
        </section>
      )}
      {/* 데이터가 없을 때 안내 */}
      {!loading && !error && summaryList.length === 0 && (
        <div style={{ color: '#888', margin: '32px 0' }}>조회된 통계 데이터가 없습니다.</div>
      )}
    </div>
  );
};

export default RecallStaticsYearPage;
