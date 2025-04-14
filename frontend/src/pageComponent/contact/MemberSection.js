import Image from "next/image";
import { useState, useEffect } from "react";
import { miniClock, miniMail, miniPhone, miniTelegram } from "../../assets";
import { teamOfficeInfo } from "../../constant/group";
import { getContactInfo } from "@/api/contactAPI";

const MemberSection = () => {
  const [loading, setLoading] = useState(false);
  const [contactData, setContactData] = useState(teamOfficeInfo);

  // Map icon strings to actual icon components
  const iconMap = {
    miniPhone,
    miniMail,
    miniClock,
    miniTelegram,
  };

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
                      icon: iconMap[data.team_office_contact1?.icon],
                      value: data.team_office_contact1?.link || "",
                    },
                    {
                      icon: iconMap[data.team_office_contact2?.icon],
                      value: data.team_office_contact2?.link || "",
                    },
                    {
                      icon: iconMap[data.team_office_contact3?.icon],
                      value: data.team_office_contact3?.link || "",
                    },
                  ],
                },
                {
                  description: "МЕНЕДЖЕРЫ ПРОЕКТОВ, АРЕНДА ОБОРУДОВАНИЯ",
                  content: [
                    {
                      icon: iconMap[data.project_manager_contact1?.icon],
                      value: data.project_manager_contact1?.link || "",
                    },
                    {
                      icon: iconMap[data.project_manager_contact2?.icon],
                      value: data.project_manager_contact2?.link || "",
                    },
                    {
                      icon: iconMap[data.project_manager_contact3?.icon],
                      value: data.project_manager_contact3?.link || "",
                    },
                  ],
                },
                {
                  description: "БУХГАЛТЕРИЯ",
                  content: [
                    {
                      icon: iconMap[data.account_manager_contact1?.icon],
                      value: data.account_manager_contact1?.link || "",
                    },
                    {
                      icon: iconMap[data.account_manager_contact2?.icon],
                      value: data.account_manager_contact2?.link || "",
                    },
                    {
                      icon: iconMap[data.account_manager_contact3?.icon],
                      value: data.account_manager_contact3?.link || "",
                    },
                  ],
                },
                {
                  description: "АРЕНДА ЛИНОЛЕУМА",
                  content: [
                    {
                      icon: iconMap[data.delivery_manager_contact1?.icon],
                      value: data.delivery_manager_contact1?.link || "",
                    },
                    {
                      icon: iconMap[data.delivery_manager_contact2?.icon],
                      value: data.delivery_manager_contact2?.link || "",
                    },
                    {
                      icon: iconMap[data.delivery_manager_contact3?.icon],
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
                      icon: iconMap[data.warehouse_contact1?.icon],
                      value: data.warehouse_contact1?.link || "",
                    },
                    {
                      icon: iconMap[data.warehouse_contact2?.icon],
                      value: `Пн-Сб: ${data.warehouse_contact2?.link || ""}`,
                    },
                    {
                      icon: iconMap[data.warehouse_contact3?.icon],
                      value: data.warehouse_contact3?.link || "",
                    },
                  ],
                },
                {
                  description: "ОТГРУЗКИ, ПРОЕЗД НА СКЛАД",
                  content: [
                    {
                      icon: iconMap[data.travel_manager_contact1?.icon],
                      value: data.travel_manager_contact1?.link || "",
                    },
                    {
                      icon: iconMap[data.travel_manager_contact2?.icon],
                      value: data.travel_manager_contact2?.link || "",
                    },
                    {
                      icon: iconMap[data.travel_manager_contact3?.icon],
                      value: data.travel_manager_contact3?.link || "",
                    },
                  ],
                },
                {
                  description: "АРЕНДА ЗАЛА",
                  content: [
                    {
                      icon: iconMap[data.rental_hall_manager_contact1?.icon],
                      value: data.rental_hall_manager_contact1?.link || "",
                    },
                    {
                      icon: iconMap[data.rental_hall_manager_contact2?.icon],
                      value: data.rental_hall_manager_contact2?.link || "",
                    },
                    {
                      icon: iconMap[data.rental_hall_manager_contact3?.icon],
                      value: data.rental_hall_manager_contact3?.link || "",
                    },
                  ],
                },
                {
                  description: "ИНФОРМАЦИОННОЕ ОБЕСПЕЧЕНИЕ, РЕКЛАМА",
                  content: [
                    {
                      icon: iconMap[data.advertising_manager_contact1?.icon],
                      value: data.advertising_manager_contact1?.link || "",
                    },
                    {
                      icon: iconMap[data.advertising_manager_contact2?.icon],
                      value: data.advertising_manager_contact2?.link || "",
                    },
                    {
                      icon: iconMap[data.advertising_manager_contact3?.icon],
                      value: data.advertising_manager_contact3?.link || "",
                    },
                  ],
                },
                {
                  description: "ЗАКАЗ ИНТРО",
                  content: [
                    {
                      icon: iconMap[data.order_manager_contact1?.icon],
                      value: data.order_manager_contact1?.link || "",
                    },
                    {
                      icon: iconMap[data.order_manager_contact2?.icon],
                      value: data.order_manager_contact2?.link || "",
                    },
                    {
                      icon: iconMap[data.order_manager_contact3?.icon],
                      value: data.order_manager_contact3?.link || "",
                    },
                  ],
                },
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

  // Helper function to render contact items
  const renderContactItem = (item, index) => {
    if (!item?.icon || !item?.value) return null;

    return (
      <div key={index} className="alignCenter">
        <Image src={item.icon} alt="icon" style={{ marginRight: "8px" }} />
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
