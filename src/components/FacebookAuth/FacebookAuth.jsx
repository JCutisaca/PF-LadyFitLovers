import { FacebookLoginButton } from "react-social-login-buttons";
import { LoginSocialFacebook } from "reactjs-social-login";
import style from './FacebookAuth.module.css'
import { useDispatch, useSelector } from "react-redux";
import authFacebookUser from "../../redux/Actions/User/authFacebookUser";
import { useEffect } from "react";
import getCart from "../../redux/Actions/ShoppingCart/getCart";

const FacebookAuth = ({ handleFacebookLoginSuccess }) => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.id)
    const accessToken2 = useSelector((state) => state.accessToken)
    
    useEffect(() => {
        if (userId && accessToken2) {
            dispatch(getCart(userId, accessToken2));
        }
    }, [userId]);
    const onSuccess = (profileObj) => {
        dispatch(authFacebookUser(profileObj))
        handleFacebookLoginSuccess()
    }

    return (
        <LoginSocialFacebook
            appId="1085073596200584"
            onResolve={(response) => {
                let profileObj = response.data;
                onSuccess(profileObj)
            }}
            onReject={(error) => {
                // console.log(error);
            }}
        >
            <FacebookLoginButton className={style.containerButton} text="Ingresar con Facebook"></FacebookLoginButton>
        </LoginSocialFacebook>
    )
}

export default FacebookAuth;