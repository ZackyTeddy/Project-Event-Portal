import { Event } from "@mui/icons-material";
import { Box, Button, Modal, styled, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { login, logout, register } from "../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { toggleAuth } from "../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #cfcfcf',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const LoginStyledButton = styled(Button)({
    textTransform: 'none',
    border: '1px solid #e5e7eb',
    fontSize: '0.875rem',
    fontWeight: 300,
    color: '#000000',
    paddingLeft: '12px',
    paddingRight: '12px',
    marginRight: '4px',
    height: 'fit-content'
})

export default function Navbar() {

    const [openModal, setOpenModal] = useState(false);
    const [form, setForm] = useState({
        username: "",
        password: ""
    })
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate();
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        localStorage.clear();
        handleLogout();
    }, [])

    const handleOpen = () => {
        setOpenModal(true);
    };
    const handleClose = () => {
        setOpenModal(false);
    };

    function updateForm(value: any) {
        return setForm((prev) => {
        return { ...prev, ...value };
        });
    }

    async function onSubmit(e: any) {
        e.preventDefault();
        const payload = { ...form };
        try {
            const response = await login(payload);
            console.log('response', response)
            if(response?.error === undefined){
                setErrorMessage("Authenticated!");
                setOpenModal(false)
                dispatch(toggleAuth())
            } else {
                throw new Error("Failed to Authenticate");
            }
        } catch (error) {
        console.error('Failed to login: ', error);
        setErrorMessage("Failed to Login!")
        } finally {
        setForm({
            username: "",
            password: ""
        });
        navigate("/");
        }
    }
    
    async function handleLogout(){
        await logout()
        dispatch(toggleAuth())
    }


    return (
        <div>
        <nav className="flex justify-between items-center mb-6">
            <NavLink to="/">
            <Event fontSize="large"/>EVENT MANAGER v1
            </NavLink>


            <div className="flex flex-row">
                {
                isLoggedIn && 
                <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3" to="/create">
                    Create New Event
                </NavLink>
                }
                {!isLoggedIn 
                    ? <>
                    <LoginStyledButton 
                        onClick={handleOpen}
                        >
                            ADMIN LOGIN
                        </LoginStyledButton>
                        <Modal
                            open={openModal}
                            onClose={handleClose}
                            aria-labelledby="parent-modal-title"
                            aria-describedby="parent-modal-description"
                        >
                            <Box sx={{ ...style }}>
                                <form
                                    onSubmit={onSubmit}
                                    className="border rounded-lg overflow-hidden p-4"
                                >
                                    <div className="rounded-lg p-2">
                                    <h2>Admin Login</h2>
                                    <TextField
                                        type="text"
                                        label="Username"
                                        name="username"
                                        id="username"
                                        value={form.username}
                                        className="my-2"
                                        onChange={(e) => updateForm({ username: e.target.value })}
                                        required
                                    />
                                    <TextField
                                        type="text"
                                        label="Password"
                                        name="password"
                                        id="password"
                                        value={form.password}
                                        className="my-2"
                                        onChange={(e) => updateForm({ password: e.target.value })}
                                    />

                                    <input
                                        type="submit"
                                        value="Login"
                                        className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
                                    />
                                    <p>{errorMessage}</p>
                                    </div>
                                </form>
                            </Box>
                        </Modal>
                        </>
                    :   <LoginStyledButton onClick={handleLogout}>LOGOUT</LoginStyledButton>
                }
            </div>
        </nav>
        </div>
    );
}