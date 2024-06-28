const Footer = () => {
    return (
        <div className="bg-blue-800 py-4">
            <div className="flex justify-center items-center">
                <small className="text-slate-400 tracking-tight">
                    Hotels.com &copy; {new Date().getFullYear()}
                </small>
            </div>
        </div>
    );
}

export default Footer;