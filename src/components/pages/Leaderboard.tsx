import React, { useEffect, useRef, useState } from "react";
import NavBar from "../singular/NavBar";
import { TopUserInfo, getIcon, getTopUsersByScore } from "../../services/UserInfo";
import userData from "../../stores/UserData";
import { GiSnakeTongue } from "react-icons/gi";
import Footer from "../singular/Footer";

const LeaderboardsPage: React.FC = () => {

    const [users, setUsers] = useState<TopUserInfo[]>([]);
    const searchActive = useRef<boolean>(false);

    // only asking for the top players once
    useEffect(() => {
        if (!searchActive.current) {
            searchActive.current = true;

            getTopUsersByScore().then((value) => {
                setUsers(oldValue => oldValue.concat(value));
                searchActive.current = false;
            });
        }
    }, []);

    return (<>
        <NavBar />

        <main className="w-[90%] max-w-[800px] mt-40 mb-72 text-white font-semibold">
            <h1 className="text-5xl border-b-[6px] pb-1 mb-2 border-white w-full">Highest Score</h1>
            <ul>
                {users.map((value, index) => {
                    if (value.icon === undefined) {
                        getIcon(value.id).then((result) => {
                            setUsers(oldUsers => oldUsers.map((user, secondIndex) => {
                                if (secondIndex === index) {
                                    user.icon = result;
                                }

                                return user;
                            }))
                        });
                    }

                    return (<li key={JSON.stringify(value)}
                        style={{ backgroundColor: value.id === userData.id ? "#f59e0b" : (index % 2 === 0 ? "#03896c" : "#008F7E") }}
                        className="w-full flex flex-wrap justify-around gap-x-6 gap-y-1 text-3xl mt-2 py-1 px-2 rounded-xl">
                        <div className="flex">
                            {index + 1}
                            .
                            {
                                value.icon === undefined
                                    ?
                                    <GiSnakeTongue className="w-9 h-9 rounded-full border-2 border-white mx-1" />
                                    :
                                    <img src={value.icon} alt="" className="w-9 h-9 object-cover rounded-full border-2 border-white mx-1" />
                            }
                            {value.username}
                        </div>
                        <span>Score&nbsp;{value.maxScore}</span>
                        <span>
                            Time&nbsp;{Math.floor(value.secondsForMaxScore / 60)}:
                            {value.secondsForMaxScore % 60 < 10 ? "0" : ""}
                            {value.secondsForMaxScore % 60}
                        </span>
                        <span>Games&nbsp;{value.gamesPlayed}</span>
                    </li>);
                })}
            </ul>
        </main>

        <Footer />
    </>);
}

export default LeaderboardsPage;