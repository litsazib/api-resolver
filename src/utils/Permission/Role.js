export const roleCheck = (permission, role) => {
  let response = false;
  if (permission !== undefined) {
    for (const permit of permission) {
      if (permit.name === roles[role]) {
        response = true;
      }
      if (response) break;
    }
  }
  return response;
};

const roles = [
  "create-dentist",
  "dentist-list",
  "create-staff",
  "staff-list",
  "create-patient",
  "patient-list",
  "role-create",
  "role-list",
  "permission-list",
  "role-view",
  "role-update",
  "role-delete",
  "create-appointment",
  "appointment-list",
  "appointment-update",
  "log-list",
];
