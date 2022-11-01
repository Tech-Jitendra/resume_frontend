import React, { useEffect } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons"
import LoginForm from "../components/LoginForm.jsx";
import { useHistory } from "react-router-dom";

const Login = () => {
    // const { user } = useSelector((state) => state.AuthenticationReducer);

    const history = useHistory();

    // useEffect(() => {
    //     if (user) {
    //         history.push("/dashboard");
    //     }
    // }, [user, history]);

    return (
        <div>

            <div className="_login_page">

                <div>
                    <span
                        onClick={() => history.push("/")}
                        className="pushBackButton w-6 h-6"
                    >
                        <svg
                            height={"24px"}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                            />
                        </svg>
                    </span>
                    <div className="login-section">
                        <div className="app_login_title" >
                            <React.Fragment>
                                <img src="/logo.svg" />
                            </React.Fragment>
                            <h1>Persue your passion. We'll create your impression.</h1>
                            <p>The site Where you can build your resume and your life's experience as memory.</p>
                        </div>

                        <React.Fragment>
                            <img src="/authPhoto.svg" />
                        </React.Fragment>
                    </div>

                    <div className="_form_wrapper">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;
