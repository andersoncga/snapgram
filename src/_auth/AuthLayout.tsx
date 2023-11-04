import { Outlet, Navigate } from 'react-router-dom';

function AuthLayout() {
    const isAuthenticaded = false;

  return (
    <>
        {isAuthenticaded ? (
            <Navigate to="/" />
        ) : (
            <>
                <section className="flex flex-1 justify-center items-center flex-col py-10">
                    <Outlet />
                </section>

                <img 
                    src="/assets/images/side-img.svg"
                    alt="Logo"
                    className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
                />
            </>    
        )}
    </>
  )
}

export default AuthLayout