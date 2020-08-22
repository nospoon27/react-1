import React, { useState } from "react";
import { useEffect } from "react";

const ProfileStatusWithHooks = (props) => {
  const [editMode, setEditMode] = useState(false)
  const [status, setStatus] = useState(props.status)

  useEffect( () => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  }

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  }

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  }

    return (
      <div>
        {!editMode ? (
          <div>
            <span onDoubleClick={activateEditMode}>{status || 'no status'}</span>
          </div>
        ) : (
          <div>
            <input autoFocus={true} onChange={onStatusChange} 
            onBlur={deactivateEditMode} type="text" value={status} />
          </div>
        )}
      </div>
    );
}

export default ProfileStatusWithHooks;
