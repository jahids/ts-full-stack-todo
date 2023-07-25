import axios from 'axios';
import { Note } from '../model/noteModel';

export async function fetchAllNotes(): Promise<Note[]> {
  const apidata: any = await axios.get(`http://localhost:5000/api/notes`, {
    withCredentials: true,
  });
  return apidata?.data?.c;
}

interface paramsType {
  title: string;
  text: string;
}

export const createNote = async (params: paramsType): Promise<Note[]> => {
  const createdata: any = await axios({
    method: 'post',
    url: 'http://localhost:5000/api/notes',
    withCredentials: true,
    data: params,
  });

  return createdata?.data;
};

export const deleteNote = async (id: string) => {
  const deletedData = await axios.delete(
    `http://localhost:5000/api/notes/${id}`,
    {
      withCredentials: true,
    }
  );
  return deletedData?.data;
};

export const updateNote = async (
  id: string,
  params: paramsType
): Promise<Note[]> => {
  const updated: any = await axios({
    method: 'patch',
    url: `http://localhost:5000/api/notes/${id}`,
    withCredentials: true,
    data: params,
  });

  return updated.data;
};
