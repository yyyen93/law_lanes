const Auth =  () => {
    return(
        // Background
        <div className="relative h-full w-full bg-[url('/img/background.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">  
            {/* Background overlay */}
            <div className="bg-black w-full h-full lg:bg-opacity-70">
                {/* Navigation Logo */}
                <nav className="px-12 py-5">
                    <img src="/img/law.png" alt="logo" className="h-32 mx-auto" />
                </nav>
            </div>
        </div>
    )
}

export default Auth;