import React, { Fragment, useState, useEffect } from 'react';
import Photo from '@material-ui/icons/Photo';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { storage } from '../../firebase';

const useStyles = makeStyles((theme) => ({
  loadingIcon: {
    order: -1,
    width: '22px !important',
  },
  photoIcon: {
    position: 'relative',
    top: 2,
    color: '#3c4c61',
    cursor: 'pointer',
    marginRight: 4,
  },
}));

const UploadImage = ({ getImage }) => {
  const classes = useStyles();
  const [wholeImage, setWholeImage] = useState('');
  const [downloadedImage, setDownloadedImage] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const handleUpload = (e) => {
    setLoaded(true);
    const imageRef = storage.ref('');
    const metadata = {
      contentType: 'image/jpeg',
    };
    const image = imageRef
      .child(e.target.files[0].name)
      .put(e.target.files[0], metadata);
    setWholeImage(image);
  };

  useEffect(() => {
    if (wholeImage) {
      wholeImage.on(
        'state_changed',
        (snapshot) => {
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPercentage(progress);
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          wholeImage.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setDownloadedImage(downloadURL);
            setLoaded(false);
          });
        }
      );
    }
    getImage(downloadedImage);
  }, [wholeImage, getImage, downloadedImage]);

  return (
    <Fragment>
      <label htmlFor='image'>
        <Photo className={classes.photoIcon} />
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
