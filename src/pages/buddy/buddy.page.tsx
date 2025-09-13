import React, { useContext } from 'react';
import HamburgerMenu from '../../components/ui-elements/hamburger-menu.component';
import { UIContext } from '../../contexts/ui.context';
import useMediaQuery from '../../utils/mediaquery';

const BuddyPage = () => {
  const { mobileWebsiteView } = useContext(UIContext);
  const isMobile = useMediaQuery('(max-width: 640px)');

  return (
    <div className="max-xl:flex-col gap-4 w-full flex flex-row p-3 relative">
      <div className="flex-grow">
        {/* Header */}
        <div className="bg-white p-5 rounded-md flex justify-between mb-4">
          <div className="flex flex-col relative">
            <h1 className="text-5xl font-extrabold">Friends</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Connect with your buddies and stay motivated together
            </p>
          </div>
          
          {/* Mobile Hamburger Menu */}
          <div className="flex flex-col">
            <div className="w-[50%] flex flex-col gap-3 align-middle center justify-between">
              <div className="w-[50%] h-[50px] flex">
                {isMobile && <HamburgerMenu />}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-md p-6">
          <p className="text-gray-600 dark:text-gray-400">
            Friends page - coming soon
          </p>
        </div>
      </div>
    </div>
  );
};

export default BuddyPage;
