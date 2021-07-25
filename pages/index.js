import { useState,useEffect } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import CourseCard from '../components/Cards/CourseCard';

export default function Home({courses}) {
//   const [courses,setCourses] = useState([]);
// useEffect(() => {
// fetchCourses()
// },[])
// const fetchCourses = () => {
//   axios.get(`${process.env.PUBLIC_URL}/all-courses`)
//       .then(res => {
//    setCourses(res.data.courses);
//       })
//       .catch(err => {
//           console.log(err)
//           toast.error(err.response.data.message)
//       })
// }
  return (
    <>
    
    <h1 className="jumbotron py-5 text-center bg-primary">Our Educational Marketplace</h1>
    <div className="container-fluid">
      <div className="row">
        {
          courses.map(el => {
            return <div key={el.id} className="col-md-4">
<CourseCard course={el} />
            </div>
          })
        }
      </div>

    </div>

    </>
  )
}
export async function getServerSideProps() {
 const {data} =  await axios.get(`${process.env.PUBLIC_URL}/all-courses`)
  return {
    props:{
      courses:data.courses
    }
  }
     
     
}