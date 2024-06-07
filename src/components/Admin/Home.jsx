// src/components/Home.js
import React from 'react';
import SideNav from './SideNav';

const Home = () => {

  

    return (
        <div className='big' style={{backgroundColor:"aliceblue",height:'100vh'}}> 
            <SideNav />
            <div className="whole">
                <div>
                    <div className="pl-3 row main-row">
                        <div
                            className="col-12 my-sm-0 my-md-5 p-3 montserrat-400"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <h2 style={{color:"#b20769"}}><b>ADMIN DAHBOARD</b></h2>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;




// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import AuthService from '../../services/authService'; // Adjusted path
// import SideNav from './SideNav';

// const Home = () => {
//     const navigate = useNavigate();

//     const handleLogout = async () => {
//         await AuthService.logout();
//         navigate('/admin/login');
//     };

//     return (
//         <div>
//             <SideNav/>
//             <h2>Welcome to the Admin Dashboard</h2>
//             <button onClick={handleLogout}>Logout</button>
//         </div>
//     );
// };

// export default Home;
