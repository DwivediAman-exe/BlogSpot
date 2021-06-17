import { Link } from 'react-router-dom';
import Image from './Image';

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

const UserCard = ({ user }) => {
  const { username, images, about, createdAt } = user;
  return (
    <div
      className="card text-center hover-shadow p-1 m-1 singleuser"
      style={{ height: '100%' }}
    >
      <div className="card-body">
        <Image image={images[0]} />
        <Link to={`/user/${username}`}>
          <h4 className="text-primary mt-2 p-1">@{username}</h4>
        </Link>
        <hr style={{ width: '40%', margin: '4% 30%', color: 'gray' }} />
        <small className="fw-bolder" style={{ color: '#78909C' }}>
          {about}
        </small>
        <br />
        <small className="float-end p-2 fw-light" style={{ color: 'gray' }}>
          <i class="fas fa-user-clock"></i> Joined{' - '}
          {mon[createdAt.split('T')[0].split('-')[1].replace(/^0+/, '')]}
          {','}
          {createdAt.split('T')[0].split('-')[0]}
        </small>
      </div>
    </div>
  );
};

export default UserCard;
