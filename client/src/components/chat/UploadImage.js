import React, { Fragment, useState } from 'react';
import Photo from '@material-ui/icons/Photo';

const UploadImage = () => {
  const [image, setImage] = useState([]);

  const handleUpload = (e) => {
    const uploadedImage = e.target.files[0].name;
    setImage([...image, { name: uploadedImage }]);
  };
  console.log(image);

  return (
    <Fragment>
      <label htmlFor='image'>
        <Photo style={{ color: '#3c4c61', cursor: 'pointer' }} />
      </label>
      <input
        type='file'
        id='image'
        multiple
        onChange={handleUpload}
        style={{ display: 'none' }}
      />
    </Fragment>
  );
};

export default UploadImage;
