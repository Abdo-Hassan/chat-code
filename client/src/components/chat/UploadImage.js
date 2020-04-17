import React, { Fragment, useState } from 'react';
import Photo from '@material-ui/icons/Photo';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { storage } from '../../firebase';

const useStyles = makeStyles((theme) => ({
  loadingIcon: {
    order: -1,
    width: '22px !important',
  },
}));

const UploadImage = ({ getImage }) => {
  const classes = useStyles();
  const [downloadedImage, setDownloadedImage] = useState([]);
  const [percentage, setPercentage] = useState(0);

  const [loaded, setLoaded] = useState(false);
  const handleUpload = async (e) => {
    setLoaded(true);
    const imageRef = storage.ref('');
    const metadata = {
      contentType: 'image/jpeg',
    };
    const image = imageRef
      .child(e.target.files[0].name)
      .put(e.target.files[0], metadata);
    image.on(
      'state_changed',
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercentage(progress);
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        image.snapshot.ref.getDownloadURL().then((downloadURL) => {
          setDownloadedImage(downloadURL);
          setLoaded(false);
        });
      }
    );
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
      {loaded && (
        <CircularProgress
          variant='static'
          value={percentage}
          className={classes.loadingIcon}
        />
      )}
    </Fragment>
  );
};

export default UploadImage;
