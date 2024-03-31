// CreateArea.js
import { useState, useRef } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
    image: null
  });

  // Create a ref for the file input element
  const fileInputRef = useRef(null);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function resizeImage(image, maxWidth, maxHeight, quality = 0.8) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const imageObj = new Image();
      imageObj.src = URL.createObjectURL(image);

      imageObj.onload = () => {
        let width = imageObj.width;
        let height = imageObj.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(imageObj, 0, 0, width, height);

        canvas.toBlob(
          blob => {
            resolve(new File([blob], image.name, { type: "image/jpeg", lastModified: Date.now() }));
          },
          "image/jpeg",
          quality
        );
      };

      imageObj.onerror = error => {
        reject(error);
      };
    });
  }

  function handleImageChange(event) {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      resizeImage(selectedImage, 300, 300) // Resize to maximum width and height of 300px
        .then(resizedImage => {
          setNote(prevNote => ({
            ...prevNote,
            image: resizedImage
          }));
        })
        .catch(error => {
          console.error("Error resizing image:", error);
        });
    }
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
      image: null
    });
    // Clear the file input value
    fileInputRef.current.value = "";
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
        {/* Use ref to access the file input element */}
        <input type="file" onChange={handleImageChange} ref={fileInputRef} />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
