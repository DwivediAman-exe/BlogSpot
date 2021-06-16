import { Link } from 'react-router-dom';

const PostPagination = ({ page, setPage, postCount }) => {
  let totalPages;
  const pagination = () => {
    totalPages = Math.ceil(postCount && postCount.totalPosts / 2);
    if (totalPages > 8) totalPages = 8;
    // console.log(totalPages);

    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li class="page-item">
          <Link
            onClick={() => setPage(i)}
            className={`page-link m-1 ${page === i && 'activepage'}`}
          >
            {i}
          </Link>
        </li>
      );
    }
    return pages;
  };

  return (
    <nav>
      <ul className="pagination  justify-content-center p-5">
        <li class="page-item">
          <Link
            onClick={() => setPage(1)}
            className={`page-link mt-1 ${page === 1 && 'disabled'}`}
          >
            First
          </Link>
        </li>
        {pagination()}
        <li class="page-item">
          <Link
            onClick={() => setPage(totalPages)}
            className={`page-link mt-1 ${page === totalPages && 'disabled'}`}
          >
            Last
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default PostPagination;
