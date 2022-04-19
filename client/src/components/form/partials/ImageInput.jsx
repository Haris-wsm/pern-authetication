import React from 'react';
import NoUserImage from '../../../asserts/images/no_user.png';

const ImageInput = ({ isEdit, uploadImage, image, setUploadImage }) => {
  const showBase64Image = (base64Image) =>
    `data:image/png;base64,${base64Image}`;

  const handleChangeImage = (e) => {
    convertBase64Image(e.target.files[0]);
  };

  const convertBase64Image = (rawImage) => {
    let reader = new FileReader();
    let base64String;

    reader.onload = function () {
      base64String = reader.result.replace('data:', '').replace(/^.+,/, '');

      setUploadImage(base64String);
    };
    reader.readAsDataURL(rawImage);
  };

  return (
    <div className="position-relative">
      {isEdit ? (
        <>
          <img
            src={
              uploadImage
                ? showBase64Image(uploadImage)
                : image
                ? `${process.env.REACT_APP_SERVER_DNS}/images/${image}`
                : NoUserImage
            }
            className="img-thumbnail"
            alt="user-profile"
            width={200}
            height={200}
          />
          <label
            htmlFor="profile-image"
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 25,
              height: 25,
              fontSize: 12
            }}
            role="button"
            className="bg-danger p-1 rounded-circle d-flex justify-content-center align-items-center"
          >
            <i className="fa-solid fa-pen-to-square text-white"></i>
          </label>

          <input
            type="file"
            id="profile-image"
            className="d-none"
            onChange={handleChangeImage}
          />
        </>
      ) : (
        <img
          src={
            image
              ? `${process.env.REACT_APP_SERVER_DNS}/images/${image}`
              : NoUserImage
          }
          className="img-thumbnail"
          alt="user-profile"
          width={200}
          height={200}
        />
      )}
    </div>
  );
};

export default ImageInput;
