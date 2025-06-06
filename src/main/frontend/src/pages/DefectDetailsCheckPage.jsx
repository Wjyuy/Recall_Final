import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchDefectReportById, saveDefectDetails } from '../services/recallApiService';



const initialState = {
  id: '',
  product_name1: '',
  product_name: '',
  manufacturer: '',
  start_date: '',
  end_date: '',
  manufacturing_period: '',
  model_name: '',
  recall_type: '자발적리콜',
  company_select: '',
  contact_info: '',
  contact_number: '',
  additional_info: '',
};

const companyNumbers = {
  '[볼보자동차]': '1588-1777',
  '[마세라티]': '1600-0036',
  '[벤츠코리아]': '080-001-1886',
  '[볼보트럭]': '080-038-1000',
  '[현대자동차]': '080-600-6000',
};

function formatDateToYYYYMMDD(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const DefectDetailsCheckPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // ✅ JWT 인증 체크 useEffect
	useEffect(() => {
		const token = localStorage.getItem("jwt_token");
		if (!token) {
			alert("관리자 로그인이 필요합니다.");
			navigate("/login");
			return;
		}

		// fetch("http://localhost:8485/api/admin/test-auth", {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/test-auth`, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json"
			}
		})
			.then(res => {
				if (res.status !== 200) {
					throw new Error("인증 실패");
				}
			})
			.catch(err => {
				alert("접근 권한이 없습니다. 로그아웃 후 다시 로그인해주세요.");
				navigate("/login");
			});
	}, [navigate]);

  // ID 검색
  const handleSearchDefect = async () => {
    if (!form.id) {
      alert('아이디를 입력해 주세요.');
      return;
    }
    setSearchLoading(true);
    setSearchError('');
    try {
      console.log('[PAGE] handleSearchDefect 호출, id:', form.id);
      const data = await fetchDefectReportById(form.id);
      console.log('[PAGE] fetchDefectReportById 결과:', data);
      if (data) {
        setForm(f => ({
          ...f,
          id: data.id || '',
          manufacturer: data.car_manufacturer || '',
          model_name: data.car_model || '',
        }));
      } else {
        alert('해당 ID의 데이터를 찾을 수 없습니다.');
      }
    } catch (e) {
      setSearchError('데이터를 가져오는 중 오류가 발생했습니다.');
    } finally {
      setSearchLoading(false);
    }
  };

  // 날짜 변경 핸들러
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setForm(f => {
      const updated = { ...f, [name]: value };
      if (updated.start_date && updated.end_date) {
        updated.manufacturing_period = `${formatDateToYYYYMMDD(updated.start_date)} ~ ${formatDateToYYYYMMDD(updated.end_date)}`;
      } else {
        updated.manufacturing_period = '';
      }
      return updated;
    });
  };

  // 회사 선택 핸들러
  const handleCompanyChange = (e) => {
    const company = e.target.value;
    const number = companyNumbers[company] || '';
    setForm(f => ({
      ...f,
      company_select: company,
      contact_number: number,
      contact_info: company ? `${company} 대표번호 : ${number}` : '',
    }));
  };

  // 기타 입력 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // 폼 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    // 모든 필드 유효성 검사
    const requiredFields = [
      { key: 'id', label: 'ID' },
      { key: 'product_name1', label: '리콜정보' },
      { key: 'product_name', label: '리콜명' },
      { key: 'manufacturer', label: '제조사' },
      { key: 'start_date', label: '시작일' },
      { key: 'end_date', label: '종료일' },
      { key: 'model_name', label: '모델명' },
      { key: 'recall_type', label: '리콜 형식' },
      { key: 'company_select', label: '회사' },
      { key: 'contact_number', label: '대표번호' },
      { key: 'additional_info', label: '상세 결함' },
    ];
    const emptyField = requiredFields.find(f => !form[f.key] || String(form[f.key]).trim() === '');
    if (emptyField) {
      alert(`필수 입력값을 모두 입력해 주세요. (누락: ${emptyField.label})`);
      return;
    }
    try {
      const result = await saveDefectDetails(form);
      if (result === 'success') {
        setSuccessMsg('검수 완료! (DB 저장 성공)');
        setTimeout(() => {
          navigate('/recall_list'); // 저장 성공 후 1초 뒤에 리스트 페이지 등으로 이동
        }, 1000);
      } else {
        setSuccessMsg('저장 실패: ' + result);
      }
    } catch (err) {
      setSuccessMsg('저장 중 오류가 발생했습니다.');
    }
  };

  return (
     <section id="starter-section" className="starter-section section">
      <div className="container" data-aos="fade-up">
        <div className="section-title text-center">
            <h2 className="title">신고 검수</h2>
        </div>

        <form onSubmit={handleSubmit} className="uk-form-stacked">
          <div className="widgets-container detail-widgets-container" style={{ textAlign: 'center' }}>
            
          <table className="table-custom">
            <tbody>
              <tr>
                <th className="th">아이디</th>
                <td className="td">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="text" name="id" value={form.id} onChange={handleChange} placeholder="아이디를 입력하세요" className="uk-input uk-form-width-medium" />
                  <button type="button" onClick={handleSearchDefect} disabled={searchLoading}>
                    {searchLoading ? '검색 중...' : '검색'}
                  </button>
                  </div>
                  {searchError && <span style={{ color: 'red', marginLeft: 8 }}>{searchError}</span>}
                </td>
              </tr>
              <tr>
                <th className="th">리콜정보</th>
                <td className="td">
                  
                  <select name="product_name1" value={form.product_name1} onChange={handleChange} className="uk-select">
                    <option value="">선택</option>
                    <option value="볼보">볼보</option>
                    <option value="마세라티">마세라티</option>
                    <option value="벤츠">벤츠</option>
                    <option value="볼보트럭">볼보트럭</option>
                    <option value="현대자동차">현대자동차</option>
                  </select>

                  <input name="product_name" value={form.product_name} onChange={handleChange} className="uk-input uk-form-width-medium" type="text" maxLength={7} placeholder="예)계기판 관련 리콜" style={{ marginTop: 5 }}/>
                </td>
              </tr>
              <tr>
                <th className="th">자동차 제조사</th>
                <td className="td">
                  <input name="manufacturer" value={form.manufacturer} onChange={handleChange} className="uk-input uk-form-width-medium" type="text" placeholder="예)볼보 자동차 코리아" readOnly />
                </td>
              </tr>
              <tr>
                <th className="th">기간</th>
                <td className="td">
                  <input name="start_date" value={form.start_date} onChange={handleDateChange} className="uk-input uk-form-width-small" type="date" />
                  ~
                  <input name="end_date" value={form.end_date} onChange={handleDateChange} className="uk-input uk-form-width-small" type="date" />
                  <span style={{ marginLeft: 10, fontWeight: 'bold' }}>{form.manufacturing_period}</span>
                  <input type="hidden" name="manufacturing_period" value={form.manufacturing_period} />
                </td>
              </tr>
              <tr>
                <th className="th">자동차 모델명</th>
                <td className="td">
                  <input name="model_name" value={form.model_name} onChange={handleChange} className="uk-input uk-form-width-medium" type="text" />
                </td>
              </tr>
              <tr>
                <th className="th">리콜 형식</th>
                <td className="td">
                  <input name="recall_type" value={form.recall_type} className="uk-input uk-form-width-medium" type="text" readOnly />
                </td>
              </tr>
              <tr>
                <th className="th">회사(대표번호)</th>
                <td className="td">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <select name="company_select" value={form.company_select} onChange={handleCompanyChange} className="uk-select">
                    <option value="">회사 선택</option>
                    <option value="[볼보자동차]">[볼보자동차]</option>
                    <option value="[마세라티]">[마세라티]</option>
                    <option value="[벤츠코리아]">[벤츠코리아]</option>
                    <option value="[볼보트럭]">[볼보트럭]</option>
                    <option value="[현대자동차]">[현대자동차]</option>
                  </select>
                  <input name="contact_number" value={form.contact_number} onChange={handleChange} className="uk-input uk-form-width-medium" type="text" maxLength={20} placeholder="예)볼보자동차 대표번호 1588-1777"/>
                  </div>
                  <input type="hidden" name="contact_info" value={form.contact_info} />
                </td>
              </tr>
              <tr>
                <th className="th">상세 결함</th>
                <td className="td">
                  <textarea name="additional_info" value={form.additional_info} onChange={handleChange} className="uk-input uk-form-width-medium" rows={4} style={{ resize: 'vertical' }} />
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ textAlign: 'center' }}>
            <button type="submit" style={{ marginTop: '10px' }}>
              검수 완료!
            </button>
          </div>
          {successMsg && <div style={{ color: 'green', textAlign: 'center', marginTop: 16 }}>{successMsg}</div>}
        </div>
        </form>
      </div>
    </section>
  );
};

export default DefectDetailsCheckPage;
