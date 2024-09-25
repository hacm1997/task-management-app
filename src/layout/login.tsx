import { Box, Button, Input, Typography } from "@mui/joy"
import styles from './styles.module.css'
import { login } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "sonner";

export const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await login(email, password);
            // redirect to dashboard
            navigate('/dashboard');
        } catch (error: any) {
            console.error(error.message);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100vh', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <img style={{ width: '250px' }} src="/task-logo.png" alt="App Logo" />
            </Box>

            <div className={styles.formStyle} style={{ marginTop: '-100px', border: '1px', borderColor: '#ffffff', borderRadius: '10px', width: '30%', boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.24)', paddingTop: '130px', paddingLeft: '40px', paddingRight: '40px', paddingBottom: '50px' }}>
                <Typography sx={{ fontSize: '30px', textAlign: 'center' }}>
                    Task Management App
                </Typography>
                <form onSubmit={handleLogin}
                    style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '20px' }}
                >
                    <Box>
                        <Typography sx={{ fontSize: '20px' }}>Correo Electrónico:</Typography>
                        <Input type='email' name='email' placeholder="example@email.com"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Box>

                    <Box>
                        <Typography sx={{ fontSize: '20px' }}>Contraseña:</Typography>
                        <Input type='password' name='password' placeholder="ingrese contraseña..."
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px', paddingTop: '20px' }}>
                        <Button className={styles.registerBtn} onClick={() => navigate('/register')}>
                            Registrarse
                        </Button>
                        <Button type="submit">
                            Iniciar Sesión
                        </Button>
                    </Box>
                </form>
            </div>
            <Toaster richColors position="bottom-right" />
        </div>
    )
}
