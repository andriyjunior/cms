import { combineReducers } from "@reduxjs/toolkit";

import auth from "modules/auth";
import user from "modules/user";
import organizations from "modules/organizations";
import organization from "modules/organization";

const reducers = combineReducers({ auth, user, organizations, organization });

export default reducers;
