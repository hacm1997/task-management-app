import { Stack, Table } from "@mui/joy"
import { useEffect, useState } from "react"
import { getAllUsers } from "../../services/user/getAllUsers"
import { UserData } from "../../hooks/types"
import { format } from "date-fns"
import { es } from 'date-fns/locale'
import ReactPaginate from "react-paginate"
import { SkipNextRounded, SkipPreviousRounded } from "@mui/icons-material"
import styles from './styles.module.css'

export const ListUsers = () => {
    const [userData, setUserData] = useState<UserData[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1)

    useEffect(() => {
        getAllUsers(currentPage).then((res) => {
            setUserData(res?.users?.data)
            setTotalPage(res?.users?.last_page)
        }).catch((error) => {
            console.error(error)
        })
    }, [currentPage])

    const handlePageClick = (event: any) => {
        setCurrentPage(event.selected + 1)
    }
    return (
        <div>
            <Stack mt={2} sx={{ backgroundColor: 'white', boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.20)', borderRadius: '14px' }}>
                <Table aria-label="basic table">
                    <thead style={{ background: '#FFEEE5' }}>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Nombre</th>
                            <th style={{ textAlign: 'center' }}>Email</th>
                            <th style={{ textAlign: 'center' }}>Rol</th>
                            <th style={{ textAlign: 'center' }}>Fecha de creación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.length > 0 ? userData?.map((item: UserData) => (
                            <tr key={item.id}>
                                <td style={{ textAlign: 'center' }}>
                                    {item.name}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    {item.email}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    {item.role}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    {format(new Date(item.created_at), 'dd MMM yyyy', { locale: es })}
                                </td>
                            </tr>
                        )) : null}
                    </tbody>
                </Table>
            </Stack>
            <div style={{ paddingTop: '20px' }}>
                <ReactPaginate
                    breakLabel="..."
                    pageCount={totalPage}
                    previousLabel={<SkipPreviousRounded />}
                    nextLabel={<SkipNextRounded />}
                    onPageChange={handlePageClick}
                    containerClassName={styles.paginationsBtns}
                    previousClassName={styles.prevBtn}
                    nextClassName={styles.nextBtn}
                    disabledClassName={styles.paginationsDisable}
                    activeClassName={styles.paginationsActive}
                />
            </div>
        </div>
    )
}
