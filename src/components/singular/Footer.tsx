import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {

    const navigate = useNavigate();

    return (
        <footer className="flex flex-row items-center justify-center bg-[#191923] w-full h-16">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block text-white hover:underline active:underline"
                onClick={() => {
                    navigate('/terms&conditions');
                    setTimeout(() => {
                        let element = document.getElementById('TermsHeader');

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
                Terms & Conditions
            </motion.button>
        </footer>
    );
}

export default Footer;