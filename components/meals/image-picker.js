'use client';
import { useRef, useState } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker({label, name}){
    const [pickedImage, setPickedImage] = useState();
    const imageInput = useRef();
    
    function handlePickClick(){
        imageInput.current.click();
    }

    function handleImageChange(event){
        const file = event.target.files[0];
        if(!file){
            setPickedImage(null);
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }

    return <div className={classes.picker}>
        <label htmlFor={name}>{label}</label>
        <div className={classes.controls}>
            <div className={classes.preview}>
                {!pickedImage && <p>No Image picked yet.</p>}
                {pickedImage && <Image src={pickedImage} alt="Picked" fill />}
            </div>
            <input  
                ref={imageInput} 
                className={classes.input}
                type="file" 
                id={name} 
                name={name} 
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleImageChange}
                required
            />
                
            <button 
                className={classes.button} 
                type="button" 
                onClick={handlePickClick}>
                    Upload Image
            </button>
        </div>
    </div>
}