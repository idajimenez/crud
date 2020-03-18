import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState, useCallback } from 'react';
import User from './User';
import Button from './Button';
import makeApiRequest from '../makeApiReqest';

UserList.propTypes = {
    toggleForm: PropTypes.func.isRequired,
    currentUserId: PropTypes.string,
    setNewUser: PropTypes.func,
    newUser: PropTypes.object
}

function UserList({ toggleForm, currentUserId, setNewUser, newUser }) {
    const [users, setUsers] = useState([]);
    const [isDeleting, setToggleDelete] = useState(false);

    /**
     * 
     * @param {String} id
     * @param {Object} data (User)
     * @param {String} action (update | delete)
     */
    const handleUpdateList = useCallback((action, data, id) => {
        let currentUsers = users;
        console.log(action, data)
        if (action === 'add') {
            currentUsers.unshift(data)
        }
        else {
            const index = currentUsers.findIndex(user => id === user.id);
    
            if (action === 'update') {
                currentUsers[index] = data;
            }
            else {
                currentUsers.splice(index, 1);
            }
        }

        setUsers(currentUsers);
        toggleForm();
    }, [toggleForm, users]);

    useEffect(() => {
        if (!users.length) {
            try {
                makeApiRequest('/users?page=2').then(resp => {
                    console.log(resp.data);
                    setUsers(resp.data);
                });
            }
            catch(err) {
                alert('Failed to load users');
            }
        }

        if (newUser) {
            handleUpdateList('add', newUser)
            setNewUser(null);
        }
    }, [setNewUser, newUser, users, handleUpdateList]);

    const handleDelete = (id) => {
        try {
            setToggleDelete(true);

            makeApiRequest(`/users/${id}`, 'DELETE', ).then(resp => {
                handleUpdateList('delete', null, id);
                setToggleDelete(false);
            });
        }
        catch(err) {
            alert('Failed to delete user');
            setToggleDelete(false);
        }
    }

    return (
        <div className='user__list'>
            {users.map((user, i) => (
                <div className='user__list-item'>
                    <User
                        user={user}
                        isEdit={currentUserId === user.id}
                        toggleForm={toggleForm}
                        handleUpdateList={handleUpdateList}/>
                    <div className={`user__actions ${currentUserId === user.id ? 'active' : ''}`}>
                        {currentUserId !== user.id && (
                            <Fragment>
                                <Button
                                    label='Edit'
                                    color='blue'
                                    onClick={() => toggleForm(user)}
                                    isProcessing={isDeleting} />
                                <Button
                                    label={isDeleting ? 'Deleting' : 'Delete'}
                                    color='red'
                                    onClick={() => handleDelete(user.id)}
                                    isProcessing={isDeleting} />
                            </Fragment>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default UserList;
