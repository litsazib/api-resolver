const colorCode = {
  loginBgColor: "#F8FAFB",
  whiteColor: "#FFFFFF",
};

const usaRegx = /^(\d{3})(\d{3})(\d{4})$/;

const phoneNumberUSFormat = (phoneNumber) => {
  try {
    const number = phoneNumber.replace(/\D/g, ""); // Remove non-digit characters
    if (number.length === 0) {
      return "";
    }
    if (number.length <= 3) {
      return `(${number}`;
    }
    if (number.length <= 6) {
      return `(${number.slice(0, 3)}) ${number.slice(3)}`;
    }
    if (number.length <= 10) {
      return `(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6)}`;
    }
    const reg = number.match(usaRegx);
    if (reg) {
      return "(" + reg[1] + ") " + reg[2] + "-" + reg[3];
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

const freshPhoneNumber = (phone) => {
  let freshNumber = phone
    .toString()
    .replaceAll("(", "")
    .replaceAll(")", "")
    .replaceAll(" ", "")
    .replaceAll("-", "");
  return freshNumber;
};

export { colorCode, phoneNumberUSFormat, freshPhoneNumber };
