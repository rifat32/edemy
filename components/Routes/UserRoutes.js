import {useEffect,useState,useContext} from 'react';
import axios from '../../utils/axios';
import {useRouter} from 'next/router'
import {SyncOutlined} from '@ant-design/icons'
import UserNav from '../Nav/UserNav';
import { AppContext } from '../../context';

const UserRoutes = ({children,showNav=true}) => {
    const [ok,setOk] = useState(false);
 
 
    const router = useRouter();
    useEffect(() => {
      
        
            fetchUser();
            
    


    },[])
    const fetchUser = () => {
        axios().get(`${process.env.PUBLIC_URL}/user`,
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
   router.push("/login")
   console.log(err.response)
 
        })
    }
   
        return (
            <>
            {
                !ok? <SyncOutlined spin="true" className="d-flex justify-content-center display-1 text-primary p-5"/>  : (
                  <div className="container-fluid"> 
                  <div className="row">
                    <div className="col-md-2">
                      {showNav && <UserNav/>}  
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

export default UserRoutes
