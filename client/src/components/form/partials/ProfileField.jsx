import React from 'react';

const ProfileField = ({
  isEdit,
  inputType,
  name,
  desc,
  value,
  placeholder,
  setInputChange
}) => {
  const handeChange = (e) => setInputChange(e.target.value);
  return (
    <>
      <label htmlFor={name} className="form-label">
        {name}
      </label>
      <input
        type={inputType}
        className="form-control"
        id={name}
        disabled={!isEdit}
        value={value}
        placeholder={placeholder}
        onChange={handeChange}
      />
      <div id={`${name}Help`} className="form-text">
        {desc}
      </div>
    </>
  );
};

export default ProfileField;
