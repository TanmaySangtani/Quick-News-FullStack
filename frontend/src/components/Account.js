import React, { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import contextAddress from '../context/WebContext'
// import { Link } from 'react-router-dom'

const Account = () => {
    const context = useContext(contextAddress)
    const { checkLogin, isLoggedIn, getUserDetails, updateUserDetails } = context
    let navigate = useNavigate()
    const firstRender = useRef(false)

    //Un = username
    const [dispUn, setDispUn] = useState('')
    const [unInput, setUnInput] = useState('')
    const [unToggle, setUnToggle] = useState(false)
    const onSubmitUn = async () => {
        const username = unInput
        setUnInput('')
        setUnToggle(false)

        const result = await updateUserDetails('username', username)

        if (result) {
            setDispUn(username)
        } else {
            console.error("Encountered some error updating user details")
        }
    }

    const [dispEmail, setDispEmail] = useState('')
    const [emailInput, setEmailInput] = useState('')
    const [emailToggle, setEmailToggle] = useState(false)
    const onSubmitEmail = async () => {
        const email = emailInput
        setEmailInput('')
        setEmailToggle(false)

        const result = await updateUserDetails('email', email)

        if (result) {
            setDispEmail(email)
        } else {
            console.error("Encountered some error updating user details")
        }
    }

    const [passInput, setPassInput] = useState('')
    const [confPassInput, setConfPassInput] = useState('')
    const [passToggle, setPassToggle] = useState(false)
    const onSubmitPass = async () => {
        const password = passInput
        const confPassword = confPassInput
        setPassInput('')
        setConfPassInput('')
        setPassToggle(false)

        if (password !== confPassword) {
            console.error("passwords dont match")
            return 
        }

        const result = await updateUserDetails('password', password)

        if (result) {
            console.log('password updated')
        } else {
            console.error("Encountered some error updating user details")
        }
    }

    const applyUserDetails = async () => {
        const res = await getUserDetails()

        if (res.success) {
            setDispUn(res.username)
            setDispEmail(res.email)
        } else {
            console.error("Some errors fetching user details")
        }
    }

    useEffect(()=>{
        if (firstRender.current === false) {
            firstRender.current = true

            if (isLoggedIn) {
                applyUserDetails()
            }
        } else {
            if (!isLoggedIn) {
                console.error("This page requires login")
                navigate('/')
            } else {
                applyUserDetails()
            }
        }

        //eslint-disable-next-line
    }, [isLoggedIn])

    useEffect(()=>{
        checkLogin()
        //eslint-disable-next-line
    }, [])

    return (
        <div style={{ paddingTop: '6rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Account</h1>
            <h3>Update Account Details</h3>

            {/* Username */}
            <div style={{display: 'flex', flexDirection: 'row', margin: '1rem'}}>
                <div style={{margin: '0rem 0.5rem'}}>Username :
                </div>
                <div>
                {unToggle && 
                    <div>
                        <input type="text" id="username" name="username" onChange={(e)=>{setUnInput(e.target.value)}} aria-describedby='Enter username'/>
                        <button onClick={onSubmitUn}>Submit</button>
                        <button style={{margin: '0rem 0.5rem'}} onClick={()=>{setUnInput(''); setUnToggle(!unToggle)}}>Cancel</button>
                    </div>
                }
                {!unToggle &&
                    (
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <div style={{margin: '0rem 0.5rem', fontWeight: '700'}}>{dispUn}</div>
                            <button style={{margin: '0rem 0.5rem'}} onClick={()=>{setUnToggle(!unToggle)}}>
                                Change
                            </button>
                        </div>
                    )
                }
                </div>
            </div>

            {/* Email */}
            <div style={{display: 'flex', flexDirection: 'row', margin: '1rem'}}>
                <div style={{margin: '0rem 0.5rem'}}>Email :
                </div>
                <div>
                {emailToggle && 
                    <div>
                        <input type="text" id="email" name="email" onChange={(e)=>{setEmailInput(e.target.value)}} aria-describedby='Enter email'/>
                        <button onClick={onSubmitEmail}>Submit</button>
                        <button style={{margin: '0rem 0.5rem'}} onClick={()=>{setEmailInput(''); setEmailToggle(!emailToggle)}}>Cancel</button>
                    </div>
                }
                {!emailToggle &&
                    (
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <div style={{margin: '0rem 0.5rem', fontWeight: '700'}}>{dispEmail}</div>
                            <button style={{margin: '0rem 0.5rem'}} onClick={()=>{setEmailToggle(!emailToggle)}}>
                                Change
                            </button>
                        </div>
                    )
                }
                </div>
            </div>

            {/* Password */}
            <div style={{display: 'flex', flexDirection: 'column', margin: '1rem', alignItems: 'center'}}>
                <div style={{margin: '0.5rem 0rem', fontWeight: '700'}}>Password</div>
                <div>
                {passToggle && 
                    <div style={{display: 'flex', flexDirection: 'column', margin: '0.5rem'}}>
                        <input style={{margin: '0.5rem'}} type="password" id="password" placeholder="New Password" name="password" onChange={(e)=>{setPassInput(e.target.value)}} aria-describedby='Enter password'/>
                        <input style={{margin: '0.5rem'}} type="password" id="cpassword" placeholder="Confirm Password" name="cpassword" onChange={(e)=>{setConfPassInput(e.target.value)}} aria-describedby='Enter confirm password'/>
                        <button style={{margin: '0.5rem'}} onClick={onSubmitPass}>Submit</button>
                        <button style={{margin: '0rem 0.5rem'}} onClick={()=>{setPassInput(''); setConfPassInput(''); setPassToggle(!passToggle)}}>Cancel</button>
                    </div>
                }
                {!passToggle &&
                    (
                        <button style={{margin: '0rem 0.5rem'}} onClick={()=>{setPassToggle(!passToggle)}}>
                            Change
                        </button>
                    )
                }
                {(passInput !== confPassInput) &&
                    <div style={{color: "red"}}>
                    Entered passwords do not match
                    </div>
                }
                </div>
            </div>
        </div>
    )
}

export default Account