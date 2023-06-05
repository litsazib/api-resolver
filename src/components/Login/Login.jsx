import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setLoading, updateGlobalAlert } from "../../store/slices/appSlice";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { apiLink, site_title } from "../../utils/env.constant";
import { loginAction, updateAlert } from "../../store/slices/authSlice";
import { defaultMethod, Create, Read, SelectByPageing, SelectByID, Delete, Update } from "../../utils/Helpers/APIRequest/Crud";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";
import TextError from "../Home/HomePage/TextError";



function Login() {
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: ""
  };
  
  const onSubmit = async (values,submitProps) => {
    dispatch(loginAction(values));
    alert('Login Done')
    submitProps.resetForm
  };
  
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required")
  });

  return (
    <Container>
      <Row>
        <Col md={6} className="mx-auto">
          <h1>LOG-IN</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
            // validateOnChange={false}
            // validateOnBlur={false}
            // validateOnMount
          >
            {(formik) => {
              // console.log("Formik props", formik);
              return (
                <Form>
                  <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <Field type="email" id="email" name="email" />
                    <ErrorMessage name="email">
                      {(error) => (
                        <div className="error text-danger">{error}</div>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <Field type="password" id="password" name="password" />
                    <ErrorMessage name="password">
                      {(error) => (
                        <div className="error text-danger">{error}</div>
                      )}
                    </ErrorMessage>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary mt-2"
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    Login
                  </button>
                </Form>
              );
            }}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;