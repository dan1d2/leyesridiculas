import { Ley } from '../types';

export const leyes: Ley[] = [
  {
    id: '1',
    numero: 'Ley 25.239',
    nombre: 'Impuesto al Lujo Automotor',
    descripcion: 'Impuesto especial para vehículos considerados de lujo con valores superiores a USD 30,000 en 1999',
    año: 1999,
    categoria: 'Impuestos',
    estado: 'Vigente',
    motivoObsoleto: 'Creada cuando el dólar oficial era $1. Hoy cualquier auto 0km supera los $15M pesos (USD 12,500), haciendo que autos populares paguen impuesto de lujo.',
    contextoHistorico: 'Sancionada durante la Convertibilidad (Ley 23.928). Argentina tenía tipo de cambio fijo 1:1, inflación controlada (0% en 1999) y economía dolarizada. El objetivo era gravar vehículos de alta gama importados por sectores de altos ingresos.',
    impactoActual: 'Autos populares como Fiat Cronos (USD 15,000) o Volkswagen Polo (USD 18,000) pagan impuesto al lujo. El límite de USD 30,000 nunca se actualizó por inflación en dólares (40% desde 1999) ni por devaluación del peso (120,000%).',
    datosEconomicos: {
      dolarOficialEntonces: 1,
      dolarBlueEntonces: 1.2,
      dolarOficialAhora: 1200,
      dolarBlueAhora: 1350,
      inflacionAcumulada: 120000,
      ejemploConcreto: 'Toyota Corolla 1999: USD 18,000 = $18,000 pesos (no pagaba impuesto). Toyota Corolla 2026: USD 25,000 = $30M pesos (paga 20% de impuesto = $6M pesos).'
    },
    tags: ['automotor', 'impuesto', 'dolar', 'inflacion', 'convertibilidad'],
    fuente: 'AFIP - Texto Ley 25.239',
    enlace: 'https://www.afip.gob.ar/leyes/25239/'
  },
  {
    id: '2',
    numero: 'Decreto 179/2001',
    nombre: '5 Centavos a Favor del Consumidor',
    descripcion: 'Obliga a comercios a devolver 5 centavos al consumidor cuando el monto total no es múltiplo de 5 centavos',
    año: 2001,
    categoria: 'Comercial',
    estado: 'Vigente',
    motivoObsoleto: 'Los 5 centavos hoy no tienen valor real. Con inflación del 120,000%, 5 centavos de 2001 equivalen a $600 pesos hoy. Las monedas de 5 centavos dejaron de circular en 2017.',
    contextoHistorico: 'Sancionado meses antes del estallido de la crisis de 2001. Argentina aún mantenía la Convertibilidad pero con recesión profunda (-4.4% PBI en 2001). Medida populista para mostrar "protección al consumidor" en contexto de descontento social.',
    impactoActual: 'Completamente irrelevante. Las transacciones electrónicas y tarjetas no aplican decimales. Los comercios redondean automáticamente. La moneda de menor denominación circulante es $10 pesos.',
    datosEconomicos: {
      dolarOficialEntonces: 1,
      dolarBlueEntonces: 1,
      dolarOficialAhora: 1200,
      dolarBlueAhora: 1350,
      inflacionAcumulada: 120000,
      ejemploConcreto: 'Compra de $10.03 pesos en 2001: comercio devolvía 2 centavos (valor real). Hoy $10.03 = comercio redondea a $10. Los 3 centavos valen $360 pesos pero nadie los reclama.'
    },
    tags: ['consumidor', 'monedas', 'comercio', 'redondeo'],
    fuente: 'Boletín Oficial - Decreto 179/2001',
    enlace: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/31784/20010129'
  },
  {
    id: '3',
    numero: 'Ley 23.928',
    nombre: 'Ley de Convertibilidad',
    descripcion: 'Establece paridad 1 peso = 1 dólar. Base del sistema económico argentino 1991-2001',
    año: 1991,
    categoria: 'Monetaria',
    estado: 'Derogada (2002)',
    motivoObsoleto: 'Derogada en 2002 pero dejó "leyes hijas" con valores en "pesos convertibles" que nunca se actualizaron. Mentalidad 1:1 persiste en legislación.',
    contextoHistorico: 'Plan Cavallo para frenar hiperinflación (3,079% en 1989). Argentina adoptó caja de conversión (currency board). Estabilidad inicial, crisis final 2001-2002.',
    impactoActual: '15 leyes mantienen referencias a "pesos convertibles". Contratos estatales, indemnizaciones, multas calculadas como si $1 = USD 1. Ej: indemnización USD 100,000 = $100,000 pesos (USD 83 hoy).',
    datosEconomicos: {
      dolarOficialEntonces: 1,
      dolarBlueEntonces: 1,
      dolarOficialAhora: 1200,
      dolarBlueAhora: 1350,
      inflacionAcumulada: 120000,
      ejemploConcreto: 'Contrato estatal 1995: USD 1M = $1M pesos. Hoy: Estado paga $1M pesos = USD 833. Empresa recibe 0.08% del valor original.'
    },
    tags: ['convertibilidad', 'dolar', 'historia', 'moneda'],
    fuente: 'InfoLeg - Ley 23.928',
    enlace: 'http://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/478/texact.htm'
  },
  {
    id: '4',
    numero: 'Ley 24.557',
    nombre: 'Riesgos del Trabajo',
    descripcion: 'Sistema de indemnizaciones por accidentes laborales. Topes máximos en pesos',
    año: 1995,
    categoria: 'Laboral',
    estado: 'Vigente',
    motivoObsoleto: 'Topes de indemnización no actualizados desde 1995. Límite máximo: $300,000 (USD 300,000 entonces, USD 250 hoy).',
    contextoHistorico: 'Reforma laboral de los 90s. Argentina con alto desempleo (18.4% en 1995). Ley para reducir costos laborales y atraer inversiones.',
    impactoActual: 'Trabajador con incapacidad total recibe máximo $300,000 = USD 250. No cubre ni 2 meses de tratamiento. Empresas subaseguran: ahorran 99.9% en primas.',
    datosEconomicos: {
      dolarOficialEntonces: 1,
      dolarBlueEntonces: 1.1,
      dolarOficialAhora: 1200,
      dolarBlueAhora: 1350,
      inflacionAcumulada: 120000,
      ejemploConcreto: 'Accidente 1998: indemnización USD 300,000 = $300,000 pesos (vivienda + tratamiento). Accidente 2026: misma indemnización = USD 250 (ni estudios médicos).'
    },
    tags: ['laboral', 'indemnizacion', 'trabajo', 'seguro'],
    fuente: 'Ministerio Trabajo - Ley 24.557',
    enlace: 'https://www.argentina.gob.ar/normativa/nacional/ley-24557-119629'
  },
  {
    id: '5',
    numero: 'Decreto 1.010/2004',
    nombre: 'Reglamento Seguridad Edificios',
    descripcion: 'Reglamento seguridad edificios. Multas por infracciones: máximo $50,000',
    año: 2004,
    categoria: 'Administrativa',
    estado: 'Vigente',
    motivoObsoleto: 'Multa $50,000 = USD 17,241 en 2004, USD 42 hoy. Constructor ahorra USD 100,000 incumpliendo normas, paga USD 42 si lo descubren.',
    contextoHistorico: 'Reglamentación seguridad edilicia post-incendio República Cromañón (2004). Objetivo: prevenir tragedias, estandarizar normas construcción.',
    impactoActual: 'Constructores ignoran normas: ahorran 20-30% costos. Multas irrisorias. Edificios nuevos con deficiencias graves. Inspecciones: 1 cada 5 años promedio.',
    datosEconomicos: {
      dolarOficialEntonces: 2.9,
      dolarBlueEntonces: 3.1,
      dolarOficialAhora: 1200,
      dolarBlueAhora: 1350,
      inflacionAcumulada: 40000,
      ejemploConcreto: 'Multa ajustada: $2M pesos. Multa actual: $50,000 (2.5% del ajustado). Constructor ahorra $120M incumpliendo, riesgo multa $50,000 = 0.04%.'
    },
    tags: ['edificios', 'seguridad', 'multas', 'construccion'],
    fuente: 'Ministerio Interior - Decreto 1.010/2004',
    enlace: 'https://www.argentina.gob.ar/normativa/decreto-1010-2004-60040'
  }
];