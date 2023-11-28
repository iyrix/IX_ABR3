import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .max(20, "Title should not exceed 20 characters")
    .test(
      "no-spaces",
      "Title should not be empty, contain only spaces, or start with spaces",
      (value) => value.trim() !== "" && !value.startsWith(" ")
    ),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Title should be more then 9 characters")
    .max(300, "Description should not exceed 100 characters")
    .test(
      "no-spaces",
      "Title should not be empty, contain only spaces, or start with spaces",
      (value) => value.trim() !== "" && !value.startsWith(" ")
    ),
  assignedTo: Yup.string()
    .required("Assigned to is required")
    .max(30, "Assigned to should not exceed 30 characters")
    .test(
      "no-spaces",
      "Title should not be empty, contain only spaces, or start with spaces",
      (value) => value.trim() !== "" && !value.startsWith(" ")
    ),
  date: Yup.date().required("Due date is required"),
});

export default validationSchema;
