const Image = ({ image, handleImageRemove = (f) => f }) => {
  return (
    <img
      src={image.url}
      alt={image.public_id}
      c
      style={{ height: '100px', margin: '2px', borderRadius: '20px' }}
      className="img-thumbnail m-3 shadow-2-strong img-fluid"
      onClick={() => handleImageRemove(image.public_id)}
    />
  );
};

export default Image;
