import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { createMovie } from "../store/movies";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function CreateMovieOMDB() {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        title: "",
      }}
      validationSchema={Yup.object({
        title: Yup.string().required("Required"),
      })}
      onSubmit={(values) => {
        fetch(`http://www.omdbapi.com/?t=${values.title}&apikey=da9026c1`)
          .then((response) => response.json())
          .then((data) => {
            dispatch(
              createMovie({
                movie: {
                  title: data["Title"],
                  description: data["Plot"],
                  image_url: data["Poster"],
                  genre: data["Genre"].split(",")[0].toLowerCase().trim(),
                },
                onSuccess: () => {
                  history.push(`/movies`);
                },
              })
            );
          });
      }}
    >
      <Form>
        <label htmlFor="title">Title</label>
        <Field name="title" type="text" />
        <ErrorMessage name="title" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
