import { useForm, SubmitHandler } from 'react-hook-form';
import { createNote, updateNote } from '../network/notes_api';
import { Note } from '../model/noteModel';

interface hooktype {
  title: string;
  text: string;
}

interface propsStyle {
  noteToEdit?: Note;
  onDismiss: () => void;
  onSaveNote: (note: any) => void;
}

const AddEditNoteDialog = ({
  noteToEdit,
  onDismiss,
  onSaveNote,
}: propsStyle) => {
  console.log('add edit note', noteToEdit);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<hooktype>({
    defaultValues: {
      title: noteToEdit?.title || '',
      text: noteToEdit?.text || '',
    },
  });

  const onSubmit: SubmitHandler<hooktype> = async (data) => {
    try {
      let noteResponse: any;

      if (noteToEdit) {
        noteResponse = await updateNote(noteToEdit._id, data);
      } else {
        noteResponse = await createNote(data);
        onSaveNote(data);
      }
    } catch (error) {
      console.log(error);
    }
    console.log('data', data);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-900">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          {noteToEdit ? 'Edit Note' : 'Add Note'}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="title" className="block font-semibold">
              Title
            </label>
            <input
              type="text"
              id="title"
              className={`w-full border border-gray-300 rounded-md py-2 px-3 ${
                errors.title ? 'border-red-500' : ''
              }`}
              placeholder="Enter your title"
              {...register('title', { required: true })}
            />
            {errors.title && <p className="text-red-500">Title is required</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="text" className="block font-semibold">
              Text
            </label>
            <input
              type="text"
              id="text"
              className={`w-full border border-gray-300 rounded-md py-2 px-3 ${
                errors.text ? 'border-red-500' : ''
              }`}
              placeholder="Enter your text"
              {...register('text', { required: true })}
            />
            {errors.text && <p className="text-red-500">Text is required</p>}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 rounded-md border border-gray-300"
              onClick={onDismiss}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditNoteDialog;
