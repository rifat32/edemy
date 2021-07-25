import { useState, useEffect } from 'react';
import axios from 'axios'
import InstructorRoutes from '../../../components/Routes/InstructorRoutes';
import CourseCreateForm from '../../../components/Forms/CourseCreateForm';
import Resizer from "react-image-file-resizer";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const InstructorCreateCourse = () => {
    const router = useRouter()
    const [values, setValues] = useState({
        name: '',
        description: '',
        category: '',
        price: 999.99,
        uploading: false,
        paid: true,
        loading: false,
    })
    // const [imageGot,setImageGot] = useState(false)
    // const [image,setImage] = useState('')
    const [image, setImage] = useState('')
    const [imageId, setImageId] = useState('')
    const [preview, setPreview] = useState('')
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image')
    const handleImage = (e) => {
        setImage('')
        let file = e.target.files[0]
        setPreview(window.URL.createObjectURL(file));
        setUploadButtonText(file.name)
        setValues({ ...values, loading: true })

        Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, (uri) => {

            let data = new FormData();
            data.append('image', uri, uri.name);
            axios.post(`${process.env.PUBLIC_URL}/course/upload-image`, data, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                }
            })
                .then(response => {
                    setImage(response.data.image)
                    setImageId(response.data.imageId)
                    setValues({ ...values, loading: false })
                    console.log(response)
                })
                .catch(err => {
                    console.log(err)
                    setValues({ ...values, loading: false })
                    toast.error("Image upload failed. try again")
                })
        }, "file")

        if (file) {

        }
    }
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            ...values,
            image
        }
        console.log(data)
        axios.post(`${process.env.PUBLIC_URL}/course`, data)
            .then(response => {
               
                toast("Greate! Now you can Start adding lectures")
                router.push('/instructor')
            })
            .catch(err => {
                console.log(err)
                console.log(err.response)
                if(err.response.data.message) {
                    toast(err.response.data.message)
                }
                
                
            })
    }
    const handleImageRemove = async () => {

        setValues({ ...values, loading: false })
        
        axios.post(`${process.env.PUBLIC_URL}/course/remove-image`, {
            imageId
        })
            .then(res => {
                console.log('remove', res)
                setImage("")
                setPreview("")
                setUploadButtonText("Upload Image")
                setValues({ ...values, loading: false })
            })
            .catch(err => {
                console.log(err)
                setValues({ ...values, loading: false })
                toast.error("Image delete failed")
            })
    }
    const getUrlVars = (url) => {
        var hash;
        var myJson = {};
        var hashes = url.slice(url.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            myJson[hash[0]] = hash[1];
            // If you want to get in native datatypes
            // myJson[hash[0]] = JSON.parse(hash[1]); 
        }
        return myJson.id;
    }
   
    return (
        <InstructorRoutes>
            <h1 className="jumbotron p-5 text-center bg-primary">Create Course</h1>
            <div className="pt-3 pb-3">
                <CourseCreateForm value={{
                    handleSubmit, handleChange, values, setValues, handleImage, preview, uploadButtonText,
                    handleImageRemove, image
                }} />
            </div>
        </InstructorRoutes>
    )
}

export default InstructorCreateCourse
