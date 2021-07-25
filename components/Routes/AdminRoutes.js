import {useEffect,useState,useContext} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router'
import {SyncOutlined} from '@ant-design/icons'
import AdminNav from '../Nav/AdminNav';
import { AppContext } from '../../context';

const AdminRoutes = ({children}) => {
    const [ok,setOk] = useState(false);
    const UAppContext = useContext(AppContext);
    const {state,setState,ready} = UAppContext 
    const router = useRouter();

    useEffect(() => {
if(ready){
    
      fetchInstructor();
}


    },[ready])
    const fetchInstructor = () => {
        
            axios.get(`${process.env.PUBLIC_URL}/current-admin`,

            )
            .then(res => {
            
             const {ok,user} =  res.data
                if(ok) {
                    setOk(true)
                     setState({...state,user})
    
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
                        <AdminNav/>
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

export default AdminRoutes