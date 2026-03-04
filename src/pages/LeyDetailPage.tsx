import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Badge,
  Card,
  CardBody,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider,
  Button,
  Tag,
  TagLabel,
  useColorModeValue,
  Link,
  Flex,
} from '@chakra-ui/react'
import { ArrowBackIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { leyes } from '../data/leyes'
import { Ley } from '../types'

const LeyDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const ley = leyes.find(l => l.id === id)
  
  if (!ley) {
    return (
      <Container maxW="container.xl" py={10}>
        <VStack spacing={6} align="center">
          <Heading color="red.500">Ley no encontrada</Heading>
          <Text>La ley que buscas no existe en nuestra base de datos.</Text>
          <Button
            leftIcon={<ArrowBackIcon />}
            colorScheme="brand"
            onClick={() => navigate('/')}
          >
            Volver al inicio
          </Button>
        </VStack>
      </Container>
    )
  }

  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const cardBg = useColorModeValue('gray.50', 'gray.900')

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Vigente': return 'red'
      case 'Derogada': return 'green'
      case 'Modificada': return 'yellow'
      case 'En revisión': return 'blue'
      default: return 'gray'
    }
  }

  const getCategoriaColor = (categoria: string) => {
    const colors: Record<string, string> = {
      'Impuestos': 'purple',
      'Monetaria': 'blue',
      'Comercial': 'green',
      'Laboral': 'orange',
      'Penal': 'red',
      'Administrativa': 'teal',
      'Salud': 'pink',
      'Educación': 'cyan',
      'Transporte': 'yellow',
      'Otros': 'gray'
    }
    return colors[categoria] || 'gray'
  }

  const calcularDevaluacion = (ley: Ley) => {
    const entonces = ley.datosEconomicos.dolarOficialEntonces
    const ahora = ley.datosEconomicos.dolarOficialAhora
    return ((ahora - entonces) / entonces * 100).toFixed(0)
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box>
          <Button
            leftIcon={<ArrowBackIcon />}
            variant="ghost"
            colorScheme="brand"
            mb={6}
            onClick={() => navigate('/')}
          >
            Volver a todas las leyes
          </Button>
          
          <VStack align="start" spacing={4}>
            <HStack spacing={4} wrap="wrap">
              <Badge colorScheme={getEstadoColor(ley.estado)} fontSize="md" px={3} py={1} borderRadius="full">
                {ley.estado}
              </Badge>
              <Badge colorScheme={getCategoriaColor(ley.categoria)} fontSize="md" px={3} py={1} borderRadius="full">
                {ley.categoria}
              </Badge>
              <Badge colorScheme="gray" fontSize="md" px={3} py={1} borderRadius="full">
                {ley.año}
              </Badge>
            </HStack>
            
            <Heading size="2xl" color="brand.600">
              {ley.nombre}
            </Heading>
            
            <Text fontSize="xl" color="gray.600">
              {ley.numero}
            </Text>
            
            <Text fontSize="lg" color="gray.700" maxW="3xl">
              {ley.descripcion}
            </Text>
          </VStack>
        </Box>

        {/* Stats Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          <Card bg={cardBg} border="1px" borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel>Dólar Oficial (Entonces)</StatLabel>
                <StatNumber>${ley.datosEconomicos.dolarOficialEntonces}</StatNumber>
                <StatHelpText>Año {ley.año}</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          
          <Card bg={cardBg} border="1px" borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel>Dólar Oficial (Hoy)</StatLabel>
                <StatNumber color="red.500">${ley.datosEconomicos.dolarOficialAhora}</StatNumber>
                <StatHelpText>Marzo 2026</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          
          <Card bg={cardBg} border="1px" borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel>Devaluación</StatLabel>
                <StatNumber color="orange.500">{calcularDevaluacion(ley)}%</StatNumber>
                <StatHelpText>Desde {ley.año}</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          
          <Card bg={cardBg} border="1px" borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel>Inflación Acumulada</StatLabel>
                <StatNumber color="purple.500">{ley.datosEconomicos.inflacionAcumulada.toLocaleString()}%</StatNumber>
                <StatHelpText>Desde {ley.año}</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Contenido Principal */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
          {/* Columna Izquierda */}
          <VStack spacing={8} align="stretch">
            <Card bg={bg} border="1px" borderColor={borderColor}>
              <CardBody>
                <VStack align="start" spacing={4}>
                  <Heading size="md" color="brand.600">
                    ¿Por qué es ridícula?
                  </Heading>
                  <Text color="gray.700" lineHeight="tall">
                    {ley.motivoObsoleto}
                  </Text>
                </VStack>
              </CardBody>
            </Card>
            
            <Card bg={bg} border="1px" borderColor={borderColor}>
              <CardBody>
                <VStack align="start" spacing={4}>
                  <Heading size="md" color="brand.600">
                    Contexto Histórico
                  </Heading>
                  <Text color="gray.700" lineHeight="tall">
                    {ley.contextoHistorico}
                  </Text>
                </VStack>
              </CardBody>
            </Card>
          </VStack>

          {/* Columna Derecha */}
          <VStack spacing={8} align="stretch">
            <Card bg={bg} border="1px" borderColor={borderColor}>
              <CardBody>
                <VStack align="start" spacing={4}>
                  <Heading size="md" color="brand.600">
                    Impacto Actual
                  </Heading>
                  <Text color="gray.700" lineHeight="tall">
                    {ley.impactoActual}
                  </Text>
                </VStack>
              </CardBody>
            </Card>
            
            <Card bg={bg} border="1px" borderColor={borderColor}>
              <CardBody>
                <VStack align="start" spacing={4}>
                  <Heading size="md" color="brand.600">
                    Ejemplo Concreto
                  </Heading>
                  <Text color="gray.700" lineHeight="tall" fontStyle="italic">
                    "{ley.datosEconomicos.ejemploConcreto}"
                  </Text>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </SimpleGrid>

        {/* Tags y Fuente */}
        <Card bg={bg} border="1px" borderColor={borderColor}>
          <CardBody>
            <VStack align="start" spacing={6}>
              <Box>
                <Heading size="md" color="brand.600" mb={3}>
                  Tags
                </Heading>
                <Flex wrap="wrap" gap={2}>
                  {ley.tags.map(tag => (
                    <Tag key={tag} size="md" colorScheme="brand" variant="subtle">
                      <TagLabel>{tag}</TagLabel>
                    </Tag>
                  ))}
                </Flex>
              </Box>
              
              <Divider />
              
              <Box>
                <Heading size="md" color="brand.600" mb={3}>
                  Fuente
                </Heading>
                <VStack align="start" spacing={2}>
                  <Text color="gray.700">{ley.fuente}</Text>
                  {ley.enlace && (
                    <Link
                      href={ley.enlace}
                      isExternal
                      color="brand.500"
                      fontWeight="medium"
                    >
                      Ver fuente oficial <ExternalLinkIcon mx={1} />
                    </Link>
                  )}
                </VStack>
              </Box>
            </VStack>
          </CardBody>
        </Card>

        {/* Comparación Dólar */}
        <Card bg={bg} border="1px" borderColor={borderColor}>
          <CardBody>
            <VStack align="start" spacing={4}>
              <Heading size="md" color="brand.600">
                Comparación Dólar Blue
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} width="100%">
                <Box>
                  <Text fontSize="sm" color="gray.600" mb={2}>
                    Dólar Blue ({ley.año})
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                    ${ley.datosEconomicos.dolarBlueEntonces}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Paralelo / Informal
                  </Text>
                </Box>
                
                <Box>
                  <Text fontSize="sm" color="gray.600" mb={2}>
                    Dólar Blue (Hoy)
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" color="red.500">
                    ${ley.datosEconomicos.dolarBlueAhora}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Marzo 2026
                  </Text>
                </Box>
              </SimpleGrid>
              
              <Box width="100%" mt={4}>
                <Text fontSize="sm" color="gray.600">
                  <strong>Nota:</strong> La brecha cambiaria (diferencia entre dólar oficial y blue) 
                  era del {((ley.datosEconomicos.dolarBlueEntonces - ley.datosEconomicos.dolarOficialEntonces) / ley.datosEconomicos.dolarOficialEntonces * 100).toFixed(1)}% en {ley.año} 
                  y es del {((ley.datosEconomicos.dolarBlueAhora - ley.datosEconomicos.dolarOficialAhora) / ley.datosEconomicos.dolarOficialAhora * 100).toFixed(1)}% hoy.
                </Text>
              </Box>
            </VStack>
          </CardBody>
        </Card>

        {/* Acciones */}
        <HStack spacing={4} justify="center" pt={4}>
          <Button
            colorScheme="brand"
            onClick={() => navigate('/')}
          >
            Ver todas las leyes
          </Button>
          
          <Button
            variant="outline"
            colorScheme="brand"
            onClick={() => {
              // Compartir funcionalidad
              if (navigator.share) {
                navigator.share({
                  title: `Ley ${ley.numero}: ${ley.nombre}`,
                  text: `Mira esta ley obsoleta de Argentina: ${ley.nombre}. ${ley.motivoObsoleto.substring(0, 100)}...`,
                  url: window.location.href,
                })
              }
            }}
          >
            Compartir
          </Button>
        </HStack>
      </VStack>
    </Container>
  )
}

export default LeyDetailPage