import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, updateGlobalAlert } from "../../../store/slices/appSlice";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { apiLink, site_title } from "../../../utils/env.constant";
import { initialPaginate } from "../../../utils/env.constant";
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
  first_name: "",
  last_name: "",
  email: ""
};

// const [loader, setLoader] = useState(true)

const onSubmit = async (values,formikProps) => {
  let result = await Create(apiLink.hitCreateDentist, values );
  // console.log(result)
  return result && result.resetForm();
};

const getDentisDetailsList = async (params)=>{
  let result = await SelectByPageing(apiLink.hitDentistList,params);
  return result && result;
 }

const SelectAll = async ()=>{
  let result = await Read(apiLink.hitPostList,defaultMethod);
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
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required")
});

const validateComments = (value) => {
  let error;
  if (!value) {
    error = "Required";
  }
  return error;
};


function HomePage() {
  const [params, setParams] = useState(initialPaginate);
  const [data, setData] = useState([]);
  const [pagination,setPagination] = useState({})
  const [error, setError] = useState({});
  // console.log(data)
  // console.log(pagination)
  useEffect(() => {
    getDentisDetailsList(params)
        .then((result)=>{
          setData(result.data)
          setPagination(result.pagination)
        })
        .catch((err)=>{
          setError(err.message)
        })
  }, []);


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
                  <li key={item.id}>
                    <Link to={`/${item.id}`}>{`ID:${item.id} Name: ${item.first_name} Email: ${item.email}`}</Link>
                  </li>
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
                    <label htmlFor="first_name">First Name</label>
                    <Field type="text" id="first_name" name="first_name" />
                    <ErrorMessage name="first_name" component={TextError} />
                  </div>
                  <div className="form-control">
                    <label htmlFor="last_name">Last Name</label>
                    <Field type="text" id="last_name" name="last_name" />
                    <ErrorMessage name="last_name" component={TextError} />
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