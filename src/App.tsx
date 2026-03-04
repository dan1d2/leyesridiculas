import { Box, Container, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LeyDetailPage from './pages/LeyDetailPage'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Container maxW="container.xl" py={8}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ley/:id" element={<LeyDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Container>
      <Box as="footer" bg="white" borderTop="1px" borderColor="gray.200" py={6} mt={12}>
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center" direction={{ base: 'column', md: 'row' }} gap={4}>
            <VStack align={{ base: 'center', md: 'start' }} spacing={2}>
              <Heading size="md" color="brand.600">
                LeyesRidículas.com.ar
              </Heading>
              <Text color="gray.600" fontSize="sm">
                Exponiendo las leyes obsoletas de Argentina
              </Text>
            </VStack>
            <Text color="gray.500" fontSize="sm">
              © {new Date().getFullYear()} - Un proyecto educativo
            </Text>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}

export default App