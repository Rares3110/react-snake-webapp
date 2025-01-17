import React from "react";
import { motion } from "framer-motion";
import { GiSnakeTongue } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import userData from "../../stores/UserData";
import { observer } from "mobx-react";

const NavBar: React.FC = observer(() => {
    const navigate = useNavigate();

    return (
        <nav className="fixed z-[200] top-0 w-full h-14 bg-darker-space-cadet shadow-navbar-darker-space-cadet">
            <ul className="absolute right-4 flex flex-row-reverse items-center h-full text-2xl font-semibold text-white bottom-[2px]">
                <li>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="font-semibold text-white flex items-center"
                        onClick={() => {
                            window.scrollTo(0, 0);
                            if (userData.id === undefined) {
                                navigate('/login/0');
                            } else {
                                navigate('/account');
                            }
                        }}
                    >
                        {userData.icon === undefined ?
                            <GiSnakeTongue className="mr-2 mt-1 rounded-full border-2 w-9 h-9" /> :
                            <img className="mr-2 mt-1 rounded-full border-2 w-9 h-9 object-cover"
                                src={userData.icon}
                                alt="user icon" />}
                        {userData.id === undefined ? "Login" : userData.username}
                    </motion.button>
                </li>

                <li className="hidden sm:block mx-3 text-3xl mb-1">
                    /
                </li>

                <li>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden sm:block"
                        onClick={() => {
                            window.scrollTo(0, 0);
                            navigate('/leaderboards');
                        }}
                    >
                        Leaderboards
                    </motion.button>
                </li>

                <li className="hidden md:block mx-3 text-3xl mb-1">
                    /
                </li>

                <li>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden md:block"
                        onClick={() => {
                            navigate('/');
                            setTimeout(() => {
                                let element = document.getElementById('Rules');

                                if (element) {
                                    let elementPosition = element.getBoundingClientRect().top;
                                    let offsetPosition = elementPosition + window.pageYOffset - 70;

                                    window.scrollTo({
                                        top: offsetPosition,
                                        behavior: "smooth"
                                    });
                                }
                            }, 100);
                        }}
                    >
                        Rules
                    </motion.button>
                </li>
            </ul>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute left-4 flex items-center h-full bottom-[2px] text-3xl text-white font-semibold"
                onClick={() => {
                    window.scrollTo(0, 0);
                    navigate('/');
                }}
            >
                Home
            </motion.button>
        </nav>
    );
});

export default NavBar;