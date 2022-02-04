import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../../components/Form/Input'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const CreateUserFormSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  email: yup.string().required('Campo obrigatório').email('E-mail inválido'),
  password: yup.string().required('Campo obrigatório').min(6, 'Senha deverá ter ao menos 6 caracteres'),
  password_confirmation: yup.string().oneOf([null, yup.ref('password'), 'As senhas precisam ser iguais'])
});


export default function CreateUser() {
  const { register, handleSubmit, formState:{ errors, isSubmitting } } = useForm({
    resolver: yupResolver(CreateUserFormSchema)
  })
  
  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (data) => {   
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log(data)
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Box as="form" flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]} onSubmit={handleSubmit(handleCreateUser)}>
          <Heading size="lg" fontWeight="normal">Criar usuário</Heading>
          <Divider my="6" borderColor="gray.700"/>
          <VStack spacing="6=8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="name"
                label="Nome completo"
                type="text"
                {...register("name")}
                error={errors.name} 
              />
              <Input
                name="email"
                label="E-mail"
                type="email"
                {...register("email")}
                error={errors.email} 
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
             <Input
                name="password"
                label="Senha"
                type="password"
                {...register("password")}
                error={errors.password} 
              />
              <Input
                name="password_confirmation"
                label="Confirmação da senha"
                type="password"
                {...register("password_confirmation")}
                error={errors.password_confirmation} 
              />
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users">
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Link href="#">
                <Button type="submit" isLoading={isSubmitting} colorScheme="pink">Salvar</Button>
              </Link>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
