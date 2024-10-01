import { Keys } from "@/constants";
import { apiCall, apiUrls } from "@/services";
import {
  CreateNoteDto,
  ResultPaginate,
  ResultNoteDto,
  ResultNoteTypeDto,
  CreateNoteFlagDto,
  ResultNoteFlagDto,
  CreateNoteTypeDto,
  ResultNoteCommentsDto,
  CreateNoteCommentDto,
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useNotes() {
  //
  const useGetNotes = () => {
    return useQuery({
      queryKey: [Keys.Queries.GET_NOTES],
      queryFn: async () => {
        const result = await apiCall<ResultPaginate<ResultNoteDto[]>>({
          ...apiUrls.dashboard.getNotes,
        });

        return result;
      },
    });
  };

  const useGetNote = (id: number) => {
    return useQuery({
      queryKey: [Keys.Queries.GET_NOTE, id],
      queryFn: async () => {
        const result = await apiCall<{
          data: ResultNoteDto;
          message: string;
        }>({
          ...apiUrls.dashboard.getNote,
          url: apiUrls.dashboard.getNote.url + `/${id}`,
        });

        return result;
      },
    });
  };

  const addNote = useMutation({
    mutationKey: [Keys.Mutations.ADD_NOTE],
    mutationFn: async (data: CreateNoteDto) => {
      const result = await apiCall<{
        data: ResultNoteDto;
        message: string;
      }>({
        data: {
          ...data,
        },
        ...apiUrls.dashboard.addNote,
      });

      return result;
    },
  });

  const commentNote = useMutation({
    mutationKey: [Keys.Mutations.ADD_NOTE_COMMENT],
    mutationFn: async (data: CreateNoteCommentDto) => {
      const result = await apiCall<{
        data: ResultNoteCommentsDto;
        message: string;
      }>({
        data,
        ...apiUrls.dashboard.addNoteComment
      });

      return result;
    },
  });

  const useGetNoteTypes = () => {
    return useQuery({
      queryKey: [Keys.Queries.GET_NOTE_TYPES],
      queryFn: async () => {
        const result = await apiCall<{
          data: ResultNoteTypeDto[];
          message: string;
        }>({
          ...apiUrls.dashboard.getNoteTypes,
        });

        return result;
      },
    });
  };

  const useGetNoteFlags = () => {
    return useQuery({
      queryKey: [Keys.Queries.GET_NOTE_FLAGS],
      queryFn: async () => {
        const result = await apiCall<{
          data: ResultNoteTypeDto[];
          message: string;
        }>({
          ...apiUrls.dashboard.getNoteFlags,
        });

        return result;
      },
    });
  };

  const deleteNote = useMutation({
    mutationKey: [Keys.Mutations.DELETE_NOTE],
    mutationFn: async (id: number) => {
      const result = await apiCall<{
        data: ResultNoteDto;
        message: string;
      }>({
        ...apiUrls.dashboard.deleteNote,
        url: (apiUrls.dashboard.deleteNote.url += `/${id}`),
      });

      return result.data;
    },
  });

  const deleteNoteFlag = useMutation({
    mutationKey: [Keys.Mutations.DELETE_SERVICE],
    mutationFn: async (id: number) => {
      const result = await apiCall<{
        data: ResultNoteDto;
        message: string;
      }>({
        ...apiUrls.dashboard.deleteNote,
        url: (apiUrls.dashboard.deleteNote.url += `/${id}`),
      });

      return result.data;
    },
  });

  const addNoteFlag = useMutation({
    mutationKey: [Keys.Mutations.ADD_NOTE_FLAG],
    mutationFn: async (data: CreateNoteFlagDto) => {
      const result = await apiCall<{
        data: ResultNoteFlagDto;
        message: string;
      }>({
        data: {
          ...data,
        },
        ...apiUrls.dashboard.addNoteFlags,
      });

      console.log(result);
      return result;
    },
  });

  const addNoteType = useMutation({
    mutationKey: [Keys.Mutations.ADD_NOTE_TYPE],
    mutationFn: async (data: CreateNoteTypeDto) => {
      const result = await apiCall<{
        data: ResultNoteFlagDto;
        message: string;
      }>({
        data: {
          ...data,
        },
        ...apiUrls.dashboard.addNoteTypes,
      });

      return result;
    },
  });

  const deleteNoteType = useMutation({
    mutationKey: [Keys.Mutations.DELETE_SERVICE],
    mutationFn: async (id: number) => {
      const result = await apiCall<{
        data: ResultNoteDto;
        message: string;
      }>({
        ...apiUrls.dashboard.deleteNote,
        url: (apiUrls.dashboard.deleteNote.url += `/${id}`),
      });

      return result.data;
    },
  });

  const useGetNoteComments = (noteId: number) => {
    return useQuery({
      queryKey: [Keys.Queries.GET_NOTE_COMMENTS, noteId],
      queryFn: async () => {
        const result = await apiCall<{
          data: ResultNoteCommentsDto[];
          message: string;
        }>({
          ...apiUrls.dashboard.getNoteComments,
          url: apiUrls.dashboard.getNoteComments.url + `/${noteId}/comments`,
        });

        return result;
      },
    });
  };

  return {
    useGetNotes,
    useGetNote,
    useGetNoteTypes,
    useGetNoteFlags,
    useGetNoteComments,
    addNote,
    commentNote,
    deleteNote,
    deleteNoteFlag,
    addNoteFlag,
    addNoteType,
    deleteNoteType
  };
}
