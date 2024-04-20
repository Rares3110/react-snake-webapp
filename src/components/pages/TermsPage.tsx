import { useNavigate } from "react-router-dom";
import Footer from "../singular/Footer";
import NavBar from "../singular/NavBar";

const TermsPage: React.FC = () => {

    const navigate = useNavigate();

    return (<div className="w-full flex flex-col items-center">
        <NavBar />
        <div className="w-full max-w-[1200px] bg-opacity-30 bg-black mt-12 text-white">
            <h1 className="px-4 mt-12 text-3xl sm:text-4xl underline" id="TermsHeader">Terms of Use</h1>
            <p className="px-4 mt-4 text-md sm:text-lg">By accessing or using this website you agree with the Terms and Conditions presented on this page.
                If you disagree with these Terms and Conditions you will not use this website. Your access is also
                conditioned on you agreeing with the Privacy Policy presented further below.</p>
            <h2 className="px-4 mt-2 text-xl sm:text-2xl underline">Inaccuracies and Errors</h2>
            <p className="px-4 mt-4 text-md sm:text-lg">We constantly update our information about the presented products, but we cannot guarantee the accuracy
                or completeness of any information. We reserve the right to change or update information and to correct
                errors without prior notice.</p>
            <h2 className="px-4 mt-4 text-xl sm:text-2xl underline">Links</h2>
            <p className="px-4 mt-4 text-md sm:text-lg">Our website may contain links to third-party websites or services. The owner of this website has no control
                over, and assumes no responsibility for, the content or privacy policy of any third-party website or service.</p>
            <h2 className="px-4 mt-4 text-xl sm:text-2xl underline">Changes to Terms and Conditions</h2>
            <p className="px-4 mt-4 text-md sm:text-lg">We reserve the right to modify this these terms at any time.</p>
            <h1 id="privacy" className="px-4 mt-8 text-3xl sm:text-4xl underline">Privacy Policy</h1>
            <p className="px-4 mt-4 text-md sm:text-lg">We store the email, username and password for authentication, if the user decides to create an account.
                When the user is authenticated, every score will be saved in the database to update the <button onClick={() => navigate('/leaderboards')} className="italic">leaderboards</button>.
                No other data is stored.</p>
            <h1 id="cookies" className="px-4 mt-8 text-3xl sm:text-4xl underline">Cookies Policy</h1>
            <p className="mb-[400px] px-4 mt-4 text-md sm:text-lg">We do not use cookies on this website.</p>
        </div>
        <Footer />
    </div>);
}

export default TermsPage;