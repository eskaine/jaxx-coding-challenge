import React, { createContext, useState } from "react";
import AccountService from "../services/account.service";

export const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [accountService] = useState(new AccountService());

  const services = {
    accountService,
  };

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
};
