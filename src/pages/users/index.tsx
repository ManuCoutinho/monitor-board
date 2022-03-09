import Link from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { useUsers } from "../../services/hooks/useUsers";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";

export default function UserList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useUsers(page);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px={["4", "4", "6"]}>
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" ml={4} color="gray.500" />
              )}
            </Heading>
            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                colorScheme="pink"
                fontSize="16"
                leftIcon={<Icon as={RiAddLine} />}
              >
                Criar novo
              </Button>
            </Link>
          </Flex>
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Erro na comunicação com o servidor!</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Th px={["4", "4", "6"]} color="gray.300" w="8">
                    <Checkbox colorScheme="pink" />
                  </Th>
                  <Th px={["4", "4", "6"]} color="gray.300">
                    Usuário
                  </Th>
                  {isWideVersion && (
                    <Th px={["4", "4", "6"]} color="gray.300">
                      Data de cadastro
                    </Th>
                  )}
                  <Th w="8"></Th>
                </Thead>
                <Tbody>
                  {data.users.map((user) => {
                    return (
                      <Tr key={user.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Text fontWeight="bold">{user.name}</Text>
                            <Text fontSize="sm" color="gray.300">
                              {user.email}
                            </Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{user.created_at}</Td>}
                        <Td>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="cyan"
                            leftIcon={<Icon as={RiPencilLine} />}
                          >
                            {isWideVersion && "Editar"}
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
              <Pagination
                totalCountRegister={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

//todo problema na pagina 1
