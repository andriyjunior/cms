import { Box, Container, Flex } from "@chakra-ui/react";
import { Header, SideBar } from "components";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  const [isOpen, setOpen] = useState(true);

  return (
    <Box>
      <Flex>
        <SideBar isOpen={isOpen} onClick={() => setOpen((st) => !st)} />
        <Flex flexDirection={"column"} shrink={0} grow={1}>
          <Header />
          <Flex pt={"24px"} pl={"24px"}>
            <Outlet />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
