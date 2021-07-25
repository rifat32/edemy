import {useRouter} from 'next/router'
import UserRoutes from '../../../components/Routes/UserRoutes'
import { useEffect,useState } from 'react';
import axios from 'axios';
import {SyncOutlined} from '@ant-design/icons';
import { toast } from 'react-toastify';

const PaymentDetails = () => {
    const [courses,setCourses] = useState({});
    const [loading,setLoading] = useState(false)
    const [state,setState] = useState({
        payment_details:'',
        contact_info:''
    })
    
    
    const router = useRouter();
    const {slug} = router.query
    useEffect(() => {
  if(slug) {
    axios.get(`${process.env.PUBLIC_URL}/client-courses-payment/${slug}`)
    .then(response => {
        console.log(response)
        setCourses(response.data.courses)
    })
  }
      
    },[slug])
    const handleChange = (e) => {
    setState({...state,[e.target.name]:e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        axios.post(`${process.env.PUBLIC_URL}/paid-enrollment`,{
            slug,
            payment_details:state.payment_details,
            contact_info:state.contact_info
        }
        )
        .then(response => {
            console.log(response)
            setLoading(false)
            toast("We will preview your request.")
            router.push(`/course/${slug}`);
        })
        .catch(err => {
            setLoading(false)
            console.log(err.response)
            toast.error(err.response.data.message)
        })
    }
    return (
        <UserRoutes showNav={false}>
            {courses?(<div className="containe">
            <h1 className="jumbotron p-5 text-center bg-primary">Payment Details</h1>
            <strong className="d-block text-center bg-success mb-2">Our bkash number: +8801771034383</strong>
            <h5 className="text-center"> Course name: {courses.name} </h5>
      <p className="text-center h5">Price: BDT {courses.price}</p>
  <form onSubmit={handleSubmit}>
      <div className="form-group mb-2">
          <label htmlFor="payment_details" className="h5 d-block text-center">Payment Details</label>
          <textarea type="text" id="payment_details" name="payment_details" onChange={handleChange} value={state.payment_details} className="form-control"></textarea>
      </div>
      <div className="form-group mb-2">
          <label htmlFor="contact_info" className="h5 d-block text-center">Contact Info</label>
          <textarea rows="1" type="text" id="contact_info" name="contact_info" onChange={handleChange} value={state.contact_info} className="form-control"></textarea>
      </div>
      <div className="d-grid gap-2">
      <button type="submit" className="btn btn-primary p-2" disabled={!state.contact_info || !state.payment_details || loading} >
       {loading ? 
       <SyncOutlined  spin="true"/> :
       "Submit"
   }
   </button>
      </div>
    
  </form>



            </div>):null}
           
        </UserRoutes>
    )
}

export default PaymentDetails
