import AutoLinkText from "./AutoLink";

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
      <h4>Links Extracted:</h4>
      <AutoLinkText text={description} />
    </div>
  );
};

export default NoteDataDescription;
