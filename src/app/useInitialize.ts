import { tokenService } from "business/shared/TokenService";
import { tryGetOrganization } from "modules/organization";
import { tryGetOrganizations } from "modules/organizations";
import { tryGetUserInfo } from "modules/user";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import "translation/i18nConfig";

export const useInitialize = () => {
  const dispatch = useAppDispatch();
  const accessToken = tokenService.getLocalAccessToken();
  const { pagination, data: organizations } = useAppSelector(
    (state) => state.organizations
  );

  useEffect(() => {
    if (accessToken) {
      dispatch(tryGetUserInfo());
    }
  }, [accessToken, dispatch]);

  const { isAuth } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuth) return;

    dispatch(tryGetOrganizations(pagination));
  }, [isAuth, pagination, dispatch]);

  useEffect(() => {
    if (organizations?.length) {
      dispatch(tryGetOrganization(organizations[0]._id));
    }
  }, [dispatch, organizations]);
};
