import {createContext,useState,useEffect, useRef} from 'react';
import axios from 'axios';



const AppContext = createContext();
const AppProvider = ({children}) => {
const [state,setState] = useState({
    user:null,
    token:null,
});
const [ready,setReady] = useState(false)



useEffect(() => {
   
        
        const user = JSON.parse(window.localStorage.getItem("user"));
        const token = JSON.parse(window.localStorage.getItem("token"));
        setState({...state,user,token})
        if(state.token){
            axios.interceptors.request.use(function (config) {
              
                config.headers.Authorization = "Bearer " + token;
                
                return config;
            });
            setReady(true)
          
        }
        else {
            setReady(false)
        }
       
            
    
    },[state.token,ready])






return (
    <AppContext.Provider value={
        {  
        state,
        setState,
        ready,
        setReady
    }
       
    }>
{children}
    </AppContext.Provider>
)
}
const AppConsumer = AppContext.Consumer;
export {AppContext,AppProvider,AppConsumer}