import { Typography } from '@mui/joy';
import { useAuth } from '../../hooks/useAuth';
import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { FaTasks, FaConnectdevelop } from "react-icons/fa";

export const Navbar = () => {
    const { user, logout } = useAuth();
    const [showInfo, setShowInfo] = useState(false)
    const navigate = useNavigate();
    const infoRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (infoRef.current && !infoRef.current.contains(event.target as Node)) {
                setShowInfo(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div className={styles.navbar}>
            <div onClick={() => navigate('/dashboard')} style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer' }}>
                <img style={{ width: '50px' }} src="/task-logo.png" alt="App Logo" />
                <Typography sx={{ fontSize: '18px' }}>
                    Task <br />Management<br />
                </Typography>
            </div>

            <div className={styles.listNavItems}>
                <div onClick={() => navigate('/dashboard')} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <FaTasks color='#83cdf5' />
                    <p style={{ fontSize: '14px' }}>Taks</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <FaConnectdevelop color='' />
                    <p style={{ fontSize: '14px' }}>Lorem</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <FaConnectdevelop color='' />
                    <p style={{ fontSize: '14px' }}>Lorem</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <FaConnectdevelop color='' />
                    <p style={{ fontSize: '14px' }}>Lorem</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <FaConnectdevelop color='' />
                    <p style={{ fontSize: '14px' }}>Lorem</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <FaConnectdevelop color='' />
                    <p style={{ fontSize: '14px' }}>Lorem</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <FaConnectdevelop color='' />
                    <p style={{ fontSize: '14px' }}>Lorem</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <FaConnectdevelop color='' />
                    <p style={{ fontSize: '14px' }}>Lorem</p>
                </div>
            </div>

            <div>
                <div className={styles.user} onClick={() => setShowInfo(!showInfo)}>
                    {user.name.substring(0, 2).toUpperCase()}
                </div>
                {showInfo &&
                    <div ref={infoRef} className={styles.session_info}>
                        <ul>
                            <li>Hola {user.name}!</li>
                            <li>{user.email}</li>
                            {user.role === 'admin' &&
                                <li style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/dashboard/all-users')}>Ver usuarios</li>
                            }
                            {user.role === 'admin' &&
                                <li style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/dashboard/create-user')}>Crear usuario</li>
                            }
                        </ul>
                        <div className={styles.logout} style={{ display: 'flex', justifyContent: 'center' }} onClick={handleLogout}>
                            <a style={{ textAlign: 'center', cursor: 'pointer' }}>
                                Cerrar sesión
                            </a>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
