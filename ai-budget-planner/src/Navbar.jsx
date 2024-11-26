import React from 'react'
import { Box, Flex, Button, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <Box bg="white" boxShadow="sm" py={4}>
      <Flex maxW="1200px" mx="auto" px={4} alignItems="center" justifyContent="space-between">
        <Heading as="h1" size="lg" color="blue.600">
          AI Budget Planner
        </Heading>
        <Flex>
          <Button as={Link} to="/" variant="ghost" mr={2}>
            Home
          </Button>
          <Button as={Link} to="/planner" variant="ghost" mr={2}>
            Plan Budget
          </Button>
          <Button as={Link} to="/results" variant="ghost">
            Results
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar