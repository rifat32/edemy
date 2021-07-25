
import { Avatar } from "antd"
const SingleCourseLessons = (props) => {
    const { 
        lessons,
        setPreview,
        showModal,
        setShowModal,
        paid
        
       } = props.values
    return (
        <div className="container">
            <div className="row">
                <div className="col lesson-list">
                    <h4>{lessons.length} Lessons</h4>
                    <hr/>
                    {<ul className="list-group">
        {lessons.map((el,indx,item) => {
 return  <li  key={indx} className="list-group-item"
 >
     <Avatar>{indx + 1}</Avatar> {el.title}

{
   (item[indx].free_preview )?(
    <a className="float-end me-3 btn btn-primary" onClick={() => {   
   setPreview(item[indx].video)
   setShowModal(!showModal)
          }}>
            Preview
        </a>
   ):null 
}
     
    
   
 </li>
        })}
 
</ul>} 
                </div>
            </div>
        </div>
    )
}

export default SingleCourseLessons
