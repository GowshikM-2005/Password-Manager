import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import clsx from 'clsx';


const Manager = () => {
    const passwordRef = useRef()

    const save = () => {
         if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])

            localStorage.setItem("password", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            setform({ site: '', username: '', password: '' })
           
        }
        else {
            toast('Error: Password not saved!');
        }
    }
    const deletePassword = (id) => {
        let c = confirm("Do You want to delete")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("password", JSON.stringify(passwordArray.filter(item => item.id !== id)))
           

        }

    }
    const editPassword = (id) => {

        setform(passwordArray.filter(i => i.id === id)[0])
        setpasswordArray(passwordArray.filter(item => item.id !== id))


    }
    const [form, setform] = useState({ site: '', username: '', password: '' })
    const ref = useRef()
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem('password')

        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
        navigator.clipboard.writeText(text)
    }
    const show = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1OW7n6Sp0_DS4PGgv0_AHEbTUF3aQZN5NdA&s")) {
            ref.current.src = "https://i.pinimg.com/474x/86/38/83/86388386ba1a7120654e81c4d3221a44.jpg"
            passwordRef.current.type = "text"
        } else {
            ref.current.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1OW7n6Sp0_DS4PGgv0_AHEbTUF3aQZN5NdA&s"
            passwordRef.current.type = "password"
        }
    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })


    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute top-0 z-[-2] h-full w-full bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
            <div className="p-3 md:p-0 md:mycontainer min-h-[88.2vh]">
                <h1 className="text-4xl text font-bold text-center  ">
                    <span className="text-green-700">&lt;</span>
                    <span>Pass</span> <span className="text-green-700">Word/&gt;</span>


                </h1>
                <p className="text-red-500 text-lg text-center ">Your Own Password Manager</p>
                <div className=" flex flex-col p-4 text-black gap-8  items-center ">
                    <input value={form.site} onChange={handlechange} placeholder=" Enter the Website Url" type="text" className="rounded-full border border-green-500 w-full" name="site" id="site" p-4 py-1 />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8 text-black">
                        <input value={form.username} placeholder=" EnterUserName" type="text" onChange={handlechange} className="rounded-full border border-green-500 w-full" name="username" id="username" p-4 py-1 />

                        <div className="relative">
                            <input ref={passwordRef} value={form.password} placeholder=" Password" type="password" onChange={handlechange} className="rounded-full border border-green-500 w-full" name="password" id="password" p-4 py-1 />
                            <span className="absolute right-[1px] top-[3px] " onClick={show}>
                                <img ref={ref} className='p-1' width={25} src="https://i.pinimg.com/474x/86/38/83/86388386ba1a7120654e81c4d3221a44.jpg" alt="eye" />
                            </span>
                        </div>


                    </div>


                    <button onClick={save} className="flex justify-center w-32 text-white item-center w-32 bg-red-400 rounded-full  gap-3 px-2 py-2 w-fit border border-green-700">
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save Password</button>
                </div>
                <div className="passwords">

                    <h2 className="font-bold text-2xl py-4">Your Password</h2>
                    {passwordArray.length === 0 && <div>No password To show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className="bg-green-800 text-white">
                            <tr>
                                <th className="py2">Site</th>
                                <th className="py2">UserName</th>
                                <th className="py2">Password</th>
                                <th className="py2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-green-100">
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className="  border border-white py-2 text-center ">
                                        <div className="flex items-center justify-center">
                                            <a href={item.site} target="_blank">{item.site}</a>
                                            <div className=" lordiconcopy size-7 cursor-pointer" onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover"
                                                    style={{
                                                        "width": "25px", "height": "25px", "paddingTop": "3px",
                                                        "paddingLeft": "3px"
                                                    }}
                                                >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="  border border-white py-2 text-center ">
                                        <div className="flex items-center justify-center">
                                            <span> {item.username}</span>
                                            <div className="lordiconcopy size-7 cursor-pointer" onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover"
                                                    style={{
                                                        "width": "25px", "height": "25px", "paddingTop": "3px",
                                                        "paddingLeft": "3px"
                                                    }}
                                                >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="  border border-white py-2 text-center ">
                                        <div className="flex items-center justify-center">
                                            <span>{item.password}</span>
                                            <div className="lordiconcopy size-7 cursor-pointer " onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover"
                                                    style={{
                                                        "width": "25px", "height": "25px", "paddingTop": "3px",
                                                        "paddingLeft": "3px"
                                                    }}
                                                >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="  border border-white py-2 text-center ">
                                        <span className="cursor-pointer mx-1" onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>

                                            </lord-icon>
                                        </span>
                                        <span className="cursor-pointer mx-1" onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>

                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}
export default Manager;