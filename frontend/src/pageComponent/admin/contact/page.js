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

// Memoized IconDropdown component
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

// Contact Field component
const ContactField = memo(({ contact, index, onChange }) => {
  const handleIconChange = useCallback(
    (iconName) => {
      onChange(index, { ...contact, icon: iconName });
    },
    [contact, index, onChange]
  );

  const handleLinkChange = useCallback(
    (e) => {
      onChange(index, { ...contact, link: e.target.value });
    },
    [contact, index, onChange]
  );

  return (
    <div className="contact-field">
      <IconDropdown value={contact.icon || ""} onChange={handleIconChange} />
      <input
        type="text"
        value={contact.link || ""}
        onChange={handleLinkChange}
        placeholder="Контакт"
        className="contact-input"
      />
    </div>
  );
});

ContactField.displayName = "ContactField";

// ContactSubSection component
const ContactSubSection = memo(
  ({ subSection, sectionIndex, subSectionIndex, onUpdate, onRemove }) => {
    const handleTitleChange = useCallback(
      (e) => {
        const updatedSubSection = { ...subSection, title: e.target.value };
        onUpdate(sectionIndex, subSectionIndex, updatedSubSection);
      },
      [subSection, sectionIndex, subSectionIndex, onUpdate]
    );

    const handleContactChange = useCallback(
      (contactIndex, updatedContact) => {
        const updatedContacts = [...subSection.contacts];
        updatedContacts[contactIndex] = updatedContact;

        const updatedSubSection = { ...subSection, contacts: updatedContacts };
        onUpdate(sectionIndex, subSectionIndex, updatedSubSection);
      },
      [subSection, sectionIndex, subSectionIndex, onUpdate]
    );

    return (
      <div className="contact-subsection">
        <p className="subsection-title">Подраздел {subSectionIndex + 1}</p>
        <div className="subsection-header">
          <input
            type="text"
            value={subSection.title || ""}
            onChange={handleTitleChange}
            placeholder="Название подраздела"
            className="subsection-title-input"
          />
          <button
            type="button"
            className="remove-subsection-btn"
            onClick={() => onRemove(sectionIndex, subSectionIndex)}
          >
            Удалить подраздел
          </button>
        </div>

        {subSection.contacts.map((contact, contactIndex) => (
          <ContactField
            key={contactIndex}
            contact={contact}
            index={contactIndex}
            onChange={handleContactChange}
          />
        ))}
      </div>
    );
  }
);

ContactSubSection.displayName = "ContactSubSection";

// ContactSection component
const ContactSection = memo(
  ({ section, sectionIndex, onUpdate, onRemove, onAddSubSection }) => {
    const handleTitleChange = useCallback(
      (e) => {
        const updatedSection = { ...section, title: e.target.value };
        onUpdate.updateSection(sectionIndex, updatedSection);
      },
      [section, sectionIndex, onUpdate]
    );

    return (
      <div className="contact-section">
        <p className="section-title">Раздел {sectionIndex + 1}</p>
        <div className="section-header">
          <input
            type="text"
            value={section.title || ""}
            onChange={handleTitleChange}
            placeholder="Название раздела"
            className="section-title-input"
          />
          <button
            type="button"
            className="remove-section-btn"
            onClick={() => onRemove(sectionIndex)}
          >
            Удалить раздел
          </button>
        </div>

        {section.subSections.map((subSection, subSectionIndex) => (
          <ContactSubSection
            key={subSectionIndex}
            subSection={subSection}
            sectionIndex={sectionIndex}
            subSectionIndex={subSectionIndex}
            onUpdate={onUpdate.updateSubSection}
            onRemove={onUpdate.removeSubSection}
          />
        ))}

        <button
          type="button"
          className="add-subsection-btn"
          onClick={() => onAddSubSection(sectionIndex)}
        >
          Добавить подраздел
        </button>

        <hr className="thirdLine" style={{ margin: "16px" }} />
      </div>
    );
  }
);

ContactSection.displayName = "ContactSection";

const ContactEditPage = () => {
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [sections, setSections] = useState([]);

  // Create empty contact object
  const createEmptyContact = () => ({ icon: "", link: "" });

  // Create empty subsection with 3 empty contacts
  const createEmptySubSection = () => ({
    title: "",
    contacts: [
      createEmptyContact(),
      createEmptyContact(),
      createEmptyContact(),
    ],
  });

  // Create empty section with one subsection
  const createEmptySection = () => ({
    title: "",
    subSections: [createEmptySubSection()],
  });

  // Fetch initial data
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setLoading(true);
        const data = await getContactInfo();

        if (data) {
          setSections(data);
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

  // Add new section
  const handleAddSection = useCallback(() => {
    setSections((prev) => [...prev, createEmptySection()]);
  }, []);

  // Remove section
  const handleRemoveSection = useCallback((sectionIndex) => {
    setSections((prev) => prev.filter((_, index) => index !== sectionIndex));
  }, []);

  // Update section
  const handleUpdateSection = useCallback((sectionIndex, updatedSection) => {
    setSections((prev) => {
      const newSections = [...prev];
      newSections[sectionIndex] = updatedSection;
      return newSections;
    });
  }, []);

  // Add subsection to section
  const handleAddSubSection = useCallback((sectionIndex) => {
    setSections((prev) => {
      // Create a new copy of the sections array
      const newSections = [...prev];
      // Add exactly one new subsection
      newSections[sectionIndex] = {
        ...newSections[sectionIndex],
        subSections: [
          ...newSections[sectionIndex].subSections,
          createEmptySubSection(),
        ],
      };
      return newSections;
    });
  }, []);

  // Remove subsection
  const handleRemoveSubSection = useCallback(
    (sectionIndex, subSectionIndex) => {
      setSections((prev) => {
        const newSections = [...prev];
        newSections[sectionIndex].subSections = newSections[
          sectionIndex
        ].subSections.filter((_, index) => index !== subSectionIndex);
        return newSections;
      });
    },
    []
  );

  // Update subsection
  const handleUpdateSubSection = useCallback(
    (sectionIndex, subSectionIndex, updatedSubSection) => {
      setSections((prev) => {
        const newSections = [...prev];
        newSections[sectionIndex].subSections[subSectionIndex] =
          updatedSubSection;
        return newSections;
      });
    },
    []
  );

  // Handle form submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        await updateContactInfo(sections);
        alert("Contact information updated successfully");
      } catch (error) {
        console.error("Error updating contact info:", error);
        alert("Failed to update contact information");
      } finally {
        setLoading(false);
      }
    },
    [sections]
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
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <ContactSection
                section={section}
                sectionIndex={sectionIndex}
                onUpdate={{
                  updateSection: handleUpdateSection,
                  updateSubSection: handleUpdateSubSection,
                  removeSubSection: handleRemoveSubSection,
                }}
                onRemove={handleRemoveSection}
                onAddSubSection={handleAddSubSection}
              />
            </div>
          ))}

          <button
            type="button"
            className="add-section-btn"
            onClick={handleAddSection}
          >
            Добавить раздел
          </button>

          <hr className="thirdLine" style={{ marginTop: "16px" }} />

          {loading && <LoadingProgress />}
        </>
      }
    />
  );
};

export default ContactEditPage;
