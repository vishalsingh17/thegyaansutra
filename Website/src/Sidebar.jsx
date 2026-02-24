import React, { useState, useEffect } from "react";
import axios from "axios";
import { Sidebar, SidebarBody, SidebarLink } from "./components/ui/sidebar";
import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "./lib/utils";
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ScreenSearchDesktopOutlinedIcon from '@mui/icons-material/ScreenSearchDesktopOutlined';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import logo from "./assets/logo.json";
import Lottie from 'lottie-react';


export default function SidebarDemo() {
  const [open, setOpen] = useState(false);

  axios.defaults.withCredentials = true;
  axios.defaults.headers.common['X-CSRFToken'] = getCookie('csrftoken');

  // Function to get a cookie value by name
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  useEffect(() => {
    // Make the axios POST request
    axios.post("/api/cookiecheck/", null, {
      withCredentials: true,
    })
      .then(response => {
        if (response.status === 204) {
          window.location.href = "/Logout";
        }
      })
      .catch(error => {
        window.location.href = "/Logout"; // Redirect to logout on error
      })
  }, []);

  useEffect(() => {
    const Tawk = () => {
      const Tawk_API = window.Tawk_API || {};
      const Tawk_LoadStart = new Date();

      const script = document.createElement("script");
      script.async = true;
      script.src = "https://embed.tawk.to/6777d3d049e2fd8dfe0202d0/1igm16q5m";
      script.charset = "UTF-8";
      script.setAttribute("crossorigin", "*");

      const firstScript = document.getElementsByTagName("script")[0];
      firstScript.parentNode.insertBefore(script, firstScript);

      return () => {
        // Cleanup if necessary (e.g., remove global variables or script)
        script.remove();
        delete window.Tawk_API;
      };
    };
    Tawk();
  }, []);

  const links = [
    {
      label: "Enrolled Courses",
      href: "/dashboard/enrolledcourses",
      icon: (
        <MenuBookOutlinedIcon className="text-neutral-700 dark:text-neutral-200 h-7 w-7 flex-shrink-0" />
      ),
    },
    {
      label: "Explore Courses",
      href: "/dashboard/explorecourses",
      icon: (
        <ScreenSearchDesktopOutlinedIcon className="text-neutral-700 dark:text-neutral-200 h-7 w-7 flex-shrink-0" />
      ),
    },
  ];


  return (
    <div
      className={cn(
        " flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden h-full ",
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-end gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className="mt-4">
          <SidebarLink
              link={{
                label: "Support",
                href: "/dashboard/support",
                icon: (
                  <SupportAgentIcon className="text-neutral-700 dark:text-neutral-200 h-7 w-7 flex-shrink-0" />
                ),
              }}
            />
            <SidebarLink
              link={{
                label: "Profile",
                href: "/dashboard/profile",
                icon: (
                  <GroupOutlinedIcon className="text-neutral-700 dark:text-neutral-200 h-7 w-7 flex-shrink-0" />
                ),
              }}
            />
            <SidebarLink
              link={{
                label: "Logout",
                href: "/Logout",
                icon: (
                  <LogoutOutlinedIcon className="text-neutral-700 dark:text-neutral-200 h-7 w-7 flex-shrink-0" />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Render the current child route */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export const Logo = () => (
  <Link to="/" className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
    <div className="lottie-container" style={{ transform: 'scale(1.5)', transformOrigin: 'center' }}>
      <Lottie
        animationData={logo}
        loop={true}
        autoplay={true}
        style={{ height: '30px', width: '40px' }}
      />
    </div>
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-medium text-black dark:text-white whitespace-pre"
    >
      The Gyaan Sutra
    </motion.span>
  </Link>
);

export const LogoIcon = () => (
  <Link to="/" className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">

    {/* <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" /> */}
    <div className="lottie-container" style={{ transform: 'scale(1.5)', transformOrigin: 'center' }}>
      <Lottie
        animationData={logo}
        loop={true}
        autoplay={true}
        style={{ height: '20ox', width: '26px' }}
      />
    </div>
  </Link>
);
