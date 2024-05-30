import React from "react";

const NoteDataDescription = ({ description, onChange }) => {
  return (
    <div>
      <textarea
        className="noteDescription"
        placeholder="Description"
        id="description"
        name="description"
        value={description}
        onChange={onChange}
      />
      Links:
    </div>
  );
};

export default NoteDataDescription;
