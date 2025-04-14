"use client";

import { useState, useEffect, memo, useCallback } from "react";
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

// Memoized IconDropdown to prevent unnecessary re-renders
const IconDropdown = memo(({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedIcon = value ? icons.find((icon) => icon.name === value) : null;

  const handleOptionClick = useCallback(
    (iconName) => {
      onChange(iconName);
      setIsOpen(false);
    },
    [onChange]
  );

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
              onClick={() => handleOptionClick(icon.name)}
            >
              <Image src={icon.src} alt={icon.name} width={24} height={24} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

IconDropdown.displayName = "IconDropdown";

// Memoized ContactField component
const ContactField = memo(
  ({ fieldName, label, contactData, onContactChange }) => {
    const handleIconChange = useCallback(
      (iconName) => {
        onContactChange(fieldName, {
          ...contactData,
          icon: iconName,
        });
      },
      [fieldName, contactData, onContactChange]
    );

    const handleLinkChange = useCallback(
      (e) => {
        onContactChange(fieldName, {
          ...contactData,
          link: e.target.value,
        });
      },
      [fieldName, contactData, onContactChange]
    );

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
  }
);

ContactField.displayName = "ContactField";

// Memoized Section component
const ContactSection = memo(({ title, children }) => {
  return (
    <>
      <p className="section-title">{title}</p>
      {children}
    </>
  );
});

ContactSection.displayName = "ContactSection";

// Memoized SubSection component
const ContactSubSection = memo(({ title, children }) => {
  return (
    <>
      <p className="subsection-title">{title}</p>
      {children}
    </>
  );
});

ContactSubSection.displayName = "ContactSubSection";

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
    order_manager_contact1: null,
    order_manager_contact2: null,
    order_manager_contact3: null,
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

  const handleChange = useCallback((fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  }, []);

  const handleContactChange = useCallback((fieldName, contactData) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: contactData,
    }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        await updateContactInfo(formData);
        alert("Contact information updated successfully");
      } catch (error) {
        console.error("Error updating contact info:", error);
        alert("Failed to update contact information");
      } finally {
        setLoading(false);
      }
    },
    [formData]
  );

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
          <ContactSection title="ОФИС КОМАНДЫ">
            <input
              type="text"
              name="team_office_address"
              value={formData.team_office_address || ""}
              onChange={(e) =>
                handleChange("team_office_address", e.target.value)
              }
              placeholder="Адрес офиса"
              className="text-input"
            />

            <ContactField
              fieldName="team_office_contact1"
              label="Контакт 1"
              contactData={
                formData.team_office_contact1 || { icon: "", link: "" }
              }
              onContactChange={handleContactChange}
            />
            <ContactField
              fieldName="team_office_contact2"
              label="Контакт 2"
              contactData={
                formData.team_office_contact2 || { icon: "", link: "" }
              }
              onContactChange={handleContactChange}
            />
            <ContactField
              fieldName="team_office_contact3"
              label="Контакт 3"
              contactData={
                formData.team_office_contact3 || { icon: "", link: "" }
              }
              onContactChange={handleContactChange}
            />
          </ContactSection>

          <ContactSubSection title="МЕНЕДЖЕРЫ ПРОЕКТОВ, АРЕНДА ОБОРУДОВАНИЯ">
            <ContactField
              fieldName="project_manager_contact1"
              label="Контакт менеджера проектов 1"
              contactData={
                formData.project_manager_contact1 || { icon: "", link: "" }
              }
              onContactChange={handleContactChange}
            />
            <ContactField
              fieldName="project_manager_contact2"
              label="Контакт менеджера проектов 2"
              contactData={
                formData.project_manager_contact2 || { icon: "", link: "" }
              }
              onContactChange={handleContactChange}
            />
            <ContactField
              fieldName="project_manager_contact3"
              label="Контакт менеджера проектов 3"
              contactData={
                formData.project_manager_contact3 || { icon: "", link: "" }
              }
              onContactChange={handleContactChange}
            />
          </ContactSubSection>

          <ContactSubSection title="БУХГАЛТЕРИЯ">
            <ContactField
              fieldName="account_manager_contact1"
              label="Контакт бухгалтерии 1"
              contactData={
                formData.account_manager_contact1 || { icon: "", link: "" }
              }
              onContactChange={handleContactChange}
            />
            <ContactField
              fieldName="account_manager_contact2"
              label="Контакт бухгалтерии 2"
              contactData={
                formData.account_manager_contact2 || { icon: "", link: "" }
              }
              onContactChange={handleContactChange}
            />
            <ContactField
              fieldName="account_manager_contact3"
              label="Контакт бухгалтерии 3"
              contactData={
                formData.account_manager_contact3 || { icon: "", link: "" }
              }
              onContactChange={handleContactChange}
            />
          </ContactSubSection>

          <ContactSubSection title="АРЕНДА ЛИНОЛЕУМА">
            <ContactField
              fieldName="delivery_manager_contact1"
              label="Контакт по аренде линолеума 1"
              contactData={
                formData.delivery_manager_contact1 || { icon: "", link: "" }
              }
              onContactChange={handleContactChange}
            />
            <ContactField
              fieldName="delivery_manager_contact2"
              label="Контакт по аренде линолеума 2"
              contactData={
                formData.delivery_manager_contact2 || { icon: "", link: "" }
              }
              onContactChange={handleContactChange}
            />
            <ContactField
              fieldName="delivery_manager_contact3"
              label="Контакт по аренде линолеума 3"
              contactData={
                formData.delivery_manager_contact3 || { icon: "", link: "" }
              }
              onContactChange={handleContactChange}
            />
          </ContactSubSection>

          <hr className="thirdLine" />

          <ContactSection title="СКЛАД (24 ЧАСА)">
            <input
              type="text"
              name="warehouse_address"
              value={formData.warehouse_address || ""}
              onChange={(e) =>
                handleChange("warehouse_address", e.target.value)
              }
              placeholder="Адрес склада"
              className="text-input"
            />

            <ContactField
              fieldName="warehouse_contact1"
              label="Контакт склада 1"
              contactData={
                formData.warehouse_contact1 || { icon: "", link: "" }
              }
              onContactChange={handleContactChange}
            />
            <ContactField
              fieldName="warehouse_contact2"
              label="Контакт склада 2"
              contactData={
                formData.warehouse_contact2 || { icon: "", link: "" }
              }
              onContactChange={handleContactChange}
            />
            <ContactField
              fieldName="warehouse_contact3"
              label="Контакт склада 3"
              contactData={
                formData.warehouse_contact3 || { icon: "", link: "" }
              }
              onContactChange={handleContactChange}
            />
          </ContactSection>

          <ContactSubSection title="ОТГРУЗКИ, ПРОЕЗД НА СКЛАД">
            <ContactField
              fieldName="travel_manager_contact1"
              label="Контакт по отгрузкам 1"
              contactData={
                formData.travel_manager_contact1 || { icon: "", link: "" }
              }
              onContactChange={handleContactChange}
            />
            <ContactField
              fieldName="travel_manager_contact2"
              label="Контакт по отгрузкам 2"
              contactData={
                formData.travel_manager_contact2 || { icon: "", link: "" }
              }
              onContactChange={handleContactChange}
            />
            <ContactField
              fieldName="travel_manager_contact3"
              label="Контакт по отгрузкам 3"
              contactData={
                formData.travel_manager_contact3 || { icon: "", link: "" }
              }
              onContactChange={handleContactChange}
            />
          </ContactSubSection>

          <ContactSubSection title="АРЕНДА ЗАЛА">
            <ContactField
              fieldName="rental_hall_manager_contact1"
              label="Контакт по аренде зала 1"
              contactData={
                formData.rental_hall_manager_contact1 || { icon: "", link: "" }
              }
              onContactChange={handleContactChange}
            />
            <ContactField
              fieldName="rental_hall_manager_contact2"
              label="Контакт по аренде зала 2"
              contactData={
                formData.rental_hall_manager_contact2 || { icon: "", link: "" }
              }
              onContactChange={handleContactChange}
            />
            <ContactField
              fieldName="rental_hall_manager_contact3"
              label="Контакт по аренде зала 3"
              contactData={
                formData.rental_hall_manager_contact3 || { icon: "", link: "" }
              }
              onContactChange={handleContactChange}
            />
          </ContactSubSection>

          <ContactSubSection title="ИНФОРМАЦИОННОЕ ОБЕСПЕЧЕНИЕ, РЕКЛАМА">
            <ContactField
              fieldName="advertising_manager_contact1"
              label="Контакт по рекламе 1"
              contactData={
                formData.advertising_manager_contact1 || { icon: "", link: "" }
              }
              onContactChange={handleContactChange}
            />
            <ContactField
              fieldName="advertising_manager_contact2"
              label="Контакт по рекламе 2"
              contactData={
                formData.advertising_manager_contact2 || { icon: "", link: "" }
              }
              onContactChange={handleContactChange}
            />
            <ContactField
              fieldName="advertising_manager_contact3"
              label="Контакт по рекламе 3"
              contactData={
                formData.advertising_manager_contact3 || { icon: "", link: "" }
              }
              onContactChange={handleContactChange}
            />
          </ContactSubSection>

          <ContactSubSection title="ЗАКАЗ ИНТРО">
            <ContactField
              fieldName="order_manager_contact1"
              label="Контакт менеджера по заказам 1"
              contactData={
                formData.order_manager_contact1 || { icon: "", link: "" }
              }
              onContactChange={handleContactChange}
            />
            <ContactField
              fieldName="order_manager_contact2"
              label="Контакт менеджера по заказам 2"
              contactData={
                formData.order_manager_contact2 || { icon: "", link: "" }
              }
              onContactChange={handleContactChange}
            />
            <ContactField
              fieldName="order_manager_contact3"
              label="Контакт менеджера по заказам 3"
              contactData={
                formData.order_manager_contact3 || { icon: "", link: "" }
              }
              onContactChange={handleContactChange}
            />
          </ContactSubSection>

          {loading && <LoadingProgress />}
        </>
      }
    />
  );
};

export default ContactEditPage;
