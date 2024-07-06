import React from 'react'
import { useState } from 'react';
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';

const AddEditNotes = ({noteData, type, getAllNotes ,onClose, showToastMsg}) => {

const [title, setTitle] = useState(noteData?.title || '');
const [content, setContent] = useState( noteData?.content || '');
const [tags, setTags] = useState( noteData?.tags || []);
const [error, setError] = useState('');

// Add note

const addNewNote = async () => {
    try{
        const response = await axiosInstance.post('/add-note', {
            title,
            content,
            tags,
        });

        if(response.data && response.data.note){
            showToastMsg('Note added successfully');
            getAllNotes();
            onClose();
        }

    } catch(error) {
        if(error.response && error.response.data && error.response.data.message){
            setError(error.response.data.message);
            return;
        }
        else console.log('Unexpected error occurred while adding note');
    }
}

// Edit note

const EditNote = async () => {
    const noteId = noteData._id;
    try{
        const response = await axiosInstance.put('/edit-note/' + noteId, {
            title,
            content,
            tags,
        });

        if(response.data && response.data.note){
            showToastMsg('Note Updated successfully');
            getAllNotes();
            onClose();
        }

    } catch(error) {
        if(error.response && error.response.data && error.response.data.message){
            setError(error.response.data.message);
            return;
        }
        else console.log('Unexpected error occurred while adding note');
    }
}


const handleAddNote = () => {
    if(!title){
        setError('Title is required');
        return;
    }

    if(!content){
        setError('Content is required');
        return;
    }

    setError('');

    if(type === 'edit'){
        
        EditNote()
    } else {
        addNewNote();
    }
}


  return (
    <div className='AddEditNotes relative'>

        <button
            className='w-10 h-10 rounded-full flex items-centre justify-center absolute top-3 right-3 hover:bg-slate-50'
            onClick={onClose}
            >
            <MdClose size={24} className='text-xl text-slate-400' />
        </button>

        <div className="flex flex-col gap-2">
            <label className="input-label">Title</label>
            <input type="text"
                className='text-2xl text-slate-950 outline-none'
                placeholder="Go to gym at 5"
                value={title}
                onChange={({target}) => setTitle(target.value)}
            />
        </div>

        <div className="flex flex-col gap-2 mt-4">
            <label className="input-label">Content</label>
            <textarea 
                type="text"
                className="text-sm-text-slate-950 outline-none bg-slate-100 p-2 rounded"
                placeholder='Content'
                rows={10}
                value={content}
                onChange={({target}) => setContent(target.value)}
            />
        </div>

        <div className="mt-3">
            <label htmlFor="" className="input-label">Tags</label>
            <TagInput tags={tags} setTags={setTags}/>
        </div>

        { error && (<p className='text-red-500 text-xs pt-4'>{error}</p>)
        }

        <button className="btn-primary mt-5 font-medium p-3" 
            onClick={handleAddNote}>
            { type === 'edit' ? 'UPDATE' : 'ADD'}      
        </button>
      
    </div>
  )
}

export default AddEditNotes
