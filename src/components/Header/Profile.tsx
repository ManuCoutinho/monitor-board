import { Avatar, Box, Flex, Text } from "@chakra-ui/react"

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return(
    <Flex align="center">
     {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Joaninha Flores</Text>
          <Text
            color="gray.300"
            fontSize="small"
          >
              joaninha@email.com
          </Text>
        </Box>
     )};
     <Avatar
       size="md"
       name="Joaninha Flores" 
       src="https://source.unsplash.com/random/300x300"
   />
    </Flex>
  
  )
}