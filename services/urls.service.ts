import { RequestMethod } from "@/types";

const apiVersion = {
  v1: '/api',
  v2: '/api/v2',
};

export type ApiUrlsDto = {
  [key: string]: {
    url: string;
    method: RequestMethod;
    isSecure: boolean;
  };
};

export const apiUrls: {
  [key: string]: ApiUrlsDto;
} = {
  auth: {
    login: {
      url: `${apiVersion.v1}/admin/signin`,
      method: 'POST',
      isSecure: false,
    },
    validateSession: {
      url: `${apiVersion.v1}/admin/validate-token`,
      method: 'POST',
      isSecure: true,
    }
  },
  dashboard: {
    getStats: {
      url: `${apiVersion.v1}/admin/dashboard/totals`,
      method: 'GET',
      isSecure: true,
    },

    getViolences: {
      url: `${apiVersion.v1}/admin/notices`,
      method: 'GET',
      isSecure: true,
    },
    addViolence: {
      url: `${apiVersion.v1}/admin/notices/add`,
      method: 'POST',
      isSecure: true,
    },
    getViolenceOptions: {
      url: `${apiVersion.v1}/admin/poll-options`,
      method: 'GET',
      isSecure: true,
    },
    getViolenceTypes: {
      url: `${apiVersion.v1}/admin/noticetypes`,
      method: 'GET',
      isSecure: true,
    },
    getViolenceFlags: {
      url: `${apiVersion.v1}/admin/noticeflags`,
      method: 'GET',
      isSecure: true,
    },

    getServices: {
      url: `${apiVersion.v1}/admin/consultations`,
      method: 'GET',
      isSecure: true,
    },
    addService: {
      url: `${apiVersion.v1}/admin/consultations/add`,
      method: 'POST',
      isSecure: true,
    },

    getCountries: {
      url: `${apiVersion.v1}/admin/countries`,
      method: 'GET',
      isSecure: true,
    },
    addCountry: {
      url: `${apiVersion.v1}/admin/country/add`,
      method: 'POST',
      isSecure: true,
    },
    deleteCountry: {
      url: `${apiVersion.v1}/admin/country`,
      method: 'DELETE',
      isSecure: true,
    },

    getRoles: {
      url: `${apiVersion.v1}/admin/roles`,
      method: 'GET',
      isSecure: true,
    },
    addRole: {
      url: `${apiVersion.v1}/admin/roles/add`,
      method: 'POST',
      isSecure: true,
    },

    getUsers: {
      url: `${apiVersion.v1}/admin/users`,
      method: 'GET',
      isSecure: true,
    },
    getVictims: {
      url: `${apiVersion.v1}/admin/victims`,
      method: 'GET',
      isSecure: true,
    },
    addUser: {
      url: `${apiVersion.v1}/admin/users/add`,
      method: 'POST',
      isSecure: true,
    },

    getOrganizations: {
      url: `${apiVersion.v1}/admin/organisations`,
      method: 'GET',
      isSecure: true,
    },
    addOrganization: {
      url: `${apiVersion.v1}/admin/organisations/add`,
      method: 'POST',
      isSecure: true,
    },
  },
};
