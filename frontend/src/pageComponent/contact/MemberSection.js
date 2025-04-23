import Image from "next/image";
import { useState, useEffect } from "react";
import { miniClock, miniMail, miniPhone, miniTelegram } from "../../assets";
import { teamOfficeInfo } from "../../constant/group";
import { getContactInfo } from "@/api/contactAPI";

const iconMap = {
  miniPhone,
  miniTelegram,
  miniMail,
  miniClock,
};

const MemberSection = () => {
  const [loading, setLoading] = useState(false);
  const [contactData, setContactData] = useState(teamOfficeInfo);

  // Fetch initial data
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setLoading(true);
        const sectionsData = await getContactInfo();

        if (sectionsData && sectionsData.length > 0) {
          // Transform API data from new structured format to the required display format
          const transformedData = sectionsData.map(section => {
            return {
              title: section.title,
              contents: section.subSections.map(subSection => {
                return {
                  description: subSection.title,
                  content: subSection.contacts
                    .filter(contact => contact.icon && contact.link)
                    .map(contact => {
                      return {
                        icon: contact.icon,
                        value: contact.link || ""
                      };
                    })
                };
              })
            };
          });

          setContactData(transformedData);
        }
      } catch (error) {
        console.error("Error fetching contact info:", error);
        // Fallback to hardcoded data (already set as default)
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  // Helper function to render contact items with clickable links
  const renderContactItem = (item, index) => {
    if (!item?.icon || !item?.value) return null;
    
    const iconSrc = iconMap[item.icon]; // Get actual image
    if (!iconSrc) return null; // Skip if icon not found

    if (item.icon === "miniPhone") {
      // Clean phone number - remove all non-digit characters
      const phoneNumber = item.value.replace(/[^\d+]/g, "");
      return (
        <div key={index} className="alignCenter">
          <Image src={iconSrc} alt="icon" style={{ marginRight: "8px" }} />
          <a
            href={`tel:${phoneNumber}`}
            className="x14_3"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {item.value}
          </a>
        </div>
      );
    }

    // Check if it's a Telegram link (miniTelegram icon)
    if (item.icon === "miniTelegram") {
      // Check if it's already a proper Telegram link
      let telegramLink = item.value;
      if (!telegramLink.startsWith("http") && !telegramLink.startsWith("@")) {
        // If it's just a username without @, add it
        telegramLink = telegramLink.startsWith("@")
          ? telegramLink
          : `@${telegramLink}`;
      }
      if (!telegramLink.startsWith("http")) {
        telegramLink = `https://t.me/${telegramLink.replace("@", "")}`;
      }

      return (
        <div key={index} className="alignCenter">
          <Image src={iconSrc} alt="icon" style={{ marginRight: "8px" }} />
          <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="x14_3"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {item.value}
          </a>
        </div>
      );
    }

    // Check if it's an email address (miniMail icon)
    if (item.icon === "miniMail") {
      return (
        <div key={index} className="alignCenter">
          <Image src={iconSrc} alt="icon" style={{ marginRight: "8px" }} />
          <a
            href={`mailto:${item.value}`}
            className="x14_3"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {item.value}
          </a>
        </div>
      );
    }

    // Default case (non-clickable)
    return (
      <div key={index} className="alignCenter">
        <Image src={iconSrc} alt="icon" style={{ marginRight: "8px" }} />
        <span className="x14_3">{item.value}</span>
      </div>
    );
  };

  return (
    <div className="contactAddress meberSquare">
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        contactData.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {/* Section Title */}
            <div className="smallHalfWidth memberType">
              <h2 className="x16_2" style={{ marginBottom: "15px" }}>
                {section.title}
              </h2>
            </div>

            {/* Section Contents */}
            {(section.contents || []).map((item, itemIndex) => (
              <div
                key={`${sectionIndex}-${itemIndex}`}
                className="flexWrap spaceBetween memberInfo"
                style={{ marginBottom: "30px" }}
              >
                {/* Item Description */}
                <div className="smallHalfWidth memberType">
                  <p className="x15_1">{item.description}</p>
                </div>

                {/* Item Content/Contacts */}
                <div className="smallHalfWidth memberData">
                  {(item.content || []).map((contact, contactIndex) =>
                    renderContactItem(contact, contactIndex)
                  )}
                </div>
              </div>
            ))}

            {sectionIndex === 0 && <hr className="thirdLine" />}
          </div>
        ))
      )}
    </div>
  );
};

export default MemberSection;