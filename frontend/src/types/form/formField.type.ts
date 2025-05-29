export type SelectItems = {
  name: string;
  value: string;
};

export type FormField = {
  name: string;
  placeholder: string;
  type: "text" | "number" | "password";
  selectItems?: SelectItems[];
};
