import React, { useEffect, useState } from "react";
import NavBar from "../singular/NavBar";
import { TextBox, TextBoxTypes } from "../utility/TextBox";
import { motion } from "framer-motion";
import WaveImage from "../../resources/png/wave-haikei.png";
import { useNavigate, useParams } from "react-router-dom";
import userData from "../../stores/UserData";
import { login, signUp } from "../../services/Login";
import Footer from "../singular/Footer";

interface ILoginForm {
    values: {
        name: string,
        email: string,
        password: string,
        passwordConf: string
    },
    touched: {
        name: boolean,
        email: boolean,
        password: boolean,
        passwordConf: boolean
    }
}

const defaultValues: ILoginForm = {
    values: {
        name: "",
        email: "",
        password: "",
        passwordConf: ""
    },
    touched: {
        name: false,
        email: false,
        password: false,
        passwordConf: false
    }
}

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [isLogin, setIsLogin] = useState(true);
    const [loginForm, setLoginForm] = useState<ILoginForm>(defaultValues);
    const [error, setError] = useState(false);

    // redirecting if the user is logged in
    useEffect(() => {
        if (userData.id !== undefined) {
            navigate('/account');
        }
    });

    useEffect(() => {
        console.log(loginForm)
    }, [loginForm]);

    const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (validateEmail(loginForm.values.email) && validateFormValue(loginForm.values.password)) {
            login(loginForm.values.email, loginForm.values.password).then((result) => {
                if (result === true) {
                    if (params.index === '0') {
                        navigate('/');
                    }
                    switch (params.index) {
                        case '0': navigate('/'); break;
                        case '1': navigate('/game'); break;
                        default: break;
                    }
                } else {
                    setError(true);
                }
            });
        }
    }

    const handleSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (validateEmail(loginForm.values.email) &&
            validateFormValue(loginForm.values.name) &&
            validateFormValue(loginForm.values.password) &&
            loginForm.values.password === loginForm.values.passwordConf) {
            signUp(loginForm.values.email, loginForm.values.name, loginForm.values.password).then((result) => {
                if (result === true) {
                    navigate('/');
                } else {
                    setError(true);
                }
            });
        }
    }

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validateFormValue = (value: string) => {
        return value.match(/(?=.*[0-9a-zA-Z]).{6,}/);
    };

    const changeValueInForm = (valueName: string, value: string) => {
        setLoginForm(oldValues => {
            return {
                values: {
                    ...oldValues.values,
                    [valueName]: value
                },
                touched: {
                    ...oldValues.touched,
                    [valueName]: true
                }
            };
        });
    };

    return (<>
        <NavBar />

        <main className="relative mt-20 mb-[200px] flex flex-col items-center w-[360px] h-[480px] rounded-lg bg-white shadow-login-form">
            <img src={WaveImage} className="absolute top-[-1px] h-48 w-full rotate-180 rounded-md" alt="decoration" />

            <h1 className="mt-5 text-3xl font-semibold text-white z-10">
                Welcome to SuperSnake!
            </h1>

            <form className="flex flex-col items-center">
                <div className="flex rounded-xl w-[240px] mt-12 text-lg font-semibold z-10 outline outline-2 outline-midnight-blue">
                    <motion.button
                        onClick={(event) => {
                            event.preventDefault();
                            setLoginForm(defaultValues);
                            setIsLogin(true);
                            setError(false);
                        }}
                        className={"relative top-0 w-1/2 rounded-xl " + (isLogin ? "text-white" : "text-midnight-blue")}
                    >
                        {
                            isLogin ?
                                <motion.div layoutId="formOption" className="absolute top-0 w-full h-full ml-[-1px] rounded-xl border-midnight-blue bg-midnight-blue" />
                                :
                                null
                        }
                        <span className="relative top-0">Login</span>
                    </motion.button>

                    <motion.button
                        onClick={event => {
                            event.preventDefault();
                            setLoginForm(defaultValues);
                            setIsLogin(false);
                            setError(false);
                        }}
                        className={"relative top-0 w-1/2 rounded-xl " + (!isLogin ? "text-white" : "text-midnight-blue")}
                    >
                        {
                            !isLogin ?
                                <motion.div layoutId="formOption" className="absolute top-0 w-full h-full ml-[1px] rounded-xl border-midnight-blue bg-midnight-blue" />
                                :
                                null
                        }
                        <span className="relative top-0">Sign up</span>
                    </motion.button>
                </div>

                {/* email */}
                <TextBox
                className="mt-4"
                label="Email"
                valueName="email"
                value={loginForm.values.email}
                setValue={changeValueInForm}
                placeholder="email@example.com"
                />
                {
                    !validateEmail(loginForm.values.email) && loginForm.touched.email ?
                        <div className="text-rose-800 text-sm w-[230px] h-3 z-[20]">Email required!</div>
                        :
                        null
                }

                {/* username */}
                {
                    !isLogin ?
                        <TextBox
                        className="mt-4"
                        label="Username"
                        value={loginForm.values.name}
                        valueName="name"
                        setValue={changeValueInForm}
                        placeholder="Username"
                        />
                        :
                        null
                }
                {
                    (!isLogin && !validateFormValue(loginForm.values.name)) && loginForm.touched.name ?
                        <div className="text-rose-800 text-sm w-[230px] h-3 z-[20]">Username requires 6 characters!</div>
                        :
                        null
                }

                {/* password */}
                <TextBox
                className="mt-4"
                label="Password"
                value={loginForm.values.password}
                valueName="password"
                setValue={changeValueInForm}
                placeholder="••••••••••"
                type={TextBoxTypes.Password}
                />
                {
                    !validateFormValue(loginForm.values.password) && loginForm.touched.password ?
                        <div className="text-rose-800 text-sm w-[230px] h-3 z-[20]">Password requires 6 characters!</div>
                        :
                        null
                }

                {/* password confirmation */}
                {
                    !isLogin ?
                        <TextBox
                        className="mt-4"
                        label="Confirm Password"
                        valueName="passwordConf"
                        value={loginForm.values.passwordConf}
                        setValue={changeValueInForm}
                        placeholder="••••••••••"
                        type={TextBoxTypes.Password}
                        />
                        :
                        null
                }
                {
                    (!isLogin && loginForm.values.password !== loginForm.values.passwordConf) && loginForm.touched.passwordConf ?
                        <div className="text-rose-800 text-sm w-[230px] h-3 z-[20]">Passwords don't match!</div>
                        :
                        null
                }

                {/* general validations */}
                {
                    (error && isLogin) ?
                        <div className="absolute text-rose-800 bottom-[54px]">Email or password invalid!</div>
                        :
                        null
                }
                {
                    (error && !isLogin) ?
                        <div className="absolute text-rose-800 bottom-[54px]">Email already used!</div>
                        :
                        null
                }

                {
                    isLogin ?
                        <motion.button
                            onClick={handleLogin}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="absolute bottom-4 w-[120px] bg-midnight-blue text-white font-bold text-xl rounded-lg pt-[1px] pb-1 shadow-button">
                            Login
                        </motion.button>
                        :
                        <motion.button
                            onClick={handleSignUp}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="absolute bottom-4 w-[120px] bg-rose-800 text-white font-bold text-xl rounded-lg pt-[1px] pb-1 shadow-button">
                            Sign up
                        </motion.button>
                }
            </form>
        </main>

        <Footer />
    </>);
};

export default LoginPage;