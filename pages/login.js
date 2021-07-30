
import {useState, useContext,useEffect} from 'react';
import axios from 'axios';
import {toast } from 'react-toastify';
import {SyncOutlined} from '@ant-design/icons';
import Link from 'next/link';
import { AppContext } from '../context';
import {useRouter} from "next/router"


const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);

    const LAppContext = useContext(AppContext);
    const {state,setState,setChangeState,
        changeState} = LAppContext
     
    const router = useRouter();
    const {user} = state
    useEffect(() => {
    if(user) {
       router.push("/");
    }

    
    },[user])
    

 
   
   const handleSubmit =   (e) => {
       e.preventDefault();
       setLoading(true)
       const postData = {
           email,
           password
       }
        axios.post(`${process.env.PUBLIC_URL}/login`,postData
       )
       .then(response => {
           setLoading(false)
          const {ok,user,token}=  response.data
         
           setState({user:user,token})
          
           setChangeState(!changeState)
       
             window.localStorage.setItem("user",JSON.stringify(user))
             window.localStorage.setItem("token",JSON.stringify(token))
            console.log(user,token)
            
            location.replace("https://edemy-next.herokuapp.com/"); 
          
          
           
          
       })
       .catch(err=> {
        if(err.response.status === 422) {
            toast.error("Invalid Credentials")
           }
           console.log(err)
           setLoading(false)
           
       })
   
      
   }

   

                    
                       return (
                        <>
    <h1 className="jumbotron p-5 text-center bg-primary">Login</h1>
                <div className="container col-md-4 offset-md-4 pb-5">
   <form onSubmit={handleSubmit}>
   <input name="email" type="email" className="form-control mb-4 p-4" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Email" required  />
   <input name="password" type="password" className="form-control mb-4 p-4" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Password" required  />
   
   <div className="d-grid gap-2">
   <button type="submit" className="btn btn-primary p-2" disabled={!email || !password || loading} >
       {loading ? 
       <SyncOutlined  spin="true"/> :
       "Submit"
   }
   </button>
</div>
   </form>
   <p className="text-center pt-3">
      Not yet registered {" "}
       <Link href="/register"><a>Register</a></Link>
   </p>
   <p className="text-center">
      Forgot password? {" "}
       <Link href="/forgot-password"><a className='text-danger'>Forgot Password</a></Link>
   </p>
                </div>
                        </>
                       )
 

               
            
        
       
   }

export default Login
