import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { CreateOrganizationModal } from "components/modals";
import { tryGetOrganization } from "modules/organization";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "store/hooks";

export const OrgSelector: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const organization = useAppSelector((state) => state.organization);
  const organizations = useAppSelector((state) => state.organizations.data);

  const handleOnSelect = (id: string) => {
    dispatch(tryGetOrganization(id));
  };

  return (
    <Stack gap={4}>
      <Button w={"100%"} colorScheme="secondary" onClick={onOpen}>
        {t("menu.addOrganization")}
      </Button>

      {!!organizations?.length && (
        <Menu>
          <MenuButton
            as={Button}
            colorScheme="secondary"
            textAlign={"left"}
            w={"100%"}
            rightIcon={<ChevronDownIcon />}
            isLoading={Boolean(!organizations)}
          >
            {organization?.data?.name ?? "Select your organization"}
          </MenuButton>

          <MenuList>
            {organizations?.map((org, idx) => {
              return (
                <MenuItem
                  key={org._id}
                  minH="48px"
                  onClick={() => handleOnSelect(org._id)}
                >
                  <span>{org.name}</span>
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      )}
      <CreateOrganizationModal onClose={onClose} isOpen={isOpen} />
    </Stack>
  );
};
