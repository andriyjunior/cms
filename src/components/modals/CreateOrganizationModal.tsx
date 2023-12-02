import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { OrganizationModel } from "models/organization";
import { tryAddOrganization } from "modules/organization";
import { FC, useRef } from "react";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import { useAppDispatch } from "store/hooks";

interface ICreateOrganizationModal {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateOrganizationModal: FC<ICreateOrganizationModal> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const methods = useForm({
    defaultValues: { name: "", description: "" },
    mode: "onChange",
  });

  const handleOnSubmit = async (values: any) => {
    dispatch(tryAddOrganization(values as Partial<OrganizationModel>));
  };

  return (
    <FormProvider {...methods}>
      <Form>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your organization</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormLabel>Organization name</FormLabel>
              <Controller
                name="name"
                render={({ field }) => {
                  return <Input {...field} placeholder={"Organization"} />;
                }}
              />

              <FormControl mt={4}>
                <FormLabel>Short description</FormLabel>
                <Controller
                  name="description"
                  render={({ field }) => {
                    return (
                      <Input {...field} placeholder="Enter your description" />
                    );
                  }}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                type="button"
                colorScheme="blue"
                mr={3}
                onClick={methods.handleSubmit(handleOnSubmit) as any}
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Form>
    </FormProvider>
  );
};
