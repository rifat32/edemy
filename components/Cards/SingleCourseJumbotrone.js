
import { Badge,Button } from "antd";
import { currencyFormatter } from "../../utils/helpers";
import {LoadingOutlined, SafetyOutlined,SyncOutlined} from '@ant-design/icons'
import ReactPlayer from "react-player";
const SingleCourseJumbotrone = (props) => {
    const {
        courses,
        lessons,
        showModal,
        setShowModal,
        preview,
        setPreview,
        user,
        loading,
        handleFreeEnrollment,
        handlePaidEnrollment,
        enrolled,
        setEnrolled,
        pending
    } = props.values
    const {name,description,price,image,category,instructor_name,updated_at,paid} = courses
    const free =  lessons.find(el => el.free_preview === true)
    return (
             <div className="jumbotron p-5 text-center bg-primary">
              <div className="row">
                <div className="col-md-8">
                  <div className="ms-5 float-start" >
                  <h1 className="text-light font-weight-bold">{name}</h1>
<p className="lead">{description && description.substring(0,160)}.....</p>
<Badge count={category} style={{ backgroundColor:"#03a9f4" }} className="pb-4"/>
<p>created by {instructor_name}</p>
<p>Last Updated {new Date(updated_at).toLocaleDateString()}</p>
<h4 className="text-light">
  {paid?currencyFormatter({
    amount:price,
    currency:'bdt'
  }):"Free"}
</h4>
                  </div>

                </div>
                <div className="col-md-4">
    {free? (<div 
    onClick={() => {
      setPreview(free.video)
      setShowModal(!showModal)
    }}
    >
    <ReactPlayer className="react-player-div" url={free.video}
    light={image}
    width="100%"
    height="225px"
    />

    </div>) : (<>
    <img src={image} alt={name}
    className="img img-fluid"
    style={{ 
      height:"225px",
      width:"100%"

     }}
    />
    </>)

  }

 <Button
    className="mb-3 mt-3"
     type="danger"
    block={true}
    shape="round"
    icon={<SafetyOutlined/>}
    size="large"
    disabled={loading || pending}
    onClick={paid?handlePaidEnrollment:handleFreeEnrollment}
    >
      {user?(enrolled?"Go to course":(pending?"Pending":(loading? <SyncOutlined spin="true"/>:"Enroll"))):"Login to enroll"}
    </Button>



                </div>
              </div>
            </div>
     
    )
}

export default SingleCourseJumbotrone
