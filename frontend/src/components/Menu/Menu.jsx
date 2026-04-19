import estilo from './Menu.module.css'
import { NavLink } from "react-router-dom"
import { IoMdHome } from "react-icons/io";
import { IoChevronBackCircle, IoMenuOutline, IoLogOutOutline } from "react-icons/io5";
import { FaPlusCircle, FaFileAlt } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Menu() {

    const [menuState, setMenuState] = useState(false)
    const navigate = useNavigate()

    const mostrarMenu = () => setMenuState((menuState) => !menuState)

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <nav className={`${menuState ? estilo['container-nav'] : estilo['container-nav__close']}`}>
            {menuState ?
                <div className={estilo['nav-nome-clinica']}>
                    <span>Os Luzias</span>
                    <IoChevronBackCircle onClick={mostrarMenu} />
                </div>
                :
                <div className={estilo['nav-menu']}>
                    <IoMenuOutline onClick={mostrarMenu} />
                </div>
            }
            <ul className={estilo['nav-items']}>
                <li className={estilo['nav-item']}>
                    <NavLink to='/' end className={({ isActive }) => isActive ? estilo['ativo'] : undefined}>
                        <IoMdHome />
                        <span className={`${menuState ? undefined : estilo['close']}`}>Início</span>
                    </NavLink>
                </li>
                {/* <li className={estilo['nav-item']}>
                    <NavLink to='/cadastrar'>
                        <BsPersonFillAdd />
                        <span className={`${menuState ? undefined : estilo['close']}`}>Cadastrar</span>
                    </NavLink>
                </li> */}
                <li className={estilo['nav-item']}>
                    <NavLink to='novo-artigo' className={({ isActive }) => isActive ? estilo['ativo'] : undefined}>
                        <FaPlusCircle />
                        <span className={`${menuState ? undefined : estilo['close']}`}>Novo Artigo</span>
                    </NavLink>
                </li>
                <li className={estilo['nav-item']}>
                    <NavLink to='/artigos' className={({ isActive }) => isActive ? estilo['ativo'] : undefined}>
                        <FaFileAlt />
                        <span className={`${menuState ? undefined : estilo['close']}`}>Artigos</span>
                    </NavLink>
                </li>
                <li className={`${estilo['nav-item']} ${estilo['btn-sair']}`}>
                    <NavLink onClick={handleLogout}>
                        <IoLogOutOutline />
                        <span className={`${menuState ? undefined : estilo['close']}`}>Sair</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
