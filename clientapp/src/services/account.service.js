import { Component } from "react";
import validator from "validator";
import { adminLoginAsync } from "../reducers/admin/adminSlice";

class AccountService {
  async login(formState, dispatch) {
    const validEmail = validator.isEmail(formState.email);
    const validPassword = validator.isStrongPassword(formState.password);

    if (validEmail && validPassword) {
      const res = await dispatch(adminLoginAsync(formState));

      if (res.meta.requestStatus === "fulfilled") {
        return true;
      }
    }

    return false;
  }
}

export default AccountService;
