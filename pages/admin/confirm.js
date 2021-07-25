import {useEffect,useState} from 'react';
import AdminRoutes from '../../components/Routes/AdminRoutes';
import axios from 'axios';

const Confirm = () => {
    const [payments,setPayments] = useState([]);
    useEffect(()=> {
    loadPayments();
    },[]);
    const loadPayments = () => {
axios.get(`${process.env.PUBLIC_URL}/all-payment`)
.then(response => {
setPayments(response.data.payments)
console.log(response)
})
.catch(err => {
    console.log(err.response)
})
    }
    const handleConfirm = (el) => {
        console.log(el)
        axios.post(`${process.env.PUBLIC_URL}/confirm-payment`,{
            id:el.id,
            user_id:el.user_id,
            course_slug:el.course_slug,
            price:el.price,
            
        })
        .then(response => {
            console.log(response)
            loadPayments();
        })
        .catch(err => {
            console.log(err.response)
        })
     
    }
    return (
        <AdminRoutes>
             <h1 className="jumbotron p-5 text-center bg-primary"> List Of Pending Payments</h1>
            
            <table className="table table-striped table-responsive">
  <thead>
    <tr>
        <th>
           Course 
        </th>
        <th>
           Price 
        </th>
        <th>
           User Id 
        </th>
        <th>
          Payment
        </th>
        <th>
          Contact
        </th>
        <th>
         Action
        </th>
    </tr>
  </thead>
  <tbody>
{payments.length?
    (payments.map(el => {
        return  (
        <tr key={el.id}>
            <td>
               {el.course_slug}
            </td>
            <th>
               {el.price}
            </th>
            <th>
               {el.user_id}
            </th>
            <th>
             {el.payment_details}
            </th>
            <th>
             {el.contact_info}
            </th>
            <th>
            <a className="btn btn-primary" onClick={() => {
                handleConfirm(el)
            }}>
        Confirm
            </a>
            </th>
        </tr>
       )
    }))
   
:null}
 </tbody>
  
  
            </table>

    

        </AdminRoutes>
    )
}

export default Confirm
