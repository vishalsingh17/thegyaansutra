import React from "react";
import Slider from "react-slick";
import amazon from './assets/amazon.png';
import deloitte from './assets/deloitte.png';
import ibm from './assets/IBM.png';
import infosys from './assets/infosys.png';
import intel from './assets/intel.png';
import samsung from './assets/samsung.png';
import Meta from './assets/Meta.png';
import microsoft from './assets/Microsoft.png';
import curve from './assets/curve shape.svg'; // Import the curve image

const CompanyLogo = () => {
  const companies = [
    { name: "Amazon", logo: amazon },
    { name: "Deloitte", logo: deloitte },
    { name: "IBM", logo: ibm },
    { name: "Infosys", logo: infosys },
    { name: "Intel", logo: intel },
    { name: "Samsung", logo: samsung },
    { name: "Meta", logo: Meta },
    { name: "Microsoft", logo: microsoft },
  ];
  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="relative h-fit">
      {/* SVG Curve */}
      {/* <div className="w-full">
        <img src={curve} alt="Curve shape" className="w-full h-auto object-cover" />
      </div> */}

     
      <div className="pt-12 sm:pt-12 md:pt-16 lg:pt-16 xl:pt-16 relative z-10">
        <h2 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 ">
          Our Achievers{" "} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500">Work With</span>
        </h2>
        <div style={{ padding: '20px', textAlign: 'center', margin: '20px' }}>
          <Slider {...settings}>
            {companies.map((company, index) => (
              <div key={index} style={{ padding: '20px' }}>
                <div
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    // padding: '20px',
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                  className="w-[130px] h-[60px] small:w-[130px] small:h-[65px] sm:w-[135px] sm:h-[70px] lg:w-[150px] lg:h-[75px] xl:w-[200px] xl:h-[85px]"
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-16 h-auto sm:w-20 md:w-24 lg:w-28 xl:w-32 mx-auto"
                  // style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
        {/* <div className="flex flex-wrap justify-center">
          {companies.map((company, index) => (
            <div key={index} className="flex items-center justify-center p-2 sm:p-3 md:p-4 ">
              <img
                src={company.logo}
                alt={company.name}
                className="w-16 h-auto sm:w-20 md:w-24 lg:w-28 xl:w-32"
              />
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default CompanyLogo;
