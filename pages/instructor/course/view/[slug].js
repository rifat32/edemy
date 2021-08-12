import {useState,useEffect,} from 'react';
import { useRouter } from 'next/router';
import InstructorRoutes from '../../../../components/Routes/InstructorRoutes';
import axios from '../../../../utils/axios';
import { Avatar, Tooltip, Button,Modal } from 'antd';
import { EditOutlined, CheckOutlined, UploadOutlined, QuestionOutlined, CloseOutlined, UserSwitchOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
const gfm = require('remark-gfm')
import AddLessonForm from '../../../../components/Forms/AddLessonForm';
import { toast } from 'react-toastify';


const SingleCourse = () => {
    

    const [course,setCourse] = useState();
    const [lesson,setLesson] = useState([]);
    const [visible,setVisible] = useState(false)
    const [values,setValues] = useState({
        title:"",
        content:"",
        video:""
    })
    const [uploading,setUploading] = useState(false)
    const [uploadButtonText,setUploadButtonText] = useState("Upload Video")
    const [progress,setProgress] = useState(0)
    const [videoId,setVideoId] = useState("");
    const router = useRouter();
    const {slug} = router.query;
    useEffect(() => {
         if(slug){
            loadCourse()
        }
  
    },[slug])
    // @@@@@@@@@@@@@@@@ load course @@@@@@@@@@@@@@@@@@@
    const loadCourse = async () => {
        try{
            const {data} = await axios().get(`${process.env.PUBLIC_URL}/courses/${slug}`)
            setCourse(data.courses)
            setLesson(data.lessons)
            console.log(data.courses)
        }
        catch(err){
toast(err.response.data.message)
        }
  
    }
    // @@@@@@@@@@@@@@@@ end of load course @@@@@@@@@@@@@@@@@@@
      // @@@@@@@@@@@@@@@@ add lesson @@@@@@@@@@@@@@@@@@@
    const addLesson = async (e) => {
        e.preventDefault()
        console.log(values)
        try {
            const {data} = await   axios().post(`${process.env.PUBLIC_URL}/course/lesson`,
            {
                ...values,
                id:course.id
            }
            )
          setValues({...values,title:"",content:"",video:""})
            
            setVisible(false)
            setUploadButtonText("Upload Vodeo")
            toast("Lesson Added")
            console.log(data)
            await  axios().post(`${process.env.PUBLIC_URL}/number-of-lesson`,
            {
                id:course.id
            }
            )
            loadCourse()
           

           

        } catch(err) {
            console.log(err.response)
            toast.error("You must fill up all the field ")
        }
       
    }
      // @@@@@@@@@@@@@@@@ end of add lesson @@@@@@@@@@@@@@@@@@@
     // @@@@@@@@@@@@@@@@ handle video @@@@@@@@@@@@@@@@@@@
    const handleVideo = async (e) => {
  try {
    setUploading(true)
    const file = e.target.files[0];
    setUploadButtonText(file.name);
    let videoData = new FormData();
    videoData.append('video', file, file.name);
    const {data} = await   axios().post(`${process.env.PUBLIC_URL}/course/upload-video`, videoData, {
        onUploadProgress:(e) => {
            setProgress(Math.round((100 * e.loaded)/e.total))
        }
    } )
    console.log(data);
    setValues({...values, video:data.video})
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
     // @@@@@@@@@@@@@@@@ end of handle video @@@@@@@@@@@@@@@@@@@
     // @@@@@@@@@@@@@@@@ handle video remove @@@@@@@@@@@@@@@@@@@
    const handleVideoRemove = async () => {
        console.log("handle remove video")
        try {
            setUploading(true)
            const {data} = await   axios().post(`${process.env.PUBLIC_URL}/course/remove-video`,{
                videoId:videoId
            })
            console.log(data)
            setValues({...values,video:""})
            setUploading(false)
            setUploadButtonText("Upload another video")
        } catch(err) {
            setUploading(false)
            console.log(err.response)
            toast("Video Upload Failed")
        }
    }
      // @@@@@@@@@@@@@@@@ end of handle video remove @@@@@@@@@@@@@@@@@@@
      // @@@@@@@@@@@@@@@@ handle unpublish @@@@@@@@@@@@@@@@@@@
      const handleUnPublish = () => {
let answer = window.confirm(" Once you will unpublish your course. it will not be available for users to enroll")
if(!answer){return}
axios().put(`${process.env.PUBLIC_URL}/course/publish`, {
    id:course.id,
    published:false
  })
      .then(res => {
        toast("Your course is now unpublished")
          setCourse({...course, published:false})
      })
      .catch(err => {
          console.log(err.response)
          toast.error(err.response.data.message)
      })
      }
      // @@@@@@@@@@@@@@@@ end of handle unpublish @@@@@@@@@@@@@@@@@@@
      // @@@@@@@@@@@@@@@@ handle publish @@@@@@@@@@@@@@@@@@@
      const handlePublish = () => {
       
 let answer = window.confirm(" Once you will publish your course. it will be live in the marketplace")  
 if(!answer){return}
 axios().put(`${process.env.PUBLIC_URL}/course/publish`, {
    id:course.id,
    published:true
  })
      .then(res => {
        toast("congrats! Your course is now live")
          
        setCourse({...course, published:true})
      })
      .catch(err => {
          console.log(err.response)
          toast.error(err.response.data.message)
      })

    }
    // @@@@@@@@@@@@@@@@ end of handle publish @@@@@@@@@@@@@@@@@@@
    return (
        <InstructorRoutes>
            <div className="container-fluid pt-3">
{course && <div className="container-fluid pt-1">
<div className="row">
    <div className="col-1 pt-2">
  <Avatar size={80} src={course.image? course.image:"/course.jpg"}/>
    </div>
    <div className="col-10">
        <div className="row">
        <div className="col-11">
 <h5 className="mt-3 text-primary">{course.name} </h5>
 <p style={{ marginTop:"-10px" }} >{course.number_of_lessons} Lessons</p>
 <p style={{ marginTop:"-15px", fontSize:"10px" }} >{course.category}</p>
        </div>
        <div className="col-1 mt-4  ">
            <div className="d-flex ">
            <Tooltip title={course.total_enrollment}>
    <UserSwitchOutlined className="h5 text-info pointer me-4"
    />
  </Tooltip>
            <Tooltip title="edit">
    <EditOutlined className="h5 text-warning pointer me-4"
    onClick={() => {
        router.push(`/instructor/course/edit/${slug}`)
    }}
    />
  </Tooltip>
  {
  lesson.length < 5? (
      <Tooltip title="min 5 lessons is required to publish course">
   <QuestionOutlined className="h5 pointer text-danger"/>
      </Tooltip>
  ):(course.published?(
    <Tooltip title="unpublish"
    >
<CloseOutlined className="h5 pointer text-danger"onClick={handleUnPublish
}/>
    </Tooltip>
        ):(
    <Tooltip title="publish"
    >
           <CheckOutlined className="h5 pointer text-success"onClick={handlePublish
           }/>
     </Tooltip>        
        ))
  }
 
            </div>

  

        </div>

        </div>


        
    </div>
</div>
<div className="row">
    <div className="col">
     <ReactMarkdown remarkPlugins={[gfm]}>
    {course.description}
     </ReactMarkdown>

    
    </div>

</div>
<div className="row">
   <Button onClick={() => setVisible(true)}
   className="col-md-6 offset-md-3"
   type="primary"
   shape="round"
   icon={<UploadOutlined/>}
   size="large"
   >
   Add Lesson
   </Button>

</div>
<br/>
<Modal title="+ Add Lesson" centered visible={visible}
onCancel={() => setVisible(false)}
footer={null}
>
<AddLessonForm value={{values,setValues,addLesson,uploading,setUploading,uploadButtonText,setUploadButtonText,handleVideo, progress,handleVideoRemove}}/>
</Modal>

<div className="row pb-5">
 <div className="col lesson-list">
     <h4>
     {lesson.length && lesson.length} Lessons
     </h4>
     
    {lesson.length && <ul className="list-group">
        {lesson.map((el,indx) => {
 return  <li  key={indx} className="list-group-item"><Avatar>{indx + 1}</Avatar> {el.title}</li>
        })}
 
</ul>} 
 
 </div>

</div>

</div>  }
            </div>
        </InstructorRoutes>
    )
}

export default SingleCourse
