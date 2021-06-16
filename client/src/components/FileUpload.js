import { useContext } from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import Image from './Image';
import { AuthContext } from '../context/authContext';

const FileUpload = ({
  setLoading,
  setValues,
  values,
  loading,
  singleUpload = false,
}) => {
  const { state } = useContext(AuthContext);

  const fileResizeAndUpload = (e) => {
    setLoading(true);
    let fileInput = false;
    if (e.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          e.target.files[0],
          300,
          300,
          'JPEG',
          100,
          0,
          (uri) => {
            // console.log(uri);
            axios
              .post(
                `${process.env.REACT_APP_REST_ENDPOINT}/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: state.user.token,
                  },
                }
              )
              .then((response) => {
                setLoading(false);
                console.log('Image uploaded', response);

                if (singleUpload) {
                  const { image } = values;
                  setValues({ ...values, image: response.data });
                } else {
                  const { images } = values;
                  setValues({ ...values, images: [...images, response.data] });
                }
              })
              .catch((error) => {
                setLoading(false);
                console.log('Cloudinary upload failed error', error);
              });
          },
          'base64'
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleImageRemove = (id) => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_REST_ENDPOINT}/removeimage`,
        {
          public_id: id,
        },
        {
          headers: {
            authtoken: state.user.token,
          },
        }
      )
      .then((response) => {
        setLoading(false);

        if (singleUpload) {
          const { image } = values;
          setValues({
            ...values,
            image: {
              url: '',
              public_id: '',
            },
          });
        } else {
          const { images } = values;
          let filteredImages = images.filter((item) => {
            return item.public_id !== id;
          });
          setValues({ ...values, images: filteredImages });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log('Delete image failed', error);
      });
  };

  return (
    <div className="row">
      <div className="col-md-3">
        <div className="form-outline mt-4">
          {values.image && <label>Depiction</label>}
          {values.images && <label>Avatars</label>}
          <input
            type="file"
            accept="image/*"
            onChange={fileResizeAndUpload}
            className="btn btn-outline-secondary btn-rounded form-control p-2 mt-2 ms-1 mb-2"
            style={{
              borderLeft: '2px solid gray',
              borderBottom: '2px solid gray',
            }}
          />
        </div>
      </div>
      <div className="col-md-9">
        {values.image && (
          <Image
            image={values.image}
            key={values.image.public_id}
            handleImageRemove={handleImageRemove}
          />
        )}
        {values.images &&
          values.images.map((image) => (
            <Image
              image={image}
              key={image.public_id}
              handleImageRemove={handleImageRemove}
            />
          ))}
      </div>
    </div>
  );
};

export default FileUpload;
