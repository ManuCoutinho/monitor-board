import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form"
import { FormControl, 
         FormErrorMessage, 
         FormLabel,          
         Input as ChakraInput, 
         InputProps as ChakraInputProps
        } from "@chakra-ui/react"

interface InputProps extends ChakraInputProps {
name: string;
label: string;
type: string;
error: FieldError,
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, error, ...rest }, ref ) => {
  return (
    <FormControl isInvalid={!!error}>
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
        ref={ref}
        {...rest}
      />
      {!!error && (<FormErrorMessage>{ error.message }</FormErrorMessage>)}
    </FormControl>
  );
}

export const Input = forwardRef(InputBase)