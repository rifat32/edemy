import {useContext,useState} from 'react';
import { AppContext } from '../../context';
import { useRouter } from 'next/router';
import { Button } from 'antd';
import {SettingOutlined,UserSwitchOutlined,LoadingOutlined} from '@ant-design/icons'
import UserRoutes from '../../components/Routes/UserRoutes';
const BecomeInstructor = () => {
  const [loading,setLoading] = useState(false);
  const BAppContext = useContext(AppContext);
  const {state} = BAppContext 
  const {user} = state;
  const router = useRouter()
  const becomeInstructor = () => {
    router.push("/bikash/setup")
 
  }
    return (
        <>
              <h1 className="jumbotron p-5 text-center bg-primary">Become Instructor</h1>
              <div className="container">
                  <div className="row">
                      <div className="col-md-6 offset-md-3 text-center">
            <div className="pt-4">
                <UserSwitchOutlined className="display-1 pb-3"/>
                <br/>
                <h2>Setup Bkash to publish courses on Edemy</h2>
                <p className="lead text-warning">
                    Edemy will send you money through Bkash
                </p>

              <Button className="mb-3" type="primary" block="true" shape="round"
             icon={<SettingOutlined/>}
             size="large"
             onClick={becomeInstructor}
             disabled={(user && user.role && user.role[0].includes("Instructor"))}
             >
             Setup Bikash Number
             </Button>


            </div>
                      </div>
                  </div>
              </div>
        </>
    )
}

export default BecomeInstructor
