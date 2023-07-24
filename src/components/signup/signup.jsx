import Layout from "../shared/layout";
import { Formik } from "formik";
import "./signup.styles.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, createUserProfileDocument } from "../../firebase";

const initialValues = {
  firstname: "",
  email: "",
  password: "",
};

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.firstname) {
    errors.firstname = "Required";
  }
  if (!values.password) {
    errors.password = "Required";
  }
  return errors;
};

const SignUp = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSignUp = async (values, { setSubmitting }) => {
    const { firstname, email, password } = values;
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, { displayName: firstname });
      navigate("/shop");
      setSubmitting(false);
    } catch (e) {
      console.log(e);
      setError(e);
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="sign-up">
        <h1>Sign Up</h1>
        <div className="form-container">
          <Formik
            validate={validate}
            initialValues={initialValues}
            onSubmit={handleSignUp}
          >
            {({ values, errors, handleChange, handleSubmit, isSubmitting }) => {
              const { firstname, email, password } = errors;
              return (
                <form onSubmit={handleSubmit}>
                  <div>
                    <input
                      type="text"
                      name="firstname"
                      onChange={handleChange}
                      value={values.firstname}
                      className={`nomad-input ${firstname ? "error" : ""}`}
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                      className={`nomad-input ${email ? "error" : ""}`}
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      value={values.password}
                      className={`nomad-input ${password ? "error" : ""}`}
                      placeholder="password"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="button is-black nomad-btn submit"
                    >
                      Sign Up
                    </button>
                  </div>
                  <div className="error-message">
                    {error !== null && <p>{error.message} </p>}
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
