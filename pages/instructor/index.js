import {useEffect,useState,useContext} from 'react';
import axios from '../../utils/axios';
import InstructorRoutes from '../../components/Routes/InstructorRoutes';
import { Avatar, Tooltip } from 'antd';
import Link from 'next/link';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { AppContext } from '../../context';
  

const Instructorindex = () => {
    const UAppContext = useContext(AppContext);

    const [courses,setCourses] = useState([]);
    useEffect(() => {
      
            loadCourses()
        
    },[]);
    const loadCourses = () => {
        
        axios().get(`${process.env.PUBLIC_URL}/instructor-courses`)
        .then(response => {
            console.log(response.data)
             setCourses(response.data.courses)
        })
    }
    console.log(courses)
    const myStyles = {
        marginTop:"-15px",
        fontSize:"10px",

    }
    return (
       
        <InstructorRoutes>
              <h1 className="jumbotron p-5 text-center bg-primary">Instructor Dashboard</h1>
              {
                  courses.length && courses.map(el => {
                   return   <div key={el.id} className="row pt-2">
                      <div className="col-1 pt-2">
   <Avatar size={80} src={el.image? el.image:"/course.jpg"}  />
  
                      </div>
                      <div className="col-11   pt-3 ">
<div className="row">
    <div className="col">
<Link href={`/instructor/course/view/${el.slug}`} className="pointer">
  <a className="text-primary">
      <h5 className="pt-2 text-dark" >
      {el.name}
      </h5>
      
      </a>

</Link>
<p style={{ marginTop:"-7px" }}>{el.number_of_lessons} Lessons</p>
{el.number_of_lessons < 5?(
    <p style={myStyles} className="text-warning">At least 5 lessions are required to publish a course</p>
): (el.published?(
    <p style={myStyles} className="text-success">Your course is live in the marketplace</p>
):(
    <p style={myStyles} className="text-primary">Your course is ready to be published</p>
)) }

    </div>
    <div className="col-md-3 mt-3 text-center">
        {el.published?(
        <Tooltip title="published">
   <CheckCircleOutlined className="h5 pointer text-success"/>
        </Tooltip>
            ):(
        <Tooltip title="unPublished">
               <CloseCircleOutlined className="h5 pointer text-warning"/>
         </Tooltip>        
            )}
    </div>
</div>
                      </div>
                       </div>
                  })
              }
        </InstructorRoutes>
    )
}

export default Instructorindex
