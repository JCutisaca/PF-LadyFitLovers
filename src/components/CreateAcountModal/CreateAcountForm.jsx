import React, { useState, useEffect } from "react";
import { Upload, Input, Button, message, Select } from "antd";
import {UploadOutlined } from "@ant-design/icons";
import { Field, FieldArray, useFormikContext } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { provincias } from "./Provincias";
import { saveImage } from "../CreateProduct/saveImage";
import ButtonSecondary from "../ButtonSecondary/ButtonSecondary";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";
import updateUser from "../../redux/Actions/User/updateUser";
import postUser from "../../redux/Actions/User/postUser";
import getUserById from "../../redux/Actions/User/getUserById";
import getAllUsers from "../../redux/Actions/User/getAllUsers";
import UpdatePasswordModal from "../UpdatePassword/UpdatePasswordModal";
import "./createAcountModal.css";
import "./createAcountForm.css";

const CreateAcountForm = ({
  onClose,
  pivotuser,
  dataAddress,
  idUser,
  isEditing,
}) => {
  const accessToken = useSelector((state) => state.accessToken);
  const user = useSelector((state) => state.user);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const { values, errors, resetForm, initialValues } = useFormikContext();

  const [selectedImage, setSelectedImage] = useState({
    saveImage: null,
    urlImage: "",

  });
  const handleImageChange = (img) => {
    message.success("Imagen subida correctamente");

    setSelectedImage({
      ...selectedImage,
      saveImage: img.file.originFileObj
      ,
    });
  };
  useEffect(() => {
    async function fetchImage() {
      if (selectedImage.saveImage) {
        try {
          const imageUrl = await saveImage(selectedImage.saveImage);
          setSelectedImage((prevImage) => ({
            ...prevImage,
            urlImage: imageUrl,
          }));
        } catch (error) {}
      }
    }

    fetchImage();
  }, [selectedImage.saveImage]);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setLoading(true);
    // const address = `${values.calle} ${values.numero} ${values.dpto}, entre: ${values.entreCalles}, ${values.localidad} - CP: ${values.codigoPostal}, ${values.provincia}`;

    const valuesToSend = {
      id: idUser,
      name: values.name,
      surname: values.surname,
      phone: values.phone,
      address: {
        calle: values.calle,
        numero: values.numero,
        dpto: values.dpto,
        entreCalles: values.entreCalles,
        localidad: values.localidad,
        provincia: values.provincia,
        codigoPostal: values.codigoPostal,
      },
      email: values.email.toLowerCase(),
      password: values.password,
      userBan: false,
    };

    try {
      const response = await dispatch(postUser(valuesToSend));

      if (response.message === "Usuario creado correctamente") {
        message.success(response.message, [2], onClose());
      } else {
        message.error("Error al crear la cuenta", [2], onClose());
      }
      onClose();
      resetForm();
      setLoading(false);
    } catch {
      message.error("Error al crear la cuenta", [2], onClose());
    }
  };
  const handleSubmitupdate = async () => {
    const valuesToSend = {
      id: idUser,
      name: values.name,
      surname: values.surname,
      phone: values.phone,
      address: {
        calle: values.calle,
        numero: values.numero,
        dpto: values.dpto,
        entreCalles: values.entreCalles,
        localidad: values.localidad,
        provincia: values.provincia,
        codigoPostal: values.codigoPostal,
      },
      email: values.email,
      image: selectedImage.urlImage,
    };

    try {
      const response = await dispatch(updateUser(valuesToSend, accessToken));
      dispatch(getUserById(valuesToSend.id, accessToken));

      if (response.message === "Usuario editado correctamente") {
        message.success(response.message);
        resetForm();
        dispatch(getUserById(valuesToSend.id, accessToken));
      } else {
        message.error("Error al editar la cuenta");
      }
    } catch {
      message.error("hola");
    }
  };
  const openLoginModal = () => {
    setLoginModalVisible(true);
  };

  const handleEdit = async () => {
    setLoading(true);
    const valuesToSend = {
      id: values.id,
      name: values.name,
      surname: values.surname,
      phone: values.phone,
      address: {
        calle: values.address.calle,
        numero: values.address.numero,
        dpto: values.address.dpto,
        entreCalles: values.address.entreCalles,
        localidad: values.address.localidad,
        provincia: values.address.provincia,
        codigoPostal: values.address.codigoPostal,
      },
      email: values.email,
      password: values.password,
      userBan: values.userBan,
      typeUser: values.typeUser,
    };

    try {
      const response = await dispatch(updateUser(valuesToSend, accessToken)); // cambiar por putUser

      if (response.message === "Usuario editado correctamente") {
        message.success(response.message, [2], onClose());
        setLoading(false);
      } else {
        message.error("Error al editar el usuario", [2], onClose());
      }
      onClose();
      resetForm();
      dispatch(getAllUsers(accessToken));
    } catch {
      message.error("Error al editar el usuario", [2], onClose());
    }
  };

  return (
    <>
      <div className="containerFormCreateAcount">

        <Field id="name" name="name">
          {/* Todos los field tienen que tener un name y un id por defecto, lo que cambia es el valor que yo le envìo */}
          {({ field, form, meta, error }) => {
            return (
              <div className="fieldAndError">
                <Input {...field} placeholder="Nombre*" autoComplete="off" />
                {errors.name && (
                  <p className="createProductError">{errors.name}</p>
                )}
              </div>
            );
          }}
        </Field>
        <Field id="surname" name="surname">
          {({ field, form, meta, error }) => {
            return (
              <div className="fieldAndError">
                <Input {...field} placeholder="Apellido*" autoComplete="off" />
                {errors.surname && (
                  <p className="createProductError">{errors.surname}</p>
                )}
              </div>
            );
          }}
        </Field>
        <Field id="phone" name="phone">
          {({ field, form, meta, error }) => {
            return (
              <div className="fieldAndError">
                <Input
                  {...field}
                  placeholder="Teléfono/celular*"
                  autoComplete="off"
                />
                {pivotuser
                  ? ""
                  : errors.phone && (
                      <p className="createProductError">{errors.phone}</p>
                    )}
              </div>
            );
          }}
        </Field>
        {isEditing ? (
          <p>
            Direccion actual:{" "}
            {values.address
              ? `${values.address.calle} ${values.address.numero} ${values.address.dpto} ${values.address.entreCalles} ${values.address.localidad} ${values.address.provincia} ${values.address.codigoPostal}`
              : "No definido"}{" "}
          </p>
        ) : (
          ""
        )}
        <div className="createAcountCalleNumDpto">
          <Field id="calle" name="calle">
            {({ field, form, meta, error }) => {
              return (
                <div className="fieldAndError">
                  <Input
                    {...field}
                    placeholder="Calle*"
                    autoComplete="off"
                    defaultValue={isEditing ? values.address.calle : ""}
                  />
                  {pivotuser
                    ? errors.calle && (
                        <p className="createProductError">{errors.calle}</p>
                      )
                    : ""}
                </div>
              );
            }}
          </Field>
          <Field id="numero" name="numero">
            {({ field, form, meta, error }) => {
              return (
                <div className="fieldAndError">
                  <Input
                    {...field}
                    placeholder="Número*"
                    autoComplete="off"
                    defaultValue={isEditing ? values.address.numero : ""}
                  />
                  {pivotuser
                    ? errors.numero && (
                        <p className="createProductError">{errors.numero}</p>
                      )
                    : ""}
                </div>
              );
            }}
          </Field>
          <Field id="dpto" name="dpto">
            {({ field, form, meta, error }) => {
              return (
                <div className="fieldAndError">
                  <Input
                    {...field}
                    placeholder="Dpto"
                    autoComplete="off"
                    defaultValue={isEditing ? values.address.dpto : ""}
                  />
                  {pivotuser
                    ? errors.dpto && (
                        <p className="createProductError">{errors.dpto}</p>
                      )
                    : ""}
                </div>
              );
            }}
          </Field>
        </div>
        <Field id="entreCalles" name="entreCalles">
          {({ field, form, meta, error }) => {
            return (
              <div className="fieldAndError">
                <Input
                  {...field}
                  placeholder="Entre calles*"
                  autoComplete="off"
                  defaultValue={isEditing ? values.address.entreCalles : ""}
                />
                {pivotuser
                  ? errors.entreCalles && (
                      <p className="createProductError">{errors.entreCalles}</p>
                    )
                  : ""}
              </div>
            );
          }}
        </Field>
        <div className="createAcountCalleNumDpto">
          <Field id="localidad" name="localidad">
            {({ field, form, meta, error }) => {
              return (
                <div className="fieldAndError">
                  <Input
                    {...field}
                    placeholder="Localidad*"
                    autoComplete="off"
                    defaultValue={isEditing ? values.address.localidad : ""}
                  />
                  {pivotuser
                    ? errors.localidad && (
                        <p className="createProductError">{errors.localidad}</p>
                      )
                    : ""}
                </div>
              );
            }}
          </Field>
          <Field id="codigoPostal" name="codigoPostal">
            {({ field, form, meta, error }) => {
              return (
                <div className="fieldAndError">
                  <Input
                    {...field}
                    placeholder="Código postal*"
                    autoComplete="off"
                    defaultValue={isEditing ? values.address.codigoPostal : ""}
                  />
                  {pivotuser
                    ? errors.codigoPostal && (
                        <p className="createProductError">
                          {errors.codigoPostal}
                        </p>
                      )
                    : ""}
                </div>
              );
            }}
          </Field>
        </div>
        <Field id="provincia" name="provincia">
          {({ field, form, meta, error }) => {
            return (
              <div className="fieldAndError">
                <Select
                  {...field}
                  options={provincias}
                  onChange={(value) => form.setFieldValue("provincia", value)}
                  style={{ width: "100%" }}
                  defaultValue={isEditing ? values.address.provincia : ""}
                />
                {pivotuser
                  ? errors.provincia && (
                      <p className="createProductError">{errors.provincia}</p>
                    )
                  : ""}
              </div>
            );
          }}
        </Field>
        <Field id="email" name="email">
          {({ field, form, meta, error }) => {
            return (
              <div className="fieldAndError">
                {pivotuser ? (
                  <Input
                    {...field}
                    placeholder="Email*"
                    autoComplete="off"
                    disabled
                  />
                ) : (
                  <Input {...field} placeholder="Email*" autoComplete="off" />
                )}
                {errors.email && (
                  <p className="createProductError">{errors.email}</p>
                )}
              </div>
            );
          }}
        </Field>
        {!isEditing && (
          <Field id="password" name="password">
            {({ field, form, meta, error }) => {
              return (
                <div className="fieldAndError">
                  <div className="inputCreateAcountContainer">
                    {pivotuser ? (
                      ""
                    ) : (
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password*"
                        autoComplete="off"
                      />
                    )}
                    {pivotuser ? (
                      ""
                    ) : (
                      <Button
                        style={{
                          width: 80,
                        }}
                        onClick={() =>
                          setShowPassword((prevState) => !prevState)
                        }
                      >
                        {showPassword ? "Ocultar" : "Mostrar"}
                      </Button>
                    )}
                  </div>
                  {pivotuser
                    ? ""
                    : errors.password && (
                        <p className="createProductError">{errors.password}</p>
                      )}
                </div>
              );
            }}
          </Field>
        )}
        {isEditing &&
          user.typeUser === "Admin" &&
          values.email !== "ladyfitlovers@gmail.com" && (
            <Field id="typeUser" name="typeUser">
              {({ field, form, meta, error }) => {
                return (
                  <div className="fieldAndError">
                    <Select
                      {...field}
                      options={[
                        { value: "Admin", label: "Admin" },
                        { value: "User", label: "User" },
                      ]}
                      onChange={(value) =>
                        form.setFieldValue("typeUser", value)
                      }
                      style={{ width: "100%" }}
                      defaultValue={isEditing ? values.userType : ""}
                    />
                  </div>
                );
              }}
            </Field>
          )}

        <div className="createCategoryButtons">
          {pivotuser ? (
            ""
          ) : (
            <ButtonSecondary
              title="Cancelar"
              type="button"
              onClick={() => onClose()}
            />
          )}
          {pivotuser ? (
            <ButtonSecondary
              title="Act. contraseña"
              type="button"
              onClick={openLoginModal}
            />
          ) : (
            ""
          )}

          {pivotuser ? (
            <ButtonPrimary
              title="Actualizar"
              type="button"
              onClick={() => handleSubmitupdate()}
              disbled={
                errors.name ||
                errors.surname ||
                errors.calle ||
                errors.numero ||
                errors.entreCalles ||
                errors.localidad ||
                errors.codigoPostal ||
                errors.provincia
              }
            />
          ) : (
            <ButtonPrimary
              title={isEditing ? "Editar" : "Crear"}
              type="button"
              onClick={isEditing ? handleEdit : handleSubmit}
              disbled={
                errors.name ||
                errors.surname ||
                errors.phone ||
                errors.calle ||
                errors.numero ||
                errors.entreCalles ||
                errors.localidad ||
                errors.codigoPostal ||
                errors.provincia ||
                errors.email ||
                errors.password ||
                loading
              }
            />
          )}
        </div>
        <UpdatePasswordModal
          visible={loginModalVisible}
          onClose={() => setLoginModalVisible(false)}
          pivotuser={pivotuser}
        />
      </div>
    </>
  );
};

export default CreateAcountForm;
