import React from 'react';
import classes from './Footer.module.css';
function Footer() {
    return (
        <footer>
            <div className={`${classes.footer} bg-light d-inline-flex justify-content-center align-items-center`}>
                <span className="my-1"> Bachelor Thesis - 2010859008 Kappel</span>
            </div>
        </footer>
    );
}

export default Footer;