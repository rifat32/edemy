import {useState,useContext,useEffect} from 'react';
import axios from 'axios';
import {toast } from 'react-toastify';
import {SyncOutlined} from '@ant-design/icons';
import Link from 'next/link';
import { AppContext } from '../context';
import {useRouter} from "next/router"

const Register = () => {
 const [name,setName] = useState('');
 const [email,setEmail] = useState('');
 const [password,setPassword] = useState('');
 const [loading,setLoading] = useState(false);

 const RAppContext = useContext(AppContext);
    const {state,setState} = RAppContext
    const router = useRouter();
    const {user} = state
    useEffect(() => {
    if(user) {
 router.push("/")
    }
    },[user])
const handleSubmit =   (e) => {
    e.preventDefault();
    setLoading(true)
    const postData = {
        name,
        email,
        password
    }
     axios.post(`${process.env.PUBLIC_URL}/register`,postData
    )
    .then(response => {
        setLoading(false)
        console.log(response)
       const {ok,status}=  response.data
        if(ok) {
            toast("registration successful.Please Login")
            setEmail('')
            setName('')
            setPassword('')
            router.push("/login")
        }
        if(status === 422) {
            toast.error(response.data.errors[0])
        }
        
       
    })
    .catch(err=> {
        console.log(err)
        setLoading(false)
       
    })

   
}

    return (
        <>
             <h1 className="jumbotron p-5 text-center bg-primary">Register</h1>
             <div className="container col-md-4 offset-md-4 pb-5">
<form onSubmit={handleSubmit}>
<input name="name" type="text" className="form-control mb-4 p-4" value={name} onChange={e => setName(e.target.value)} placeholder="Enter Name" required  />
<input name="email" type="email" className="form-control mb-4 p-4" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Email" required  />
<input name="password" type="password" className="form-control mb-4 p-4" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Password" required  />

<div className="d-grid gap-2">
<button type="submit" className="btn btn-primary p-2" disabled={!name || !email || !password || loading} >
    {loading ? 
    <SyncOutlined  spin="true"/> :
    "Submit"
}
</button>
</div>
</form>
<p className="text-center p-3">
    Already registered {" "}
    <Link href="/login"><a>Login</a></Link>
</p>
             </div>
        </>
    )
}

export default Register
