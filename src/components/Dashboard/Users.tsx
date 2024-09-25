import React from 'react';
import { GeneralLayout } from '../DashboardLayout/GeneralLayout';
import { useAuth } from '../../hooks/useAuth';
import { ListUsers } from '../Users/ListUsers';

const Users: React.FC = () => {
    const { user } = useAuth();
    return (
        <GeneralLayout>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
                <div style={{ backgroundColor: '#FFFFFF', width: '92%', borderRadius: '20px', paddingBottom: '50px' }}>
                    <h1 style={{ textAlign: 'center', paddingTop: '40px', color: '#2fa0db' }}>Lista de usuarios registrados</h1>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '50px' }}>
                <div style={{ backgroundColor: '#FFFFFF', width: '92%', paddingTop: '40px', borderRadius: '20px' }}>
                    {user.role === 'admin' ?
                        <ListUsers />
                        :
                        <h1 style={{ textAlign: 'center', paddingTop: '20px', color: '#2fa0db' }}>No tienes permisos para acceder a esta ruta</h1>
                    }
                </div>
            </div>
        </GeneralLayout>
    );
};

export default Users;