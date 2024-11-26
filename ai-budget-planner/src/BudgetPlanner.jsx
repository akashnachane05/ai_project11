import React, { useEffect, useState } from 'react';
import { Box, VStack, Heading, FormControl, FormLabel, Input, Button, useToast, Container, Radio, RadioGroup } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const BudgetPlanner = () => {
  const [formData, setFormData] = useState({
    income: '', 
    age: '', 
    current_needs: '', 
    current_wants: '', 
    current_savings: '', 
    keepNeeds: 'yes',
    hasChildren: 'no',
    childrenCount: '',
    educationSavings: '',
  });
  
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRadioChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convert necessary fields to numbers
    const formattedData = {
      ...formData,
      income: parseFloat(formData.income),
      age: parseInt(formData.age, 10),
      current_needs: parseFloat(formData.current_needs),
      current_wants: parseFloat(formData.current_wants),
      current_savings: parseFloat(formData.current_savings),
      childrenCount: formData.hasChildren === 'yes' ? parseInt(formData.childrenCount, 10) : 0,
      educationSavings: formData.hasChildren === 'yes' ? parseFloat(formData.educationSavings) : 0,
    };

    try {
      const response = await fetch('http://localhost:5000/budget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      localStorage.setItem('budgetResults', JSON.stringify(data)); // Store results in localStorage
      toast({
        title: "Budget plan created.",
        description: "We've created your budget plan based on the provided information.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate('/results'); // Navigate to results page
    } catch (error) {
      console.error('Error submitting budget data:', error);
      toast({
        title: "An error occurred.",
        description: "Unable to create budget plan.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="gray.50" minH="calc(100vh - 72px)">
      <Container maxW="600px" py={16}>
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="xl" textAlign="center" color="blue.600">
            Create Your Budget Plan
          </Heading>
          <Box bg="white" p={8} borderRadius="lg" boxShadow="md">
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Monthly Income (₹)</FormLabel>
                  <Input
                    type="number"
                    name="income"
                    value={formData.income}
                    onChange={handleChange}
                    placeholder="Enter your monthly income"
                  />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel>Age</FormLabel>
                  <Input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter your age"
                  />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel>Current Needs Amount (₹)</FormLabel>
                  <Input
                    type="number"
                    name="current_needs"
                    value={formData.current_needs}
                    onChange={handleChange}
                    placeholder="Enter your current monthly needs"
                  />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel>Current Wants Amount (₹)</FormLabel>
                  <Input
                    type="number"
                    name="current_wants"
                    value={formData.current_wants}
                    onChange={handleChange}
                    placeholder="Enter your current monthly wants"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Current Savings Amount (₹)</FormLabel>
                  <Input
                    type="number"
                    name="current_savings"
                    value={formData.current_savings}
                    onChange={handleChange}
                    placeholder="Enter your current monthly savings"
                  />
                </FormControl>
                
                <FormControl as="fieldset">
                  <FormLabel as="legend">Keep current needs amount?</FormLabel>
                  <RadioGroup
                    onChange={(value) => handleRadioChange('keepNeeds', value)}
                    value={formData.keepNeeds}
                  >
                    <VStack align="start">
                      <Radio value="yes">Yes</Radio>
                      <Radio value="no">No, optimize it</Radio>
                    </VStack>
                  </RadioGroup>
                </FormControl>
                
                <FormControl as="fieldset">
                  <FormLabel as="legend">Do you have children?</FormLabel>
                  <RadioGroup
                    onChange={(value) => handleRadioChange('hasChildren', value)}
                    value={formData.hasChildren}
                  >
                    <VStack align="start">
                      <Radio value="yes">Yes</Radio>
                      <Radio value="no">No</Radio>
                    </VStack>
                  </RadioGroup>
                </FormControl>
                
                {formData.hasChildren === 'yes' && (
                  <>
                    <FormControl>
                      <FormLabel>How many children do you have?</FormLabel>
                      <Input
                        type="number"
                        name="childrenCount"
                        value={formData.childrenCount}
                        onChange={handleChange}
                        placeholder="Enter number of children"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Monthly Education Savings (₹)</FormLabel>
                      <Input
                        type="number"
                        name="educationSavings"
                        value={formData.educationSavings}
                        onChange={handleChange}
                        placeholder="Enter monthly education savings"
                      />
                    </FormControl>
                  </>
                )}

                <Button type="submit" colorScheme="blue" size="lg" width="full">
                  Create Budget Plan
                </Button>
              </VStack>
            </form>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default BudgetPlanner;
