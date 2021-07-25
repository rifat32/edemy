import Link from 'next/link'
import { useEffect,useState } from 'react';

const AdminNav = () => {
    const [current,setCurrent] = useState("")
    useEffect(() => {
        process.browser && setCurrent(window.location.pathname)
   
   console.log(window.location.pathname)
    },[process.browser && window.location.pathname])
    return (
        <div className="nav flex-column nav-pills">
            <Link href="/admin">
                <a className={`nav-link ${current === "/admin" && 'active'}`}>Dashboard</a>
            </Link>
            <Link href="/admin/confirm">
                <a className={`nav-link ${current === "/admin/confirm" && 'active'}`}>Confirm Payment</a>
            </Link>
        </div>
    )
}

export default AdminNav
