const Footer = () => {
    return (
        <div className="bg-blue-800 w-full h-16">
            <div className="flex flex-col justify-center items-center h-full">
                <small className="text-slate-400 tracking-tight text-center">
                    Hotels.com &copy; {new Date().getFullYear()}
                </small>
            </div>
        </div>
    );
}

export default Footer;