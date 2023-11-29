import logo from './logo.svg';
import './App.css';
import {GoogleLogin} from '@react-oauth/google';
// import jwt_decode from "jwt-decode";
import {useGoogleLogin} from '@react-oauth/google';
import axios from "axios"

function App() {

    const login = useGoogleLogin({
        onSuccess: async respose => {
            try {
              console.log(respose);
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        "Authorization": `Bearer ${respose.access_token}`
                    }
                })

                console.log(res.data)
            } catch (err) {
                console.log(err)

            }

        }
    });

    return (
        <div className="App">
            <header className="App-header">
                <button onClick={login}>
                    <i class="fa-brands fa-google"></i>
                    Continue with google
                </button>
            </header>
        </div>
    );
}

export default App;
