import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { SideDrawerProvider } from '../context/SidebarDrawerContext'

import { theme } from '../style/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SideDrawerProvider>
        <Component {...pageProps} />
      </SideDrawerProvider>
    </ChakraProvider>
  )
}

export default MyApp
