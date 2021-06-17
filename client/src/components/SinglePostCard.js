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

const SinglePostCard = ({ post }) => {
  const { title, image, content, postedBy, updatedAt } = post;

  console.log(post);

  return (
    <div
      className="card p-2 mt-5 shadow-2-strong singlepost"
      style={{ minHeight: '550px' }}
    >
      <div className="card-body text-center m-4 lh-lg">
        <h5 className="card-title fs-2 ps-5 pe-5 pt-4 text-dark fw-bold text-uppercase ">
          {title}
        </h5>
        <div className="m-4">
          <Image image={image} largedisplay={true} />
        </div>
        <p className="ps-5 pe-5 pt-2 fw-normal fs-4 alignment">{content}</p>
      </div>
      <div class="card-footer">
        <h6 className="float-start pt-4 ps-3">
          Created on : {updatedAt.split('T')[0].split('-')[2]}
          {'-'}
          {updatedAt.split('T')[0].split('-')[1]}
          {'-'}
          {updatedAt.split('T')[0].split('-')[0]}
        </h6>
        <div className="float-end mt-3">
          <h5 className="text-dark">Creator/Editor </h5>
          <h5 className="fw-bolder " style={{ color: '#7D5A50' }}>
            - @{postedBy.username}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default SinglePostCard;
