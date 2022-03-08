import { Box, Flex, SimpleGrid, Text, theme } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

const options = {
  chart: {
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],    
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder:{
      color: theme.colors.gray[600]
    },
    axisTicks: {
      color: theme.colors.gray[600]
    },
    categories: [
      '2022-01-02T00:00:00.000Z',
      '2022-01-10T00:00:00.000Z',
      '2022-01-13T00:00:00.000Z',
      '2022-01-20T00:00:00.000Z',
      '2022-01-21T00:00:00.000Z',
      '2022-01-31T00:00:00.000Z',
    ]
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3
    }
  }  
}

const seriesUsers = [
  { name: '2022', data:[31, 251, 32,  125, 24, 55]},
  { name: '2021', data:[63, 180, 224,  89, 99, 151]}
]
const seriesTax = [
  { name: '2022', data:[60, 110, 20,  12, 55, 77]},
  { name: '2021', data:[80, 199, 124,  189, 99, 144]}
]

export default function Dashboard() {
  return(
    <Flex direction="column" h="100vh">
      <Header/>
      <Flex width="100%" my="6" py="6" mx="auto" maxWidth={1480} px={["4", "4", "6"]} >
        <Sidebar/>
        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}            
          >
            <Text fontSize="lg" mb="4">Inscritos da Semana</Text>
            <Chart type="area" height={168} options={options} series={seriesUsers} />
          </Box>
          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}            
          >
            <Text fontSize="lg" mb="4">Taxa de abertura</Text>
            <Chart type="area" height={168} options={options} series={seriesTax} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}