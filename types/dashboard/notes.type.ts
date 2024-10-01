export interface ResultNoteDto {
  id: number;
  ref: string;
  name: string;
  details: string;
  created_at: Date;
  users: NoteUserDto;
  status: boolean;
  types: NoteTypeDto;
  flags: NoteFlagDto;
  enableComments: boolean;
  restricted: boolean;
}

export type CreateNoteDto = {
  name: string;
  details: string;
  type_id: number;
  flag_id: number;
  restricted: boolean;
  enableComments: boolean;
};

export type NoteUserDto = {
  id: number;
  firstname: string;
  lastname: string;
};

export type NoteFlagDto = {
  id: number;
  name: string;
};

export type NoteTypeDto = {
  id: number;
  name: string;
};

export type ResultNoteTypeDto = {
  id: number;
  name: string;
  status: boolean;
  created_at: Date;
};

export type ResultNoteFlagDto = {
  id: number;
  name: string;
  status: boolean;
  created_at: Date;
};

export type CreateNoteFlagDto = {
  name: string;
  details: string;
};

export type CreateNoteTypeDto = {
  name: string;
  details: string;
};

export interface ResultNoteCommentsDto {
  id: number;
  note_id: number;
  content: string;
  created_at: Date;
  user: NoteUserDto;
}

export type CreateNoteCommentDto = {
  content: string;
  note_id: number;
};