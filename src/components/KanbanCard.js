import React from 'react';
import './KanbanCard.css';
import placeholderImg from './placeholder.png'; 
import backlogImg from './icons_FEtask/Backlog.svg';
import todoImg from './icons_FEtask/To-do.svg';
import inProgressImg from './icons_FEtask/in-progress.svg';
import doneImg from './icons_FEtask/Done.svg';
import cancelledImg from './icons_FEtask/Cancelled.svg';
import noPriorityImg from './icons_FEtask/No-priority.svg';
import lowPriorityImg from './icons_FEtask/Img - Low Priority.svg';
import mediumPriorityImg from './icons_FEtask/Img - Medium Priority.svg';
import highPriorityImg from './icons_FEtask/Img - High Priority.svg';
import urgentPriorityImg from './icons_FEtask/SVG - Urgent Priority grey.svg';

const KanbanCard = ({ ticket, groupBy, users }) => {
    const getPriorityImg = () => {
        switch (ticket.priority) {
            case 0: return noPriorityImg;
            case 1: return lowPriorityImg;
            case 2: return mediumPriorityImg;
            case 3: return highPriorityImg;
            case 4: return urgentPriorityImg;
            default: return placeholderImg; 
        }
    };

    const getStatusImg = () => {
        switch (ticket.status) {
            case 'Backlog': return backlogImg;
            case 'Todo': return todoImg;
            case 'In progress': return inProgressImg;
            case 'Done': return doneImg;
            case 'Cancelled': return cancelledImg;
            default: return placeholderImg; 
        }
    };

    const user = users.find(u => u.id === ticket.userId) || { available: false };


    return (
        <div className="kanban-card">
            <div className="card-header">
                <p className="card-id">{ticket.id}</p>
                {groupBy !== 'user' && (
                    <img src={placeholderImg} alt="User" className="user-profile" />
                )}
                {groupBy !== 'user' && (
                    <div
                        className="availability-dot"
                        style={{ backgroundColor: user?.available ? 'yellow' : 'grey' }}
                    ></div>
                
                )}
            </div>

            <div className="title-container">
                {groupBy !== 'status' && (
                    <img src={getStatusImg()} alt="Status" className="card-status-img" />
                )}
                <h3 className="card-title">{ticket.title}</h3>
            </div>



            <div className="tag-priority-container">
                <div className="card-priority-img">
                    {groupBy !== 'priority' && (
                        <img src={getPriorityImg()} alt="Priority" className="priority-image" />
                    )}
                </div>

                <div className="tag-container">
                    {ticket.tag.map((tag, index) => (
                        <span key={index} className="tag-button">
                            <span className="tag-dot"></span>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>



        </div>
    );
};

export default KanbanCard;
