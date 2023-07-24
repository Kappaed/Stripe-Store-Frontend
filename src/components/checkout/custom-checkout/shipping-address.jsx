import { Formik } from "formik";

const validate = (values) => {
  const { name, email, address } = values;
  const errors = {};
  if (!email) {
    errors.email = "Required";
  }
  if (!name) {
    errors.name = "Required";
  }
  if (!address) {
    errors.address = "Required";
  }
  return errors;
};

const initialValues = {
  email: "",
  name: "",
  address: "",
};

const ShippingAddress = ({ setShipping }) => {
  return (
    <div>
      <h4>Shipping Address</h4>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values) => {
          setShipping(values);
        }}
      >
        {({ values, errors, handleChange, handleSubmit }) => {
          const { name, email, address } = errors;
          return (
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  placeholder="Name"
                  values={values.name}
                  className={`nomad-input ${name ? "error" : ""}`}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  values={values.email}
                  className={`nomad-input ${email ? "error" : ""}`}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  onChange={handleChange}
                  values={values.address}
                  className={`nomad-input ${address ? "error" : ""}`}
                />
              </div>

              <div className="submit-btn">
                <button
                  type="submit"
                  className="button is-black nomad-btn submit"
                >
                  CONTINUE
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ShippingAddress;
