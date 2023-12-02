import { Button, ButtonGroup, Flex, Text } from "@chakra-ui/react";
import { tryLogout } from "modules/auth";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";

export const Header = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.data);

  const handleLogout = () => {
    dispatch(tryLogout());
  };

  const navigateToLogin = () => navigate("/login", { replace: true });
  const navigateToRegistration = () =>
    navigate("/registration", { replace: true });

  return (
    <Flex
      bg={"primary.500"}
      h={"52px"}
      w={"100%"}
      position={"sticky"}
      top={0}
      justifyContent={"space-between"}
      alignItems={"center"}
      px={"24px"}
    >
      <Text fontSize={"medium"} color={"white"}>
        {user?.email}
      </Text>

      <ButtonGroup>
        {user && <Button onClick={handleLogout}>{t("buttons.signOut")}</Button>}
        {!user && (
          <Button type="button" onClick={navigateToLogin} variant={"ghost"}>
            {t("buttons.signIn")}
          </Button>
        )}
        {!user && (
          <Button type="button" onClick={navigateToRegistration}>
            {t("buttons.signUp")}
          </Button>
        )}
      </ButtonGroup>
    </Flex>
  );
};
