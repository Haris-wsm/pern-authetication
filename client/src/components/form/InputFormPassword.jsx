import React, { useState } from 'react';

const InputFormPassword = ({ value, setPassword, id }) => {
  const [isShow, setIsShow] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="input-password w-100 bg-white h-auto d-flex align-items-center">
      <input
        type={isShow ? 'text' : 'password'}
        className="form-control"
        id={id}
        placeholder="Enter password"
        defaultValue={value}
        onChange={handlePasswordChange}
      />
      <span
        className="content-form-icon px-2"
        role="button"
        onClick={() => setIsShow(!isShow)}
      >
        {isShow ? (
          <i className="fa-solid fa-eye-slash " />
        ) : (
          <i className="fa-solid fa-eye " />
        )}
      </span>
    </div>
  );
};

export default InputFormPassword;
