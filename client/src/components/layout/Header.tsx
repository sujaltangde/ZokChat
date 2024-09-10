import { Tooltip } from '@mui/material';
import { lazy, Suspense, useState } from 'react'
import { MdGroups, MdSearch, MdAdd, MdMenu, MdLogout, MdMenuOpen, MdOutlineNotificationsNone } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SearchDialog = lazy(() => import('../specific/Search'));
const NotificationsDialog = lazy(() => import('../specific/Notifications'));
const NewGroupDialog = lazy(() => import('../specific/NewGroup'));




const Header = () => {

  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const [isNewGroup, setIsNewGroup] = useState<boolean>(false)
  const [isNotification, setIsNotification] = useState<boolean>(false)

  const navigate = useNavigate()

  const openSearchDialog = () => {
    setIsSearch(prev => !prev)
  }

  const openNewGroup = () => {
    setIsNewGroup(prev => !prev)
  }

  const openNotifictions = () => {
    setIsNotification(prev => !prev)
  }

  const handleLogout = () => {

  }




  return (
    <>

      <div className="h-[8vh] bg-[#890CBD] flex justify-between items-center xl:px-5 px-3 py-1">

        <div className="flex items-center gap-3">
          <button className="xl:hidden flex" onClick={() => setIsMobile(prev => !prev)}>
            {
              !isMobile ?
                <MdMenu size={28} className="text-white" />
                :
                <MdMenuOpen size={28} className="text-white" />
            }
          </button>
          <Link to="/">
          <img src="/assets/logoPng/logo-white-nobg.png" alt="logo-white" className=" xl:h-10 h-6" />
          </Link>
        </div>

        <div className="flex xl:gap-8 gap-4 items-center text-white">
          <Tooltip title="Search">
            <button onClick={openSearchDialog}><MdSearch size={28} /></button>
          </Tooltip>
          <Tooltip title="New Group">
            <button onClick={openNewGroup}><MdAdd size={28} /> </button>
          </Tooltip>
          <Tooltip title="Groups">
            <button onClick={() => navigate("/groups")}>
              <MdGroups size={28} />
            </button>
          </Tooltip>
          <Tooltip title="Notifications">
            <button onClick={openNotifictions}>
              <MdOutlineNotificationsNone size={28} />
            </button>
          </Tooltip>
          <Tooltip title="Logout">
            <button onClick={handleLogout}>
              <MdLogout size={26} />
            </button>
          </Tooltip>
        </div>

      </div>


      {
        isSearch &&
        <Suspense fallback={null} >
          <SearchDialog open={isSearch} setIsSearch={setIsSearch} />
        </Suspense>
      }
      {
        isNotification &&
        <Suspense fallback={null} >
          <NotificationsDialog open={isNotification} setIsNotification={setIsNotification} />
        </Suspense>
      }
      {
        isNewGroup &&
        <Suspense fallback={null} >
          <NewGroupDialog open={isNewGroup} setIsNewGroup={setIsNewGroup} />
        </Suspense>
      }

    </>
  )
}

export default Header