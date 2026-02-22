import React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../components/layout/Navbar"
import { useSelector } from "react-redux"

function RootLayout() {
    // const isLight = useSelector((state) => {
    //     console.log(state);
    //     return state.theme.isLight
    // })


    return (

        <>
            <Navbar />
            <main >
                <Outlet />
            </main>
        </>
    )
}
export default RootLayout