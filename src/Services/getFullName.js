export const getFullName = (user_name, last_name) => {
  if (last_name && last_name.includes(" ")) {
    return user_name + " " + last_name.split(" ")[0];
  } else if (last_name == null) {
    return user_name;
  } else {
    return user_name + " " + last_name;
  }
};
