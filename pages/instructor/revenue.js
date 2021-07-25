import { AppContext } from "../../context";
import { useContext } from "react";
import InstructorRoutes from "../../components/Routes/InstructorRoutes";
import {currencyFormatter} from '../../utils/helpers'
import { DollarOutlined, SettingOutlined } from "@ant-design/icons";
import router from "next/router";
const revenue = () => {
    const UAppContext = useContext(AppContext);
    const {state} = UAppContext;
    const payoutSettings = () => {
router.push("/bikash/update")
    } 
    return (
        <InstructorRoutes>
            <div className="container">
                <div className="row pt-2">
<div className="col-md-8 p-5 offset-md-2 bg-light">
<h2>Revenue report <DollarOutlined className="float-end"/>
{" "}
 </h2>
 <small>You will get paid directly to your bkask account every 48 hours</small>
 <hr/>
 <h4>
     Pending Balance <span className="float-end">
     BDT  {state.user && state.user.balance}
     </span>
 </h4>
 <small>For last 48 hours</small>
 <h4>
     Payouts <SettingOutlined className="float-end pointer" onClick={payoutSettings}/>
 </h4>
 <small>Update your bkash account details od view previous details</small>
</div>
                </div>
            </div>
        </InstructorRoutes>
    )
}

export default revenue
