import {useState,useEffect,useContext} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'
import { SyncOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { AppContext } from '../context';
import router, { useRouter } from 'next/router';


const ForgotPassword = () => {
    const [email,setEmail] = useState('');
    const [success,setSuccess] = useState(false);
    const [code,setCode] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const [loading,setLoading] = useState(false); 
    const FAppContext = useContext(AppContext);
    const {user} = FAppContext
   const router = useRouter();
  
   useEffect(() => {

if(user) {
    router.push('/')
}
   },[user])
   const handleSubmit = (e) => {
 e.preventDefault();
 setLoading(true)
axios.post(`${process.env.PUBLIC_URL_NODEJS}/send-email`,{email})
.then(res => {
    console.log(res)
    setLoading(false)
    setSuccess(true)
    toast("check your email for secret code")
})
.catch(err => {
  
    console.log(err.response);
    setLoading(false)
    setSuccess(false)
    if(err.message === "Request failed with status code 404") {
        toast("User not found")
    }
   
   
}) 
   }

   const handleResetPassword = (e) => {
    e.preventDefault();
    setLoading(true)
    axios.post(`${process.env.PUBLIC_URL}/verify-token`,{
        email,
        token:code,
        password:newPassword
    })
    .then(res => {
        setLoading(false);
        setCode('')
        setEmail('')
        setNewPassword('')

        toast("Great! Now you you can login with new password")
    })
    .catch(err => {
        console.log(err.response.data.message)
        if(err.response.data.message == "token expired") {
            setCode('')
        setNewPassword('')
        setSuccess(false)
        }
        setLoading(false)
        toast(err.response.data.message)
    }) 
   }



    return (
        <>
             <h1 className="jumbotron p-5 text-center bg-primary">Forgot Password</h1> 
             <div className="container col-md-4 offset-md-4 pb-5">
  <form onSubmit={success?handleResetPassword: handleSubmit}>
      <input type="email"
       className="form-control mb-4 p-4" 
       value={email}
       onChange={e => setEmail(e.target.value)}
       placeholder="Enter Email"
       required
       name="email"
       />
       {success && <>
        <input type="text"
       className="form-control mb-4 p-4" 
       value={code}
       onChange={e => setCode(e.target.value)}
       placeholder="Enter secret code"
       required
      
       />
        <input type="password"
       className="form-control mb-4 p-4" 
       value={newPassword}
       onChange={e => setNewPassword(e.target.value)}
       placeholder="Enter Password"
       required
       name="password"
       />
       
       </>}
       <br/>
       <div className="d-grid gap-2">
       <button type="submit" className="btn btn-primary p-2" disabled={!email || loading} >
       {loading ? 
       <SyncOutlined  spin="true"/> :
       "Submit"
   }
   </button>
       </div>
       
  </form>
             </div>
        </>
    )
}

export default ForgotPassword
