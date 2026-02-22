import React from "react"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

function RootLayout() {
    // const isLight = useSelector((state) => {
    //     console.log(state);
    //     return state.theme.isLight
    // })


    return (

        <>
            <main >
                <Outlet />
            </main>
        </>
    )
}
export default RootLayout