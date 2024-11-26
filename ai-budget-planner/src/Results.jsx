import React, { useEffect, useState } from 'react';
import { Box, VStack, Heading, Text, SimpleGrid, Container, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Results = () => {
  const [budgetData, setBudgetData] = useState(null);

  useEffect(() => {
    // Fetch budget results from localStorage
    const storedData = localStorage.getItem('budgetResults');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log('Parsed budget data:', parsedData); // Log data to check structure
      setBudgetData(parsedData);
    }
  }, []);

  if (!budgetData) {
    return <Box>Loading...</Box>;
  }

  const {
   // You might need to add income field from localStorage or modify if not stored
  needs: newNeeds = 0,
  wants: newWants = 0,
  savings: newSavings = 0,
  equity_investment: equityInvestment = 0,
  other_investment: otherInvestments = 0,
  education_fund: educationSavings = 0,
  retirement_fund: investment = 0 // If 'investment' refers to retirement fund
} = budgetData;

const income = budgetData.income || newNeeds + newWants + newSavings + investment;
const totalInvestment =  equityInvestment + otherInvestments + educationSavings + investment
  const pieData = {
    labels: ['Needs', 'Wants', 'Savings', 'Investment'],
    datasets: [
      {
        data: [newNeeds, newWants, newSavings, investment],
        backgroundColor: ['#4299E1', '#48BB78', '#ECC94B', '#ED64A6'],
        hoverBackgroundColor: ['#3182CE', '#38A169', '#D69E2E', '#D53F8C'],
      },
    ],
  };

  const barData = {
    labels: ['Income', 'Expenses', 'Savings', 'Investment'],
    datasets: [
      {
        label: 'Amount (₹)',
        data: [income, newNeeds + newWants, newSavings, equityInvestment + otherInvestments + educationSavings + investment],
        backgroundColor: ['#4299E1', '#48BB78', '#ECC94B', '#ED64A6'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Box bg="gray.50" minH="calc(100vh - 72px)">
      <Container maxW="1200px" py={16}>
        <VStack spacing={12} align="stretch">
          <Heading as="h1" size="xl" textAlign="center" color="blue.600">
            Your Budget Analysis
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <Box bg="white" p={8} borderRadius="lg" boxShadow="md">
              <Heading size="md" mb={6}>Budget Breakdown</Heading>
              <Box height="300px">
                <Pie data={pieData} options={chartOptions} />
              </Box>
            </Box>
            <Box bg="white" p={8} borderRadius="lg" boxShadow="md">
              <Heading size="md" mb={6}>Income vs Expenses</Heading>
              <Box height="300px">
                <Bar data={barData} options={chartOptions} />
              </Box>
            </Box>
          </SimpleGrid>
          <Box bg="white" p={8} borderRadius="lg" boxShadow="md">
            <Heading size="md" mb={6}>Budget Details</Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Category</Th>
                  <Th isNumeric>Amount (₹)</Th>
                  <Th isNumeric>Percentage</Th>
                </Tr>
              </Thead>
              <Tbody>
                <BudgetRow label="Income" value={income} total={income} />
                <BudgetRow label="Needs" value={newNeeds} total={income} />
                <BudgetRow label="Wants" value={newWants} total={income} />
                <BudgetRow label="Savings" value={newSavings} total={income} />
                <BudgetRow label="Investment" value={investment} total={income} />
              </Tbody>
            </Table>
          </Box>
          <Box bg="white" p={8} borderRadius="lg" boxShadow="md">
            <Heading size="md" mb={6}>Investment Allocation</Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Category</Th>
                  <Th isNumeric>Amount (₹)</Th>
                  <Th isNumeric>Percentage</Th>
                </Tr>
              </Thead>
              <Tbody>
                <BudgetRow label="Equity" value={equityInvestment} total={investment} />
                <BudgetRow label="Other Investments" value={otherInvestments} total={investment} />
                {educationSavings > 0 && (
                  <BudgetRow label="Education Savings" value={educationSavings} total={investment} />
                )}
              </Tbody>
            </Table>
          </Box>
          <Box bg="white" p={8} borderRadius="lg" boxShadow="md">
            <Heading size="md" mb={6}>Recommendations</Heading>
            <VStack align="start" spacing={2}>
              <Text>• Your needs are {((newNeeds / income) * 100).toFixed(1)}% of your income. Aim to keep this below 50%.</Text>
              <Text>• You're saving {((newSavings / income) * 100).toFixed(1)}% of your income. Try to increase this to at least 20%.</Text>
              <Text>• Your wants are {((newWants / income) * 100).toFixed(1)}% of your income. Consider reducing this if it's above 30%.</Text>
              <Text>• You're investing {((totalInvestment / income) * 100).toFixed(1)}% of your income. Great job! Keep increasing this for long-term wealth.</Text>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

const BudgetRow = ({ label, value, total }) => {
  const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0; // Prevent division by zero
  return (
    <Tr>
      <Td>{label}</Td>
      <Td isNumeric>₹{value.toFixed(2)}</Td>
      <Td isNumeric>{percentage}%</Td>
    </Tr>
  );
};

export default Results;
