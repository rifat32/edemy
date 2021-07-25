import { useRouter } from "next/router";
import axios from 'axios';
import { useState, useEffect,useContext, createElement } from "react";
import { AppContext } from "../../../context";
import StudentRoutes from "../../../components/Routes/StudentRoutes";
import { Button,Menu, Avatar, } from "antd";
import ReactPlayer from "react-player";
import ReactMarkdown from "react-markdown";
import { PlayCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined, CheckCircleFilled, MinusCircleFilled,SyncOutlined } from "@ant-design/icons";
const gfm = require('remark-gfm')


const SingleCourse = () => {
  const [clicked,setClicked] = useState(-1);
  const [collapsed,setCollapsed] = useState(false)
    const [loading,setLoading] = useState(false);
    const [courses,setCourses] = useState({});
    const [lessons,setLessons] = useState([]);
    const [completedLessons,setCompletedLessons] = useState([]);
    const [updateState,setUpdateState] = useState(false)
    const router = useRouter();
    const {slug} = router.query;
    const UAppContext = useContext(AppContext);
    const {state,setState,ready} = UAppContext;
    useEffect(() => {
        if(ready && slug){
          loadCourses()
          loadCompletedLessons()
      }
  
      },[ready,slug])
    
      const loadCourses = () => {
        setLoading(true)
        axios.get(`${process.env.PUBLIC_URL}/user-courses/${slug}`)
        .then(response => {
        console.log(response);
        setCourses(response.data.courses)
        setLessons(response.data.lessons)
        setLoading(false)
        })
        .catch(err => {
          console.log(err.response)
          setLoading(false)
        })
      }
      const loadCompletedLessons = () => {
        axios.post(`${process.env.PUBLIC_URL}/list-completed`,{
          course_slug:slug
        })
        .then(response => {
          console.log('completed lessons',response.data.lessons)
          const completedLessonArr = response.data.lessons.map(el => {
            return el.lesson_id
          });
          setCompletedLessons(completedLessonArr)
        })
        .catch(err => {
          console.log(err.response)
        })
      }
      const markCompleted = () => {
        setCompletedLessons([...completedLessons,lessons[clicked].id])
        axios.post(`${process.env.PUBLIC_URL}/complete-lesson`,{
          course_slug:slug,
          lesson_id : lessons[clicked].id
        })
        .then(response => {
          console.log(response.data)
          // loadCompletedLessons()
         
        })
        .catch(err => {
          console.log(err.response)
        })
      }
    
      const markInCompleted = () => {
        const all = completedLessons;
        const index = all.indexOf(lessons[clicked].id)
        if(index > -1){
          all.splice(index,1);
          setCompletedLessons(all)
          setUpdateState(!updateState);
        }
        axios.post(`${process.env.PUBLIC_URL}/incomplete-lesson`,{
          course_slug:slug,
          lesson_id : lessons[clicked].id
        })
        .then(response => {
          console.log(response.data)
          //  loadCompletedLessons()
         
        })
        .catch(err => {
          console.log(err.response)
        })
      }
    return (
        <StudentRoutes>
          {lessons.length?(
              <div className="row">
              <div style={{ 
                maxWidth: 320
               }}>
                 <div className="d-grid gap-2">
                 <Button onClick={() => setCollapsed(!collapsed)} className="text-primary mt-1 mb-2">
  {createElement(collapsed?MenuUnfoldOutlined:MenuFoldOutlined) }
  {!collapsed?"Lessons":""}
  
                 </Button>
                 </div>
                
   <Menu defaultSelectedKeys={[clicked]} inlineCollapsed={collapsed} style={{ 
     height:"80vh",
     overflow:"scroll"
    }}>
     {lessons.length?(lessons.map((el,index) => {
   return (<Menu.Item key={index} onClick={() => setClicked(index)} icon={<Avatar>{index + 1}</Avatar>}>
  {el.title.substring(0,30)}
  {completedLessons.includes(el.id)?
  (<CheckCircleFilled className="float-end ms-2 text-primary" 
  style={{ marginTop:"13px" }}/>)
  :
  (<MinusCircleFilled 
  className="float-end ms-2 text-danger" 
  style={{ marginTop:"13px" }}/>)}
   </Menu.Item>)
  
     })):null}
   </Menu>
              </div>
              <div className="col">
                {clicked !==-1 ?(<div className="col alert alert-primary">
  
  {clicked!== -1  && <b>{lessons[clicked].title.substring(0,30)}</b> }
  {clicked!== -1 ? (completedLessons.includes(lessons[clicked].id)?<span className="float-end pointer"  onClick={markInCompleted}>Mark as incompleted</span>:
  
  <span className="float-end pointer"  onClick={markCompleted}>Mark as completed</span>):null }
  
  </div>): null}
  
  
  {clicked!==-1?(<>
  <div className="wrappper">
  <ReactPlayer className="player" url={lessons[clicked].video} widht="100%" height="100%" controls onEnded={() => markCompleted()} />
  </div>
  <ReactMarkdown 
  remarkPlugins={[gfm]} 
   className="single-post"
  >
    lessons[clicked].content
  </ReactMarkdown>
  
  
  </>):<div className="d-flex justify-content-center p-5">
    <div className="text-center p-5">
  <PlayCircleOutlined className="text-primary display-1 p-5"/>
  <p className="lead"> Click on the lessons to start learning. </p>
  
  
    </div>
  
    </div>}
              </div>
            </div>
          ):
          (loading?<SyncOutlined/>: 
          
          <div><h1 className="text-center text-danger">Course not found</h1></div>)}
        
        </StudentRoutes>
    )
}

export default SingleCourse
