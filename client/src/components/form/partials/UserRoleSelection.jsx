import React, { useEffect, useState } from 'react';

import request from '../../../api/authReqest';

const UserRoleSelection = ({ user, handleInputList, displayRolesWidget }) => {
  const [roles, setRoles] = useState([]);
  const handleChange = (e) => {
    const role = roles.find((r) => r.role === e.target.value);

    handleInputList(user, role);
  };

  useEffect(() => {
    const getRoles = async () => {
      try {
        const res = await request.get('/roles');
        setRoles(res.data.roles);
      } catch (error) {
        console.log(error);
      }
    };
    getRoles();
  }, []);

  const getRolesWidgetOptions = () => {
    return roles.filter(
      ({ role }) => !user.roles.map((role) => role.role).includes(role)
    );
  };

  return (
    <div className="input-roles d-flex flex-wrap" style={{ maxWidth: 250 }}>
      {displayRolesWidget(user.roles, true, user)}

      {getRolesWidgetOptions().length > 0 && (
        <select
          className="form-select mx-1 my-1"
          value=""
          onChange={handleChange}
        >
          <option value="" disabled>
            Choose role
          </option>
          {getRolesWidgetOptions().map((r) => (
            <option value={r.role} key={r.role}>
              {r.role}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default UserRoleSelection;
