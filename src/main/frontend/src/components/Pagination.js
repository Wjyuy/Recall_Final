// components/Pagination.js

const Pagination = ({ pageMaker, onPageChange }) => {
  const { prev, startPage, endPage, next, cri } = pageMaker;

  const handlePageClick = (pageNum) => {
    onPageChange({ ...cri, pageNum });
  };

  return (
    <section id="blog-pagination" className="blog-pagination section">
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="div_page">
            <ul style={{ display: 'flex', gap: '2px', padding: 0, margin: 0, listStyle: 'none' }}>
              {prev && (
                <li className="paginate_button" style={{ margin: 0 }}>
                  <button type="button" onClick={() => handlePageClick(startPage - 1)} className="link-button" style={{ background: 'none', border: 'none', boxShadow: 'none', padding: '4px 4px', minWidth: 28, color: '#222', display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <i className="bi bi-chevron-left"></i>
                  </button>
                </li>
              )}
              {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((num) => (
                <li key={num} className={`paginate_button${cri.pageNum === num ? ' active' : ''}`} style={{ margin: 0 }}>
                  <button type="button" onClick={() => handlePageClick(num)} className="link-button" style={{ background: 'none', border: 'none', boxShadow: 'none', padding: '4px 4px', minWidth: 28, fontWeight: cri.pageNum === num ? 'bold' : 'normal', color: cri.pageNum === num ? '#00796b' : '#222', display: 'flex', alignItems: 'center', gap: '2px' }}>
                    {num}
                  </button>
                </li>
              ))}
              {next && (
                <li className="paginate_button" style={{ margin: 0 }}>
                  <button type="button" onClick={() => handlePageClick(endPage + 1)} className="link-button" style={{ background: 'none', border: 'none', boxShadow: 'none', padding: '4px 4px', minWidth: 28, color: '#222', display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pagination;