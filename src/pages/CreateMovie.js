import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { createMovie } from "../store/movies";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function CreateMovie() {
  const history = useHistory();

  const typeMovies = [
    "historical",
    "horror",
    "comedy",
    "crime",
    "western",
    "fantasy",
    "action",
    "drama",
    "romance",
    "thriller",
    "adventure",
    "mystery",
    "political",
  ];

  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        image_url: null,
        genre: typeMovies[0],
      }}
      validationSchema={Yup.object({
        title: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
        image_url: Yup.string().required("Required"),
        genre: Yup.string().required("Required"),
      })}
      onSubmit={(values) => {
        dispatch(
          createMovie({
            movie: values,
            onSuccess: () => {
              history.push(`/movies`);
            },
          })
        );
      }}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form>
          <label htmlFor="title">Title</label>
          <Field name="title" type="text" />
          <ErrorMessage name="title" />

          <label htmlFor="description">Description</label>
          <Field name="description" type="text" />
          <ErrorMessage name="description" />

          <label htmlFor="image_url">Image</label>
          <input
            name="image_url"
            type="file"
            onChange={(event) => {
              setFieldValue("image_url", event.target.files[0]);
            }}
          />
          <ErrorMessage name="image_url" />

          <Field as="select" name="genre">
            {typeMovies.map((movie) => (
              <option key={movie} value={movie}>
                {movie}
              </option>
            ))}
          </Field>

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}
