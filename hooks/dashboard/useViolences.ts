import { Keys } from "@/constants";
import { apiCall, apiUrls } from "@/services";
import {
  CreateInvestigationDto,
  CreateViolenceDto,
  InvestigationMethodDto,
  ResultInvestigationDto,
  ResultPaginate,
  ResultViolenceDto,
  UpdateViolenceDto,
  ViolenceOptions,
  ViolenceTypeDto,
  ViolencesFlagDto,
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useViolences() {
  //
  const useGetViolences = () => {
    return useQuery({
      queryKey: [Keys.Queries.GET_VIOLENCES],
      queryFn: async () => {
        const result = await apiCall<ResultPaginate<ResultViolenceDto[]>>({
          ...apiUrls.dashboard.getViolences,
        });

        return result;
      },
    });
  };

  const useGetViolence = (id: number) => {
    return useQuery({
      queryKey: [Keys.Queries.GET_VIOLENCE, id],
      queryFn: async () => {
        const result = await apiCall<{
          data: ResultViolenceDto;
          message: string;
        }>({
          ...apiUrls.dashboard.getViolence,
          url: apiUrls.dashboard.getViolence.url + `/${id}`,
        });

        return result;
      },
    });
  };

  const addViolence = useMutation({
    mutationKey: [Keys.Mutations.ADD_VIOLENCE],
    mutationFn: async (data: CreateViolenceDto) => {
      const result = await apiCall<{
        data: ResultViolenceDto;
        message: string;
      }>({
        data: {
          ...data,
          name: "-",
          area: "-",
          date_occured: new Date(data.date_occured).getTime(),
        },
        ...apiUrls.dashboard.addViolence,
      });

      return result;
    },
  });

  const getViolenceOptions = () => {
    return useQuery({
      queryKey: [Keys.Queries.GET_VIOLENCE_OPTIONS],
      queryFn: async () => {
        const result = await apiCall<{
          data: ViolenceOptions;
          message: string;
        }>({
          ...apiUrls.dashboard.getViolenceOptions,
        });

        return result;
      },
    });
  };

  const getViolenceTypes = () => {
    return useQuery({
      queryKey: [Keys.Queries.GET_VIOLENCE_TYPES],
      queryFn: async () => {
        const result = await apiCall<{
          data: ViolenceTypeDto[];
          message: string;
        }>({
          ...apiUrls.dashboard.getViolenceTypes,
        });

        return result;
      },
    });
  };

  const getViolenceFlags = () => {
    return useQuery({
      queryKey: [Keys.Queries.GET_VIOLENCE_FLAGS],
      queryFn: async () => {
        const result = await apiCall<{
          data: ViolencesFlagDto[];
          message: string;
        }>({
          ...apiUrls.dashboard.getViolenceFlags,
        });

        return result;
      },
    });
  };

  const addInvestigation = useMutation({
    mutationKey: [Keys.Mutations.ADD_INVESTIGATION],
    mutationFn: async (data: CreateInvestigationDto) => {
      const result = await apiCall<{
        data: ResultInvestigationDto;
        message: string;
      }>({
        data: {
          ...data,
          datepoll: new Date(data.datepoll).getTime(),
          transition: "-",
          etat_passing: "_",
        },
        ...apiUrls.dashboard.addInvestigation,
      });

      return result;
    },
  });

  const getInvestigationTypes = () => {
    return useQuery({
      queryKey: [Keys.Queries.GET_INVESTIGATION_TYPES],
      queryFn: async () => {
        const result = await apiCall<{
          data: InvestigationMethodDto[];
          message: string;
        }>({
          ...apiUrls.dashboard.getPollTypes,
        });

        return result;
      },
    });
  };

  const deleteViolence = useMutation({
    mutationKey: [Keys.Mutations.DELETE_VIOLENCE],
    mutationFn: async (id: number) => {
      const result = await apiCall<{
        data: ResultViolenceDto;
        message: string;
      }>({
        ...apiUrls.dashboard.deleteViolence,
        url: apiUrls.dashboard.deleteViolence.url += `/${id}`
      });

      return result.data;
    },
  });

  const editViolence = useMutation({
    mutationKey: [Keys.Mutations.EDIT_VIOLENCE],
    mutationFn: async (data: UpdateViolenceDto) => {
      const result = await apiCall<{
        data: ResultViolenceDto;
        message: string;
      }>({
        data: {
          ...data,
          date_occured: new Date(data.date_occured).getTime(),
        },
        url: `${apiUrls.dashboard.editViolence.url}/${data.id}`,
        method: apiUrls.dashboard.editViolence.method,
        isSecure: true
      });

      return result;
    },
  });

  const assignViolence = useMutation({
    mutationKey: [Keys.Mutations.ASSIGN_VIOLENCE],
    mutationFn: async (id: number) => {
      const result = await apiCall<{
        data: ResultViolenceDto;
        message: string;
      }>({
        ...apiUrls.dashboard.assignViolence,
        url: apiUrls.dashboard.assignViolence.url += `/${id}/link`
      });

      return result.data;
    },
  });

  const reportViolence = useMutation({
    mutationKey: [Keys.Mutations.REPORT_VIOLENCE],
    mutationFn: async (id: number) => {
      const result = await apiCall<{
        data: ResultViolenceDto;
        message: string;
      }>({
        ...apiUrls.dashboard.reportViolence,
        url: apiUrls.dashboard.reportViolence.url += `/${id}/report-spam`
      });

      return result.data;
    },
  });

  return {
    useGetViolences,
    useGetViolence,
    getViolenceOptions,
    getViolenceTypes,
    getViolenceFlags,
    getInvestigationTypes,
    addViolence,
    editViolence,
    addInvestigation,
    deleteViolence,
    assignViolence,
    reportViolence
  };
}
