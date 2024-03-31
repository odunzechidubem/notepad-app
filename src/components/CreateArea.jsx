/* eslint-disable react/prop-types */
// CreateArea.js
import { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
    image: null  // Added image state
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function handleImageChange(event) {
    setNote(prevNote => ({
      ...prevNote,
      image: event.target.files[0] // Store the selected image
    }));
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
      image: null
    });
    event.preventDefault();
  }

  return (
    <div>
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <input type="file" onChange={handleImageChange} /> {/* Image upload input */}
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
