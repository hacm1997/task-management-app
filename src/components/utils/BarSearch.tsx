import { Input } from "@mui/joy"
import React, { SetStateAction } from "react"
import styles from './styles.module.css'
import { MdClear } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

interface Props {
    serchText: string
    setSerchText: React.Dispatch<SetStateAction<string>>
}
export const BarSearch = ({ setSerchText, serchText }: Props) => {
    return (
        <div className={styles.barSearch}>
            <Input type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSerchText(e.target.value)}
                placeholder="Busca por nombre y descripción..."
                value={serchText}
            />
            <FaSearch />
            <MdClear cursor={'pointer'} fontSize={24} onClick={() => setSerchText('')} title="Limpiar" />
        </div>
    )
}
