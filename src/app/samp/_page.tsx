import React from 'react'

type Props = {
    children?: React.ReactNode
}

const BackdropFilter = () => {
    return (
        <div className="w-[200px] md:w-[300px] h-[200px] blur-[110px] md:blur-[140px] translate-y-[-170%] md:translate-y-[-60%] absolute left z-1 rounded-full  bg-gradient-to-r from-blue-300 to-indigo-500">
        </div>
    )
}

export default BackdropFilter