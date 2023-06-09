import {
  Box,
  Flex,
  IconButton,
  useDisclosure,
  Image,
  Button,
  useToast,
  Text,
  Center,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/authentication/action";

const Links = ["Home","Transaction"];

const backgroundColor = "#FFB84C";

const NavLink = ({ children }) => (
  <Link
    to={children === Links[0] ? "/" : children === Links[1] ? "/transaction" : null}
  >
    <Box
      color="black"
      cursor="pointer"
      fontSize="large"
      _hover={{
        textDecoration: "underline",
      }}
    >
      {children}
    </Box>
  </Link>
);

function Navbar() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuth, firstName } = useSelector(
    (store) => store.AuthenticationReducer
  );
  const dispatch = useDispatch();

  const logoutBtn = () => {
    dispatch(logoutUser());
    toast({
      description: "logout successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };
  return (
    <>
      <Flex
        justifyContent="space-between"
        marginX="auto"
        padding="2"
        cursor="pointer"
        backgroundColor={backgroundColor}
        alignItems="center"
        width="full"
      >
        <Center display={{ md: "none" }}>
          <IconButton
            backgroundColor={backgroundColor}
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            onClick={isOpen ? onClose : onOpen}
          />
        </Center>
        <Flex alignItems="center" justifyContent="flex-start">
          <Flex justifyContent="space-between">
            <Image
              src="https://img.freepik.com/premium-vector/vector-banking-symbol-money-income-icon-abstract-illustration-banking-structure-banking-service-concept-elements-financial-system-connected-with-arrows_570429-10973.jpg?w=2000"
              alt="company-logo"
              width={{
                lg: "7%",
                base: "35%",
                md: "25%",
              }}
            />
            <Box
              display={{ base: "none", md: "flex" }}
              gap="5"
              alignItems="center"
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Box>
          </Flex>
        </Flex>

        <Flex
          justifyContent="flex-end"
          alignItems="center"
          gap="5"
          flexDirection={{
            base: "column",
            md: "row",
          }}
        >
          <Center>
            {!isAuth ? (
              <Flex
                gap="5"
                direction={{
                  base: "column",
                  md: "row",
                }}
                marginX={{
                  base: "unset",
                  md: "10",
                }}
              >
                <Link to="/login">
                  <Button
                    visibility={isAuth === true ? "hidden" : "visible"}
                    color="white"
                    backgroundColor="#3a63f7"
                    border="1px solid #ccc"
                    _hover={{
                      color: "black",
                    }}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    visibility={isAuth === true ? "hidden" : "visible"}
                    color="white"
                    backgroundColor="#3a63f7"
                    border="1px solid #ccc"
                    _hover={{
                      color: "black",
                    }}
                  >
                    Signup
                  </Button>
                </Link>
              </Flex>
            ) : (
              <Flex
                gap="5"
                direction={{
                  base: "column",
                  md: "row",
                }}
                alignItems="center"
                marginX={{
                  base: "unset",
                  md: "12",
                }}
              >
                <Text
                  display={{
                    base: "none",
                    md: "block",
                  }}
                  fontSize="md"
                >
                  Welcome {firstName}
                </Text>
                <Button
                  visibility={isAuth === false ? "hidden" : "visible"}
                  backgroundColor={backgroundColor}
                  color="white"
                  border="1px solid #ccc"
                  _hover={{
                    color: "black",
                  }}
                  onClick={logoutBtn}
                >
                  Logout
                </Button>
              </Flex>
            )}
          </Center>
        </Flex>
      </Flex>

      {isOpen ? (
        <Center
          pb={4}
          display={{ md: "none" }}
          border="0px solid red"
          textAlign="center"
        >
          {isAuth && <Text fontSize="lg">Welcome {firstName}</Text>}
          {Links.map((link) => (
            <Center mt="2">
              <NavLink key={link}>{link}</NavLink>
            </Center>
          ))}
        </Center>
      ) : null}
    </>
  );
}
export default Navbar;
