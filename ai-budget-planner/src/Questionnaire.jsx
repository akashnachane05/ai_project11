import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChartLine, FaMoneyBillWave, FaPiggyBank } from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      duration: 0.5, 
      when: "beforeChildren", 
      staggerChildren: 0.2 
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

export default function Home() {
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 
        className="text-5xl md:text-6xl font-bold text-white mb-8 text-center"
        variants={itemVariants}
      >
        AI Budget Planner
      </motion.h1>
      <motion.p 
        className="text-xl text-white mb-12 text-center max-w-2xl"
        variants={itemVariants}
      >
        Take control of your finances with our intelligent budgeting tool
      </motion.p>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        variants={itemVariants}
      >
        <FeatureCard 
          icon={<FaChartLine className="text-4xl text-blue-500" />}
          title="Smart Analysis"
          description="AI-powered insights to optimize your budget"
        />
        <FeatureCard 
          icon={<FaMoneyBillWave className="text-4xl text-green-500" />}
          title="Expense Tracking"
          description="Easily categorize and monitor your spending"
        />
        <FeatureCard 
          icon={<FaPiggyBank className="text-4xl text-yellow-500" />}
          title="Savings Goals"
          description="Set and achieve your financial objectives"
        />
      </motion.div>
      <motion.div className="space-x-4" variants={itemVariants}>
        <Link 
          to="/questionnaire" 
          className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300"
        >
          Start Budgeting
        </Link>
        <Link 
          to="/output" 
          className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
        >
          View Results
        </Link>
      </motion.div>
    </motion.div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-6 text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-blue-100">{description}</p>
    </div>
  );
}