import ApiClient from "business/shared/ApiClient";
import { OrganizationModel } from "models/organization";
import { PaginationModel } from "models/pagination";

class OrganizationService extends ApiClient {
  async getOrganizations(page: number, limit: number) {
    return await this.get<{
      organizations: OrganizationModel[];
      pagination: PaginationModel;
    }>(`/organizations/${page}/${limit}`);
  }

  async getOrganizationById(id: string) {
    return await this.get<OrganizationModel>(`/organization/${id}`);
  }

  async addOrganization(body: Partial<OrganizationModel>) {
    return await this.post<OrganizationModel>(`/organization`, body);
  }

  async addMemberToOrganization(email: string, organizationId: string) {
    return await this.post<OrganizationModel>(`/organization/add-member`, {
      email,
      organizationId,
    });
  }
}

export const organizationService = new OrganizationService();
