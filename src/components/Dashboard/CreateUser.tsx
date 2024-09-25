import React from 'react';
import { GeneralLayout } from '../DashboardLayout/GeneralLayout';
import { DashboardRegister } from '../utils/DashboardRegister';
import { useAuth } from '../../hooks/useAuth';

const CreateUser: React.FC = () => {
    const { user } = useAuth();

    return (
        <GeneralLayout>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
                <h1 style={{ textAlign: 'center', paddingTop: '40px', color: '#2fa0db' }}>Aquí puedes crear usuarios</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '50px' }}>
                <div style={{ backgroundColor: '#FFFFFF', width: '92%', paddingTop: '40px', borderRadius: '20px' }}>
                    {user.role === 'admin' ?
                        <DashboardRegister />
                        :
                        <h1 style={{ textAlign: 'center', paddingTop: '20px', color: '#2fa0db' }}>No tienes permisos para acceder a esta ruta</h1>
                    }
                </div>
            </div>
        </GeneralLayout>
    );
};

export default CreateUser;