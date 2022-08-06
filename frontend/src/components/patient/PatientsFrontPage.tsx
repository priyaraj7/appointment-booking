import { Link } from "react-router-dom";
import { Box, Heading, Container, Text, Button, Stack } from "@chakra-ui/react";

function PatientFrontPage() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
        rel="stylesheet"
      />

      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Finding the <br />
            <Text as={"span"} color={"green.400"}>
              Right Care Matters
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Finding the right doctor means focusing on the factors that can
            actually affect your health. Depending on your health plan, you can
            choose a provider who is in your plan's network.
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Link
              to={{
                pathname: "/public-doctor-list",
              }}
            >
              <Button
                colorScheme={"green"}
                bg={"green.400"}
                rounded={"full"}
                px={6}
                _hover={{
                  bg: "green.500",
                }}
              >
                Find a Doctor
              </Button>
            </Link>
            {/* <Button variant={"link"} colorScheme={"blue"} size={"sm"}>
              Learn more
            </Button> */}
            {/* <Box>
              <Icon
                as={Arrow}
                color={useColorModeValue("gray.800", "gray.300")}
                w={71}
                position={"absolute"}
                right={-71}
                top={"10px"}
              />
              <Text
                fontSize={"lg"}
                fontFamily={"Caveat"}
                position={"absolute"}
                right={"-125px"}
                top={"-15px"}
                transform={"rotate(10deg)"}
              >
                Starting at $15/mo
              </Text>
            </Box> */}
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

export default PatientFrontPage;
