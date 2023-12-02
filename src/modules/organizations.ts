import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { organizationService } from "business/organization/OrganizationService";
import { LIMIT_PER_PAGE } from "const/pagination";
import { OrganizationModel } from "models/organization";
import { PaginationModel } from "models/pagination";

type OrganizationsState = {
  readonly isLoading: boolean;
  readonly data: OrganizationModel[] | null;
  readonly pagination: PaginationModel;
  readonly error?: any;
};

const initialState: OrganizationsState = {
  isLoading: true,
  data: null,
  pagination: {
    page: 1,
    limit: LIMIT_PER_PAGE,
  },
};

export const tryGetOrganizations = createAsyncThunk(
  "organizations/tryGetOrganizations",
  async (payload: PaginationModel, thunkAPI) => {
    try {
      const response = await organizationService.getOrganizations(
        payload.page,
        payload.limit
      );
      return response;
    } catch (error) {
      console.error(error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const organizationsSlice = createSlice({
  name: "organizations",
  reducers: {},
  extraReducers(builder) {
    builder.addCase(tryGetOrganizations.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(tryGetOrganizations.fulfilled, (state, { payload }) => {
      if (payload) {
        return { ...state, isLoading: false, data: payload.organizations };
      }
      return { ...state, isLoading: false, data: null };
    });
    builder.addCase(tryGetOrganizations.rejected, (state, { payload }) => {
      if (payload) {
        return { ...state, isLoading: false, data: null, error: payload };
      }
      return state;
    });
  },
  initialState,
});

const { actions, reducer } = organizationsSlice;

export default reducer;
