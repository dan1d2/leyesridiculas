import { Box, Container, Flex, Heading, HStack, Button, useColorModeValue } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { SearchIcon } from '@chakra-ui/icons'

const Navbar = () => {
  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box as="nav" bg={bg} borderBottom="1px" borderColor={borderColor} py={4} position="sticky" top={0} zIndex={10}>
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <HStack spacing={8}>
            <RouterLink to="/">
              <Heading size="lg" color="brand.600">
                LeyesRidículas
              </Heading>
              <Box fontSize="sm" color="gray.600" mt={-1}>
                .com.ar
              </Box>
            </RouterLink>
            
            <HStack spacing={6} display={{ base: 'none', md: 'flex' }}>
              <RouterLink to="/">
                <Button variant="ghost" colorScheme="brand">
                  Inicio
                </Button>
              </RouterLink>
              <RouterLink to="/about">
                <Button variant="ghost" colorScheme="brand">
                  Acerca de
                </Button>
              </RouterLink>
            </HStack>
          </HStack>

          <HStack spacing={4}>
            <Button
              leftIcon={<SearchIcon />}
              colorScheme="brand"
              variant="outline"
              size="sm"
            >
              Buscar
            </Button>
            <Button
              colorScheme="brand"
              size="sm"
              as="a"
              href="https://github.com/dan1d2/leyesridiculas"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar