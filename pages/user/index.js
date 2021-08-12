import {useContext,useEffect,useState} from 'react';
import {AppContext} from '../../context';
import UserRoutes from '../../components/Routes/UserRoutes';
import axios from '../../utils/axios'
import { Avatar } from 'antd';
import Link from 'next/link';
import { SyncOutlined,PlayCircleOutlined } from '@ant-design/icons';


const User = () => {
  const [courses,setCourses] = useState([]);
  const [loading,setLoading] = useState(false)
    const UAppContext = useContext(AppContext);
    const {user} = UAppContext;
    
    useEffect(() => {
    
        loadCourses()
    

    },[])
    const loadCourses = () => {
      setLoading(true)
axios().get(`${process.env.PUBLIC_URL}/user-courses`)
.then(response => {
console.log(response);
setCourses(response.data.courses)
setLoading(false)
})
.catch(err => {
  console.log(err.response)
  setLoading(false)
})
    }
    

        return (
            <UserRoutes>
          {loading && <SyncOutlined spin={true} className="d-flex justify-content-center display-1 text-danger p-5"/>}
           <h1 className="jumbotron p-5 text-center bg-primary">
             User Dashboard
              </h1>
               {
                 courses.length?(courses.map(el => {
                   return <div className="row pt-2 pb-1" key={el.id}>
                     <div className="col-1">
                     <Avatar size={80} shape="square" src={el.image?el.image:"course.png"}  />
                     </div>
                     <div className="col">
                    <Link href={`/user/course/${el.slug}`} className="pointer">
                      <a>
                        <h5 className="mt-2 text-primary">{el.name}</h5>
                      </a>
                    </Link>
                    <p style={{marginTop:"-10px"}}>{el.number_of_lessons} Lessons</p>
                    <p className="text-muted" 
                    style={{ 
                      marginTop:"-15px",
                      fontSize:"12px"
                     }}
                    >
 By {el.instructor_name}
                    </p>
                     </div>
                     <div className="col-1 me-5">
                     <Link href={`/user/course/${el.slug}`} className="pointer">
                      <a>
                        <PlayCircleOutlined className="h2 text-primary mt-4"/>
                      </a>
                    </Link> 
                     </div>

                   </div>
                 })):null
               }
        
            
                
            </UserRoutes>
        )
    
  
}

export default User
