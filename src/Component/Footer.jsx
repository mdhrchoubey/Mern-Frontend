import React from 'react';
import "./Footer.css"
// import { Facebook, Twitter, Youtube, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <div className="blurred-background">
        <div className="content">
    <footer className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          {/* <img src="/api/placeholder/50/50" alt="Archdiocese of Bhopal Logo" className="w-12 h-12 mr-3" /> */}
          <div> 
            <h2 className="text-xl font-bold">Aryans Public Higher Secondry School</h2>
            {/* <p className="text-sm">Archbishop's House</p> */}
            <p>Aiims , Saket Nagar, Bhopal (M.P.)</p>
          <p className="university-subtitle">(Affilated by MP Government.)</p>

          </div>
        </div>
        
       
        
        <div className="flex flex-col items-end">
          <div className="flex space-x-4 mb-2">
            <a href="#" aria-label="Facebook">Facebook</a>
            <a href="#" aria-label="Twitter">Twitter</a>
            <a href="#" aria-label="YouTube">Youtube</a>
            <a href="#" aria-label="WhatsApp">Phone</a>
          </div>
          <a href="mailto:archdiocebpl@gmail.com" className="text-sm">archdiocebpl@gmail.com</a>
          <a href="tel:+917223016245" className="text-sm">+91 7223016245</a>
          <h6 className="text-xs mt-2">Copyright © 2024, APS  All rights reserved.</h6>
        </div>
      </div>
    </footer>
    </div>
    </div>
  );
};

export default Footer;