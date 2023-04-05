import React, {useState} from "react";
import '../components/css/Footer.css';

export const Footer = () => {
    const currDate = new Date().getFullYear()
    const [date] = useState(currDate)

    return (
        <footer className="footer">
            <p className="date">{date}</p>
            <p className="text">MovieManiac &copy;</p>
        </footer>
    )
}