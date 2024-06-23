import { useContext } from "react";
import { MenuContext } from "../../contexts/menu.context";
import { menuItemType } from "../../types/menuItemType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SignOutButton } from "@clerk/clerk-react";



const SidebarNav = () => {
    const { menuItems, setMenuItems } = useContext(MenuContext);




    return (
        <div
            className="mt-[180px]">
            {menuItems.map((menuItem: menuItemType, menuItemIndex: number) => (
                <div key={menuItemIndex}>
                    <SingleMenuItem menuItemProp={menuItem} />
                </div>
            ))}
        </div>
    );
}

    



export function SingleMenuItem({ menuItemProp }: { menuItemProp: MenuItemType }) {
     const { menuItems, setMenuItems } = useContext(MenuContext);    
     
        const handleMenuCLick = () => {
          const menuListCopy = menuItems.map((menuItem) => {
            if (menuItemProp.name === menuItem.name) {
              return { ...menuItem, isSelected: true };
            }
            return { ...menuItem, isSelected: false };
          });
          setMenuItems(menuListCopy);
        };


    return (
      <div
        onClick={handleMenuCLick}
        className={`flex gap-2 items-center px-3 py-4 mb-2 cursor-pointer rounded-md 
        ${
          menuItemProp.isSelected
            ? "bg-customGreen text-black"
            : " hover:bg-gray-200 transition"
        }`}
      >
        <span className="h-7 w-7 flex items-center"> {menuItemProp.icon}</span>

        {/* <FontAwesomeIcon
          className=""
          icon={menuItemProp.icon}
          width={20}
          height={20}
        /> */}

            <div className="text-2xl font-semibold pl-3">{menuItemProp.name}</div>

      </div>
    );
};
export default SidebarNav;