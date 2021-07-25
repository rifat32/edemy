
import { Select, Button,Avatar,Badge } from 'antd';


const {Option} = Select

const CourseCreateForm = (props) => {
    const {handleSubmit,handleChange,values,setValues,
        handleImage, preview, uploadButtonText, 
        handleImageRemove
        ,image,
        editPage=false
        // ,getImage,imageGot,image
    } = props.value;
    const children=[];
    for(let i =999.99; i <= 10000.99; i+=500){
        children.push(<Option key={i.toFixed(2)} >BDT {i.toFixed(2)}</Option>)
    }
    return (
      values && (  <form  onSubmit={handleSubmit}>
        <div className="form-group mt-3">
            <input className="form-control" name="name" value={values.name} onChange={handleChange} placeholder="Name" />
        </div>
        <div className="form-group mt-3">
            <textarea className="form-control" cols="7" rows="7" name="description" onChange={handleChange} value={values.description}   >
            
            </textarea>
        </div>
        <div className="row pt-3">
            <div className="col-md-9">
            <div className="form-group">
           <Select
           style={{width:"100%"}}
           size="large"
           value={values.paid}
           onChange={ v => setValues({...values,paid:v})
           }
           >
               <Option value={true}>Paid</Option>
               <Option value={false}>Free</Option>
           </Select>
        </div>
            </div>
{ values.paid && <div className="col-md-2">
 <div className="form-group">
 <Select
           style={{width:"100%"}}
         
           value={`BDT ${values.price}`}
           onChange={ v => setValues({...values,price:v})
           }
           tokenSeparators={[',']}
           size="large"
           >
             {children}
           </Select>
 
 </div>

</div>  }
<div className="form-group mt-3">
            <input className="form-control" name="category" value={values.category} onChange={handleChange} placeholder="Category" />
        </div>
           
        </div>
        <div className="row mt-3">
            <div className="col-md-9">
                <div className="form-group">

                <div className="d-grid gap-2">
                <label className="btn btn-outline-secondary text-start">
                    {
                      uploadButtonText
                    
                    }
                      <input type="file" name="image" onChange={handleImage} accept="image/*"
                      hidden={true} />
                </label>
              
                </div>
                
                  {/* <input className="form-control" name="image" value={image} onChange={e => getImage(e.target.value)} placeholder="Image Link" /> */}
                </div>

              
            </div>
            {preview? ((image)? (
                    <div className="col-md-3">
                        <Badge count="X" onClick={handleImageRemove} style={{ cursor:"pointer" }}>
                        <Avatar width={200} src={preview}/>
                        </Badge>
                    </div>

                ): (
                    <div className="col-md-3">  
                        <Avatar width={200} src={preview}/>
                 
                    </div>

                )):null }
            {(editPage && !preview && image)? <Avatar width={200} src={image}/>:null}
        </div>
        <div className="row mt-3">
        <div className="col">
            <Button  onClick={handleSubmit} disabled={values.loading || values.uploading || !image} 
            className="btn btn-primary"
               loading={values.loading}
               type="primary"
               size="large"
               shape="round"
            >
                {values.loading?"saving...":"Save and Continue"}
            </Button>
        </div>
        </div>
        
        
        
         </form>)
    )
}

export default CourseCreateForm
