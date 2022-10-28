import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faEnvelope,
    faSearch,
    faUser
} from '@fortawesome/free-solid-svg-icons'
import {Link, Routes, Route, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {Modal, ModalHeader, Row, ModalBody, Col} from 'reactstrap'
import usePasswordToggles from './usePasswordToggle'
import axios from 'axios'
import { GoogleLogin } from '@react-oauth/google';
import {useDispatch, useSelector} from 'react-redux'
import {googleLogin, loginUser, registerUser} from '../features/movies/moviesSlice'




const Navbars = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState([])
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dataLogin = {
        email: email,
        password: password,
    }
    const [firstName, setFirstname] = useState("")
    const [lastName, setLastname] = useState("")
    const [emailRegis, setEmailregis] = useState("")
    const [passRegis, setPasswordregis] = useState("")
    const [passConfir, setPasswordconfir] = useState("")
    const dataRegister = {
        first_name: firstName,
        last_name: lastName,
        email: emailRegis,
        password: passRegis,
        password_confirmation: passConfir,
    }
    const [modal, setModal] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [modal3, setModal3] = useState(false)
    const [PasswordInputType, ToggleIcon] = usePasswordToggles();
    const [PasswordInputType2, ToggleIcon2] = usePasswordToggles();
    const regexEmail = /^([a-z\d\.-]+)@([a-z\d-]+)\.(co[m]?)(\.[a-z]{2})?$/;
    const [errEmail, setErroremail] = useState('')
    const [errPass, setErrorpass] = useState('')
    const [errFirstN, setErrorFirstN] = useState('')
    const [errLastN, setErrorLastN] = useState('')
    const [errPassCon, setErrorPassCon] = useState('')
    const [Error, setError] = useState('')
    const loggedIn = localStorage.getItem('isLoggedin');
    const profilNama = localStorage.getItem('profile');
    const Token = localStorage.getItem('token');
    const dispatch = useDispatch();

    const handleSubmit = async (value) =>{
       value.preventDefault();
       dispatch(loginUser(dataLogin))
       setEmail('')
       setPassword('')
       setModal(false)
       window.location.reload()
    }


    const signout = () => {
        localStorage.removeItem('isLoggedin')
        localStorage.removeItem('token')
        localStorage.removeItem('profile')
        navigate('/')
    }

    const submitLogin = (credential) => {
    dispatch(googleLogin(credential))
    setModal(false)
  };

    

    const handleRegis = async (e) =>{
        e.preventDefault();
        checkFirstname();
        checkLastname();
        checkEmail();
        checkPass();
        checkPassCon();
        dispatch(registerUser(dataRegister))
        setFirstname('');
        setLastname('');
        setEmailregis('');
        setPasswordregis('');
        setPasswordconfir('');
        setModal2(false)
    }

    const checkEmail = () => {
        if(emailRegis == '' ){
            setErroremail('Please fill email address')
        }else if(regexEmail.test(emailRegis)=== false){
            setErroremail('Please enter valid email address')
        }else{
            setErroremail('')
            return true;
        }
    }

    const checkPass = () => {
        if(passRegis == ''){
            setErrorpass('Please fill Password')
        }else{
            setErrorpass('')
        }
    }

    const checkPassCon = () => {
        if(passConfir == ''){
            setErrorPassCon('Please fill Password')
        }else if(passConfir !== passRegis){
            setErrorPassCon('Password Confirmation did not Match with Password')
        }else{
            setErrorPassCon('');
        }
    }

    const checkFirstname = () => {
        if(firstName == ''){
            setErrorFirstN('Please fill First Name')
        }else{
            setErrorFirstN('');
        }
    }

    const checkLastname = () => {
        if(lastName == ''){
            setErrorLastN('Please fill Last Name')
        }else{
            setErrorLastN('');
        }
    }
        
    
    const submit = () => {
        navigate(`/search/${search}`)
    }

    return(
    <>
    <div className="header">
        <div className="navbars">
            <div className="logo">
                <Link to='/'><h1>Movielist</h1></Link>
            </div>
            <form className="container-form" >
                <input 
                type="text" 
                placeholder="What Do You Want To Watch?" 
                className="search"
                value = {search.original_title}
                onChange={(e) => setSearch(e.target.value)}
                />
                {console.log(search)}
                <button  className="btn-search" onClick={submit}><FontAwesomeIcon icon={faSearch} /></button>
            </form>
            {loggedIn && Token ?  
                <div className="menu2">
                    <span><FontAwesomeIcon icon={faUser} /></span>
                    <h3> {profilNama} </h3>
                    <button className='signout' onClick={signout}>Logout</button>
                </div>
            :  
            <div className="menu">
                <button className="login" onClick={() => setModal(true)}>Login</button>
                <button className="register" onClick={() => setModal2(true)}>Register</button>
            </div>
            }
            
        </div>
        <Modal
            size='md'
            isOpen={modal3}
            toggle={()=> setModal3(!modal3)}
            centered={true}
            className='modal3'
        >
            <ModalHeader
                toggle={()=> setModal3(!modal3)}
            >
                Alert
            </ModalHeader>
            <ModalBody>
                <h1>{Error}</h1>
            </ModalBody>
        </Modal>
        <Modal
            size='lg'
            isOpen={modal}
            toggle={()=> setModal(!modal)}
        >
            <ModalHeader
                toggle={()=> setModal(!modal)}
            >
                Log In to Your Account
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit}>
                    <Row>
                    <Col lg={12}>
                            <div>
                                <input type='text' onChange={(e) => setEmail(e.target.value)} className='form-control' placeholder='Email Address' />
                                <span className="mail"><FontAwesomeIcon icon={faEnvelope} /></span>
                            </div>
                        </Col>
                        <Col lg={12}>
                            <div>
                                <input type={PasswordInputType} onChange={(e) => setPassword(e.target.value)} className='form-control' placeholder='Password' />
                                <span className="password-toggle-icon">
                                {ToggleIcon}
                                </span>
                            </div>
                        </Col>
                        <Col className="button-form-login">
                            <button className="submit" type='submit'>Login</button>
                            <GoogleLogin
                            onSuccess={submitLogin}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                            />
                        </Col>
                    </Row>
                </form>
            </ModalBody>
        </Modal>
        <Modal
            size='lg'
            isOpen={modal2}
            toggle={()=> setModal2(!modal2)}
        >
            <ModalHeader
                toggle={()=> setModal2(!modal2)}
            >
                Create Account
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleRegis}>
                    <Row>
                        <Col lg={12}>
                            <div>
                                <input type='text' className='form-control' placeholder='First Name' onChange={(e) => setFirstname(e.target.value)} />
                                <p className="error">{errFirstN}</p>
                                <span className="user1"><FontAwesomeIcon icon={faUser} /></span>
                            </div>
                        </Col>
                        <Col lg={12}>
                            <div>
                                <input type='text' className='form-control' placeholder='Last Name' onChange={(e) => setLastname(e.target.value)} />
                                <p className="error">{errLastN}</p>
                                <span className="user2"><FontAwesomeIcon icon={faUser} /></span>
                            </div>
                        </Col>
                        <Col lg={12}>
                            <div>
                                <input type='text' className='form-control' placeholder='Email Addres' onChange={(e) => setEmailregis(e.target.value)} />
                                <p className="error">{errEmail}</p>
                                <span className="mail2"><FontAwesomeIcon icon={faEnvelope} /></span>
                            </div>
                        </Col>
                        <Col lg={12}>
                            <div>
                                <input type={PasswordInputType} className='form-control' placeholder='Password' onChange={(e) => setPasswordregis(e.target.value)}/>
                                <p className="error">{errPass}</p>
                                <span className="password-toggle-icon1">
                                {ToggleIcon}
                                </span>
                            </div>
                        </Col>
                        <Col lg={12}>
                            <div>
                                <input type={PasswordInputType2} className='form-control' placeholder='Password Confirmation' onChange={(e) => setPasswordconfir(e.target.value)} />
                                <p className="error">{errPassCon}</p>
                                <span className="password-toggle-icon2">
                                {ToggleIcon2}
                                </span>
                            </div>
                        </Col>
                        <Col>
                            <button className="submit" type="submit">Register Now</button>
                        </Col>
                    </Row>
                </form>
            </ModalBody>
        </Modal>
    </div>
    </>
    )
}

export default Navbars