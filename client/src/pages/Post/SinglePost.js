import { useLazyQuery } from '@apollo/react-hooks';
import { useState, useMemo, useEffect } from 'react';
import { SINGLE_POST } from '../../graphql/queries';
import { useParams } from 'react-router-dom';
import SinglePostCard from '../../components/SinglePostCard';

const SinglePost = () => {
  const [values, setValues] = useState({
    content: '',
    title: '',
    image: {
      url: '',
      public_id: '',
    },
    updatedAt: '',
    postedBy: {},
  });

  const { title, content, image, updatedAt } = values;

  const [getSinglePost, { data: singlePost }] = useLazyQuery(SINGLE_POST);

  const { postid } = useParams();

  useMemo(() => {
    if (singlePost) {
      setValues({
        ...values,
        _id: singlePost.singlePost._id,
        title: singlePost.singlePost.title,
        content: singlePost.singlePost.content,
        image: singlePost.singlePost.image,
        updatedAt: singlePost.singlePost.updatedAt,
        postedBy: singlePost.singlePost.postedBy,
      });
    }
  }, [singlePost]);

  useEffect(() => {
    getSinglePost({ variables: { postId: postid } });
  }, []);

  return (
    <div className="container mt-4">
      <SinglePostCard post={values} />
    </div>
  );
};

export default SinglePost;
