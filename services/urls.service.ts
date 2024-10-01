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
    getViolence: {
      url: `${apiVersion.v1}/admin/notices`,
      method: 'GET',
      isSecure: true,
    },
    addViolence: {
      url: `${apiVersion.v1}/admin/notices/add`,
      method: 'POST',
      isSecure: true,
    },
    deleteViolence: {
      url: `${apiVersion.v1}/admin/notices`,
      method: 'DELETE',
      isSecure: true,
    },
    editViolence: {
      url: `${apiVersion.v1}/admin/notices`,
      method: 'PUT',
      isSecure: true,
    },
    assignViolence: {
      url: `${apiVersion.v1}/admin/notices`,
      method: 'PATCH',
      isSecure: true,
    },
    reportViolence: {
      url: `${apiVersion.v1}/admin/notices`,
      method: 'PATCH',
      isSecure: true,
    },
    getPollTypes: {
      url: `${apiVersion.v1}/admin/pollmethods`,
      method: "GET",
      isSecure: true,
    },
    getInvestigations: {
      url: `${apiVersion.v1}/admin/noticepolls`,
      method: "GET",
      isSecure: true,
    },
    addInvestigation: {
      url: `${apiVersion.v1}/admin/noticepolls/add`,
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
    getService: {
      url: `${apiVersion.v1}/admin/consultations`,
      method: 'GET',
      isSecure: true,
    },
    addService: {
      url: `${apiVersion.v1}/admin/consultations`,
      method: 'POST',
      isSecure: true,
    },
    getServiceTypes: {
      url: `${apiVersion.v1}/admin/consultation-types`,
      method: 'GET',
      isSecure: true,
    },
    deleteService: {
      url: `${apiVersion.v1}/admin/consultations`,
      method: 'DELETE',
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
      url: `${apiVersion.v1}/admin/role/add`,
      method: 'POST',
      isSecure: true,
    },
    deleteRole: {
      url: `${apiVersion.v1}/admin/role`,
      method: 'DELETE',
      isSecure: true,
    },

    getUsers: {
      url: `${apiVersion.v1}/admin/users`,
      method: 'GET',
      isSecure: true,
    },
    addUser: {
      url: `${apiVersion.v1}/admin/user/add`,
      method: 'POST',
      isSecure: true,
    },
    getVictims: {
      url: `${apiVersion.v1}/admin/victims`,
      method: 'GET',
      isSecure: true,
    },
    addVictims: {
      url: `${apiVersion.v1}/admin/victim/add`,
      method: "POST",
      isSecure: true
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
    deleteOrganization: {
      url: `${apiVersion.v1}/admin/organisations`,
      method: 'DELETE',
      isSecure: true,
    },

    getNotes: {
      url: `${apiVersion.v1}/admin/blocknotes`,
      method: 'GET',
      isSecure: true,
    },
    getNote: {
      url: `${apiVersion.v1}/admin/blocknotes`,
      method: 'GET',
      isSecure: true,
    },
    addNote: {
      url: `${apiVersion.v1}/admin/blocknotes/add`,
      method: 'POST',
      isSecure: true,
    },
    deleteNote: {
      url: `${apiVersion.v1}/admin/blocknotes`,
      method: 'DELETE',
      isSecure: true,
    },
    getNoteComments: {
      url: `${apiVersion.v1}/admin/blocknotes`,
      method: 'GET',
      isSecure: true,
    },
    addNoteComment: {
      url: `${apiVersion.v1}/admin/blocknotes/comments`,
      method: 'POST',
      isSecure: true,
    },
    deleteNoteComment: {
      url: `${apiVersion.v1}/admin/blocknotes/comments`,
      method: 'DELETE',
      isSecure: true,
    },
    addNoteTypes: {
      url: `${apiVersion.v1}/admin/typenotes`,
      method: 'POST',
      isSecure: true,
    },
    getNoteTypes: {
      url: `${apiVersion.v1}/admin/typenotes`,
      method: 'GET',
      isSecure: true,
    },
    addNoteFlags: {
      url: `${apiVersion.v1}/admin/flagnotes`,
      method: 'POST',
      isSecure: true,
    },
    getNoteFlags: {
      url: `${apiVersion.v1}/admin/flagnotes`,
      method: 'GET',
      isSecure: true,
    },
  },
};

export const userApiUrls: {
  [key: string]: ApiUrlsDto;
} = {
  auth: {
    login: {
      url: `${apiVersion.v1}/signin`,
      method: 'POST',
      isSecure: false,
    },
    validateSession: {
      url: `${apiVersion.v1}/validate-token`,
      method: 'POST',
      isSecure: true,
    }
  },
  dashboard: {
    getStats: {
      url: `${apiVersion.v1}/dashboard/totals`,
      method: 'GET',
      isSecure: true,
    },

    getViolences: {
      url: `${apiVersion.v1}/notices`,
      method: 'GET',
      isSecure: true,
    },
    getViolence: {
      url: `${apiVersion.v1}/notices`,
      method: 'GET',
      isSecure: true,
    },
    addViolence: {
      url: `${apiVersion.v1}/notices/add`,
      method: 'POST',
      isSecure: true,
    },
    getPollTypes: {
      url: `${apiVersion.v1}/pollmethods`,
      method: "GET",
      isSecure: true,
    },
    getInvestigations: {
      url: `${apiVersion.v1}/noticepolls`,
      method: "GET",
      isSecure: true,
    },
    getViolenceOptions: {
      url: `${apiVersion.v1}/poll-options`,
      method: 'GET',
      isSecure: true,
    },
    getViolenceTypes: {
      url: `${apiVersion.v1}/noticetypes`,
      method: 'GET',
      isSecure: true,
    },
    getViolenceFlags: {
      url: `${apiVersion.v1}/noticeflags`,
      method: 'GET',
      isSecure: true,
    },

    getServices: {
      url: `${apiVersion.v1}/consultations`,
      method: 'GET',
      isSecure: true,
    },
    getService: {
      url: `${apiVersion.v1}/consultations`,
      method: 'GET',
      isSecure: true,
    },
    addService: {
      url: `${apiVersion.v1}/consultations`,
      method: 'POST',
      isSecure: true,
    },
    getServiceTypes: {
      url: `${apiVersion.v1}/consultation-types`,
      method: 'GET',
      isSecure: true,
    },

    getCountries: {
      url: `${apiVersion.v1}/countries`,
      method: 'GET',
      isSecure: true,
    },

    getOrganizations: {
      url: `${apiVersion.v1}/organisations`,
      method: 'GET',
      isSecure: true,
    }
  },
};