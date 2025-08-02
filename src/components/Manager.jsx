import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const [form, setform] = useState({ site: '', username: '', password: '' });
    const [passwordArray, setpasswordArray] = useState([]);

    useEffect(() => {
        let passwords = localStorage.getItem('passwords'); // consistent key 'passwords'
        if (passwords) {
            setpasswordArray(JSON.parse(passwords));
        }
    }, []);

    const showPassword = () => {
        if (ref.current.src.includes('icons/eyecross.png')) {
            ref.current.src = 'icons/eye.png';
        } else {
            ref.current.src = 'icons/eyecross.png';
        }
    };

    const savePassword = () => {
        const updatedPasswords = [...passwordArray, {...form, id:uuidv4()}];
        setpasswordArray(updatedPasswords);
        localStorage.setItem('passwords', JSON.stringify(updatedPasswords)); // consistent key
        setform({ site: '', username: '', password: '' }); // clear form after saving
    };

    const deletePassword = (id) => {
        let c = confirm("Do you really want to delete?")
        if(c){
            setpasswordArray(passwordArray.filter(item => item.id!== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id!== id)))
            toast('Password deleted successfully!', {
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
    }

    const editPassword = (id) => {
        setform(passwordArray.filter(i=>i.id === id)[0])
        setpasswordArray(passwordArray.filter(item => item.id!== id))

    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    const copyText = (text) => {
        toast('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#cccccc_1px,#000000_1px)] bg-[size:20px_20px]"></div>
            <div className="container mx-auto bg-[#888888] max-w-1/2 h-[85vh] py-6 my-6 rounded-2xl">
                <h1 className="text-4xl font-bold text-center">LockBuddy</h1>
                <p className="text-xl text-center font-bold">Your very own passcode manager</p>
                <div className="text-white flex flex-col p-4 gap-3 items-center">
                    <input
                        value={form.site}
                        onChange={handleChange}
                        placeholder="Enter website URL"
                        className="bg-white rounded-full border-2 border-black text-black p-4 py-2 w-full"
                        type="text"
                        name="site"
                    />
                    <div className="flex w-full gap-10 justify-between">
                        <input
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Enter Username"
                            className="bg-white rounded-full border-2 border-black text-black p-4 py-2 w-full"
                            type="text"
                            name="username"
                        />
                        <div className="relative w-[105%]">
                            <input
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                                className="bg-white rounded-full border-2 border-black text-black p-4 py-2 w-full"
                                type="text"
                                name="password"
                            />
                            <span className="absolute right-4 top-3 cursor-pointer text-black" onClick={showPassword}>
                                <img ref={ref} width={20} src="icons/eye.png" alt="show" />
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={savePassword}
                        className="font-bold flex justify-center items-center gap-1 bg-green-500 rounded-full w-fit mx-auto py-2 px-4 hover:bg-green-400 border-2 border-black"
                    >
                        <lord-icon className="w-6" src="https://cdn.lordicon.com/efxgwrkc.json" trigger="hover" colors="primary:#000000"></lord-icon>
                        Save Password
                    </button>
                </div>
                <div className="passwords">
                    <h2 className="font-bold text-md px-12">Your Passwords</h2>
                    {passwordArray.length === 0 && <div className="font-bold px-12 py-1">No saved passwords yet.</div>}
                    {passwordArray.length !== 0 && (
                        <table className="table-auto w-11/12 rounded-xl overflow-hidden mx-auto m-3">
                            <thead className="bg-black text-white">
                                <tr>
                                    <th className="py-2">Site</th>
                                    <th className="py-2">Username</th>
                                    <th className="py-2">Password</th>
                                    <th className="py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-500">
                                {passwordArray.map((item, index) => (
                                    <tr key={index}>
                                        <td className="text-center py-1 px-3 border">
                                            <div className="flex justify-center items-center gap-2">
                                                <a href={item.site} target="_blank" rel="noopener noreferrer">
                                                    {item.site}
                                                </a>
                                                <lord-icon
                                                    className="w-5 cursor-pointer"
                                                    src="https://cdn.lordicon.com/xuoapdes.json"
                                                    trigger="hover"
                                                    colors="primary:#000000"
                                                    onClick={() => copyText(item.site)}
                                                ></lord-icon>
                                            </div>
                                        </td>
                                        <td className="text-center py-1 px-3 border">
                                            <div className="flex justify-center items-center gap-2">
                                                <span>{item.username}</span>
                                                <lord-icon
                                                    className="w-5 cursor-pointer"
                                                    src="https://cdn.lordicon.com/xuoapdes.json"
                                                    trigger="hover"
                                                    colors="primary:#000000"
                                                    onClick={() => copyText(item.username)}
                                                ></lord-icon>
                                            </div>
                                        </td>
                                        <td className="text-center py-1 px-3 border">
                                            <div className="flex justify-center items-center gap-2">
                                                <span>{item.password}</span>
                                                <lord-icon
                                                    className="w-5 cursor-pointer"
                                                    src="https://cdn.lordicon.com/xuoapdes.json"
                                                    trigger="hover"
                                                    colors="primary:#000000"
                                                    onClick={() => copyText(item.password)}
                                                ></lord-icon>
                                            </div>
                                        </td>
                                        <td className="text-center py-1 px-3 border">
                                            <div className="flex justify-center items-center gap-2">
                                                <span><lord-icon
                                                    className="w-5 cursor-pointer"
                                                    src="https://cdn.lordicon.com/valwmkhs.json"
                                                    trigger="hover"
                                                    colors="primary:#000000"
                                                    onClick={() => editPassword(item.id)}>
                                                </lord-icon></span>
                                                <span><lord-icon
                                                    className="w-5 cursor-pointer"
                                                    src="https://cdn.lordicon.com/oqeixref.json"
                                                    trigger="hover"
                                                    colors="primary:#000000"
                                                    onClick={() => deletePassword(item.id)}>
                                                </lord-icon></span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default Manager;
