"use client";

import { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { CheckBox1, Input } from "@/components/Inputs";
import { AdminPageWrapper } from "../AdminSection";
import { BlackButton, OutLinedButton } from "@/components/Buttons";
import { register, updateUser } from "@/api/adminAPI";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const CreateUser = () => {
  const searchParams = useSearchParams();
  const navigate = useRouter();

  const data = JSON.parse(searchParams.get("data"));

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    adding: false,
    editing: false,
    deleting: false,
  });

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChecked = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data) {
      updateUser(data.id, formData)
        .then((result) => {
          setNotification({
            open: true,
            message: result.message,
            severity: "success",
          });
        })
        .catch(() => {
          setNotification({
            open: true,
            message: "Error updating user",
            severity: "error",
          });
        });
    } else {
      register(formData)
        .then((result) => {
          if (result) {
            setNotification({
              open: true,
              message: result.message,
              severity: "success",
            });
          }
        })
        .catch(() => {
          setNotification({
            open: true,
            message: "Error creating user",
            severity: "error",
          });
        });
    }
  };
  
  const handleFinish = () => {
    navigate.push('/admin/setting');
  }

  const handleCloseSnackbar = () => {
    setNotification({ ...notification, open: false });
  };

  const inputinfo = [
    {
      title: "Имя",
      name: "name",
      type: "text",
      placeholder: "Входная Имя",
    },
    {
      title: "Фамилия",
      name: "lastname",
      type: "text",
      placeholder: "Входная Фамилия",
    },
    {
      title: "Электронная почта",
      name: "email",
      type: "email",
      placeholder: "Входная Электронная почта",
    },
    {
      title: "пароль",
      name: "password",
      type: "text",
      placeholder: "Пароль для входа",
    },
  ];

  const permissionInfo = [
    { value: 1, title: "Редактировать данные", name: "editing" },
    { value: 1, title: "Добавлять новые данные", name: "adding" },
    { value: 1, title: "Удалять данные", name: "deleting" },
  ];

  useEffect(() => {
    if (data) setFormData(data);
  }, []);

  const content = (
    <form className="adminDirectorySection" onSubmit={handleSubmit}>
      <div className="alignCenter flexWrap" style={{ marginBottom: "40px" }}>
        <p className="adminDirectoryTitle" style={{ marginRight: "23px" }}>
          {data ? "Пользователь" : "Новый пользователь"}
        </p>
        {data && (
          <p className="x20Font_1" style={{ color: `var(--badgeColor)` }}>
            {data.name} {data.lastname}
          </p>
        )}
      </div>
      <div className="flexWrap" style={{ gap: "12px", marginBottom: "28px" }}>
        {inputinfo.map((item, index) => (
          <div
            key={index}
            className="createUserInput"
            style={{ width: "45%", paddingRight: "4%" }}
          >
            <p className="x16" style={{ marginBottom: "12px" }}>
              {item.title}
            </p>
            <Input
              color="#EFEFEF"
              value={formData[item.name] || ""}
              item={item}
              handleChange={handleChange}
              required={item.name !== "password" || !data}
            />
          </div>
        ))}
        <div
          className="createUserInput"
          style={{ width: "45%", paddingRight: "4%" }}
        >
          <p className="x16" style={{ marginBottom: "10px" }}>
            Права пользователя на сайте
          </p>
          {permissionInfo.map((item, index) => (
            <CheckBox1
              key={index}
              textColor="#171717"
              title={item.title}
              value={item.value}
              name={item.name}
              checked={formData[item.name]}
              onChange={handleChecked}
            />
          ))}
        </div>
      </div>
      <div className="spaceBetween">
      <BlackButton
        type="submit"
        title={data ? "изменить данные пользователя" : "Добавить пользователя"}
        style={{marginRight: "20px"}}
      />
      <OutLinedButton
        onClick={handleFinish}
        title="Назад"
      />
      </div>
    </form>
  );

  return (
    <>
      <AdminPageWrapper content={content} />
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={notification.severity}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateUser;
