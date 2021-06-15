import Image from './Image';
import { Link, useHistory } from 'react-router-dom';

var mon = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

const PostCard = ({
  post,
  showUpdateButton = false,
  showDeleteButton = false,
  handleDelete = (f) => f,
}) => {
  const history = useHistory();

  const { title, image, content, postedBy, updatedAt } = post;

  return (
    <div
      className="card p-3 m-3 hover-shadow bg-post text-dark"
      style={{ minHeight: '380px' }}
    >
      <div class="card-body text-start">
        <h5 class="card-title text-uppercase">{title}</h5>
        <Image image={image} />
      </div>
      <div class="card-footer">
        <small className="fw-bolder float-start" style={{ color: '#78909C' }}>
          Updated : {updatedAt.split('T')[0].split('-')[2]}
          {mon[updatedAt.split('T')[0].split('-')[1].replace(/^0+/, '')]}
          {','}
          {updatedAt.split('T')[0].split('-')[0]}
        </small>
        <small className="fw-bolder float-end" style={{ color: '#78909C' }}>
          - @{postedBy.username}
        </small>
      </div>
      {showDeleteButton && showUpdateButton && (
        <div className="card-footer ps-2 pe-2 ">
          {showUpdateButton && (
            <button
              onClick={() => history.push(`/post/update/${post._id}`)}
              className="btn mt-1 btn-rounded btn-outline-info shadow-1-strong float-start"
            >
              Update
            </button>
          )}
          {showDeleteButton && (
            <button
              onClick={() => handleDelete(post._id)}
              className="btn mt-1 btn-rounded btn-outline-danger shadow-1-strong float-end"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;
