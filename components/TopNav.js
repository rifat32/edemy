
import { Menu } from 'antd';
import Link from 'next/link'
import {AppstoreAddOutlined,LoginOutlined,UserAddOutlined, CoffeeOutlined
,CarryOutOutlined, TeamOutlined
} from '@ant-design/icons'
import { useState, useEffect,useContext } from 'react';
import {AppContext} from '../context';
import {toast } from 'react-toastify';
import {useRouter} from 'next/router';
import User from '../pages/user';
import axios from 'axios';




const TopNav = () => {
 const [current,setCurrent] = useState("")
 const TAppContext = useContext(AppContext);
  const {state,setState,
    setReady} = TAppContext 
  const {user,token} = state;
  const router = useRouter()
  
  const logout =  () => {
    axios.post(`${process.env.PUBLIC_URL}/logout`)
    .then(response => {
        setState({...state,user:null,token:null});
        window.localStorage.clear();
        setReady(false)
        toast("Signout Success");
      location.replace("https://edemy-next.herokuapp.com/");  
    })
    .catch(err => {
        console.log(err.response)
    })
      
      
  }


 useEffect(() => {

     process.browser && setCurrent(window.location.pathname)

console.log(window.location.pathname)
 },[process.browser && window.location.pathname])
 const {Item, SubMenu,ItemGroup } = Menu
    return (
        <Menu mode="horizontal" selectedKeys={[current]} >
           <Item  
           key="/" 
           icon={<AppstoreAddOutlined/>}
           onClick={e => setCurrent(e.key)}
           className="ms-3"
           >
               <Link href='/'>
                   <a className=''>Edemy </a>
               </Link>
           </Item>
         {
             user ? (user.role && user.role.includes("instructor"))?(
                <Item
                key="/instructor/course/create" 
                icon={<CarryOutOutlined/>}
                onClick={e => setCurrent(e.key)}
                >
   
                  <Link href='/instructor/course/create'>
                      <a className=''>Create Course </a>
                  </Link>
              </Item>
             ):(
                <Item
                key="/user/become-instructor" 
                icon={<TeamOutlined/>}
                onClick={e => setCurrent(e.key)}
                >
   
                  <Link href='/user/become-instructor'>
                      <a className=''>Become Instructor </a>
                  </Link>
              </Item>
             ):null  
         }
         {
             user && user.role && user.role.includes("instructor") && (
                <Item
                key="/instructor" 
                icon={<TeamOutlined/>}
                onClick={e => setCurrent(e.key)}
                className="ms-auto me-3"
                >
   
                  <Link href='/instructor'>
                      <a>Instructor</a>
                  </Link>
              </Item> 
             ) 
         }
           {user === null && (
               <>
  <Item
             key="/login" 
             icon={<LoginOutlined/>}
             onClick={e => setCurrent(e.key)}
             className='ms-auto'
             >

               <Link href='/login'>
                   <a >Login </a>
               </Link>
           </Item>
           <Item 
            key="/register"
            icon={<UserAddOutlined/>}
            onClick={e => setCurrent(e.key)}
             >
               <Link href='/register'>
                   <a className=''>Register </a>
               </Link>
           </Item>
               </>
           )}
           {
               user !== null &&  (
               <SubMenu  key="/submenu" icon={<CoffeeOutlined/>} title={user && user.name} className={ user && user.role && user.role.includes("instructor") ?"" : "ms-auto me-3"}>
                   <ItemGroup>
                   <Item 
               key="/user"
                >
                 <Link href='/user'>
                   <a className=''>Dashboard </a>
               </Link>
              </Item>
                   <Item 
               key="/logout"
               onClick={logout}
               
                >
                 Logout
              </Item>
                   </ItemGroup>
                  
               </SubMenu>
              )
           }
          
        </Menu>
    )
}

export default TopNav
