import React from 'react';
import KanbanCard from './KanbanCard';
import './KanbanBoard.css';
import './KanbanCard.css';


import backlogImg from './icons_FEtask/Backlog.svg';
import todoImg from './icons_FEtask/To-do.svg';
import inProgressImg from './icons_FEtask/in-progress.svg';
import doneImg from './icons_FEtask/Done.svg';
import cancelledImg from './icons_FEtask/Cancelled.svg';
import noPriorityImg from './icons_FEtask/No-priority.svg';
import lowPriorityImg from './icons_FEtask/Img - Low Priority.svg';
import mediumPriorityImg from './icons_FEtask/Img - Medium Priority.svg';
import highPriorityImg from './icons_FEtask/Img - High Priority.svg';
import urgentPriorityImg from './icons_FEtask/SVG - Urgent Priority colour.svg';
import addIcon from './icons_FEtask/add.svg';
import menuIcon from './icons_FEtask/3 dot menu.svg';
import placeholderImg from './placeholder.png';


const statuses = [
  { name: 'Backlog', img: backlogImg },
  { name: 'Todo', img: todoImg },
  { name: 'In progress', img: inProgressImg },
  { name: 'Done', img: doneImg },
  { name: 'Cancelled', img: cancelledImg },
];

const priorities = {
  0: { name: 'No Priority', img: noPriorityImg },
  1: { name: 'Low', img: lowPriorityImg },
  2: { name: 'Medium', img: mediumPriorityImg },
  3: { name: 'High', img: highPriorityImg },
  4: { name: 'Urgent', img: urgentPriorityImg },
};

const groupTickets = (tickets, groupBy, users) => {
  const groups = {};

  if (groupBy === 'status') {
    statuses.forEach(status => {
      groups[status.name] = tickets.filter(ticket => ticket.status === status.name);
    });
  } else if (groupBy === 'user') {
    users.forEach(user => {
      groups[user.name] = tickets.filter(ticket => ticket.userId === user.id);
    });
  } else if (groupBy === 'priority') {
    Object.keys(priorities).forEach(priority => {
      groups[priorities[priority].name] = tickets.filter(ticket => ticket.priority == priority);
    });
  }

  return groups;
};

const sortTickets = (tickets, sortBy) => {
  return tickets.sort((a, b) => {
    if (sortBy === 'priority') {
      return b.priority - a.priority; 
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title); 
    }
    return 0;
  });
};

const KanbanBoard = ({ tickets, groupBy, sortBy, users }) => {
  const groupedTickets = groupTickets(tickets, groupBy, users);
  const sortedTickets = sortBy ? sortTickets(tickets, sortBy) : tickets;

  return (
    <div className="kanban-board">
      {Object.keys(groupedTickets).map((group) => {
        const count = groupedTickets[group].length;
        const groupImage = groupBy === 'status'
          ? statuses.find(status => status.name === group)?.img
          : groupBy === 'priority'
            ? priorities[Object.keys(priorities).find(key => priorities[key].name === group)]?.img
            : null;

        const user = users.find(u => u.name === group); 
        const userImage = user ? user.profileImage : ''; 
        const userAvailable = user ? user.available : false; 

        return (
          <div key={group} className="kanban-column">
            <div className="column-header">
              <div className="header-left">

                {groupBy === 'user' && (
                  <div className="profile-wrapper">
                    <img src={placeholderImg} alt="User" className="user-profile" />
                    <div
                      className="availability-dot"
                      style={{ backgroundColor: user?.available ? 'yellow' : 'grey' }}
                    ></div>
                  </div>
                )}






                {groupImage && <img src={groupImage} alt={group} className="header-image" />}
                <h5>{group} <span className="card-count">{count}</span></h5>
              </div>
              <div className="header-right">
                <button className="icon-button" aria-label="Add"><img src={addIcon} alt="Add" /></button>
                <button className="icon-button" aria-label="Menu"><img src={menuIcon} alt="Menu" /></button>
              </div>
            </div>
            {groupedTickets[group].map(ticket => (
              <KanbanCard key={ticket.id} ticket={ticket} groupBy={groupBy} users={users} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;
