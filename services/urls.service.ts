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
      isSecure: false,
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

    getServices: {
      url: `${apiVersion.v1}/admin/consultations`,
      method: 'GET',
      isSecure: true,
    },
    addService: {
      url: `${apiVersion.v1}/admin/consultations/add`,
      method: 'POST',
      isSecure: true,
    }
  },
};
