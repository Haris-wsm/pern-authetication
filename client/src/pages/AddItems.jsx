import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import no_image from '../asserts/images/no_item.jpg';
import request from '../api/authReqest';

const AddItems = () => {
  const [image, setImage] = useState(null);
  const [itemName, setItemName] = useState('');
  const [attachmentId, setAttachmentId] = useState(null);

  const navigate = useNavigate();

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
    uploadImage(e.target.files[0]);
  };

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append('file', image);

    try {
      const res = await request.post('/items/attachments', formData, {
        headers: { 'Content-type': 'multipart/form-data' }
      });
      setAttachmentId(res.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        name: itemName,
        fileId: attachmentId
      };

      await request.post('/items', body);
      navigate({ pathname: '/' });
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="container py-4 w-100 h-100">
      <div className="setting-profile">
        <div className="title">
          <h1 className="display-5">Add Items</h1>
          <hr />

          <div className=" mt-5">
            <div className="header d-flex justify-content-between">
              <h4>Addition Form</h4>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-sm-12 mt-2 py-4">
                  <form className="px-3">
                    <div className="mb-3">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter items name"
                          value={itemName}
                          onChange={(e) => setItemName(e.target.value)}
                        />
                        <small id="emailHelp" className="form-text text-muted">
                          Define name of item that need to insert.
                        </small>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-md-6 col-sm-12 mt-2 py-4 d-flex justify-content-center">
                  <div className="position-relative">
                    <img
                      src={image ? URL.createObjectURL(image) : no_image}
                      className="img-thumbnail"
                      alt="item"
                      width={200}
                      height={200}
                    />
                    <label
                      htmlFor="item-image"
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
                      id="item-image"
                      className="d-none"
                      onChange={handleChangeImage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItems;
