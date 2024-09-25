import { Box, Button, Input, Typography } from "@mui/joy"
import styles from './styles.module.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { registerUser } from "../services/auth.service";
import { toast, Toaster } from "sonner";

export const RegisterComponent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('user');
    const [disabled, setDisabled] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(confirmPassword, password)
        setDisabled(true)
        if (confirmPassword === password) {
            try {
                await registerUser(name, email, password, confirmPassword, role);
                toast.success('Registro exitoso!')
                setDisabled(false)
                // redirect to login
                setTimeout(() => {
                    navigate('/');
                }, 2000)
            } catch (error: any) {
                console.error(error.message);
                setDisabled(false)
                toast.error('No se ha podido completar el registro!')
            }
        } else {
            setDisabled(false)
            toast.warning('Las contraseñas no coinciden!')
        }
    };

    useEffect(() => {
        if (password !== confirmPassword) {
            setShowAlert(true)
        } else {
            setShowAlert(false)
        }
        if (confirmPassword === '') {
            setShowAlert(false)
        }
    }, [confirmPassword, password])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100vh', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <img style={{ width: '250px' }} src="/task-logo.png" alt="App Logo" />
            </Box>

            <div className={styles.formStyle} style={{ marginTop: '-100px', border: '1px', borderColor: '#ffffff', borderRadius: '10px', width: '30%', boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.24)', paddingTop: '130px', paddingLeft: '40px', paddingRight: '40px', paddingBottom: '50px' }}>
                <Typography sx={{ fontSize: '30px', textAlign: 'center' }}>
                    Task Management App
                </Typography>
                <form onSubmit={handleRegister}
                    style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '20px' }}
                >
                    <Box>
                        <Typography sx={{ fontSize: '20px' }}>Nombre:</Typography>
                        <Input type='text' name='name' placeholder="Pedrito..."
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Box>

                    <Box>
                        <Typography sx={{ fontSize: '20px' }}>Correo Electrónico:</Typography>
                        <Input type='email' name='email' placeholder="example@email.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Box>

                    <Box>
                        <Typography sx={{ fontSize: '20px' }}>Contraseña:</Typography>
                        <Input type='password' name='password' placeholder="ingrese contraseña..."
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Box>

                    <Box>
                        <Typography sx={{ fontSize: '20px' }}>Cofirme su contraseña:</Typography>
                        <Input type='password' name='confirmPassword' placeholder="ingrese nuevamente la contraseña..."
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {showAlert && <p style={{ color: 'red', paddingLeft: '6px', paddingTop: '2px' }}>Las contraseñas no coinciden</p>}
                    </Box>

                    <Box>
                        <Typography sx={{ fontSize: '20px' }}>Rol:</Typography>
                        <select name="role" style={{ width: '100%', height: '40px' }} onChange={(e) => setRole(e.target.value)}>
                            <option value="user">Usuario</option>
                            <option value="admin">Administrador</option>
                        </select>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px', paddingTop: '20px' }}>
                        <Button className={styles.registerBtn} onClick={() => navigate('/')}>
                            Iniciar sesión
                        </Button>
                        <Button type="submit" disabled={disabled}>
                            Finalizar registro
                        </Button>
                    </Box>
                </form>
            </div>
            <Toaster richColors position="bottom-right" />
        </div>
    )
}
