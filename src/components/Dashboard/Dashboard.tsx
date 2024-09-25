import React, { useState } from 'react';
import { GeneralLayout } from '../DashboardLayout/GeneralLayout';
import { ListTask } from '../Tasks/ListTask';
import { Filters } from '../Tasks/Filters';

const Dashboard: React.FC = () => {
    const [filterCompleted, setFilterCompelted] = useState<number | null>(null)

    return (
        <GeneralLayout>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
                <div style={{ backgroundColor: '#FFFFFF', width: '92%', borderRadius: '20px' }}>
                    <h1 style={{ textAlign: 'center', paddingTop: '40px', color: '#2fa0db' }}>Aquí puedes gestionar las tareas disponibles</h1>
                    <Filters setFilterCompelted={setFilterCompelted} />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '50px' }}>
                <div style={{ backgroundColor: '#FFFFFF', width: '92%', paddingTop: '40px', borderRadius: '20px' }}>
                    <ListTask filterCompleted={filterCompleted} />
                </div>
            </div>
        </GeneralLayout>
    );
};

export default Dashboard;