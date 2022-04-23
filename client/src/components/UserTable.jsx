import React, { useContext, useEffect, useState } from 'react';
import request from '../api/authReqest';
import NoUserImage from '../asserts/images/no_user.png';

import { LocalStorage } from '../contexts/useLocalStorage';
import UserRoleSelection from './form/partials/UserRoleSelection';

const UserTable = () => {
  const { userToken } = useContext(LocalStorage);
  const [users, setUsers] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState([]);

  console.log(roles);

  request.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${userToken.token}`;

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await request.get('/users');
        setUsers(res.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const isAdmin = (arrayOfRoles) => {
    return arrayOfRoles
      .map((role) => role.role)
      .some((c) => c.toLowerCase() === 'admin');
  };

  const displayRolesWidget = (arrayOfRoles, isEdit, user) => {
    return arrayOfRoles.map((role) => (
      <button
        type="button"
        className="btn btn-secondary btn-sm position-relative mx-1 my-1"
        key={role.role}
        role="banner"
      >
        {role.role}
        {isEdit && (
          <>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {user.roles.length > 1 && (
                <i
                  className="fa-solid fa-xmark"
                  onClick={() => handleRemoveRole(user, role)}
                ></i>
              )}
            </span>
          </>
        )}
      </button>
    ));
  };

  const handleInputList = (userSelect, newRole) => {
    setUsers(
      users.map((user) =>
        user.id === userSelect.id
          ? {
              ...user,
              roles: [...user.roles, { id: newRole.id, role: newRole.role }]
            }
          : user
      )
    );
    setRoles(
      roles.find((role) => role.id === userSelect.id)
        ? [
            ...roles.map((role) =>
              role.id === userSelect.id
                ? {
                    ...role,
                    roles: [
                      ...role.roles,
                      { id: newRole.id, role: newRole.role }
                    ]
                  }
                : role
            )
          ]
        : [
            ...roles,
            {
              id: userSelect.id,
              roles: [
                ...userSelect.roles,
                { id: newRole.id, role: newRole.role }
              ]
            }
          ]
    );
  };

  const handleRemoveRole = (userSelect, removeRole) => {
    setUsers(
      users.map((user) =>
        user.id === userSelect.id
          ? {
              ...user,
              roles: user.roles.filter((role) => role.id !== removeRole.id)
            }
          : user
      )
    );

    setRoles(
      roles.find((role) => role.id === userSelect.id)
        ? roles.map((role) =>
            role.id === userSelect.id
              ? {
                  id: role.id,
                  roles: role.roles.filter((c) => {
                    return c.id !== removeRole.id;
                  })
                }
              : role
          )
        : [
            ...roles,
            {
              id: userSelect.id,
              roles: userSelect.roles.filter((r) => r.id !== removeRole.id)
            }
          ]
    );
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    const body = roles.map((role) => {
      return { id: role.id, roles: role.roles.map((r) => r.id) };
    });
    console.log(body);

    try {
      await request.put('/roles', body);
      setRoles([]);
      setIsLoading(false);
      setIsEdit(false);
    } catch (error) {
      setRoles([]);
      setIsLoading(false);
      setIsEdit(false);
      console.log(error);
    }
  };

  return (
    <>
      <div className="setting-content mb-2">
        <div className="header d-flex justify-content-between">
          <h4>All users</h4>
          <div className="d-flex align-items-center justify-content-center">
            {roles.length > 0 &&
              isEdit &&
              (isLoading ? (
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <div className="mx-2 px-3 py-2 d-flex flex-column">
                  <div className="form-text">{`changed ${roles.length} users`}</div>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={handleUpdate}
                  >
                    update
                  </button>
                </div>
              ))}

            <div className="form-check form-switch h-100 d-flex">
              <input
                className="form-check-input align-self-center mx-1"
                type="checkbox"
                id="editProfile"
                onChange={handleEdit}
                checked={isEdit}
              />
              <label
                className="form-text align-self-center"
                htmlFor="editProfile"
              >
                Edit Users
              </label>
            </div>
          </div>
        </div>
      </div>
      <table className="table table-borderless">
        <thead>
          <tr className="bg-primary text-white">
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col ">
              <i className="fa-solid fa-image"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                {isEdit ? (
                  <UserRoleSelection
                    user={user}
                    displayRolesWidget={displayRolesWidget}
                    handleInputList={handleInputList}
                    handleRemoveRole={handleRemoveRole}
                  />
                ) : (
                  <div className="d-flex flex-wrap">
                    {displayRolesWidget(user.roles)}
                  </div>
                )}
              </td>
              <td className="d-flex align-items-center justify-content-start">
                <img
                  src={`${
                    user.image
                      ? `${process.env.REACT_APP_SERVER_STATIC_USER_IMAGES}/${user.image}`
                      : NoUserImage
                  }`}
                  alt=""
                  className="rounded-circle "
                  style={{ width: 48, height: 48, objectFit: 'contain' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserTable;
