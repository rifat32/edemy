import {useEffect,useState,} from 'react';
import axios from '../../utils/axios';
import {useRouter} from 'next/router'
import {SyncOutlined} from '@ant-design/icons'
import InstructorNav from '../Nav/InstructorNav';
import { AppContext } from '../../context';

const InstructorRoutes = ({children}) => {
    const [ok,setOk] = useState(false);
    

    const router = useRouter();

    useEffect(() => {

    
      fetchInstructor();



    },[])
    const fetchInstructor = () => {
        
            axios().get(`${process.env.PUBLIC_URL}/current-instructor`,

            )
            .then(res => {
            
             const {ok,user} =  res.data
                if(ok) {
                    setOk(true)
    
                      window.localStorage.setItem("user",JSON.stringify(user));
                }
        
            })
            .catch((err) => {
       console.log(err)
       setOk(false)
       router.push("/")
    
            })
        
    
    }
   
        return (
            <>
            {
                !ok? <SyncOutlined spin="true" className="d-flex justify-content-center display-1 text-primary p-5"/>  : (
                  <div className="container-fluid"> 
                  <div className="row">
                    <div className="col-md-2">
                        <InstructorNav/>
                    </div>
                    <div className="col-md-10">
                    {children} 
                    </div>

                  </div>
                
                   </div>
                )
            }
            
                
            </>
        )
    
  
}

export default InstructorRoutes
