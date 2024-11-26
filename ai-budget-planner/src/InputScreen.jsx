import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import BudgetForm from './BudgetForm'
import { useBudgetContext } from './BudgetContext'

export default function InputScreen() {
  const navigate = useNavigate()
  const { setBudgetData } = useBudgetContext()

  const handleSubmit = (data) => {
    setBudgetData(data)
    navigate('/output')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold text-center mb-8">Enter Your Budget Details</h1>
      <div className="bg-white shadow-xl rounded-lg p-8">
        <BudgetForm onSubmit={handleSubmit} />
      </div>
    </motion.div>
  )
}