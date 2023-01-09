import { Navigate, Outlet } from "react-router-dom";
import DomainRecord from "../../components/domain-record/DomainRecord";
import Navbar from "../../components/navbar/Navbar";

import './Navigation.styles.scss';

const Navigation = () => {
  return (
    <div className='navigation'>
      <DomainRecord />
      <Outlet />
      <Navbar />
    </div>
  )
  
}

export default Navigation;