import React, { useState } from 'react';
import axios from "axios";

const ImageForm = () => {

const [file, setFile] = useState(null);
const [imgFile, setImgFile] = useState('');


const handleFileChange = (event) => {
    setFile(event.target.files);
    console.log(file)
}

const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    for(var x = 0; x<file.length; x++) {
        data.append('file', file[x])
    }
    axios.post("http://localhost:5342/bot/sendembed", data)
    .then(res => { 
        console.log(res.data.filename)
        setImgFile('http://localhost:5342/public/images/'+res.data.filename)
    })
}

return ( 
    <div>
       <form >
        <div className="form-group" >

            <label htmlFor="file">Upload File:</label>
            <input 
            className="form-control-file mb-3" 
            type="file" id="file" 
            accept="image/*"
            multiple
            onChange={handleFileChange}
            />

            <button 
            className="btn btn-primary mt-3" 
            onClick={handleSubmit}
            >Upload</button>
        </div>
       </form>

       <img src={imgFile} alt="img"/>
    </div>
 );
}

export default ImageForm;
