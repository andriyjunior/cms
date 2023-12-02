import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { organizationService } from "business/organization/OrganizationService";
import { LIMIT_PER_PAGE } from "const/pagination";
import { OrganizationModel } from "models/organization";
import { PaginationModel } from "models/pagination";
import { tryGetOrganizations } from "./organizations";

type OrganizationState = {
  readonly isLoading: boolean;
  readonly data: OrganizationModel | null;
  readonly error?: any;
};

const initialState: OrganizationState = {
  isLoading: true,
  data: null,
};

export const tryGetOrganization = createAsyncThunk(
  "organization/tryGetOrganization",
  async (id: string, thunkAPI) => {
    try {
      const response = await organizationService.getOrganizationById(id);
      return response;
    } catch (error) {
      console.error(error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const tryAddOrganization = createAsyncThunk(
  "organization/tryAddOrganization",
  async (body: Partial<OrganizationModel>, thunkAPI) => {
    try {
      const response = await organizationService.addOrganization(body);

      if (response) {
        thunkAPI.dispatch(tryGetOrganizations({ page: 1, limit: 100 }));
      }
      return response;
    } catch (error) {
      console.error(error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const organizationSlice = createSlice({
  name: "organization",
  reducers: {},
  extraReducers(builder) {
    builder.addCase(tryGetOrganization.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(tryGetOrganization.fulfilled, (state, { payload }) => {
      if (payload) {
        return { ...state, isLoading: false, data: payload };
      }
      return { ...state, isLoading: false, data: null };
    });
    builder.addCase(tryGetOrganization.rejected, (state, { payload }) => {
      if (payload) {
        return { ...state, isLoading: false, data: null, error: payload };
      }
      return state;
    });

    builder.addCase(tryAddOrganization.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(tryAddOrganization.fulfilled, (state, action: any) => {
      return { ...state, data: action.payload, isLoading: false };
    });
    builder.addCase(tryAddOrganization.rejected, (state, payload) => {
      if (payload) {
        return { ...state, isLoading: false, data: null, error: payload };
      }
    });
  },
  initialState,
});

const { reducer } = organizationSlice;

export default reducer;
