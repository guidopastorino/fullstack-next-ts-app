'use client'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

interface UserLoginData {
    usernameOrEmail: string;
    password: string;
}

const page = () => {
    const [login, setLogin] = useState<boolean>(true);

    return (
        <div className='h-screen w-full flex justify-center items-center'>
            <div className='w-full max-w-xs border shadow-md rounded-md p-2'>
                <div className='w-full grid grid-cols-2'>
                    <div className='cursor-pointer p-2 text-center font-medium hover:bg-gray-200 active:bg-gray-300' onClick={() => setLogin(true)}>Login</div>
                    <div className='cursor-pointer p-2 text-center font-medium hover:bg-gray-200 active:bg-gray-300' onClick={() => setLogin(false)}>Register</div>
                </div>
                {login ? <Login /> : <Register />}
            </div>
        </div>
    )
}



const Login = () => {
    const FormRef = useRef<HTMLFormElement>(null);

    const [user, setUser] = useState<UserLoginData>({
        usernameOrEmail: "",
        password: "",
    })

    useEffect(() => console.log(user), [user])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const res = await fetch(`/api/users/${user.usernameOrEmail}`);

        if (res.ok) {
            const data = await res.json();
            console.log(data)
        } else {
            console.log("Error en la solicitud:", res.status, res.statusText);
        }
    };

    const updateUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className='w-full'>
            <form ref={FormRef} onSubmit={handleSubmit} className='w-full flex items-center flex-col gap-3 py-2'>
                <input
                    onChange={e => updateUser(e)}
                    className='border border-black rounded-lg p-2 w-full'
                    autoComplete='off'
                    type={"text"}
                    name={"usernameOrEmail"}
                    placeholder={"Username or Email"}
                />

                <input
                    onChange={e => updateUser(e)}
                    className='border border-black rounded-lg p-2 w-full'
                    autoComplete='off'
                    type={"password"}
                    name={"password"}
                    placeholder={"Password"}
                />

                <button type='submit' className='py-3 px-5 w-max text-xs text-white bg-neutral-800 rounded-full hover:bg-neutral-700 duration-100'>Login</button>
            </form>
        </div>
    )
}


interface User {
    profileImage: string;
    fullname: string;
    username: string;
    email: string;
    password: string;
    privateAccount: boolean;
}

const Register = () => {
    const FormRef = useRef<HTMLFormElement>(null);

    const [user, setUser] = useState<User>({
        profileImage: "",
        fullname: "",
        username: "",
        email: "",
        password: "",
        privateAccount: false,
    })


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const res = await fetch("/api/users", { method: "POST", body: JSON.stringify(user) });

        if (res.ok) {
            const data = await res.json();
        } else {
            console.log("Error en la solicitud:", res.status, res.statusText);
        }
    };

    const updateUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files && files.length > 0) {
            const file = URL.createObjectURL(files[0]);
            setUser({
                ...user,
                profileImage: file
            })
        } else {
            console.warn("No se seleccionó ningún archivo.");
        }
    };


    return (
        <div className='w-full'>
            <form ref={FormRef} onSubmit={handleSubmit} className='w-full flex items-center flex-col gap-3 py-2'>
                {/* inputs */}
                <>
                    {/* fullname */}
                    <input
                        onChange={e => updateUser(e)}
                        className='border border-black rounded-lg p-2 w-full'
                        autoComplete='off'
                        type={"text"}
                        name={"fullname"}
                        placeholder={"Fullname"}
                    />
                    {/* username */}
                    <input
                        onChange={e => updateUser(e)}
                        className='border border-black rounded-lg p-2 w-full'
                        autoComplete='off'
                        type={"text"}
                        name={"username"}
                        placeholder={"Username"}
                    />
                    {/* email */}
                    <input
                        onChange={e => updateUser(e)}
                        className='border border-black rounded-lg p-2 w-full'
                        autoComplete='off'
                        type={"email"}
                        name={"email"}
                        placeholder={"Email"}
                    />
                    {/* password */}
                    <input
                        onChange={e => updateUser(e)}
                        className='border border-black rounded-lg p-2 w-full'
                        autoComplete='off'
                        type={"password"}
                        name={"password"}
                        placeholder={"Password"}
                    />
                </>

                {/* profile image */}
                <>
                    <input accept='image/*' onChange={e => handleInputFile(e)} type="file" name="profileImage" hidden />

                    <img className='w-20 h-20 rounded-full border shadow overflow-hidden object-cover' src={!!user?.profileImage?.length ? user.profileImage : '/default-image.png'} alt="default image" title='profile image' />

                    <button onClick={() => FormRef.current?.profileImage.click()} type='button' className='py-3 px-5 w-max text-xs text-white bg-neutral-800 hover:bg-neutral-700 duration-100'>{!!user?.profileImage?.length ? "Change Profile Image" : "Select Profile Image"}</button>

                    {!!user?.profileImage?.length && <button onClick={() => {
                        setUser({
                            ...user,
                            profileImage: ""
                        })
                        if (FormRef.current) {
                            FormRef.current.profileImage.value = null
                        }
                    }} type='button' className='py-3 px-5 w-max text-xs text-white bg-neutral-800 hover:bg-neutral-700 duration-100'>Delete Profile Image</button>}
                </>

                <div className='flex justify-start items-center gap-1.5 w-full select-none'>
                    <input
                        className='w-4 h-4'
                        id='privateAccount'
                        type="checkbox"
                        name='privateAccount'
                        checked={user.privateAccount}
                        onChange={(e) => setUser({
                            ...user,
                            [e.target.name]: e.target.checked
                        })}
                    />
                    <label htmlFor='privateAccount'>Private account?</label>
                </div>

                <button type='submit' className='py-3 px-5 w-max text-xs text-white bg-neutral-800 rounded-full hover:bg-neutral-700 duration-100'>Register</button>
            </form>
            <Link href="/">Back</Link>
        </div>
    )
}

export default page