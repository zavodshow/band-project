"use client";

import { useEffect, useState, useRef } from "react";
import {
  Autocomplete,
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Alert,
  Snackbar,
  Tooltip,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import DatePicker from "react-datepicker";
import { insertCase, updateCase, getCaseById } from "@/api/caseAPI";
import { getSite } from "@/api/siteAPI";
import MultipleValueTextInput from "react-multivalue-text-input";
import { getThrees } from "@/api/threeAPI";
import { CreatePageWrapper } from "../AdminSection";
import { TabButton } from "@/components/Buttons";
import { darkAdd } from "@/assets";
import { Input, SelectBox, TextArea } from "@/components/Inputs";
import LoadingProgress from "@/components/Loading/Loading";
import { useRouter, useSearchParams } from "next/navigation";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const inputInfo = [
  {
    title: "Название",
    name: "name",
    type: "text",
    placeholder: "Введите название",
  },
  {
    title: "Тип кейса",
    name: "blog_type",
    type: "text",
    placeholder: "Частное",
    option: [
      "Частное",
      "Корпоративное",
      "Конференция",
      "Государственное",
      "Спортивное",
      "Концерт",
      "Тур",
    ],
  },
  {
    title: "Место проведения",
    name: "venue",
    type: "text",
    placeholder: "Введите данные места проведения",
  },
  {
    title: "Количество гостей",
    name: "guests",
    type: "text",
    placeholder: "Введите количество гостей",
  },
  {
    title: "Описание(особенности)",
    name: "features",
    type: "text",
    placeholder: "Введите описание",
  },
  {
    title: "Meta Title",
    name: "title",
    type: "text",
    placeholder:
      "Заголовок страницы для поисковых систем. Рекомендуется не более 250 символов.",
  },
  {
    title: "Meta Keyword",
    name: "keyword",
    type: "text",
    placeholder: "Список ключевых слов через запятую для поисковых систем.",
  },
  {
    title: "Meta Description",
    name: "description",
    type: "text",
    placeholder:
      "Краткое описание страницы для поисковых систем. Рекомендуется не более 250 символов.",
  },
  {
    title: "Город",
    name: "city",
    type: "text",
    placeholder: "Введите город",
  },
  {
    title: "Хедлайнер",
    name: "eventTitle",
    type: "text",
    placeholder:
      "ВВведите хедлайнеры, разделяя их ЗАПЯТОЙ или нажимая клавишу ENTER.",
  },
];

const optionsWhatWeDid = [
  "Свет",
  "Звук",
  "Видео",
  "Одежда сцены",
  "3д-визуализация",
  "Репетиционная база",
  "Сцена",
  "Линолеум",
  "Кабуки",
];

const NewCase = () => {
  const [site, setSite] = useState([]);
  const [dData, setDdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useRouter();
  const fileInputRef = useRef(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const searchParams = useSearchParams();
  const currentId = searchParams.get("id");

  const [formData, setFormData] = useState({
    cities: [],
    name: "",
    blog_type: "Частное",
    startDate: "",
    endDate: "",
    guests: "",
    venue: "",
    features: "",
    site_id: "",
    three_id: "",
    video: {},
    site_type: [],
    images: [],
    eventTitle: [],
    title: "",
    keyword: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const [siteData, threeData] = await Promise.all([getSite(), getThrees()]);
      setSite(siteData);
      setDdata(threeData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    return () => {
      // Cleanup any file references if needed
      setFormData((prev) => ({ ...prev, images: [] }));
    };
  }, []);

  useEffect(() => {
    if (currentId) {
      getCaseById(currentId).then((data) => {
        if (data) {
          const initialData = {};

          // Process each field in the data
          Object.entries(data).forEach(([key, value]) => {
            try {
              // Try to parse JSON if the value is a string
              const parsedValue =
                typeof value === "string" ? JSON.parse(value) : value;
              if (parsedValue !== null) {
                initialData[key] = parsedValue;
              }
            } catch {
              if (value !== null) {
                initialData[key] = value;
              }
            }
          });

          // Parse the startDate and endDate from the data
          const parseRussianDate = (dateString) => {
            if (!dateString) return null;
            const months = {
              января: 0,
              февраля: 1,
              марта: 2,
              апреля: 3,
              мая: 4,
              июня: 5,
              июля: 6,
              августа: 7,
              сентября: 8,
              октября: 9,
              ноября: 10,
              декабря: 11,
            };
            const [day, month, year] = dateString.split(" ");
            return new Date(year, months[month.toLowerCase()], day);
          };

          if (initialData.startDate) {
            const startDate = parseRussianDate(initialData.startDate);
            setSelectedDate(startDate);
          }

          if (initialData.endDate) {
            const endDate = parseRussianDate(initialData.endDate);
            setSelectedEndDate(endDate);
          }

          setFormData((prev) => ({ ...prev, ...initialData }));
        }
      });
    }
  }, [currentId]);

  const handleAddCity = (item) => {
    setFormData((prev) => ({
      ...prev,
      cities: [...prev.cities, item],
    }));
  };

  const handleDeleteCity = (item) => {
    setFormData((prev) => ({
      ...prev,
      cities: prev.cities.filter((city) => city !== item),
    }));
  };

  const handleAddHeadliner = (item) => {
    setFormData((prev) => ({
      ...prev,
      eventTitle: [...prev.eventTitle, item],
    }));
  };

  const handleDeleteHeadliner = (item) => {
    setFormData((prev) => ({
      ...prev,
      eventTitle: prev.eventTitle.filter((heading) => heading !== item),
    }));
  };

  const handleOneCity = (e) => {
    setFormData((prev) => ({
      ...prev,
      cities: [e.target.value],
    }));
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value, 10) }));
    } else {
      const newValue = value === "" ? null : value;
      setFormData((prev) => ({ ...prev, [name]: newValue }));
    }
  };

  const handleVideoChange = (e) =>
    setFormData((prev) => ({ ...prev, video: e.target.files[0] }));

  // Handle drag and drop
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(formData.images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFormData((prev) => ({
      ...prev,
      images: items,
    }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...selectedFiles],
    }));
  };

  // Trigger file input click
  const handleAddImage = () => {
    fileInputRef.current.click();
  };

  // Remove image by index
  const handleRemoveImage = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  // Clear all images
  const handleClearImages = () => {
    setFormData((prev) => ({
      ...prev,
      images: [],
    }));
  };

  const handleDateChange = (date, isStartDate) => {
    const formattedDate = date
      .toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
      .replace(" г.", "");
    isStartDate ? setSelectedDate(date) : setSelectedEndDate(date);
    setFormData((prev) => ({
      ...prev,
      [isStartDate ? "startDate" : "endDate"]: formattedDate,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newFormData = new FormData();

    // Add all form data
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (key === "images") {
          // Separate existing URLs and new files
          const existingUrls = value.filter((item) => typeof item === "string");
          const newFiles = value.filter((item) => item instanceof File);

          // Add existing URLs as a JSON array
          newFormData.append("existing_images", JSON.stringify(existingUrls));

          // Add new files
          newFiles.forEach((file) => newFormData.append("images[]", file));
        } else {
          value.forEach((item) => newFormData.append(`${key}[]`, item));
        }
      } else {
        newFormData.append(key, value);
      }
    });

    const validations = [
      {
        condition: !newFormData.get("video"),
        message: "Перед отправкой выберите видеофайл.",
      },
      {
        condition: formData.images.length === 0,
        message: "Пожалуйста, загрузите хотя бы одно изображение.",
      },
      {
        condition: formData.cities.length === 0,
        message: "Пожалуйста, выберите хотя бы один город.",
      },
      {
        condition: formData.title.length > 250 || formData.keyword.length > 250,
        message:
          "Длина заголовка и ключевых слов не должна превышать 250 символов.",
      },
      {
        condition: formData.description.length > 500,
        message: "Описание не должно превышать 500 символов.",
      },
    ];

    for (const { condition, message } of validations) {
      if (condition) {
        setAlertMessage(message);
        setAlertOpen(true);
        setLoading(false);
        return;
      }
    }

    try {
      const request = searchParams.size
        ? updateCase(searchParams.get("id"), newFormData)
        : insertCase(newFormData);
      const data = await request;
      if (data?.error) {
        setAlertMessage(
          data.error === 400
            ? "Ошибка: Имя блога уже существует. Пожалуйста, выберите другое имя."
            : data.message
        );
        setAlertOpen(true);
      } else {
        navigate.push("/admin/eventTable");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("formData", formData);

  return (
    <CreatePageWrapper
      title="Введите данные нового кейса события здесь"
      handleSubmit={handleSubmit}
      link="/admin/eventTable"
      content={
        <>
          <TabButton
            icon={darkAdd}
            title="Выбрать видео"
            onChange={handleVideoChange}
          />
          {formData.video.name && (
            <Typography> Выбрать видео: {formData.video.name}</Typography>
          )}

          {/* Custom Image Upload and Drag & Drop Section */}
          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <p className="x16">Изображения</p>
              <div>
                <Button
                  variant="contained"
                  onClick={handleAddImage}
                  style={{ marginRight: "10px", fontSize: "18px" }}
                >
                  +
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleClearImages}
                  style={{ fontSize: "18px" }}
                >
                  &times;
                </Button>
              </div>
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            {/* Drag and drop area */}
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="image-droppable" direction="horizontal">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      padding: "15px",
                      minHeight: "150px",
                      border: "2px dashed #ccc",
                      borderRadius: "5px",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    {formData.images && formData.images.length > 0 ? (
                      formData.images.map((file, index) => (
                        <Draggable
                          key={`image-${index}`}
                          draggableId={`image-${index}`}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                position: "relative",
                                width: "120px",
                                height: "120px",
                                ...provided.draggableProps.style,
                              }}
                            >
                              <img
                                src={
                                  file instanceof File
                                    ? URL.createObjectURL(file)
                                    : file
                                }
                                alt={`Image ${index + 1}`}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  borderRadius: "4px",
                                }}
                              />
                              <Button
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={() => handleRemoveImage(index)}
                                style={{
                                  position: "absolute",
                                  top: "5px",
                                  right: "5px",
                                  minWidth: "30px",
                                  width: "30px",
                                  height: "30px",
                                  padding: "0",
                                  borderRadius: "50%",
                                }}
                              >
                                ✕
                              </Button>
                              <Typography
                                variant="caption"
                                style={{
                                  position: "absolute",
                                  bottom: "5px",
                                  left: "5px",
                                  right: "5px",
                                  backgroundColor: "rgba(0,0,0,0.5)",
                                  color: "white",
                                  padding: "2px 5px",
                                  borderRadius: "2px",
                                  textOverflow: "ellipsis",
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {file instanceof File
                                  ? file.name
                                  : `Image ${index + 1}`}
                              </Typography>
                            </div>
                          )}
                        </Draggable>
                      ))
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#999",
                        }}
                      >
                        Перетащите изображения для изменения порядка или
                        добавьте новые
                      </div>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>

          <div>
            <p className="x16" style={{ marginBottom: "12px" }}>
              {inputInfo[0].title}
            </p>
            <Input
              value={formData[inputInfo[0].name]}
              item={inputInfo[0]}
              handleChange={handleChange}
            />
          </div>
          <div>
            <p className="x16">{inputInfo[1].title}</p>
            <SelectBox
              value={formData[inputInfo[1].name]}
              item={inputInfo[1]}
              handleSelect={handleChange}
            />
          </div>
          <div>
            <p className="x16" style={{ marginBottom: "12px" }}>
              Город проведения
            </p>
            {formData.blog_type === "Тур" ? (
              <MultipleValueTextInput
                className="InputText x14 alignCenter"
                onItemAdded={handleAddCity}
                onItemDeleted={handleDeleteCity}
                name="city-input"
                placeholder="Введите названия городов, разделяя их ЗАПЯТОЙ или нажимая клавишу ENTER."
                values={formData?.cities}
              />
            ) : (
              <Input
                value={formData?.cities[0]}
                item={inputInfo[8]}
                handleChange={handleOneCity}
              />
            )}
          </div>
          <div>
            <p className="x16" style={{ marginBottom: "12px" }}>
              {formData.blog_type === "Тур" ? "Хедлайнер" : "Место проведения"}
            </p>
            <Input
              value={formData[inputInfo[2].name]}
              item={
                formData.blog_type === "Тур"
                  ? { ...inputInfo[2], placeholder: "Введите хедлайнера" }
                  : inputInfo[2]
              }
              handleChange={handleChange}
              required={false}
            />
          </div>
          <div>
            <p className="x16" style={{ marginBottom: "12px" }}>
              Время проведения:
            </p>
            <div className="alignCenter">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => handleDateChange(date, true)}
                dateFormat="yyyy/MM/dd"
                className="datePicker InputText x14 alignCenter"
                required
              />
              &nbsp;~&nbsp;
              <DatePicker
                selected={selectedEndDate}
                onChange={(date) => handleDateChange(date, false)}
                dateFormat="yyyy/MM/dd"
                className="datePicker InputText x14 alignCenter"
                required
              />
            </div>
          </div>
          <div>
            <p className="x16" style={{ marginBottom: "12px" }}>
              {formData.blog_type === "Тур" ? "Общая протяженность" : "Гости"}
            </p>
            <Input
              value={formData[inputInfo[3].name]}
              item={
                formData.blog_type === "Тур"
                  ? {
                      ...inputInfo[3],
                      placeholder: "Введите общую протяженность",
                    }
                  : inputInfo[3]
              }
              handleChange={handleChange}
            />
          </div>
          <div>
            <p className="x16" style={{ marginBottom: "12px" }}>
              {formData.blog_type === "Тур"
                ? "Хедлайнер для фильтрации кейсов"
                : "Хедлайнер"}
            </p>
            <MultipleValueTextInput
              className="InputText x14 alignCenter"
              onItemAdded={handleAddHeadliner}
              onItemDeleted={handleDeleteHeadliner}
              name="headliner-input"
              placeholder={inputInfo[9].placeholder}
              values={formData?.eventTitle}
            />
          </div>
          <div>
            <p className="x16" style={{ marginBottom: "12px" }}>
              {inputInfo[4].title}
            </p>
            <TextArea
              name={inputInfo[4].name}
              value={formData[inputInfo[4].name]}
              onChange={handleChange}
              placeholder={inputInfo[4].placeholder}
            />
          </div>
          <Box sx={{ width: "100%" }}>
            <p className="x16" style={{ marginBottom: "12px" }}>
              Что мы делали
            </p>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={optionsWhatWeDid}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              value={formData?.site_type}
              onChange={(_, newValue) =>
                setFormData((prev) => ({ ...prev, site_type: newValue }))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Выберите соответствующие пункты"
                  className="InputText x14 alignCenter"
                  sx={{ backgroundColor: "white" }}
                />
              )}
            />
          </Box>
          <div>
            <p className="x16" style={{ marginBottom: "12px" }}>
              {inputInfo[5].title}
            </p>
            <Input
              value={formData[inputInfo[5].name]}
              item={inputInfo[5]}
              handleChange={handleChange}
            />
          </div>
          <div>
            <p className="x16" style={{ marginBottom: "12px" }}>
              {inputInfo[6].title}
            </p>
            <Input
              value={formData[inputInfo[6].name]}
              item={inputInfo[6]}
              handleChange={handleChange}
            />
          </div>
          <div>
            <p className="x16" style={{ marginBottom: "12px" }}>
              {inputInfo[7].title}
            </p>
            <Input
              value={formData[inputInfo[7].name]}
              item={inputInfo[7]}
              handleChange={handleChange}
            />
          </div>
          <Box>
            <FormControl fullWidth>
              <p className="x16" style={{ marginBottom: "12px" }}>
                Выбор площадки
              </p>
              <Select
                value={formData.site_id || ""}
                onChange={handleChange}
                name="site_id"
                displayEmpty
                sx={{
                  backgroundColor: "white",
                  "& .MuiSelect-select": {
                    display: "flex",
                    alignItems: "center",
                  },
                }}
                renderValue={(selected) => {
                  if (!selected) {
                    return "Выберите площадку";
                  }
                  const selectedSite = site.find((s) => s.id === selected);
                  return selectedSite ? selectedSite.name : "Выберите площадку";
                }}
              >
                <MenuItem value="" className="h-20">
                  Не выбрано
                </MenuItem>
                {site.length > 0 ? (
                  site.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {item.video.endsWith(".mp4") ||
                        item.video.endsWith(".webm") ? (
                          <video
                            src={item.video}
                            alt={item.name}
                            style={{
                              width: 80,
                              height: 80,
                              marginRight: 8,
                            }}
                            controls
                          >
                            Ваш браузер не поддерживает тег видео.
                          </video>
                        ) : (
                          <img
                            src={item.video}
                            alt={item.name}
                            style={{
                              width: 80,
                              height: 80,
                              marginRight: 8,
                            }}
                          />
                        )}
                        <span>{item.name}</span>
                      </div>
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>Загрузка площадок...</MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <FormControl fullWidth>
              <p className="x16" style={{ marginBottom: "12px" }}>
                3D визуализация
              </p>
              <Select
                value={formData.three_id || ""}
                onChange={handleChange}
                name="three_id"
                displayEmpty
                sx={{
                  backgroundColor: "white",
                  "& .MuiSelect-select": {
                    display: "flex",
                    alignItems: "center",
                  },
                }}
                renderValue={(selected) => {
                  if (!selected) {
                    return "Выберите 3D визуализацию";
                  }
                  const selectedThree = dData.find((d) => d.id === selected);
                  return selectedThree
                    ? selectedThree.title1
                    : "Выберите 3D визуализацию";
                }}
              >
                <MenuItem value="" className="h-20">
                  Не выбрано
                </MenuItem>
                {dData.length > 0 ? (
                  dData.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {item.video.endsWith(".mp4") ||
                        item.video.endsWith(".webm") ? (
                          <video
                            src={item.video}
                            alt={item.title1}
                            style={{
                              width: 80,
                              height: 80,
                              marginRight: 8,
                            }}
                            controls
                          >
                            Ваш браузер не поддерживает тег видео.
                          </video>
                        ) : (
                          <img
                            src={item.video}
                            alt={item.title1}
                            style={{
                              width: 80,
                              height: 80,
                              marginRight: 8,
                            }}
                          />
                        )}
                        <span>{item.title1}</span>
                      </div>
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>Загрузка 3D визуализаций...</MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>
          {loading && <LoadingProgress />}
          <Snackbar
            open={alertOpen}
            autoHideDuration={6000}
            onClose={() => setAlertOpen(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={() => setAlertOpen(false)}
              severity="primary"
              sx={{ width: "100%" }}
            >
              {alertMessage}
            </Alert>
          </Snackbar>
        </>
      }
    />
  );
};

export default NewCase;
