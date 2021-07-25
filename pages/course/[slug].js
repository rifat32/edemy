import axios from "axios"
import { useState, useEffect,useContext } from "react"
import { useRouter } from "next/router";
// import { Badge, Modal } from "antd";
// import { currencyFormatter } from "../../utils/helpers";
// import ReactPlayer from "react-player";
import SingleCourseJumbotrone from "../../components/Cards/SingleCourseJumbotrone";
import PreviewModal from "../../components/Modal/PreviewModal";
import SingleCourseLessons from "../../components/Cards/SingleCourseLessons";
import { AppContext } from "../../context";
import { toast } from "react-toastify";


const SingleCourse = ({courses,lesson}) => {
  const [showModal, setShowModal] = useState(false)
  const [preview,setPreview] = useState("");
  const [loading,setLoading] = useState(false);
  const [enrolled,setEnrolled] = useState(false);
  const [pending,setPending] = useState(false);
  const UAppContext = useContext(AppContext);
  const {state,ready} = UAppContext
  const {user} = state
    const router = useRouter();
    const {slug} = router.query;
    const {name,description,price,image,category,instructor_name,updated_at,paid} = courses
  const  lessons = lesson.sort((a,b) => {
    if ( a.custom_id < b.custom_id ){
      return -1;
    }
    if ( a.custom_id > b.custom_id ){
      return 1;
    }
    return 0;
  })
  const checkEnrollment = () => {
    setLoading(true)
    axios.get(`${process.env.PUBLIC_URL}/check-enrollment/${slug}`
    )
    .then(response => {
      setLoading(false)
setEnrolled(response.data.ok)
console.log(response.data)
if(!response.data.ok) {
  setPending(response.data.pending)
}
    })
    .catch(err => {  
      setLoading(false)
      console.log(err.response)
    })
  }
  useEffect(() => {
    if ((ready && slug)) {
      checkEnrollment()
  }
  },[ready, slug])
  const handlePaidEnrollment = () => {
    console.log("handle paid")
    if(!user) {
      router.push("/login")
      return
    }
    if(enrolled) {
      router.push(`/user/course/${slug}`)
      return
     }
     router.push(`/bikash/payment-details/${slug}`)
  }
  const handleFreeEnrollment = (e) => {
   e.preventDefault();
   setLoading(true)
   if(!user) {
     router.push("/login")
     return
   }
   if(enrolled) {
    router.push(`/user/course/${slug}`)
    return
   }
   axios.post(`${process.env.PUBLIC_URL}/free-enrollment`,{
     slug
   })
   .then(response => {
    setLoading(false)
    toast("You are successfully enrolled")
    setEnrolled(true);
    router.push(`/user/course/${slug}`)
    console.log(response.data)
   })
   .catch(err => {
     toast(err.response.data.message)
     setLoading(false)
     console.log(err.response.data.message)
   })
  }
 
 

    return (
        <>
          
           
           <SingleCourseJumbotrone values={{ 
             courses,
             lessons,
             showModal,
             setShowModal,
             preview,
             setPreview,
             user,
             loading,
             handleFreeEnrollment,
             handlePaidEnrollment,
             enrolled,
             setEnrolled,
             pending


            }}/>
            
              <PreviewModal values={{
                showModal,
                setShowModal,
                preview
              }}/> 
            
        {
          lessons.length? <SingleCourseLessons
          values={{ 
            lessons,
            setPreview,
            showModal,
            setShowModal,
            paid:courses.paid
            
           }}
          />: null
        }
            
        </>
    )
}
export async function getServerSideProps({query}) {
 const {data} =  await axios.get(`${process.env.PUBLIC_URL}/client-courses/${query.slug}`)
 return {
    props:{
      courses:data.courses,
      lesson:data.lessons
    }
  }
}
export default SingleCourse
