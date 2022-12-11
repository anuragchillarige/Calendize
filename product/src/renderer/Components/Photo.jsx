import React, { useEffect } from 'react';
import NavigationBar from './NavigationBar';
import { useState, useRef } from 'react';
import '../Styles/Images.css'
import { } from 'bootstrap-icons'

function Photo() {

  let [pics, setPics] = useState(null)

  function inputChange(e) {
    const file = e.target.files[0]
    let added = true;
    if (!file) return;
    getBase64(file).then(base64 => {
      let arr = []
      if (localStorage.getItem("pictures")) {
        arr = JSON.parse(localStorage.getItem("pictures"))
      }
      if (arr.includes(base64) === false) arr.push(base64)
      else {
        (alert("this file has already been added."))
          (alert("this image has already been added."))
        added = false;
      }
      localStorage.setItem("pictures", JSON.stringify(arr))
      try {
        localStorage.setItem("pictures", JSON.stringify(arr))
      } catch (e) {
        added = false
        alert("Unable to add image")
      }

      if (added) {
        alert("Your image was successfully saved!")
        setPics(JSON.parse(localStorage.getItem("pictures")))
      }
    })

  }
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
      reader.readAsDataURL(file)
    })
  }
  function deleteImages() {
    localStorage.clear()
    alert("Images successfully cleared.")
    setPics(JSON.parse(localStorage.getItem("pictures")))
  }

  function delImage(i) {
    let arr = JSON.parse(localStorage.getItem("pictures"))
    arr.splice(i, 1);
    localStorage.setItem("pictures", JSON.stringify(arr))
    setPics(JSON.parse(localStorage.getItem("pictures")))
  }

  useEffect(() => {
    setPics(JSON.parse(localStorage.getItem("pictures")))
  }, [])

  return (
    <div className="image-holder">
      <NavigationBar text={"photo"} />
      <form onSubmit={e => { e.preventDefault(); console.log((JSON.parse(localStorage.pictures))) }}>
        <h1> Please upload image files to add to events to your calendar </h1>
        <label htmlFor="file-input" className='file-label'><i class="bi bi-upload"></i>Upload Image</label>
        <input id="file-input" type="file" accept="image/jpg, image/jpeg, image/svg, image/png" onChange={(e) => inputChange(e)} />
      </form>
      <button className="delete-button" onClick={() => deleteImages()}>Clear all images</button>
      <h2>View Added Images</h2>
      <div className="image-gallery">
        {pics !== null ? pics.map((img, index) => <div className="gallery-image" key={index}><i className="bi bi-x delete-image" onClick={() => delImage(index)}></i><img className="gallery-img" src={img} /></div>) : <>Loading...</>}
      </div>
    </div>
  );
}
export default Photo;
