const apiLink = {
  hitCreateDentist: "create-dentist",
  hitDentistList: "dentist-list",


  hitRegistration: "posts",
  hitPostList: "posts",
  hitPostDelete: "posts",
  hitLoginLink: "login",
  hitLogoutLink: "logout",
  hitResetEmailLink: "password/email",
  hitResetPasswordLink: "password/reset",
  hitChangePasswordLink: "change-password",
  hitStaffCreateLink: "create-staff",
  hitStaffListLink: "staff-list",
  hitDentistListLink: "dentist-list",
  hitDentistCreateLink: "create-dentist",
  hitPatientCreateLink: "create-patient",
  hitPatientListLink: "patient-list",
  hitPatientUpdateLink: "update-patient",
  hitPermissionListLink: "permission-list",
  hitRoleListLink: "role-list",
  hitRoleCreateLink: "role-create",
  hitRoleDeleteLink: "role-delete",
  hitRoleUpdateLink: "role-update",
  hitRoleViewLink: "role-view",
  hitRoleAssignLink: "role-assign",
  hitAppointmentListLink: "appointment-list",
  hitCreateAppointmentLink: "create-appointment",
  hitAppointmentUpdateLink: "appointment-update",
  hitActivityLogLink: "log-list",
  hitCommonDentistListLink: "common-dentist-list",
  hitUserListLink: "users-list",
  hitFileUploadLink: "upload-document",
  hitUnAuthUploadLink: "uploadDocument",
  hitAuthQuestionerLink: "questionnaire-tab",
  hitInsuranceSetLink: "set-insurance-info",
  hitInsuranceUpdateLink: "update-insurance-info",
  hitRemoveFileLink: "deleteDocument",
  hitRemoveOnlyFileLink: "deleteTempDocument",
  hitInsuranceListLink: "searchInsurance",
  hitPatientInfoLink: "patient-data",
  hitCreateInsuranceBookLink: "create-insurance-book",
  hitUpdateInsuranceBookLink: "update-insurance-book",
  hitInsuranceBookListLink: "insurance-list",
  hitReferralAuthLink: "patient-referral",
  hitPatientReferralDetails: "patient-referral-details",
  hitInsuranceTypeListLink: "insurance-type-list",
  hitInsuranceTypeCreateLink: "create-insurance-type",
  hitInsuranceTypeUpdateLink: "update-insurance-type",
  hitCreateReferenceLink: "create-reference-book",
  hitUpdateReferenceLink: "update-reference-book",
  hitReferenceListLink: "reference-book-list",
};

const insuranceType = [
  { label: "None", value: "None" },
  { label: "Medicare", value: "Medicare" },
  { label: "Medicaid", value: "Medicaid" },
  { label: "Tricare Champus", value: "Tricare Champus" },
  { label: "Champva", value: "Champva" },
  { label: "Group Health Plan", value: "Group Health Plan" },
  { label: "FECA Black Lung", value: "FECA Black Lung" },
  { label: "Other", value: "Other" },
];

const statustype = [
  { status: "active", value: "success", tablet: "greenTablet" },
  { status: "pending", value: "warning", tablet: "yellowTablet" },
  { status: "approved", value: "success", tablet: "greenTablet" },
  { status: "completed", value: "success", tablet: "greenTablet" },
  { status: "absence", value: "error", tablet: "redTablet" },
  { status: "postponed", value: "error", tablet: "redTablet" },
  { status: "deleted", value: "error", tablet: "redTablet" },
];

const getStatusTag = (status) => {
  let statusTag = "";
  statustype.map((item) => {
    if (item.status === status) {
      statusTag = item.value;
    }
  });
  return statusTag;
};

const numberFormat = (number) => {
  let output = "(";
  number.replace(
    /^\D*(\d{0,3})\D*(\d{0,3})\D*(\d{0,4})/,
    function (match, g1, g2, g3) {
      if (g1.length) {
        output += g1;
        if (g1.length == 3) {
          output += ")";
          if (g2.length) {
            output += " " + g2;
            if (g2.length == 3) {
              output += " - ";
              if (g3.length) {
                output += g3;
              }
            }
          }
        }
      }
    }
  );
  return output;
};

const initialAlert = {
  type: "",
  title: "",
  message: "",
};

const initialPaginate = {
  page: 1,
  per_page: 10,
  search_key: "",
  order_by: "desc",
  order_by_col: "id",
  start_date: "",
  end_date: "",
};

const pageSizeOptions = [10, 25, 50, 100, 500];

const SentenceCapital = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toString().toLowerCase();
};

const site_title = "ABTransition";
const AWS_URL = "https://d1gpq2c3n7cisg.cloudfront.net";
export {
  apiLink,
  initialAlert,
  insuranceType,
  site_title,
  initialPaginate,
  SentenceCapital,
  statustype,
  getStatusTag,
  pageSizeOptions,
  numberFormat,
  AWS_URL,
};
