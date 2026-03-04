import { useState, useMemo } from 'react'
import {
  Box,
  Grid,
  Heading,
  Text,
  VStack,
  HStack,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Badge,
  Flex,
  SimpleGrid,
  useColorModeValue,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react'
import { SearchIcon, SettingsIcon } from '@chakra-ui/icons'
import LeyCard from '../components/LeyCard'
import { leyes } from '../data/leyes'
import { Categoria, EstadoLey, Filtros } from '../types'

const HomePage = () => {
  const [filtros, setFiltros] = useState<Filtros>({})
  const [search, setSearch] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Extraer todas las categorías y tags únicas
  const categorias = useMemo(() => 
    Array.from(new Set(leyes.map(l => l.categoria))), []
  )
  
  const estados = useMemo(() => 
    Array.from(new Set(leyes.map(l => l.estado))), []
  )
  
  const allTags = useMemo(() => 
    Array.from(new Set(leyes.flatMap(l => l.tags))), []
  )

  // Filtrar leyes
  const leyesFiltradas = useMemo(() => {
    return leyes.filter(ley => {
      // Filtro por categoría
      if (filtros.categoria && ley.categoria !== filtros.categoria) return false
      
      // Filtro por estado
      if (filtros.estado && ley.estado !== filtros.estado) return false
      
      // Filtro por año
      if (filtros.añoDesde && ley.año < filtros.añoDesde) return false
      if (filtros.añoHasta && ley.año > filtros.añoHasta) return false
      
      // Filtro por búsqueda
      if (search) {
        const searchLower = search.toLowerCase()
        if (
          !ley.nombre.toLowerCase().includes(searchLower) &&
          !ley.descripcion.toLowerCase().includes(searchLower) &&
          !ley.numero.toLowerCase().includes(searchLower) &&
          !ley.motivoObsoleto.toLowerCase().includes(searchLower)
        ) {
          return false
        }
      }
      
      // Filtro por tags
      if (selectedTags.length > 0) {
        if (!selectedTags.every(tag => ley.tags.includes(tag))) return false
      }
      
      return true
    })
  }, [filtros, search, selectedTags])

  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const handleTagClick = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleTagRemove = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove))
  }

  const clearFilters = () => {
    setFiltros({})
    setSearch('')
    setSelectedTags([])
  }

  return (
    <Box>
      {/* Hero Section */}
      <VStack spacing={6} align="start" mb={10}>
        <Heading size="2xl" color="brand.600">
          Leyes Ridículas de Argentina
        </Heading>
        <Text fontSize="xl" color="gray.600" maxW="3xl">
          Descubre las leyes obsoletas que siguen vigentes en Argentina, 
          creadas en contextos económicos diferentes y que hoy carecen de sentido.
        </Text>
        <HStack spacing={4}>
          <Badge colorScheme="red" fontSize="md" px={3} py={1} borderRadius="full">
            {leyes.length} leyes documentadas
          </Badge>
          <Badge colorScheme="blue" fontSize="md" px={3} py={1} borderRadius="full">
            Actualizado: Marzo 2026
          </Badge>
        </HStack>
      </VStack>

      {/* Filtros */}
      <Box 
        bg={bg} 
        p={6} 
        borderRadius="xl" 
        border="1px" 
        borderColor={borderColor}
        mb={8}
        boxShadow="sm"
      >
        <VStack spacing={6} align="stretch">
          <Flex justify="space-between" align="center">
            <Heading size="md">Filtrar Leyes</Heading>
            <Button 
              size="sm" 
              variant="ghost" 
              colorScheme="brand"
              onClick={clearFilters}
              isDisabled={!filtros.categoria && !filtros.estado && !search && selectedTags.length === 0}
            >
              Limpiar filtros
            </Button>
          </Flex>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.600">
                Categoría
              </Text>
              <Select
                placeholder="Todas las categorías"
                value={filtros.categoria || ''}
                onChange={(e) => setFiltros({...filtros, categoria: e.target.value as Categoria || undefined})}
              >
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Select>
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.600">
                Estado
              </Text>
              <Select
                placeholder="Todos los estados"
                value={filtros.estado || ''}
                onChange={(e) => setFiltros({...filtros, estado: e.target.value as EstadoLey || undefined})}
              >
                {estados.map(estado => (
                  <option key={estado} value={estado}>{estado}</option>
                ))}
              </Select>
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.600">
                Año desde
              </Text>
              <Input
                type="number"
                placeholder="Ej: 1990"
                value={filtros.añoDesde || ''}
                onChange={(e) => setFiltros({...filtros, añoDesde: e.target.value ? parseInt(e.target.value) : undefined})}
              />
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.600">
                Año hasta
              </Text>
              <Input
                type="number"
                placeholder="Ej: 2020"
                value={filtros.añoHasta || ''}
                onChange={(e) => setFiltros({...filtros, añoHasta: e.target.value ? parseInt(e.target.value) : undefined})}
              />
            </Box>
          </SimpleGrid>

          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.600">
              Buscar
            </Text>
            <InputGroup>
              <InputLeftElement>
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Buscar por nombre, descripción o número de ley..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </Box>

          {/* Tags seleccionados */}
          {selectedTags.length > 0 && (
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.600">
                Tags seleccionados
              </Text>
              <Flex wrap="wrap" gap={2}>
                {selectedTags.map(tag => (
                  <Tag key={tag} size="md" colorScheme="brand" borderRadius="full">
                    <TagLabel>{tag}</TagLabel>
                    <TagCloseButton onClick={() => handleTagRemove(tag)} />
                  </Tag>
                ))}
              </Flex>
            </Box>
          )}

          {/* Tags disponibles */}
          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.600">
              Tags populares
            </Text>
            <Flex wrap="wrap" gap={2}>
              {allTags.slice(0, 10).map(tag => (
                <Tag
                  key={tag}
                  size="md"
                  variant={selectedTags.includes(tag) ? "solid" : "outline"}
                  colorScheme="brand"
                  cursor="pointer"
                  onClick={() => handleTagClick(tag)}
                  _hover={{ bg: 'brand.50' }}
                >
                  <TagLabel>{tag}</TagLabel>
                </Tag>
              ))}
            </Flex>
          </Box>
        </VStack>
      </Box>

      {/* Resultados */}
      <Box>
        <Flex justify="space-between" align="center" mb={6}>
          <Heading size="lg">
            Leyes encontradas
            <Text as="span" fontSize="md" color="gray.600" ml={2}>
              ({leyesFiltradas.length} de {leyes.length})
            </Text>
          </Heading>
          
          <HStack spacing={4}>
            <Button
              leftIcon={<SettingsIcon />}
              variant="outline"
              colorScheme="brand"
              size="sm"
              onClick={() => {
                // Scroll to filters
                document.getElementById('filters')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Más filtros
            </Button>
          </HStack>
        </Flex>

        {leyesFiltradas.length === 0 ? (
          <Box 
            textAlign="center" 
            py={12} 
            bg={bg} 
            borderRadius="xl" 
            border="1px" 
            borderColor={borderColor}
          >
            <VStack spacing={4}>
              <Heading size="md" color="gray.500">
                No se encontraron leyes
              </Heading>
              <Text color="gray.500">
                Intenta con otros filtros o términos de búsqueda
              </Text>
              <Button colorScheme="brand" onClick={clearFilters}>
                Limpiar todos los filtros
              </Button>
            </VStack>
          </Box>
        ) : (
          <Grid
            templateColumns={{
              base: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)'
            }}
            gap={6}
          >
            {leyesFiltradas.map(ley => (
              <LeyCard key={ley.id} ley={ley} />
            ))}
          </Grid>
        )}
      </Box>

      {/* Stats */}
      <Box mt={12} pt={8} borderTop="1px" borderColor={borderColor}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          <VStack align="center" spacing={3}>
            <Heading size="2xl" color="brand.500">
              {leyes.length}
            </Heading>
            <Text textAlign="center" color="gray.600">
              Leyes obsoletas documentadas
            </Text>
          </VStack>
          
          <VStack align="center" spacing={3}>
            <Heading size="2xl" color="red.500">
              {leyes.filter(l => l.estado === 'Vigente').length}
            </Heading>
            <Text textAlign="center" color="gray.600">
              Leyes aún vigentes
            </Text>
          </VStack>
          
          <VStack align="center" spacing={3}>
            <Heading size="2xl" color="orange.500">
              {Math.round(leyes.reduce((acc, ley) => acc + ley.datosEconomicos.inflacionAcumulada, 0) / leyes.length)}%
            </Heading>
            <Text textAlign="center" color="gray.600">
              Inflación promedio acumulada
            </Text>
          </VStack>
        </SimpleGrid>
      </Box>
    </Box>
  )
}

export default HomePage