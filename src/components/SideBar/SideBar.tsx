import {
  Box,
  Button,
  Divider,
  Link,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "store/hooks";
import { OrgSelector } from "./OrgSelector";
import { Link as ReactRouterLink } from "react-router-dom";

interface ISideBar {
  isOpen: boolean;
  onClick: () => void;
}

const LinkComponent: FC<{ children: ReactNode; to: string }> = ({
  children,
  to,
}) => {
  return (
    <Link as={ReactRouterLink} textAlign={"left"} to={to}>
      {children}
    </Link>
  );
};

export const SideBar: FC<ISideBar> = ({ isOpen, onClick }) => {
  const { t } = useTranslation();
  const organization = useAppSelector((state) => state.organization.data);

  return (
    <Box
      h={"100vh"}
      w={isOpen ? "240px" : "50px"}
      px={"16px"}
      py={"24px"}
      borderRight={"4px solid"}
      borderColor={"secondary.500"}
      backgroundColor={"primary.500"}
      position={"sticky"}
      top={0}
      transition={"width .3s"}
    >
      <Box>
        <OrgSelector />
      </Box>
      <Stack pt={"16px"}>
        <Divider colorScheme="primary" />

        <LinkComponent to="/"> {t("menu.dashboard")} </LinkComponent>
        <LinkComponent to={`organization/${organization?._id}/settings`}>
          {t("menu.organizationSettings")}{" "}
        </LinkComponent>
      </Stack>
    </Box>
  );
};
