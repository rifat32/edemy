import { Button, Progress, Switch, Tooltip } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import ReactPlayer from "react-player";

const UpdateLessonForm = (props) => {
    const {
        current,
    setCurrent,
    handleVideo,
    handleUpdateLesson,
    uploadVideoButtonText ,
    uploading,
    progress,
    handleVideoRemove,
    videoId
    } = props.value
    return (
        <div className="container pt-3">
          <form onSubmit={handleUpdateLesson}>
  <input type="text" value={current.title}
   onChange={(e) => {setCurrent({...current, title:e.target.value})}} 
   placeholder="Title"
   autoFocus={true}
   required
   className="form-control"
   />
   <textarea className="form-control mt-3" rows="7" cols="7"
    onChange={(e) => {setCurrent({...current, content:e.target.value})}}
    value={current.content}
    placeholder="Content"

   >

   </textarea>

   <div className="row">
  
   <div className="col-12">
   {
       (current.video) &&  (<div className="pt-2 d-flex justify-content-center">
  <ReactPlayer
  url={current.video}
  width="410px"
  height="240px"
  controls={true}

  />
           </div>)
       
   }
   </div>
   <div className="col-11">
   <div className="d-grid gap-2">
   <label className="btn btn-dark text-start mt-3">
       {uploadVideoButtonText}
   <input onChange={handleVideo} type="file" accept="video/*" hidden />
</label>
       </div>
   </div>
   <div className="col-1">
   {
       (!uploading && videoId) &&  (<Tooltip title="remove">
    <span onClick={handleVideoRemove} className="pt-1 col-1">
        <CloseCircleFilled className="text-danger display-flex justify-content-center pt-4 pointer "/>
    </span>
           </Tooltip>)
       
   }
   </div>
  



   </div>

   
      
    
    {
        progress > 0 && (
            <Progress className="d-flex justify-content-center pt-2 "
            percent={progress}
            steps={10}

            />
        )
    }
 

  <div className="d-flex justify-content-between pt-3 ">
      <span >
  Preview
      </span>
      <Switch className="float-end mt-2" disabled={uploading} 
      checked={current.free_preview}
      name="free_preview"
      onChange={v => setCurrent({...current,free_preview:v})} />
      {/* <pre>
          {JSON.stringify(current,null,4)}
      </pre> */}

  </div>


   
   <Button onClick={handleUpdateLesson} type="primary" className="col mt-3" size="large" loading={uploading} shape="round"> Save</Button>
          </form>
        </div>
    )
}

export default UpdateLessonForm
