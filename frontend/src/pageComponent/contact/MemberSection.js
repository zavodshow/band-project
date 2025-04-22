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
        const data = await getContactInfo();

        if (data) {
          // Transform API data to required format
          const transformedData = [
            {
              title: "ОФИС КОМАНДЫ",
              contents: [
                {
                  description: data.team_office_address,
                  content: [
                    {
                      icon: data.team_office_contact1?.icon,
                      value: data.team_office_contact1?.link || "",
                    },
                    {
                      icon: data.team_office_contact2?.icon,
                      value: data.team_office_contact2?.link || "",
                    },
                    {
                      icon: data.team_office_contact3?.icon,
                      value: data.team_office_contact3?.link || "",
                    },
                  ],
                },
                {
                  description: "МЕНЕДЖЕРЫ ПРОЕКТОВ, АРЕНДА ОБОРУДОВАНИЯ",
                  content: [
                    {
                      icon: data.project_manager_contact1?.icon,
                      value: data.project_manager_contact1?.link || "",
                    },
                    {
                      icon: data.project_manager_contact2?.icon,
                      value: data.project_manager_contact2?.link || "",
                    },
                    {
                      icon: data.project_manager_contact3?.icon,
                      value: data.project_manager_contact3?.link || "",
                    },
                  ],
                },
                {
                  description: "БУХГАЛТЕРИЯ",
                  content: [
                    {
                      icon: data.account_manager_contact1?.icon,
                      value: data.account_manager_contact1?.link || "",
                    },
                    {
                      icon: data.account_manager_contact2?.icon,
                      value: data.account_manager_contact2?.link || "",
                    },
                    {
                      icon: data.account_manager_contact3?.icon,
                      value: data.account_manager_contact3?.link || "",
                    },
                  ],
                },
                {
                  description: "АРЕНДА ЛИНОЛЕУМА",
                  content: [
                    {
                      icon: data.delivery_manager_contact1?.icon,
                      value: data.delivery_manager_contact1?.link || "",
                    },
                    {
                      icon: data.delivery_manager_contact2?.icon,
                      value: data.delivery_manager_contact2?.link || "",
                    },
                    {
                      icon: data.delivery_manager_contact3?.icon,
                      value: data.delivery_manager_contact3?.link || "",
                    },
                  ],
                },
              ],
            },
            {
              title: "СКЛАД (24 ЧАСА)",
              contents: [
                {
                  description: data.warehouse_address,
                  content: [
                    {
                      icon: data.warehouse_contact1?.icon,
                      value: data.warehouse_contact1?.link || "",
                    },
                    {
                      icon: data.warehouse_contact2?.icon,
                      value: data.warehouse_contact2?.link || "",
                    },
                    {
                      icon: data.warehouse_contact3?.icon,
                      value: data.warehouse_contact3?.link || "",
                    },
                  ],
                },
                {
                  description: "ОТГРУЗКИ, ПРОЕЗД НА СКЛАД",
                  content: [
                    {
                      icon: data.travel_manager_contact1?.icon,
                      value: data.travel_manager_contact1?.link || "",
                    },
                    {
                      icon: data.travel_manager_contact2?.icon,
                      value: data.travel_manager_contact2?.link || "",
                    },
                    {
                      icon: data.travel_manager_contact3?.icon,
                      value: data.travel_manager_contact3?.link || "",
                    },
                  ],
                },
                {
                  description: "АРЕНДА ЗАЛА",
                  content: [
                    {
                      icon: data.rental_hall_manager_contact1?.icon,
                      value: data.rental_hall_manager_contact1?.link || "",
                    },
                    {
                      icon: data.rental_hall_manager_contact2?.icon,
                      value: data.rental_hall_manager_contact2?.link || "",
                    },
                    {
                      icon: data.rental_hall_manager_contact3?.icon,
                      value: data.rental_hall_manager_contact3?.link || "",
                    },
                  ],
                },
                {
                  description:
                    "ИНФОРМАЦИОННОЕ ОБЕСПЕЧЕНИЕ, РЕКЛАМА; ЗАКАЗ ИНТРО",
                  content: [
                    {
                      icon: data.advertising_manager_contact1?.icon,
                      value: data.advertising_manager_contact1?.link || "",
                    },
                    {
                      icon: data.advertising_manager_contact2?.icon,
                      value: data.advertising_manager_contact2?.link || "",
                    },
                    {
                      icon: data.advertising_manager_contact3?.icon,
                      value: data.advertising_manager_contact3?.link || "",
                    },
                  ],
                },
                // {
                //   description: "ЗАКАЗ ИНТРО",
                //   content: [
                //     {
                //       icon: data.order_manager_contact1?.icon,
                //       value: data.order_manager_contact1?.link || "",
                //     },
                //     {
                //       icon: data.order_manager_contact2?.icon,
                //       value: data.order_manager_contact2?.link || "",
                //     },
                //     {
                //       icon: data.order_manager_contact3?.icon,
                //       value: data.order_manager_contact3?.link || "",
                //     },
                //   ],
                // },
              ],
            },
          ];

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
    // Check if it's a phone number (miniPhone icon)

    const iconSrc = iconMap[item.icon]; // Get actual image

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
      console.log(item.name);
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
