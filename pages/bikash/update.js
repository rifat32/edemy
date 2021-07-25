import {useContext,useState,useEffect} from 'react';
import { AppContext } from '../../context';

import {useRouter} from 'next/router';
import { toast } from 'react-toastify';
import axios from 'axios';
import { SyncOutlined } from '@ant-design/icons';
import InstructorRoutes from '../../components/Routes/InstructorRoutes';

const UpdateBkash = () => {
    const BAppContext = useContext(AppContext);
    const {state,setState} = BAppContext 
    const {user} = state;
    const [num,setNum] = useState("");
    const [loading,setLoading] = useState(false);
    const router = useRouter();
    useEffect(() => {
        user && setNum(user.bikashNumber)
    },[user])
    const handleSubmit = (e) => {
     e.preventDefault();
     setLoading(true);
     axios.post(`${process.env.PUBLIC_URL}/make-instructor`,{num},
    )
     .then(res => {
        setLoading(false);
         if(res.data.ok){
             console.log('success')
             setState({...state,user:{...user,bikashNumber:num}})
        
         }
     })
     .catch(err=> {
        setLoading(false);
         toast(err.data)
     });
    }
   

    return (
        <InstructorRoutes>
            <div className="row my-5">
                <div className="col-md-4 offset-md-4">
                    <h3 className="text-center">Enter your bikash number</h3>
                <form onSubmit={handleSubmit}>
               <input type="text" className="form-control mb-3" value={num} onChange={e => setNum(e.target.value)}/>
               <div className="d-grid gap-2">
   <button type="submit" className="btn btn-primary p-2" disabled={!num || loading} >
       {loading ? 
       <SyncOutlined  spin="true"/> :
       "Submit"
   }
   </button>
</div>
                 </form>
                </div>

            </div>
            
        </InstructorRoutes>
    )
}

export default UpdateBkash
