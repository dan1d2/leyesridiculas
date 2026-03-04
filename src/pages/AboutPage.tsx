import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Card,
  CardBody,
  SimpleGrid,
  Link,
  List,
  ListItem,
  ListIcon,
  Divider,
  useColorModeValue,
  Badge,
  Image,
} from '@chakra-ui/react'
import { CheckCircleIcon, ExternalLinkIcon } from '@chakra-ui/icons'

const AboutPage = () => {
  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const cardBg = useColorModeValue('gray.50', 'gray.900')

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={12} align="stretch">
        {/* Hero Section */}
        <VStack spacing={6} align="center" textAlign="center">
          <Heading size="2xl" color="brand.600">
            Leyes Obsoletas de Argentina
          </Heading>
          <Text fontSize="xl" color="gray.600" maxW="3xl">
            Un proyecto para documentar y visualizar las leyes obsoletas que siguen vigentes en Argentina, 
            creadas en contextos económicos radicalmente diferentes a los actuales.
          </Text>
          <HStack spacing={4}>
            <Badge colorScheme="red" fontSize="md" px={3} py={1} borderRadius="full">
              Proyecto Educativo
            </Badge>
            <Badge colorScheme="blue" fontSize="md" px={3} py={1} borderRadius="full">
              Código Abierto
            </Badge>
            <Badge colorScheme="green" fontSize="md" px={3} py={1} borderRadius="full">
              Actualizado 2026
            </Badge>
          </HStack>
        </VStack>

        {/* Problema */}
        <Card bg={bg} border="1px" borderColor={borderColor}>
          <CardBody>
            <VStack spacing={6} align="start">
              <Heading size="lg" color="brand.600">
                ¿Por qué existen leyes ridículas?
              </Heading>
              
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                <Box>
                  <Heading size="md" color="red.500" mb={4}>
                    El Problema
                  </Heading>
                  <Text color="gray.700" lineHeight="tall">
                    Argentina tiene una historia de alta inflación y devaluación monetaria. 
                    Muchas leyes fueron creadas en contextos económicos donde el peso argentino 
                    valía 10, 100 o 1000 veces más que hoy.
                  </Text>
                  <Text color="gray.700" lineHeight="tall" mt={4}>
                    Estas leyes establecen montos en pesos, límites, multas y beneficios que 
                    nunca fueron actualizados para reflejar la realidad económica actual, 
                    volviéndose absurdas, inaplicables o contraproducentes.
                  </Text>
                </Box>
                
                <Box>
                  <Heading size="md" color="green.500" mb={4}>
                    Nuestra Solución
                  </Heading>
                  <Text color="gray.700" lineHeight="tall">
                    Documentamos estas leyes obsoletas y mostramos, con datos económicos reales, 
                    por qué ya no tienen sentido en el contexto actual.
                  </Text>
                  <List spacing={3} mt={4}>
                    <ListItem>
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      Comparación de valores en dólares históricos vs actuales
                    </ListItem>
                    <ListItem>
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      Cálculo de inflación acumulada desde la creación de cada ley
                    </ListItem>
                    <ListItem>
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      Ejemplos concretos de lo absurdo que resulta aplicar estas leyes hoy
                    </ListItem>
                  </List>
                </Box>
              </SimpleGrid>
            </VStack>
          </CardBody>
        </Card>

        {/* Métodología */}
        <Card bg={bg} border="1px" borderColor={borderColor}>
          <CardBody>
            <VStack spacing={6} align="start">
              <Heading size="lg" color="brand.600">
                Nuestra Metodología
              </Heading>
              
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                <Box>
                  <Heading size="md" color="blue.500" mb={3}>
                    1. Investigación
                  </Heading>
                  <Text color="gray.700">
                    Identificamos leyes con montos fijos en pesos que no se actualizan automáticamente 
                    con la inflación o que fueron creadas en contextos económicos muy diferentes.
                  </Text>
                </Box>
                
                <Box>
                  <Heading size="md" color="blue.500" mb={3}>
                    2. Análisis Económico
                  </Heading>
                  <Text color="gray.700">
                    Calculamos la devaluación del peso y la inflación acumulada desde la creación 
                    de cada ley hasta la actualidad, usando datos del Banco Central y el INDEC.
                  </Text>
                </Box>
                
                <Box>
                  <Heading size="md" color="blue.500" mb={3}>
                    3. Visualización
                  </Heading>
                  <Text color="gray.700">
                    Presentamos la información de manera clara y accesible, con gráficos, 
                    comparaciones y ejemplos concretos que cualquiera pueda entender.
                  </Text>
                </Box>
              </SimpleGrid>
            </VStack>
          </CardBody>
        </Card>

        {/* Estadísticas */}
        <Card bg={cardBg} border="1px" borderColor={borderColor}>
          <CardBody>
            <VStack spacing={6} align="center">
              <Heading size="lg" color="brand.600">
                En Números
              </Heading>
              
              <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8} width="100%">
                <VStack>
                  <Heading size="2xl" color="red.500">
                    30+
                  </Heading>
                  <Text textAlign="center" color="gray.600">
                    Leyes Documentadas
                  </Text>
                </VStack>
                
                <VStack>
                  <Heading size="2xl" color="orange.500">
                    40,000%
                  </Heading>
                  <Text textAlign="center" color="gray.600">
                    Inflación Promedio
                  </Text>
                </VStack>
                
                <VStack>
                  <Heading size="2xl" color="blue.500">
                    1990-2026
                  </Heading>
                  <Text textAlign="center" color="gray.600">
                    Rango Temporal
                  </Text>
                </VStack>
                
                <VStack>
                  <Heading size="2xl" color="green.500">
                    10
                  </Heading>
                  <Text textAlign="center" color="gray.600">
                    Categorías
                  </Text>
                </VStack>
              </SimpleGrid>
            </VStack>
          </CardBody>
        </Card>

        {/* Fuentes y Créditos */}
        <Card bg={bg} border="1px" borderColor={borderColor}>
          <CardBody>
            <VStack spacing={6} align="start">
              <Heading size="lg" color="brand.600">
                Fuentes y Créditos
              </Heading>
              
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} width="100%">
                <Box>
                  <Heading size="md" mb={3}>
                    Fuentes de Datos
                  </Heading>
                  <List spacing={2}>
                    <ListItem>
                      <Link href="https://www.bcra.gob.ar/" isExternal color="brand.500">
                        Banco Central de la República Argentina <ExternalLinkIcon mx={1} />
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link href="https://www.indec.gob.ar/" isExternal color="brand.500">
                        Instituto Nacional de Estadística y Censos (INDEC) <ExternalLinkIcon mx={1} />
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link href="https://www.argentina.gob.ar/normativa" isExternal color="brand.500">
                        Sistema Argentino de Información Jurídica <ExternalLinkIcon mx={1} />
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link href="https://www.afip.gob.ar/" isExternal color="brand.500">
                        Administración Federal de Ingresos Públicos (AFIP) <ExternalLinkIcon mx={1} />
                      </Link>
                    </ListItem>
                  </List>
                </Box>
                
                <Box>
                  <Heading size="md" mb={3}>
                    Tecnología
                  </Heading>
                  <Text color="gray.700" mb={3}>
                    Este proyecto fue construido con:
                  </Text>
                  <List spacing={2}>
                    <ListItem>React + TypeScript</ListItem>
                    <ListItem>Chakra UI (Sistema de diseño)</ListItem>
                    <ListItem>Vite (Build tool)</ListItem>
                    <ListItem>React Router (Navegación)</ListItem>
                    <ListItem>Vercel (Hosting)</ListItem>
                  </List>
                </Box>
              </SimpleGrid>
              
              <Divider />
              
              <Box width="100%">
                <Heading size="md" mb={3}>
                  Propósito Educativo
                </Heading>
                <Text color="gray.700">
                  Este proyecto tiene fines exclusivamente educativos y de concientización. 
                  No somos una fuente legal oficial y no proporcionamos asesoramiento jurídico. 
                  La información presentada está destinada a ilustrar un problema sistémico 
                  en la legislación argentina: la falta de actualización automática de montos 
                  en contextos de alta inflación.
                </Text>
                <Text color="gray.700" mt={4} fontStyle="italic">
                  "Una ley obsoleta no es solo una curiosidad histórica; es una injusticia 
                  que sigue afectando a las personas en el presente."
                </Text>
              </Box>
            </VStack>
          </CardBody>
        </Card>

        {/* CTA Final */}
        <Card bg="brand.50" border="1px" borderColor="brand.200">
          <CardBody>
            <VStack spacing={6} align="center" textAlign="center">
              <Heading size="lg" color="brand.700">
                ¿Encontraste una ley ridícula?
              </Heading>
              <Text color="brand.800" maxW="2xl">
                Si conoces alguna ley argentina con montos en pesos que no se hayan actualizado 
                con la inflación, o que sea absurda en el contexto económico actual, 
                ¡contáctanos! Juntos podemos documentar más casos.
              </Text>
              <Text color="brand.800" fontWeight="medium">
                Este es un proyecto en constante crecimiento.
              </Text>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  )
}

export default AboutPage