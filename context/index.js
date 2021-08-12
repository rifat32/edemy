import {createContext,useState,useEffect} from 'react';




const AppContext = createContext();
const AppProvider = ({children}) => {
 const [user,setUser] = useState(null)
useEffect(() => {
   
        
        const userL = JSON.parse(window.localStorage.getItem("user"));
        if(userL) {
            setUser(userL)
        }
     
      
     
       
            
    
    },[])






return (
    <AppContext.Provider value={
        {  
       user,
       setUser
    }
       
    }>
{children}
    </AppContext.Provider>
)
}
const AppConsumer = AppContext.Consumer;
export {AppContext,AppProvider,AppConsumer}