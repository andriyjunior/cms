import {
  Box,
  Button,
  FormLabel,
  Heading,
  Input,
  Stack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { tryLogin } from "modules/auth";
import { FC, useState } from "react";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "@chakra-ui/icons";

import { useAppDispatch, useAppSelector } from "store/hooks";
import { useTranslation } from "react-i18next";

export const Login: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth, isLoading, initialized, error } = useAppSelector(
    (state) => state.auth
  );

  const methods = useForm({
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const handleOnSubmit = (values: any) => {
    dispatch(tryLogin(values));
  };

  if (isAuth && initialized) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(handleOnSubmit) as any}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minH={"100vh"}
        >
          <Stack w={"500px"}>
            <Heading as={"h3"}>{t("login.authorization")}</Heading>
            <FormLabel>{t("common.email")}</FormLabel>
            <Controller
              rules={{ required: true }}
              name={"email"}
              render={({ field }) => (
                <Input
                  name={field.name}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
            <FormLabel>{t("common.password")}</FormLabel>
            <Controller
              name={"password"}
              render={({ field }) => (
                <Input
                  name={field.name}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
            {error && (
              <Text textAlign={"left"} color="error">
                {error}
              </Text>
            )}
            <Button
              type="submit"
              variant="solid"
              colorScheme={"primary"}
              isLoading={isLoading}
            >
              {t("buttons.signIn")}
            </Button>
            <Button
              type="button"
              variant={"outline"}
              colorScheme={"primary"}
              onClick={() => navigate("/registration")}
              rightIcon={<ArrowRightIcon />}
            >
              {t("buttons.signUp")}
            </Button>
          </Stack>
        </Box>
      </Form>
    </FormProvider>
  );
};
