import { Button, Progress, Tooltip } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";

const AddLessonForm = (props) => {
    const {values,setValues,addLesson,uploading,setUploading,uploadButtonText,setUploadButtonText,handleVideo,progress,handleVideoRemove} = props.value
    return (
        <div className="container pt-3">
          <form onSubmit={addLesson}>
  <input type="text" value={values.title}
   onChange={(e) => {setValues({...values, title:e.target.value})}} 
   placeholder="Title"
   autoFocus={true}
   required
   className="form-control"
   />
   <textarea className="form-control mt-3" rows="7" cols="7"
    onChange={(e) => {setValues({...values, content:e.target.value})}}
    value={values.content}
    placeholder="Content"

   >

   </textarea>

   <div className="row">
   <div className="col-11">
   <div className="d-grid gap-2">
   <label className="btn btn-dark text-start mt-3">
       {uploadButtonText}
   <input onChange={handleVideo} type="file" accept="video/*" hidden />
</label>
       </div>
   </div>
   <div className="col-1">
   {
       (!uploading && values.video) &&  (<Tooltip title="remove">
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
 



   
   <Button onClick={addLesson} type="primary" className="col mt-3" size="large" loading={uploading} shape="round"> Save</Button>
          </form>
        </div>
    )
}

export default AddLessonForm
