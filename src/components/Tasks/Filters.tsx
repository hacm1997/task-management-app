import styles from './styles.module.css'
import { FaTasks } from "react-icons/fa";
import { BiTask, BiTaskX } from "react-icons/bi";
import React, { SetStateAction, useState } from 'react';

const cardItems = [
    {
        id: 1,
        icon: <FaTasks style={{ fontSize: '20px' }} />,
        title: 'Todas',
        value: null
    },
    {
        id: 2,
        icon: <BiTask style={{ fontSize: '24px' }} />,
        title: 'Completadas',
        value: 1
    },
    {
        id: 3,
        icon: <BiTaskX style={{ fontSize: '24px' }} />,
        title: 'No completadas',
        value: 0
    }
]

interface Props {
    setFilterCompelted: React.Dispatch<SetStateAction<number | null>>
}

export const Filters = ({ setFilterCompelted }: Props) => {
    const [active, setActive] = useState<number | null>(cardItems[0].id);

    const handleClick = (itemId: number, itemValue: number | null) => {
        setActive(itemId);
        setFilterCompelted(itemValue);
    };

    return (
        <div className={styles.cardContent}>
            {cardItems.map(item => (
                <div key={item.id}
                    onClick={() => handleClick(item.id, item.value)}
                    className={`${styles.filterCards} ${active === item.id ? styles.activeCard : ''}`}
                >
                    {item.icon}
                    <p>{item.title}</p>
                </div>
            ))}
        </div>
    )
}
