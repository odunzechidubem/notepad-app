/* eslint-disable react/prop-types */
// Note.js

function Note(props) {
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      {props.image && <img src={URL.createObjectURL(props.image)} alt="Uploaded" />} {/* Display image if available */}
      <button onClick={() => props.onDelete(props.id)}>DELETE</button>
    </div>
  );
}

export default Note;
