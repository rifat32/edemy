import { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import InstructorRoutes from '../../../../components/Routes/InstructorRoutes';
import CourseCreateForm from '../../../../components/Forms/CourseCreateForm'
import Resizer from "react-image-file-resizer";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { AppContext } from '../../../../context';
import { Avatar, Modal} from 'antd';
import {DeleteOutlined} from '@ant-design/icons'
import UpdateLessonForm from '../../../../components/Forms/UpdateLessonForm';

const CourseEdit = () => {
    const UAppContext = useContext(AppContext);
    const { ready } = UAppContext
    const router = useRouter()
    const { slug } = router.query;

    const [values, setValues] = useState({
        name: '',
        description: '',
        category: '',
        price: 9.99,
        uploading: false,
        paid: true,
        loading: false,
    })
    const [videoId,setVideoId] = useState("");
   
    const [image, setImage] = useState('')
    const [imageId, setImageId] = useState('')
    const [preview, setPreview] = useState('')
    const [lessons,setLessons] = useState([]);
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image')
    const [visible, setVisible] = useState(false);
   const [current, setCurrent] = useState({});
   const [uploadVideoButtonText, setUploadVideoButtonText] = useState('Upload Video')
   const [progress,setProgress] = useState(0);
   const [uploading,setUploading] = useState(false)
   const [updateState,setUpdateState] = useState(false)
    useEffect(() => {
        if ((ready && slug)) {

            loadCourse()

        }

    }, [ready, slug])
   
    const loadCourse = async () => {
        const { data } = await axios.get(`${process.env.PUBLIC_URL}/courses/${slug}`)
        console.log(data.courses)
        if (data.courses) {
            const { name, description, category, price, paid, image } = data.courses
            setValues({ ...values, name, description, category, price: parseFloat(price), paid })
            setImage(image)
            console.log(data.lessons)
             setLessons(data.lessons)


        }




    }
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
            image,
            slug 
        }
        console.log(data)
        axios.put(`${process.env.PUBLIC_URL}/course`,
         data
         )
            .then(response => {
              
                toast("Course updated")

            })
            .catch(err => {
                console.log(err.response)
                if(err.response.data.message) [
                    toast(err.response.data.message)
                ]
                

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

    const handleDelete = async (index) => {
  const answer = window.confirm("Are you sure you want to delete?");
  if(!answer){ return;}
  const allLessons = lessons;
   const removed = allLessons.splice(index,1)
//   const newLesson =  allLessons.map(el => el)
// setLessons(newLesson)
    setLessons(allLessons)
    setUpdateState(!updateState)

     const dataId = {id: removed[0].id}
   
     if(dataId.id){
      axios.post(`${process.env.PUBLIC_URL}/lesson/delete`,dataId)
      .then(response => {
          console.log(response)
      })
      .catch(err => {
        console.log(err.response)
      }) 
     }

  console.log("item deleted")
    }
    const handleVideoRemove = async (e) => {
        try {
            setUploading(true)
            const {data} = await   axios.post(`${process.env.PUBLIC_URL}/course/remove-video`,{
                videoId:videoId
            })
            console.log(data)
            setCurrent({...current,video:""})
          const currentMain =  lessons.find(el => {
              return  el.id === current.id
            })
            console.log("current main", currentMain)
            setCurrent({...current,video:currentMain.video})
            setVideoId("")
            setUploading(false)
            setUploadVideoButtonText("Upload another video")
        } catch(err) {
            setUploading(false)
            console.log(err.response)
            toast("Video Upload Failed")
        }
    }

    const handleVideo = async (e) => {
        try {
            setUploading(true)
            const file = e.target.files[0];
            setUploadVideoButtonText(file.name);
            let videoData = new FormData();
            videoData.append('video', file, file.name);
            const {data} = await   axios.post(`${process.env.PUBLIC_URL}/course/upload-video`, videoData, {
                onUploadProgress:(e) => {
                    setProgress(Math.round((100 * e.loaded)/e.total))
                }
            } )
            console.log(data);
            setCurrent({...current, video:data.video})
            setVideoId(data.videoId)
            setUploading(false)
            setProgress(0)
            console.log("handleVideo")
          } catch(err) {
            setUploading(false)
              console.log(err.response)
              toast("Video Upload Failed")
          }

    }
    const handleUpdateLesson = (e) => {
        e.preventDefault()
        axios.put(`${process.env.PUBLIC_URL}/course/lesson`, {
          ...current
        })
            .then(res => {
setVisible(false)
setUploadVideoButtonText("upload video")
toast("lesson updated")
loadCourse()
            })
            .catch(err => {
                console.log(err)
                toast.error(err.response.data.message)
            })

    }
    const handleDrag = (e,index) => {
// console.log("on drag",index)
e.dataTransfer.setData("itemIndex",index);
    }
    const handleDrop = (e,index) => {
        // console.log("on drop",index)
     const movingItemIndex =   e.dataTransfer.getData("itemIndex");
     const targetItemIndex = index;
     let allLessons = lessons
     let movingItem = allLessons[movingItemIndex];
     allLessons.splice(movingItemIndex,1)
     allLessons.splice(targetItemIndex,0,movingItem);
     
   const  allLessonsArr = allLessons.map((el,index) => {
         el.custom_id=index
         return el;
     })
     setLessons([...allLessonsArr])
     const chunkLessons = [];
     let i,j,temparray;
     j=allLessonsArr.length
     for (i=0; i<j; i+=5) {
         temparray = allLessonsArr.slice(i,i+5);
         // do whatever
         chunkLessons.push(temparray);
     }
     chunkLessons.map((el) => {
         
        axios.put(`${process.env.PUBLIC_URL}/drag`,
        {
            lessonsArr:el
        }
        )
           .then(response => {
             console.log(response.data)
          
   
           })
           .catch(err => {
               console.log(err.response)
               if(err.response.data.message) [
                   toast(err.response.data.message)
               ]
               
   
           })
     })
     
    }

    return (
        <InstructorRoutes>
            <h1 className="jumbotron p-5 text-center bg-primary">Update Course</h1>
            <div className="pt-3 pb-3">
                <CourseCreateForm value={{
                    handleSubmit, handleChange, values, setValues, handleImage, preview, uploadButtonText,
                    image,
                    editPage: true,
                    handleImageRemove

                }} />
            </div>
            <hr/>
            <div className="row pb-5">
 <div className="col lesson-list">
     <h4>
     {lessons.length && lessons.length} Lessons
     </h4>
     
    {lessons.length && <ul onDragOver={e => e.preventDefault()} className="list-group">
        {lessons.map((el,indx,item) => {
 return  <li
 draggable
 onDragStart={(e) => handleDrag(e,indx)}
 onDrop={(e) => handleDrop(e,indx)}
 key={indx} className="list-group-item pointer">
     <span onClick={() => {
  setVisible(true)
  setCurrent(item[indx])
     }} >
     <Avatar>{indx + 1}</Avatar> {el.title}
     </span>
   
 
  <DeleteOutlined className="text-danger float-end me-3" onClick={() => handleDelete(indx)}/></li>
        })}
 
</ul>} 
 
 </div>

</div>
<Modal title="Update Lesson" centered={true} visible={visible} 

onCancel={() => setVisible(false)}
footer={null}>
Update lesson form
<UpdateLessonForm value={
   {  
       current,
    setCurrent,
    handleVideo,
    handleUpdateLesson,
    uploadVideoButtonText ,
    uploading,
    progress,
    setValues,
    handleVideoRemove,
    videoId
}
} />
</Modal>
        </InstructorRoutes>
    )
}

export default CourseEdit
