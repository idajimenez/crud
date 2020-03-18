import PropTypes from 'prop-types';
import React, { Fragment, useState, useEffect, useRef } from 'react';
import Button from './Button';
import makeApiRequest from '../makeApiReqest';

User.propTypes = {
    user: PropTypes.object.isRequired,
    isEdit: PropTypes.bool,
    handleUpdateList: PropTypes.func.isRequired,
    toggleForm: PropTypes.func.isRequired,
    isNewUser: PropTypes.bool
}

function User({ user, isEdit = false, handleUpdateList, toggleForm, isNewUser = false }) {
    const inputEmail = useRef(null);
    const inputFirstName = useRef(null);
    const inputLastName = useRef(null);

    const [userData, setUserData] = useState(user);
    const [isSaving, setToggleSave] = useState(false);
    
    useEffect(() => {
        setUserData(user);
    }, [user]);

    const handleSave = () => {
        try {
            setToggleSave(true);

            let newValue = {
                email: inputEmail.current.value,
                first_name: inputFirstName.current.value,
                last_name: inputLastName.current.value,
            };

            makeApiRequest(`/users/${user.id}`, isNewUser ? 'POST' : 'PUT', isNewUser ? newValue : null).then(resp => {
                handleUpdateList(isNewUser ? 'add' : 'update', {
                    ...user,
                    ...newValue,
                    ...resp
                }, user.id);

                setToggleSave(false);
            });
        }
        catch(err) {
            alert(`Failed to ${isNewUser ? 'create' : 'update'} user`);
            setToggleSave(false);
        }
    }

    return (
        <div className='user__item'>
            <img src={user.avatar} className='user__avatar' alt='avatar'/>
            <div className='user__item-content'>
                {!isEdit
                    ? <Fragment>
                        <p>{user.email}</p>
                        <p>{user.first_name}</p>
                        <p>{user.last_name}</p>
                    </Fragment>
                    : <Fragment>
                        <input
                            className='user__data'
                            defaultValue={userData.email}
                            ref={inputEmail}
                            placeholder='Email'/>
                        <input
                            className='user__data'
                            defaultValue={userData.first_name}
                            ref={inputFirstName}
                            placeholder='First Name'/>
                        <input
                            className='user__data'
                            defaultValue={userData.last_name}
                            ref={inputLastName}
                            placeholder='Last Name'/>
                    </Fragment>
                }
            </div>
            {isEdit && (
                <div className='user__actions active'>
                    <Button
                        label='Cancel'
                        onClick={toggleForm}
                        isProcessing={isSaving} />
                    <Button
                        label={isSaving ? 'Saving' : 'Save'}
                        color='green'
                        onClick={handleSave}
                        isProcessing={isSaving} />
                </div>
            )}
        </div>
    )
}

export default User;
