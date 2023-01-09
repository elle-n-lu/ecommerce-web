import React from 'react'
import Navbar from './Navbar'
import { RootState } from "../store/store";
import { useSelector } from 'react-redux';
interface NavbarCompProps {

}

const NavbarComp:React.FC<NavbarCompProps>=({})=>{
    const login = useSelector((state: RootState)=>state.loginer.login)

        return (
            <Navbar login={login} />
        )
}

export default NavbarComp