import  { createContext, ReactNode, useContext, useEffect } from "react"
import { useRouter } from "next/router";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";

interface SideDrawerProviderProps {
  children: ReactNode;
}

type SidebarDrawerContextProps = UseDisclosureReturn

const SidebarDrawerContext = createContext({} as SidebarDrawerContextProps)

export function SideDrawerProvider({ children, }: SideDrawerProviderProps) {
  const disclosure = useDisclosure()
  const router = useRouter()

  useEffect(() => {
    disclosure.onClose()
  }, [router.asPath])
  
//*fecha a sidebar quando clica no link nav

  return(
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext)