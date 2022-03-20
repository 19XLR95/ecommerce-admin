import Cookies from 'js-cookie';

import {logout} from '../api/LoginApi';
import '../styles/navbar.css';

interface PropsType {
    setUserData: Function,
    userData: Record<string, unknown>,
    page?: string
};

function NavBar(props: PropsType) {
    const logoutButtonHandler = async () => {
        const res = await logout();

        if (res.code === 204) {
            Cookies.remove("token");
            props.setUserData({
                _id: "",
                name: "",
                surname: "",
                email: "",
            })
        }
    }

    return (
        <div className="nav-bar-container">
            <div>
                <div>Products Management <span>{props.page}</span></div>
            </div>
            <div>
                <div>{`${props.userData.name} ${props.userData.surname}`}</div>
            </div>
            <div>
                <button onClick={logoutButtonHandler}>Logout</button>
            </div>
        </div>
    );
}

export default NavBar;
