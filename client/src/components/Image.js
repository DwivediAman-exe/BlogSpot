const Image = ({
  image,
  largedisplay = false,
  handleImageRemove = (f) => f,
}) => {
  return largedisplay ? (
    <img
      src={image.url}
      alt={image.public_id}
      c
      style={{
        height: 'auto',
        width: 'auto',
        maxHeight: '300px',
        objectFit: 'cover',
        margin: '2px',
        borderRadius: '20px',
      }}
      className="img-thumbnail m-3 shadow-2-strong img-fluid"
      onClick={() => handleImageRemove(image.public_id)}
    />
  ) : (
    <img
      src={image.url}
      alt={image.public_id}
      c
      style={{
        height: '130px',
        width: '150px',
        maxHeight: '130px',
        maxWidth: '150px',
        objectFit: 'cover',
        margin: '2x',
        borderRadius: '20px',
      }}
      className="img-thumbnail m-3 shadow-2-strong img-fluid"
      onClick={() => handleImageRemove(image.public_id)}
    />
  );
};

export default Image;
