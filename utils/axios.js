import axios from "axios"

 const apiClient = () => {
  
    const token = window.localStorage.getItem("token")
    console.log(token)
    const instance = axios.create({
        headers: {'Authorization': "Bearer " + token}
      });

 

    return instance;
}
export default apiClient