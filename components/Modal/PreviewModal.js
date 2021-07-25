import {  Modal } from "antd";
import ReactPlayer from "react-player";

const PreviewModal = (props) => {
    const {
        showModal,
                setShowModal,
                preview
     } = props.values
    return (
        <>
        <Modal
        title="Course Preview"
        visible={showModal}
        onCancel={() => setShowModal(!showModal)}
        width={720}
        footer={null}
        >
            <div className="wrapper">
                <ReactPlayer  url={preview} playing={showModal} controls={true} height="100%" weight="100%"  />
            </div>
        </Modal>
            
        </>
    )
}

export default PreviewModal
