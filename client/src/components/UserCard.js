import { Link } from 'react-router-dom';
import Image from './Image';

const UserCard = ({ user }) => {
  const { username, images, about } = user;
  return (
    <div
      className="card text-center hover-shadow p-2 m-1 rounded"
      style={{
        minHeight: '300px',
        borderTopLeftRadius: '50px !important',
        borderBottomRightRadius: '10px !important',
      }}
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
      </div>
    </div>
  );
};

export default UserCard;
