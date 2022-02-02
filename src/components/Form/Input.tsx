import { FormControl, 
         FormLabel, 
         Input as ChakraInput, 
         InputProps as ChakraInputProps
        } from "@chakra-ui/react"

interface InputProps extends ChakraInputProps {
name: string;
label: string;
type: string;
}

export function Input({ name, label, ...rest }: InputProps) {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        id={name}
        name={name}        
        bgColor="gray.900"
        focusBorderColor="pink.500"
        size="lg"
        variant="filled"
        _hover={{
          bgColor: "gray.900",
        }}
        {...rest}
      />
    </FormControl>
  );
}
