import {useEffect,useState,useContext} from 'react';
import axios from '../../utils/axios';
import {useRouter} from 'next/router'
import {SyncOutlined} from '@ant-design/icons'
import { AppContext } from '../../context';

const StudentRoutes = ({children}) => {
    const [ok,setOk] = useState(false);
    const UAppContext = useContext(AppContext);

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
 
        })
    }
   
        return (
            <>
            {
                !ok? <SyncOutlined spin="true" className="d-flex justify-content-center display-1 text-primary p-5"/>  : (
                  <div className="container-fluid"> 
                {children}
                
                   </div>
                )
            }
            
                
            </>
        )
    
  
}

export default StudentRoutes
