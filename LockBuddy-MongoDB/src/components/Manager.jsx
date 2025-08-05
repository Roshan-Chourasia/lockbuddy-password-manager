import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const [form, setform] = useState({ site: '', username: '', password: '', id: '' });
    const [passwordArray, setpasswordArray] = useState([]);

    const getPasswords = async () => {
        let req = await fetch('http://localhost:3000/');
        let passwords = await req.json();
        setpasswordArray(passwords);
    };

    useEffect(() => {
        getPasswords();
    }, []);

    const showPassword = () => {
        const input = document.querySelector('input[name="password"]');
        if (ref.current.src.includes('eyecross.png')) {
            ref.current.src = 'icons/eye.png';
            input.type = 'password';
        } else {
            ref.current.src = 'icons/eyecross.png';
            input.type = 'text';
        }
    };

    const savePassword = async () => {
        if (
            form.site.length > 3 &&
            form.password.length > 3 &&
            form.username.length > 3
        ) {
            try {
                if (form.id) {
                    // Delete the old password first
                    await fetch("http://localhost:3000/", {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: form.id }),
                    });
                }

                // Create new password with new UUID (even for edit)
                const newId = uuidv4();
                const newPassword = { ...form, id: newId };

                // Add (POST) the new or edited password
                await fetch("http://localhost:3000/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newPassword),
                });

                setform({ site: "", username: "", password: "", id: "" });
                await getPasswords();
                toast("Password saved!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } catch (error) {
                toast("Error: Unable to save password!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } else {
            toast("Error: Please fill all fields with at least 4 characters!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };



    const deletePassword = async (id) => {
        if (window.confirm('Do you really want to delete?')) {
            await fetch("http://localhost:3000/", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });
            await getPasswords();
            toast('Password deleted successfully!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        }
    };

    const editPassword = (id) => {
        const item = passwordArray.find((i) => i.id === id);
        if (item) {
            setform(item);
        }
    };


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    const copyText = (text) => {
        toast('Copied to Clipboard!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
        });
        navigator.clipboard.writeText(text);
    };

    return (
        <>
            <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
            />
            <div className='md:container mx-5 md:mx-auto bg-[#888888] md:max-w-1/2 min-h-[calc(100vh-8rem)] py-6 my-5 rounded-2xl flex flex-col'>
                <h1 className='text-4xl font-bold text-center'>LockBuddy</h1>
                <p className='text-xl text-center font-bold'>
                    Your very own passcode manager
                </p>
                <div className='text-white flex flex-col p-4 py-6 gap-3 items-center'>
                    <input
                        value={form.site}
                        onChange={handleChange}
                        placeholder='Enter website URL'
                        className='bg-white rounded-full border-2 border-black text-black p-4 py-2 w-full'
                        type='text'
                        name='site'
                    />
                    <div className='flex flex-col sm:flex-row w-full gap-3 sm:gap-10 justify-between'>
                        <input
                            value={form.username}
                            onChange={handleChange}
                            placeholder='Enter Username'
                            className='bg-white rounded-full border-2 border-black text-black p-4 py-2 sm:w-[102%] w-full'
                            type='text'
                            name='username'
                        />
                        <div className='relative sm:w-[105%]'>
                            <input
                                value={form.password}
                                onChange={handleChange}
                                placeholder='Enter Password'
                                className='bg-white rounded-full border-2 border-black text-black p-4 py-2 w-full'
                                type='password'
                                name='password'
                            />
                            <span
                                className='absolute right-4 top-4 sm:right-4 sm:top-4 cursor-pointer text-black'
                                onClick={showPassword}
                            >
                                <img
                                    ref={ref}
                                    width={16}
                                    sm-width={20}
                                    src='icons/eye.png'
                                    alt='show'
                                />
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={savePassword}
                        className='font-bold flex justify-center items-center gap-1 bg-green-500 rounded-full w-fit mx-auto py-1 px-2 sm:py-2 sm:px-4 hover:bg-green-400 border-2 border-black cursor-pointer'
                    >
                        <lord-icon
                            className='w-4 sm:w-6'
                            src='https://cdn.lordicon.com/efxgwrkc.json'
                            trigger='hover'
                            colors='primary:#000000'
                        ></lord-icon>
                        Save Password
                    </button>
                </div>
                <div className='passwords flex-1 flex flex-col'>
                    <h2 className='font-bold text-md px-3 sm:px-6'>Your Passwords</h2>
                    {passwordArray.length === 0 && (
                        <div className='font-bold px-6 sm:px-12 py-1'>
                            ~ No saved passwords yet.
                        </div>
                    )}
                    {passwordArray.length !== 0 && (
                        <div className='overflow-x-auto flex-1 px-2 sm:px-4'>
                            <table className='table-auto w-full rounded-xl overflow-hidden mx-auto m-3'>
                                <thead className='bg-black text-white'>
                                    <tr>
                                        <th className='py-2 px-2 sm:px-6'>Site</th>
                                        <th className='py-2 px-2 sm:px-6'>Username</th>
                                        <th className='py-2 px-2 sm:px-6'>Password</th>
                                        <th className='py-2 px-2 sm:px-6'>Action</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-gray-500'>
                                    {passwordArray.map((item) => (
                                        <tr key={item.id}>
                                            <td className='text-center py-2 px-3 border break-all'>
                                                <div className='flex flex-wrap sm:flex-nowrap justify-center items-center gap-2'>
                                                    <a
                                                        href={item.site}
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                        className='break-all'
                                                    >
                                                        {item.site}
                                                    </a>
                                                    <lord-icon
                                                        className='w-5 cursor-pointer mt-1 sm:mt-0'
                                                        src='https://cdn.lordicon.com/xuoapdes.json'
                                                        trigger='hover'
                                                        colors='primary:#000000'
                                                        onClick={() => copyText(item.site)}
                                                    ></lord-icon>
                                                </div>
                                            </td>
                                            <td className='text-center py-2 px-3 border break-all'>
                                                <div className='flex flex-wrap sm:flex-nowrap justify-center items-center gap-2'>
                                                    <span className='break-all'>{item.username}</span>
                                                    <lord-icon
                                                        className='w-5 cursor-pointer mt-1 sm:mt-0'
                                                        src='https://cdn.lordicon.com/xuoapdes.json'
                                                        trigger='hover'
                                                        colors='primary:#000000'
                                                        onClick={() => copyText(item.username)}
                                                    ></lord-icon>
                                                </div>
                                            </td>
                                            <td className='text-center py-2 px-3 border break-all'>
                                                <div className='flex flex-wrap sm:flex-nowrap justify-center items-center gap-2'>
                                                    <span className='break-all'>{"*".repeat(item.password.length)}</span>
                                                    <lord-icon
                                                        className='w-5 cursor-pointer mt-1 sm:mt-0'
                                                        src='https://cdn.lordicon.com/xuoapdes.json'
                                                        trigger='hover'
                                                        colors='primary:#000000'
                                                        onClick={() => copyText(item.password)}
                                                    ></lord-icon>
                                                </div>
                                            </td>
                                            <td className='text-center py-2 px-3 border'>
                                                <div className='flex justify-center items-center gap-2'>
                                                    <span>
                                                        <lord-icon
                                                            className='w-5 cursor-pointer'
                                                            src='https://cdn.lordicon.com/valwmkhs.json'
                                                            trigger='hover'
                                                            colors='primary:#000000'
                                                            onClick={() => editPassword(item.id)}
                                                        ></lord-icon>
                                                    </span>
                                                    <span>
                                                        <lord-icon
                                                            className='w-5 cursor-pointer'
                                                            src='https://cdn.lordicon.com/oqeixref.json'
                                                            trigger='hover'
                                                            colors='primary:#000000'
                                                            onClick={() => deletePassword(item.id)}
                                                        ></lord-icon>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Manager;
