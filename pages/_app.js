import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css'
import TopNav from '../components/TopNav'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AppProvider} from '../context'


function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
    <ToastContainer position="top-center"/>
    <TopNav/>
<Component {...pageProps} />
</AppProvider>
  )
}

export default MyApp
