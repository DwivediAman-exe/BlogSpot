import Image from './Image';
import { Link } from 'react-router-dom';

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

const PostCard = ({ post }) => {
  const { title, image, content, postedBy, updatedAt, createdAt } = post;
  return (
    <div
      className="card p-3 m-3 hover-shadow bg-post text-dark"
      style={{ minHeight: '350px' }}
    >
      <div class="card-body text-start">
        <h5 class="card-title text-uppercase">{title}</h5>
        <Image image={image} />
      </div>
      <div class="card-footer">
        <small className="fw-bolder float-start" style={{ color: '#78909C' }}>
          Updated : {updatedAt.split('T')[0].split('-')[2]}
          {','}
          {mon[updatedAt.split('T')[0].split('-')[1].replace(/^0+/, '')]}
        </small>
        <small className="fw-bolder float-end" style={{ color: '#78909C' }}>
          - @{postedBy.username}
        </small>
      </div>
    </div>
  );
};

export default PostCard;
