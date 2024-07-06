import React from 'react';
import { MdOutlinePushPin } from 'react-icons/md';
import moment from 'moment';
import { MdCreate, MdDelete } from 'react-icons/md';
import TagList from './TagList';

const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote,
}) => {

  // Convert date to a recognized format
  const formattedDate = moment(date, 'Do MMMM YYYY', true);

  return (
    <div className={` rounded-2xl p-4 ${ isPinned ? "bg-white border-[1.5px] border-black " : "bg-slate-200 border"} hover:shadow-xl transition-all ease-in-out`}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
            <h6 className="text-sm font-medium">{title}</h6>
            <span className="text-xs text-slate-500">
              {formattedDate.isValid() ? formattedDate.format('DD MMM YYYY') : 'Invalid Date'}
            </span>
        </div>
        <MdOutlinePushPin className={`icon-btn ${isPinned ? 'text-primary' : 'text-slate-300'}`} onClick={onPinNote} />
      </div>
      <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>
      <div className="flex items-center justify-between mt-2">
        <TagList tags={tags} />
        <div className="flex items-center gap-2">
            <MdCreate className='icon-btn hover:text-green-600' onClick={onEdit} />
            <MdDelete className='icon-btn hover:text-red-600' onClick={onDelete} />
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
