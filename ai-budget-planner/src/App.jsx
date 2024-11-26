import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChakraProvider, Box } from '@chakra-ui/react'
import Navbar from './Navbar'
import Home from './Home'
import BudgetPlanner from './BudgetPlanner'
import Results from './Results'
import theme from './theme'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box minHeight="100vh" bg="gray.50">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Home />
                </motion.div>
              } />
              <Route path="/planner" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <BudgetPlanner />
                </motion.div>
              } />
              <Route path="/results" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Results />
                </motion.div>
              } />
            </Routes>
          </AnimatePresence>
        </Box>
      </Router>
    </ChakraProvider>
  )
}

export default App