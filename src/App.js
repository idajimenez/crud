import React, { useState, Fragment } from 'react';
import Button from './components/Button';
import UserList from './components/UserList';
import User from './components/User';
import './App.css';

function App() {
    const [isFormVisible, setFormVisible] = useState(false);
    const [currentUser, setUser] = useState({});
    const [newUser, setNewUser] = useState(null);

    const toggleForm = (user = {}) => {
        setUser(user);

        if (isFormVisible) {
            setFormVisible(false);
        }
    };

    const toggleNewUser = async () => {
        setFormVisible(true);

        setUser({
            id: '',
            email: '',
            first_name: '',
            last_name: '',
            avatar: 'https://via.placeholder.com/70x70'
        })
    }

    const handleNewUser = (action, data) => {
        setNewUser(data);
    }

    return (
        <div className="App">
            <div className='user__list-item'>
                {isFormVisible
                    ? <Fragment>
                        <User
                            user={currentUser}
                            isEdit={isFormVisible}
                            isNewUser={true}
                            toggleForm={toggleForm}
                            handleUpdateList={handleNewUser}/>
                    </Fragment>
                    : <Button label='Add' color='green' onClick={toggleNewUser}/>
                }
            </div>
            <UserList
                toggleForm={toggleForm}
                currentUserId={currentUser.id || null}
                setNewUser={setNewUser}
                newUser={newUser}/>
        </div>
    );
}

export default App;
