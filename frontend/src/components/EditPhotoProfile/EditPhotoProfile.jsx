import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "react-avatar-edit";
import { Modal, message } from "antd";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";
import { EditPhotoSave } from "./EditPhotoSave";
import updateUser from "../../redux/Actions/User/updateUser";
import getUserById from "../../redux/Actions/User/getUserById";
import "./EditPhotoProfile.css";

const EditPhotoProfile = ({ visible, onClose, idUser }) => {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.accessToken);
    const [preview, setPreview] = useState(null);
    

    const onCrop = (view) => {
        setPreview(view);
    }
    const saveImageProfile = async(preview)=>{
        const response = await EditPhotoSave(preview)
        const valuesToSend = {
            id:idUser,
            image: response
        }
        if(response){
            const response = await dispatch(updateUser(valuesToSend, accessToken));
            console.log(response);
            if (response.message === "Usuario editado correctamente") {
                dispatch(getUserById(valuesToSend.id, accessToken));
                message.success("Imagen de perfil actualizada");
                setPreview(null);
                onClose();
              } else {
                message.error("Error al editar la cuenta");
              }
            
        }
    }

    return (
        <div className="App">
            <Modal
                title="Cambiar imagen de perfil"
                visible={visible}
                onCancel={onClose}
                footer={null}
            >
                <div className="containerEditPhoto">
                    <div className="avaatarEdit">
                    <Avatar
                        width={400}
                        height={300}
                        onCrop={onCrop}
                        
                    />

                    </div>
                    <ButtonPrimary
                    style={{marginTop:"10px"}}
                    title={"Confirmar"}
                    onClick={() => saveImageProfile(preview)}
                    />
                </div>
            </Modal>
        </div>
    );
}
export default EditPhotoProfile;