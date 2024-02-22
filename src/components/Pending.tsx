import { useState } from 'react'

const Pending = () => {
    const [show, setShow] = useState(true);
    setTimeout(() => {
        setShow(false)
    }, 100)

    if (show) {
        return (
            <main className='absolute left-0 top-0 w-full h-screen bg-zinc-950 z-50'>
            </main>
        )
    }
}

export default Pending