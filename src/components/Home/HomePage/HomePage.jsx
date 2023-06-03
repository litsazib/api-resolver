import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setLoading, updateGlobalAlert } from "../../../store/slices/appSlice";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { apiLink, site_title } from "../../../utils/env.constant";
import { defaultMethod, Create, Read, SelectByPageing, SelectByID, Delete, Update } from "../../../utils/Helpers/APIRequest/Crud";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";
import TextError from "./TextError";

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};

let loader = true;

const onSubmit = async (values) => {
  let result = await Create(apiLink.hitRegistration, values ,defaultMethod,loader);
  console.log('submit',result)
};

const SelectAll = async ()=>{
  let result = await Read(apiLink.hitPostList,defaultMethod,loader);
  return result
}


let initialParam = {
  // ...params,
  // page: pagination.current,
  // per_page: pagination.pageSize,
};

const List = async (initialParam)=>{
  let result = await SelectByPageing(apiLink.hitPostList,initialParam,defaultMethod,loader);
  return result
}

const SelectOne = async (id)=>{
  let result = await SelectByID(apiLink.hitPostList,id,loader);
  console.log('SelectByID',result)
  return result
}

const DeleteOne = async (id)=>{
  let result = await Delete(apiLink.hitPostDelete,id,loader);
  console.log('DeleteData',result)
  return result
}

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  channel: Yup.string().required("Required"),
  comments: Yup.string().required("Required"),
});

const validateComments = (value) => {
  let error;
  if (!value) {
    error = "Required";
  }
  return error;
};


function HomePage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState({});
  useEffect(() => {
    SelectAll()
      .then((res)=>{
        setData(res)
      })
      .catch((err)=>{
        setError(err)
      })
  },[]);


  const dispatch = useDispatch();
  const { globalAlert,isLoad } = useSelector((state) => state.app);
  return (
    <Container>
      <Row>
        <Col md={6} className="mx-auto">
          <h1>LIST</h1>
          <ul>
              {data.slice(0,5).map((item,id)=>{
                return (
                  <li key={id}>{item.title}</li>
                )
              })}
          </ul>
        </Col>
      </Row>
      <Row>
        <h1 className="mt-4 mb-5 text-center">Formik Form</h1>
        <small>
          <span className="text-danger">{globalAlert.type}</span> <br/>
          <span>{globalAlert.title}</span><br/>
          <span>{globalAlert.message}</span>
        </small>
        <Col md={6} className="mx-auto">
          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
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
                    <label htmlFor="name">Name</label>
                    <Field type="text" id="name" name="name" />
                    <ErrorMessage name="name" component={TextError} />
                  </div>

                  <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <Field type="email" id="email" name="email" />
                    <ErrorMessage name="email">
                      {(error) => (
                        <div className="error text-danger">{error}</div>
                      )}
                    </ErrorMessage>
                  </div>

                  {/* <div className="form-control">
                    <label htmlFor="channel">Channel</label>
                    <Field
                      type="text"
                      id="channel"
                      name="channel"
                      placeholder="YouTube channel name"
                    />
                    <ErrorMessage name="channel" />
                  </div>

                  <div className="form-control">
                    <label htmlFor="comments">Comments</label>
                    <Field
                      as="textarea"
                      id="comments"
                      name="comments"
                      validate={validateComments}
                    />
                    <ErrorMessage name="comments" component={TextError} />
                  </div> */}

                  <div className="form-control">
                    <label htmlFor="address">Address</label>
                    <FastField name="address">
                      {({ field, form, meta }) => {
                        // console.log('Field render')
                        return (
                          <div>
                            <input type="text" {...field} />
                            {meta.touched && meta.error ? (
                              <div>{meta.error}</div>
                            ) : null}
                          </div>
                        );
                      }}
                    </FastField>
                  </div>

                  <div className="form-control">
                    <label htmlFor="facebook">Facebook profile</label>
                    <Field type="text" id="facebook" name="social.facebook" />
                  </div>

                  <div className="form-control">
                    <label htmlFor="twitter">Twitter profile</label>
                    <Field type="text" id="twitter" name="social.twitter" />
                  </div>

                  <div className="form-control">
                    <label htmlFor="primaryPh">Primary phone number</label>
                    <Field type="text" id="primaryPh" name="phoneNumbers[0]" />
                  </div>

                  <div className="form-control">
                    <label htmlFor="secondaryPh">Secondary phone number</label>
                    <Field
                      type="text"
                      id="secondaryPh"
                      name="phoneNumbers[1]"
                    />
                  </div>

                  <div className="form-control">
                    <label>List of phone numbers</label>
                    <FieldArray name="phNumbers">
                      {(fieldArrayProps) => {
                        const { push, remove, form } = fieldArrayProps;
                        const { values } = form;
                        const { phNumbers } = values;
                        return (
                          <div>
                            {phNumbers.map((phNumber, index) => (
                              <div key={index}>
                                <Field name={`phNumbers[${index}]`} />
                                {index > 0 && (
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                  >
                                    -
                                  </button>
                                )}
                              </div>
                            ))}
                            <button type="button" onClick={() => push("")}>
                              +
                            </button>
                          </div>
                        );
                      }}
                    </FieldArray>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary mt-2"
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    Submit
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

export default HomePage;