"use client";

import { useState, useEffect } from "react";
import { updateContactInfo, getContactInfo } from "@/api/contactAPI";
import { CreatePageWrapper } from "../AdminSection";
import LoadingProgress from "@/components/Loading/Loading";
import Image from "next/image";

import { miniClock, miniMail, miniPhone, miniTelegram } from "@/assets";

const icons = [
  { name: "miniClock", src: miniClock },
  { name: "miniMail", src: miniMail },
  { name: "miniPhone", src: miniPhone },
  { name: "miniTelegram", src: miniTelegram },
];

const ContactEditPage = () => {
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [formData, setFormData] = useState({
    team_office_address: "",
    team_office_contact1: null,
    team_office_contact2: null,
    team_office_contact3: null,
    project_manager_contact1: null,
    project_manager_contact2: null,
    project_manager_contact3: null,
    account_manager_contact1: null,
    account_manager_contact2: null,
    account_manager_contact3: null,
    delivery_manager_contact1: null,
    delivery_manager_contact2: null,
    delivery_manager_contact3: null,
    warehouse_address: "",
    warehouse_contact1: null,
    warehouse_contact2: null,
    warehouse_contact3: null,
    travel_manager_contact1: null,
    travel_manager_contact2: null,
    travel_manager_contact3: null,
    rental_hall_manager_contact1: null,
    rental_hall_manager_contact2: null,
    rental_hall_manager_contact3: null,
    advertising_manager_contact1: null,
    advertising_manager_contact2: null,
    advertising_manager_contact3: null,
  });

  // Fetch initial data
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setLoading(true);
        const data = await getContactInfo();
        if (data) {
          setFormData(data);
        }
      } catch (error) {
        console.error("Error fetching contact info:", error);
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };

    fetchContactInfo();
  }, []);

  const handleChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleContactChange = (fieldName, contactData) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: contactData,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setLoading(true);
      await updateContactInfo(formData);
      // Optionally show success message
      alert("Contact information updated successfully!");
    } catch (error) {
      console.error("Error updating contact info:", error);
      alert("Failed to update contact information");
    } finally {
      setLoading(false);
    }
  };

  // Custom dropdown component for icon selection
  const IconDropdown = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedIcon = value
      ? icons.find((icon) => icon.name === value)
      : null;

    return (
      <div className="custom-dropdown">
        <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
          {selectedIcon ? (
            <div className="selected-icon">
              <Image
                src={selectedIcon.src}
                alt={selectedIcon.name}
                width={20}
                height={20}
              />
            </div>
          ) : (
            <span className="placeholder"> </span>
          )}
          <span className="dropdown-arrow">▼</span>
        </div>

        {isOpen && (
          <div className="dropdown-options">
            {icons.map((icon) => (
              <div
                key={icon.name}
                className={`dropdown-option ${
                  value === icon.name ? "selected" : ""
                }`}
                onClick={() => {
                  onChange(icon.name);
                  setIsOpen(false);
                }}
              >
                <Image src={icon.src} alt={icon.name} width={24} height={24} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderContactField = (fieldName, label) => {
    const contactData = formData[fieldName] || { icon: "", link: "" };

    const handleIconChange = (iconName) => {
      handleContactChange(fieldName, {
        ...contactData,
        icon: iconName,
      });
    };

    const handleLinkChange = (e) => {
      handleContactChange(fieldName, {
        ...contactData,
        link: e.target.value,
      });
    };

    return (
      <div className="contact-field">
        <IconDropdown
          value={contactData.icon || ""}
          onChange={handleIconChange}
        />
        <input
          type="text"
          value={contactData.link || ""}
          onChange={handleLinkChange}
          placeholder={label}
          className="contact-input"
        />
      </div>
    );
  };

  if (initialLoad) {
    return <LoadingProgress />;
  }

  return (
    <CreatePageWrapper
      title="Контакты"
      handleSubmit={handleSubmit}
      link="/admin/contact"
      content={
        <>
          <p className="section-title">ОФИС КОМАНДЫ</p>

          <input
            type="text"
            name="teamOfficeAddress"
            value={formData.teamOfficeAddress || ""}
            onChange={(e) => handleChange("teamOfficeAddress", e.target.value)}
            placeholder="Адрес офиса"
            className="text-input"
          />

          {renderContactField("teamOfficeContact1", "Контакт 1")}
          {renderContactField("teamOfficeContact2", "Контакт 2")}
          {renderContactField("teamOfficeContact3", "Контакт 3")}

          <p className="subsection-title">
            МЕНЕДЖЕРЫ ПРОЕКТОВ, АРЕНДА ОБОРУДОВАНИЯ
          </p>
          {renderContactField(
            "projectManagerContact1",
            "Контакт менеджера проектов 1"
          )}
          {renderContactField(
            "projectManagerContact2",
            "Контакт менеджера проектов 2"
          )}
          {renderContactField(
            "projectManagerContact3",
            "Контакт менеджера проектов 3"
          )}

          <p className="subsection-title">БУХГАЛТЕРИЯ</p>
          {renderContactField(
            "accountManagerContact1",
            "Контакт бухгалтерии 1"
          )}
          {renderContactField(
            "accountManagerContact2",
            "Контакт бухгалтерии 2"
          )}
          {renderContactField(
            "accountManagerContact3",
            "Контакт бухгалтерии 3"
          )}

          <p className="subsection-title">АРЕНДА ЛИНОЛЕУМА</p>
          {renderContactField(
            "deliveryManagerContact1",
            "Контакт по аренде линолеума 1"
          )}
          {renderContactField(
            "deliveryManagerContact2",
            "Контакт по аренде линолеума 2"
          )}
          {renderContactField(
            "deliveryManagerContact3",
            "Контакт по аренде линолеума 3"
          )}

          <hr className="thirdLine" />
          <p className="section-title">СКЛАД (24 ЧАСА)</p>
          <input
            type="text"
            name="warehouseAddress"
            value={formData.warehouseAddress || ""}
            onChange={(e) => handleChange("warehouseAddress", e.target.value)}
            placeholder="Адрес склада"
            className="text-input"
          />

          {renderContactField("warehouseContact1", "Контакт склада 1")}
          {renderContactField("warehouseContact2", "Контакт склада 2")}
          {renderContactField("warehouseContact3", "Контакт склада 3")}

          <p className="subsection-title">ОТГРУЗКИ, ПРОЕЗД НА СКЛАД</p>
          {renderContactField(
            "travelManagerContact1",
            "Контакт по отгрузкам 1"
          )}
          {renderContactField(
            "travelManagerContact2",
            "Контакт по отгрузкам 2"
          )}
          {renderContactField(
            "travelManagerContact3",
            "Контакт по отгрузкам 3"
          )}

          <p className="subsection-title">АРЕНДА ЗАЛА</p>
          {renderContactField(
            "rentalHallManagerContact1",
            "Контакт по аренде зала 1"
          )}
          {renderContactField(
            "rentalHallManagerContact2",
            "Контакт по аренде зала 2"
          )}
          {renderContactField(
            "rentalHallManagerContact3",
            "Контакт по аренде зала 3"
          )}

          <p className="subsection-title">
            ИНФОРМАЦИОННОЕ ОБЕСПЕЧЕНИЕ, РЕКЛАМА
          </p>
          {renderContactField(
            "advertisingManagerContact1",
            "Контакт по рекламе 1"
          )}
          {renderContactField(
            "advertisingManagerContact2",
            "Контакт по рекламе 2"
          )}
          {renderContactField(
            "advertisingManagerContact3",
            "Контакт по рекламе 3"
          )}

          {loading && <LoadingProgress />}
        </>
      }
    />
  );
};

export default ContactEditPage;
