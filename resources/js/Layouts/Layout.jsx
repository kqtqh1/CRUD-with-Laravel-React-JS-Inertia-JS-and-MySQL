import {Link} from "@inertiajs/react";
export default function Layout({children}){
    return(
        <>
            <header>
                <nav className="space-x-6">
                    
                  
                    
                </nav>
            </header>
            <main >{children}</main>
        </>
    );
}