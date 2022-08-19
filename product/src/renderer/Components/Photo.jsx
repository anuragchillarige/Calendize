import React, { useEffect } from 'react';
import NavigationBar from './NavigationBar';
import { useState, useRef } from 'react';
function Photo() {

    const imgRef = useRef();
    let index = 0

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
                added = false;
            }
            localStorage.setItem("pictures", JSON.stringify(arr))

            if (added) {
                alert("Your image was successfully saved!")
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
    }

    return (
        <>
            <div style={{ height: "100vh" }}>
                <NavigationBar text={"photo"} />
                <form onSubmit={e => { e.preventDefault(); console.log((JSON.parse(localStorage.pictures))) }}>
                    <h1> Please upload image files to add to events to your calendar </h1>
                    <input type="file" accept="image/jpg, image/jpeg, image/svg, image/png" onChange={(e) => inputChange(e)} />
                    <button type="submit">Submit</button>
                </form>
                <button onClick={() => deleteImages()}>Clear all images</button>
                <img src="" alt="" className='canvas' ref={imgRef} width={100} />
            </div>
        </>

    );
}
export default Photo;
