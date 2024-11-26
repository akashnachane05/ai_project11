import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaChartPie, FaClipboardList } from 'react-icons/fa';

const navItems = [
  { path: '/', label: 'Home', icon: FaHome },
  { path: '/questionnaire', label: 'Plan Budget', icon: FaClipboardList },
  { path: '/output', label: 'View Results', icon: FaChartPie },
];

const layoutVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
};

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Layout({ children }) {
  return (
    <motion.div 
      className="min-h-screen bg-gray-100 flex flex-col"
      variants={layoutVariants}
      initial="initial"
      animate="animate"
    >
      <header className="bg-white shadow-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-blue-600">AI Budget Planner</span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navItems.map((item) => (
                  <NavLink key={item.path} to={item.path} Icon={item.icon}>
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </header>
      <motion.main 
        className="flex-grow"
        variants={contentVariants}
      >
        {children}
      </motion.main>
      <Footer />
    </motion.div>
  );
}

function NavLink({ to, children, Icon }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
        isActive
          ? 'border-blue-500 text-blue-600'
          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
      }`}
    >
      <Icon className="mr-2" />
      {children}
    </Link>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} AI Budget Planner. All rights reserved.
        </p>
      </div>
    </footer>
  );
}