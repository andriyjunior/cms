import { ArrowRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { tryLogin, tryRegister } from "modules/auth";
import { FC, useState } from "react";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "store/hooks";

export const Registration: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state) => state.auth);
  const [isLoading, setLoading] = useState(false);

  const methods = useForm({
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const handleOnSubmit = (values: any) => {
    dispatch(tryRegister(values));
    setLoading(true);
  };

  if (isAuth) {
    return <Navigate to={"/"} />;
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
            <Heading as={"h3"}>{t("registration.createAccount")}</Heading>
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

            <Button
              type="submit"
              variant="solid"
              colorScheme="primary"
              isLoading={isLoading}
            >
              {t("buttons.signUp")}
            </Button>
            <Button
              type="button"
              variant={"outline"}
              colorScheme="primary"
              onClick={() => navigate("/login")}
              rightIcon={<ArrowRightIcon />}
            >
              {t("registration.alreadyRegistered")}
            </Button>
          </Stack>
        </Box>
      </Form>
    </FormProvider>
  );
};
