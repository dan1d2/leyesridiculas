import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Badge,
  HStack,
  VStack,
  Flex,
  Tag,
  TagLabel,
  useColorModeValue,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { Ley } from '../types'

interface LeyCardProps {
  ley: Ley
}

const LeyCard = ({ ley }: LeyCardProps) => {
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Vigente':
        return 'red' // ¡Peligro! Sigue vigente
      case 'Derogada':
        return 'green' // Al menos esta ya no jode
      case 'Modificada':
        return 'yellow' // Parche sobre parche
      case 'En revisión':
        return 'blue' // Tal vez la arreglen... algún día
      default:
        return 'gray'
    }
  }

  // Texto irónico según categoría
  const getIronicText = (categoria: string) => {
    switch (categoria) {
      case 'Impuestos':
        return '¡Porque pagar menos es un lujo!'
      case 'Comercial':
        return 'Negocios del siglo pasado'
      case 'Laboral':
        return 'Trabajar debería dar risa'
      case 'Monetaria':
        return 'Cuando $1 = $1 (en sueños)'
      case 'Administrativa':
        return 'Burocracia vintage'
      case 'Educación':
        return 'Enseñanzas obsoletas'
      case 'Salud':
        return 'Remedios de museo'
      default:
        return 'Reliquia legislativa'
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

  return (
    <Card
      as={RouterLink}
      to={`/ley/${ley.id}`}
      bg={cardBg}
      border="1px"
      borderColor={borderColor}
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'xl',
        borderColor: 'brand.400',
      }}
      transition="all 0.2s"
      cursor="pointer"
      height="100%"
    >
      <CardHeader pb={2}>
        <Flex justify="space-between" align="start" gap={4}>
          <VStack align="start" spacing={2} flex={1}>
            <Heading size="md" color="brand.600">
              {ley.nombre}
            </Heading>
            <Text color="gray.600" fontSize="sm">
              {ley.numero} • {ley.año}
            </Text>
            <Text fontSize="xs" fontStyle="italic" color="orange.500">
              {getIronicText(ley.categoria)}
            </Text>
          </VStack>
          <Badge colorScheme={getEstadoColor(ley.estado)} fontSize="sm" px={3} py={1} borderRadius="full">
            {ley.estado}
          </Badge>
        </Flex>
      </CardHeader>

      <CardBody pt={0}>
        <VStack align="start" spacing={4}>
          <Text color="gray.700" noOfLines={3}>
            {ley.descripcion}
          </Text>

          <Box>
            <Text fontSize="sm" color="gray.600" mb={2}>
              <strong>Problema:</strong> {ley.motivoObsoleto.substring(0, 120)}...
            </Text>
          </Box>

          <Flex wrap="wrap" gap={2}>
            <Badge colorScheme={getCategoriaColor(ley.categoria)}>
              {ley.categoria}
            </Badge>
            {ley.tags.slice(0, 3).map((tag) => (
              <Tag key={tag} size="sm" colorScheme="gray" variant="subtle">
                <TagLabel>{tag}</TagLabel>
              </Tag>
            ))}
            {ley.tags.length > 3 && (
              <Tag size="sm" colorScheme="gray" variant="subtle">
                <TagLabel>+{ley.tags.length - 3}</TagLabel>
              </Tag>
            )}
          </Flex>

          <HStack spacing={4} width="100%" justify="space-between">
            <Box>
              <Text fontSize="xs" color="gray.500">
                Dólar entonces
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                ${ley.datosEconomicos.dolarOficialEntonces}
              </Text>
            </Box>
            <Box>
              <Text fontSize="xs" color="gray.500">
                Dólar hoy
              </Text>
              <Text fontSize="sm" fontWeight="medium" color="red.500">
                ${ley.datosEconomicos.dolarOficialAhora}
              </Text>
            </Box>
            <Box>
              <Text fontSize="xs" color="gray.500">
                Inflación
              </Text>
              <Text fontSize="sm" fontWeight="medium" color="orange.500">
                {ley.datosEconomicos.inflacionAcumulada.toLocaleString()}%
              </Text>
            </Box>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  )
}

export default LeyCard