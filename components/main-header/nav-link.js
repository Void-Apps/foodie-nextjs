'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

import classes from './nav-link.module.css';

export default function NavLink({href, children}){
    const path = usePathname();
    return (
                <Link 
                    className={path.startsWith(href) ? `${classes.link} ${classes.active}` : classes.link } 
                    href={href}>
                        {children}
                </Link>
    );
}