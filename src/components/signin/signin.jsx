import Layout from "../shared/layout";
import { Formik } from "formik";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../signup/signup.styles.scss";

const initialValues = {
  email: "",
  password: "",
};
const SignIn = () => {
  const Navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSignIn = async (values, { setSubmitting }) => {
    const { email, password } = values;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setSubmitting(false);
      Navigate("/shop");
    } catch (error) {
      console.log(error);
      setSubmitting(false);
      setError(false);
    }
  };

  return (
    <Layout>
      <h1>Sign In</h1>
      <div className="form-container">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {(values, errors, handleChange, handleSubmit, isSubmitting) => {
            return (
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    placeholder="Email"
                    className="nomad-input"
                  ></input>
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    placeholder="Password"
                    className="nomad-input"
                  ></input>
                </div>
                <div className="submit-btn">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="button is-black submit"
                  >
                    Sign In
                  </button>
                </div>
                <div>{error !== null && <p>{error.message}</p>}</div>
              </form>
            );
          }}
        </Formik>
      </div>
    </Layout>
  );
};
export default SignIn;
