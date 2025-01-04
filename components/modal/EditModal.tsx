"use client";

import { defaultCategoryColor } from "@/data/data";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormErrorMessage,
  useDisclosure,
  Input,
  Box,
  Button,
  Text,
  Checkbox,
  FormControl,
  FormLabel,
  FormHelperText,
  Spinner,
  Center,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { CirclePicker } from "react-color";
import { Form, Field } from "react-final-form";
import MultiSelector from "../MultiSelector";
import { useI18n } from "@/locales/client";

export interface EditableItem {
  key: string;
  name: string;
  value: string | number | boolean | number[];
  type:
    | "input"
    | "select"
    | "color"
    | "checkbox"
    | "date"
    | "number"
    | "multi-select"
    | "email";
  helper?: string;
  selectValues?: {
    id: number;
    name: string;
    color?: string;
    default?: boolean;
  }[];
  required: boolean;
}

interface EditModalProps {
  title: string;
  description: string;
  editable: EditableItem[];
  children: React.ReactNode;
  record?: {
    id: number;
    [key: string]: any;
  };
  callback: (data: any) => void;
}

export default function EditModal({
  title,
  description,
  editable,
  record,
  children,
  callback,
}: EditModalProps) {
  const t = useI18n();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [formValidation, setFormValidation] = useState(false);

  const onSubmit = async (values: any) => {
    setLoading(true);
    let newValues = values;

    if (record) {
      newValues = { ...record, ...values };
    }

    await callback(newValues);
    setLoading(false);
    onClose();
  };

  const validator = (value: EditableItem["value"], required: boolean) => {
    if (!required) {
      return false;
    }

    if (
      !value ||
      value === "" ||
      (typeof value == "object" && value?.length === 0)
    ) {
      setFormValidation(true);
      return true;
    }

    return false;
  };

  const validationMessage = (name: string) => {
    return (
      <Text color={"validation-text"} fontSize={"xs"} mt={"5px"}>
        {name} is required
      </Text>
    );
  };

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>
      <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
        <ModalOverlay />
        <ModalContent maxH={"80vh"}>
          <ModalHeader>
            {title}
            <Text
              fontSize={"sm"}
              mb={"5px"}
              fontWeight={400}
              color={"text-secondary"}
            >
              {description}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY={"scroll"}>
            <Form onSubmit={onSubmit}>
              {(props) => (
                <form id="edit-modal-form" onSubmit={props.handleSubmit}>
                  {editable.map((item) => {
                    let inputType = <></>;

                    switch (item.type) {
                      case "number":
                      case "email":
                      case "input":
                        inputType = (
                          <Field
                            name={item.key}
                            validate={(vl) => validator(vl, item.required)}
                            defaultValue={
                              record && (record[item.key] as string)
                            }
                          >
                            {(props) => {
                              return (
                                <>
                                  <Input
                                    type={item.type}
                                    value={props.input.value}
                                    onChange={props.input.onChange}
                                  />
                                  {props.meta.error &&
                                    formValidation &&
                                    props.meta.touched &&
                                    validationMessage(item.name)}
                                </>
                              );
                            }}
                          </Field>
                        );
                        break;
                      case "checkbox":
                        inputType = (
                          <Field
                            name={item.key}
                            validate={(vl) => validator(vl, item.required)}
                            defaultValue={
                              record && (record[item.key] as boolean)
                            }
                            type="checkbox"
                          >
                            {(props) => {
                              return (
                                <>
                                  <Checkbox
                                    isChecked={props.input.checked}
                                    onChange={props.input.onChange}
                                  />
                                  {props.meta.error &&
                                    formValidation &&
                                    props.meta.touched &&
                                    validationMessage(item.name)}
                                </>
                              );
                            }}
                          </Field>
                        );
                        break;
                      case "color":
                        inputType = (
                          <Box
                            border={"1px solid #59585D"}
                            w={"100%"}
                            p={"10px 5px"}
                            borderRadius={"5px"}
                          >
                            <Center>
                              <Field
                                name={item.key}
                                validate={(vl) => validator(vl, item.required)}
                                defaultValue={
                                  record && (record[item.key] as string)
                                }
                                type="input"
                              >
                                {(props) => {
                                  return (
                                    <>
                                      <CirclePicker
                                        color={props.input.value}
                                        colors={defaultCategoryColor}
                                        width="100%"
                                        onChange={(val) =>
                                          props.input.onChange(val.hex)
                                        }
                                      />
                                      {props.meta.error &&
                                        formValidation &&
                                        props.meta.touched &&
                                        validationMessage(item.name)}
                                    </>
                                  );
                                }}
                              </Field>
                            </Center>
                          </Box>
                        );
                        break;
                      case "select":
                        inputType = (
                          <Field
                            name={item.key}
                            validate={(vl) => validator(vl, item.required)}
                            defaultValue={
                              record && record[item.key]
                                ? (record[item.key] as string)
                                : (item.value as string)
                            }
                            type="select"
                          >
                            {(props) => {
                              return (
                                <>
                                  <Select
                                    onChange={props.input.onChange}
                                    value={props.input.value}
                                  >
                                    {item.selectValues?.map((val) => (
                                      <option key={val.id} value={val.id}>
                                        {val.name}
                                      </option>
                                    ))}
                                  </Select>
                                  {props.meta.error &&
                                    formValidation &&
                                    props.meta.touched &&
                                    validationMessage(item.name)}
                                </>
                              );
                            }}
                          </Field>
                        );
                        break;
                      case "date":
                        inputType = (
                          <Field
                            name={item.key}
                            validate={(vl) => validator(vl, item.required)}
                            defaultValue={
                              record && (record[item.key] as string)
                            }
                            type="input"
                          >
                            {(props) => {
                              return (
                                <>
                                  <Input
                                    type="date"
                                    value={props.input.value}
                                    onChange={props.input.onChange}
                                  />
                                  {props.meta.error &&
                                    formValidation &&
                                    props.meta.touched &&
                                    validationMessage(item.name)}
                                </>
                              );
                            }}
                          </Field>
                        );
                        break;
                      case "multi-select":
                        inputType = (
                          <Field
                            name={item.key}
                            defaultValue={item.value as number[]}
                            validate={(vl) => validator(vl, item.required)}
                            type="custom"
                          >
                            {(props) => {
                              return (
                                <>
                                  <MultiSelector
                                    records={item.selectValues || []}
                                    value={props.input.value || []}
                                    onChange={(val) =>
                                      props.input.onChange(val)
                                    }
                                  />
                                  {props.meta.error &&
                                    formValidation &&
                                    props.meta.touched &&
                                    validationMessage(item.name)}
                                </>
                              );
                            }}
                          </Field>
                        );
                        break;
                    }

                    return (
                      <FormControl key={item.key} mb={"10px"}>
                        <FormLabel>{item.name}</FormLabel>
                        {inputType}
                        <FormHelperText
                          display={item.helper ? "block" : "none"}
                        >
                          {item.helper}
                        </FormHelperText>
                      </FormControl>
                    );
                  })}
                </form>
              )}
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              <Text>{t("common.word.close")}</Text>
            </Button>
            <Button type="submit" form="edit-modal-form">
              {loading ? (
                <Center>
                  <Text>{t("common.word.saving")}</Text>
                  <Spinner size={"xs"} ml={"5px"} />
                </Center>
              ) : (
                <Text>{t("common.word.save")}</Text>
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
