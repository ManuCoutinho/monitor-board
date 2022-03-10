import { useRouter } from "next/router";
import Link from "next/link";
import { api } from "../../services/api";
import { queryClient } from "../../services/QueryClient";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";

//todo ajustar validação do yup
type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const schema = yup.object().shape({
  name: yup.string().required("Campo obrigatório"),
  email: yup.string().required("Campo obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .required("Campo obrigatório")
    .min(6, "Senha deverá ter ao menos 6 caracteres"),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref("password"), "As senhas precisam ser iguais"]),
});

export default function CreateUser() {
  const router = useRouter();
  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const response = await api.post("users", {
        user: {
          ...user,
          created_at: new Date(),
        },
      });
      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    await createUser.mutateAsync(values);

    router.push("/user");
  };

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Box
          as="form"
          onSubmit={handleSubmit(handleCreateUser)}
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing="6=8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="name"
                label="Nome completo"
                type="text"
                error={errors.name}
                {...register("name")}
              />
              <Input
                name="email"
                type="email"
                label="E-mail"
                {...register("email", { required: "funcionou" })}
                error={errors.email}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="password"
                label="Senha"
                type="password"
                error={errors.password}
                {...register("password")}
              />
              <Input
                name="password_confirmation"
                label="Confirmação da senha"
                type="password"
                error={errors.password_confirmation}
                {...register("password_confirmation")}
              />
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users">
                <Button type="button" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Link href="#">
                <Button type="submit" colorScheme="pink">
                  Salvar
                </Button>
              </Link>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
