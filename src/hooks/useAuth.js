import { useEffect, useState } from "react"
import axios from 'axios'

export default () => {
    const [auth, setAuth] = useState();

    const verifyAuth = async () => {
        const token = localStorage.getItem('tokenDeUsuario');
        try {
            const res = await axios.get('http://localhost:8080/api/auth/is_logged_in', {
                headers: {
                  'x-token': `${token}`
                }
              });
            return res.data;
        } catch (error) {
            console.log(error.response.data.msg);
            return false;
        }
    }

    useEffect(() => {
        (
            async () => {
                const data = await verifyAuth();
                setAuth(data);
            }
        )
        ()

    });

    return {auth}
}