import React from 'react'
import { Box, Heading, Text, Button, VStack, Container, SimpleGrid, Icon } from '@chakra-ui/react'
import { FaChartPie, FaMoneyBillWave, FaPiggyBank } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const FeatureCard = ({ icon, title, description }) => (
  <VStack
    bg="white"
    p={6}
    borderRadius="lg"
    boxShadow="md"
    align="start"
    spacing={4}
  >
    <Icon as={icon} boxSize={10} color="blue.500" />
    <Heading size="md">{title}</Heading>
    <Text color="gray.600">{description}</Text>
  </VStack>
)

const Home = () => {
  return (
    <Box bg="gray.50" minH="calc(100vh - 72px)">
      <Container maxW="1200px" py={16}>
        <VStack spacing={12} align="center" textAlign="center">
          <Heading as="h1" size="2xl" color="blue.600">
            Welcome to AI Budget Planner
          </Heading>
          <Text fontSize="xl" maxW="800px" color="gray.600">
            Take control of your finances with our intelligent budgeting tool. Harness the power of AI to optimize your spending and achieve your financial goals.
          </Text>
          <Button
            as={Link}
            to="/planner"
            colorScheme="blue"
            size="lg"
            px={8}
            fontWeight="bold"
          >
            Start Planning
          </Button>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mt={20}>
          <FeatureCard
            icon={FaChartPie}
            title="Smart Analysis"
            description="Our AI analyzes your spending patterns to provide personalized insights and recommendations."
          />
          <FeatureCard
            icon={FaMoneyBillWave}
            title="Expense Tracking"
            description="Easily categorize and monitor your expenses to identify areas for improvement."
          />
          <FeatureCard
            icon={FaPiggyBank}
            title="Savings Goals"
            description="Set and track your savings goals with our intelligent goal-setting feature."
          />
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default Home