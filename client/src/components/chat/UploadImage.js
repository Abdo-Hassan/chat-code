import React, { Fragment, useState } from 'react';
import Photo from '@material-ui/icons/Photo';
import { storage } from '../../firebase';

const UploadImage = ({ getImage }) => {
  const [downloadedImage, setDownloadedImage] = useState([]);

  const handleUpload = async (e) => {
    const imageRef = storage.ref('');
    const image = imageRef.child(e.target.files[0].name);
    await image.put(e.target.files[0]);
    await image
      .getDownloadURL()
      .then((url) => {
        setDownloadedImage(url);
      })
      .catch((error) => console.log(error.message));
    getImage(downloadedImage);
  };

  return (
    <Fragment>
      <label htmlFor='image'>
        <Photo
          style={{
            color: '#3c4c61',
            cursor: 'pointer',
          }}
        />
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
