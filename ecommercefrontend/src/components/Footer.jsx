import Facebook from '@mui/icons-material/Facebook';
import Instagram from '@mui/icons-material/Instagram';
import MailOutline from '@mui/icons-material/MailOutlined';
import Phone from '@mui/icons-material/Phone';
import Twitter from '@mui/icons-material/Twitter';
import Room from '@mui/icons-material/Room';
import { Link } from 'react-router-dom';
  
  const Footer = () => {
    return (
      <div className="mt-12 flex flex-wrap md:flex-nowrap">
        {/* Left Section */}
        <div className="flex-1 flex flex-col p-5">
          <h1 className="text-2xl font-bold">MytalorzoneBySahiba</h1>
          <p className="my-5">
          Mytalorzone By Sahiba is a clothing brand that offers creative, unique, and diverse clothing for girls, including traditional, western, and trendy styles.
          </p>
          <div className="flex space-x-5">
            <div
              className="w-10 h-10 rounded-full bg-[#3B5999] text-white flex items-center justify-center"
            >
              <Facebook />
            </div>
            <div
              className="w-10 h-10 rounded-full bg-[#E4405F] text-white flex items-center justify-center"
            >
              <Instagram />
            </div>
            <div
              className="w-10 h-10 rounded-full bg-[#55ACEE] text-white flex items-center justify-center"
            >
              <Twitter />
            </div>
            
          </div>
        </div>
  
        {/* Center Section */}
        <div className="flex-1 p-5 hidden md:block">
          <h3 className="text-lg font-semibold mb-7">Useful Links</h3>
          <ul className="m-0 p-0 list-none flex flex-wrap">
             
            <li className="w-1/2 mb-2"><Link to="/">Home</Link></li>
            <li className="w-1/2 mb-2"><Link to="/cart"> Cart</Link></li>
          <li className="w-1/2 mb-2"> <Link to="/product">  Woman Fashion </Link></li>
           <li className="w-1/2 mb-2"> <Link to="">Accessories</Link></li>
           <li className="w-1/2 mb-2"> <Link to="/userProfile">My Account</Link></li>
            <li className="w-1/2 mb-2"><Link to="order">Order Traking</Link></li>
          <li className="w-1/2 mb-2"> <Link to="/faviorty"> Wishlist</Link></li>
          </ul>
        </div>
  
        {/* Right Section */}
        <div className="flex-1 p-5 bg-[#fff8f8]">
          <h3 className="text-lg font-semibold mb-7">Contact</h3>
          <div className="flex items-center mb-5">
            <Room className="mr-3" />
            622 Dixie Path, South Tobinchester 98336
          </div>
          <div className="flex items-center mb-5">
            <Phone className="mr-3" />
            +1 234 56 78
          </div>
          <div className="flex items-center mb-5">
            <MailOutline className="mr-3" />
            contact@mytalorzonebysahiba.com
          </div>
          <img
            src="https://i.ibb.co/Qfvn4z6/payment.png"
            alt="Payment Methods"
            className="w-1/2"
          />
        </div>
      </div>
    );
  };
  
  export default Footer;
  