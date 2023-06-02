import { Modal } from "antd";
import { AWS_URL } from "./env.constant";
import { addressValidation, cityValidation, insuranceCompanyValidation, phoneValidation, stateValidation, zipCodeValidation } from "./Validation/FieldValidationCheck";

export const successResponse = (data, message = "", feedback = true) => {
  if (feedback) {
    Modal.success({
      title: "Success",
      content: message,
    });
  }

  return {
    success: true,
    error: null,
    data: data,
  };
};

export const errorResponse = (error, feedback = true) => {
  if (feedback) {
    Modal.error({
      title: "Sorry",
      content: error,
    });
  }

  return {
    success: false,
    error: error,
  };
};

export const formatData = (data) => {
  let finalData = [];
  for (let x in data) {
    let jsonData = data[x].toJSON();
    jsonData.key = data[x].id;
    finalData.push(jsonData);
  }

  return finalData;
};

export const slugify = (text) => {
  const from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
  const to = "aaaaaeeeeeiiiiooooouuuunc------";

  const newText = text
    .split("")
    .map((letter, i) =>
      letter.replace(new RegExp(from.charAt(i), "g"), to.charAt(i))
    );

  return newText
    .toString() // Cast to string
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-y-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
};

export const download = (file) => {
  const fileType = file?.originFileObj
    ? file.type
    : file.split(".")[file.split(".").length - 1];
  if (file?.originFileObj) {
    const url = window.URL.createObjectURL(new Blob([file?.originFileObj]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", file?.name);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    return null;
  } else {
    fetch(AWS_URL + "/" + file, {
      method: "GET",
      headers: {
        "Content-Type": fileType,
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", file);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
  }
};

export const validateInsuranceModalInfo = ({companyName,claim_mailing_address_1,claim_mailing_city,claim_mailing_state,claim_mailing_zipcode,phone_number})=>{
  const {company} = insuranceCompanyValidation({ company: companyName });
  const {address1} = addressValidation({ address_one: claim_mailing_address_1 });
  const {state} = stateValidation({state: claim_mailing_state});
  const {city} = cityValidation({city: claim_mailing_city});
  const {zipCode} = zipCodeValidation({zipCode: claim_mailing_zipcode});
  const {phone} = phoneValidation({phone: phone_number});
  return {company,address1,state,city,zipCode,phone};
};


