import {useEffect,useState,useContext} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router'
import {SyncOutlined} from '@ant-design/icons'
import UserNav from '../Nav/UserNav';
import { AppContext } from '../../context';

const UserRoutes = ({children,showNav=true}) => {
    const [ok,setOk] = useState(false);
    const UAppContext = useContext(AppContext);
    const {state,setState,ready} = UAppContext 
    const router = useRouter();
    useEffect(() => {
      
        if(ready){
            fetchUser();
              console.log('ghdjd')
        }


    },[ready])
    const fetchUser = () => {
        axios.get(`${process.env.PUBLIC_URL}/user`,
        )
        .then(res => {
         const {ok,user} =  res.data
            if(ok) {
                setOk(true)
                setState({...state,user})
               window.localStorage.setItem("user",JSON.stringify(user));
            }
    console.lof(res)
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
