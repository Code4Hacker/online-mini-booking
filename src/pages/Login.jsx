import axios from 'axios'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
// import { baseURL } from '../../paths/base_url';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../requests/baseURL';

const Login = () => {
    const [show, setShow] = useState(false);
    const [ac, setAc] = useState(!false);

    const navigator = useNavigate();
    const handleTokenSubmittion = async () => {
        if (username !== "" && pass !== "") {
            let headersList = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Content-Type": "application/json"
            }

            let bodyContent = JSON.stringify({
                "username": username,
                "password": pass

            });

            let reqOptions = {
                url: `${baseURL}auth/login`,
                method: "POST",
                headers: headersList,
                data: bodyContent,
            }
            try {

                let response = await axios.request(reqOptions);
                if (response.data.code === 9000) {
                    toast.success("Login Approved!");
                    setTimeout(() => {
                        toast.remove();
                        toast.loading("Opening Board ...");
                        window.localStorage.setItem("token", response.data.data.token);
                        setTimeout(() => {
                            toast.remove();
                            
                            navigator("/dashboard");
                        }, 3000);
                    }, 1000);
                    // setAc(!ac);
                } else {
                    toast.error(response.data.message);
                }
                console.log(response.data);
            } catch (err) {
                toast.error(err);
            }
        } else {
            toast.error("All field required!")
        }

    }

    const [username, setUsername] = useState("");
    const [fname, setFname] = useState("");
    const [mname, setMname] = useState("");
    const [lname, setLname] = useState("");
    const [phone, setPhone] = useState("");
    const [pass, setPass] = useState("");
    const handleSignUp = async () => {

        if (username !== "" && fname !== "" && mname !== "" && lname !== "" && phone !== "" && pass !== "") {
            let headersList = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Content-Type": "application/json"
            }

            let bodyContent = JSON.stringify({
                "username": username,
                "firstName": fname,
                "middleName": mname,
                "lastName": lname,
                "phoneNumber": phone,
                "userRole": "CUSTOMER",
                "password": pass

            });

            let reqOptions = {
                url: `${baseURL}auth/register`,
                method: "POST",
                headers: headersList,
                data: bodyContent,
            }
            try {

                let response = await axios.request(reqOptions);
                if (response.data.code === 9000) {
                    toast.success("Registration Approved!");
                    setAc(!ac);
                } else {
                    toast.error(response.data.message);
                }
                console.log(response.data);
            } catch (err) {
                toast.error(err);
            }
        } else {
            toast.error("All field required!")
        }

    }
    
    return (
        <div className='auth_body'>
            {
                ac ?
                    <div className="auth_tag">
                        <h1 className='text-center p-5 text-lg text-bold'>WELCOME BACK</h1>
                        <input type="text" placeholder='Enter Email' value={username} onChange={(e) => setUsername(e.target.value)} className='mb-2' />
                        <div className="message"></div>
                        <input type="password" placeholder='Password' value={pass} onChange={(e) => setPass(e.target.value)} className='mb-2' />
                        <div className="message"></div>
                        <button onClick={handleTokenSubmittion} className='btn_token'>Connect</button>
                        <span className='text-center' style={{
                            cursor: 'pointer'
                        }} onClick={() => setAc(!ac)}>Create Account</span>
                    </div> :
                    <div className="auth_tag">
                        <h1 className='text-center p-5 text-lg text-bold'>REGISTER</h1>
                        <input type="text" placeholder='Enter Email' value={username} onChange={(e) => setUsername(e.target.value)} className='mb-2' />
                        <div className="message"></div>
                        <input type="text" placeholder='First Name' value={fname} onChange={(e) => setFname(e.target.value)} className='mb-2' />
                        <div className="message"></div>
                        <input type="text" placeholder='Middle Name' value={mname} onChange={(e) => setMname(e.target.value)} className='mb-2' />
                        <div className="message"></div>
                        <input type="text" placeholder='Last Name' value={lname} onChange={(e) => setLname(e.target.value)} className='mb-2' />
                        <div className="message"></div>
                        <input type="password" placeholder='Password' value={pass} onChange={(e) => setPass(e.target.value)} className='mb-2' />
                        <div className="message"></div>

                        <input type="text" placeholder='Enter PhoneNumber ( 255 ) ***' value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <div className="message"></div>
                        <button onClick={handleSignUp} className='btn_token'>Connect</button>
                        <span className='text-center' style={{
                            cursor: 'pointer'
                        }} onClick={() => setAc(!ac)}>I have an Account</span>
                    </div>
            }
            <Toaster />
            <div className="box shadow-sm p-3" style={{
                borderRadius: '24px',
                zIndex: '3',
                background: 'orange',
                textAlign: 'center',
                color: 'white',
                display: `${show ? 'block' : 'none'}`

            }} > Sorry If you think something wen't wrong. <br /> Contact <span>ipt@help (+255 798 233 433)</span></div>
        </div>
    )
}

export default Login


