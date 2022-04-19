import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import request from '../api/authReqest';
import ProfileField from '../components/form/partials/ProfileField';
import { LocalStorage } from '../contexts/useLocalStorage';

import ImageInput from '../components/form/partials/ImageInput';

const Profile = () => {
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [username, setUser] = useState('');
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfrimPassword] = useState('');
  const [uploadImage, setUploadImage] = useState(null);

  const { userToken } = useContext(LocalStorage);

  request.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${userToken.token}`;

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await request.get(`/users/${id}`);
        setInitailProfile(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProfile();
  }, []);

  const setInitailProfile = (profile) => {
    setUser(profile?.username);
    setImage(profile?.image);
  };

  const handleEdit = () => setIsEdit(!isEdit);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      username,
      password,
      newPassword,
      image: uploadImage
    };
    let updatedProfile;

    try {
      updatedProfile = await request.put(`/users/${id}`, body);
    } catch (error) {
      console.log(error.response.data);
    }
    resetPasswordFields(updatedProfile.data.user);
  };

  const resetPasswordFields = (body) => {
    setPassword('');
    setNewPassword('');
    setImage(body?.image);
  };

  return (
    <div className="container py-4 w-100 h-100">
      <div className="setting-profile">
        <div className="title">
          <h1 className="display-5">Profile</h1>
          <hr />
          <div className="setting-content mt-5">
            <div className="header d-flex justify-content-between">
              <h4>Profile settings</h4>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="editProfile"
                  onChange={handleEdit}
                />
                <label className="form-check-label" htmlFor="editProfile">
                  Edit Profile
                </label>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-sm-12 mt-2 py-4">
                  <form className="px-3">
                    <div className="mb-3">
                      <ProfileField
                        inputType="text"
                        isEdit={isEdit}
                        name="Username"
                        desc="Username that use in this website."
                        value={username}
                        placeholder="Enter username"
                        setInputChange={setUser}
                      />
                    </div>

                    {isEdit && (
                      <>
                        <div className="mb-3">
                          <ProfileField
                            inputType="password"
                            isEdit={isEdit}
                            name="Password"
                            desc="Original user's password"
                            placeholder="Enter password"
                            value={password}
                            setInputChange={setPassword}
                          />
                        </div>
                        <div className="mb-3">
                          <ProfileField
                            inputType="password"
                            isEdit={isEdit}
                            name="New Password"
                            desc="New password that will be changed"
                            placeholder="Enter new password"
                            value={newPassword}
                            setInputChange={setNewPassword}
                          />
                        </div>
                        <div className="mb-3">
                          <ProfileField
                            inputType="password"
                            isEdit={isEdit}
                            name="New Password Confirm"
                            desc="Confirm new password"
                            placeholder="Enter new password confirm"
                            value={confirmPassword}
                            setInputChange={setConfrimPassword}
                          />
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
                      </>
                    )}
                  </form>
                </div>
                <div className="col-md-6 col-sm-12 py-4 d-flex justify-content-center align-items-start">
                  <div className="position-relative">
                    <ImageInput
                      image={image}
                      isEdit={isEdit}
                      setUploadImage={setUploadImage}
                      uploadImage={uploadImage}
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

export default Profile;
