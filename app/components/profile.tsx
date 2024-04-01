import React, { useState } from 'react';

const Profile = () => {
    const [profileData, setProfileData] = useState({
        name: 'John Doe',
        email: 'john@example.com',
    });
    const [editableData, setEditableData] = useState({ ...profileData });
    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditableData({ ...editableData, [name]: value });
    };

    const handleSave = () => {
        setProfileData(editableData);
        setIsEditing(false);
    };

    return (
        <div className="text-center p-4">
            <h1 className="text-xl font-bold mb-4">Profile</h1>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        name="name"
                        value={editableData.name}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-md px-3 py-2 mb-2"
                    />
                    <input
                        type="text"
                        name="email"
                        value={editableData.email}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-md px-3 py-2 mb-2"
                    />
                    <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Save
                    </button>
                </div>
            ) : (
                <div>
                    <p className="mb-2">Name: {profileData.name}</p>
                    <p className="mb-2">Email: {profileData.email}</p>
                    <div className="flex justify-center">
                        <button onClick={() => setIsEditing(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Edit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

};

export default Profile;
