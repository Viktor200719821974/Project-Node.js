import React, {useState} from 'react';
import {addImageDevice} from "../../http/deviceApi";
import Button from "@mui/material/Button";

const AddImage = ({id}) => {
    const [file, setFile] = useState([]);
    console.log(file);
    const selectFile = e => {
        setFile(e.target.files[0]);
    }
    const addImageD = async () => {
        try{
            const formDatas = new FormData();
            formDatas.append('image', file);
            addImageDevice(id, formDatas).then(res => Promise.resolve(res).then(function (res){
                console.log(res);
                // if (res.status === 200){
                //     setLoadedPhoto(true);
                //     setStatusResponse(true);
            }));
        }catch (e) {
            console.log(e.message);
        }
    }
    return (
        <div>
            <form>
                <input type="file"  onChange={selectFile}/>
            </form>
            <Button onClick={addImageD} variant="outlined" color="success"/>
        </div>
    );
};

export default AddImage;